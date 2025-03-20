
import React from 'react';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ConnectWalletButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    // Navigate to onboarding when user connects their wallet
    if (isConnected) {
      navigate('/onboarding');
    }
  }, [isConnected, navigate]);
  
  return (
    <>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button 
                      variant="default" 
                      className="bg-white text-black hover:bg-white/90 text-xs font-medium"
                      onClick={openConnectModal}
                    >
                      Connect Wallet
                    </Button>
                  );
                }

                return (
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white font-medium flex items-center gap-2 hover:bg-white/10"
                    onClick={openAccountModal}
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="text-xs">{account.displayName}</span>
                  </Button>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass border-white/10 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-orbitron text-xl text-center mb-2">Connect Wallet</DialogTitle>
            <DialogDescription className="text-center text-gray-400">
              Choose a wallet to connect to VYB-R8R
            </DialogDescription>
          </DialogHeader>
          
          {/* We no longer need this part as Rainbow Kit handles the wallet connection options */}
        </DialogContent>
      </Dialog>
    </>
  );
};

// Add the missing import
import { useState } from 'react';

export default ConnectWalletButton;
