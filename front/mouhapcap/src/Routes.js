import { Suspense, lazy } from "react";

import {

  Routes,
  Route,

} from "react-router-dom";
import Loader from "./utils/Loader";
import PrivateRoute from "./utils/PrivateRoute";




const NavBar = lazy(() => import("./utils/NavBar"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const GraphPage = lazy(() => import("./pages/GraphPage"));
const AnalyzePage = lazy(() => import("./pages/AnalyzePage"));
const UploadPage = lazy(() => import("./pages/UploadPage"));
// const ErrorPage = lazy(() => import("./pages/ErrorPage"));

// const ResetPassword=lazy(() => import("./pages/PasswordReset"))
// const ResetPasswordConfirm=lazy(() => import("./pages/ResetPasswordConfirm"))

const Routing = () => {
  return(
    <Suspense fallback={<Loader/>} >
    <Routes>
        <Route path="/" element={<PrivateRoute />} >

          
        
          <Route path="graph" element={<Suspense fallback={<Loader/>} ><NavBar /><GraphPage/></Suspense>} />
          <Route path="analyze" element={<Suspense fallback={<Loader/>} ><NavBar /><AnalyzePage/></Suspense>} />
          <Route path="upload" element={<Suspense fallback={<Loader/>} ><NavBar /><UploadPage/></Suspense>} />
          <Route path="" element={<Suspense fallback={<Loader/>} ><NavBar /><UploadPage/></Suspense>} />
          {/* <Route path="*" element={<ErrorPage />} /> */}

        </Route>
        
        <Route path="/login" element={<Suspense fallback={<Loader/>} ><NavBar /><Login/></Suspense>}  />
        <Route path="/register" element={<Suspense fallback={<Loader/>} ><NavBar /><Register/></Suspense>}  />
        {/* <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/auth/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
        <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
    </Suspense>
  )
};
export default Routing;
