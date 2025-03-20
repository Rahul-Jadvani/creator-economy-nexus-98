
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import PostCard, { PostData } from '@/components/PostCard';
import CreatePostForm from '@/components/CreatePostForm';
import { Button } from '@/components/ui/button';
import { Gift, Trophy, ArrowRight, X } from 'lucide-react';
import { useAccount } from 'wagmi';
import { postService } from '@/services/api';
import useAuthStore from '@/store/useAuthStore';

const Index: React.FC = () => {
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { address, isConnected } = useAccount();
  const { isOnboarded, connectWallet } = useAuthStore();
  
  // Fetch posts from API
  const { data: postsData, isLoading, error } = useQuery({
    queryKey: ['feed'],
    queryFn: async () => {
      const response = await postService.getFeed();
      return response.data;
    },
    enabled: isConnected && isOnboarded
  });
  
  // Initialize showWelcomeBanner based on onboarding status
  useEffect(() => {
    if (isOnboarded) {
      setShowWelcomeBanner(false);
    }
  }, [isOnboarded]);
  
  // Connect wallet when address is available
  useEffect(() => {
    if (isConnected && address && !isOnboarded) {
      connectWallet(address);
    }
  }, [isConnected, address, isOnboarded, connectWallet]);
  
  const handleStartOnboarding = () => {
    console.log('Navigating to onboarding from Index');
    navigate('/onboarding', { replace: true });
  };
  
  return (
    <Layout>
      <div className="pt-4">
        {!isOnboarded && showWelcomeBanner && (
          <div className="glass-card mb-6 p-4 border border-blue-500/20 relative">
            <button 
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setShowWelcomeBanner(false)}
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-4 md:mb-0 md:mr-6">
                <Trophy className="h-16 w-16 text-yellow-400" />
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-orbitron font-bold mb-2">Welcome to VYB-R8R!</h2>
                <p className="text-gray-300 mb-4">
                  Get started by completing the onboarding process to earn your first rewards and learn how to use the platform.
                </p>
                
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="bg-white/10 py-1 px-3 rounded-full flex items-center text-sm">
                    <Gift className="h-4 w-4 mr-1 text-green-400" />
                    <span>50 VYB Welcome Bonus</span>
                  </div>
                  <div className="bg-white/10 py-1 px-3 rounded-full flex items-center text-sm">
                    <Gift className="h-4 w-4 mr-1 text-green-400" />
                    <span>Soulbound Identity NFT</span>
                  </div>
                  <div className="bg-white/10 py-1 px-3 rounded-full flex items-center text-sm">
                    <Gift className="h-4 w-4 mr-1 text-green-400" />
                    <span>Exclusive Creator Access</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleStartOnboarding}
                  className="bg-white text-black hover:bg-white/90"
                >
                  Start Onboarding <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
        
        <CreatePostForm />
        
        {isLoading ? (
          <div className="glass-card p-4 text-center">
            <p>Loading posts...</p>
          </div>
        ) : error ? (
          <div className="glass-card p-4 text-center">
            <p>Error loading posts. Please try again later.</p>
          </div>
        ) : postsData && postsData.posts && postsData.posts.length > 0 ? (
          postsData.posts.map((post: any) => (
            <PostCard 
              key={post.id} 
              post={{
                id: post.id,
                avatar: post.author.avatar || '/placeholder.svg',
                username: post.author.username || 'User',
                handle: post.author.handle || 'user',
                time: new Date(post.createdAt).toLocaleDateString(),
                content: post.content,
                image: post.image,
                likes: post.likes,
                comments: post.comments,
                shares: post.shares,
                reposts: post.reposts,
                isTokenGated: post.isTokenGated
              }} 
            />
          ))
        ) : (
          <div className="glass-card p-4 text-center">
            <p>No posts yet. Be the first to share something!</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
