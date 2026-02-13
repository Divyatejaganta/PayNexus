import QRCode from 'qrcode.react'
import { useState } from 'react'

export default function MerchantPage(){
  const [merchantId] = useState('demo-merchant-1')
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold">Merchant Dashboard</h1>
      <div className="mt-6 grid grid-cols-2 gap-6">
        <div className="glass p-4 rounded">
          <h3 className="font-semibold">QR Code</h3>
          <div className="mt-4 flex justify-center">
            <QRCode value={merchantId} size={160} bgColor="#0c0c1d" fgColor="#00e6b8" />
          </div>
        </div>
        <div className="glass p-4 rounded">
          <h3 className="font-semibold">Transactions</h3>
          <ul className="mt-2 text-sm text-gray-300">
            <li>₹249 — SUCCESS</li>
            <li>₹399 — PENDING</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
