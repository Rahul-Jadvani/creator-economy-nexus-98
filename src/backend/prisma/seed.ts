
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');
  
  // Create interests
  const interests = [
    { name: 'music' },
    { name: 'tech' },
    { name: 'art' },
    { name: 'gaming' },
    { name: 'finance' },
    { name: 'fashion' },
    { name: 'sports' },
    { name: 'writing' },
    { name: 'fitness' },
    { name: 'education' }
  ];
  
  for (const interest of interests) {
    await prisma.interest.upsert({
      where: { name: interest.name },
      update: {},
      create: interest
    });
  }
  
  console.log('Interests seeded');
  
  // Create sample users
  const users = [
    {
      walletAddress: '0x1234567890123456789012345678901234567890',
      username: 'CryptoKing',
      handle: 'cryptoking',
      bio: 'Web3 enthusiast and NFT collector. Building the future of decentralized social.',
      avatar: '/placeholder.svg',
      banner: '/placeholder.svg',
      isCreator: true
    },
    {
      walletAddress: '0x2345678901234567890123456789012345678901',
      username: 'NFTQueen',
      handle: 'nftqueen',
      bio: 'Artist and creative mind. Exploring the boundaries of digital art and NFTs.',
      avatar: '/placeholder.svg',
      banner: '/placeholder.svg',
      isCreator: true
    },
    {
      walletAddress: '0x3456789012345678901234567890123456789012',
      username: 'BlockchainDev',
      handle: 'blockchaindev',
      bio: 'Software engineer passionate about blockchain technology and decentralized applications.',
      avatar: '/placeholder.svg',
      banner: '/placeholder.svg',
      isCreator: false
    },
    {
      walletAddress: '0x4567890123456789012345678901234567890123',
      username: 'DeFiMaster',
      handle: 'defimaster',
      bio: 'DeFi expert. Building the future of finance one block at a time.',
      avatar: '/placeholder.svg',
      banner: '/placeholder.svg',
      isCreator: true
    },
    {
      walletAddress: '0x5678901234567890123456789012345678901234',
      username: 'MetaverseExplorer',
      handle: 'metaverseexplorer',
      bio: 'Exploring virtual worlds and building communities in the metaverse.',
      avatar: '/placeholder.svg',
      banner: '/placeholder.svg',
      isCreator: false
    }
  ];
  
  // Create users and store their IDs
  const userIds = [];
  
  for (const user of users) {
    const createdUser = await prisma.user.upsert({
      where: { walletAddress: user.walletAddress },
      update: user,
      create: user
    });
    
    userIds.push(createdUser.id);
    
    // Add interests to users
    const randomInterests = interests
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 5) + 1);
    
    for (const interest of randomInterests) {
      const dbInterest = await prisma.interest.findUnique({
        where: { name: interest.name }
      });
      
      if (dbInterest) {
        await prisma.user.update({
          where: { id: createdUser.id },
          data: {
            interests: {
              connect: { id: dbInterest.id }
            }
          }
        });
      }
    }
  }
  
  console.log('Users seeded');
  
  // Create follows between users
  for (let i = 0; i < userIds.length; i++) {
    for (let j = 0; j < userIds.length; j++) {
      if (i !== j && Math.random() > 0.5) {
        try {
          await prisma.follow.create({
            data: {
              followerId: userIds[i],
              followingId: userIds[j]
            }
          });
          
          // Update followers and following counts
          await prisma.user.update({
            where: { id: userIds[j] },
            data: { followers: { increment: 1 } }
          });
          
          await prisma.user.update({
            where: { id: userIds[i] },
            data: { following: { increment: 1 } }
          });
        } catch (error) {
          // Ignore duplicate follow relationships
          console.log('Skip duplicate follow');
        }
      }
    }
  }
  
  console.log('Follows seeded');
  
  // Create posts for each user
  const postContents = [
    'Just launched my new NFT collection! Check it out on OpenSea. #NFT #DigitalArt',
    'The future of social media is decentralized. No more algorithms controlling what you see. #Web3 #Decentralization',
    'Working on a new project that will revolutionize how we think about digital ownership. Stay tuned!',
    'Had an amazing conversation with @vitalik today about the future of Ethereum. Mind blown! 🤯',
    'What are your thoughts on the latest governance proposal? Should we vote yes or no?',
    'Just staked 1000 VYB tokens in the pool. Let\'s see those sweet APY returns! 💰',
    'Who\'s coming to the next creator meetup? It\'s going to be epic!',
    'Reading "The Infinite Machine" by @CamiRusso - highly recommended for anyone interested in Ethereum\'s history.',
    'My prediction: Web3 social platforms will overtake traditional social media within 5 years. What do you think?',
    'Bought my first plot of land in the metaverse today. Time to build something amazing!'
  ];
  
  for (const userId of userIds) {
    const numPosts = Math.floor(Math.random() * 5) + 3; // 3-7 posts per user
    
    for (let i = 0; i < numPosts; i++) {
      const content = postContents[Math.floor(Math.random() * postContents.length)];
      const isTokenGated = Math.random() > 0.8; // 20% chance of being token gated
      
      const post = await prisma.post.create({
        data: {
          content,
          image: Math.random() > 0.7 ? '/placeholder.svg' : undefined, // 30% chance of having an image
          isTokenGated,
          authorId: userId
        }
      });
      
      // Add likes to posts
      for (const likerId of userIds) {
        if (likerId !== userId && Math.random() > 0.6) {
          try {
            await prisma.like.create({
              data: {
                postId: post.id,
                userId: likerId
              }
            });
            
            // Update post like count
            await prisma.post.update({
              where: { id: post.id },
              data: { likes: { increment: 1 } }
            });
          } catch (error) {
            // Ignore duplicate likes
            console.log('Skip duplicate like');
          }
        }
      }
      
      // Add comments to posts
      const comments = [
        'Great post! Thanks for sharing.',
        'Interesting perspective. I hadn\'t thought about it that way.',
        'I completely agree with you on this!',
        'Excited to see where this goes!',
        'Can you share more details about this?',
        'This is exactly what the community needs right now.'
      ];
      
      const numComments = Math.floor(Math.random() * 3); // 0-2 comments per post
      
      for (let j = 0; j < numComments; j++) {
        const commenterId = userIds[Math.floor(Math.random() * userIds.length)];
        if (commenterId !== userId) {
          const comment = comments[Math.floor(Math.random() * comments.length)];
          
          await prisma.comment.create({
            data: {
              content: comment,
              postId: post.id,
              authorId: commenterId
            }
          });
          
          // Update post comment count
          await prisma.post.update({
            where: { id: post.id },
            data: { comments: { increment: 1 } }
          });
        }
      }
    }
  }
  
  console.log('Posts, likes, and comments seeded');
  
  // Create initial VYB staking pool
  await prisma.stakingPool.upsert({
    where: { id: 'vyb-token-pool' },
    update: {},
    create: {
      id: 'vyb-token-pool',
      name: 'VYB Token',
      icon: '/placeholder.svg',
      apy: 12.5,
      lockPeriod: '30 days',
      minStake: 100,
      tokenPrice: 0.15,
      isCreatorToken: false
    }
  });
  
  console.log('VYB staking pool seeded');
  
  // Create creator tokens for creator users
  const creatorUsers = users.filter(u => u.isCreator);
  
  for (let i = 0; i < creatorUsers.length; i++) {
    const user = await prisma.user.findFirst({
      where: { 
        walletAddress: creatorUsers[i].walletAddress,
        isCreator: true
      }
    });
    
    if (user) {
      const tokenSymbol = `$${user.handle.toUpperCase().substring(0, 4)}`;
      const tokenName = `${user.username} Token`;
      const initialPrice = (Math.random() * 10 + 0.5).toFixed(2); // Random price between 0.5 and 10.5
      
      try {
        // Create token
        const token = await prisma.creatorToken.create({
          data: {
            tokenSymbol,
            tokenName,
            currentPrice: parseFloat(initialPrice),
            priceChange: (Math.random() * 20 - 10).toFixed(2), // Random between -10% and +10%
            marketCap: parseFloat(initialPrice) * 1000, // Initial market cap
            volume: Math.floor(Math.random() * 10000),
            holders: Math.floor(Math.random() * 100),
            creatorId: user.id
          }
        });
        
        // Create staking pool for token
        await prisma.stakingPool.create({
          data: {
            name: tokenName,
            apy: (Math.random() * 15 + 5).toFixed(2), // Random APY between 5% and 20%
            lockPeriod: '30 days',
            minStake: 10,
            isCreatorToken: true,
            tokenPrice: parseFloat(initialPrice),
            tokenId: token.id,
            creatorId: user.id
          }
        });
      } catch (error) {
        console.error(`Error creating token for ${user.username}:`, error);
      }
    }
  }
  
  console.log('Creator tokens and staking pools seeded');
  
  // Create initial raffles
  const raffles = [
    {
      id: 'raffle-1',
      name: 'Exclusive NFT Drop',
      image: '/placeholder.svg',
      endTime: '23:45:12',
      entryCost: 100,
      prize: 'Limited Edition NFT + 1000 VYB'
    },
    {
      id: 'raffle-2',
      name: 'Creator Meetup VIP Access',
      image: '/placeholder.svg',
      endTime: '11:23:45',
      entryCost: 250,
      prize: 'VIP Pass + Merchandise Pack'
    },
    {
      id: 'raffle-3',
      name: 'Token Launch Whitelist',
      image: '/placeholder.svg',
      endTime: '47:15:32',
      entryCost: 50,
      prize: 'Guaranteed Whitelist Spot'
    },
    {
      id: 'raffle-4',
      name: 'Early Access to New Platform Features',
      image: '/placeholder.svg',
      endTime: '35:10:22',
      entryCost: 75,
      prize: 'Beta Tester Role + 500 VYB'
    }
  ];
  
  for (const raffle of raffles) {
    await prisma.raffle.upsert({
      where: { id: raffle.id },
      update: {},
      create: raffle
    });
    
    // Add random entries to raffles
    for (const userId of userIds) {
      if (Math.random() > 0.7) {
        try {
          await prisma.raffleEntry.create({
            data: {
              raffleId: raffle.id,
              userId
            }
          });
        } catch (error) {
          // Ignore duplicate entries
          console.log('Skip duplicate raffle entry');
        }
      }
    }
  }
  
  console.log('Raffles and entries seeded');
  
  // Create ticket events
  const events = [
    {
      title: 'Web3 Creator Summit',
      description: 'Join top web3 creators for a day of panels, workshops, and networking.',
      date: '2023-07-15',
      time: '10:00 AM',
      maxAttendees: 200,
      price: 50,
      image: '/placeholder.svg',
      tokenGated: false,
      status: 'upcoming'
    },
    {
      title: 'NFT Art Exhibition',
      description: 'Exclusive showcase of digital art by top NFT artists in the community.',
      date: '2023-08-22',
      time: '7:00 PM',
      maxAttendees: 150,
      price: 25,
      image: '/placeholder.svg',
      tokenGated: true,
      status: 'upcoming'
    },
    {
      title: 'DeFi Workshop: Yield Farming',
      description: 'Learn advanced strategies for maximizing returns in DeFi protocols.',
      date: '2023-06-10',
      time: '2:00 PM',
      maxAttendees: 100,
      price: 75,
      image: '/placeholder.svg',
      tokenGated: false,
      status: 'live'
    },
    {
      title: 'Metaverse Land Development',
      description: 'Masterclass on building and monetizing virtual real estate.',
      date: '2023-09-05',
      time: '1:00 PM',
      maxAttendees: 120,
      price: 100,
      image: '/placeholder.svg',
      tokenGated: true,
      status: 'upcoming'
    }
  ];
  
  for (const event of events) {
    const creatorIndex = Math.floor(Math.random() * creatorUsers.length);
    const creator = await prisma.user.findFirst({
      where: { 
        walletAddress: creatorUsers[creatorIndex].walletAddress,
        isCreator: true
      }
    });
    
    if (creator) {
      const ticketEvent = await prisma.ticketEvent.create({
        data: {
          ...event,
          creator: creator.username || 'Creator',
          creatorHandle: creator.handle || 'creator'
        }
      });
      
      // Add random ticket purchases
      const numAttendees = Math.floor(Math.random() * 50);
      
      for (let i = 0; i < numAttendees && i < event.maxAttendees; i++) {
        const userId = userIds[Math.floor(Math.random() * userIds.length)];
        
        try {
          await prisma.ticket.create({
            data: {
              eventId: ticketEvent.id,
              ownerId: userId
            }
          });
        } catch (error) {
          // Ignore duplicate tickets
          console.log('Skip duplicate ticket');
        }
      }
      
      // Update attendee count
      await prisma.ticketEvent.update({
        where: { id: ticketEvent.id },
        data: { attendees: numAttendees }
      });
    }
  }
  
  console.log('Ticket events and tickets seeded');
  
  // Create NFTs
  const nftNames = [
    'Cosmic Explorer #42',
    'Digital Dreams #007',
    'Cyber Punk City #123',
    'Ethereal Landscape #56',
    'Quantum Reality #333',
    'Virtual Identity #888',
    'Digital Persona #444',
    'Metaverse Citizen #789',
    'Neural Network #101',
    'Abstract Thought #555'
  ];
  
  for (const userId of userIds) {
    const numNfts = Math.floor(Math.random() * 3); // 0-2 NFTs per user
    
    for (let i = 0; i < numNfts; i++) {
      const name = nftNames[Math.floor(Math.random() * nftNames.length)];
      
      await prisma.nFT.create({
        data: {
          name,
          image: '/placeholder.svg',
          ownerId: userId
        }
      });
    }
  }
  
  console.log('NFTs seeded');
  
  // Create stakings for users
  const stakingPools = await prisma.stakingPool.findMany();
  
  for (const userId of userIds) {
    const numStakes = Math.floor(Math.random() * 3); // 0-2 stakes per user
    
    for (let i = 0; i < numStakes; i++) {
      const poolIndex = Math.floor(Math.random() * stakingPools.length);
      const pool = stakingPools[poolIndex];
      
      if (pool) {
        const amount = Math.floor(Math.random() * 1000) + pool.minStake;
        const rewards = Math.floor(Math.random() * 100);
        
        try {
          await prisma.staking.create({
            data: {
              amount,
              rewards,
              poolId: pool.id,
              userId
            }
          });
          
          // Update pool total staked
          await prisma.stakingPool.update({
            where: { id: pool.id },
            data: {
              totalStaked: { increment: amount }
            }
          });
        } catch (error) {
          // Ignore duplicate stakes
          console.log('Skip duplicate stake');
        }
      }
    }
  }
  
  console.log('Stakings seeded');
  
  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
