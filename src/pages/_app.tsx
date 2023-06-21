import MainLayout from '@/components/Layout/MainLayout';
import { AuthContextProvider } from '@/context/AuthContext';
import { FontElProvider } from '@/context/FontElProvider';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FontElProvider>
      <AuthContextProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AuthContextProvider>
    </FontElProvider>
  );
}
