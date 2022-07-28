import { useContext } from 'react';
import { CurrentUserContext } from '../utils/contexts';

export default function UserCard({ user }) {
  const { avatar_url, username, name } = user;
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  return (
    <article className="user-card">
      <img src={avatar_url} alt="users avatar"></img>
      <h3>{username}</h3>
      <p>{name}</p>
      <button
        onClick={() => {
          setCurrentUser(user);
        }}
      >
        Select User
      </button>
    </article>
  );
}
