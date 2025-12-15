import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import {jwtDecode} from "jwt-decode"; // namespace import for Vite

function MainNavigation() {
  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    try {
      const decode= jwtDecode(token); // use .default with Vite
      userId = decode.id; // assuming your token payload has `id`
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
    }
  }
console.log("userId in MainNavigation is : ", userId);
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <Link to="/profileform">Create Profile</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/profile">Profile</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/dashBoard">DashBoard</Link>
          </li>
          {userId && (
            <li className={classes.listItem}>
              <Link to={`/tasks/${userId}`}>TaskPage</Link>
            </li>
          )}
          <li className={classes.listItem}>
            <Link to="/task/new">CreateTask</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/signup">Signup</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
