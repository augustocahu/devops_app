
import { Suspense } from 'react';
import { TasksManager } from '@/components/tasks-manager';
import { UsersManager } from '@/components/users-manager';
import { StatsCards } from '@/components/stats-cards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CheckCircle, Users, Zap } from 'lucide-react';

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
      <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Zap className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Sistema de gerenciamento</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sistema completo de gerenciamento com operações CRUD, containerização Docker e pipeline CI/CD
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Activity className="h-4 w-4" />
            <span>NextJS + React</span>
          </div>
          <div className="flex items-center space-x-1">
            <CheckCircle className="h-4 w-4" />
            <span>API REST</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>PostgreSQL</span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>}>
        <StatsCards />
      </Suspense>

      {/* Main Content */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Gerenciamento de Recursos</CardTitle>
          <CardDescription>
            Interface completa para operações CRUD - Create, Read, Update, Delete
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tasks" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tasks">Tarefas DevOps</TabsTrigger>
              <TabsTrigger value="users">Usuários</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="space-y-4">
              <Suspense fallback={<LoadingSkeleton />}>
                <TasksManager />
              </Suspense>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              <Suspense fallback={<LoadingSkeleton />}>
                <UsersManager />
              </Suspense>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Technology Stack Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-lg">Frontend</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">React 18 + NextJS 14 com TypeScript e Tailwind CSS</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-lg">Backend</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">API Routes NextJS + Prisma ORM + PostgreSQL</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-lg">DevOps</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Docker + Docker Compose + GitHub Actions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
