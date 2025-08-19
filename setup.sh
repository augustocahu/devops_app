
#!/bin/bash
# Script de configuração inicial da aplicação DevOps Demo

echo "🚀 Configurando DevOps Demo Application..."

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor instale o Docker primeiro."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor instale o Docker Compose primeiro."
    exit 1
fi

# Entrar no diretório da aplicação
cd app

echo "📦 Instalando dependências..."
yarn install

echo "🗄️ Configurando banco de dados..."
npx prisma generate
npx prisma db push

echo "🌱 Populando banco com dados de exemplo..."
yarn prisma db seed

echo "✅ Configuração concluída!"
echo "🌐 Execute 'yarn dev' para iniciar em desenvolvimento"
echo "🐳 Ou execute 'docker-compose up --build' para executar com Docker"
