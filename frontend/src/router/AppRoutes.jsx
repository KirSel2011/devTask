import {createBrowserRouter} from "react-router-dom"
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import DashBoardPage from "../components/Dashboard/Dashboard.jsx"
//import DashBoardPage from "../pages/DashboardPage";
import TaskForm from "../pages/TaskForm.jsx";
import TaskPage from "../pages/Task.jsx"
import RootLayout from "../pages/RootLayout";
import ErrorPage from "../pages/ErrorPage"
import ProfilePage from "../pages/Profile.jsx"
import Profileform from "../pages/ProfileForm.jsx"
import EditProfilePage from "../pages/EditProfilePage.jsx"
import ProfileViewPage from "../pages/ProfileViewPage.jsx";
const router = createBrowserRouter([ 
    { 
        path: "", 
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children:[
          {path: "/login", element: <LoginPage />},
          {path: "/signup", element: <SignupPage />},
          {path: "/task/new", element: <TaskForm />},
          {path: "/dashBoard", element: <DashBoardPage />},
          {path: "/profile", element: <ProfilePage/>},
          {path: "/profileform", element: <Profileform/>},
          {path: "/tasks/:id", element: <TaskPage/>},
          { path: "/profile/edit/:id", element: <EditProfilePage /> },
          { path: "/profile/:id", element: <ProfileViewPage /> }
  
        ]
            
    }
])
export default router;

