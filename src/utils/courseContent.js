import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const coursesDirectory = path.join(process.cwd(), 'courses');

export function getCourseSlugs() {
  if (!fs.existsSync(coursesDirectory)) return [];
  return fs
    .readdirSync(coursesDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => fs.existsSync(path.join(coursesDirectory, slug, 'course.md')));
}

export function getCourseOverview(slug) {
  const filePath = path.join(coursesDirectory, slug, 'course.md');
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
  return { ...data, content, slug };
}

export function getCourseChapters(slug) {
  const chaptersDirectory = path.join(coursesDirectory, slug, 'chapters');
  if (!fs.existsSync(chaptersDirectory)) return [];

  return fs
    .readdirSync(chaptersDirectory)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const chapterSlug = filename.replace(/\.md$/, '');
      const filePath = path.join(chaptersDirectory, filename);
      const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
      return {
        ...data,
        content,
        slug: chapterSlug,
      };
    })
    .sort((first, second) => first.order - second.order);
}

export function getCourseChapter(courseSlug, chapterSlug) {
  const chapter = getCourseChapters(courseSlug).find((item) => item.slug === chapterSlug);
  return chapter || null;
}
