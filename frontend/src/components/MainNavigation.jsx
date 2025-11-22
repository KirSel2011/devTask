import {Link} from "react-router-dom"

import classes from "./MainNavigation.module.css"
function MainNavigation(){
    console.log("From Main Navigation")
    return (<header  className={classes.header} >
        <nav >
            <ul className={classes.list}>
                <li className={classes.listItem}><Link to="profile">Profile</Link></li>
                <li className={classes.listItem}><Link to="dashBoard">DashBoard</Link></li>
                <li className={classes.listItem}><Link to="api/auth/signup">Signup</Link></li>
                <li className={classes.listItem}><Link to="api/auth/login">Login</Link></li>
                <li className={classes.listItem}><Link to="task">Task</Link></li>
            </ul>
        </nav>
    </header>)
}
export default MainNavigation;