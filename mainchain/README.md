# Design and Analysis of Software Systems
## Private Blockchain Project

### Overview of how to run our project setup

- Setup Geth (Version: 1.10.26) and Puppeth

- Create a workspace for your test network (We created 2 peers i.e node1 and node2 and 1 bootnode in our workspace)

- Run the command “./node1.sh” && “./node2.sh” && “./bootnode.sh” to start node1, node2 and bootnode respectively

- Run the command ps ax | grep geth to check which ports are already running a process, kill processes if needed i.e the port is already occupied and nodes are not starting

- Run “geth attach geth.ipc” for node1 and node2 to connect with node1 and node2 through geth console

- To create a new account for any node run the command “personal.newAccount()”

- To check balance run "eth.getBalance(eth.accounts[0])", 1 ether = 10^18 wei

- The http port is running on 8545 for node1 and 8554 for node2

- Run "node main.js" to start our backend

- The frontend is in index.html, click index.html to perform transactions using http protocol

- The smart contract is in smart-contract/getDetails.sol