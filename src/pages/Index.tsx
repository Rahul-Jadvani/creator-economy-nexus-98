
import React from 'react';
import Layout from '@/components/Layout';
import PostCard, { PostData } from '@/components/PostCard';
import CreatePostForm from '@/components/CreatePostForm';

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
  return (
    <Layout>
      <div className="pt-4">
        <CreatePostForm />
        
        {mockedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;
