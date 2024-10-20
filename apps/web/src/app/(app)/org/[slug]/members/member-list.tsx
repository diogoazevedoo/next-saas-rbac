import { organizationSchema } from '@saas/auth'
import { ArrowLeftRight, Crown, UserMinus } from 'lucide-react'
import Image from 'next/image'

import { ability, getCurrentOrg } from '@/auth/auth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'

import { removeMemberAction } from './actions'
import { UpdateMemberRoleSelect } from './update-member-role-select'

export async function MemberList() {
  const currentOrg = await getCurrentOrg()
  const permissions = await ability()

  const [{ membership }, { members }, { organization }] = await Promise.all([
    getMembership(currentOrg!),
    getMembers(currentOrg!),
    getOrganization(currentOrg!),
  ])

  const authOrganization = organizationSchema.parse(organization)

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => {
              return (
                <TableRow key={member.id}>
                  <TableCell className="py-2.5" style={{ width: 48 }}>
                    <Avatar>
                      {member.avatarUrl && (
                        <Image
                          src={member.avatarUrl}
                          width={32}
                          height={32}
                          alt=""
                          className="aspect-square size-full"
                        />
                      )}
                      <AvatarFallback />
                    </Avatar>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex flex-col">
                      <span className="inline-flex items-center gap-1 font-medium">
                        {member.name}
                        {member.userId === membership.userId && (
                          <span className="text-muted-foreground">(Me)</span>
                        )}
                        {member.userId === organization.ownerId && (
                          <span className="inline-flex items-center gap-1 px-1 text-xs text-muted-foreground">
                            <Crown className="size-3" />
                            Owner
                          </span>
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {member.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex items-center justify-end gap-2">
                      {permissions?.can(
                        'transfer_ownership',
                        authOrganization,
                      ) &&
                        (member.userId !== membership.userId ||
                          member.userId !== organization.ownerId) && (
                          <Button size="sm" variant="ghost">
                            <ArrowLeftRight className="mr-2 size-4" />
                            Transfer ownership
                          </Button>
                        )}

                      <UpdateMemberRoleSelect
                        disabled={
                          member.userId === membership.userId ||
                          member.userId === organization.ownerId ||
                          permissions?.can('update', 'User')
                        }
                        memberId={member.id}
                        value={member.role}
                      />

                      {permissions?.can('delete', 'User') &&
                        (member.userId !== membership.userId ||
                          member.userId !== organization.ownerId) && (
                          <form
                            action={removeMemberAction.bind(null, member.id)}
                          >
                            <Button
                              disabled={
                                member.userId === membership.userId ||
                                member.userId === organization.ownerId
                              }
                              type="submit"
                              size="sm"
                              variant="destructive"
                            >
                              <UserMinus className="mr-2 size-4" />
                              Remove
                            </Button>
                          </form>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
