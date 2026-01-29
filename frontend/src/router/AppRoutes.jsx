import {createBrowserRouter} from "react-router-dom"
import LoginPage from "../features/auth/pages/LoginPage.jsx";
import SignupPage from "../features/auth/pages/SignupPage.jsx";
import DashBoardPage from "../components/Dashboard/Dashboard.jsx"
//import DashBoardPage from "../pages/DashboardPage";
import TaskForm from "../features/tasks/pages/TaskForm.jsx";
import TaskPage from "../features/tasks/pages/Task.jsx"
import RootLayout from "../pages/RootLayout";
import ErrorPage from "../pages/ErrorPage"
import ProfilePage from "../features/profile/pages/Profile.jsx"
import Profileform from "../features/profile/pages/ProfileForm.jsx"
import { useParams } from "react-router-dom";
import EditProfilePage from "../features/profile/pages/EditProfilePage.jsx"
import ProfileViewPage from "../features/profile/pages/ProfileViewPage.jsx";
import ProtectedRoute from "../features/profile/components/ProtectedRoute.jsx";
import ProfileForm from "../features/profile/pages/ProfileForm.jsx";
import EditForm from "../components/Dashboard/EditForm.jsx";
import TaskNotes from "../features/note/components/PersonalTaskNote.jsx";

const router = createBrowserRouter([ 
    { 
        path: "", 
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children:[
          {path: "/login", element: <LoginPage />},
          {path: "/signup", element: <SignupPage />},
          {path: '/kanbanBoard/edit/:id', element: <EditForm/>},
          {path: "/task/new", element: 
              <ProtectedRoute>
                 <TaskForm />
              </ProtectedRoute>
          },
          {path: "/dashBoard", element: 
              <ProtectedRoute>
                 <DashBoardPage />
              </ProtectedRoute>},
          {path: "/profile", element:   
               <ProtectedRoute>
                 <ProfilePage />
              </ProtectedRoute>},
          {path: "/profileform", element:   
              <ProtectedRoute>
                 <ProfileForm />
              </ProtectedRoute>},
          {path: "/tasks/:id", element:  
              <ProtectedRoute>
                 <TaskPage />
              </ProtectedRoute>},
         /*  {path: "/task/:id/notes", element:
             <ProtectedRoute>
                <TaskNotes />
             </ProtectedRoute>
          }, */
          { path: "/profile/edit/:id", element:  
               <ProtectedRoute>
                 <EditProfilePage/>
              </ProtectedRoute> },
          { path: "/profile/:id", element:  
               <ProtectedRoute>
                 <ProfileViewPage />
              </ProtectedRoute> }
  
        ]
            
    }
])
export default router;

