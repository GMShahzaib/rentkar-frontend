import * as SecureStore from "expo-secure-store";

export const SecureStorageService = {
  // Save any key-value pair
  saveItem: (key: string, value: string): void => {
    try {
      SecureStore.setItem(key, value);
    } catch (e) {
      console.error(`Error saving ${key}`, e);
    }
  },

  // Get item by key
  getItem: (key: string): string | null => {
    try {
      return SecureStore.getItem(key);
    } catch (e) {
      console.error(`Error getting ${key}`, e);
      return null;
    }
  },

  // Delete item
  deleteItem: async (key: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.error(`Error deleting ${key}`, e);
    }
  },
};
