import { defineStore } from 'pinia';

// Servicios
import { getCitiesMatchWithSearchWord } from '@/services/search/searchService';

const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    searchResults: [],
    searchQuery: '',
    filter: {
      price: {
        min: 0,
        max: 0,
      },
      beds: 0,
      bedrooms: 0,
      bathrooms: 0,
      guests: 0,
    }
  }),

  actions: {
    /**
     * Obtiene las ciudades que contienen el término de búsqueda.
     *
     * @param searchWord
     */
    async setSearchResults(wordToSearch: string): Promise<void> {
      const results: any = await getCitiesMatchWithSearchWord(wordToSearch);
      this.searchResults = results;
    },

    getSearchResults(): string[] {
      return this.searchResults;
    },

    setSearchWord(searchWord: string): void {
      this.searchQuery = searchWord;
    },
  },
});

export { useSearchStore };
