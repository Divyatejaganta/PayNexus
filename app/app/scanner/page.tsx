import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function ScannerPage() {
  const [merchantId, setMerchantId] = useState('')
  const [amount, setAmount] = useState(100)
  const router = useRouter()

  async function pay() {
    const res = await fetch('/api/tx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ merchantId, amount })
    })
    if (res.ok) router.push('/app/success')
    else alert('Payment failed')
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <div className="glass p-6 rounded-lg text-center">
        <div className="h-48 bg-white/3 rounded mb-4 flex items-center justify-center">Camera View (sim)</div>
        <input value={merchantId} onChange={(e)=>setMerchantId(e.target.value)} placeholder="Merchant ID or scan" className="w-full p-2 rounded bg-white/5 mb-2" />
        <input type="number" value={amount} onChange={(e)=>setAmount(Number(e.target.value))} className="w-full p-2 rounded bg-white/5 mb-4" />
        <button onClick={pay} className="px-4 py-2 bg-neon rounded text-black">Pay ₹{amount}</button>
      </div>
    </div>
  )
}
