
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

// GET all tasks
export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar tarefas' },
      { status: 500 }
    );
  }
}

// POST create new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, status, priority } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Título é obrigatório' },
        { status: 400 }
      );
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || '',
        status: status || 'pending',
        priority: priority || 'medium',
      }
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Erro ao criar tarefa' },
      { status: 500 }
    );
  }
}
