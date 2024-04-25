import { defineAbilityFor, userSchema } from '@saas/auth'

export function getUserPermissions(userId: string, role: string) {
  const authUser = userSchema.parse({
    id: userId,
    role,
  })

  const ability = defineAbilityFor(authUser)

  return ability
}
