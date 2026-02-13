import { motion } from 'framer-motion'

export default function Success() {
  return (
    <div className="p-6 max-w-md mx-auto text-center">
      <motion.div initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }} className="glass p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-neon">Payment Successful</h2>
        <p className="mt-2 text-gray-300">Receipt • Transaction ID: demo_tx_123</p>
      </motion.div>
    </div>
  )
}
