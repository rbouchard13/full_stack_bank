import React from "react";
import { UserContext } from "./context";
import Card from "./context";

export default function Withdraw(){
  const [status, setStatus] = React.useState('');
  const [warn, setWarn] = React.useState('');
  const [transAmount, setTransAmount] = React.useState('');
  const { session, setSession } = React.useContext(UserContext);

  async function updateData(amount) {
    const url = `/account/update/${session.email}/${amount}`;
    var response = await fetch(url,{ 
      headers: {
          'Authorization': 'Bearer '+ session.token, 
      },
  });
    var data = await response.json();
    let ctx = {token: session.token, auth: true, "account": session.account,"name": session.name, "email": session.email, "balance": amount};
    setSession(ctx); 
    sessionStorage.setItem('context', JSON.stringify(ctx));
    setStatus('Your Transaction has Succesfully Completed') 
  }

    function handleSubmit(){
      if(Math.sign(Number(transAmount)) === 1 || Math.sign(Number(transAmount)) === 0){
        if (Number(transAmount) > Number(session.balance)) {
          setWarn('UNABLE TO COMPLETE TRANSACTION DUE TO WITHDRAW AMOUNT EXCEEDING AVAILABLE BALANCE');
          setTimeout(() => setWarn(''), 3000);
          return;
        }
          let newBal = (Number(session.balance) - Number(transAmount));
          newBal = newBal.toFixed(2);
          (newBal).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
          updateData(newBal);
          setTransAmount('');
      } else {
        setWarn('You have entered in invalid number. Please make sure to not add -');
        setTransAmount('');
        setTimeout(() => setWarn(''), 3000); 
      }
    }

    function fixBal(num) {
      let newBal = Number(num).toFixed(2);
        (newBal).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        return newBal;
  }
    
    return ( 
      <Card 
      bgcolor= "secondary"
      txtcolor = "light"
      header = "Withdraw Portal"
      status={status}
      warn={warn}
      body = {session.auth === true ? (
        <>
          <h4>Current Balance for Account #{session.account} : ${fixBal(session.balance)}</h4>
          <div style={{maxWidth: "30rem"}}>
            <input type="number" className="form-control" value={transAmount} onChange={e =>setTransAmount(e.currentTarget.value)} required/>
            <button disabled={!transAmount} type="submit" className="btn btn-dark" onClick={handleSubmit} style={{margin: "10px"}}>Process Transaction</button>
          </div>
        </>
      ):(
        <>
          <div>Please Login in to View Account Balance and Process Transactions</div>
        </>
      )}
      /> 
    )
  }
  