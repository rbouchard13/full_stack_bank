import React from "react";
import { useEffect } from "react";
import { UserContext } from "./context";
import Card from "./context";

export default function Login(){
  const [show,setShow] = React.useState(true);
  const [warn, setWarn] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { session, setSession } = React.useContext(UserContext);

  useEffect(() => {
      session.auth === true ? setShow(false) : setShow(true);
  });

  function validate (field, label) {
    if (!field) {
      setWarn(label.toUpperCase() + ' IS A REQUIRED FIELD');
      setTimeout(() => setWarn(''), 3000);
      return false;
    }
    return true;
  }

  function handleSubmit() {
    if(!validate(email,'email')) return;
    if(!validate(password, 'password')) return;
      const url = `/account/login/${email}/${password}`;
      (async () => {
        var res  = await fetch(url);
        var data = await res.json();
        if (data.error){
          setWarn(data.error);
          setTimeout(() => setWarn(''), 3000);
          return;
        }  else {
          let ctx = {token: data.token, auth: true, "account": data.acct,"name": data.name, "email": email, "balance":data.balance};
          setSession(ctx); 
          sessionStorage.setItem('context', JSON.stringify(ctx));
          setShow(false);
        }  
    })();
  }

  return (
    <Card 
     bgcolor= "secondary"
     txtcolor = "light"
      header= "Login"
      warn={warn}
      body = {show ? (
        <>
        <div style={{maxWidth: "30rem"}}>
          <div>Email</div>
            <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e =>setEmail(e.currentTarget.value)} required/>
          <div>Password</div>
            <input type="input" minLength="8" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e =>setPassword(e.currentTarget.value)} required />
          <button disabled={!email && !password} type="submit" className="btn btn-dark" onClick={handleSubmit} style={{margin: "10px"}}>Login</button> 
        </div>
        </>
      ):(
        <>
        <h5>Your Account Session has been Succesfully Started</h5>
          <button type="submit" className="btn btn-dark" onClick={event => window.location.href='#/deposit/'}>Deposit</button>
          <button type="submit" className="btn btn-dark" onClick={event => window.location.href='#/withdraw/'} style={{margin: "10px"}}>Withdraw</button>
        </>     
      )}
    />
  )  
}
