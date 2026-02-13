import Link from 'next/link'

export default function Page() {
  return (
    <main className="p-8">
      <h1 className="text-4xl font-semibold">PayNexus (Demo)</h1>
      <p className="mt-4 text-gray-300">Choose a portal to continue.</p>
      <div className="mt-6 flex gap-4">
        <Link href="/app" className="px-4 py-2 bg-neon text-black rounded">Customer App</Link>
        <Link href="/merchant" className="px-4 py-2 bg-neon-purple text-white rounded">Merchant Portal</Link>
        <Link href="/admin" className="px-4 py-2 bg-neon-pink text-white rounded">Admin Dashboard</Link>
      </div>
    </main>
  )
}
