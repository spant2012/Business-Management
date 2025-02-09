import { queryClient, apiRequest } from "./queryClient";
import { Task, InsertTask } from "@shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";

const TASKS_KEY = "/api/tasks";

export function useTasks() {
  return useQuery<Task[]>({ 
    queryKey: [TASKS_KEY],
  });
}

export function useTask(id: number) {
  return useQuery<Task>({
    queryKey: [`${TASKS_KEY}/${id}`],
  });
}

export function useCreateTask() {
  return useMutation({
    mutationFn: async (task: InsertTask) => {
      const res = await apiRequest("POST", TASKS_KEY, task);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
    },
  });
}

export function useUpdateTask() {
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<InsertTask> & { id: number }) => {
      const res = await apiRequest("PATCH", `${TASKS_KEY}/${id}`, updates);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
    },
  });
}

export function useDeleteTask() {
  return useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `${TASKS_KEY}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TASKS_KEY] });
    },
  });
}
