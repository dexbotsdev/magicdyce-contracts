// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { BigNumber } from "ethers";
import { ethers } from "hardhat";


async function main() {
   
  const [developer] = await ethers.getSigners()
  console.log('Running   with the account: ' + developer.address)
  const   chainId   = await (await ethers.getSigner(developer.address)).getChainId(); 
  console.log("Deploying in ChainID "+chainId)   


  let USDT='0x404460c6a5ede2d891e8297795264fde62adbb75';
 
     const USDTdeployment = await (await ethers.getContractFactory("USDT")).deploy(); 
 
    console.log("USDT deployed to:", USDTdeployment.address);



    USDT = USDTdeployment.address;
 

   
  const PDyce = await ethers.getContractFactory("PDyce");
  const greeter = await PDyce.deploy(
    USDT,
    8
  ); 
  await greeter.deployed();


  console.log("PDyce deployed to  :", greeter.address);


  (await (await USDTdeployment.approve(greeter.address, '250000000000000000000')).wait());


  const allowance = await USDTdeployment.allowance(developer.address,greeter.address);
  const amountIn = 11;

  console.log("USDT allowance to:", allowance.toString());

  console.log("amountIn   to:", amountIn.toString());


   await greeter.deposit(amountIn.toString());

  console.log("USDT deposit to PDyce:",amountIn.toString());


  const requestId  =await greeter.currentRequest(developer.address);


  console.log("requestId deposit to PDyce:",requestId);



  const depositedVal = await USDTdeployment.balanceOf(greeter.address);


  console.log(depositedVal.toString());

  await greeter.rollDyce(2,requestId.toString());

  const status = await greeter.gamestatus(requestId);

  console.log("Bet on ",2,"Win Number is" ,status);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
