import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';
import authService from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const defaultState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  error: null
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultState);

  useEffect(() => {
    // Check for existing auth on mount
    const token = authService.getToken();
    const user = authService.getCurrentUser();

    if (token && user) {
      setAuthState({
        user,
        token,
        isAuthenticated: true,
        loading: false,
        error: null
      });
    } else {
      setAuthState({
        ...defaultState,
        loading: false
      });
    }
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await authService.login({ email, password });
      
      if (response.success && response.data) {
        setAuthState({
          user: response.data.user,
          token: response.data.token,
          isAuthenticated: true,
          loading: false,
          error: null
        });
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Authentication failed'
      }));
    }
  };

  const logout = () => {
    authService.logout();
    setAuthState({
      ...defaultState,
      loading: false
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        isAuthenticated: authState.isAuthenticated,
        loading: authState.loading,
        error: authState.error,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 