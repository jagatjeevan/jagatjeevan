# Course Content Format

This reference follows the repository's current loader in `src/utils/courseContent.js` and the renderer in `pages/courses/`.

## Directory layout

```text
courses/
  <course-slug>/
    course.md
    chapters/
      01-<chapter-slug>.md
      02-<chapter-slug>.md
public/
  courses/
    <course-slug>/
      diagrams/
        <diagram-name>.svg
```

The course slug is the directory name. Chapter slugs are filenames without `.md`; chapter pages are built from those names. The loader sorts chapters by their numeric `order` frontmatter.

## Course overview

`course.md` starts with YAML frontmatter. The listing, overview, and reference pages read these fields:

```yaml
---
title: 'Course title'
level: 'Beginner'
audience: 'Who the course is for'
description: 'A concise summary used on the course listing and overview.'
outcomesHeading: 'What you will learn'
useCasesHeading: 'Where to use this'
avoidCasesHeading: 'When this may not be the right choice'
chaptersHeading: 'Course chapters'
referencesHeading: 'References and further reading'
sandboxName: 'Optional sandbox label'
useCases:
  - 'A suitable use case.'
avoidCases:
  - 'A limitation or situation where another approach fits better.'
outcomes:
  - 'A specific skill or concept the learner can demonstrate.'
references:
  - title: 'Source title'
    url: 'https://example.com/'
    description: 'What the learner can find there.'
---

Optional overview prose in Markdown. Explain prerequisites and how to use the course.
```

The heading labels and `sandboxName` are optional; the site supplies defaults. Keep `useCases`, `avoidCases`, `outcomes`, and `references` as YAML arrays, including when there is only one item. A reference requires a stable `title` and `url`; add a short `description` when useful. The overview prose appears beneath the learning outcomes and use-case sections.

## Chapter

Each chapter is a Markdown file in `chapters/`. Use a zero-padded sequence in the filename and a matching integer `order`.

```yaml
---
title: 'Chapter title'
order: 1
description: 'A short chapter summary.'
tryItUrl: 'https://example.com/relevant-sandbox'
---

## Main concept

Explain the idea in original, concise prose.

## Example

Show a focused example when it helps.

![Concise description of the diagram](/courses/<course-slug>/diagrams/<diagram-name>.svg)

**Exercise:** Apply the idea in a small task.

**Sources:** [Documentation title](https://example.com/relevant-section)
```

`description` and `tryItUrl` are optional. Omit `tryItUrl` rather than inventing a sandbox or embedding a site unsupported by the course UI. Markdown is rendered by `react-markdown`; use standard Markdown headings, lists, links, fenced code blocks, and images. Do not assume custom plugins (including Mermaid rendering) are installed.

## Compatibility and quality checks

- Keep the course title, overview outcomes, chapter titles/order, and chapter content consistent.
- Every chapter must have a unique filename/slug and a unique, sequential numeric `order` starting at 1.
- Keep YAML valid and quote strings containing punctuation that may be interpreted as YAML syntax.
- Store diagram assets under `public/courses/<course-slug>/diagrams/`; reference them with the matching root-relative URL. Use descriptive alt text and check that every referenced file exists.
- Use source links both in a course-level `references` list and near the chapter claims they support. The page renderer does not automatically generate citations.
- The course listing derives chapter count from the chapter files; do not hardcode that count in frontmatter.
