import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useAuth } from  '../AuthProvider/AuthContext.jsx'
import { useParams } from "react-router-dom";
function MainNavigation() {
 const {isAuthenticated, user, login, logout}= useAuth();
 const {id}= useParams();
 console.log("main Navigation: ", id)
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {(!isAuthenticated)? (<>
            <li className={classes.listItem}>
            <Link to="/signup">Signup</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/login">Login</Link>
          </li>
          </>) :(<>
            <li className={classes.listItem}>
            <Link to="/profileform">Create Profile</Link>
          </li>
          <li className={classes.listItem}>
            <Link to="/profile">Profile</Link>
          </li>
          <li className={classes.listItem}>
           {/* {isAuthenticated && <Link to="/dashboard">Dashboard</Link>} */}
            <Link to="/dashBoard">DashBoard</Link>
          </li>
         {/*  {user.id && (
            <li className={classes.listItem}>
              <Link to={`/tasks/${user.id}`}>TaskPage</Link>
            </li>
          )} */}
          <li className={classes.listItem}>
            <Link to="/task/new">CreateTask</Link>
          </li>
          <button className={classes.logoutBtn} onClick={logout}>
             logout
          </button>
          </>)}
          
          
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
