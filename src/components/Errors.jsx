import errorPic from '../images/error.png';
import { useContext, useEffect } from 'react';
import { ErrorContext } from '../utils/contexts';

export default function Errors({ error: { statusCode, msg } }) {
  const { error, setError } = useContext(ErrorContext);

  //   useEffect(() => {
  //     setError(null);
  //   }, []);

  return (
    <section id="error-page">
      <h2>Oops, something went wrong!</h2>
      <img src={errorPic} alt="error"></img>
      <h3>{msg}</h3>
      <h4>Error Code: {statusCode}</h4>
    </section>
  );
}
