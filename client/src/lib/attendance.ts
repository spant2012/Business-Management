import { queryClient, apiRequest } from "./queryClient";
import { Attendance, InsertAttendance } from "@shared/schema";
import { useMutation, useQuery } from "@tanstack/react-query";

const ATTENDANCE_KEY = "/api/attendance";

export function useAttendance() {
  return useQuery<Attendance[]>({
    queryKey: [ATTENDANCE_KEY],
  });
}

export function useUserAttendance(userId: number) {
  return useQuery<Attendance[]>({
    queryKey: [`${ATTENDANCE_KEY}/user/${userId}`],
  });
}

export function useCreateAttendance() {
  return useMutation({
    mutationFn: async (attendance: InsertAttendance) => {
      const res = await apiRequest("POST", ATTENDANCE_KEY, attendance);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ATTENDANCE_KEY] });
    },
  });
}

export function useUpdateAttendance() {
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<InsertAttendance> & { id: number }) => {
      const res = await apiRequest("PATCH", `${ATTENDANCE_KEY}/${id}`, updates);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ATTENDANCE_KEY] });
    },
  });
}
