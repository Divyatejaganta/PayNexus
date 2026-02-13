import { PropsWithChildren } from 'react'

export default function Button({ children, ...props }: PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button {...props} className={`${props.className ?? ''} px-3 py-2 rounded`}>{children}</button>
  )
}
