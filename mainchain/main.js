const cookieParser = require('cookie-parser');
const http = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const { fileURLToPath } = require('url');
const { dirname } = require('path');
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const web3_node1_mainchain = new Web3('http://localhost:8545');
const web3_node2_mainchain = new Web3('http://localhost:8554');
const web3_node1_sidechain = new Web3('http://localhost:8561');
const web3_node2_sidechain = new Web3('http://localhost:8563');
const Big = require('big.js');

const cors = require('cors')

const PORT = 5000;
const app = express();
const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: true}));

app.use(cors());

//defining mongo models 
//Connect to the Atlas cluster

const uri = "";
//enter the mongodb uri

const mongoose = require("mongoose")

mongoose.connect(uri, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  dbName: 'Blockchain'
});

const connection = mongoose.connection;

// Connection error handler
connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

// Connection success handler
connection.once('open', () => {
  console.log('Successfully connected to the Atlas cluster');
});

const ownership = require('./models/ownership.js')
const mapping = require('./models/mapping.js')
const pending = require('./models/pending.js');
const { constants } = require('buffer');
const { info } = require('console');

//modify this function to vary resolution time based on network load
function getTimeOfResolution()
{
    return 10000
}

app.post('/api/registerUser', async function(req, res) {
    async function createAccount(username , password)
    {
        try 
        {
            const accMain = await web3_node1_mainchain.eth.personal.newAccount(password)
            const accSide = await web3_node1_sidechain.eth.personal.newAccount(password)
            const newMapping = new mapping({username:username,password:password,accountIdMainchain:accMain,accountIdSidechain:accSide,balance:"0",funded:false})
            await newMapping.save()
            res.send({"message":"successful"})
        }
        catch(e)
        {
            console.log(e)
            res.send({"message":"error"})
        }
    }
    const user = await mapping.findOne({username:req.body.username})
    if(!user)
    {
        createAccount(req.body.username,req.body.password);
    }
    else 
    {
        res.send({message:"error"})
    }
});

app.post('/api/getAllUserDetails', async function(req, res) {
    async function getAllUserDetails() 
    {
        try 
        {
            var info_databse = await mapping.find({})
            var current_info = []
            for ( let i = 0 ; i < info_databse.length ; i = i + 1)
            {
                    current_info.push(JSON.parse(JSON.stringify(info_databse[i])))
                    obj = info_databse[i]
                    if(obj.username == "admin")
                    {
                        current_info[i]['currentMainchainBalance'] = "inf"
                        current_info[i]['currentSidechainBalance'] = "inf"
                        current_info[i]["balance"] = "inf"
                        continue;
                    }
                    current_info[i]['currentMainchainBalance'] = await web3_node1_mainchain.eth.getBalance(info_databse[i].accountIdMainchain)                  
                    current_info[i]['currentMainchainBalance'] = web3.utils.fromWei(current_info[i]['currentMainchainBalance'], 'ether')
                    current_info[i]['currentSidechainBalance'] = await web3_node1_sidechain.eth.getBalance(info_databse[i].accountIdSidechain)
                    current_info[i]['currentSidechainBalance'] = web3.utils.fromWei(current_info[i]['currentSidechainBalance'], 'ether')
            }
            res.send({message:current_info})  
        }
        catch(e)
        {
            res.send({message:"error"})
        }
    }
    getAllUserDetails()
});

app.post('/api/getAccountsOwnership',async function(req,res) {
    var final = []
    var accounts = await mapping.find({})
    for (let i = 0; i < accounts.length; i++) {
        final.push({username:accounts[i].username,funded:accounts[i].funded})
    }
    res.send(final)
});

app.post('/api/flip_ownership',async function(req,res) {
    var final = []
    console.log(req.body)
    var account = await mapping.findOne({username:req.body.username})
    if(account.funded == false)
    {
        await mapping.updateOne({username:req.body.username},{$set:{funded:true}})
    }
    else 
    {
        await mapping.updateOne({username:req.body.username},{$set:{funded:false}})
    }
    res.send({message:"success"})
});


function subtractStrings(num1, num2) 
{
    const Num1 = new Big(num1);
    const Num2 = new Big(num2)
    const dif = Num1.minus(Num2)
    return dif.toString()

}

