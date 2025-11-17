import {createBrowserRouter} from "react-router-dom"
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashBoardPage from "../pages/DashboardPage";
import TaskPage from "../pages/TaskPage";
import RootLayout from "../pages/RootLayout"
const router = createBrowserRouter([ 
    { 
        path: "/", 
        element: <RootLayout />,
        children:[
          {path: "login", element: <LoginPage />},
          {path: "signup", element: <SignupPage />},
          {path: "task", element: <TaskPage />},
          {path: "board", element: <DashBoardPage />}
        ]
            
    }
])
export default router;

