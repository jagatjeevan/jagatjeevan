---
title: 'Team plugins and governance'
order: 7
description: 'Package team capabilities while recognizing that plugins are vendor-specific, not a universal format.'
---

## From personal setup to shared capability

When multiple people solve the same task, individually maintained instructions can drift. A shared skill or extension can give a team a reviewed starting point, but distribution and update mechanisms are specific to each AI product.

In Claude Code, a plugin can package components such as skills, agents, hooks, and MCP servers and install them together. That is a vendor-specific meaning; other products may use “plugin,” “extension,” or “skill” differently. A plugin is not always required to share a procedure—sometimes a documented skill or approved repository is simpler.

## Govern what the team installs

Shared packages can also distribute incorrect instructions, excess permissions, or untrusted code. Assign an owner, use versioned releases where supported, review changes, document what tools the package connects to, and provide a way to disable or roll back an update. Apply access controls and testing appropriate to the package's actual capabilities. Make clear which parts are guidance and which can execute actions.

Start with one team workflow and a small pilot. Gather user feedback, check outputs against the acceptance criteria, then expand distribution only when ownership and support are clear.

**Exercise:** For a reusable team capability, list its components, owner, access needs, review process, version/update method, and rollback path.

**Sources:** [Supplied video transcript](https://www.youtube.com/watch?v=eCn8pZFDMso); [Claude Code plugins overview](https://code.claude.com/docs/en/plugins)
