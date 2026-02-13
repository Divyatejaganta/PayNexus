export default function AdminPage(){
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Admin Overview</h1>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="glass p-4 rounded">Total Volume: ₹12,345</div>
        <div className="glass p-4 rounded">Active Merchants: 12</div>
        <div className="glass p-4 rounded">Fraud Alerts: 2</div>
      </div>
    </div>
  )
}
