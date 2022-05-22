var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const path  = require('path');
const jwt   = require('jsonwebtoken');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const accessTokenSecret = '867530920061313';

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

app.use(cors());
app.get('/account/create/:name/:email/:password', function (req, res) {
    dal.find(req.params.email.toLowerCase()).
        then((users) => {
            if(users.length > 0){
                res.send({userExists:true});    
            }
            else{
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        res.send(user);          
                    });        
            }

        });
});

app.get('/account/login/:email/:password', function (req, res) {
    dal.find(req.params.email.toLowerCase()).
        then((user) => {
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    const accessToken = jwt.sign({ username: user[0].username,}, accessTokenSecret,);
                    resp = {acct: user[0].acct,name: user[0].name, email: user[0].email.toLowerCase(), balance: user[0].balance, token: accessToken};
                    res.send(resp); 
                    action = "login";
                    dal.updateHist(user[0],action,user[0].balance)   
                }
                else{
                    res.send({error: 'Login Failed: Wrong password'});
                }
            }
            else{
                res.send({error: 'Login Failed: User not found'});
            }
    });  
});

app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email.toLowerCase()).
        then((user) => {
            res.send(user);
    });
});

app.get('/account/findOne/:email', function (req, res) {
    dal.findOne(req.params.email).
        then((user) => {
            res.send(user);
    });
});

app.get('/account/update/:email/:amount', authenticateJWT, function (req, res) {
    var amount = Number(req.params.amount);
    var action;
    dal.update(req.params.email.toLowerCase(), amount).
        then((response) => {
            res.send(response);
            let transAmount = amount - response.value.balance;
            transAmount = transAmount.toFixed(2);
            (transAmount).toLocaleString('en-US', {style: 'currency', currency: 'USD'});
            response.value.balance > amount ? action = `Withdraw: ${transAmount}` : action = `Deposit: ${transAmount}`;
            dal.updateHist(response.value,action,amount)   
    });    
});

app.get('/account/all', authenticateJWT, function (req, res) {
    dal.all().
        then((docs) => {
            //mail();
            res.send(docs);
    });
});

async function mail() {
    let transporter = nodemailer.createTransport({
        host: "smtp.ionos.com",
        port: 587,
        secure: false, 
        auth: {
          user: "dev@13media13.com", 
          pass: "dev1313mail", 
        },
      });
    
      let info = await transporter.sendMail({
        from: 'dev@13media13.com',
        to: "snoopprophet@gmail.com",
        cc: "snoopprophet@gmail.com",
        replyTo: "snoopprophet@gmail.com",
        subject: " new test",
        html: `<b>badbank al data has been triggered</b>`,
      });  
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});