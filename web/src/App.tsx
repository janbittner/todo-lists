import React from 'react';
import { Routes, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<p>Wrong route</p>} />
         </Routes>
      </BrowserRouter>
   );
};

export default App;
