---
title: 'Moving the code to production'
date: '2024-01-07'
description: 'Checklist on a very high level for moving the code to production.'
tags: ['production readiness of project', 'system design']
---

## Production Readiness

After checking the code locally and being confident of the code to move to production give much more satisfaction when it goes through the QA lane of the agile board. Then a go-ahead from client team is just icing on the cake.

Client would also want to check the best practices you would have implemented in the code. Incase you would like to check some of the list, you could check it [here](/blogs/project-setup). In this blog, we would like to cover the things beyond the code or the last leg before moving to production so that we could track and make sure we could handle the user request, have fail safe mechanism and threat modeling. Below are the few of the checks we could have it.

**Note:** Each of the category requires a detailed discussion, I would have a separate blog on each of the category. This blog only covers a high level topic to look at and understand it importance.

### Security

Making sure the security of the application is on top priority, always make every interaction secure. Frontend has been the first gate to interact with the user, so make sure the gate is properly secured from unwanted access. Similarly, the apis and databases should also be secured without relying on the previous gates. Below are the things to look at:

- Authentication and Authorisation of the pages, apis, and resources whenever they are asked.
- Avoid vulnerable keywords like 'document.write', 'window.open', etc
- Make sure the code is minified and uglified in the production
- White-listing the required domains and setting the CORS header.
- Make sure the sensitive data is not exposed and other PII details are not stored in browser.

### Availability

It is equally important for your product to be available to your users all the time, except during the maintenance. Also try making the downtime as minimum as possible. The application could be down for a number of reasons. One of the reason could be a hacker could bombard the apis programmatically to bring it down, which again funnels down to security. If the user base increase, then is the application flexible enough to handle such increase in request. Is the application scaling up easily.

### Performance

A lot of time, the user drops because of increased waiting time to respond to any request. It could be the webpage loading time, the webpage takes long time to respond, the apis are slow and takes long time to fetch, etc. It is important to have things under check and ways to measure performance of the webpage, apis, read/write operations to database, etc.

### Data consistent

While internet is world wide and the user can fetch data and update data from anywhere, it is equally important to check that the data that is shown to the users are consistent. With the data-heavy application, where data is money to the users, it becomes crutial to show the correctness of the data and handle any inconsistent data gracefully. Also with the cloud in place, and multi-servers in action, making data consistent across servers have become very crutial.

### Monitoring / Alerting / Metrics / Logging

While the application is in production, it is important to monitor the health of the application. Which are the apis are running good and which needs to be looked at.

While we figured out of the apis about which areas needs to be looked at, needs to be automated and alerted as we would not be able to always check on the apis manually everytime.

Once these are in place, in getting a record of data from the past history, it is always good to see how the application is performing over a period of time. And incase there is some suspicion over a part of the application regularly, metrics would be a good start to relook at the area.

While the application runs smooth most of the time, in some cases, it behaves badly for various reasons and things might fail. In order to find the exact root cause of the issue, it is important to log the transactions. And if the clients are working on financial where every paise matters, it becomes very crutial to check where it failed. And for this, Logging is a must.
