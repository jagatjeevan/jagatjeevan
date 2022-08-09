---
title: 'Micro frontend'
date: '2022-08-07'
description: 'Manage a huge mono repo with dividing the code into smaller repos. Managing the project with splitting the team with different functionality. Scale the application with ease. Micro-frontend is a tested way to scale up application.'
tags: ['micro frontend', 'splitting the code', 'managing a huge mono repo']
---

## Legends
*mfe: Micro-frontends
## Why do we need *mfe?
As the application grows, the modules grow, and so do the teams. The teams take ownership of specific features. To scale up the application and reduce the time to market is most important for the team to be autonomous. And this is where *mfe comes into the picture. With *mfe, we would have 
- `Functionality context` expertise with the team.
- Better `team management`.
- `Testing` individual functionality is easy.
- `Resilient`: Failure in one module does not affect other modules
- `Independent tech stack`: Teams can choose their tech stack
- `Independent deployment`: Teams can choose when they can go to deployment.
- `No extra code`: Only code required for the functionality is present.
- Easier to `upgrade` and check on the `performance`
- `Scaling` the feature with ease.
- Looking at the `bigger picture` while creating some functionality.
- It is a `tested way of working`. It follows the micro-services ways of things.

A few questions that need to be thought through before doing *mfe are:
- **Slicing**: How to break the application into multiple repositories or sections.
- **Compose**: How to compose these broken-down pieces together to run the application as one.
- **Communication**: How do these separate applications communicate with each other?
- **Testing**: How to test individual *mfe and also together as an application.

### Slicing
The first thing to think about is how to break the application. There is no right or wrong in which way you want to break the application. It all depends on how an architect thinks. Few of the ways people split the application are:
- **Routes**: Each route is a separate *mfe 
- **Functionality-based**: Each *mfe has a domain/functionality associated
- Keeping critical functionality separate

### Composing
[Image]
Mostly there are four types of composing techniques used. Those are (Code Bundling + Composing technique):
- Build time + App shell 
- Build time + Reverse Composition
- Run time + App shell 
- Run time + Reverse Composition

**Build time**: The code is bundled when the code is compiled.

**Run time**: When the bundled code is fetched during the run time.
App shell Composition: When there is an application shell and content is rendered inside the app shell.

**Reverse composition**: The application is sliced w.r.t routes. The commonly used modules are included in each of the *mfe.

### Communication
Generally, there are two ways of communication among *mfe. 

**Using a global object to communicate**: Each mfe uses a global object to transfer data to other *mfes. Here the global object is the window object. *Mfe uses window object, localStorage, sessionStorage, indexedDB, cookies, etc.

**Event-based communication**: Using custom events and event bubbling to communicate with other *mfe for communication. 

### Testing
**Unit testing**: There would not be any change in unit testing. It becomes easy for testing as there would be lesser codes in the *mfe.

**Integration testing**: There would not be much of a change here as well. 

**E2E testing**: The testing is very much needed. Since the application is broken into *mfes, it is very much required to make sure the test is well written and thoroughly tested.

Other necessities to take care of
- Team formation
- Authentication
- Cross mfe communication
- State management
- Logging
- Performance
- Feature toggles
- Release management
- Maintain ADRs

## Do we want MFE or not?
- It is highly recommended not to think of *mfe from scratch but keep the code modular.
- Moving the code from monolithic code to *mfe is a journey. 
- Have domain boundaries clearly stated. 
- Check on the pattern you would like to use in your application.
- It adds complexity. Look at the complexity vrs advantages before trying out.
- Play a devils advocate to be sure the problem statement is solved by microfrontend.

## References
https://martinfowler.com/articles/micro-frontends.html
https://www.thoughtworks.com/en-in/about-us/events/webinars/microfrontend
https://www.youtube.com/watch?v=iZ-wIViaefc
https://livebook.manning.com/book/micro-frontends-in-action/micro-frontends-in-action/

## Code
https://github.com/jagatjeevan/xconf-mfe
There are branches where we are moving the spa to various *mfes


