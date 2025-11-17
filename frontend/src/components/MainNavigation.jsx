import {Link} from "react-router-dom"
function MainNavigation(){
    return (<header>
        <nav>
            <ul>
                <li><Link to="board">DashBoard</Link></li>
                <li><Link to="signup">Signup</Link></li>
                <li><Link to="login">Login</Link></li>
                <li><Link to="task">Task</Link></li>
            </ul>
        </nav>
    </header>)
}
export default MainNavigation;