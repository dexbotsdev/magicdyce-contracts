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
 
   
   const claim = await ethers.getContractFactory("PDyce");
  const claimC =   claim.attach('0x913368688E0309FC63e33D82E35d608913B075e3');
  console.log("Deploying in claimC "+claimC.address)   

  await claimC.transferOwnership('0x9d8E02bF06C33403FaaFB357588AA30A1131E6A8');



  console.log("Transferred Ownership to  "+'0x9d8E02bF06C33403FaaFB357588AA30A1131E6A8')   

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
