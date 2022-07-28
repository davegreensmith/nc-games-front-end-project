import { useContext } from 'react';
import { CurrentUserContext } from '../utils/contexts';

export default function AboutMe() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { username, name, avatar_url } = currentUser;

  return (
    <section className="user-section">
      <h2>Welcome {name}!</h2>
      <img src={avatar_url} alt="avatar"></img>
      <h3>{username}</h3>
    </section>
  );
}
