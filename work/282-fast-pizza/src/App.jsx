import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';
import Order, { loader as orderLoader } from './features/order/Order';
import { action as updateOrderAction } from './features/order/UpdateOrder';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
/* https://reactrouter.com/en/main/routers/create-browser-router */

// const BASE = process ? process.env.REACT_APP_BASE : '/ultimate-react-course';
const BASE = '/ultimate-react-course';
console.log('BASE', BASE);

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        { path: '/', element: <Home /> },
        /* render as you fetch strategy */
        {
          path: '/menu',
          element: <Menu />,
          loader: menuLoader,
          errorElement: <Error />,
        },
        { path: '/cart', element: <Cart /> },
        {
          path: '/order/new',
          element: <CreateOrder />,
          action: createOrderAction,
        } /* POST */,
        {
          path: '/order/:orderId',
          element: <Order />,
          loader: orderLoader,
          errorElement: <Error />,
          action: updateOrderAction,
        } /* GET, PATCH */,
      ],
    },
  ],
  {
    basename: BASE,
  },
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
