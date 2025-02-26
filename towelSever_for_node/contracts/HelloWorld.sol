// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HelloWorld {
    //boolen
    bool boolVar_1 = true;
    bool boolVar_2 = false;
    struct Info {
        string phrase;
        uint256 id;
        address addr;
    }
    Info[] infos;
    mapping(uint256 => Info) infoMapping;
    // 无符号整数
    // uint unsigned integer ;
    // uint256;
    // unit8; 0-255
    // uint8 unintVar=256;
    // 会报错超过uint8 存储范围
    // 这是不会报错，uint 默认uint256
    uint256 unitVar = 25555555;
    // 整形数据
    // int256=-1;
    // 字节 最大bytes32 bytes16 bytes8
    // bytes bytesVar = 2;
    bytes32 bytesVar = "hello wolrd";
    // string 是一个动态的bytes，编译器会根据大小分配空间
    string strVar = "Hello world";
    // bytes 数组arrary
    // bytes byte[];
    // 地址
    address addVar = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    // 标识符 可见度标识符，可以限制数据的读取，和可见范围
    // internal(内部的合约和子合约都可以调用，不能被外部调用) external() public(公开,权限最大) private(私有)
    // view(只读)
    // 函数声明sayHello 表示公开只读的函数
    function sayHello(uint256 _id) public view returns (string memory) {
        if (infoMapping[_id].addr == address(0x0)) {
            return addinfo(strVar);
        } else {
          return  addinfo(infoMapping[_id].phrase);
        }
        // for (uint256 i = 0; i < infos.length; i++) {
        //     if (infos[i].id == _id) {
        //         return addinfo(infos[i].phrase);
        //     }
        // }
        // return addinfo(strVar);
    }

    function setHelloWorld(string memory newString) public {
        strVar = newString;
    }

    // 部署到区块链的合约是删除不了
    // pure 纯运算
    function addinfo(string memory helloWorldStr)
        internal
        pure
        returns (string memory)
    {
        return string.concat(helloWorldStr, "from Frank's contract.");
    }

    // 数据存储器
    // storge 永久型存储
    // memory 暂时型存储 和calldata的区别，memory可以修改
    // calldata 暂时型存储
    // stack
    // codes
    // log
    // strct：结构体
    // array：数组
    // mapping：映射 存储key--value

    //msg 是solidity的环境变量
    function setHelloWorld2(string memory newString, uint256 _id) public {
        Info memory info = Info(newString, _id, msg.sender);
        infoMapping[_id] = info;
        infos.push(info);
    }
    // 工厂模式 该合约生成其他合约
       
}
