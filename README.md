### **Hi, I'm Jagat Jeevan 👋**

[Blog](https://jagatjeevan.vercel.app/)

A Frontend Engineer, based out of Bangalore, India.

I love learning and sharing knowledge. My github account is full of small attempt for the same.

## Courses

Courses are written as Markdown and are separate from the blog content:

```text
courses/
  <course-slug>/
    course.md
    chapters/
      01-<chapter-slug>.md
```

The course file's YAML frontmatter supplies `title`, `description`, `level`, `audience`, `useCases`, `avoidCases`, `outcomes`, and `references`. Optional heading fields (`outcomesHeading`, `useCasesHeading`, `avoidCasesHeading`, `chaptersHeading`, and `referencesHeading`) and `sandboxName` keep course-specific UI copy in the course data. Its Markdown body introduces the course. Each chapter file uses frontmatter for `title`, numeric `order`, an optional `description`, and an optional external `tryItUrl`; the Markdown body contains the lesson.

The site generates `/courses`, `/courses/<course-slug>`, and `/courses/<course-slug>/<chapter-slug>` from these files. Select chapter text to open the comment action, then submit the note to save it. Closing the drawer before submission discards unsaved changes. Use the persistent Notes button to view comments on highlights in this chapter or across the course. Comments link back to their chapter and highlighted passage. Highlights and their submitted comments are stored in the browser's local storage and are not synced between devices.
