const express = require('express');
var morgan = require("morgan");
var Web3 = require('web3');
var cors = require('cors');
require('babel-polyfill');
var bodyParser = require('body-parser');
var http = require('http');
var sha256 = require('sha256');
var https = require("https");
const request = require('request');
var app = express();
var server = require('http').Server(app);
//use CORS
app.use(cors());
///app use 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var port = process.env.PORT || 8002;
///This is for connecting the backend code to the web3
if (typeof web3 !== 'undefined') {
    // Web3 has been injected by the browser (Mist/MetaMask)
    web3 = new Web3(web3.currentProvider);
} else {
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    web3 = new Web3(new Web3.providers.HttpProvider("http://13.58.71.247:8545"));
}
var unlocked = web3.personal.unlockAccount("0x99a87f7da1e592038bfe5d54730436927511a698","mukul");
console.log(unlocked)
var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"setaddr","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getState","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenCreationMax","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"txorigin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"Ownable1","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"initialSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"finalize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"epochnumber","type":"uint256"}],"name":"finalEtherDistribution","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"emergencyStop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"finalizedCrowdfunding","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getarr","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"arr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"stopped","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"release","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"Ownable2","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"fundingEndBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getTotalepochs","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"publisherPool","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getArrLen","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"Ownable3","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getStateFunding","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"},{"name":"val","type":"uint256"}],"name":"tokenAssignExchange","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ZDTFund","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner3","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"txn","type":"bytes"},{"name":"txHash","type":"uint256"},{"name":"addr","type":"address"},{"name":"btcaddr","type":"bytes20"}],"name":"processTransaction","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokenCreationMin","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"tokens","type":"uint256"}],"name":"calNewTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"savepublisherPool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"fundingStartBlock","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensPerBTC","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"trustedBTCRelay","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"addr1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokensPerEther","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"blacklist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_fundingStartBlock","type":"uint256"},{"name":"_fundingEndBlock","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address[]"}],"name":"logarr","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
var newcontract = web3.eth.contract(abi);
var bytecode = '60606040526040805190810160405280600381526020017f312e30000000000000000000000000000000000000000000000000000000000081525060079080519060200190620000519291906200015d565b506001600c556305f5e1096015556000601660006101000a81548160ff02191690831515021790555034156200008657600080fd5b60405160408062002bc88339810160405280805190602001909190805190602001909190505033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081601781905550806018819055506012600a0a6359682f0002600081905550600060138190555050506200020c565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f10620001a057805160ff1916838001178555620001d1565b82800160010185558215620001d1579182015b82811115620001d0578251825591602001919060010190620001b3565b5b509050620001e09190620001e4565b5090565b6200020991905b8082111562000205576000816000905550600101620001eb565b5090565b90565b6129ac806200021c6000396000f300606060405260043610610251576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146103c8578063095ea7b3146104565780630d56562c146104b057806318160ddd146104e95780631865c57d146105125780631f97c00e1461054957806323b872dd146105725780632c7622b0146105eb578063313ce56714610640578063344090f214610669578063378dc3dc1461067e578063450efe21146106a75780634bb278f3146106f4578063527097251461070957806354fd4d501461075e578063608c4350146107ec57806363a599a41461080f57806368f67330146108245780636bc7deae1461085157806370a08231146108bb57806371e5ee5f14610908578063736889141461096b57806375f12b21146109c057806386d1a69f146109ed5780638baf612f14610a025780638da5cb5b14610a1757806391b43d1314610a6c578063933048d714610a9557806395d89b4114610abe5780639bc9460d14610b4c578063a18e5cbd14610b75578063a9059cbb14610b9e578063abbff65814610bf8578063add052b414610c0d578063b4758e8214610c36578063b6e80d1314610c78578063b6f36dcf14610ca1578063bc8e114314610cf6578063c039daf614610da7578063c1c28d7d14610dd0578063c575470814610e07578063d648a64714610e2a578063dd62ed3e14610e53578063ddd35de814610ebf578063e2cc044014610ee8578063eabe09ad14610f3d578063f2fde38b14610f92578063f856d60514610fcb578063f9f92be414610ff4575b600080600660149054906101000a900460ff161561026e57600080fd5b6002600381111561027b57fe5b61028361102d565b600381111561028e57fe5b141561029957600080fd5b60003414156102a757600080fd5b6102b3346111306110b4565b91506102be826110e7565b91506102cc6013548361111c565b6013819055506b204fce5e3e2502611000000060135411156102ed57600080fd5b600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905060098054806001018281610342919061291b565b9160005260206000209001600033909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061039f81600101548361111c565b816001018190555060008160000160006101000a81548160ff0219169083151502179055505050005b34156103d357600080fd5b6103db611146565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561041b578082015181840152602081019050610400565b50505050905090810190601f1680156104485780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561046157600080fd5b610496600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061117f565b604051808215151515815260200191505060405180910390f35b34156104bb57600080fd5b6104e7600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611271565b005b34156104f457600080fd5b6104fc6112d7565b6040518082815260200191505060405180910390f35b341561051d57600080fd5b61052561102d565b6040518082600381111561053557fe5b60ff16815260200191505060405180910390f35b341561055457600080fd5b61055c6112dd565b6040518082815260200191505060405180910390f35b341561057d57600080fd5b6105d1600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506112ed565b604051808215151515815260200191505060405180910390f35b34156105f657600080fd5b6105fe611569565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561064b57600080fd5b61065361158f565b6040518082815260200191505060405180910390f35b341561067457600080fd5b61067c611594565b005b341561068957600080fd5b6106916115d7565b6040518082815260200191505060405180910390f35b34156106b257600080fd5b6106de600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506115dd565b6040518082815260200191505060405180910390f35b34156106ff57600080fd5b61070761162e565b005b341561071457600080fd5b61071c61170a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561076957600080fd5b610771611730565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156107b1578082015181840152602081019050610796565b50505050905090810190601f1680156107de5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156107f757600080fd5b61080d60048080359060200190919050506117ce565b005b341561081a57600080fd5b6108226119cc565b005b341561082f57600080fd5b610837611a40565b604051808215151515815260200191505060405180910390f35b341561085c57600080fd5b610864611a53565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156108a757808201518184015260208101905061088c565b505050509050019250505060405180910390f35b34156108c657600080fd5b6108f2600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611b93565b6040518082815260200191505060405180910390f35b341561091357600080fd5b6109296004808035906020019091905050611bdc565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561097657600080fd5b61097e611c1b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156109cb57600080fd5b6109d3611c41565b604051808215151515815260200191505060405180910390f35b34156109f857600080fd5b610a00611c54565b005b3415610a0d57600080fd5b610a15611ce3565b005b3415610a2257600080fd5b610a2a611d26565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3415610a7757600080fd5b610a7f611d4c565b6040518082815260200191505060405180910390f35b3415610aa057600080fd5b610aa8611d52565b6040518082815260200191505060405180910390f35b3415610ac957600080fd5b610ad1611d95565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610b11578082015181840152602081019050610af6565b50505050905090810190601f168015610b3e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3415610b5757600080fd5b610b5f611dce565b6040518082815260200191505060405180910390f35b3415610b8057600080fd5b610b88611dd4565b6040518082815260200191505060405180910390f35b3415610ba957600080fd5b610bde600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050611e8d565b604051808215151515815260200191505060405180910390f35b3415610c0357600080fd5b610c0b611ff6565b005b3415610c1857600080fd5b610c20612039565b6040518082815260200191505060405180910390f35b3415610c4157600080fd5b610c76600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506120e0565b005b3415610c8357600080fd5b610c8b612207565b6040518082815260200191505060405180910390f35b3415610cac57600080fd5b610cb4612215565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3415610d0157600080fd5b610d91600480803590602001908201803590602001908080601f0160208091040260200160405190810160405280939291908181526020018383808284378201915050505050509190803590602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919080356bffffffffffffffffffffffff191690602001909190505061223b565b6040518082815260200191505060405180910390f35b3415610db257600080fd5b610dba612676565b6040518082815260200191505060405180910390f35b3415610ddb57600080fd5b610df160048080359060200190919050506110e7565b6040518082815260200191505060405180910390f35b3415610e1257600080fd5b610e286004808035906020019091905050612685565b005b3415610e3557600080fd5b610e3d61269a565b6040518082815260200191505060405180910390f35b3415610e5e57600080fd5b610ea9600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506126a0565b6040518082815260200191505060405180910390f35b3415610eca57600080fd5b610ed2612727565b6040518082815260200191505060405180910390f35b3415610ef357600080fd5b610efb61272f565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3415610f4857600080fd5b610f50612755565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3415610f9d57600080fd5b610fc9600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061277b565b005b3415610fd657600080fd5b610fde61284d565b6040518082815260200191505060405180910390f35b3415610fff57600080fd5b61102b600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050612853565b005b6000601660009054906101000a900460ff161561104d57600290506110b1565b60175443101561106057600090506110b1565b601854431115801561107f57506b204fce5e3e25026110000000601354105b1561108d57600190506110b1565b6a52b7d2dcc80cd2e40000006013541015156110ac57600290506110b1565b600390505b90565b600080828402905060008414806110d557508284828115156110d257fe5b04145b15156110dd57fe5b8091505092915050565b6000806110f2612039565b90506111118361110c61110586856110b4565b60646128c1565b61111c565b925082915050919050565b60008082840190508381101580156111345750828110155b151561113c57fe5b8091505092915050565b6040805190810160405280601081526020017f5a6f68656d204461746120546f6b656e0000000000000000000000000000000081525081565b600081600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60098054806001018281611285919061291b565b9160005260206000209001600083909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60005481565b6b204fce5e3e2502611000000081565b600081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101580156113ba575081600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410155b80156113c65750600082115b1561155d5781600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050611562565b600090505b9392505050565b600f60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b601281565b33600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60135481565b600080600860008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010154915050919050565b6002600381111561163b57fe5b61164361102d565b600381111561164e57fe5b14151561165a57600080fd5b601660009054906101000a900460ff161561167457600080fd5b6001601660006101000a81548160ff021916908315150217905550601460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f19350505050151561170857600080fd5b565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60078054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156117c65780601f1061179b576101008083540402835291602001916117c6565b820191906000526020600020905b8154815290600101906020018083116117a957829003601f168201915b505050505081565b6000806000806001850360640293506001856064020392508391505b82821115156119c5576008600060098481548110151561180657fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060000160009054906101000a900460ff16158015611891575060008160010154115b156119b85761191d600160006009858154811015156118ac57fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054826001015461111c565b6001600060098581548110151561193057fe5b906000526020600020900160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060018160000160006101000a81548160ff0219169083151502179055505b81806001019250506117ea565b5050505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611a3e576001600660146101000a81548160ff0219169083151502179055505b565b601660009054906101000a900460ff1681565b611a5b612947565b7f8c4a61bc7be7a3ba9bf12b4c02b9d861ff15b638c5ca577759a15d6a4b70e676600960405180806020018281038252838181548152602001915080548015611af957602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611aaf575b50509250505060405180910390a16009805480602002602001604051908101604052809291908181526020018280548015611b8957602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611b3f575b5050505050905090565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600981815481101515611beb57fe5b90600052602060002090016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600660149054906101000a900460ff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415611ce157600660149054906101000a900460ff161515611cc557600080fd5b6000600660146101000a81548160ff0219169083151502179055505b565b33600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60185481565b6000806064600980549050811515611d6657fe5b061415611d86576064600980549050811515611d7e57fe5b049050611d92565b60016009805490500190505b90565b6040805190810160405280600381526020017f5a4454000000000000000000000000000000000000000000000000000000000081525081565b60155481565b60007f8c4a61bc7be7a3ba9bf12b4c02b9d861ff15b638c5ca577759a15d6a4b70e676600960405180806020018281038252838181548152602001915080548015611e7457602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019060010190808311611e2a575b50509250505060405180910390a1600980549050905090565b600081600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410158015611ede5750600082115b15611feb5781600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a360019050611ff0565b600090505b92915050565b33600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b60006127106017540143101561205257602890506120dd565b61271160175401431015801561206d5750614e206017540143105b1561207b57601490506120dd565b614e2160175401431015801561209657506175306017540143105b156120a457600a90506120dd565b6175316017540143101580156120bf575061c3506017540143105b156120cd57600090506120dd565b6018544311156120dc57600080fd5b5b90565b60008060008314156120f157600080fd5b6120fd836111306110b4565b9150612108826110e7565b91506121166013548361111c565b6013819055506b204fce5e3e25026110000000601354111561213757600080fd5b600860008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506009805480600101828161218c919061291b565b9160005260206000209001600086909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505081816001018190555060008160000160006101000a81548160ff02191690831515021790555050505050565b6012600a0a6359682f000281565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600080600080600080600080600660149054906101000a900460ff161561226457600080fd5b73__browser/BTC.sol:BTC___________________63e0303a2e8f6000604051608001526040518263ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001828103825283818151815260200191508051906020019080838360005b838110156122f35780820151818401526020810190506122d8565b50505050905090810190601f1680156123205780820380516001836020036101000a031916815260200191505b509250505060806040518083038186803b151561233c57600080fd5b6102c65a03f4151561234d57600080fd5b50505060405180519060200180519060200180519060200180519050985098509850985033600e60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550601060008e815260200190815260200160002060009054906101000a900460ff16151561265b5773__browser/BTC.sol:BTC___________________63e57ea16d8f8d600c546000604051604001526040518463ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018080602001846bffffffffffffffffffffffff19166bffffffffffffffffffffffff19168152602001838152602001828103825285818151815260200191508051906020019080838360005b8381101561249657808201518184015260208101905061247b565b50505050905090810190601f1680156124c35780820380516001836020036101000a031916815260200191505b50945050505050604080518083038186803b15156124e057600080fd5b6102c65a03f415156124f157600080fd5b5050506040518051906020018051905093509350831561265657600194506001601060008f815260200190815260200160002060006101000a81548160ff021916908315150217905550612549836329b927006110b4565b9150612554826110e7565b91506125626013548361111c565b6013819055506b204fce5e3e25026110000000601354111561258357600080fd5b600860008d73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050600980548060010182816125d8919061291b565b916000526020600020900160008e909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505081816001018190555060008160000160006101000a81548160ff02191690831515021790555060019950612665565b612664565b60009950612665565b5b505050505050505050949350505050565b6a52b7d2dcc80cd2e400000081565b61269160155482612902565b60158190555050565b60175481565b6000600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6329b9270081565b600a60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600e60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561284a57600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415156128495780600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b50565b61113081565b6000600860008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506000816001018190555060008160000160006101000a81548160ff0219169083151502179055505050565b6000806000831115156128d057fe5b82848115156128db57fe5b04905082848115156128e957fe5b0681840201841415156128f857fe5b8091505092915050565b600082821115151561291057fe5b818303905092915050565b81548183558181151161294257818360005260206000209182019101612941919061295b565b5b505050565b602060405190810160405280600081525090565b61297d91905b80821115612979576000816000905550600101612961565b5090565b905600a165627a7a7230582048ed82b30a6223649d6df0a8c55bd77993dde1c18b615da3ad5fd21cbe57ec140029'
console.log(bytecode)
var newcontractinstance = newcontract.new({from:'0x99a87f7da1e592038bfe5d54730436927511a698',data:'0x'+bytecode,gas:4200000,gasLimit:4500000},function(e,contract){
	if (e) {return console.log(e)}
		else{
			return console.log(contract);
		}
})
server.listen(port);
console.log("running on port " + port);

