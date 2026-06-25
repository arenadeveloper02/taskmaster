import { getDashboardStats, getTasks, getUsers } from '@/lib/actions';
import AppShell from '@/components/AppShell';
import DashboardClient from '@/components/DashboardClient';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Dashboard | TaskMaster' };

export default async function DashboardPage() {
  const [stats, tasks, users] = await Promise.all([
    getDashboardStats(),
    getTasks(),
    getUsers()
  ]);
  return (
    <AppShell>
      <DashboardClient stats={stats} tasks={tasks} users={users} />
    </AppShell>
  );
}
