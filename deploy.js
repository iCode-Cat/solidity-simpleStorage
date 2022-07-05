const ethers = require('ethers');
const fs = require('fs');

async function main() {
  // compile them in our code
  // compile them seperately
  // http://127.0.0.1:7545 Local Blockchain

  // Local Ganache network
  const provider = new ethers.providers.JsonRpcProvider(
    'http://127.0.0.1:7545'
  );

  // Ganache private key
  // Private key will be using to sign all over the transactions
  const wallet = new ethers.Wallet(
    'adefe588256885408fc6e3537622bf81a5c09a5ccefe5c252bc1bd9f8eb286c3',
    provider
  );

  // Need ABI and binary compiled code to deploy.
  const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi', 'utf8');
  const binary = fs.readFileSync('SimpleStorage_sol_SimpleStorage.bin', 'utf8');

  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log('Deployting, please wait...');
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
