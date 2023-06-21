import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import Navbar from '@/components/Navbar/Navbar';
import { useAuth } from '@/context/AuthContext';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const loginHandler: React.FormEventHandler<HTMLFormElement> = useCallback(
    async e => {
      e.preventDefault();

      setIsLoading(true);

      await login(username, password);

      setIsLoading(false);
      setUsername('');
      setPassword('');
    },
    [login, username, password]
  );

  const isLoginDisabled = !username || !password;

  return (
    <>
      <Head>
        <title>Login | Turing Technologies Frontend Test</title>
      </Head>

      <div className="flex flex-col min-h-screen">
        <Navbar logoOnly />

        <main className="px-11 py-8 bg-slate-200 flex-1 flex items-center justify-center">
          <div className="min-w-[550px] bg-white rounded px-4 py-6">
            <form onSubmit={loginHandler}>
              <Input
                className="mb-8"
                label="User Name"
                required
                placeholder="Email"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <Input
                className="mb-6"
                label="Password"
                required
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />

              <Button
                label={isLoading ? 'Logging in...' : 'Log in'}
                type="submit"
                disabled={isLoginDisabled || isLoading}
              />
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
