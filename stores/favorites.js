export const useFavoriteStore = defineStore("favorites", {
  state: () => ({
    favorites: [],
  }),
  actions: {
    addFavorite(game) {
      this.favorites.push(game);
    },
    removeFavorite(gameId) {
      console.log("removeFavorite", gameId);
      this.favorites = this.favorites.filter((g) => {
        return g.id !== gameId;
      });
    },
    checkFavorite(gameId) {
      return this.favorites.find((g) => g.id === gameId);
    },
  },
  persist: true,
});
