import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import RouterApp from './RouterApp';

function App() {
  return (
    <Router>
      <RouterApp/>
    </Router>
  );
}

export default App;

// return (
//   <div className="App">
//     <Login setToken={setToken} />
//   </div>
// );
// }

// export default App;