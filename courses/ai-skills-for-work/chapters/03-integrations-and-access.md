---
title: 'Integrations and access'
order: 3
description: 'Connect an assistant to approved tools while minimizing access and checking what actions it can take.'
---

## Choose the connection that fits

An assistant can work with external systems through built-in connectors, a protocol such as MCP, an API or script, or a browser interface. Which choices are available depends on the product and organization. A connection is not automatically safe or complete: it may expose only some data or actions, and it may behave differently from a person using the interface.

The [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) is an open standard for connecting AI applications to tools and data sources. A protocol standardizes how clients and servers communicate; it does not certify that a particular server is trustworthy, secure, or authorized to handle your data.

Before connecting a service, ask:

- Is this integration approved for the data involved?
- Which accounts, records, and actions will it expose?
- Can access be read-only or restricted to a narrow workspace?
- Does the assistant need permission to change data, or only to prepare a draft?
- How are credentials stored, access logged, and permissions revoked?

Prefer the least access that accomplishes the task. For new or unfamiliar integrations, test with non-sensitive data and inspect the result. Be especially careful with tools that can send messages, edit records, publish content, or trigger other systems.

## Handle unavailable integrations

If a prebuilt connector is missing, ask an administrator or developer about an approved MCP server, API integration, or existing automation. Browser-based workarounds can be brittle and should not bypass access controls or organizational review. Avoid pasting secrets into chat or source code.

**Exercise:** Map one task's systems and data. For each connection, record the minimum required permission and one action that should require human approval.

**Sources:** [Supplied video transcript](https://www.youtube.com/watch?v=eCn8pZFDMso); [MCP introduction](https://modelcontextprotocol.io/introduction); [Claude Code MCP guidance](https://code.claude.com/docs/en/mcp)
