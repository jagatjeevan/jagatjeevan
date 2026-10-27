---
title: 'Reusable agent skills'
order: 5
description: 'Turn a reviewed, repeatable process into reusable instructions and supporting resources.'
---

## Capture a process after it works

A reusable agent skill is a packaged set of instructions and supporting resources for a recurring task. The exact format and availability vary by product. For example, Anthropic and OpenAI document skills as directories or bundles centered on a `SKILL.md` with optional supporting files; that does not mean a skill created for one product works unchanged in another.

Start by doing the task with an assistant and a person together. Record the steps, source locations, decision points, example inputs, expected output, and failure conditions. Revise the process until the output meets a known standard. Then package the instructions and any reusable template or reference file.

## Test and maintain it

Test a skill with representative cases, including missing and contradictory inputs. Check that it asks when needed, respects permissions, and produces the expected format. Version it, name an owner, and update it when the process changes. Do not save secrets or personal data in skill files. If an output goes wrong, investigate whether the issue was the task brief, source context, tool access, or reusable instructions before changing the skill.

**Exercise:** Write a minimal `SKILL.md` outline for one recurring task: purpose, when to use it, inputs, steps, output format, and when to stop. Test it with one ordinary and one edge-case input.

**Sources:** [Supplied video transcript](https://www.youtube.com/watch?v=eCn8pZFDMso); [Anthropic Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview); [OpenAI Skills documentation](https://developers.openai.com/api/docs/guides/tools-skills)
