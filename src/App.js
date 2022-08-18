import React, { lazy, Suspense, useEffect } from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import ReactLoader from "./components/loader";
import * as ROUTES from "./constants/routes";
import { useStateValue } from  "./context/StateProvider";
import IsUserLoggedIn from "./helpers/h-user-logged-in";
import ProtectedRoute from "./helpers/protected_routes";
import { auth } from "./lib/firebase";

const Login = lazy(() => import ("./pages/login"));
const Signup = lazy(() => import ("./pages/sign-up"));
const NotFound = lazy(() => import ("./pages/Notfound"));
const Dashboard = lazy(() => import ("./pages/Dashboard"));
const Profile = lazy(() => import ("./pages/profile"));

function App() {
  const [{User}, dispatch] = useStateValue()
  
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          item : authUser
        })
      }
      else {
        dispatch({
          // the user is logged out 
          type : 'SET_USER',
          item : null
        })
      }

    })
  }, [User]) 

  


  return (  
    <Router>
      <Suspense fallback={<ReactLoader  />}>
        <Switch>
          <Route path={ROUTES.PROFILE} component={Profile} />
          {/* <Route path={ROUTES.LOGIN} component={Login} /> */}
          <IsUserLoggedIn user={User} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
                <Login />
          </IsUserLoggedIn>
            
          <IsUserLoggedIn user={User} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGN_UP}>
                <Signup />
          </IsUserLoggedIn>

          {/* <Route path={ROUTES.SIGN_UP} component={Signup} /> */}
          <ProtectedRoute user={User} path={ROUTES.DASHBOARD } exact >
            <Dashboard />
          </ProtectedRoute>
          <Route  component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
