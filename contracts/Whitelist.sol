pragma solidity ^0.4.23;

contract Whitelist {
    address owner;
    address operator;
    bool operatorInstantiated = false;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
      require( msg.sender == owner);
      _;
    }
    modifier onlyOwnerOrOperator() {
      require(msg.sender == owner || (msg.sender == operator && operatorInstantiated == true));
      _;
    }
    mapping (address => bool) userAddr;
    event addedAddress( address added);

    function whitelistAddress (address _user) onlyOwnerOrOperator public  {
        require(!userAddr[_user]);
        userAddr[_user] = true;
        emit addedAddress(_user);
    }
    function isAdded(address _address) public view returns (bool) {
      return userAddr[_address];
    }
    event initializeOperatorEvent(address operator);
    function initializeOperator(address _operator ) public onlyOwner{
      operator = _operator;
      operatorInstantiated = true;
      emit initializeOperatorEvent(operator);
    }
}
