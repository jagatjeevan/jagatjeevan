---
title: 'Frontend Security'
date: '2023-12-29'
description: 'Consumers today rely on digital devices to manage banking, healthcare, shopping, and communications. Customers expect to be able to do business safely and securely online, without their PII or payment information being stolen.'
tags: ['security', 'production checklist for security', 'before deployment']
---

## Business Context

Consumers today rely on digital devices to manage banking, healthcare, shopping, and communications. Customers expect to be able to do business safely and securely online, without their PII or payment information being stolen.

Since the user would interact with the application in the client-side / frontend more, thus it is very much important to check and secure all the vulnerabilities at the first gate itself.

Below are some of the checklist to have it ticked before going to production.

**Code Readiness**

- Pipeline/Project configuration

  - Uglify and minify code for performance, removal of dangerous comments marked by developers to understand the code.
  - Whitelist trusted website and block all other websites’ content.

- HTML/JS templating

  - Avoid dangerouslySetInnerHTML in React, bypassSecurityTrust in Angular, or v-html and v-bind in Vue. Check for similar vulnerability for setting script tags for input values in your framework used.
  - Do not store keys and secrets in code. Fetch it from API (Fetching configurations run time). This helps in hiding the secrets and keys of environment.
  - Do not use encryption/decryption logic in client side. This would expose everything also the key has to be stored or used in JS which is exposed.
  - Be careful in showing and storing PII info and other secrets in browser’s context like localStorage, sessionStorage, cookie, session etc. Avoid storing or validate more often to check if it is tampered.
  - Avoid vulnerable keywords like document.write, setInnerHTML, etc

- CSS

  - Do not hide sensitive content using CSS. Remove the content from page itself.

- Forms
  - Disable browser’s auto-complete on sensitive form elements like login password, etc.
  - Add rel='noopener noreferrer' to external links
  - Do not use static ids to forms.
- Setting Headers. Set appropriate flags in cookies, headers
  - Enable https
  - Set cookie, header and resources expiry
  - Check for domains to be allowed and domains from where cookies sent from
  - Always use signed and encrypted cookies
- Prevent CSRF attack by
  - Implement same-site cookie
  - Implement CSRF token by nonce tokens.
- Prevent critical resources by path traversal. Restrict / authorise download of business critical assets.

**Network**

- Implement CSP (Content Security Policy)
  - Do not allow all domains with an \*
  - Be careful about using 'unsafe-inline', 'unsafe-eval', 'strict-dynamic', 'unsafe-hashed-attributes'
  - Use sub-resource integrity which can be easily set in CSP
- Add Security headers
  - X-Frame-Options
  - Strict transport Security
  - Access-Control-Allow-Origin
  - X-Content-type-options
- Dont use mixed content, http and https
- Add http to https redirection
- Disable CORS to support local development
- Disable cookie security flags for local development

## Some helpful tools/practices

- Setup monitoring and logging tools
- Dependency checker : npm audit, Synk, etc
- SAST and DAST for static and dynamic checker
- Secrets scanning tools like sonarqube
- Security checks should be done at intervals and not the last minute.

## To read more

- [Security Trails](https://securitytrails.com/blog/frontend-security-best-practices)
- [OWASP Cheat sheet series](https://cheatsheetseries.owasp.org/)
- [OWASP ASVS](https://owasp.org/www-pdf-archive/OWASP_Application_Security_Verification_Standard_4.0-en.pdf)
- [Front-End-Checklist](https://github.com/thedaviddias/Front-End-Checklist#security)
- [CSP Cheatsheet](https://scotthelme.co.uk/csp-cheat-sheet/)
