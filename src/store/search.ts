import { defineStore } from 'pinia';

// Servicios
import { getCitiesMatchWithSearchWord } from '@/services/search/searchService';

const useSearchStore = defineStore({
    id: 'search',
    state: () => ({
        searchResults: [],
        searchQuery: '',
    }),

    actions: {
        async setSearchResults(searchWord: String[]) {
            const results = await getCitiesMatchWithSearchWord(searchWord);
            this.searchResults = this.searchQuery && results ? results : [];
        },

        getSearchResults() {
            return this.searchResults;
        },

        setSearchWord(searchWord: String) {
            this.searchQuery = searchWord;
        },
    }
});

export { useSearchStore };