import { BuildProviderTree } from './services/data-utils';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/root/Root';
import ErrorPage from './error/errorpage/ErrorPage';
import CartPage from './pages/cartpage/CartPage';
import HomePage from './pages/homepage/HomePage';
import ProductsPage from './pages/productspage/ProductsPage';
import ProductViewPage from './pages/productviewpage/ProductViewPage';
import HeaderToggleProvider from './context/HeaderToggleProvider';
import ProductTypeProvider from './context/ProductTypeProvider';
import PriceFilterProvider from './context/PriceFilterProvider';
import ColorFilterProvider from './context/ColorFilterProvider';
import SizeFilterProvider from './context/SizeFilterProvider';
import CartItemsProvider from './context/CartItemsProvider';
import FavouritesPage from './pages/favouritespage/FavouritesPage';
import LoaderProvider from './context/LoaderProvider';

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
          path: "/products/:param",
          element: <ProductViewPage />,
        },
        {
          path: "/favourites",
          element: <FavouritesPage />
        }
      ]
    },
  ]);

  const Providers = BuildProviderTree([
    HeaderToggleProvider,
    ProductTypeProvider,
    PriceFilterProvider,
    ColorFilterProvider,
    SizeFilterProvider,
    CartItemsProvider,
    LoaderProvider
  ]);

  return (
    <>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </>
  )
}


export default App

