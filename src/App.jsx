import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/header';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Reviews from './components/Reviews';
import Users from './components/Users';
import AboutMe from './components/AboutMe';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/reviews" element={<Reviews />}></Route>
        <Route path="/review/:review_id" element={<Reviews />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/AboutMe" element={<AboutMe />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
