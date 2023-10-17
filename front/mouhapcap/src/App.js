import './App.css';
import React  from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './Routes'
import { AuthProvider } from "./utils/AuthContext";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

function App() {
  return (

  
     
<React.StrictMode>
        <RecoilRoot> 
      <Router>
      <AuthProvider>
               
               
                
                  <Routes />
              
                <Toaster />
              </AuthProvider>
      </Router>
      </RecoilRoot>
      </React.StrictMode>

  );
}

export default App;
