import { queryClient, apiRequest } from "./queryClient";
import { Payroll, InsertPayroll } from "@shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";

const PAYROLL_KEY = "/api/payroll";

export function usePayroll() {
  return useQuery<Payroll[]>({
    queryKey: [PAYROLL_KEY],
  });
}

export function useUserPayroll(userId: number) {
  return useQuery<Payroll[]>({
    queryKey: [`${PAYROLL_KEY}/user/${userId}`],
  });
}

export function useCreatePayroll() {
  return useMutation({
    mutationFn: async (payroll: InsertPayroll) => {
      const res = await apiRequest("POST", PAYROLL_KEY, payroll);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYROLL_KEY] });
    },
  });
}

export function useUpdatePayroll() {
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<InsertPayroll> & { id: number }) => {
      const res = await apiRequest("PATCH", `${PAYROLL_KEY}/${id}`, updates);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYROLL_KEY] });
    },
  });
}
