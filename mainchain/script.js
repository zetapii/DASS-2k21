const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545'); //change with the port of the node which we want to connect with

const spawn = require('child_process').spawn;

//to check if geth node is running
web3.eth.getNodeInfo()
  .then(console.log("node is running"))
  .catch(console.error);


//for checking the accounts
web3.eth.getNodeInfo()
  .then((nodeInfo) => console.log(`Node info: ${nodeInfo}`))
  .catch((error) => console.error(`Error getting node info: ${error}`));

  web3.eth.getAccounts()
  .then((accounts) => {
    console.log(`Accounts: ${accounts}`);
  })
  .catch((error) => {
    console.error(`Error getting accounts: ${error}`);
  });


// Set account addresses
const account1 = '0xf2bDDE98629E85A53aDbC8564E1914d47f14C8f3'; // replace with actual address
const account2 = '0xb1a431dfc4d18cf7cc1d5d874d89511d2ac9f311'; // replace with actual address

//unlocking account
const password='zaid';
web3.eth.personal.unlockAccount(account1, password, 600)
  .then(() => {
    //Uncomment to deploy the contract
    /*const contractABI = [{"inputs":[],"name":"getRefunds","outputs":[{"components":[{"internalType":"bytes32","name":"txHash","type":"bytes32"},{"internalType":"uint256","name":"gasFee","type":"uint256"},{"internalType":"address","name":"refundAddress","type":"address"},{"internalType":"bool","name":"refunded","type":"bool"}],"internalType":"struct GasRefund.Refund[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"}],"name":"performTransaction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"txHash","type":"bytes32"}],"name":"refundGas","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"txHash","type":"bytes32"},{"internalType":"uint256","name":"gasFee","type":"uint256"},{"internalType":"address","name":"refundAddress","type":"address"}],"name":"registerForRefund","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    const contractBytecode = "608060405234801561001057600080fd5b50610a58806100206000396000f3fe60806040526004361061003f5760003560e01c80630122d343146100445780634c816d761461006057806380135ae71461007c578063ffabe176146100a7575b600080fd5b61005e6004803603810190610059919061060b565b6100d0565b005b61007a6004803603810190610075919061066e565b61011a565b005b34801561008857600080fd5b50610091610212565b60405161009e9190610803565b60405180910390f35b3480156100b357600080fd5b506100ce60048036038101906100c9919061087d565b61037a565b005b8073ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015610116573d6000803e3d6000fd5b5050565b600080600083815260200190815260200160002090508060020160149054906101000a900460ff1615610182576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101799061092d565b60405180910390fd5b60018160020160146101000a81548160ff0219169083151502179055508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc82600101549081150290604051600060405180830381858888f1935050505015801561020d573d6000803e3d6000fd5b505050565b6060600060018054905067ffffffffffffffff8111156102355761023461094d565b5b60405190808252806020026020018201604052801561026e57816020015b61025b610565565b8152602001906001900390816102535790505b50905060005b60018054905081101561037257600080600183815481106102985761029761097c565b5b9060005260206000200154815260200190815260200160002060405180608001604052908160008201548152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160149054906101000a900460ff1615151515815250508282815181106103545761035361097c565b5b6020026020010181905250808061036a906109da565b915050610274565b508091505090565b60008084815260200190815260200160002060020160149054906101000a900460ff16156103dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d49061092d565b60405180910390fd5b82600080858152602001908152602001600020600001540361046c578060008085815260200190815260200160002060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160008085815260200190815260200160002060010181905550610537565b60405180608001604052808481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff16815260200160001515815250600080858152602001908152602001600020600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020160146101000a81548160ff0219169083151502179055509050505b6001839080600181540180825580915050600190039060005260206000200160009091909190915055505050565b60405180608001604052806000801916815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000151581525090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006105d8826105ad565b9050919050565b6105e8816105cd565b81146105f357600080fd5b50565b600081359050610605816105df565b92915050565b600060208284031215610621576106206105a8565b5b600061062f848285016105f6565b91505092915050565b6000819050919050565b61064b81610638565b811461065657600080fd5b50565b60008135905061066881610642565b92915050565b600060208284031215610684576106836105a8565b5b600061069284828501610659565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6106d081610638565b82525050565b6000819050919050565b6106e9816106d6565b82525050565b60006106fa826105ad565b9050919050565b61070a816106ef565b82525050565b60008115159050919050565b61072581610710565b82525050565b60808201600082015161074160008501826106c7565b50602082015161075460208501826106e0565b5060408201516107676040850182610701565b50606082015161077a606085018261071c565b50505050565b600061078c838361072b565b60808301905092915050565b6000602082019050919050565b60006107b08261069b565b6107ba81856106a6565b93506107c5836106b7565b8060005b838110156107f65781516107dd8882610780565b97506107e883610798565b9250506001810190506107c9565b5085935050505092915050565b6000602082019050818103600083015261081d81846107a5565b905092915050565b61082e816106d6565b811461083957600080fd5b50565b60008135905061084b81610825565b92915050565b61085a816106ef565b811461086557600080fd5b50565b60008135905061087781610851565b92915050565b600080600060608486031215610896576108956105a8565b5b60006108a486828701610659565b93505060206108b58682870161083c565b92505060406108c686828701610868565b9150509250925092565b600082825260208201905092915050565b7f5472616e73616374696f6e20616c726561647920726566756e64656400000000600082015250565b6000610917601c836108d0565b9150610922826108e1565b602082019050919050565b600060208201905081810360008301526109468161090a565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006109e5826106d6565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610a1757610a166109ab565b5b60018201905091905056fea26469706673582212209e414375225818d9b78a9b2cb95785ec8b8c4aebdaba4b98c5a459f672ba03f064736f6c63430008130033"
    const MyContract = new web3.eth.Contract(contractABI);
    const deployTransaction = MyContract.deploy({ data: contractBytecode, arguments: [10] });
    const deployOptions = { from: "0xf2bdde98629e85a53adbc8564e1914d47f14c8f3", gas: 1500000 };
    deployTransaction.send(deployOptions, (error, transactionHash) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Transaction hash: ${transactionHash}`);
        console.log(JSON.stringify(transactionHash));
      }
    }).on('receipt', (receipt) => {
      console.log(`Contract address: ${receipt.contractAddress}`);
    })*/
});

