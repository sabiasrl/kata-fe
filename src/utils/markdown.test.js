import { escapeHtml, parseMarkdown } from './markdown.jsx';
import React from 'react';

describe('escapeHtml', () => {
  it('escapes special HTML characters', () => {
    expect(escapeHtml('<div>&"\'</div>')).toBe('&lt;div&gt;&amp;&quot;&#39;&lt;/div&gt;');
  });
});

describe('parseMarkdown', () => {
  it('renders headings, lists, and inline markdown', () => {
    const md = '# Title\n- **Bold**\n- *Italic*\n- `Code`';
    const elements = parseMarkdown(md);
    expect(elements.some(e => e.type === 'h1')).toBe(true);
    expect(elements.some(e => e.type === 'ul')).toBe(true);
    // Check for inline HTML in list items
    const ul = elements.find(e => e.type === 'ul');
    expect(ul.props.children.some(li => li.props.children.props.dangerouslySetInnerHTML.__html.includes('<b>Bold</b>'))).toBe(true);
  });

  it('handles blockquotes and horizontal rules', () => {
    const md = '> Quote\n---';
    const elements = parseMarkdown(md);
    expect(elements.some(e => e.type === 'blockquote')).toBe(true);
    expect(elements.some(e => e.type === 'hr')).toBe(true);
  });
});
