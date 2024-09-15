import { Slash } from 'lucide-react'
import Image from 'next/image'

import logoIcon from '@/assets/logo-icon.svg'

import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'

export function Header() {
  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={logoIcon} className="size-6 dark:invert" alt="logo" />

        <Slash className="text-border size-3 -rotate-[24deg]" />

        <OrganizationSwitcher />
      </div>

      <div className="flex items-center gap-4">
        <ProfileButton />
      </div>
    </div>
  )
}
