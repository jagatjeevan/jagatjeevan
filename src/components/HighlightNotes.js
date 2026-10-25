import { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../../styles/courses.module.scss';

function getTextOffset(root, node, offset) {
  const range = document.createRange();
  range.selectNodeContents(root);
  range.setEnd(node, offset);
  return range.toString().length;
}

function findAnnotationRange(annotation, text) {
  if (text.slice(annotation.start, annotation.end) === annotation.text) {
    return { start: annotation.start, end: annotation.end };
  }

  let matchAt = text.indexOf(annotation.text);
  while (matchAt !== -1) {
    const prefix = text.slice(Math.max(0, matchAt - 32), matchAt);
    const suffix = text.slice(matchAt + annotation.text.length, matchAt + annotation.text.length + 32);
    if (prefix.endsWith(annotation.prefix || '') && suffix.startsWith(annotation.suffix || '')) {
      return { start: matchAt, end: matchAt + annotation.text.length };
    }
    matchAt = text.indexOf(annotation.text, matchAt + 1);
  }
  return null;
}

function getFullText(root) {
  return root.textContent;
}

function unwrapSavedHighlights(root) {
  root.querySelectorAll(`.${styles.savedHighlight}`).forEach((highlight) => {
    highlight.replaceWith(document.createTextNode(highlight.textContent));
  });
  root.normalize();
}

function applyHighlights(root, annotations) {
  unwrapSavedHighlights(root);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let fullText = '';
  let currentNode = walker.nextNode();
  while (currentNode) {
    const start = fullText.length;
    fullText += currentNode.textContent;
    textNodes.push({ node: currentNode, start, end: fullText.length });
    currentNode = walker.nextNode();
  }

  const ranges = annotations
    .map((annotation) => {
      const range = findAnnotationRange(annotation, fullText);
      return range ? { ...range, annotation } : null;
    })
    .filter(Boolean);
  const anchoredAnnotations = new Set();

  textNodes.forEach(({ node, start, end }) => {
    const overlapping = ranges.filter((range) => range.start < end && range.end > start);
    if (!overlapping.length) return;

    const boundaries = new Set([0, node.textContent.length]);
    overlapping.forEach((range) => {
      boundaries.add(Math.max(0, range.start - start));
      boundaries.add(Math.min(node.textContent.length, range.end - start));
    });

    const orderedBoundaries = [...boundaries].sort((first, second) => first - second);
    const fragment = document.createDocumentFragment();
    orderedBoundaries.slice(0, -1).forEach((segmentStart, index) => {
      const segmentEnd = orderedBoundaries[index + 1];
      const segment = node.textContent.slice(segmentStart, segmentEnd);
      const matching = overlapping.filter(
        (range) => range.start < start + segmentEnd && range.end > start + segmentStart,
      );
      if (!matching.length) {
        fragment.appendChild(document.createTextNode(segment));
        return;
      }

      const mark = document.createElement('mark');
      mark.className = styles.savedHighlight;
      mark.textContent = segment;
      matching.forEach(({ annotation, start: rangeStart }) => {
        if (annotation.note?.trim()) mark.classList.add(styles.commentedHighlight);
        if (!anchoredAnnotations.has(annotation.id) && rangeStart >= start + segmentStart && rangeStart < start + segmentEnd) {
          mark.id = `note-${annotation.id}`;
          anchoredAnnotations.add(annotation.id);
        }
      });
      fragment.appendChild(mark);
    });
    node.replaceWith(fragment);
  });

  return anchoredAnnotations;
}

function readCourseNotes(courseSlug) {
  const notes = [];
  const annotationsPrefix = `course-notes:${courseSlug}:`;

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (!key) continue;

    if (key.startsWith(annotationsPrefix)) {
      const chapterSlug = key.slice(annotationsPrefix.length);
      const parsed = JSON.parse(window.localStorage.getItem(key) || '[]');
      if (!Array.isArray(parsed)) throw new Error(`Saved notes for ${chapterSlug} are invalid.`);
      parsed.forEach((annotation) => {
        if (
          annotation &&
          typeof annotation.text === 'string' &&
          typeof annotation.note === 'string' &&
          annotation.note.trim()
        ) {
          notes.push({
            id: annotation.id,
            chapterSlug,
            text: annotation.note,
            excerpt: annotation.text,
            target: annotation.id ? `#note-${annotation.id}` : '',
            kind: 'highlight',
          });
        }
      });
    }
  }

  return notes;
}

