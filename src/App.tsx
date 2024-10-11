import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import Update from './Components/Update';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

const App: React.FC = () => {
  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/" element={<Signup />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/update-profile/:id" element={<Update />} />
              </Routes>
          </div>
      </Router>
  );
};

export default App;


















// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import AddUser from './Components/Signup';
// import EditUser from './Components/Update';
// import ViewUser from './Components/Profile';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';

// function App() {
//   return (
//    <>
//    <BrowserRouter>
//     <Routes>
//       <Route path='/' element= {<AddUser/>}/>
//       <Route path="/edit-user/:id" element={<EditUser/>} />
//       <Route path="/view-user/:id" element={<ViewUser/>} />
//     </Routes>
//     </BrowserRouter>
//    </>
//   );
// }

// export default App;
