---
title: 'Mono Repos for micro-frontend'
date: '2023-11-14'
description: 'A single repositories to hold all the independent deployable projects/libraries and other parts of the project.'
tags: ['micro-frontend', 'mono-repo', 'handle micro-frontend in one repository']
---

## Mono Repos

While it is a very good idea to break the application to smaller chunks and independent repositories wrt functionality, views or libraries, individual pages, etc, to deploy separately, manage independently. It becomes very difficult to know or manage things without absolute sync of the code. This is where mono-repo comes into play.

In short keeping all the different UI components in one repo may it be library, features, web applications, etc is what mono-repo is all about. Few of the benefits for mono repos are

- **Visibility**: Since all the feature and other libraries are in one repo, it is easy to refer and change.
- **Simpler dependency management**: This is the feature why mono-repo has evolved.
- **Consistency**: Enforcing various teams to be consistent wrt the design standards.
- **Atomic commits**: Feature wise commit. Since all the parts are inside one repo, it becomes easier to track to commit to central repository(git) in one go. It helps in understanding the code and commit by others.
- **Implicit CI**: Continuous integration is guaranteed as all the code is already unified in one place.
- **Unified CI/CD**: One can use the same CI/CD deployment process for every project in the repo.
- **Unified build process**: One can use a shared build process for every application in the repo.

While these are good using monorepo, there are some caveats as well. Those are:

- **Bad performance**: These are difficult to scale up. Commands like git blame may take unreasonably long times, IDEs begin to lag and productivity suffers, and testing the whole repo on every commit becomes infeasible.
- **Broken main/master**: A broken master affects everyone working in the monorepo. This can be seen as either disastrous or as a good motivation to keep tests clean and up to date.
- **Learning curve**: The learning curve for new developers is steeper if the repository spans many tightly-coupled projects.
- **Large volumes of data**: Monorepos can reach unwieldy volumes of data and commits per day.
- **Ownership**: Ownership of files is more challenging, as systems like Git or Mercurial don’t feature built-in directory permissions.
- **Code reviews**: Notifications can get very noisy. For instance, GitHub has limited notifications settings that are not best suited for a snow slide of pull requests and code reviews.

Before we dive deep into other things lets discuss about the concepts of it.

### How is module resolved ?

We can refer any functions by calling that function. If the function is in the current file, then it is just mapped. But if the function is in another file, we have to import. Node resolves this by 2 methods:

- Relative path with a period(.) to refer in the same folder or double period(..) to move up the folder
- Using the package name (loadash, react, react-datepicker, etc). Here node would search in the node_modules in the current directory. If the package is found, then the module is resolved, else it would go to the parent directory and search for node_modules there and if not found, then one more up in the parent directory. This way is called as the node_modules package resolution strategy.

### Linking a node_module

Symlink / Symbolic link / shortcut link to a file or directory. It is supported in Windows, Linux, MacOs and available in Npm and Yarn.
To link a particular module and register, we can go to the respective folder and run `npm link` or `yarn link` When we run the command, we could see there is a node_module folder and there is a copy of the directory inside where we run the command. If you are using VSCode, you could see the symlink symbol against the directory.

While going to respective folder and running npm link might be tedious for the development, npm and yarn have come up with workspaces to ease development.

### Workspaces

To create workspaces, we can tell node to create a symlink by adding `workspace` in package.json in the root folder. Below is an example for creating workspace in a mono repo. Here we are creating packages from the packages directory. Whenever we do a `yarn install` or `npm install`, symlinks are automatically created and linked. We have to do a force install whenever we are adding the workspaces. And once the symlinks are created, it should automatically be updated on change of the files.

```
File structure:
|- <monorepo_project_name>
|--- packages
|----- package-1
|----- package-2
|--- web-application-1
|--- web-application-2
|--- package.json
```

```
package.json
{
  name: 'monorepo project name',
  ... other things
  workspaces: {
    packages: ['packages/*]
  }
}
```

Since the symlinks are created in the parent folder node_modules, we might not require to hoist all the modules of any workspace to the parent. In that case we need to have a way to make sure we do not dump every module to the parent. This is also helpful in terms of dependency version management. For that we can use a `nohoist` key in the package.json like below:

```
{
  …
  workspaces: {
    …
    nohoist: [‘**/loadash’]
  }
}
```

`Note: There is a little difference between npm and yarn with hoist. Do check with increasing versions of npm and yarn.`

### Making executables

Though this is not the part of mono repo as such, thought to include it here as we are discussing about npm hoisting. You might have seen we could execute some of the cli command. Ever thought of how it is been done. Any executable module would be there in the ‘.bin’ folder inside the node_modules. This is where any executable is run from. If the module is installed globally then it would work in the terminal, else we have to create npm scripts and run them there.

#### How to create an executable

Add the executable file that need to run when the name of the package is executed. Then do a `npm install —force` to create a bin directory / update the bin directory if already present. Note force is required when there is no change in package-lock.json for npm install to work. And to work in the below example: my-executable would work in the script tag.
We need to make sure the index.js is run from node env. And for that we have to add a line in index.js as below:

```
Inside index.js
#!/usr/bin/env node
…. Code follows
```

```
Inside package.json
{
  …
  name: “my-executable”,
  bin: “./index.js”
}
```

Another module where my-executable is installed and want to execute it.

```
Inside package.json
{
  …
  name: “my-consumable”,
  script: {
    start: “my-executable”
  }
}
```

Inorder to name our executable, we could change our bin property from string to object.

```
Inside package.json
{
  …
  name: “my-executable”,
  bin: { <name_of_executable>: “./index.js” }
}
```

### Some syntaxes to keep it handy

Want to run a script for a specific package :

```
cd to that package and run the script
Or run from the parent folder: npm --workspace=package-name run <script_name>
Ex: npm --workspace=package-1 install react --save
```

Want to run a common script present in all packages:

```
npm --workspaces run <script_name>
```

Ignore missing script:

```
npm --workspaces --if-present run <script_name>
```

### Some of the tools for monorepo

- [**Lerna**](https://github.com/lerna/lerna): monorepo manager for JavaScript. Integrates with popular frameworks like React, Angular, or Babel.
- [**Yarn Workspaces**](https://classic.yarnpkg.com/en/docs/workspaces/): installs and updates dependencies for Node.js in multiple places with a single command.
- [**ultra-runner**](https://github.com/folke/ultra-runner): scripts for JavaScripts monorepo management. Plugs in with Yarn, pnpm, and Lerna. Supports parallel building.
- [**Monorepo builder**](https://github.com/symplify/monorepo-builder): installs and updates packages across PHP monorepos.
