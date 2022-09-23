import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="fixed flex top-0 left-0 w-full z-10 bg-white">
      <Link to="/">Home</Link>
    </header>
  );
}

export default Header;
