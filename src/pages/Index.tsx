
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import PostCard, { PostData } from '@/components/PostCard';
import CreatePostForm from '@/components/CreatePostForm';
import { Button } from '@/components/ui/button';
import { Gift, Trophy, ArrowRight, X } from 'lucide-react';
import { useAccount } from 'wagmi';

const mockedPosts: PostData[] = [
  {
    id: '1',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80',
    username: 'Mark Johnson',
    handle: 'markj',
    time: '2h ago',
    content: 'Just minted my new NFT collection on VYB-R8R! Join my token community to get early access to my upcoming drops. 🚀 #Web3 #NFTs',
    image: 'https://images.unsplash.com/photo-1646998857066-d187d50549c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
    likes: 86,
    comments: 24,
    shares: 12,
    reposts: 8,
  },
  {
    id: '2',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80',
    username: 'Sophia Chen',
    handle: 'sophiac',
    time: '5h ago',
    content: 'The new VYB staking platform is live! Staking my creator tokens to earn passive income while supporting my favorite creators.\n\nWho else is joining in?',
    likes: 124,
    comments: 18,
    shares: 5,
    reposts: 11,
  },
  {
    id: '3',
    avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80',
    username: 'Alex Rivera',
    handle: 'alexr',
    time: '12h ago',
    content: 'Just launched my Creator DAO! My token holders now have voting rights on my future content. Web3 is revolutionizing how creators interact with their communities.',
    likes: 256,
    comments: 42,
    shares: 20,
    reposts: 35,
    isLiked: true,
  },
  {
    id: '4',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=120&q=80',
    username: 'Jade Williams',
    handle: 'jadew',
    time: '1d ago',
    content: 'Exclusive livestream tomorrow for my token holders! We\'ll be discussing the future of decentralized creator economies and how AI is changing the game.',
    image: 'https://images.unsplash.com/photo-1633536726481-da3ebabaa271?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
    likes: 198,
    comments: 34,
    shares: 15,
    reposts: 27,
  },
];

const Index: React.FC = () => {
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected } = useAccount();
  
  // Check if user is new (would be determined by authentication in a real app)
  const isNewUser = !location.state?.onboardingCompleted;
  
  const handleStartOnboarding = () => {
    console.log('Navigating to onboarding from Index');
    navigate('/onboarding', { replace: true });
  };

  // When a user arrives at home after completing onboarding,
  // mark that they've completed it to not show the banner again
  useEffect(() => {
    if (location.state?.onboardingCompleted) {
      setShowWelcomeBanner(false);
    }
  }, [location.state]);
  
  return (
    <Layout>
      <div className="pt-4">
        {isNewUser && showWelcomeBanner && (
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
        
        {mockedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;
