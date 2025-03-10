import { Contract, ethers } from 'ethers'
import React, { createContext, Suspense, useContext, useEffect, useState } from 'react'
import VIPMembership from '../abi/VIPMembership.json'
interface ConnectWalletType {
    providers?: ethers.JsonRpcProvider,
    signers?: ethers.JsonRpcSigner,
    contracts?: Contract
}
const CreateConnectWallet = createContext<ConnectWalletType>({})
export default function ConnectWallet({ children }: { children: React.ReactNode }) {
    const [providers, setProvider] = useState<ethers.JsonRpcProvider>()
    const [signers, setSigners] = useState<ethers.JsonRpcSigner>()
    const [contracts, setContracts] = useState<Contract>()
    useEffect(() => {
        async function connectWallet() {
            const providerValue = import.meta.env.VITE_RPC
            if (!providerValue) return;
            try {
                const provider = new ethers.JsonRpcProvider(providerValue)
                setProvider(provider)
                const signer = await provider.getSigner()
                setSigners(signer)
                const contractValue = import.meta.env.VITE_CONTRACT_ADDRESS
                if (!contractValue) return;
                const contract = new Contract(contractValue, VIPMembership, signer)
                setContracts(contract)
            }
            catch (error) {
                console.error('Error connecting to wallet:', error)
            }
        }
        connectWallet()
    }, [])

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {/* @ts-ignore */}
            <CreateConnectWallet value={{ providers, signers, contracts }}>
                {children}
            </CreateConnectWallet>
        </Suspense>

    )
}
export const useConnectWallet = () => {
    const context = useContext(CreateConnectWallet)
    if (context === undefined) {
        throw new Error('useConnectWallet must be used within a WalletProvider');
    }
    return context;
}
