import logo from '../images/logodesign-1a.png';

export default function Header() {
  return (
    <header className="header">
      <img src={logo}></img>
      <h1>NC Games</h1>
    </header>
  );
}
