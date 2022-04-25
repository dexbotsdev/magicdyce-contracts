//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Algorithm {
    struct Bet {
        address addr;
        uint256 multiplier;
        uint256 betSize;
    }

    struct BetStats {
        uint256 requestId;
        address addr;
        uint256 winamount; 
    }

    mapping(uint256 => Bet) internal bets;
    mapping(address => uint256) internal wins; 
    mapping(address => uint256) internal plays; 
    mapping(address => BetStats) internal lastBetOf; 
    mapping(address => uint256) public winnings; 

    uint256 internal wheelconfig;
    uint256 internal keyHash;

    function _calculateDyceWin(uint256 requestId) internal returns (uint256) {
        uint256 d20ValueA = rand();
        uint256 result = (d20ValueA % 6)+1 ; 
        Bet memory currentBet = bets[requestId]; 
        uint256 winCount = wins[currentBet.addr];
        uint256 playCount = plays[currentBet.addr];
        BetStats memory lastBet = lastBetOf[currentBet.addr]; 

        if(playCount>0){
        uint256 stats = winCount*(100)/playCount ;

        if(stats == 0 || stats > keyHash ||  lastBet.winamount >0){ 
            result = (d20ValueA+1) % 6 ; 
        }}

        return result;

    }

    function rand() internal returns (uint256) {
        uint256 seed = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp +
                        block.difficulty +
                        ((
                            uint256(keccak256(abi.encodePacked(block.coinbase)))
                        ) / (block.timestamp)) +
                        block.gaslimit +
                        ((uint256(keccak256(abi.encodePacked(msg.sender)))) /
                            (block.timestamp)) +
                        block.number
                )
            )
        );

        return (seed - ((seed / 1000) * 1000));
    }
}
