---
name: course-authoring
description: "Create or update concise technical courses in this repository's Markdown-driven courses format from supplied webpages, YouTube videos, PDFs, or notes. Use when organizing source material into course overviews and numbered chapters, summarizing learning resources, adding examples or exercises, or selecting and creating explanatory diagrams."
argument-hint: "[topic and source URLs or files]"
user-invocable: true
---

# Course Authoring

Turn the user's source list into a coherent, concise course that fits this portfolio's existing course pages. Create or edit files in `courses/<course-slug>/`; do not change the site renderer or introduce a new content schema unless explicitly requested.

For the exact frontmatter fields, paths, and Markdown examples supported by the site, follow [the course format reference](./references/course-format.md).

## Workflow

1. **Understand the request.** Identify the topic, intended learner, source list, expected depth, and whether the user wants a new course or changes to an existing one. If a choice materially affects the course and is not clear, ask a concise set of questions. Otherwise use sensible defaults: a beginner-friendly technical course, chapters ordered from prerequisites to application, and only as many chapters as needed to teach the topic.
2. **Inventory the current content.** Inspect the course loader and at least one existing course and its chapters before writing. If editing an existing course, preserve its established style and useful material. Choose a unique kebab-case course slug and zero-padded sequential chapter filenames.
3. **Gather source material.** Access each supplied webpage, video, or PDF using available tools or files. For videos, use accessible captions/transcripts or other substantive source content; a title or description alone is not enough to summarize the video. For PDFs, read the relevant pages and figures. Keep a source ledger with URL or filename, title, publisher/creator, accessed material, and any access limitations.
4. **Handle inaccessible sources honestly.** Do not infer or invent a source's contents from its title, search snippet, or thumbnail. Pause and ask the user to provide a transcript, text, accessible copy, or replacement source if a requested source cannot be read. Clearly distinguish partial access (for example, only some pages or captions) from full access. Do not silently omit a source the user expects to be covered.
5. **Plan before authoring.** Synthesize the sources into a short course outline with a clear progression, prerequisites, practical outcomes, and a reason for each chapter. Deduplicate repeated points, resolve contradictions using the most authoritative/current evidence, and flag material disagreements or version-sensitive advice rather than flattening them. Share the outline for confirmation when the scope or chapter structure is substantial or consequential; otherwise proceed and state the chosen structure.
6. **Write for learning, not source order.** Paraphrase in original language; do not reproduce long passages, paywalled text, or a source's distinctive expression. Keep chapters focused and crisp: explain the key idea, why/when it is useful (and relevant limitations), and how it works. Use a small code example where it materially helps, plus a practical exercise or check for understanding where appropriate. Mark assumptions and version-specific details.
7. **Use diagrams responsibly.**
   - Look for a diagram that genuinely clarifies a concept in the supplied material.
   - Reuse or copy a source diagram only when the user provided it with reuse rights or its license/terms permit the intended use. Preserve required attribution and license notices. A link and citation do not by themselves grant permission to copy an image.
   - Otherwise, create an original diagram that explains the sourced concept, not a redraw of a source's distinctive visual expression. Prefer a simple SVG asset in `public/courses/<course-slug>/diagrams/` and reference it with ordinary Markdown image syntax, using concise alt text. If SVG authoring/rendering is unavailable, use a clear text explanation or a compact code/table illustration instead of claiming an unrendered Mermaid block is a visual.
   - Cite the factual source informing each diagram. Do not add decorative diagrams where they do not improve understanding.
8. **Create the course files.** Write the overview and ordered chapter Markdown files using the repository schema. Put source links in the course's references and cite supporting sources in the relevant chapters with Markdown links and a short source list. Set `tryItUrl` only when a real, relevant sandbox or REPL is known and appropriate; never fabricate one. Keep the overview's outcomes, use cases, cautions, and chapter index consistent with the chapters.
9. **Validate.** Check YAML frontmatter, filenames, unique/sequential chapter orders, links, image paths and alt text, code formatting, and source attributions. Confirm the course loader can discover the new files and run the smallest relevant validation available (at minimum, inspect the generated diff; run the production build when feasible). Report sources that were inaccessible, assumptions, diagram provenance, files created, and validation results.

## Source and citation standards

- Prefer first-party documentation, standards, papers, or source material supplied directly by the user for technical claims. Use secondary explanations to add context, not to replace primary sources when they are available.
- Tie non-obvious or time-sensitive technical claims to the source that supports them. Keep citations close to the relevant explanation and include durable source URLs in the course reference list.
- Never imply that a source was read, watched, or verified unless its substantive content was actually accessible.
- Avoid excessive quotation. Use short quotations only when necessary, clearly marked and attributed; otherwise summarize.
- Do not include secrets, personal data, or unrelated material found in source files.
