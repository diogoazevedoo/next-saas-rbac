import { api } from './api-client'

interface UpdateMemberRequest {
  org: string
  memberId: string
  role: 'ADMIN' | 'MEMBER' | 'BILLING'
}

export async function updateMember({
  org,
  memberId,
  role,
}: UpdateMemberRequest) {
  await api.put(`organizations/${org}/members/${memberId}`, {
    json: { role },
  })
}
