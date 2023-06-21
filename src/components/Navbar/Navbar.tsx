import Image from 'next/image';
import ttLogo from '@/assets/images/tt-logo.png';
import Button from '@/components/Button/Button';
import { useAuth } from '@/context/AuthContext';

function Navbar({ logoOnly = false }) {
  const { logout } = useAuth();

  return (
    <header className="flex justify-between items-center px-6 py-6 border-[#D3D5D8] border-b">
      <Image
        src={ttLogo}
        alt="turing technologies logo"
        className="max-w-[313px]"
      />

      {!logoOnly && <Button label="Log out" onClick={logout} />}
    </header>
  );
}

export default Navbar;
