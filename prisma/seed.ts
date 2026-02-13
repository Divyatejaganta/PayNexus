import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.wallet.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.user.deleteMany()
  await prisma.merchant.deleteMany()

  const user = await prisma.user.create({
    data: {
      name: 'Demo User',
      email: 'user@paynexus.test',
      role: 'customer'
    }
  })

  const merchant = await prisma.merchant.create({
    data: {
      name: 'Demo Merchant',
      email: 'merchant@paynexus.test'
    }
  })

  await prisma.wallet.createMany({
    data: [
      { ownerId: user.id, ownerType: 'User', balance: 5000 },
      { ownerId: merchant.id, ownerType: 'Merchant', balance: 1000 }
    ]
  })

  for (let i = 0; i < 8; i++) {
    await prisma.transaction.create({
      data: {
        fromUserId: user.id,
        toMerchantId: merchant.id,
        amount: Math.round(Math.random() * 200 + 20),
        status: Math.random() > 0.1 ? 'SUCCESS' : 'FAILED',
        flagged: Math.random() > 0.95
      }
    })
  }

  console.log('Seeded DB: user and merchant created')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
