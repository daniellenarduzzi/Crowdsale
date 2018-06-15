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

    mapping (address => bool) userAddr;
    event addedAddress( address added);

    function whitelistAddress (address _user) onlyOwner public  {
        require(!userAddr[_user]);
        userAddr[_user] = true;
        emit addedAddress(_user);
    }
    function isAdded(address _address) public view returns (bool) {
      return userAddr[_address];
    }

}
