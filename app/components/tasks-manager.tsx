
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { TaskForm } from './task-form';

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
}

export function TasksManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== id));
      }
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingTask(null);
    fetchTasks();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tarefas DevOps</h2>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

      <div className="grid gap-4">
        {tasks?.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Nenhuma tarefa encontrada</p>
            </CardContent>
          </Card>
        ) : (
          tasks?.map((task) => (
            <Card key={task?.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{task?.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{task?.description || 'Sem descrição'}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(task)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(task?.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    {getStatusIcon(task?.status)}
                    <Badge className={getStatusColor(task?.status)}>
                      {task?.status === 'completed' ? 'Concluída' : 
                       task?.status === 'in_progress' ? 'Em Andamento' : 'Pendente'}
                    </Badge>
                  </div>
                  <Badge className={getPriorityColor(task?.priority)}>
                    {task?.priority === 'high' ? 'Alta' : 
                     task?.priority === 'medium' ? 'Média' : 'Baixa'}
                  </Badge>
                  <span>Criada em {new Date(task?.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
