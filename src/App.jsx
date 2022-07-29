import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ErrorContext, CurrentUserContext } from './utils/contexts';

import Header from './components/header';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Reviews from './components/Reviews';
import Users from './components/Users';
import MyAccount from './components/MyAccount';
import CommentHolder from './components/CommentHolder';
import GotLost from './components/GotLost';
import BackToTopButton from './components/BackToTopButton';

function App() {
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    username: 'grumpy19',
    name: 'Paul Grump',
    avatar_url: 'https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013',
  });

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <BrowserRouter>
          <div className="App">
            <Header />
            <NavBar />
            <div className="main-grid">
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/reviews" element={<Reviews />}></Route>
                <Route path="/review/:review_id" element={<Reviews />}></Route>
                <Route path="/review/reviews/:review_id/comments" element={<CommentHolder />}></Route>
                <Route path="/users" element={<Users />}></Route>
                <Route path="/my_account" element={<MyAccount />}></Route>
                <Route path="*" element={<GotLost />}></Route>
              </Routes>
            </div>
            <div className="footer">
              <BackToTopButton />
            </div>
          </div>
        </BrowserRouter>
      </CurrentUserContext.Provider>
    </ErrorContext.Provider>
  );
}

export default App;
