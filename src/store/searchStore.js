import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchQuery: "",
  searchResults: [],
  isSearching: false,
  
  setSearchQuery: (query) => set({ searchQuery: query, isSearching: !!query }),
  setSearchResults: (results) => set({ searchResults: results }),
  resetSearch: () => set({ searchQuery: "", searchResults: [], isSearching: false }),
}));

export default useSearchStore;
