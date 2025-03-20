
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutGrid, Tag, Clock, TrendingUp, ShoppingCart } from 'lucide-react';

interface NFTItem {
  id: string;
  name: string;
  creator: string;
  creatorHandle: string;
  price: number;
  currency: string;
  image: string;
  isAuction: boolean;
  timeLeft?: string;
  highestBid?: number;
  likes: number;
  category: 'art' | 'collectible' | 'music' | 'photography' | 'utility';
  tokenId: string;
}

const mockNFTs: NFTItem[] = [
  {
    id: '1',
    name: 'Cyber Punk Portrait #238',
    creator: 'Digital Alchemist',
    creatorHandle: 'digitalalchemist',
    price: 0.5,
    currency: 'ETH',
    image: '/placeholder.svg',
    isAuction: false,
    likes: 45,
    category: 'art',
    tokenId: '0x1234...5678'
  },
  {
    id: '2',
    name: 'VYB Access Pass - Gold Tier',
    creator: 'VYB Platform',
    creatorHandle: 'vybplatform',
    price: 1.2,
    currency: 'ETH',
    image: '/placeholder.svg',
    isAuction: false,
    likes: 120,
    category: 'utility',
    tokenId: '0x9876...5432'
  },
  {
    id: '3',
    name: 'Genesis Beat Collection',
    creator: 'Audio Creator',
    creatorHandle: 'audiocreator',
    price: 0.8,
    currency: 'ETH',
    image: '/placeholder.svg',
    isAuction: true,
    timeLeft: '5h 23m',
    highestBid: 0.85,
    likes: 78,
    category: 'music',
    tokenId: '0x5678...9012'
  },
  {
    id: '4',
    name: 'Ethereal Landscapes #12',
    creator: 'Vision Artist',
    creatorHandle: 'visionartist',
    price: 0.3,
    currency: 'ETH',
    image: '/placeholder.svg',
    isAuction: false,
    likes: 32,
    category: 'photography',
    tokenId: '0x3456...7890'
  },
  {
    id: '5',
    name: 'Collector Card Series 1',
    creator: 'Crypto Collector',
    creatorHandle: 'cryptocollector',
    price: 0.15,
    currency: 'ETH',
    image: '/placeholder.svg',
    isAuction: true,
    timeLeft: '2d 6h',
    highestBid: 0.2,
    likes: 65,
    category: 'collectible',
    tokenId: '0x7890...1234'
  },
  {
    id: '6',
    name: 'Future City Blueprint',
    creator: 'Neo Architect',
    creatorHandle: 'neoarchitect',
    price: 0.75,
    currency: 'ETH',
    image: '/placeholder.svg',
    isAuction: false,
    likes: 89,
    category: 'art',
    tokenId: '0x2345...6789'
  }
];

const NFTCard: React.FC<{ nft: NFTItem }> = ({ nft }) => {
  return (
    <div className="glass-card overflow-hidden hover-scale transition-all duration-300">
      <div className="h-56 relative overflow-hidden group">
        <img 
          src={nft.image} 
          alt={nft.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm text-white backdrop-blur-sm bg-black/30 inline-block py-1 px-2 rounded">
            {nft.creator}
          </p>
        </div>
        
        {nft.isAuction && (
          <div className="absolute top-2 right-2 bg-black/70 text-white text-xs py-1 px-2 rounded-full flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {nft.timeLeft}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-orbitron text-lg font-medium mb-1 truncate">{nft.name}</h3>
        <p className="text-sm text-gray-400 mb-3">@{nft.creatorHandle}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-gray-400">
              {nft.isAuction ? 'Current Bid' : 'Price'}
            </p>
            <p className="font-orbitron font-medium">
              {nft.isAuction ? nft.highestBid : nft.price} {nft.currency}
            </p>
          </div>
          
          <div className="flex items-center text-sm text-gray-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>{nft.likes}</span>
          </div>
        </div>
        
        <Button 
          className="w-full bg-white text-black hover:bg-white/90 font-medium"
        >
          {nft.isAuction ? 'Place Bid' : 'Buy Now'}
        </Button>
      </div>
    </div>
  );
};

const Marketplace: React.FC = () => {
  return (
    <Layout>
      <div className="py-4">
        <div className="glass-card p-6 mb-6">
          <h1 className="text-2xl font-orbitron font-bold mb-2 text-glow">NFT Marketplace</h1>
          <p className="text-gray-400">Discover, collect, and trade unique digital assets</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="glass p-2 rounded-lg flex-grow">
            <input 
              type="text" 
              placeholder="Search items, collections, and creators..." 
              className="w-full bg-transparent border-none focus:ring-0 text-sm" 
            />
          </div>
          <Button variant="outline" className="md:w-auto w-full">
            <Tag className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="md:w-auto w-full">
            <ShoppingCart className="h-4 w-4 mr-2" />
            My Collection
          </Button>
        </div>
        
        <Tabs defaultValue="all">
          <div className="mb-6">
            <TabsList className="glass w-full justify-start p-1">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <LayoutGrid className="h-4 w-4" />
                <span>All</span>
              </TabsTrigger>
              <TabsTrigger value="art" className="flex items-center gap-1">
                <span>Art</span>
              </TabsTrigger>
              <TabsTrigger value="music" className="flex items-center gap-1">
                <span>Music</span>
              </TabsTrigger>
              <TabsTrigger value="collectibles" className="flex items-center gap-1">
                <span>Collectibles</span>
              </TabsTrigger>
              <TabsTrigger value="utility" className="flex items-center gap-1">
                <span>Utility</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockNFTs.map(nft => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="art" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockNFTs.filter(nft => nft.category === 'art').map(nft => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="music" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockNFTs.filter(nft => nft.category === 'music').map(nft => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="collectibles" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockNFTs.filter(nft => nft.category === 'collectible').map(nft => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="utility" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockNFTs.filter(nft => nft.category === 'utility').map(nft => (
                <NFTCard key={nft.id} nft={nft} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Marketplace;
