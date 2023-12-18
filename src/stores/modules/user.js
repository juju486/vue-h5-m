import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: ''
  }),
  getters: {
    getToken() {
      return this.token;
    }
  },
  actions: {
    setToken(token) {
      this.token = token;
    }
  }
});
