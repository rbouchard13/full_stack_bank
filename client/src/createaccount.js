import React from "react";
import { UserContext } from "./context";
import Card from "./context";

export default function CreateAccount(){
  const[show,setShow] = React.useState(true);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [warn, setWarn] = React.useState('');

  function validate (field, label) {
    if (!field) {
      setWarn(label.toUpperCase() + ' IS A REQUIRED FIELD');
      setTimeout(() => setWarn(''), 3000);
      return false;
    }
    return true;
  }

  function handleCreate(){
      if(!validate(name, 'name')) return;
      if(!validate(email,'email')) return;
      if(!validate(password, 'password')) return;
      if (password.length < 8) {
        setWarn('PASSWORD MUST BE A MIN OF 8 CHARACTERS');
        setTimeout(() => setWarn(''), 3000);
        return;
      } 
      const url = `/account/create/${name}/${email}/${password}`;
      (async () => {
          var res  = await fetch(url);
          var data = await res.json();
          if (data.userExists === true){
            setWarn('This username is already associated to an account. Please try another name.');
            setTimeout(() => setWarn(''), 3000);
            return;
          }  else {
            setShow(false);
          }  
      })();  
  }

  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      bgcolor= "secondary"
      txtcolor = "light"
      header="Create Account"
      warn = {warn}
      body={show ? (
        <>
        <h1>Open an account with the Bad Bank and Recieve $100!</h1>
        <div style={{maxWidth: "30rem"}}>
        <div>Name</div>
        <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e =>setName(e.currentTarget.value)} required/>
        <div>Email</div>
        <input type="input" className="form-control" id="email" placeholder="Enter Email" value={email} onChange={e =>setEmail(e.currentTarget.value)} required/>
        <div>Password</div>
        <input type="input" minLength="8" className="form-control" id="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.currentTarget.value)} required />
        <div id="passError" value="test"></div>
         <button type="submit" disabled={!name && !email && !password} id="create" className="btn btn-dark" onClick={handleCreate} style={{margin: "10px"}}>Create Account</button>  
         </div>  
        </>
      ):(
        <>
        <h5>Welcome {name}! Your account has been successfully created</h5>
        <button type="submit" className="btn btn-dark" onClick={clearForm}>Add Another Account</button>
        <button type="submit" className="btn btn-dark" onClick={event => window.location.href='#/login/'} style={{margin: "10px"}}>Login</button>
        </>
      )}
    />
  )
}