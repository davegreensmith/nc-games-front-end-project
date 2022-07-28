import lostImage from '../images/got-lost.jpg';

import { Link } from 'react-router-dom';

export default function GotLost() {
  return (
    <section id="lost-page">
      <h2>WHOAH! Looks like you've got a little lost</h2>
      <img src={lostImage} alt="lost"></img>
      <h3>Click the link below to find your way home</h3>
      <Link to="/" className="navigation-link">
        Home
      </Link>
      <h4>~or use the menu to find another path~</h4>
    </section>
  );
}
