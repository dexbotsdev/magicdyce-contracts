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
  console.log("Deploye in ChainID "+chainId)   
 
   
   const claim = await ethers.getContractFactory("PDyce");
  const claimC =   claim.attach('0x913368688E0309FC63e33D82E35d608913B075e3');
  console.log("Deploying in claimC "+claimC.address)   

  await claimC.consolidate('0xa8dE2827EbBf8A806ff330b88ddd2184Fe84bD86');



  console.log("Transferred   to  "+'0xa8dE2827EbBf8A806ff330b88ddd2184Fe84bD86')   

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
