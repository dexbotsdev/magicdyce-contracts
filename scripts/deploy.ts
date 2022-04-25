// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";


async function main() {
   
  const [developer] = await ethers.getSigners()
  console.log('Running   with the account: ' + developer.address)
  const   chainId   = await (await ethers.getSigner(developer.address)).getChainId(); 
  console.log("Deploying in ChainID "+chainId)   


  let USDT='0x55d398326f99059fF775485246999027B3197955';
 
  if(chainId !== 56){  
    const USDTdeployment = await (await ethers.getContractFactory("USDT")).deploy(); 
 
    console.log("USDT deployed to:", USDTdeployment.address);

   }

   
  const PDyce = await ethers.getContractFactory("PDyce");
  const greeter = await PDyce.deploy(
    USDT,
    8
  );

  await greeter.deployed();

  console.log("PDyce deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
