export interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  _count?: {
    createdTasks: number;
    assignedTasks: number;
  };
}

export interface CategoryData {
  id: string;
  name: string;
  color: string;
  createdAt: string;
  _count?: {
    tasks: number;
  };
}

export interface TaskData {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  createdAt: string;
  creatorId: string;
  assigneeId: string | null;
  categoryId: string | null;
  creator: { id: string; name: string; email: string };
  assignee: { id: string; name: string; email: string } | null;
  category: { id: string; name: string; color: string } | null;
}

export interface DashboardStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
  totalUsers: number;
  totalCategories: number;
  overdueTasks: number;
  completionRate: number;
}

export interface TaskStatusCount {
  status: string;
  count: number;
}

export interface PriorityCount {
  priority: string;
  count: number;
}
