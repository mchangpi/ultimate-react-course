import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  /* 
  App.jsx 
  { path: "/menu", element: <Menu />, loader: menuLoader }, 
  */
  const menu = useLoaderData();
  // console.log(menu);

  return (
    <ul className="divide-y-8 divide-stone-200 px-4">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;