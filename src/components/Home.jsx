import homeLogo from '../images/logodesign-1b.png';

export default function Home() {
  return (
    <div className="home-screen">
      <h2>Welcome to</h2>
      <img src={homeLogo}></img>
      <p>Make your selections from the menu</p>
    </div>
  );
}