//for checking contract functionality
const contractABI = [{"inputs":[],"name":"getRefunds","outputs":[{"components":[{"internalType":"bytes32","name":"txHash","type":"bytes32"},{"internalType":"uint256","name":"gasFee","type":"uint256"},{"internalType":"address","name":"refundAddress","type":"address"},{"internalType":"bool","name":"refunded","type":"bool"}],"internalType":"struct GasRefund.Refund[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_to","type":"address"}],"name":"performTransaction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"txHash","type":"bytes32"}],"name":"refundGas","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"txHash","type":"bytes32"},{"internalType":"uint256","name":"gasFee","type":"uint256"},{"internalType":"address","name":"refundAddress","type":"address"}],"name":"registerForRefund","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const contractBytecode = "608060405234801561001057600080fd5b50610a58806100206000396000f3fe60806040526004361061003f5760003560e01c80630122d343146100445780634c816d761461006057806380135ae71461007c578063ffabe176146100a7575b600080fd5b61005e6004803603810190610059919061060b565b6100d0565b005b61007a6004803603810190610075919061066e565b61011a565b005b34801561008857600080fd5b50610091610212565b60405161009e9190610803565b60405180910390f35b3480156100b357600080fd5b506100ce60048036038101906100c9919061087d565b61037a565b005b8073ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015610116573d6000803e3d6000fd5b5050565b600080600083815260200190815260200160002090508060020160149054906101000a900460ff1615610182576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101799061092d565b60405180910390fd5b60018160020160146101000a81548160ff0219169083151502179055508060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc82600101549081150290604051600060405180830381858888f1935050505015801561020d573d6000803e3d6000fd5b505050565b6060600060018054905067ffffffffffffffff8111156102355761023461094d565b5b60405190808252806020026020018201604052801561026e57816020015b61025b610565565b8152602001906001900390816102535790505b50905060005b60018054905081101561037257600080600183815481106102985761029761097c565b5b9060005260206000200154815260200190815260200160002060405180608001604052908160008201548152602001600182015481526020016002820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820160149054906101000a900460ff1615151515815250508282815181106103545761035361097c565b5b6020026020010181905250808061036a906109da565b915050610274565b508091505090565b60008084815260200190815260200160002060020160149054906101000a900460ff16156103dd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d49061092d565b60405180910390fd5b82600080858152602001908152602001600020600001540361046c578060008085815260200190815260200160002060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508160008085815260200190815260200160002060010181905550610537565b60405180608001604052808481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff16815260200160001515815250600080858152602001908152602001600020600082015181600001556020820151816001015560408201518160020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060608201518160020160146101000a81548160ff0219169083151502179055509050505b6001839080600181540180825580915050600190039060005260206000200160009091909190915055505050565b60405180608001604052806000801916815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000151581525090565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006105d8826105ad565b9050919050565b6105e8816105cd565b81146105f357600080fd5b50565b600081359050610605816105df565b92915050565b600060208284031215610621576106206105a8565b5b600061062f848285016105f6565b91505092915050565b6000819050919050565b61064b81610638565b811461065657600080fd5b50565b60008135905061066881610642565b92915050565b600060208284031215610684576106836105a8565b5b600061069284828501610659565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6106d081610638565b82525050565b6000819050919050565b6106e9816106d6565b82525050565b60006106fa826105ad565b9050919050565b61070a816106ef565b82525050565b60008115159050919050565b61072581610710565b82525050565b60808201600082015161074160008501826106c7565b50602082015161075460208501826106e0565b5060408201516107676040850182610701565b50606082015161077a606085018261071c565b50505050565b600061078c838361072b565b60808301905092915050565b6000602082019050919050565b60006107b08261069b565b6107ba81856106a6565b93506107c5836106b7565b8060005b838110156107f65781516107dd8882610780565b97506107e883610798565b9250506001810190506107c9565b5085935050505092915050565b6000602082019050818103600083015261081d81846107a5565b905092915050565b61082e816106d6565b811461083957600080fd5b50565b60008135905061084b81610825565b92915050565b61085a816106ef565b811461086557600080fd5b50565b60008135905061087781610851565b92915050565b600080600060608486031215610896576108956105a8565b5b60006108a486828701610659565b93505060206108b58682870161083c565b92505060406108c686828701610868565b9150509250925092565b600082825260208201905092915050565b7f5472616e73616374696f6e20616c726561647920726566756e64656400000000600082015250565b6000610917601c836108d0565b9150610922826108e1565b602082019050919050565b600060208201905081810360008301526109468161090a565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006109e5826106d6565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610a1757610a166109ab565b5b60018201905091905056fea26469706673582212209e414375225818d9b78a9b2cb95785ec8b8c4aebdaba4b98c5a459f672ba03f064736f6c63430008130033"
const contractAddress="0x95Ec37E0157DE79988D7439214dbdA99952EF1a5"
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function registerForRefund(txHash, gasFees, refundAddress) {
    const accounts = await web3.eth.getAccounts();
    const gasLimit = await contract.methods.registerForRefund(txHash, gasFees, refundAddress).estimateGas({ from: accounts[0] });
    const result = await contract.methods.registerForRefund(txHash, gasFees, refundAddress).send({ from: accounts[0], gas: gasLimit });
    console.log('Transaction hash:', result.transactionHash);
}

