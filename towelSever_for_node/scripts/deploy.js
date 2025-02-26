import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  // 获取合约工厂
  const TestContract = await ethers.getContractFactory("VIPMembership");

  // 部署合约
  console.log("正在部署合约...");
  const testContract = await TestContract.deploy();
    // 等待部署完成
    await testContract.waitForDeployment();  // 使用 waitForDeployment() 等待合约部署完成

  console.log("合约已部署到地址:", testContract.target);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

  