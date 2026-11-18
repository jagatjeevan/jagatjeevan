---
title: 'Use Fewer Tokens When Solving Problems with AI Agents'
date: '2026-11-18'
description: 'Practical ways to keep coding-agent context focused, reduce wasted tool output, and preserve solution quality.'
tags: ['ai', 'agents', 'developer productivity']
---

AI agents can inspect files, run commands, and iterate on a problem, so the prompt you type is only part of the context they process. Tool results and earlier turns may also be carried into later model requests. That makes a broad task or a noisy command more expensive than it first appears. [DataCamp describes this feedback loop](https://www.datacamp.com/tutorial/how-to-reduce-token-usage-in-ai-coding-agents), while [Redis explains how input and generated output affect cost and latency](https://redis.io/blog/llm-token-optimization-speed-up-apps/).

Reducing token use does not mean making instructions cryptic or skipping necessary investigation. It means giving the agent the smallest useful context, asking for a bounded result, and keeping enough evidence to verify the work.

## 1. Define the problem and the finish line

Vague requests often lead to extra repository exploration, guesses, and follow-up corrections. State the observed behavior, the expected behavior, and the conditions the solution must preserve. Clear, concise instructions are more useful than long prompts that repeat the same requirement; [IBM's prompt-engineering guidance](https://developer.ibm.com/articles/awb-token-optimization-backbone-of-effective-prompt-engineering/) likewise emphasizes relevant context and unambiguous instructions.

For example, instead of:

> Fix the flaky retry behavior. Check everything and make it robust.

Try:

> In the upload retry flow, prevent retries after a successful response. Keep the existing backoff behavior. Inspect the retry implementation and its tests, make the smallest correct change, and run the focused test. Report the changed files and test result.

The second request gives the agent a target, a boundary, and a useful stopping point without prescribing an implementation before it has inspected the code.

## 2. Let the agent find relevant context; don't preload the whole project

Avoid pasting a complete file, long log, or repository overview when a specific function or failure is enough. Give a known file or symbol when you have one. Otherwise, describe the symptom and ask the agent to locate the likely implementation and its direct callers or tests.

This keeps irrelevant material out of the working context while still leaving room for the agent to discover what it needs. If the first files do not explain the behavior, expand the search deliberately rather than loading everything up front. [Pluralsight's AI-development tips](https://www.pluralsight.com/resources/blog/ai-and-data/cutting-ai-token-usage-development) recommend using selective file or symbol references in place of broad context dumps.

## 3. Keep tool output useful and bounded

Tool calls can return far more text than the agent needs. Prefer a focused test, a narrow search, or a concise status summary over dumping every test log or command result into the conversation. When a command fails, preserve the error and the relevant surrounding lines; filtering should remove noise, not the evidence needed to diagnose the problem.

The same principle applies to agent tools and integrations: enable what the task needs, and avoid returning large lists or full documents when a targeted query or excerpt will do. Some coding-agent setups provide output filters or context-management tools, but check what they omit before relying on them. [DataCamp's overview](https://www.datacamp.com/tutorial/how-to-reduce-token-usage-in-ai-coding-agents) covers tools that reduce verbose responses, overbuilt implementations, and large tool results; the right choice depends on the workflow.

## 4. Ask for the smallest complete change

Tell the agent to reuse the project's existing patterns and avoid unrelated refactors, new dependencies, or extra abstractions unless they are needed. A smaller implementation often also means less generated code to review and less new context for later steps.

“Smallest” should not mean “skip correctness.” Include relevant acceptance criteria such as error handling, compatibility, or accessibility, and ask for the focused test that checks the behavior. Token savings are not worth a fragile fix.

## 5. Bound the deliverable

Output is part of the token budget too. Specify the result you need: for example, a patch plus a short summary, changed file names, and test outcomes. If you only need a direct answer, say so. If you need a review, define the review criteria instead of asking for a general essay.

Do not trade away important reasoning or verification just to force a tiny response. A concise report should still include failures, caveats, and any work left undone. [Redis's optimization guide](https://redis.io/blog/llm-token-optimization-speed-up-apps/) notes that output length can affect both cost and response time.

## 6. Reset context when the task changes

Long sessions can accumulate old explanations, tool results, and approaches that no longer matter. When the task changes, start a separate conversation if your agent supports it. When continuing the same task, carry forward a short checkpoint with the current goal, decisions, changed files, test results, and next step rather than the entire exploration history. This follows the session-management approaches discussed in [DataCamp's guide](https://www.datacamp.com/tutorial/how-to-reduce-token-usage-in-ai-coding-agents) and [this Claude Code workflow article](https://medium.com/@habib23me/10-tip-to-stop-burning-your-tokens-in-claude-code-4776d4ac8956).

Persistent project instructions should also stay focused on rules that matter across tasks. Put task-specific details in the task request, and keep large reference material available on demand where your agent supports it.

## 7. Match the model to the work, then measure

A simpler model may be sufficient for a routine lookup or small edit, while a difficult diagnosis may benefit from a stronger model. This is primarily a cost-per-token decision, not a guarantee that the task will use fewer tokens: a cheaper model can still need more turns or produce an inadequate result. Choose based on task difficulty and verify the outcome. Both [Pluralsight](https://www.pluralsight.com/resources/blog/ai-and-data/cutting-ai-token-usage-development) and [MindStudio](https://www.mindstudio.ai/blog/token-reduction-strategies-ai-agents-cut-costs) discuss matching model choice to task complexity.

When usage data is available, compare similar tasks before and after a change. Look at input and output tokens, tool calls, correction rounds, and whether the result still passes the same checks. Token counts and billing vary by provider and plan; caching can change how repeated input is charged, but does not make irrelevant context useful. Optimize for a correct result with less waste, not a token target in isolation.

## A compact prompt to reuse

```text
Problem: [observed behavior] should be [expected behavior].
Scope: Inspect [known file/module] and directly related tests/callers.
Constraints: Preserve [important behavior]; avoid unrelated changes or dependencies.
Done when: [acceptance criteria].
Verify: Run [focused test/check].
Return: Patch, changed files, test result, and any remaining caveat.
```

Not every task needs every line. The point is to make the desired outcome and boundaries explicit so the agent spends its effort solving the problem rather than figuring out what “done” means.

## References

- [11 ways to cut token usage in AI-assisted development](https://www.pluralsight.com/resources/blog/ai-and-data/cutting-ai-token-usage-development)
- [Token optimization: Backbone of effective prompt engineering](https://developer.ibm.com/articles/awb-token-optimization-backbone-of-effective-prompt-engineering/)
- [How to cut LLM token costs & speed up AI apps](https://redis.io/blog/llm-token-optimization-speed-up-apps/)
- [How to Reduce Token Usage in AI Coding Agents: 4 Tools That Can Help](https://www.datacamp.com/tutorial/how-to-reduce-token-usage-in-ai-coding-agents)
- [10 Tips to Stop Burning Your Tokens in Claude Code](https://medium.com/@habib23me/10-tip-to-stop-burning-your-tokens-in-claude-code-4776d4ac8956)
- [Token Reduction Strategies for AI Agents](https://www.mindstudio.ai/blog/token-reduction-strategies-ai-agents-cut-costs)
