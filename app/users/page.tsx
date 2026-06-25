import { getUsers } from '@/lib/actions';
import AppShell from '@/components/AppShell';
import UsersClient from '@/components/UsersClient';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Users | TaskMaster' };

export default async function UsersPage() {
  const users = await getUsers();
  return (
    <AppShell>
      <UsersClient users={users} />
    </AppShell>
  );
}
