import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
function Homepage() {
  return (
    <>
      <PageNav />
      <h3>Homepage</h3>
      {/* <Link to="/pricing">Pricing</Link> */}
      {/* Links only change component tree */}
    </>
  );
}

export default Homepage;
