import { api } from './api-client'

interface GetInviteResponse {
  invite: {
    id: string
    role: 'ADMIN' | 'MEMBER' | 'BILLING'
    email: string
    createdAt: string
    organization: {
      name: string
    }
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }
}

export async function getInvite(inviteId: string) {
  const result = await api.get(`invites/${inviteId}`).json<GetInviteResponse>()

  return result
}
