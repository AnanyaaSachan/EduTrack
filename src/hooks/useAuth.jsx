import { useAuthContext } from '../context/AuthContext';

const useAuth = () => {
  const { user, login, logout } = useAuthContext();

  const isAuthenticated = !!user;

  return { user, login, logout, isAuthenticated };
};

export default useAuth;
