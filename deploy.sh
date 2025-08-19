
#!/bin/bash
# Script de deploy com Docker

echo "🚀 Iniciando deploy da aplicação DevOps Demo..."

# Parar containers existentes
echo "🛑 Parando containers existentes..."
docker-compose down

# Build e subir containers
echo "🔨 Fazendo build e subindo containers..."
docker-compose up --build -d

# Aguardar inicialização
echo "⏳ Aguardando inicialização dos serviços..."
sleep 30

# Verificar status
echo "📊 Verificando status dos serviços..."
docker-compose ps

# Testar aplicação
echo "🧪 Testando aplicação..."
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Aplicação está funcionando em http://localhost:3000"
else
    echo "❌ Erro ao acessar a aplicação"
    docker-compose logs app
    exit 1
fi

echo "🎉 Deploy concluído com sucesso!"
echo "🌐 Aplicação disponível em:"
echo "  - NextJS: http://localhost:3000"
echo "  - Nginx: http://localhost:80"
echo ""
echo "📊 Para ver logs: docker-compose logs -f"
echo "🛑 Para parar: docker-compose down"
