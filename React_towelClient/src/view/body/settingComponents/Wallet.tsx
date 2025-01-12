import React, { useState, useEffect } from 'react'
import { ethers, formatEther, parseEther } from "ethers";
import { useConnectWallet } from '../../../store/ConnectWallet';
export default function Wallet() {
    //     const [balance, setbalance] = useState('')
    //     const [address, setaddress] = useState('')
    //     const [nonce, setnonce] = useState(0)
    //     const [signers, setSigner] = useState<ethers.JsonRpcSigner>()
    //     const [providers, setProvider] = useState<ethers.JsonRpcProvider>()
    //     const contract = '0x5FbDB2315678afecb367f032d93F642f64180aa3'//合约地址
    // useEffect(() => {
    //     const dd = async () => {
    //         try {
    //             const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545", undefined, { polling: true });//连接RPC地址
    //             setProvider(provider)
    //             console.log(provider)
    //             let signer = await provider.getSigner()//获取签名器
    //             setSigner(signer)
    //             setaddress(signer.address)//钱包地址
    //             const ff = await provider.getBlockNumber()//获取当前区块高度
    //             const balance = await provider.getBalance(signer.address);//获取余额
    //             setbalance(formatEther(balance))//转换为ETH
    //             console.log("Balance:", formatEther(balance), "ETH");
    //             console.log(balance)
    //             console.log(signer)
    //             console.log(ff)
    //             const nonce = await provider.getTransactionCount(signer.address)//获取nonce
    //             setnonce(nonce)
    //             console.log(nonce)

    //             /* 连接合约 */
    //             const contracts = new Contract(contract, abi, signer)
    //             console.log(contracts)

    //             const sym = await contracts.getValue();
    //             console.log("Current Value:", sym.toString());
    //             // 调用 setValue 方法设置值
    //             const tx = await contracts.setValue(42); // 设置值为 42
    //             console.log("Transaction hash:", tx.hash);
    //             // 等待交易被矿工确认
    //             await tx.wait();
    //             console.log("Value updated!");
    //         } catch (error) {
    //             console.error("Error connecting to wallet:", error);
    //         }
    //     }

    //     dd()
    // }, [])

    // const dealHandler = async () => {
    //     if (!signers) {
    //         console.error("Signer is not defined");
    //         return;
    //     }
    //     try {
    //         const ts = await signers.sendTransaction({
    //             to: '0xf4ad68E7d700d3FfF2BBDd4653393974e4539B33',
    //             value: parseEther('0.1'),
    //             nonce: nonce
    //         })
    //         console.log(ts)
    //         const receipt = await ts.wait(2)// 等待2个区块确认
    //         if (providers) {
    //             const balance = await providers.getBalance(signers.address);//获取余额
    //             setbalance(formatEther(balance))
    //         } else {
    //             console.error("Provider is not defined");
    //         }
    //         console.log(receipt)
    //     } catch (error) {
    //         console.error("Error sending transaction:", error);
    //     }
    // }
    const { providers, signers, contracts } = useConnectWallet()
    
    const [address, setAddress] = useState<string | undefined>()
    const [balance, setBalance] = useState<string | undefined>()
    const [nonce, setNonce] = useState<number | undefined>()
    async function getAddress() {
        try {
            if (!signers) return
            const address = await signers?.address
            setAddress(address)
        } catch (e) { console.log(e) }
    }
    async function getBalance(address: string) {
        try {
            if (!providers) return
            const balance = await providers?.getBalance(address)
            setBalance(formatEther(balance))
        } catch (e) { console.log(e) }
    }
    async function getNonce(address: string) {
        try {
            if (!providers) return
            const nonce = await providers?.getTransactionCount(address)
            if (!nonce) return
            setNonce(nonce)
        } catch (e) { console.log(e) }
    }
    useEffect(() => {
        if (!signers) return;
        getAddress()
    }, [signers])
    useEffect(() => {
        if (!address) return;
        getBalance(address)
        getNonce(address)
    }, [address])

    const dealHandler = async () => {
        try {
            if (!contracts) return;
            const isVip = await contracts.checkVIP(address);
            if (isVip) {
                console.log("User is already a VIP.");
                return
            }
            const tx = await contracts.purchaseVIP({ value: parseEther("1") })
            await tx.wait()
            console.log('支付成功')
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className=' flex  flex-col jistify-center items-center'>
            <span className=' text-xl font-bold'>测试链接钱包</span>
            <span>address:{address}</span>
            <span>balance:{balance}</span>
            <span>nonce:{nonce}</span>
            <span className=' text-xl font-bold'>web3</span>
            <div> connect wallet</div>
            <button className='border border-gray-500 px-4 py-2 mt-4 rounded-xl' onClick={dealHandler}>Deal</button>
        </div>
    )
}