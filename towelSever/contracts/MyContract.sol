// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract MyContract {
     uint256 public value;
    // 设置值
    function setValue(uint256 _value) public {
        value = _value;
    }

    // 获取值
    function getValue() public view returns (uint256) {
        return value;
    }
}
