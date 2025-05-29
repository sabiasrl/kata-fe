import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BreadcrumbsMUI from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import LinkMUI from '@mui/material/Link';

const breadcrumbMap = {
  '/': 'Home',
  '/products': 'Products',
  '/products/checkout': 'Checkout',
  '/checkout': 'Checkout',
  '/login': 'Login',
  '/register': 'Register',
};

function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);
  let path = '';
  return (
    <BreadcrumbsMUI aria-label="breadcrumb">
      <LinkMUI component={Link} to="/">
        Home
      </LinkMUI>
      {paths.map((crumb, idx) => {
        path += `/${crumb}`;
        const label = breadcrumbMap[path] || crumb.charAt(0).toUpperCase() + crumb.slice(1);
        if (idx === paths.length - 1) {
          return (
            <Typography color="text.secondary" key={path}>{label}</Typography>
          );
        }
        return (
          <LinkMUI component={Link} to={path} key={path}>
            {label}
          </LinkMUI>
        );
      })}
    </BreadcrumbsMUI>
  );
}

export default Breadcrumbs;
