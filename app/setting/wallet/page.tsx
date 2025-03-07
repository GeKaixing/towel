'use client'
import TowelButton from '@/components/ui/towel-button';
import React, { useState } from 'react';

declare global {
    interface Window {
        ethereum: any;
    }
}


const WalletPage: React.FC = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
            } catch  {
                setErrorMessage('Failed to connect to MetaMask');
            }
        } else {
            setErrorMessage('MetaMask is not installed');
        }
    };

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <h1>Connect to MetaMask Wallet</h1>
            {walletAddress ? (
                <div>
                    <p>Connected Wallet Address: {walletAddress}</p>
                </div>
            ) : (
                <TowelButton onClick={connectWallet}>Connect Wallet</TowelButton>
            )}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
};

export default WalletPage;