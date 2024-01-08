---
title: 'Project Setup'
date: '2021-06-20'
description: 'While setting up a project, we tend to miss some obvious defaults which might take a bit more time than usual if not setup earlier. In this, we would see some of the sensible defaults web has evolved and we should have it in the start of the project.'
tags: ['project setup']
---

## Project Setup

With the CLI(Command Line Interface) available for all projects now to setup / scaffolds the entire project with all the best practices, do we want to care of other things we might require in future ?

The CLI generally create a project on a framework and do not add extra things to keep things simple and cater to majority. I generally have some checklist which I use it as a default thing whenever I start a frontend project apart from what CLI provides. In this blog, I would share them with you.

- **Update Readme file** : This is the first thing that would come in github and anyone would see. So I generally have the following sections which help fellow contributors as well as others to know what this repository would do and how they use it. I generally have the following section.

  - Badges : Build status, Coverage, Dependable bot. Dependable bot alerts of security concern used in node_modules. You could check from github repo > settings > security and analysis
  - What does it do
  - Installation : How to run it and see
  - Tech Stacks Used
  - Some Practices followed in the repo
  - TODO / Fixme : This would give the fellow developers see what are the things they can contribute. This is not the features / delivery things as such. This is more in terms of setup / adding some good practices.

- **Node** : It is always better to mention the node version so that developer do not have to worry for your compatibility. Check the [end-of-life for node](https://nodejs.org/en/about/releases/) while choosing the version. It becomes very difficult to have more than one node version in a system and manage it. I generally use [nvm](https://github.com/nvm-sh/nvm) to manage my node versions and shift from project to project. Create a `.nvmrc` file and mention the version you are using.

- **.gitignore** : We only push the source code and other files and folder which would be required to build the project. We do not put any other files and folder which can be generated like node_modules folder. Any CLI would have these things already in place. Add other files and folder which can be generated.

- **Prettier** : Having a standard of writting code and making a default for all the editors so that the code looks decent, while committing the code, developer should not override each others' way of writting. Either we can use [editorconfig](https://editorconfig.org/) / [prettier](https://prettier.io/) for this matter. I feel prettier has a wider support.

- **Linters** : Linters enforces the best practices and should be present in a project. Most CLI would already include it. If you add any other enablers like typescript, sass, etc do add respective linters. There are few obvious ones which could be fixed without manual intervention. These can be fixed by the linter itself. So you sould put it some helpful command in the `package.json` under `scripts` section to have handy for anyone to contribute.

- **Testing and Coverage** : It is by default now that we need to have unit tests and coverage for our code. Unit tests make sure you do a basic sanity of your code is done before pushing the code. Coverage gives a understanding of the parts of the code we have not tested.

- **Pre-commit hooks** : While having all the good practices is not enough and we need to enforce all to practice to continue. This makes sure that we follow all coding standards before pushing the code to github.

- **Editor Settings** : Now a days, the editors have a good intellisense to point you errors while writing the code depending on the linters present in your project code. It becomes easy to understand and fix them while coding rather than while pushing the code.

- **Mock server** : With UI being a separate repo now, to run your code you might require some dummy data (API contract) to see something and test. If it is already set, people might find easy to see the features they are working on and define what should be the response API gives.

- **Multi-language support** : As most of the wants to global, it becomes very evident that the requirement might come for the support of multiple languages. It becomes very difficult to change the hard-coded values later. So if multilanguage support is already in place, it is just a matter of following it.

- **Localisation** : Every project deals with the date and currency in their project. It is better to localize these values. Set it up so that it becomes easy to deal with it. Check for other formatters you would like to add in the starting of the project.

- **Dockerfile** : If you are working on a large team, it would be quite obvious that the project would use Docker to run your project. And if so creating a optimised version of it would help others integrate your code with the complete set.

- **License** : Every project should have a license for their project which tells the user if they could leverage from their project.

- **Bookmarks** : It is always important to have your bookmarks segreggated. It makes it handy to access the resources and refer.

- **Github settings** : Since you would be contributing to a project, it is always better to make sure you update the code with the github profile associated. To create one, read [here](/blogs/manage-github-profiles). You can add the ssh-key to avoid typing the username and password all time while pushing the code to the repository.

You might also want to look into the checks for moving the code to production. You could check it [here](/blogs/moving-the-code-to-production).
