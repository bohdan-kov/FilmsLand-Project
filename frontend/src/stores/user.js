import { defineStore } from 'pinia'
import { getProfile } from "@/services/authService";

import { bufferToBase64Image } from '@/utils/imageUtils'
import { logout } from '@/utils/authLogout'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: null,
    avatarUrl: null,
    isLoading: false,
  }),

  actions: {
    async fetchUser() {
      this.isLoading = true
      try {
        const token = localStorage.getItem("token")
        if (!token) return
        

        const user = await getProfile(token)
        this.name = user.name
        this.avatarUrl = bufferToBase64Image(user.photo)
      } catch (error) {
        logout()
        console.error("Помилка при отриманні профілю:", error)
      } finally {
        this.isLoading = false
      }
    },
    resetUser(){
      this.name = null,
      this.avatarUrl = null,
      this.isLoading = false
    }
  }
})
