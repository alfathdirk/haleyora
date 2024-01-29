'use client'

import { AuthContext } from '@/provider/Auth'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export default function HeaderLogout({ children }: { children: React.ReactNode }) {
  const { logout} = useContext(AuthContext);

  return (
    <div onClick={() => logout()} onKeyDown={logout} role="button" tabIndex={0}>
      {children}
    </div>
  )
}
