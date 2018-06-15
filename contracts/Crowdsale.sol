pragma solidity ^0.4.23;

import "./Whitelist.sol";

contract Crowdsale {
    address owner;
    Whitelist  instance;
    constructor (address _t) public {
        instance = Whitelist(_t);
        owner = msg.sender;
    }

    modifier onlyAuthorized() {
      require( instance.isAdded(msg.sender) || msg.sender == owner);
      _;
    }
    event SomeEvent(bool ok);
    function someFunction() onlyAuthorized public {
        emit SomeEvent(true);
    }

}
