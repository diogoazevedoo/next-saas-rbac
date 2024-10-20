import { api } from './api-client'

interface GetInvitesResponse {
  invites: {
    id: string
    role: 'ADMIN' | 'MEMBER' | 'BILLING'
    email: string
    createdAt: string
    author: {
      id: string
      name: string | null
    } | null
  }[]
}

export async function getInvites(org: string) {
  const result = await api
    .get(`organizations/${org}/invites`, {
      next: {
        tags: [`${org}/invites`],
      },
    })
    .json<GetInvitesResponse>()

  return result
}
