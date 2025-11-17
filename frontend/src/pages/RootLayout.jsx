
import { Outlet } from 'react-router-dom'
import MainNavigation from "../components/MainNavigation"
 export default function RootLayout(){
    return (<div>
                <h1>Root layout page</h1>
                <MainNavigation />
                <Outlet />
    </div>)
};