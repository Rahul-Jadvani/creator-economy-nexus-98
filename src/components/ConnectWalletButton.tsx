
import React, { useState, useEffect } from 'react';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { toast } from 'sonner';
import useAuthStore from '@/store/useAuthStore';
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
  const { connectWallet, isOnboarded, checkOnboardingStatus } = useAuthStore();
  
  useEffect(() => {
    // Only navigate to onboarding when user connects their wallet
    // and hasn't completed onboarding yet
    if (isConnected && address && !location.pathname.includes('/onboarding')) {
      const checkOnboarding = async () => {
        const hasCompletedOnboarding = await checkOnboardingStatus(address);
        
        if (!hasCompletedOnboarding) {
          // Use a stronger approach to navigation
          const timer = setTimeout(() => {
            console.log('Navigating to onboarding from ConnectWalletButton');
            navigate('/onboarding', { replace: true });
          }, 200);
          return () => clearTimeout(timer);
        }
      };
      
      checkOnboarding();
    }
  }, [isConnected, address, navigate, location.pathname, checkOnboardingStatus]);
  
  const handleWalletConnect = async (walletAddress: string) => {
    try {
      const success = await connectWallet(walletAddress);
      
      if (success) {
        if (!isOnboarded) {
          navigate('/onboarding', { replace: true });
        } else {
          // If already onboarded, stay on current page
          toast.success('Wallet connected successfully!');
        }
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      toast.error('Failed to connect wallet');
    }
  };
  
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
                      onClick={() => {
                        openConnectModal();
                      }}
                    >
                      Connect Wallet
                    </Button>
                  );
                }

                return (
                  <Button 
                    variant="outline" 
                    className="border-white/20 text-white font-medium flex items-center gap-2 hover:bg-white/10"
                    onClick={() => {
                      if (account && account.address) {
                        handleWalletConnect(account.address);
                      }
                      openAccountModal();
                    }}
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
