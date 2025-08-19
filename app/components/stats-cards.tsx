
import { PrismaClient } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle, Users } from 'lucide-react';

const prisma = new PrismaClient();

export async function StatsCards() {
  const [totalTasks, completedTasks, pendingTasks, totalUsers] = await Promise.all([
    prisma.task.count(),
    prisma.task.count({ where: { status: 'completed' } }),
    prisma.task.count({ where: { status: 'pending' } }),
    prisma.user.count(),
  ]);

  const inProgressTasks = totalTasks - completedTasks - pendingTasks;

  const stats = [
    {
      title: 'Total de Tarefas',
      value: totalTasks,
      icon: AlertCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Concluídas',
      value: completedTasks,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Em Andamento',
      value: inProgressTasks,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Usuários',
      value: totalUsers,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`h-8 w-8 rounded-full ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
