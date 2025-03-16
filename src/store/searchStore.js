import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchQuery: "",
  searchResults: [],
  isSearching: false,
  sortType: "최신순",

  setSearchQuery: (query) => set({ searchQuery: query, isSearching: !!query }),
  setSearchResults: (results) => set({ searchResults: results }),
  setSortType: (sort) => set({ sortType: sort }),
  resetSearch: () => set({ searchQuery: "", searchResults: [], isSearching: false, sortType: "최신순" }),
}));

export default useSearchStore;
