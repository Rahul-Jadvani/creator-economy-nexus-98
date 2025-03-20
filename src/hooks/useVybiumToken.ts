
import { useState, useCallback } from 'react';
import { useAccount, useProvider, useContract, useSigner } from 'wagmi';
import { ethers } from 'ethers';
import { toast } from 'sonner';
import { VYBIUM_TOKEN_ABI, VYBIUM_TOKEN_ADDRESS } from '../contracts/VybiumToken';

export const useVybiumToken = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<string>('0');
  const { address } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  // Initialize contract with signer for write operations
  const vybiumContract = useContract({
    address: VYBIUM_TOKEN_ADDRESS,
    abi: VYBIUM_TOKEN_ABI,
    signerOrProvider: signer || provider
  });

  // Format token amount with proper decimals
  const formatTokenAmount = useCallback((amount: ethers.BigNumber): string => {
    return ethers.utils.formatUnits(amount, 18); // Assuming 18 decimals, adjust if different
  }, []);

  // Parse token amount from user input to BigNumber
  const parseTokenAmount = useCallback((amount: string): ethers.BigNumber => {
    return ethers.utils.parseUnits(amount, 18); // Assuming 18 decimals, adjust if different
  }, []);

  // Get balance of current user
  const getBalance = useCallback(async (): Promise<string> => {
    if (!address || !vybiumContract) return '0';
    
    try {
      setIsLoading(true);
      const balanceResult = await vybiumContract.balanceOf(address);
      const formattedBalance = formatTokenAmount(balanceResult);
      setBalance(formattedBalance);
      return formattedBalance;
    } catch (error) {
      console.error('Error fetching VYBium balance:', error);
      toast.error('Failed to fetch VYBium balance');
      return '0';
    } finally {
      setIsLoading(false);
    }
  }, [address, vybiumContract, formatTokenAmount]);

  // Transfer tokens to another address
  const transferTokens = useCallback(async (
    recipientAddress: string,
    amount: string
  ): Promise<boolean> => {
    if (!address || !vybiumContract || !signer) {
      toast.error('Wallet not connected or contract not available');
      return false;
    }
    
    try {
      setIsLoading(true);
      const parsedAmount = parseTokenAmount(amount);
      
      // Check if user has enough balance
      const currentBalance = await vybiumContract.balanceOf(address);
      if (currentBalance.lt(parsedAmount)) {
        toast.error('Insufficient VYBium balance for this transfer');
        return false;
      }
      
      const tx = await vybiumContract.transfer(recipientAddress, parsedAmount);
      toast.info('Transaction submitted! Waiting for confirmation...');
      
      await tx.wait();
      toast.success('VYBium tokens transferred successfully!');
      
      // Refresh balance after transfer
      await getBalance();
      return true;
    } catch (error) {
      console.error('Error transferring VYBium tokens:', error);
      toast.error('Failed to transfer VYBium tokens');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, vybiumContract, signer, parseTokenAmount, getBalance]);

  // Add liquidity to the pool
  const addLiquidity = useCallback(async (
    tokenAmount: string,
    stablecoinAmount: string
  ): Promise<boolean> => {
    if (!address || !vybiumContract || !signer) {
      toast.error('Wallet not connected or contract not available');
      return false;
    }
    
    try {
      setIsLoading(true);
      const parsedTokenAmount = parseTokenAmount(tokenAmount);
      const parsedStablecoinAmount = parseTokenAmount(stablecoinAmount);
      
      // Check if user has enough token balance
      const currentBalance = await vybiumContract.balanceOf(address);
      if (currentBalance.lt(parsedTokenAmount)) {
        toast.error('Insufficient VYBium balance for adding liquidity');
        return false;
      }
      
      const tx = await vybiumContract.addLiquidity(parsedTokenAmount, parsedStablecoinAmount);
      toast.info('Adding liquidity. Transaction submitted!');
      
      await tx.wait();
      toast.success('Liquidity added successfully!');
      
      // Refresh balance after operation
      await getBalance();
      return true;
    } catch (error) {
      console.error('Error adding liquidity:', error);
      toast.error('Failed to add liquidity');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [address, vybiumContract, signer, parseTokenAmount, getBalance]);

  return {
    balance,
    isLoading,
    getBalance,
    transferTokens,
    addLiquidity,
    formatTokenAmount,
    parseTokenAmount
  };
};
