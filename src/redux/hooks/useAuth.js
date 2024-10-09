import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUser } from '../auth/authSelector';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);

  return {
    isLoggedIn,
    user,
  };
};
