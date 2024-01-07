import Logo from '../Logo/logo.js';

export default function Header() {
  return (
    <header className="z-10 fixed top-0 w-full bg-white shadow-xl px-12 pt-3 pb-4">
      <Logo></Logo>
    </header>
  );
}