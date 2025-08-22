
# 🚀 DevOps Demo Application

Esta é uma aplicação completa desenvolvida para demonstrar práticas modernas de DevOps, incluindo desenvolvimento full-stack, containerização, orquestração e pipeline CI/CD.

## 🎯 Funcionalidades

### ✨ Características Principais
- **Frontend React/NextJS**: Interface moderna e responsiva
- **Backend API REST**: Operações CRUD completas com NodeJS
- **Banco de dados PostgreSQL**: Persistência de dados robusta
- **Containerização Docker**: Aplicação completamente dockerizada
- **Orquestração**: Docker Compose para múltiplos serviços
- **Arquitetura Full-Stack**: Frontend e Backend integrados

### 📋 Operações CRUD Implementadas
- **Tarefas DevOps**: Criar, visualizar, editar e excluir tarefas
- **Usuários**: Gerenciar usuários do sistema
- **Dashboard**: Estatísticas em tempo real
- **Interface Responsiva**: Design moderno com Tailwind CSS

## 🏗️ Arquitetura Técnica

### Frontend
- **NextJS 14** com React 18
- **TypeScript** para tipagem estática
- **Tailwind CSS** para estilização
- **Shadcn/UI** para componentes
- **Framer Motion** para animações

### Backend
- **API Routes NextJS** (Serverless Functions)
- **Prisma ORM** para acesso ao banco
- **PostgreSQL** como banco de dados
- **Validação de dados** com TypeScript

### DevOps & Infraestrutura
- **Docker** para containerização
- **Docker Compose** para orquestração
- **Nginx** como proxy reverso
- **Health checks** para monitoramento
- **Multi-stage builds** para otimização

## 🚀 Execução Local

### Pré-requisitos
```bash
- Node.js 18+
- Yarn ou npm
- PostgreSQL (ou Docker)
```

### 1. Instalação e Configuração
```bash
# Clonar o repositório
git clone <repository-url>
cd devops_demo_app/app

# Instalar dependências
yarn install

# Configurar banco de dados
cp .env.example .env
# Editar DATABASE_URL no arquivo .env
```

### 2. Configuração do Banco
```bash
# Gerar cliente Prisma
npx prisma generate

# Aplicar schema ao banco
npx prisma db push

# Popular com dados de exemplo
yarn prisma db seed
```

### 3. Executar em Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
yarn dev

# Aplicação disponível em http://localhost:3000
```

## 🐳 Execução com Docker

### 1. Ambiente de Desenvolvimento
```bash
# Subir aplicação em modo desenvolvimento
docker-compose -f docker-compose.dev.yml up -d

# Ver logs
docker-compose -f docker-compose.dev.yml logs -f app_dev

# Parar serviços
docker-compose -f docker-compose.dev.yml down
```

### 2. Ambiente de Produção
```bash
# Build e execução completa
docker-compose up --build -d

# Ver status dos serviços
docker-compose ps

# Ver logs de todos os serviços
docker-compose logs -f

# Parar todos os serviços
docker-compose down
```

### 3. Comandos Úteis Docker
```bash
# Rebuild apenas a aplicação
docker-compose build app

# Executar comandos no container
docker-compose exec app sh

# Aplicar migrações no container
docker-compose exec app npx prisma db push

# Popular dados no container
docker-compose exec app yarn prisma db seed
```

## 🏭 Arquitetura de Containers

### Serviços do Docker Compose

#### 🗄️ PostgreSQL (`postgres`)
- **Imagem**: `postgres:15-alpine`
- **Porta**: 5432
- **Volume**: Persistência de dados
- **Health Check**: Verificação de disponibilidade

#### 🌐 Aplicação Web (`app`)
- **Build**: Dockerfile multi-stage
- **Porta**: 3000
- **Dependências**: PostgreSQL
- **Environment**: Variáveis de produção

#### ⚡ Nginx (`nginx`)
- **Imagem**: `nginx:alpine`
- **Porta**: 80 (proxy para app:3000)
- **Configuração**: Proxy reverso e cache
- **Health Check**: Verificação HTTP

## 📊 Monitoramento e Health Checks

### Health Checks Implementados
```yaml
# PostgreSQL
test: ["CMD-SHELL", "pg_isready -U devops_user -d devops_demo"]

# Aplicação
test: ["CMD", "curl", "-f", "http://localhost:3000/"]

