---
title: 'Manage github profiles for projects'
date: '2021-08-31'
description: 'It is quite important to manage your github profile while contributing to your project, may it be your personal repo, office repos or open source. Let us look to manage profiles like pro.'
tags: ['project setup', 'github profiles']
---

## Manage Github profiles for different projects

We all have been working on different projects on our machines. It is important to keep the GitHub profiles separate and use them appropriately. In this blog we would make switching the profiles w.r.t. repositories easy.

The first step in the journey is to have folders segregated so that we know where to use a particular Github profile. You could use folders like personal, work, open-source, etc. The intention is to understand where to use a certain identity.

Then we would require a global git configuration that would channelise/map the folder structure and the respective identities. Since you are using GitHub repositories, a global file would already be in the machine. The filename would be `.gitconfig` at the root directory.

A sample git-config would look like this

```
[user]
  email = jagatjeevans@gmail.com
  name = Jagat Jeevan Sahoo
```

Now we create conditions to refer to some profiles. We can do this like the below code.

```
[includeIf "gitdir:~/personal/"]
	path = ~/.gitconfig-personal

[includeIf "gitdir:~/work/"]
	path = ~/.gitconfig-work
```

Thirdly, we would create profiles that we have mapped in the git-config file. Now we create config files and update the configuration like below. The below code is minimalistic. You could add more configurations depending on your requirement/project.

```
[user]
  email = kanhajeevan@gmail.com
  name = Jagat Jeevan Sahoo
```

Finally, we need to verify the changes that we have done. Check the file is present in the home directory.

```
l | grep '.git*'
```

You should see all the git profiles you created from step 2. Then we should check if you get their respective profiles in the project folder. For that, we dive into the folder and type the following command.

```
git config --list
```

The above command shows the configuration you could have just configured in your config file.
