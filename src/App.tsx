import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HeaderToggleProvider from './context/HeaderToggleProvider';
import Root from './pages/root/Root';
import ErrorPage from './error/errorpage/ErrorPage';
import CartPage from './pages/cartpage/CartPage';
import HomePage from './pages/homepage/HomePage';
import ProductsPage from './pages/productspage/ProductsPage';
import ProductViewPage from './pages/productviewpage/ProductViewPage';

// Cart page can READ, UPDATE, DELETE
// Product page READS

// Bonus-bonus: Make an admin page to CREATE new products



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/products",
          element: <ProductsPage />,
        },
        {
          path: "/products/:id",
          element: <ProductViewPage />
        }
      ]
    },
  ]);

  return (
    <>
      <HeaderToggleProvider>
        <RouterProvider router={router} />
      </HeaderToggleProvider>
    </>
  )
}

export default App

