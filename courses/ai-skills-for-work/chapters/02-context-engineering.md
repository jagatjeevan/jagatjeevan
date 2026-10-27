---
title: 'Context engineering'
order: 2
description: 'Make the right background information easy to find, keep it current, and scope it appropriately.'
---

## Build a useful reference library

Briefing supplies what a task needs now. Context engineering, as the video uses the term, organizes information and instructions that should be available repeatedly: project background, preferred formats, source locations, definitions, and examples of acceptable work.

Start with a small, navigable structure:

```text
project/
  README.md            # purpose, owners, and where to find things
  instructions.md      # durable working rules and constraints
  references/          # approved, current background material
  examples/            # reviewed examples of expected outputs
  tasks/               # task-specific inputs and drafts
```

The exact structure depends on the AI product. Some assistants have project spaces or instruction files; others need selected documents attached for each task. Do not assume one tool can see another tool's project context. Keep instructions concise, label dates and owners, and remove stale or duplicated guidance.

More context is not always better. Provide only what the task needs, and avoid placing credentials, personal data, or restricted business information in a workspace that is not approved for it. Set explicit boundaries for uncertain or conflicting files.

## Keep context maintainable

Treat shared context like documentation: assign an owner, review it when the process changes, and replace outdated examples. A short index that points to authoritative material is often more useful than a folder of unlabeled files.

**Exercise:** Create a one-page index for a recurring work task. List the three most useful references, their owners or dates, and one type of information the assistant must not use.

**Sources:** [Supplied video transcript](https://www.youtube.com/watch?v=eCn8pZFDMso); [ChatGPT Projects: add context to guide responses](https://help.openai.com/en/articles/10169521-projects-in-chatgpt)
