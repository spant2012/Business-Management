import { queryClient, apiRequest } from "./queryClient";
import { Item, InsertItem } from "@shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";

const ITEMS_KEY = "/api/items";

export function useItems() {
  return useQuery<Item[]>({ 
    queryKey: [ITEMS_KEY],
  });
}

export function useItem(id: number) {
  return useQuery<Item>({
    queryKey: [`${ITEMS_KEY}/${id}`],
  });
}

export function useCreateItem() {
  return useMutation({
    mutationFn: async (item: InsertItem) => {
      const res = await apiRequest("POST", ITEMS_KEY, item);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ITEMS_KEY] });
    },
  });
}

export function useUpdateItem() {
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<InsertItem> & { id: number }) => {
      const res = await apiRequest("PATCH", `${ITEMS_KEY}/${id}`, updates);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ITEMS_KEY] });
    },
  });
}

export function useDeleteItem() {
  return useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `${ITEMS_KEY}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ITEMS_KEY] });
    },
  });
}
