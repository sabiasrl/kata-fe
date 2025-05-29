// src/utils/markdown.jsx
// Markdown parsing utility for InfoPage and other components
import React from 'react';

export function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function (c) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]);
  });
}

export function parseMarkdown(md) {
  // Improved markdown to JSX: headings, lists, bold, italics, blockquote, code, hr
  const lines = md.split('\n');
  let inList = false;
  let inOl = false;
  let elements = [];
  let listItems = [];
  let olItems = [];
  // Helper to parse inline markdown (bold, italic, code) for a string
  function parseInline(text) {
    let t = escapeHtml(text);
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
    t = t.replace(/\*\*([^*]+?)\*\*/g, '<b>$1</b>');
    t = t.replace(/\*([^*]+?)\*/g, '<i>$1</i>');
    return t;
  }
  lines.forEach((line, idx) => {
    // Close lists if a block element is about to start
    if ((inList || inOl) && (line.startsWith('#') || line.startsWith('>') || line.startsWith('---') || line.trim() === '' || line.startsWith('### ') || line.startsWith('## '))) {
      if (inList) {
        elements.push(<ul key={`ul-${idx}`}>{listItems}</ul>);
        inList = false; listItems = [];
      }
      if (inOl) {
        elements.push(<ol key={`ol-${idx}`}>{olItems}</ol>);
        inOl = false; olItems = [];
      }
    }
    if (line.startsWith('---')) {
      elements.push(<hr key={`hr-${idx}`} />);
      return;
    }
    if (line.startsWith('>')) {
      elements.push(<blockquote key={`bq-${idx}`} style={{ color: '#0078d4', fontStyle: 'italic', background: '#f4f8fb', borderLeft: '4px solid #0078d4', margin: '1em 0', padding: '0.7em 1em' }}>{line.replace(/^>\s*/, '')}</blockquote>);
      return;
    }
    if (line.startsWith('### ')) {
      elements.push(<h3 key={idx}>{line.replace('### ', '')}</h3>);
      return;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={idx}>{line.replace('## ', '')}</h2>);
      return;
    }
    if (line.startsWith('# ')) {
      elements.push(<h1 key={idx}>{line.replace('# ', '')}</h1>);
      return;
    }
    if (line.match(/^\d+\. /)) {
      if (!inOl) { inOl = true; olItems = []; }
      const content = line.replace(/^\d+\. /, '');
      olItems.push(<li key={idx}><span dangerouslySetInnerHTML={{ __html: parseInline(content) }} /></li>);
      return;
    }
    if (line.startsWith('- ')) {
      if (!inList) { inList = true; listItems = []; }
      const content = line.replace('- ', '');
      listItems.push(<li key={idx}><span dangerouslySetInnerHTML={{ __html: parseInline(content) }} /></li>);
      return;
    }
    if (line.trim() === '') return;
    // Inline markdown for normal lines
    let text = parseInline(line);
    elements.push(<span key={idx} dangerouslySetInnerHTML={{ __html: text }} />);
  });
  if (inList) elements.push(<ul key={`ul-end`}>{listItems}</ul>);
  if (inOl) elements.push(<ol key={`ol-end`}>{olItems}</ol>);
  return elements;
}
