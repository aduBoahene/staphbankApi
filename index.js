
const express    = require('express');        
const app        = express();                 
const bodyParser = require('body-parser');
const pg = require("pg")
const bodyparser = require('body-parser');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



const connectionString = "pg://postgres:bbbold90001@localhost:5432/staphbank";
const db = new pg.Client(connectionString);


const cors = require("cors");
app.use(cors());


//Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


const port = process.env.PORT || 9090;        


//login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.query("select * from customer where email=$1", [email]);
        if (!user) {
            return res.status(400).send({ auth: false, accessToken: null, error: "User does not exist!" });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.rows[0].password);
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, accessToken: null, error: "Invalid Credentials!" });
        }

        const token = jwt.sign({
            id: `${user.rows[0].customer_id}`,
            firstname: `${user.rows[0].firstname}`,
            lastname: `${user.rows[0].lastname}`,
            role: `${user.rows[0].roles_id}`

        }, "config.secret", {
            expiresIn: 86400
        });

        res.status(200).send({ auth: true, accessToken: token });
    } catch (error) {
        console.log(error)
    }
})


//register
app.post('/register',async(req,res)=>{
    try {
            const { firstname, lastname, email, phone_number, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10)

            const user = await db.query("Insert into customer (firstname,lastname,password,email,phone_number,created_on,last_login, roles_id) values($1,$2,$3,$4,$5,$6,$7,$8) returning *",
                        [firstname, lastname, hashedPassword ,email, phone_number, new Date(), new Date(), 2]);
        

             res.status(201).json({
             data: user.rows[0]
                });
        } catch (error) {
            console.log("register error", error)
        }
})


//add transaction
app.post('/addTransaction',async(req,res)=>{
    try {
            const { 
                account_id, account_action, 
                from_account, transaction_status, 
                to_account, phone_number,
                routing_number,amount_involved,
                bankname
            } = req.body;

            const transaction = 
await db.query("Insert into transactions (account_id, account_action,from_account,transaction_status,to_account,phone_number,routing_number,amount_involved,transaction_date,bankname) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning *",
    [account_id, account_action, from_account ,transaction_status, to_account, phone_number,routing_number,amount_involved,new Date(),bankname]);
        

             res.status(201).json({
             data: transaction.rows[0]
                });
        } catch (error) {
            console.log("register error", error)
        }
})


//list all accounts
app.get('/getAccounts',async(req,res)=>{
    try {
        const accounts = await db.query("select * from account");
    
        console.log("all accounts", accounts.rows)
    
        res.status(201).json({
            data: accounts.rows
        })
        } catch (error) {
            console.log("all account error", error)
        }
})


//list single user transactions
app.get('/getUserTransactions/:customer_id',async(req,res)=>{
    try {
        const {customer_id} = req.params;
        const transactions = await db.query("select account.account_number,account.account_id, account.balance, transactions.account_action, transactions.from_account, transactions.transaction_status,transactions.to_account,transactions.routing_number,transactions.amount_involved,transactions.transaction_date,transactions.phone_number,transactions.bankName FROM customer JOIN account ON customer.customer_id = account.customer_id JOIN transactions ON account.account_id = transactions.account_id WHERE customer.customer_id = $1",[customer_id]);
        console.log("all transactiond", transactions.rows)
    
        res.status(201).json({
            data: transactions.rows
        })
        } catch (error) {
            console.log("all transactions error", error)
        }
})


//credit



db.connect((err)=>{
    if(err){
        console.log("Unable to connect to db")
    }else{
        console.log("db connected succesfully")
    }

    app.listen(port);
    console.log('Magic happens on port ' + port);
})
   


