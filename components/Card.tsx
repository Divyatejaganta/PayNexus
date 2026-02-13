import { PropsWithChildren } from 'react'

export default function Card({ children }: PropsWithChildren) {
  return <div className="glass p-4 rounded-lg">{children}</div>
}
