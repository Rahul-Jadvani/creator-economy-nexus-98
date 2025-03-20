
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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
    }
  ];
  
  for (const raffle of raffles) {
    await prisma.raffle.upsert({
      where: { id: raffle.id },
      update: {},
      create: raffle
    });
  }
  
  console.log('Raffles seeded');
  
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
