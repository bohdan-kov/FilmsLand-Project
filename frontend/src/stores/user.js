import { defineStore } from 'pinia'
import { getProfile } from "@/services/authService";

import { bufferToBase64Image } from '@/utils/imageUtils'
import { logout } from '@/utils/authLogout'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: null,
    photo: null,
    isLoading: false,
    favoriteMovies: [],
  }),

  actions: {
    async fetchUser() {
      this.isLoading = true
      try {
        const token = localStorage.getItem("token")
        if (!token) return
        
        const user = await getProfile(token)
        this.name = user.name
        if (user?.photo?.data && user?.photo?.contentType) {
          this.photo = bufferToBase64Image(user.photo.data, user.photo.contentType)
        }
        this.favoriteMovies = user.favoriteMovies

      } catch (error) {
        logout()
        console.error("Помилка при отриманні профілю:", error)
      } finally {
        this.isLoading = false
      }
    },
    resetUser(){
      this.name = null,
      this.photo = null,
      this.favoriteMovies = false,
      this.isLoading = false
    },
    addFavorite(movie) {
      const exists = this.favoriteMovies.some(fav => +fav.movieId === +movie.movieId);
      if (!exists) {
        this.favoriteMovies.push(movie);
      }
    },
    removeFavorite(movieId) {
      this.favoriteMovies = this.favoriteMovies.filter(fav => +fav.movieId !== +movieId);
    },
  }
})
