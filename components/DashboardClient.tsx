"use client";

import type { DashboardStats, TaskData, UserData } from '@/lib/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  ListTodo,
  TrendingUp,
  Tag
} from 'lucide-react';

interface DashboardClientProps {
  stats: DashboardStats;
  tasks: TaskData[];
  users: UserData[];
}

const STATUS_COLORS: Record<string, string> = {
  TODO: '#6366f1',
  IN_PROGRESS: '#f59e0b',
  DONE: '#10b981'
};

const PRIORITY_COLORS: Record<string, string> = {
  LOW: '#6ee7b7',
  MEDIUM: '#fbbf24',
  HIGH: '#f87171'
};

export default function DashboardClient({ stats, tasks, users }: DashboardClientProps) {
  const statusData = [
    { name: 'To Do', value: stats.todoTasks, color: STATUS_COLORS.TODO },
    { name: 'In Progress', value: stats.inProgressTasks, color: STATUS_COLORS.IN_PROGRESS },
    { name: 'Done', value: stats.completedTasks, color: STATUS_COLORS.DONE }
  ];

  const priorityData = [
    { name: 'Low', count: tasks.filter((t) => t.priority === 'LOW').length },
    { name: 'Medium', count: tasks.filter((t) => t.priority === 'MEDIUM').length },
    { name: 'High', count: tasks.filter((t) => t.priority === 'HIGH').length }
  ];

  const recentTasks = tasks.slice(0, 5);
  const overdueTasks = tasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'DONE'
  );

  const statCards = [
    { label: 'Total Tasks', value: stats.totalTasks, icon: ListTodo, color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { label: 'Completed', value: stats.completedTasks, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
    { label: 'In Progress', value: stats.inProgressTasks, icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { label: 'Overdue', value: stats.overdueTasks, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20' },
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { label: 'Categories', value: stats.totalCategories, icon: Tag, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { label: 'Completion Rate', value: `${stats.completionRate}%`, icon: TrendingUp, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Overview of your team&apos;s productivity</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className={`inline-flex p-2 rounded-lg ${card.bg} mb-3`}>
                <Icon size={20} className={card.color} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{card.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">Tasks by Status</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">Tasks by Priority</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count">
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={Object.values(PRIORITY_COLORS)[index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Tasks & Overdue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">Recent Tasks</h2>
          {recentTasks.length === 0 ? (
            <p className="text-gray-400 text-sm">No tasks yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentTasks.map((task) => (
                <li key={task.id} className="flex items-start gap-3">
                  <span
                    className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: STATUS_COLORS[task.status] || '#6366f1' }}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{task.title}</p>
                    <p className="text-xs text-gray-400">
                      {task.assignee ? task.assignee.name : 'Unassigned'} &bull;{' '}
                      {task.status.replace('_', ' ')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Overdue Tasks{' '}
            <span className="text-red-500 text-sm">({overdueTasks.length})</span>
          </h2>
          {overdueTasks.length === 0 ? (
            <p className="text-gray-400 text-sm">No overdue tasks. Great job!</p>
          ) : (
            <ul className="space-y-3">
              {overdueTasks.slice(0, 5).map((task) => (
                <li key={task.id} className="flex items-start gap-3">
                  <AlertTriangle size={14} className="text-red-500 mt-1 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{task.title}</p>
                    <p className="text-xs text-gray-400">
                      Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Top Users */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">Team Members</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Role</th>
                <th className="pb-2 font-medium">Created</th>
                <th className="pb-2 font-medium">Assigned</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 5).map((u) => (
                <tr key={u.id} className="border-b border-gray-50 dark:border-gray-700/50 last:border-0">
                  <td className="py-2">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{u.name}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                  </td>
                  <td className="py-2">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">{u._count?.createdTasks ?? 0}</td>
                  <td className="py-2 text-gray-600 dark:text-gray-400">{u._count?.assignedTasks ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
