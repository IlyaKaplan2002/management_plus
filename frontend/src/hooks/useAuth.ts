import { useSelector } from 'react-redux';
import { authSelectors } from 'store/auth';

const useAuth = () => {
  const token = useSelector(authSelectors.getToken);
  const user = useSelector(authSelectors.getUser);
  const error = useSelector(authSelectors.getError);
  const loading = useSelector(authSelectors.getLoading);

  return { isLoggedIn: Boolean(token), user, error, loading };
};

export default useAuth;
