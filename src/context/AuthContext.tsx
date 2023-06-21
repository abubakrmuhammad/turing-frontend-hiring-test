import DefaultSpinner from '@/components/DefaultSpinner/DefaultSpinner';
import { User } from '@/types';
import { baseURL } from '@/utils/api';
import { authorizationHeader } from '@/utils/helpers';
import axios, { isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { type } from 'os';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

let accessToken: string | null = null;
let refreshToken: string | null = null;

if (typeof window !== 'undefined') {
  accessToken = localStorage.getItem('access_token');
  refreshToken = localStorage.getItem('refresh_token');
}

function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    const res = await axios({
      method: 'post',
      url: `${baseURL}/auth/login`,
      data: {
        username,
        password,
      },
    });

    const { user, access_token, refresh_token } = res.data;

    setUser(user);
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const refreshAccessToken = async () => {
    const res = await axios({
      method: 'post',
      url: `${baseURL}/auth/refresh-token`,
      headers: authorizationHeader(),
    });

    const { access_token, user } = res.data;

    localStorage.setItem('access_token', access_token);
    setUser(user);
  };

  // get user data on first render
  // and refresh token if expired on load
  useEffect(() => {
    if (accessToken && refreshToken) {
      axios({
        method: 'get',
        url: `${baseURL}/me`,
        headers: authorizationHeader(),
      })
        .then(res => {
          setUser(res.data);
          setLoading(false);
        })
        .catch(error => {
          if (isAxiosError(error)) {
            if (error.response?.status === 401) {
              refreshAccessToken();
            }
          }
        });
    } else {
      setLoading(false);
    }
  }, []);

  // refresh token every 9 minutes (exp is 10 minutes)
  useEffect(() => {
    const interval = setInterval(() => {
      if (accessToken && refreshToken) {
        refreshAccessToken();
      }
    }, 1000 * 60 * 9);

    return () => clearInterval(interval);
  }, []);

  // redirect to login if user is null
  useEffect(() => {
    if (user === null && router.pathname !== '/login') {
      router.replace('/login');
    }

    if (user !== null && router.pathname === '/login') {
      router.replace('/');
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <DefaultSpinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}

      <button onClick={refreshAccessToken}>refresh</button>
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContextProvider');
  }

  return context;
};

export { AuthContext, AuthContextProvider, useAuth };