async function getRefunds() {
  //  await registerForRefund("0xc96d86436931e0d21924bf38ff7beadd74c21db2ce397de0528b0a2bcfc221b6",web3.utils.toWei('1', 'ether'),"0xb1a431dFC4d18Cf7CC1D5d874D89511D2aC9f311")
    const refunds = await contract.methods.getRefunds().call();
    //refundGas
    // contract.methods.refundGas("0xc96d86436931e0d21924bf38ff7beadd74c21db2ce397de0528b0a2bcfc221b6").send({
    //     from: '0xf2bdde98629e85a53adbc8564e1914d47f14c8f3', // replace this with the address you want to send Ether from
    //     value: web3.utils.toWei('2', 'ether') // replace this with the amount of Ether you want to send
    //   })
    //   .on('transactionHash', function(hash){
    //     console.log(`Transaction hash: ${hash}`);
    //   })
    // contract.methods.performTransaction("0xb1a431dFC4d18Cf7CC1D5d874D89511D2aC9f311").send({
    // from: '0xf2bdde98629e85a53adbc8564e1914d47f14c8f3', // replace this with the address you want to send Ether from
    // value: web3.utils.toWei('1', 'ether') // replace this with the amount of Ether you want to send
    // })
    // .on('transactionHash', function(hash){
    // console.log(`Transaction hash: ${hash}`);
    // })
    console.log(refunds);
}

async function sendRefund()
{
    contract.methods.refundGas("0xb1a431dFC4d18Cf7CC1D5d874D89511D2aC9f311")
    .send({
        from: '0xf2bDDE98629E85A53aDbC8564E1914d47f14C8f3',
        gas: 200000,
        value: web3.utils.toWei('0.1', 'ether')
    })
    
}

// sendRefund()
  getRefunds()
// sendRefund()
// contract.methods.sayHelloWorld().call((error, result) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log(`Result: ${result}`);
//     }
//   });
  

// const toAddress = '0xb1a431dfc4d18cf7cc1d5d874d89511d2ac9f311'; // replace this with the address you want to send Ether to
// contract.methods.performTransaction(toAddress).send({
//   from: '0xf2bdde98629e85a53adbc8564e1914d47f14c8f3', // replace this with the address you want to send Ether from
//   value: web3.utils.toWei('1', 'ether') // replace this with the amount of Ether you want to send
// })
// .on('transactionHash', function(hash){
//   console.log(`Transaction hash: ${hash}`);
// })
// .on('receipt', function(receipt){
//   console.log(`Transaction receipt: ${JSON.stringify(receipt)}`);
// })
// .on('error', console.error);

// get form elements

// contract.methods.getTransactionByHash("0xcdcd0f8352d80034e32ca160ac5a37076867936c8cd38f4c12a0a19ee031b64d").call((err, result) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log(result); // The transaction details will be logged to the console
//   });
  