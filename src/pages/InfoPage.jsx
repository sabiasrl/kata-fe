import React, { useEffect, useState } from 'react';
import { parseMarkdown } from '../utils/markdown.jsx';

const InfoPage = () => {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/info.md')
      .then(res => res.text())
      .then(text => setMarkdown(text))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="main-card" style={{ maxWidth: 700, margin: '2rem auto' }}>
      {loading ? <p>Loading...</p> : parseMarkdown(markdown)}
    </div>
  );
};

export default InfoPage;
