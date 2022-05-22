import React, { useEffect } from "react";
import { UserContext } from "./context";
import Card from "./context";

export default function AllData(){
    const [actHist, setActHist] = React.useState([]);
    const { session, setSession } = React.useContext(UserContext);

    async function getHist() {
        const url = "/account/all";
        var response = await fetch(url,{ 
            headers: {
                'Authorization': 'Bearer '+ session.token, 
            },
        });
        var data = await response.json();
        var lst = data.filter(data => data.acct === session.account);
        setActHist(lst);
    }

    useEffect(() => {
        getHist();
    },[session]);

    function fixBal(item) {
        let newBal = item.toFixed(2);
          (newBal).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
          return newBal;
    }

    function cleanDt(item){
        let dt = item.split(/[+-]+/);
        return dt[0];
    }
        
    return (
        <Card 
            style={{width: "auto"}}
            txtcolor = "success"
            bgcolor= "light"
            header= "Account History"
            body={session.auth === true ? (
               <div className="table-responsive">
                    <table id="userTab"><thead><tr>
                        <th>Account #</th><th>Name</th><th>Email</th><th>Action</th><th>Balance</th><th>Date/Time</th></tr></thead>        
                        <tbody>
                            {actHist.map((item, index) => (
                                <tr key={index}>
                                <td>{item.acct}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.Transaction}</td>
                                <td>${fixBal(item.balance)}</td>
                                <td>{cleanDt(item.date)}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>
                    Please Login in to View Account History
                </div>
            )}
        />
    )
}