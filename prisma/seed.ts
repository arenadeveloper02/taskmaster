import { PrismaClient, Role, Status, TaskStatus, Priority } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const memberPassword = await bcrypt.hash('member123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@taskmaster.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@taskmaster.com',
      password: adminPassword,
      role: Role.ADMIN,
      status: Status.ACTIVE
    }
  });

  const manager = await prisma.user.upsert({
    where: { email: 'manager@taskmaster.com' },
    update: {},
    create: {
      name: 'Jane Manager',
      email: 'manager@taskmaster.com',
      password: memberPassword,
      role: Role.MANAGER,
      status: Status.ACTIVE
    }
  });

  const member = await prisma.user.upsert({
    where: { email: 'member@taskmaster.com' },
    update: {},
    create: {
      name: 'Bob Member',
      email: 'member@taskmaster.com',
      password: memberPassword,
      role: Role.MEMBER,
      status: Status.ACTIVE
    }
  });

  const devCategory = await prisma.category.upsert({
    where: { name: 'Development' },
    update: {},
    create: { name: 'Development', color: '#6366f1' }
  });

  const designCategory = await prisma.category.upsert({
    where: { name: 'Design' },
    update: {},
    create: { name: 'Design', color: '#ec4899' }
  });

  const marketingCategory = await prisma.category.upsert({
    where: { name: 'Marketing' },
    update: {},
    create: { name: 'Marketing', color: '#f59e0b' }
  });

  await prisma.task.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions for automated deployment',
        status: TaskStatus.IN_PROGRESS,
        priority: Priority.HIGH,
        creatorId: admin.id,
        assigneeId: manager.id,
        categoryId: devCategory.id,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Design new landing page',
        description: 'Create mockups for the updated landing page',
        status: TaskStatus.TODO,
        priority: Priority.MEDIUM,
        creatorId: manager.id,
        assigneeId: member.id,
        categoryId: designCategory.id,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Write Q4 marketing plan',
        description: 'Outline marketing strategy for Q4',
        status: TaskStatus.TODO,
        priority: Priority.HIGH,
        creatorId: admin.id,
        assigneeId: manager.id,
        categoryId: marketingCategory.id,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      },
      {
        title: 'Fix authentication bug',
        description: 'Resolve token refresh issue on mobile',
        status: TaskStatus.DONE,
        priority: Priority.HIGH,
        creatorId: admin.id,
        assigneeId: admin.id,
        categoryId: devCategory.id
      },
      {
        title: 'Update user documentation',
        description: 'Revise onboarding docs for new features',
        status: TaskStatus.IN_PROGRESS,
        priority: Priority.LOW,
        creatorId: manager.id,
        assigneeId: member.id,
        categoryId: marketingCategory.id
      }
    ]
  });

  console.log('Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
