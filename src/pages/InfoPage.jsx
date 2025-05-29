import React, { useEffect, useState } from 'react';
import { parseMarkdown } from '../utils/markdown.jsx';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

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
    <Box sx={{ bgcolor: 'background.paper', borderRadius: 2, p: { xs: 1, md: 3 }, maxWidth: 700, mx: 'auto', my: 4 }}>
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading...</Typography>
        </Box>
      ) : (
        parseMarkdown(markdown)
      )}
    </Box>
  );
};

export default InfoPage;
