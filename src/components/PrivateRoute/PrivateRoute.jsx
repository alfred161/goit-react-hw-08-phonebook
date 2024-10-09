import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { refreshUser } from '../../redux/auth/authOperations';
import { useAuth } from '../../redux/hooks/useAuth';

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const { isLoggedIn } = useAuth();

  const shouldRedirect = !isLoggedIn;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};
