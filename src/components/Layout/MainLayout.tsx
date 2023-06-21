import { useFontElRef } from '@/context/FontElProvider';
import localFont from 'next/font/local';
import { PropsWithChildren } from 'react';

const AvenirLTStd = localFont({
  src: [
    {
      path: '../../assets/font/AvenirLTStd-Book.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/font/AvenirLTStd-Roman.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../assets/font/AvenirLTStd-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-avenir',
});

function MainLayout(props: PropsWithChildren) {
  const fontElRef = useFontElRef();

  return (
    <div className={`${AvenirLTStd.variable} font-sans`} ref={fontElRef}>
      {props.children}
    </div>
  );
}

export default MainLayout;
