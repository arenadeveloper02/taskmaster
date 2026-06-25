import { getTasks, getUsers, getCategories } from '@/lib/actions';
import AppShell from '@/components/AppShell';
import TasksClient from '@/components/TasksClient';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Tasks | TaskMaster' };

export default async function TasksPage() {
  const [tasks, users, categories] = await Promise.all([
    getTasks(),
    getUsers(),
    getCategories()
  ]);
  return (
    <AppShell>
      <TasksClient tasks={tasks} users={users} categories={categories} />
    </AppShell>
  );
}
