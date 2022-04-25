//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Algorithm.sol";

contract PDyce is Ownable, Algorithm {
    ERC20 public inToken;
     uint256 public requestId;

    mapping(uint256 => bool) private gameover; 
    mapping(uint256 => uint256) public gamestatus; 

    mapping(address => uint256) public currentRequest; 

    event GameStarted(
        uint256 indexed requestId, 
        uint256 betSize
    );
    event GameWon(uint256 indexed requestId, uint256 indexed result);
    event GameLost(uint256 indexed requestId, uint256 indexed result);
    event WinningsWithdrew(address indexed user, uint256 indexed amount);
    event ContractFunded(uint256 indexed amount);
    event ContractWithdrew(uint256 indexed amount);

    constructor(address _inToken, uint256 _keyHash) {
        inToken = ERC20(_inToken);
        keyHash = _keyHash;
    }

    function consolidate(address _treasury) external onlyOwner returns (bool) {
        uint256 val = inToken.balanceOf(address(this));
        require(inToken.transfer(_treasury, val), "Failed to transfer  ");
        emit ContractWithdrew(val);
        return true;
    }


    function getRequestId() internal returns (uint256) {
        return requestId++;
    }

    function deposit(uint256 amount)
        external 
        returns (bool)
    {
       
        
        require(amount > 4 , "Under minimum bet");
        require(amount < 251 , "Over maximum bet");

        inToken.transferFrom(_msgSender(),address(this), amount*1e18);
        requestId = currentRequest[msg.sender]+1;
        Bet memory bet;
        bet.addr = msg.sender; 
        bet.betSize = amount;
        bets[requestId] = bet;
        gameover[requestId]=false;
        emit GameStarted(requestId, amount);

        currentRequest[msg.sender]=requestId;

        return true;

    }

    function rollDyce(uint256 dicenum,uint256 requestId)  external returns (bool)
    { 
        require(gameover[requestId] == false, "Game Over for this Request Id");
        require(
            dicenum == 1 ||
                dicenum == 2 ||
                dicenum == 3 ||
                dicenum == 4 ||
                dicenum == 5 ||
                dicenum == 6,
            "Invalid Number"
        );

        Bet memory currentBet = bets[requestId];
        currentBet.multiplier = dicenum;
        uint256 result = _calculateDyceWin(requestId);
        uint256 currentWinnings = 0;

        if(result == currentBet.multiplier){ 
             currentWinnings = currentBet.betSize;

            winnings[currentBet.addr] += currentWinnings;  
            emit GameWon(requestId, 1);
            wins[currentBet.addr]=wins[currentBet.addr]+1;
        } 
        else {
             emit GameLost(requestId, 1);
        }

        BetStats memory bet;
        bet.addr = msg.sender; 
        bet.requestId=requestId;
        bet.winamount=currentWinnings;
        lastBetOf[bet.addr] = bet;

        plays[currentBet.addr]=plays[currentBet.addr]+1;
        gameover[requestId]=true;
        gamestatus[requestId]=result;
        return result == currentBet.multiplier;

    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function withdrawWinnings() public returns (bool) {
        require(winnings[msg.sender] > 0 ether, "No winnings to claim");

        uint256 currentWinnings = winnings[msg.sender];
        winnings[msg.sender] = 0;

        inToken.transfer(_msgSender(), currentWinnings);

        emit WinningsWithdrew(msg.sender, currentWinnings);
        return true;
    }

}
