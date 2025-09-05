
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResetPassword from './pages/ResetPassword.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* Add other routes/pages here */}
      </Routes>
    </Router>
  );
}

export default App;
