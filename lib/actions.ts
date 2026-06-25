'use server';

import { prisma } from '@/lib/prisma';
import type { UserData, CategoryData, TaskData, DashboardStats } from '@/lib/types';

export async function getUsers(): Promise<UserData[]> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { createdTasks: true, assignedTasks: true }
      }
    }
  });
  return users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
    createdAt: u.createdAt.toISOString(),
    _count: u._count
  }));
}

export async function getCategories(): Promise<CategoryData[]> {
  const cats = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { tasks: true } } }
  });
  return cats.map((c) => ({
    id: c.id,
    name: c.name,
    color: c.color,
    createdAt: c.createdAt.toISOString(),
    _count: c._count
  }));
}

export async function getTasks(): Promise<TaskData[]> {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      creator: { select: { id: true, name: true, email: true } },
      assignee: { select: { id: true, name: true, email: true } },
      category: { select: { id: true, name: true, color: true } }
    }
  });
  return tasks.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    status: t.status,
    priority: t.priority,
    dueDate: t.dueDate ? t.dueDate.toISOString() : null,
    createdAt: t.createdAt.toISOString(),
    creatorId: t.creatorId,
    assigneeId: t.assigneeId,
    categoryId: t.categoryId,
    creator: t.creator,
    assignee: t.assignee,
    category: t.category
  }));
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [totalTasks, completedTasks, inProgressTasks, todoTasks, totalUsers, totalCategories, overdueTasks] =
    await Promise.all([
      prisma.task.count(),
      prisma.task.count({ where: { status: 'DONE' } }),
      prisma.task.count({ where: { status: 'IN_PROGRESS' } }),
      prisma.task.count({ where: { status: 'TODO' } }),
      prisma.user.count(),
      prisma.category.count(),
      prisma.task.count({
        where: {
          dueDate: { lt: new Date() },
          status: { not: 'DONE' }
        }
      })
    ]);
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  return {
    totalTasks,
    completedTasks,
    inProgressTasks,
    todoTasks,
    totalUsers,
    totalCategories,
    overdueTasks,
    completionRate
  };
}

export async function createTask(data: {
  title: string;
  description?: string;
  status: string;
  priority: string;
  dueDate?: string;
  creatorId: string;
  assigneeId?: string;
  categoryId?: string;
}): Promise<TaskData> {
  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      status: data.status as 'TODO' | 'IN_PROGRESS' | 'DONE',
      priority: data.priority as 'LOW' | 'MEDIUM' | 'HIGH',
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
      creatorId: data.creatorId,
      assigneeId: data.assigneeId || null,
      categoryId: data.categoryId || null
    },
    include: {
      creator: { select: { id: true, name: true, email: true } },
      assignee: { select: { id: true, name: true, email: true } },
      category: { select: { id: true, name: true, color: true } }
    }
  });
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.toISOString() : null,
    createdAt: task.createdAt.toISOString(),
    creatorId: task.creatorId,
    assigneeId: task.assigneeId,
    categoryId: task.categoryId,
    creator: task.creator,
    assignee: task.assignee,
    category: task.category
  };
}

export async function updateTask(
  id: string,
  data: Partial<{
    title: string;
    description: string;
    status: string;
    priority: string;
    dueDate: string;
    assigneeId: string;
    categoryId: string;
  }>
): Promise<TaskData> {
  const task = await prisma.task.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.status !== undefined && { status: data.status as 'TODO' | 'IN_PROGRESS' | 'DONE' }),
      ...(data.priority !== undefined && { priority: data.priority as 'LOW' | 'MEDIUM' | 'HIGH' }),
      ...(data.dueDate !== undefined && { dueDate: data.dueDate ? new Date(data.dueDate) : null }),
      ...(data.assigneeId !== undefined && { assigneeId: data.assigneeId || null }),
      ...(data.categoryId !== undefined && { categoryId: data.categoryId || null })
    },
    include: {
      creator: { select: { id: true, name: true, email: true } },
      assignee: { select: { id: true, name: true, email: true } },
      category: { select: { id: true, name: true, color: true } }
    }
  });
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate ? task.dueDate.toISOString() : null,
    createdAt: task.createdAt.toISOString(),
    creatorId: task.creatorId,
    assigneeId: task.assigneeId,
    categoryId: task.categoryId,
    creator: task.creator,
    assignee: task.assignee,
    category: task.category
  };
}

export async function deleteTask(id: string): Promise<void> {
  await prisma.task.delete({ where: { id } });
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  role: string;
}): Promise<UserData> {
  const bcrypt = await import('bcryptjs');
  const hashed = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashed,
      role: data.role as 'ADMIN' | 'MANAGER' | 'MEMBER'
    },
    include: { _count: { select: { createdTasks: true, assignedTasks: true } } }
  });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt.toISOString(),
    _count: user._count
  };
}

export async function updateUser(
  id: string,
  data: Partial<{ name: string; email: string; role: string; status: string }>
): Promise<UserData> {
  const user = await prisma.user.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.role !== undefined && { role: data.role as 'ADMIN' | 'MANAGER' | 'MEMBER' }),
      ...(data.status !== undefined && { status: data.status as 'ACTIVE' | 'DISABLED' })
    },
    include: { _count: { select: { createdTasks: true, assignedTasks: true } } }
  });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt.toISOString(),
    _count: user._count
  };
}

export async function deleteUser(id: string): Promise<void> {
  await prisma.user.delete({ where: { id } });
}

export async function createCategory(data: { name: string; color: string }): Promise<CategoryData> {
  const cat = await prisma.category.create({
    data: { name: data.name, color: data.color },
    include: { _count: { select: { tasks: true } } }
  });
  return {
    id: cat.id,
    name: cat.name,
    color: cat.color,
    createdAt: cat.createdAt.toISOString(),
    _count: cat._count
  };
}

export async function updateCategory(
  id: string,
  data: Partial<{ name: string; color: string }>
): Promise<CategoryData> {
  const cat = await prisma.category.update({
    where: { id },
    data,
    include: { _count: { select: { tasks: true } } }
  });
  return {
    id: cat.id,
    name: cat.name,
    color: cat.color,
    createdAt: cat.createdAt.toISOString(),
    _count: cat._count
  };
}

export async function deleteCategory(id: string): Promise<void> {
  await prisma.category.delete({ where: { id } });
}