function addStrings(num1, num2) {
    const Num1 = new Big(num1);
    const Num2 = new Big(num2)
    const sum = Num1.plus(Num2)
    return sum.toString()
}


app.post('/api/performSidechainTransaction',async function(req,res)
{   
    async function performSidechainTransaction(sender, receiver, amount, password,user_sender,user_receiver)
    {
        try 
        {
            await web3_node1_sidechain.eth.personal.unlockAccount(sender,password)
            const receipt = await web3_node1_sidechain.eth.sendTransaction({from:sender,to:receiver,value: web3.utils.toWei(amount, 'ether')}) 
            const newPending = new pending({sender:user_sender.username,receiver:user_receiver.username,amount:amount,gasfees:receipt.gasUsed*receipt.effectiveGasPrice,resolved:false})
            await newPending.save()
            console.log(receipt)
            balance_sender_updated   = subtractStrings(user_sender.balance,amount)
            balance_sender_later     = balance_sender_updated
            balance_sender_updated   = subtractStrings(balance_sender_updated,web3.utils.fromWei((receipt.gasUsed*receipt.effectiveGasPrice).toString()),"ether")
            balance_receiver_updated = addStrings(user_receiver.balance,amount)
            await mapping.updateOne({username:user_sender.username},{$set:{balance:balance_sender_updated}})
            await mapping.updateOne({username:user_receiver.username},{$set:{balance:balance_receiver_updated}})
            if(user_sender.funded)
            {
                var admin = await web3_node1_sidechain.eth.getAccounts();
                admin = admin[0]
                await web3_node1_sidechain.eth.personal.unlockAccount(admin,"zaid")
                console.log(admin)
                gas_fees = web3.utils.fromWei((receipt.gasUsed*receipt.effectiveGasPrice).toString(),"ether") 
                const rec = await web3_node1_sidechain.eth.sendTransaction({from:admin,to:sender,value: web3.utils.toWei(gas_fees, 'ether')}) 
                const newPending = new pending({sender:"admin",receiver:user_sender.username,amount:gas_fees,gasfees:rec.gasUsed*rec.effectiveGasPrice,resolved:false})
                await newPending.save()
                await mapping.updateOne({username:user_sender.username},{$set:{balance:balance_sender_later}})
            }
            res.send({message:receipt.transactionHash})   
        }
        catch(e)
        {
            console.log(e)
            res.send({message:"error"})
        }
    }
    const user_sender   = await mapping.findOne({username:req.body.sender})
    const user_receiver = await mapping.findOne({username:req.body.receiver})
    performSidechainTransaction(user_sender.accountIdSidechain, user_receiver.accountIdSidechain, req.body.amount, req.body.password,user_sender,user_receiver)
});

async function resolvePendingTransaction()
{
    try 
    {
        const ret = await pending.find({resolved:false}) 
        await pending.updateMany({resolved:false},{$set:{resolved:true}})
        for( let i = 0 ; i < ret.length ; i = i + 1)
        {   
            const user_sender   = await mapping.findOne({username:ret[i].sender})
            const user_receiver = await mapping.findOne({username:ret[i].receiver})
            sender   = user_sender.accountIdMainchain
            receiver = user_receiver.accountIdMainchain
            gasfees  = ret[i].gasfees
            amount   = ret[i].amount
            password = user_sender.password
            console.log(sender,receiver,gasfees,amount,password)
            await web3_node1_mainchain.eth.personal.unlockAccount(sender,password)
            const receipt = await web3_node1_mainchain.eth.sendTransaction({from:sender,to:receiver,value: web3.utils.toWei(amount, 'ether')}) 
            gasfees_ = receipt.gasUsed*receipt.effectiveGasPrice
            console.log(receipt)
            if (gasfees_ != gasfees)
            {
                console.log("difference exits")
                //to-do 
                //take care of difference in gas fees
            }
        } 
    }
    catch(e)
    {
        console.log(e)
    }
}

setInterval(resolvePendingTransaction, getTimeOfResolution());

app.listen(PORT, function () {
    console.log(`Server is running on localhost:${PORT}`);
});