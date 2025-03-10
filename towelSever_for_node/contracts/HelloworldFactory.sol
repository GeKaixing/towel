// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {HelloWorld} from "./HelloWorld.sol";

// 1.直接引入统一文件系统下的合约
// 2.引入Github上的合约
// 3.通过包引入@companyName/product/contreact
contract HelloWorldFactory {
    HelloWorld hw;
    HelloWorld[] hws;
    function createHelloWorld() public {
        hw = new HelloWorld();
        hws.push[hw];
    }
    function getHellWOlrdByIndex(uint256 _index)public view returns(HelloWorld){
        return hws[_index];
    }

    function callSayHelloFromFactory(uint256 _index,uint256 _id)
    public 
    view 
    returns (string memory){
        return hws[_index].sayHello(_id);
    }

    function callSetHelloFrom(
        uint256 _index,string memory newString,uint256 _id
    )public {
        hws[_idnex].setHelloWorld(newString,_id);
    }
}
