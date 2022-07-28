import { useContext } from 'react';
import { CurrentUserContext } from '../utils/contexts';

import { Link } from 'react-router-dom';

export default function NavBar() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { username, name, avatar_url } = currentUser;

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
      <Link to="/my_account" className="navigation-link navigation-my-account">
        My Account
      </Link>
      <img src={avatar_url} className="navigation-my-account" />
    </nav>
  );
}
