import React from 'react';
import { useEffect } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import { UserContext } from './context';
import Navbar from './navbar';
import Home from './home';
import CreateAccount from './createaccount';
import Login from './login';
import Deposit from './deposit';
import AllData from './alldata';
import Withdraw from './withdraw';
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  const [session, setSession] = React.useState({});

  useEffect(() => {
    const data = sessionStorage.getItem('context');
    if ( data !== null ) setSession(JSON.parse(data));
  }, []);

  return (
    <UserContext.Provider value={{session,setSession}}>
    <HashRouter>
        <Navbar />
        <div className="container" style={{padding: "20px"}}>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/CreateAccount/" element={<CreateAccount/>} />
          <Route path="/login/" element={<Login/>} />
          <Route path="/deposit/" element={<Deposit/>} />
          <Route path="/withdraw/" element={<Withdraw/>} />
          <Route path="/alldata/" element={<AllData/>} />
          </Routes>
        </div>              
    </HashRouter>
    </UserContext.Provider> 
  )
}

ReactDOM.render(<App />, document.getElementById('root')
);