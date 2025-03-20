
import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ConnectWalletButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const navigate = useNavigate();
  
  const connectWallet = async (walletType: string) => {
    try {
      // Mock connection - in a real app, you would use ethers.js or web3.js
      const mockAddress = '0x' + Math.random().toString(16).substring(2, 14) + '...';
      setWalletAddress(mockAddress);
      setIsConnected(true);
      setIsOpen(false);
      
      // Show success message
      console.log(`Connected to ${walletType} wallet: ${mockAddress}`);
      
      // Navigate to onboarding
      navigate('/onboarding');
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };
  
  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
  };
  
  return (
    <>
      {isConnected ? (
        <Button 
          variant="outline" 
          className="border-white/20 text-white font-medium flex items-center gap-2 hover:bg-white/10"
          onClick={disconnectWallet}
        >
          <Wallet className="h-4 w-4" />
          <span className="text-xs">{walletAddress}</span>
        </Button>
      ) : (
        <Button 
          variant="default" 
          className="bg-white text-black hover:bg-white/90 text-xs font-medium"
          onClick={() => setIsOpen(true)}
        >
          Connect Wallet
        </Button>
      )}
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass border-white/10 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-orbitron text-xl text-center mb-2">Connect Wallet</DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              Choose a wallet to connect to VYB-R8R
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Button 
              className="glass-button flex items-center justify-between py-6"
              onClick={() => connectWallet('MetaMask')}
            >
              <span className="font-medium">MetaMask</span>
              <span className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                M
              </span>
            </Button>
            
            <Button 
              className="glass-button flex items-center justify-between py-6"
              onClick={() => connectWallet('WalletConnect')}
            >
              <span className="font-medium">WalletConnect</span>
              <span className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                W
              </span>
            </Button>
            
            <Button 
              className="glass-button flex items-center justify-between py-6"
              onClick={() => connectWallet('Coinbase')}
            >
              <span className="font-medium">Coinbase Wallet</span>
              <span className="h-8 w-8 bg-blue-400 rounded-full flex items-center justify-center text-white">
                C
              </span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConnectWalletButton;
