import {createBrowserRouter} from "react-router-dom"
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashBoardPage from "../pages/DashboardPage";
import TaskPage from "../pages/TaskPage";
import RootLayout from "../pages/RootLayout";
import ErrorPage from "../pages/ErrorPage"
import ProfilePage from "../pages/ProfilePage"
const router = createBrowserRouter([ 
    { 
        path: "", 
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children:[
          {path: "api/auth/login", element: <LoginPage />},
          {path: "api/auth/signup", element: <SignupPage />},
          {path: "task", element: <TaskPage />},
          {path: "dashBoard", element: <DashBoardPage />},
           {path: "profile", element: <ProfilePage/>}
  
        ]
            
    }
])
export default router;

