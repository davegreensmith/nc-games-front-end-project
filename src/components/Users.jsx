import { useContext, useEffect, useState } from 'react';
import { ErrorContext } from '../utils/contexts';
import * as api from '../utils/api';
import Errors from './Errors';
import UserCard from './UserCard';

export default function Users() {
  const { error, setError } = useContext(ErrorContext);

  const [allUsers, setAllUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(() => {
    setError(null);
    api
      .fetchUsers()
      .then((response) => {
        setAllUsers(response);
        setIsLoadingUsers(false);
      })
      .catch(({ response: { status, statusText } }) => {
        setError({ statusCode: status, msg: statusText });
        console.log(error);
      });
  }, []);

  return (
    <section>
      {isLoadingUsers ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {allUsers.map((user) => {
            return <UserCard key={user.username} user={user} />;
          })}
        </ul>
      )}
    </section>
  );
}
