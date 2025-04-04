# Backend Questions

## 1.
<b>Question</b> : Assuming the system currently has three microservices: Customer API, Master Data API,
and Transaction Data API, there is a new feature that requires data from all three
microservices to be displayed in near real-time. The current technology stack includes
REST APIs and an RDBMS database. How would you design a new API for this feature?

<b>Answer</b> : Since the new feature will requires data from the 3 microservices in near real-time, it would makes the current stack insufficient because of high traffic. So in addition to the current stack, I would use `Kafka` as a message broker.

By adding Kafka as a message broker, it could make the 3 microservices (Customer API, Master Data API,
and Transaction Data API) works asynchronously. Decreasing the wait time needed for each services to manage data and requests. Kafka also have an API called Stream API used for retrieving data real-times, which is suitable for this use case.

Then to work with Kafka, I will create a service, or a service worker, to consume messages from Kafka and store the data into database or cache like `Redis`.

When the new API receives a request, it will fetch the latest data from Redis. If the data is not in the cache or needs updating, it will rely on Kafka to update the data and storing the latest result in Redis for future requests.

## 2.
<b>Question</b> : Assuming the team has started planning a new project, the project manager asks you for a performance test strategy plan for this release. How would you recommend proceeding to the project manager?

<b>Answer</b> : This is the performance testing strategy I would recommend to the project manager:

1. <b>Establish Performance Goals & Benchmarks</b>
Clearly define key performance indicators such as concurrent users, response time, throughput, and latency. This ensures that we have measurable targets for system performance.

2. <b>Create a Realistic Test Environment</b>
Set up a testing environment that mirrors production as closely as possible. This helps detect performance issues early and ensures that new changes won’t degrade system stability before release.

3. <b>Develop Test Scenarios & Workflows</b>
Identify critical user interactions and system operations that need to be tested. Design test cases that reflect real-world usage to evaluate system behavior under expected conditions.

4. <b>Choose Suitable Testing Tools & CI/CD Integration</b>
Select performance testing tools based on project needs and team expertise. Where possible, integrate performance testing into the CI/CD pipeline to detect issues automatically during development.

5. <b>Execute Load & Stress Tests</b>
Perform different types of performance tests, including normal load, peak load, and stress testing. This will help assess system reliability and responsiveness under varying conditions.

6. <b>Monitor, Analyze, and Optimize</b>
Use monitoring tools like AWS CloudWatch or similar platforms to track system performance during testing. Analyze results to pinpoint bottlenecks, optimize system performance, and make improvements before deployment.