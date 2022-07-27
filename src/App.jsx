import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ErrorContext } from './utils/contexts';

import Header from './components/header';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Reviews from './components/Reviews';
import Users from './components/Users';
import AboutMe from './components/AboutMe';

function App() {
  const [error, setError] = useState(null);

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <NavBar />
          <div className="main-grid">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/reviews" element={<Reviews />}></Route>
              <Route path="/review/:review_id" element={<Reviews />}></Route>
              <Route path="/review/reviews/:review_id/comments" element={<Reviews />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/AboutMe" element={<AboutMe />}></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ErrorContext.Provider>
  );
}

export default App;
