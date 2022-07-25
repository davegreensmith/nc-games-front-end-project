import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navigation-menu">
      <Link to="/" className="navigation-link">
        Home
      </Link>
      <Link to="/reviews" className="navigation-link">
        Reviews
      </Link>
      <Link to="/users" className="navigation-link">
        Users
      </Link>
      <Link to="/aboutMe" className="navigation-link">
        Me
      </Link>
    </nav>
  );
}
