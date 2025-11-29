'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Dropdown } from '@/components/ui/Dropdown'
import { Modal } from '@/components/ui/Modal'
import { SearchIcon } from '@/components/ui/Icons'
import { useAuth } from '@/hooks/useAuth'

interface User {
  id: string
  email: string
  username: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
  bio?: string
  role: 'USER' | 'MODERATOR' | 'ADMIN'
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

interface UsersResponse {
  users?: User[]
  total?: number
  page?: number
  limit?: number
  totalPages?: number
  error?: string
  details?: string
}

export default function UserManagementPage() {
  const router = useRouter()
  const { user: currentUser, loading: authLoading } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  // Modals state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [roleModalOpen, setRoleModalOpen] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // Form states
  const [newRole, setNewRole] = useState<string>('')
  const [newPassword, setNewPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  // Check if user is ADMIN, redirect if not
  useEffect(() => {
    if (!authLoading) {
      if (!currentUser) {
        router.replace('/')
        return
      }
      const userRole = currentUser.role?.toUpperCase()
      if (userRole !== 'ADMIN') {
        router.replace('/')
      }
    }
  }, [currentUser, authLoading, router])

  // Fetch users function
  const fetchUsers = React.useCallback(async () => {
    if (!currentUser || currentUser.role?.toUpperCase() !== 'ADMIN') return

    setIsLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      params.append('page', page.toString())
      params.append('limit', '50')
      if (searchQuery) {
        params.append('search', searchQuery)
      }
      if (roleFilter) {
        params.append('role', roleFilter)
      }

          const response = await fetch(`/api/admin/users?${params.toString()}`)
          const data: UsersResponse = await response.json()

          if (!response.ok) {
            throw new Error(data.error || data.details || 'Failed to fetch users')
          }

          if (data.users && data.totalPages !== undefined && data.total !== undefined) {
            setUsers(data.users)
            setTotalPages(data.totalPages)
            setTotal(data.total)
          } else {
            throw new Error('Invalid response format')
          }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch users'
      setError(errorMessage)
      console.error('Error fetching users:', err)
    } finally {
      setIsLoading(false)
    }
  }, [page, searchQuery, roleFilter, currentUser])

  useEffect(() => {
    if (!authLoading && currentUser?.role?.toUpperCase() === 'ADMIN') {
      fetchUsers()
    }
  }, [authLoading, currentUser, fetchUsers])

  // Don't render if still loading or user is not admin
  if (authLoading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center transition-colors">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    )
  }

  if (!currentUser || currentUser.role?.toUpperCase() !== 'ADMIN') {
    return null
  }

  const handleDelete = async () => {
    if (!selectedUser) return

    setIsProcessing(true)
    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete user')
      }

      setDeleteModalOpen(false)
      setSelectedUser(null)
      fetchUsers()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user'
      setError(errorMessage)
      console.error('Error deleting user:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRoleChange = async () => {
    if (!selectedUser || !newRole) return

    setIsProcessing(true)
    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update role')
      }

      setRoleModalOpen(false)
      setSelectedUser(null)
      setNewRole('')
      fetchUsers()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update role'
      setError(errorMessage)
      console.error('Error updating role:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePasswordChange = async () => {
    if (!selectedUser || !newPassword) return

    // Validate password
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return
    }

    setPasswordError('')
    setIsProcessing(true)
    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update password')
      }

      setPasswordModalOpen(false)
      setSelectedUser(null)
      setNewPassword('')
      setPasswordError('')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update password'
      setPasswordError(errorMessage)
      console.error('Error updating password:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  const openDeleteModal = (user: User) => {
    setSelectedUser(user)
    setDeleteModalOpen(true)
  }

  const openRoleModal = (user: User) => {
    setSelectedUser(user)
    setNewRole(user.role)
    setRoleModalOpen(true)
  }

  const openPasswordModal = (user: User) => {
    setSelectedUser(user)
    setNewPassword('')
    setPasswordError('')
    setPasswordModalOpen(true)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300'
      case 'MODERATOR':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300'
      case 'USER':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
    }
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-[46px] font-semibold text-[#030303] dark:text-gray-100">
            User Management Panel
          </h1>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search by username, email, or name..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setPage(1)
              }}
              className="w-full pl-12 pr-4 py-2 sm:py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            />
          </div>
          <div className="w-full sm:w-48">
            <Dropdown
              options={[
                { value: '', label: 'All Roles' },
                { value: 'USER', label: 'User' },
                { value: 'MODERATOR', label: 'Moderator' },
                { value: 'ADMIN', label: 'Admin' },
              ]}
              value={roleFilter}
              onChange={(value) => {
                setRoleFilter(value)
                setPage(1)
              }}
              placeholder="Filter by role"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">Loading users...</p>
          </div>
        )}

        {/* Users Table */}
        {!isLoading && (
          <>
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {users.length} of {total} users
            </div>
            <Card className="p-4 sm:p-6 rounded-lg sm:rounded-[32px] overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">User</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Joined</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border border-blue-500 dark:border-blue-400 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-700">
                              {user.avatarUrl ? (
                                <img
                                  src={user.avatarUrl}
                                  alt={user.username}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                  {user.username.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-gray-100">@{user.username}</div>
                              {(user.firstName || user.lastName) && (
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {user.firstName} {user.lastName}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-700 dark:text-gray-300">{user.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{formatDate(user.createdAt)}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openRoleModal(user)}
                              disabled={currentUser.id === user.id}
                              title={currentUser.id === user.id ? 'Cannot change your own role' : 'Change role'}
                            >
                              Role
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openPasswordModal(user)}
                            >
                              Password
                            </Button>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => openDeleteModal(user)}
                              disabled={currentUser.id === user.id}
                              title={currentUser.id === user.id ? 'Cannot delete your own account' : 'Delete user'}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setSelectedUser(null)
        }}
        title="Delete User"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete user <strong className="dark:text-gray-100">@{selectedUser?.username}</strong>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setDeleteModalOpen(false)
                setSelectedUser(null)
              }}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={isProcessing}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Change Role Modal */}
      <Modal
        isOpen={roleModalOpen}
        onClose={() => {
          setRoleModalOpen(false)
          setSelectedUser(null)
          setNewRole('')
        }}
        title="Change User Role"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Change role for user <strong className="dark:text-gray-100">@{selectedUser?.username}</strong>
          </p>
          <Dropdown
            options={[
              { value: 'USER', label: 'User' },
              { value: 'MODERATOR', label: 'Moderator' },
              { value: 'ADMIN', label: 'Admin' },
            ]}
            value={newRole}
            onChange={setNewRole}
            placeholder="Select role"
          />
          <div className="flex justify-end gap-3 pt-10 pb-3">
            <Button
              variant="outline"
              onClick={() => {
                setRoleModalOpen(false)
                setSelectedUser(null)
                setNewRole('')
              }}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleRoleChange} isLoading={isProcessing}>
              Update Role
            </Button>
          </div>
        </div>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={passwordModalOpen}
        onClose={() => {
          setPasswordModalOpen(false)
          setSelectedUser(null)
          setNewPassword('')
          setPasswordError('')
        }}
        title="Change User Password"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Set a new password for user <strong className="dark:text-gray-100">@{selectedUser?.username}</strong>
          </p>
          <Input
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value)
              setPasswordError('')
            }}
            placeholder="Enter new password (min 8 characters)"
            error={passwordError}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setPasswordModalOpen(false)
                setSelectedUser(null)
                setNewPassword('')
                setPasswordError('')
              }}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handlePasswordChange} isLoading={isProcessing}>
              Update Password
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

