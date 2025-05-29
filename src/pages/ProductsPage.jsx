import React from 'react';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';

const ProductsPage = () => (
  <div>
    <Breadcrumbs />
    <Outlet />
  </div>
);

export default ProductsPage;
