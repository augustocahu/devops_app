
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [totalTasks, completedTasks, pendingTasks, totalUsers] = await Promise.all([
      prisma.task.count(),
      prisma.task.count({ where: { status: 'completed' } }),
      prisma.task.count({ where: { status: 'pending' } }),
      prisma.user.count(),
    ]);

    const stats = {
      totalTasks,
      completedTasks,
      pendingTasks,
      totalUsers,
      inProgressTasks: totalTasks - completedTasks - pendingTasks,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar estatísticas' },
      { status: 500 }
    );
  }
}
