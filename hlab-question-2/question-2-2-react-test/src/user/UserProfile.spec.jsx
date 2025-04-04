import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import UserProfile from "./UserProfile";

global.fetch = jest.fn();

describe("Normal case", () => {
  beforeEach(() => {
    fetch.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("fetch userId: 1, should return name and email for userId 1", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve(() => ({ name: "user1", email: "user1@example.com" })),
    });

    render(<UserProfile userId={1} />);
    await waitFor(() => {
      screen.getByText("user1", { selector: "h1" });
      screen.getByText("Email: user1@example.com", { selector: "p" });
    });

    expect(fetch).toHaveBeenCalledWith("https://api.example.com/users/1");
  });

  it("fetch userId: 1 then userId: 2, should return name and email for userId 1 then 2", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve(() => ({ name: "user1", email: "user1@example.com" })),
    });

    const { rerender } = render(<UserProfile userId={1} />);
    await waitFor(() => {
      screen.getByText("user1", { selector: "h1" });
      screen.getByText("Email: user1@example.com", { selector: "p" });
    });
    expect(fetch).toHaveBeenCalledWith("https://api.example.com/users/1");

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve(() => ({ name: "user2", email: "user2@example.com" })),
    });

    rerender(<UserProfile userId={2} />);
    await waitFor(() => {
      screen.getByText("user2", { selector: "h1" });
      screen.getByText("Email: user2@example.com", { selector: "p" });
    });
    expect(fetch).toHaveBeenCalledWith("https://api.example.com/users/2");
    expect(fetch).toHaveBeenCalledTimes(2)

  });

  it("waiting for fetch response should return Loading...", async () => {
    fetch = jest.fn(async () => new Promise());
    render(<UserProfile userId={1} />);
    await waitFor(() => {
      screen.getByText("Loading...", { selector: "div" });
    });

    expect(fetch).toHaveBeenCalledWith("https://api.example.com/users/1");
  });
});

describe("Error case", () => {
  beforeEach(() => {
    fetch.mockClear();
  });
  it("fetch promise rejected", async () => {
    fetch.mockRejectedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve(() => ({
          name: "userReject",
          email: "userReject@example.com",
        })),
      message: "Promise rejected on status ok",
    });

    render(<UserProfile userId={1} />);
    await waitFor(() => {
      screen.getByText("Error: Promise rejected on status ok", {
        selector: "div",
      });
    });
    expect(fetch).toHaveBeenCalledWith("https://api.example.com/users/1");
  });

  it("fetch return response not ok", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<UserProfile userId={1} />);
    await waitFor(() => {
      screen.getByText("Error: Failed to fetch user data", { selector: "div" });
    });
    expect(fetch).toHaveBeenCalledWith("https://api.example.com/users/1");
  });
});
