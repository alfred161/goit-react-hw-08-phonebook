import { ContactsPage } from 'pages/ContactsPage';
import LoginPage from 'pages/LoginPage';
import { SharedLayout } from 'pages/SharedLayout';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import { PrivateRoute } from './PrivateRoute/PrivateRoute';
import { RestrictedRoute } from './RestrictedRoute/RestrictedRoute';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <PrivateRoute redirectTo="/login" component={ContactsPage} />
            }
          />

          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/login" component={RegisterPage} />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={LoginPage} />
            }
          />
        </Route>
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={ContactsPage} />
          }
        />
      </Routes>
    </>
  );
};
