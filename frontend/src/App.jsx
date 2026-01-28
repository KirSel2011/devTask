import router from "./router/AppRoutes"
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App(){

   console.log("From App function")
   return <>
           <ToastContainer 
        position="top-right"
        autoClose={2000} 
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnHover={true}
        theme="colored"
      />
      <RouterProvider router={router} />

   </>
   
   
};
export default App;