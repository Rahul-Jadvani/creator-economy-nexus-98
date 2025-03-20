import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Repeat2, MoreHorizontal } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export interface PostData {
  id: string;
  avatar: string;
  username: string;
  handle: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  reposts: number;
  isLiked?: boolean;
  isReposted?: boolean;
  isTokenGated?: boolean;
}

interface PostCardProps {
  post: PostData;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked || false);
  const [reposted, setReposted] = useState(post.isReposted || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [repostCount, setRepostCount] = useState(post.reposts);
  
  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };
  
  const handleRepost = () => {
    if (reposted) {
      setRepostCount(repostCount - 1);
    } else {
      setRepostCount(repostCount + 1);
    }
    setReposted(!reposted);
  };

  return (
    <div className="glass-card mb-4 overflow-hidden animate-scale-in">
      <div className="p-4">
        {/* Post Header */}
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3 border border-white/20">
              <img src={post.avatar || '/placeholder.svg'} alt={post.username} />
            </Avatar>
            <div>
              <div className="flex items-center">
                <p className="font-medium">{post.username}</p>
                <p className="text-gray-400 text-sm ml-1">@{post.handle}</p>
              </div>
              <p className="text-gray-400 text-xs">{post.time}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-white/5">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Post Content */}
        <div className="mb-3">
          <p className="whitespace-pre-line">{post.content}</p>
        </div>
        
        {/* Post Image (if any) */}
        {post.image && (
          <div className="mt-3 mb-3 rounded-xl overflow-hidden">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-auto object-cover rounded-xl hover:opacity-90 transition-opacity"
            />
          </div>
        )}
        
        {/* Post Actions */}
        <div className="flex justify-between mt-4 pt-2 border-t border-white/5">
          <button 
            className={`flex items-center text-sm hover:text-glow transition-all ${liked ? 'text-pink-500' : 'text-gray-400'}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 mr-1 ${liked ? 'fill-pink-500' : ''}`} />
            <span>{likeCount > 0 ? likeCount : ''}</span>
          </button>
          
          <button className="flex items-center text-sm text-gray-400 hover:text-glow transition-all">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{post.comments > 0 ? post.comments : ''}</span>
          </button>
          
          <button 
            className={`flex items-center text-sm hover:text-glow transition-all ${reposted ? 'text-green-500' : 'text-gray-400'}`}
            onClick={handleRepost}
          >
            <Repeat2 className="h-4 w-4 mr-1" />
            <span>{repostCount > 0 ? repostCount : ''}</span>
          </button>
          
          <button className="flex items-center text-sm text-gray-400 hover:text-glow transition-all">
            <Share2 className="h-4 w-4 mr-1" />
            <span>{post.shares > 0 ? post.shares : ''}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
