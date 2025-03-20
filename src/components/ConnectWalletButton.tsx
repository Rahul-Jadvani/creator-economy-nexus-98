
import React, { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  
  useEffect(() => {
    // Only navigate to onboarding when user connects their wallet
    // and hasn't completed onboarding yet
    const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted') === 'true';
    
    if (isConnected && !location.pathname.includes('/onboarding') && !hasCompletedOnboarding) {
      // Use a stronger approach to navigation
      const timer = setTimeout(() => {
        console.log('Navigating to onboarding from ConnectWalletButton');
        navigate('/onboarding', { replace: true });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isConnected, navigate, location.pathname]);
  
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
    </>
  );
};

export default ConnectWalletButton;
