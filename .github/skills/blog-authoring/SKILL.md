---
name: blog-authoring
description: "Create or update technical blog posts in content/*.md from supplied URLs. Use when researching webpages, explaining technical material simply, writing code-rich articles, or adding source references in this website's existing blog format."
argument-hint: "URLs to use as sources, plus an optional topic, audience, or target filename"
---

# Blog Authoring

Create original, technically useful blog posts for this website from the URLs the user provides. Save posts as Markdown files in `content/`, which powers the `/blogs` pages.

## Workflow

1. **Understand the request.** Collect the supplied URLs and any requested topic, audience, title, or target filename. If a necessary detail cannot be established from the request or sources, ask rather than inventing it. Do not overwrite an existing post unless the user asks to update it.
2. **Read and verify the sources.** Open each URL and read the relevant page content, not just its title or search-result snippet. Prefer official documentation and primary sources for technical behavior. Cross-check version-sensitive or consequential claims against authoritative sources when available.
   - Keep a private working map of claims and the URLs that support them while drafting.
   - If a page cannot be accessed, say so and do not imply that it was reviewed. Continue only with claims supported by the remaining sources; ask for an accessible source if the unavailable material is essential.
   - Do not fill gaps with guesses, fabricated quotations, statistics, APIs, behavior, or references. Omit unsupported claims or clearly identify uncertainty.
3. **Choose an original explanation.** Synthesize the sources around a clear question or practical problem. Explain concepts in straightforward language and your own structure and phrasing; do not translate or closely paraphrase a source paragraph by paragraph. Preserve attribution for ideas and findings that are not common knowledge.
4. **Make it technical and practical.** Include relevant code examples, commands, configuration, or tests where they genuinely help explain the topic. Use fenced code blocks with language labels. Keep examples consistent with the cited tools and versions, explain important assumptions, and do not present unverified code as tested. Label simplified or illustrative examples as such.
5. **Write the post.** Follow the existing posts' plain Markdown style: a descriptive title, concise sections, short paragraphs and lists where useful, and code blocks for technical material. Include inline links near claims when useful and a `## References` section listing the source URLs. Do not add images or other assets unless requested or needed and available.
6. **Save and check.** Create the file at `content/<descriptive-kebab-case-slug>.md`. Use this front matter, matching the site's existing shape:

   ```yaml
   ---
   title: 'Descriptive blog title'
   date: 'YYYY-MM-DD'
   description: 'A concise summary of the post.'
   tags: ['relevant tag', 'another tag']
   ---
   ```

   Use the current date for a new post. When updating a post, set `date` to the update date because the site uses this field as the displayed post date. Do not add an `updated` field: the blog page currently reads and displays `date`. Check that the front matter is valid, the Markdown renders sensibly, all listed references were actually reviewed, and each factual technical claim is supported.

## Content and attribution standards

- Write for the requested audience, or use a curious web developer as the default audience.
- Keep explanations accessible without removing technical precision. Prefer concrete examples over broad, unsupported claims.
- Keep the post's wording and organization original. Quote sparingly, use quotation marks for direct quotes, and link to their source.
- Cite source-dependent claims with links in the relevant section and include the URLs in `## References`.
- Never claim to have run code, tests, or benchmarks unless they were actually run.
- Preserve the existing post's material when updating it unless the user asks for a broader rewrite; verify and revise stale claims and references.
