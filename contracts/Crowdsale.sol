pragma solidity ^0.4.23;

import "./Whitelist.sol";

contract Crowdsale {
    address owner;
    Whitelist public instance;
    constructor (address _t) public {
        instance = Whitelist(_t);
        owner = msg.sender;
    }

    modifier onlyAuthorized() {
      require( instance.userAddr(msg.sender) || msg.sender == owner);
      _;
    }

    function someFunction() onlyAuthorized public view returns (uint) {
        return 0;
    }

}
