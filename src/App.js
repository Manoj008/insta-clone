import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import * as ROUTES from './constants/Routes';
import UserContext from './context/User';
import IsUserLoggedIn from './helpers/IsUserLoggedIn';
import ProtectedRoute from './helpers/ProtectedRoute';
import UseAuthListener from './hooks/UseAuthListener';
import EditProfile from './pages/EditProfile';
import './styles/app.css';

const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'))
const Profile = lazy(() => import('./pages/Profile'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {

  const { user } = UseAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p className="justify-center text-center">Loading ... </p>}>
          <Switch>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.LOGIN}>
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} loggedInPath={ROUTES.DASHBOARD} path={ROUTES.SIGNUP}>
              <Signup />
            </IsUserLoggedIn>
            <Route path={ROUTES.PROFILE} component={Profile} exact />
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={ROUTES.EDIT_PROFILE} exact>
              <EditProfile />
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
