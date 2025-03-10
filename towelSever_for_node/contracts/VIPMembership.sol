// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28; // 指定Solidity编译器版本

contract VIPMembership {
    // 定义VIPMembership合约
    address public owner; // 合约所有者的地址
    mapping(address => bool) public isVip; // 存储VIP用户状态的映射
    uint256 public price = 1 ether; // VIP资格的价格，设定为1个以太币
    event VIPPurchased(address indexed user, uint256 amount); // 定义VIP购买事件

    constructor() {
        // 合约构造函数
        owner = msg.sender; // 将合约部署者设为所有者
    }

    // 购买VIP资格
    function purchaseVIP() external payable {
        // 定义外部可支付的购买VIP函数
        require(msg.value == price, "Incorrect amount of ETH sent"); // 检查发送的以太币数量是否正确
        require(!isVip[msg.sender], "You are already a VIP"); // 检查发送者是否已经是VIP
        isVip[msg.sender] = true; // 将发送者设为VIP
        emit VIPPurchased(msg.sender, msg.value); // 触发VIP购买事件
    }

    function checkVIP(address user) external view returns (bool) {
        // 定义外部可视的检查VIP状态函数
        return isVip[user]; // 返回用户的VIP状态
    }

    function cancelVIP(address user) external {
        require(msg.sender == owner, "Only the owner can cancel VIP status"); // 检查调用者是否为合约所有者
        require(isVip[user], "User is not a VIP"); // 检查用户是否为VIP
        isVip[user] = false; // 取消用户的VIP状态
    }
}
