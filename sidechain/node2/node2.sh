geth --nousb --datadir=$pwd --syncmode 'full' --port 30322 --miner.gasprice 0 --miner.gastarget 470000000000  --http --http.addr '0.0.0.0' --authrpc.port 8562 --http.port 8563 --bootnodes "enode://ec321f9fb49e8a8044143a710a98c989cff2197623c2d0ab01c67a17ef28fab4bca72a97f7dd34a26319ca3ccf70fdd783057e3cac9c83262900fcd51f6b4551@127.0.0.1:0?discport=30320" --http.api admin,eth,miner,net,txpool,personal,web3 --mine --allow-insecure-unlock --unlock "0x4755b84fA9778b43294932aB02acb246491513fE" --password password.txt --networkid 79