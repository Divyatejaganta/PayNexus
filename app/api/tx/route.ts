import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { merchantId, amount } = body

    // simple demo: find first user and merchant
    const user = await prisma.user.findFirst()
    const merchant = await prisma.merchant.findFirst({ where: { id: merchantId } }) || await prisma.merchant.findFirst()

    if (!user || !merchant) return NextResponse.json({ error: 'Missing user or merchant' }, { status: 400 })

    const userWallet = await prisma.wallet.findFirst({ where: { ownerId: user.id } })
    const merchantWallet = await prisma.wallet.findFirst({ where: { ownerId: merchant.id } })

    if (!userWallet || userWallet.balance < amount) {
      return NextResponse.json({ error: 'Insufficient balance' }, { status: 402 })
    }

    // create pending transaction
    const tx = await prisma.transaction.create({
      data: {
        fromUserId: user.id,
        toMerchantId: merchant.id,
        amount: amount,
        status: 'SUCCESS'
      }
    })

    // update wallets
    await prisma.wallet.update({ where: { id: userWallet.id }, data: { balance: userWallet.balance - amount } })
    if (merchantWallet) {
      await prisma.wallet.update({ where: { id: merchantWallet.id }, data: { balance: merchantWallet.balance + amount } })
    } else {
      await prisma.wallet.create({ data: { ownerId: merchant.id, ownerType: 'Merchant', balance: amount } })
    }

    return NextResponse.json({ ok: true, tx })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
