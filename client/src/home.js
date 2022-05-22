import React from "react";
import { UserContext } from "./context";
import Card from "./context";

export default function Home(){ 
  return (
    <center><Card
      bgcolor = "light"
      txtcolor = "dark"
      header="Welcome to the Bad Bank!"
      title="Let your money work for you with our industry leading .000000009% interest rate!"
      body={(<img src="bank.png" className="img-fluid" alt=""/>)}
    /></center>
  );  
}