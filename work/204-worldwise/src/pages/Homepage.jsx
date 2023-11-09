import { NavLink } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

function Homepage() {
  return (
    <>
      <PageNav />
      <AppNav />
      <h3>WorldWise</h3>
      <NavLink to="/app">Go to the app</NavLink>
    </>
  );
}

export default Homepage;
