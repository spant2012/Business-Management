import { pgTable, text, serial, integer, decimal, timestamp, boolean, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users and Auth
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  role: text("role", { enum: ["super_admin", "admin", "employee"] }).notNull().default("employee"),
  departmentId: integer("department_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
});

// Inventory
export const items = pgTable("items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  sku: text("sku").notNull().unique(),
  description: text("description"),
  quantity: integer("quantity").notNull().default(0),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  reorderPoint: integer("reorder_point"),
  category: text("category"),
});

// Tasks
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status", { enum: ["pending", "in_progress", "completed"] }).notNull().default("pending"),
  priority: text("priority", { enum: ["low", "medium", "high"] }).notNull().default("medium"),
  assignedTo: integer("assigned_to"),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: integer("created_by").notNull(),
});

// Attendance
export const attendance = pgTable("attendance", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  date: date("date").notNull(),
  checkIn: timestamp("check_in"),
  checkOut: timestamp("check_out"),
  status: text("status", { enum: ["present", "absent", "half_day"] }).notNull(),
});

// Payroll
export const payroll = pgTable("payroll", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  month: date("month").notNull(),
  basicSalary: decimal("basic_salary", { precision: 10, scale: 2 }).notNull(),
  allowances: decimal("allowances", { precision: 10, scale: 2 }).default("0"),
  deductions: decimal("deductions", { precision: 10, scale: 2 }).default("0"),
  netSalary: decimal("net_salary", { precision: 10, scale: 2 }).notNull(),
  status: text("status", { enum: ["pending", "processed", "paid"] }).notNull().default("pending"),
  processedAt: timestamp("processed_at"),
});

// Billing/Invoices
export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  clientName: text("client_name").notNull(),
  clientPan: text("client_pan"),
  issueDate: date("issue_date").notNull(),
  dueDate: date("due_date"),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: text("status", { enum: ["draft", "issued", "paid", "cancelled"] }).notNull().default("draft"),
  createdBy: integer("created_by").notNull(),
});

export const invoiceItems = pgTable("invoice_items", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").notNull(),
  description: text("description").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
});

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  department: one(departments, {
    fields: [users.departmentId],
    references: [departments.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  assignee: one(users, {
    fields: [tasks.assignedTo],
    references: [users.id],
  }),
  creator: one(users, {
    fields: [tasks.createdBy],
    references: [users.id],
  }),
}));

// Schemas for data insertion
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertDepartmentSchema = createInsertSchema(departments).omit({
  id: true,
});

export const insertItemSchema = createInsertSchema(items).omit({
  id: true
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
});

export const insertAttendanceSchema = createInsertSchema(attendance).omit({
  id: true,
});

export const insertPayrollSchema = createInsertSchema(payroll).omit({
  id: true,
  processedAt: true,
});

export const insertInvoiceSchema = createInsertSchema(invoices).omit({
  id: true,
});

export const insertInvoiceItemSchema = createInsertSchema(invoiceItems).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Department = typeof departments.$inferSelect;
export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;

export type Item = typeof items.$inferSelect;
export type InsertItem = z.infer<typeof insertItemSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type Attendance = typeof attendance.$inferSelect;
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;

export type Payroll = typeof payroll.$inferSelect;
export type InsertPayroll = z.infer<typeof insertPayrollSchema>;

export type Invoice = typeof invoices.$inferSelect;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;

export type InvoiceItem = typeof invoiceItems.$inferSelect;
export type InsertInvoiceItem = z.infer<typeof insertInvoiceItemSchema>;

// AI Insights Types
export const businessInsights = pgTable("business_insights", {
  id: serial("id").primaryKey(),
  type: text("type", { enum: ["inventory", "sales", "tasks"] }).notNull(),
  insight: text("insight").notNull(),
  confidence: decimal("confidence", { precision: 3, scale: 2 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertBusinessInsightSchema = createInsertSchema(businessInsights).omit({
  id: true,
  timestamp: true,
});

export type BusinessInsight = typeof businessInsights.$inferSelect;
export type InsertBusinessInsight = z.infer<typeof insertBusinessInsightSchema>;