# Nginx
test: ["CMD", "wget", "--spider", "http://localhost"]
```

### Endpoints de Monitoramento
- `GET /api/stats` - Estatísticas da aplicação
- `GET /health` - Status do Nginx
- Logs estruturados para debugging

## 🔧 Configuração de Produção

### Variáveis de Ambiente
```bash
# Banco de dados
DATABASE_URL=postgresql://user:password@host:5432/database

# Next.js
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### Otimizações de Produção
- **Multi-stage Docker build** reduz tamanho da imagem
- **Nginx caching** para assets estáticos
- **Database connection pooling** via Prisma
- **TypeScript compilation** para detecção de erros

## 🚀 Deploy e CI/CD

### Preparação para Deploy AWS
Esta aplicação está pronta para deploy em:
- **AWS ECS** com Fargate
- **AWS EC2** com Docker
- **AWS RDS** para PostgreSQL
- **AWS Application Load Balancer**

### GitHub Actions (Exemplo)
```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and push Docker image
        run: |
          docker build -t devops-demo:latest .
          # Push to ECR and deploy
```

## 📂 Estrutura do Projeto

```
devops_demo_app/
├── app/                     # Aplicação NextJS
│   ├── app/                 # App Router do Next.js
│   │   ├── api/            # API Routes (Backend)
│   │   ├── globals.css     # Estilos globais
│   │   ├── layout.tsx      # Layout principal
│   │   └── page.tsx        # Página inicial
│   ├── components/         # Componentes React
│   │   ├── ui/            # Componentes base
│   │   ├── tasks-manager.tsx
│   │   └── users-manager.tsx
│   ├── lib/               # Utilitários
│   ├── prisma/           # Schema do banco
│   └── scripts/          # Scripts de seed
├── Dockerfile            # Container de produção
├── Dockerfile.dev       # Container de desenvolvimento
├── docker-compose.yml   # Orquestração produção
├── docker-compose.dev.yml # Orquestração desenvolvimento
├── nginx.conf          # Configuração Nginx
└── README.md           # Esta documentação
```

## 🧪 API Endpoints

### Tarefas
```
GET    /api/tasks          # Listar todas as tarefas
POST   /api/tasks          # Criar nova tarefa
GET    /api/tasks/[id]     # Obter tarefa específica
PUT    /api/tasks/[id]     # Atualizar tarefa
DELETE /api/tasks/[id]     # Excluir tarefa
```

### Usuários
```
GET    /api/users          # Listar todos os usuários
POST   /api/users          # Criar novo usuário
GET    /api/users/[id]     # Obter usuário específico
PUT    /api/users/[id]     # Atualizar usuário
DELETE /api/users/[id]     # Excluir usuário
```

### Estatísticas
```
GET    /api/stats          # Obter estatísticas gerais
```

## 🔍 Troubleshooting

### Problemas Comuns

#### Container não inicia
```bash
# Verificar logs
docker-compose logs app

# Verificar rede
docker network ls
docker network inspect devops_demo_default
```

#### Banco de dados não conecta
```bash
# Testar conexão PostgreSQL
docker-compose exec postgres psql -U devops_user -d devops_demo

# Verificar health check
docker-compose ps
```

#### Build falha
```bash
# Limpar cache Docker
docker system prune -f

# Rebuild do zero
docker-compose build --no-cache app
```

### Performance

#### Otimizar consultas
```bash
# Visualizar queries no container
docker-compose exec app npx prisma studio
```

#### Monitorar recursos
```bash
# Estatísticas dos containers
docker stats

# Uso de espaço
docker system df
```

## 📚 Tecnologias Utilizadas

- **Frontend**: React 18, NextJS 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Banco**: PostgreSQL 15
- **Containerização**: Docker, Docker Compose
- **Proxy**: Nginx
- **Outros**: Framer Motion, Shadcn/UI, Lucide Icons

## 🤝 Contribuição

Esta aplicação foi desenvolvida especificamente para demonstração de práticas DevOps e pode ser extendida com:

- Autenticação e autorização
- Testes automatizados (Jest, Cypress)
- Pipeline CI/CD com GitHub Actions
- Deploy automático na AWS
- Monitoramento com Prometheus/Grafana
- Logs centralizados com ELK Stack

## 📝 Licença

Projeto de demonstração DevOps - Livre para uso educacional e profissional.

---

**🎯 Objetivo**: Demonstrar aplicação completa com frontend React, backend API, banco PostgreSQL, containerização Docker e orquestração para práticas modernas de DevOps.
# Test Tue Aug 19 19:41:25 UTC 2025
# Test GitHub Actions Fri Aug 22 20:04:11 UTC 2025
