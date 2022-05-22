import React from 'react';
import bank from './bank.png';
import { UserContext } from "./context";
import Greet from './greet';

export default function NavBar(){
    const { session, setSession }= React.useContext(UserContext);
    function myFunction() {
        var x = document.getElementById("centered_nav");
        if (x.className === "rc_nav") {
            x.className += " responsive";
        } else {
            x.className = "rc_nav";
        }  
    }

    function closeNav() {
        var x = document.getElementById("centered_nav");
        x.className = "rc_nav";
    }

    function logOut() {
        setSession({});
        sessionStorage.clear();
    }

        if(session.auth === true){
            return (
            <>
                <div className="rc_brand" id="rc_logo">
                    <a href="/#" title="Logo">
                        <img src={bank} onClick={closeNav} style={{width: "30px", margin: "5px", filter: "invert(100%)"}} title="Home" alt="" /> 
                    </a>
                </div>      
                <div className="rc_nav" id="centered_nav">
                        <a className="nav_a" id="deposit" href="#/deposit/" onClick={myFunction}>Deposit</a>
                        <a className="nav_a"href="#/withdraw/" id="withdraw" onClick={myFunction}>Withdraw</a>
                        <a className="nav_a"href="#/alldata/" id="alldata" onClick={myFunction}>Account History</a>
                        <Greet />
                        <a className="nav_a" id="logout" href="/#" onClick={(e) => logOut()}>Logout</a> 
                        <a title="Menu" href style={{fontSize: "18px"}} className="icon" onClick={myFunction}>&#9776;</a>
                </div>
           </> 
           )
        } else { 
            return(
            <>
                <div className="rc_brand" id="rc_logo">
                    <a href="/#" title="Logo">
                        <img src={bank} onClick={closeNav} style={{width: "30px", margin: "5px", filter: "invert(100%)"}} title="Home" alt="" /> 
                    </a>
                </div>      
                <div className="rc_nav" id="centered_nav">
                        <a className="nav_a" id="CreateAccount" href="#/CreateAccount/" onClick={myFunction} title="Create a new user account">Create Account</a>
                        <a className="nav_a" id="login" href="#/login/" onClick={myFunction}>Login</a>  
                        <a title="Menu" href style={{fontSize: "18px"}} className="icon" onClick={myFunction}>&#9776;</a>
                </div>
            </>
            )
        }
}