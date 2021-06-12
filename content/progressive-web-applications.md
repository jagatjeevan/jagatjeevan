---
title: 'Progressive Web Applications'
date: '2020-06-11'
description: 'Leveraging mobile device capability in web like offline, accessing device features, etc. Harnessing the power of both moblie and web world'
tags: ['javascript', 'progressive web apps']
---

# Why do we care ?

Experts say it is the future of e-commerce. [Here](https://www.pwastats.com/) are some stats.

In today's digital world, you would be either using a website or a mobile app to search, shop, socialize, learn, news, etc. For few of the use cases, websites would be more appropriate while some other cases, mobile apps would be more appropriate.

# When to choose mobile apps over creating a website

- Security : Man in the middle can not tweak code.
- Offline access
- Re-engaging : Notification

# When to choose creating a website rather than apps

- Easy access : No need to install and search in play store / app store
- No installation or down time : Deployment is easy, always get updates instantaneously. Use in mobile browser / web browser in device
- No permissions required
- Shareable : You could copy paste the url to someone.
- Easy Debugging / logging for the developers
- One searches web rather than mobile apps.
- Cost effective

The most important factor to consider while developing from the clients' end is costing while getting the best of both worlds. And this is where PWA comes into picture. Web has been evolving constantly and the way user wants to interact is also changed drastically. Let us have a look what [web can do today](https://whatwebcando.today/).

Now that we understand that web is very powerful today and could leverage a lot from the device capability. See it in action [here](https://whatpwacando.today/). It becomes very important to maintain the hygiene and sanity. You could have a checklist while creating a PWA project [here](https://web.dev/pwa-checklist/).

# When not to use PWA ?

- High Battery usage : https://clutch.co/app-developers/resources/pros-cons-progressive-web-apps
- Pwa components might not be fully supported like background-sync, notification. PWA community is growing fast.
- Graceful degradation and cost.
- Browser support compatibility : Check it [here](https://caniuse.com/)

# Few gotchas of components from PWA

While implementing the components of PWA, do make sure to check the gotchas.

- Cache-ing : One of the important feature of PWA is to cache and serve it from the cache for better performance and offline support. While you do cache-ing, make sure to invalidate the cache. For cache-bursting, you can check for the eTag, max-age, last modified date. Do check for the cache-ing stratergies for the specific requirement. Those are
  - network only : Used for sensitive data / where we would like to have live records like score of a live match, account statement of a bank account holder, etc.
  - cache only : Used for static data which generally do not change
  - Network first : When you want all live data but want to fallback on the cache if network not present.
  - Cache first : Checks the cache first and then checks the network.
  - Stale while revalidate : Triggers both network and cache and then updates the cache with the network data. These are the content which rarely changes.
- Background Sync : For flaky internet, how to roll back or maintain the state of how far it is synced. Offline first approach is the best way to check for background sync. Check for time to refresh the data. Various strategy for syncing for types of data like email, chats, photos and videos, etc.
- Push Notification : According to stats, more than 75% of the customer re-engage with the app by push notification. And stats also say that more than 14% of users stop the push notification becuase of too much of notification. So we need to make sure we are catious about

  - Timing : When to send notification
  - Content : Web Push Notification title, description, call to action
  - Target : User context to send a push notification i.e do not do a Notification bombarding
  - Relevancy & Setting : Where to land and the right time to go live. Get context of the user’s geolocation, device, etc
  - Intuitive for unsubscribe

- Add to homepage
  - Check for logo in various contrast. It might not be too evident in dark background or image background.
  - Default homepage, for PWA makes it installable.