function getSelectionPosition(range) {
  const rect = range.getBoundingClientRect();
  return {
    left: Math.max(8, Math.min(rect.left, window.innerWidth - 52)),
    top: Math.max(12, rect.top - 44),
  };
}

function HighlightNotes({ courseSlug, chapterSlug, children }) {
  const contentRef = useRef(null);
  const editorRef = useRef(null);
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const notesButtonRef = useRef(null);
  const [annotations, setAnnotations] = useState([]);
  const [courseNotes, setCourseNotes] = useState([]);
  const [draft, setDraft] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [saveError, setSaveError] = useState('');
  const [selectionPosition, setSelectionPosition] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showCourseNotes, setShowCourseNotes] = useState(false);
  const [readyKey, setReadyKey] = useState('');
  const [storageError, setStorageError] = useState('');
  const annotationsKey = `course-notes:${courseSlug}:${chapterSlug}`;
  const activeKey = annotationsKey;

  const refreshCourseNotes = useCallback(() => {
    try {
      setCourseNotes(readCourseNotes(courseSlug));
    } catch (error) {
      setStorageError('Some course notes could not be read from this browser.');
    }
  }, [courseSlug]);

  useEffect(() => {
    setStorageError('');
    setReadyKey('');
    setAnnotations([]);
    setShowCourseNotes(false);
    setDraft(null);
    setSelectionPosition(null);
    setDrawerOpen(false);

    try {
      const savedAnnotations = window.localStorage.getItem(annotationsKey);
      const parsed = savedAnnotations ? JSON.parse(savedAnnotations) : [];
      if (!Array.isArray(parsed)) throw new Error('Saved annotations are not a list.');
      setAnnotations(parsed);
      setCourseNotes(readCourseNotes(courseSlug));
    } catch (error) {
      setStorageError('Saved notes are unavailable in this browser. You can still read this chapter.');
    }
    setReadyKey(activeKey);
  }, [activeKey, annotationsKey, courseSlug]);

  useEffect(() => {
    if (readyKey !== activeKey || storageError) return;
    try {
      window.localStorage.setItem(annotationsKey, JSON.stringify(annotations));
    } catch (error) {
      setStorageError('Notes could not be saved in this browser. Check its storage settings.');
    }
  }, [activeKey, annotations, annotationsKey, readyKey, storageError]);

  useEffect(() => {
    if (readyKey === activeKey && !storageError) refreshCourseNotes();
  }, [activeKey, annotations, readyKey, refreshCourseNotes, storageError]);

  useEffect(() => {
    const onStorage = (event) => {
      if (!event.key || event.key.startsWith(`course-notes:${courseSlug}:`)) {
        refreshCourseNotes();
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [courseSlug, refreshCourseNotes]);

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setDrawerOpen(false);
        setDraft(null);
        setSelectionPosition(null);
        window.getSelection()?.removeAllRanges();
        notesButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const focusTarget = draft && !showCourseNotes ? editorRef.current : closeButtonRef.current;
    focusTarget?.focus();
  }, [drawerOpen, draft, showCourseNotes]);

  useEffect(() => {
    if (drawerOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    return undefined;
  }, [drawerOpen]);

  useEffect(() => {
    if (readyKey !== activeKey || !contentRef.current) return undefined;
    applyHighlights(contentRef.current, annotations);

    if (window.location.hash.startsWith('#note-')) {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
        }
      });
    }

    return () => {
      if (contentRef.current) unwrapSavedHighlights(contentRef.current);
    };
  }, [activeKey, annotations, readyKey, children]);

  const captureSelection = () => {
    const root = contentRef.current;
    const selection = window.getSelection();
    if (!root || !selection || !selection.rangeCount || !selection.toString().trim()) {
      setSelectionPosition(null);
      return;
    }

    const range = selection.getRangeAt(0);
    if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) {
      setSelectionPosition(null);
      return;
    }

    const start = getTextOffset(root, range.startContainer, range.startOffset);
    const end = getTextOffset(root, range.endContainer, range.endOffset);
    const text = range.toString();
    const fullText = getFullText(root);
    const saved = annotations.find((annotation) => {
      const found = findAnnotationRange(annotation, fullText);
      return found && found.start === start && found.end === end;
    });
    const rect = range.getBoundingClientRect();

    setDraft({
      start,
      end,
      text,
      prefix: fullText.slice(Math.max(0, start - 32), start),
      suffix: fullText.slice(end, end + 32),
      id: saved?.id || null,
    });
    setNoteText(saved?.note || '');
    setSaveError('');
    setSelectionPosition(getSelectionPosition(range));
    if (!rect.width && !rect.height) setSelectionPosition(null);
  };

  const openCommentEditor = () => {
    if (!draft) return;
    setSaveError('');
    setSelectionPosition(null);
    setShowCourseNotes(false);
    setDrawerOpen(true);
  };

  const saveComment = (event) => {
    event.preventDefault();
    if (!draft || !noteText.trim()) {
      setSaveError('Enter a note before saving.');
      return;
    }

    const annotation = {
      ...draft,
      id: draft.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      note: noteText.trim(),
    };
    setAnnotations((current) => {
      const existingIndex = current.findIndex((item) => item.id === annotation.id);
      if (existingIndex === -1) return [...current, annotation];
      return current.map((item) => (item.id === annotation.id ? annotation : item));
    });
    setDraft(annotation);
    setNoteText(annotation.note);
    setSaveError('');
    window.getSelection()?.removeAllRanges();
  };

  const editAnnotation = (annotation) => {
    if (!annotation) return;
    setDraft(annotation);
    setNoteText(annotation.note || '');
    setSaveError('');
    setShowCourseNotes(false);
    setDrawerOpen(true);
  };

  const removeAnnotation = (id) => {
    setAnnotations((current) => current.filter((annotation) => annotation.id !== id));
    if (draft?.id === id) {
      setDraft(null);
      setNoteText('');
      setSaveError('');
    }
  };

  const deleteSavedNote = (item) => {
    try {
      const key = `course-notes:${courseSlug}:${item.chapterSlug}`;
      const saved = JSON.parse(window.localStorage.getItem(key) || '[]');
      if (!Array.isArray(saved)) throw new Error('Saved annotations are not a list.');
      window.localStorage.setItem(
        key,
        JSON.stringify(saved.filter((annotation) => annotation.id !== item.id)),
      );
      if (item.chapterSlug === chapterSlug) {
        setAnnotations((current) => current.filter((annotation) => annotation.id !== item.id));
        if (draft?.id === item.id) {
          setDraft(null);
          setNoteText('');
          setSaveError('');
        }
      }
      refreshCourseNotes();
    } catch (error) {
      setStorageError('This note could not be deleted from this browser.');
    }
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDraft(null);
    setNoteText('');
    setSaveError('');
    setSelectionPosition(null);
    window.getSelection()?.removeAllRanges();
    notesButtonRef.current?.focus();
  };

  const chapterNotes = courseNotes.filter((item) => item.chapterSlug === chapterSlug);
  const visibleNotes = showCourseNotes ? courseNotes : chapterNotes;

  return (
    <>
      <div
        className={styles.markdownContent}
        ref={contentRef}
        onMouseUp={captureSelection}
        onKeyUp={captureSelection}
      >
        {children}
      </div>

      {selectionPosition && draft && (
        <button
          type="button"
          className={styles.selectionCommentButton}
          style={{ left: selectionPosition.left, top: selectionPosition.top }}
          aria-label="Add a comment to selected text"
          title="Add comment"
          onMouseDown={(event) => event.preventDefault()}
          onClick={openCommentEditor}
        >
          <i className="fa-solid fa-comment" aria-hidden="true" />
        </button>
      )}

      <button
        type="button"
        ref={notesButtonRef}
        className={styles.courseNotesButton}
        onClick={() => {
          setDraft(null);
          setSelectionPosition(null);
          setShowCourseNotes(false);
          setDrawerOpen(true);
          refreshCourseNotes();
        }}
        aria-label={`Open course notes${courseNotes.length ? `, ${courseNotes.length} notes` : ''}`}
        title="Course notes"
        aria-haspopup="dialog"
        aria-expanded={drawerOpen}
      >
        {courseNotes.length > 0 && <span>{courseNotes.length}</span>}
        <i className="fa-solid fa-note-sticky" aria-hidden="true" />
      </button>

      {drawerOpen && (
        <div
          className={styles.drawerBackdrop}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeDrawer();
          }}
        >
          <aside
            className={styles.notesDrawer}
            id="course-notes-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-notes-title"
            onKeyDown={(event) => {
              if (event.key !== 'Tab') return;
              const focusable = drawerRef.current?.querySelectorAll(
                'button:not([disabled]), a[href], textarea:not([disabled])',
              );
              if (!focusable?.length) return;
              const first = focusable[0];
              const last = focusable[focusable.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
              }
            }}
          >
            <header className={styles.drawerHeader}>
              <div>
                <p className={styles.eyebrow}>{showCourseNotes ? 'Course notes' : 'Chapter notes'}</p>
                <h2 id="course-notes-title">
                  {showCourseNotes ? 'All course notes' : 'Notes for this chapter'}
                </h2>
              </div>
              <button
                type="button"
                ref={closeButtonRef}
                aria-label="Close notes"
                title="Close notes"
                onClick={closeDrawer}
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </header>

            <button
              type="button"
              className={styles.drawerViewLink}
              title={showCourseNotes ? 'Back to chapter notes' : 'View all course notes'}
              onClick={() => {
                setShowCourseNotes((current) => !current);
                setDraft(null);
                setNoteText('');
                setSaveError('');
                refreshCourseNotes();
              }}
            >
              <i
                className={`fa-solid ${showCourseNotes ? 'fa-arrow-left' : 'fa-list'}`}
                aria-hidden="true"
              />
              <span className={styles.visuallyHidden}>
                {showCourseNotes ? 'Back to this chapter’s notes' : 'View all notes for this course'}
              </span>
            </button>

            {storageError && <p className={styles.storageMessage} role="status">{storageError}</p>}

            <section className={styles.drawerSection}>
              <h3>{showCourseNotes ? 'Notes across this course' : 'Notes on highlighted text'}</h3>
              {visibleNotes.length ? (
                <ul className={styles.drawerNoteList}>
                  {visibleNotes.map((item) => (
                    <li key={`${item.chapterSlug}:${item.id}`}>
                      <a
                        className={styles.drawerNoteLink}
                        href={`/courses/${courseSlug}/${item.chapterSlug}${item.target}`}
                        onClick={closeDrawer}
                      >
                        {item.excerpt && <strong>“{item.excerpt}”</strong>}
                        <span>{item.text}</span>
                        <small>
                          {item.chapterSlug.replace(/^\d+-/, '').replace(/-/g, ' ')}
                        </small>
                      </a>
                      {item.kind === 'highlight' && item.chapterSlug === chapterSlug && (
                        <button
                          type="button"
                          className={styles.editNoteButton}
                          aria-label="Edit comment"
                          title="Edit comment"
                          onClick={() => editAnnotation(annotations.find((annotation) => annotation.id === item.id))}
                        >
                          <i className="fa-solid fa-pen" aria-hidden="true" />
                        </button>
                      )}
                      <button
                        type="button"
                        className={styles.deleteNoteButton}
                        onClick={() => deleteSavedNote(item)}
                        aria-label={`Delete comment from ${item.chapterSlug.replace(/^\d+-/, '').replace(/-/g, ' ')}`}
                        title="Delete note"
                      >
                        <i className="fa-solid fa-trash-can" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.emptyNotes}>No notes here yet. Select text in the chapter to add a comment.</p>
              )}
            </section>

            {draft && !showCourseNotes && (
              <form className={styles.drawerSection} onSubmit={saveComment}>
                <h3>Comment on selected text</h3>
                <blockquote className={styles.selectedExcerpt}>{draft.text}</blockquote>
                <label className={styles.drawerLabel}>
                  Comment
                  <textarea
                    ref={editorRef}
                    value={noteText}
                    onChange={(event) => {
                      setNoteText(event.target.value);
                      setSaveError('');
                    }}
                    placeholder="Write a comment..."
                    rows="4"
                    required
                  />
                </label>
                {saveError && <p className={styles.storageMessage} role="alert">{saveError}</p>}
                <p className={styles.savedHint}>Your note is saved only when you submit it.</p>
                <button type="submit" className={styles.saveNoteButton}>
                  <i className="fa-solid fa-floppy-disk" aria-hidden="true" />
                  <span>Save note</span>
                </button>
                {draft.id && (
                  <button
                    type="button"
                    className={styles.removeNoteButton}
                    aria-label="Remove comment and highlight"
                    title="Remove comment and highlight"
                    onClick={() => removeAnnotation(draft.id)}
                  >
                    <i className="fa-solid fa-trash-can" aria-hidden="true" />
                  </button>
                )}
              </form>
            )}

          </aside>
        </div>
      )}
    </>
  );
}

export default HighlightNotes;
