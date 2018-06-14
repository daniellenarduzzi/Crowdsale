pragma solidity ^0.4.23;

contract Whitelist {
    address owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
      require( msg.sender == owner);
      _;
    }

    mapping (address => bool) public userAddr;

    event addedAddress( address added);
    function whitelistAddress (address user) onlyOwner public  {
        userAddr[user] = true;
        emit addedAddress(user);
    }
}
