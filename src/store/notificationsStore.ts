'use client'

import { create } from 'zustand'
import { Notification } from '@/lib/types'

interface NotificationsState {
  notifications: Notification[]
  unreadCount: number
  isLoading: boolean
  error: string | null

  // Actions
  addNotification: (notification: Notification) => void
  markAsRead: (notificationId: string) => void
  markAllAsRead: () => Promise<void>
  setNotifications: (notifications: Notification[]) => void
  fetchNotifications: () => Promise<void>
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + (notification.read ? 0 : 1),
    })),

  markAsRead: async (notificationId: string) => {
    // Optimistic update
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.read).length,
      }
    })

    // Update on server
    try {
      await fetch(`/api/notifications/${notificationId}/read`, {
        method: 'PATCH',
      })
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  },

  markAllAsRead: async () => {
    // Optimistic update
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }))

    // Update on server
    try {
      await fetch('/api/notifications/read-all', {
        method: 'PATCH',
      })
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error)
    }
  },

  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    }),

  fetchNotifications: async () => {
    try {
      set({ isLoading: true, error: null })

      const response = await fetch('/api/notifications')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch notifications')
      }

      set({
        notifications: data.notifications,
        unreadCount: data.notifications.filter((n: Notification) => !n.read).length,
        isLoading: false,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch notifications'
      set({ error: errorMessage, isLoading: false })
    }
  },

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}))

