import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertItemSchema, insertTaskSchema } from "@shared/schema";
import { insertAttendanceSchema } from "@shared/schema";
import { insertPayrollSchema } from "@shared/schema"; // Added import
import { insertDepartmentSchema } from "@shared/schema"; //Added import for department schema


export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Items CRUD
  app.get("/api/items", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const items = await storage.getItems();
    res.json(items);
  });

  app.get("/api/items/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const item = await storage.getItem(Number(req.params.id));
    if (!item) return res.sendStatus(404);
    res.json(item);
  });

  app.post("/api/items", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const parseResult = insertItemSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json(parseResult.error);
    }

    const item = await storage.createItem(parseResult.data);
    res.status(201).json(item);
  });

  app.patch("/api/items/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const parseResult = insertItemSchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json(parseResult.error);
    }

    const item = await storage.updateItem(Number(req.params.id), parseResult.data);
    if (!item) return res.sendStatus(404);
    res.json(item);
  });

  app.delete("/api/items/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const success = await storage.deleteItem(Number(req.params.id));
    if (!success) return res.sendStatus(404);
    res.sendStatus(204);
  });

  // Tasks CRUD
  app.get("/api/tasks", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const tasks = await storage.getTasks();
    res.json(tasks);
  });

  app.get("/api/tasks/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const task = await storage.getTask(Number(req.params.id));
    if (!task) return res.sendStatus(404);
    res.json(task);
  });

  app.post("/api/tasks", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const parseResult = insertTaskSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json(parseResult.error);
    }

    const task = await storage.createTask(parseResult.data);
    res.status(201).json(task);
  });

  app.patch("/api/tasks/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const parseResult = insertTaskSchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json(parseResult.error);
    }

    const task = await storage.updateTask(Number(req.params.id), parseResult.data);
    if (!task) return res.sendStatus(404);
    res.json(task);
  });

  app.delete("/api/tasks/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const success = await storage.deleteTask(Number(req.params.id));
    if (!success) return res.sendStatus(404);
    res.sendStatus(204);
  });

  // Attendance routes
  app.get("/api/attendance", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const attendance = await storage.getAttendance();
    res.json(attendance);
  });

  app.get("/api/attendance/user/:userId", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const attendance = await storage.getUserAttendance(Number(req.params.userId));
    res.json(attendance);
  });

  app.post("/api/attendance", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const parseResult = insertAttendanceSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json(parseResult.error);
    }

    const attendance = await storage.createAttendance(parseResult.data);
    res.status(201).json(attendance);
  });

  app.patch("/api/attendance/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const parseResult = insertAttendanceSchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json(parseResult.error);
    }

    const attendance = await storage.updateAttendance(Number(req.params.id), parseResult.data);
    if (!attendance) return res.sendStatus(404);
    res.json(attendance);
  });

  // Payroll routes
  app.get("/api/payroll", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const payrollRecords = await storage.getPayroll();
    res.json(payrollRecords);
  });

  app.get("/api/payroll/user/:userId", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const payrollRecords = await storage.getUserPayroll(Number(req.params.userId));
    res.json(payrollRecords);
  });

  app.post("/api/payroll", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const parseResult = insertPayrollSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json(parseResult.error);
    }

    const payroll = await storage.createPayroll(parseResult.data);
    res.status(201).json(payroll);
  });

  app.patch("/api/payroll/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const parseResult = insertPayrollSchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json(parseResult.error);
    }

    const payroll = await storage.updatePayroll(Number(req.params.id), parseResult.data);
    if (!payroll) return res.sendStatus(404);
    res.json(payroll);
  });

  // Department routes
  app.get("/api/departments", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const departments = await storage.getDepartments();
    res.json(departments);
  });

  app.get("/api/departments/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const department = await storage.getDepartment(Number(req.params.id));
    if (!department) return res.sendStatus(404);
    res.json(department);
  });

  app.post("/api/departments", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const parseResult = insertDepartmentSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json(parseResult.error);
    }

    const department = await storage.createDepartment(parseResult.data);
    res.status(201).json(department);
  });

  app.patch("/api/departments/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const parseResult = insertDepartmentSchema.partial().safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json(parseResult.error);
    }

    const department = await storage.updateDepartment(Number(req.params.id), parseResult.data);
    if (!department) return res.sendStatus(404);
    res.json(department);
  });

  app.delete("/api/departments/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const success = await storage.deleteDepartment(Number(req.params.id));
    if (!success) return res.sendStatus(404);
    res.sendStatus(204);
  });

  const httpServer = createServer(app);
  return httpServer;
}