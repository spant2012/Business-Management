import { queryClient, apiRequest } from "./queryClient";
import { Department, InsertDepartment } from "@shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";

const DEPARTMENTS_KEY = "/api/departments";

export function useDepartments() {
  return useQuery<Department[]>({
    queryKey: [DEPARTMENTS_KEY],
  });
}

export function useDepartment(id: number) {
  return useQuery<Department>({
    queryKey: [`${DEPARTMENTS_KEY}/${id}`],
  });
}

export function useCreateDepartment() {
  return useMutation({
    mutationFn: async (department: InsertDepartment) => {
      const res = await apiRequest("POST", DEPARTMENTS_KEY, department);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPARTMENTS_KEY] });
    },
  });
}

export function useUpdateDepartment() {
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<InsertDepartment> & { id: number }) => {
      const res = await apiRequest("PATCH", `${DEPARTMENTS_KEY}/${id}`, updates);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPARTMENTS_KEY] });
    },
  });
}

export function useDeleteDepartment() {
  return useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `${DEPARTMENTS_KEY}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEPARTMENTS_KEY] });
    },
  });
}
