import { getCategories } from '@/lib/actions';
import AppShell from '@/components/AppShell';
import CategoriesClient from '@/components/CategoriesClient';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Categories | TaskMaster' };

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <AppShell>
      <CategoriesClient categories={categories} />
    </AppShell>
  );
}
