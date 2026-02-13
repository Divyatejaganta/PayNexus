import { useState } from 'react'
import Link from 'next/link'

export default function CustomerHome() {
  const [balance] = useState(5000)
  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="glass p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Wallet Balance</h2>
        <div className="mt-2 text-3xl font-bold">₹{balance.toFixed(2)}</div>
        <div className="mt-4 flex gap-2">
          <Link href="/app/scanner" className="px-3 py-2 bg-neon rounded text-black">Scan QR</Link>
          <Link href="/app/wallet" className="px-3 py-2 bg-white/5 rounded">Wallet</Link>
        </div>
      </div>
      <div className="mt-6 glass p-4 rounded-lg">
        <h3 className="font-semibold">Recent Transactions</h3>
        <ul className="mt-2 text-sm text-gray-300">
          <li>Paid ₹249 to Demo Merchant — SUCCESS</li>
          <li>Added ₹2,000 — SUCCESS</li>
        </ul>
      </div>
    </div>
  )
}
