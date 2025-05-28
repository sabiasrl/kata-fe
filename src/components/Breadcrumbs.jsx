import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const breadcrumbMap = {
  '/': 'Home',
  '/checkout': 'Checkout',
  '/login': 'Login',
};

function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);
  let path = '';
  return (
    <nav style={{ marginBottom: '1rem' }}>
      <Link to="/">Home</Link>
      {paths.map((crumb, idx) => {
        path += `/${crumb}`;
        const label = breadcrumbMap[path] || crumb.charAt(0).toUpperCase() + crumb.slice(1);
        return (
          <span key={path}>
            {' / '}
            {idx === paths.length - 1 ? (
              <span style={{ color: '#888' }}>{label}</span>
            ) : (
              <Link to={path}>{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
