import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';

const AvenirLTStd = localFont({
  src: [
    {
      path: '../assets/font/AvenirLTStd-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/font/AvenirLTStd-Roman.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/font/AvenirLTStd-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-avenir',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${AvenirLTStd.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
