import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import { ethers } from "ethers";


dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


const FTMSCAN_API_KEY = process.env.FTMSCAN_API_KEY as string;
const DEPLOYER_SECRET_KEY = process.env.DEPLOYER_SECRET_KEY as string;
const dev = process.env.DEV_PRIVATE_KEY as string;
const TEST_PK = process.env.TEST_PK as string;
const polygonMumbaiRPC = process.env.POLYGON_MUMBAI_RPC as string;
const avaxFuji = process.env.AVAX_FUJI_RPC as string;
const avaxMainnet = process.env.AVAX_MAINNET_RPC as string;
const treasury = process.env.TRES_RECV as string;

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  
  solidity: {
    compilers: [
      {
        version: "0.6.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },

      {
        version: "0.8.11",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
    ], 
  },
  networks: {
    default: {
      url: "http://127.0.0.1:8545/",
    },
    local: {
      url: "http://127.0.0.1:8545/",
    },
    polygon: {
      url: "https://polygon-rpc.com/",
      accounts: [dev], // Use your account private key on the Avalanche testnet
      gas: "auto",
      gasPrice: ethers.utils.parseUnits("500", "gwei").toNumber(),
    },
    polygonMumbai: {
      url: polygonMumbaiRPC,
      accounts: [dev], // Use your account private key on the Avalanche testnet
      gas: "auto",
      gasPrice: ethers.utils.parseUnits("30", "gwei").toNumber(),
    },
    fuji: {
      url: avaxFuji, // Public Avalanche testnet 
      gas: "auto",
      gasPrice: "auto",
      chainId: 43113,
      accounts: [dev], // Use your account private key on the Avalanche testnet
    },
    avax: {
      url: avaxMainnet, // Public Avalanche mainnet
      gas: "auto",
      gasPrice: "auto",
      chainId: 43114,
      accounts: [dev], /// Use your account private key on the Avalanche mainnet
    },
    ganache: {
      url: "http://localhost:8545",
      accounts: [dev],
    },
    ftm_testnet: {
      url: "https://rpc.testnet.fantom.network/",
      chainId: 4002,
      accounts: [dev], 
    }, 
    ftm: {
      url: "https://rpc.ftm.tools/",
      chainId: 250,
      accounts: [dev], 
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gas: "auto",
      gasPrice: "auto",
      accounts: [DEPLOYER_SECRET_KEY],
    }, 
    bsctestnet: {
     url: "https://data-seed-prebsc-1-s1.binance.org:8545",
     chainId: 97,
     gas:"auto",
     gasPrice: "auto",
     accounts: [TEST_PK]
   },

  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY, 
      // avalanche
      avalanche: "VKFRSDT88R4MSS4NXACH8WRF8CHEEUSZ27",
      avalancheFujiTestnet: "VKFRSDT88R4MSS4NXACH8WRF8CHEEUSZ27", 
    },
  },
};

export default config;
