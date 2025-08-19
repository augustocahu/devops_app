
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample users
  const users = await prisma.user.createMany({
    data: [
      {
        name: 'João Silva',
        email: 'joao@devops.com',
        role: 'admin',
      },
      {
        name: 'Maria Santos',
        email: 'maria@devops.com',
        role: 'user',
      },
      {
        name: 'Pedro Costa',
        email: 'pedro@devops.com',
        role: 'user',
      },
    ],
    skipDuplicates: true,
  });

  // Create sample tasks
  const tasks = await prisma.task.createMany({
    data: [
      {
        title: 'Configurar Pipeline CI/CD',
        description: 'Implementar GitHub Actions para automatizar deploy',
        status: 'in_progress',
        priority: 'high',
      },
      {
        title: 'Dockerizar Aplicação',
        description: 'Criar Dockerfile e docker-compose.yml',
        status: 'completed',
        priority: 'high',
      },
      {
        title: 'Configurar Monitoramento',
        description: 'Implementar logs e métricas da aplicação',
        status: 'pending',
        priority: 'medium',
      },
      {
        title: 'Testes Automatizados',
        description: 'Criar testes unitários e de integração',
        status: 'pending',
        priority: 'high',
      },
      {
        title: 'Deploy na AWS',
        description: 'Configurar infraestrutura na AWS com Terraform',
        status: 'pending',
        priority: 'medium',
      },
      {
        title: 'Documentação DevOps',
        description: 'Criar guias de deploy e operação',
        status: 'in_progress',
        priority: 'low',
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${users.count} users and ${tasks.count} tasks`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
