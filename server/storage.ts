import { InsertItem, InsertUser, Item, User, Task, InsertTask, Attendance, InsertAttendance, Payroll, InsertPayroll, Department, InsertDepartment } from "@shared/schema";
import { users, items, tasks, attendance, payroll, departments } from "@shared/schema"; // Added import for payroll and department schemas
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Item operations
  getItems(): Promise<Item[]>;
  getItem(id: number): Promise<Item | undefined>;
  createItem(item: InsertItem): Promise<Item>;
  updateItem(id: number, item: Partial<InsertItem>): Promise<Item | undefined>;
  deleteItem(id: number): Promise<boolean>;

  // Task operations
  getTasks(): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<InsertTask>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;

  // Session store
  sessionStore: session.Store;

  // Attendance operations
  getAttendance(): Promise<Attendance[]>;
  getUserAttendance(userId: number): Promise<Attendance[]>;
  createAttendance(attendance: InsertAttendance): Promise<Attendance>;
  updateAttendance(id: number, attendance: Partial<InsertAttendance>): Promise<Attendance | undefined>;

  // Payroll operations
  getPayroll(): Promise<Payroll[]>;
  getUserPayroll(userId: number): Promise<Payroll[]>;
  createPayroll(payroll: InsertPayroll): Promise<Payroll>;
  updatePayroll(id: number, payroll: Partial<InsertPayroll>): Promise<Payroll | undefined>;

  // Department operations
  getDepartments(): Promise<Department[]>;
  getDepartment(id: number): Promise<Department | undefined>;
  createDepartment(department: InsertDepartment): Promise<Department>;
  updateDepartment(id: number, department: Partial<InsertDepartment>): Promise<Department | undefined>;
  deleteDepartment(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getItems(): Promise<Item[]> {
    return await db.select().from(items);
  }

  async getItem(id: number): Promise<Item | undefined> {
    const [item] = await db.select().from(items).where(eq(items.id, id));
    return item;
  }

  async createItem(insertItem: InsertItem): Promise<Item> {
    const [item] = await db.insert(items).values(insertItem).returning();
    return item;
  }

  async updateItem(id: number, updates: Partial<InsertItem>): Promise<Item | undefined> {
    const [item] = await db
      .update(items)
      .set(updates)
      .where(eq(items.id, id))
      .returning();
    return item;
  }

  async deleteItem(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(items)
      .where(eq(items.id, id))
      .returning();
    return !!deleted;
  }

  async getTasks(): Promise<Task[]> {
    return await db.select().from(tasks);
  }

  async getTask(id: number): Promise<Task | undefined> {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    return task;
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const [task] = await db.insert(tasks).values(insertTask).returning();
    return task;
  }

  async updateTask(id: number, updates: Partial<InsertTask>): Promise<Task | undefined> {
    const [task] = await db
      .update(tasks)
      .set(updates)
      .where(eq(tasks.id, id))
      .returning();
    return task;
  }

  async deleteTask(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();
    return !!deleted;
  }

  async getAttendance(): Promise<Attendance[]> {
    return await db.select().from(attendance);
  }

  async getUserAttendance(userId: number): Promise<Attendance[]> {
    return await db.select().from(attendance).where(eq(attendance.userId, userId));
  }

  async createAttendance(insertAttendance: InsertAttendance): Promise<Attendance> {
    const [record] = await db.insert(attendance).values(insertAttendance).returning();
    return record;
  }

  async updateAttendance(id: number, updates: Partial<InsertAttendance>): Promise<Attendance | undefined> {
    const [record] = await db
      .update(attendance)
      .set(updates)
      .where(eq(attendance.id, id))
      .returning();
    return record;
  }

  async getPayroll(): Promise<Payroll[]> {
    return await db.select().from(payroll);
  }

  async getUserPayroll(userId: number): Promise<Payroll[]> {
    return await db.select().from(payroll).where(eq(payroll.userId, userId));
  }

  async createPayroll(insertPayroll: InsertPayroll): Promise<Payroll> {
    const [record] = await db.insert(payroll).values(insertPayroll).returning();
    return record;
  }

  async updatePayroll(id: number, updates: Partial<InsertPayroll>): Promise<Payroll | undefined> {
    const [record] = await db
      .update(payroll)
      .set(updates)
      .where(eq(payroll.id, id))
      .returning();
    return record;
  }

  async getDepartments(): Promise<Department[]> {
    return await db.select().from(departments);
  }

  async getDepartment(id: number): Promise<Department | undefined> {
    const [department] = await db.select().from(departments).where(eq(departments.id, id));
    return department;
  }

  async createDepartment(insertDepartment: InsertDepartment): Promise<Department> {
    const [department] = await db.insert(departments).values(insertDepartment).returning();
    return department;
  }

  async updateDepartment(id: number, updates: Partial<InsertDepartment>): Promise<Department | undefined> {
    const [department] = await db
      .update(departments)
      .set(updates)
      .where(eq(departments.id, id))
      .returning();
    return department;
  }

  async deleteDepartment(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(departments)
      .where(eq(departments.id, id))
      .returning();
    return !!deleted;
  }
}

export const storage = new DatabaseStorage();