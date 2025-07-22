# Sistema de Estoque - Frontend

Este é o frontend do sistema de gerenciamento de estoque, desenvolvido com Vue 3 e Vite. Ele permite gerenciar produtos, movimentações de estoque e visualizar relatórios de lucro.

## Funcionalidades

- **Gerenciamento de Produtos**: Adicionar, editar, listar e excluir produtos.
- **Movimentações de Estoque**: Registrar entradas e saídas de produtos.
- **Relatórios**: Visualizar o lucro total por produto.
- **Autenticação Simples**: Tela de login para acesso ao sistema (Pode-se usar qualquer usuário e senha)

## Tecnologias Utilizadas

- **Vue 3**: Framework JavaScript para construção de interfaces de usuário.
- **Vite**: Ferramenta de build rápida para desenvolvimento web.
- **Tailwind CSS**: Framework CSS para estilização.
- **Axios**: Biblioteca para requisições HTTP.
- **TypeScript**: Superset do JavaScript para tipagem estática.

## Estrutura do Projeto

```plaintext
estoque-frontend/
├── src/
│   ├── assets/          # Arquivos estáticos (imagens, CSS)
│   ├── components/      # Componentes reutilizáveis (ex.: Header, Modais)
│   ├── pages/           # Páginas principais (ex.: Lista de Produtos)
│   ├── router/          # Configuração de rotas
│   ├── services/        # Serviços para comunicação com a API
│   ├── types/           # Definições de tipos TypeScript
│   ├── views/           # Telas específicas (ex.: Produtos, Movimentações)
│   ├── App.vue          # Componente raiz
│   └── main.ts          # Arquivo de entrada principal
├── public/              # Arquivos públicos (ex.: favicon)
├── package.json         # Dependências e scripts do projeto
├── tailwind.config.js   # Configuração do Tailwind CSS
└── vite.config.ts       # Configuração do Vite
```

## Requisitos

- Node.js 16+
- Gerenciador de pacotes (npm ou yarn)

## Configuração do Projeto

1. Clone o repositório:

   ```sh
   git clone https://github.com/seu-usuario/estoque-frontend.git
   cd estoque-frontend
   ```

2. Instale as dependências:

   ```sh
   npm install
   ```

3. Configure a URL base da API no arquivo [`src/services/api.ts`](src/services/api.ts):

   ```ts
   const api = axios.create({
     baseURL: 'http://localhost:8080/api', // Atualize conforme necessário
   });
   ```

## Scripts Disponíveis

- **Iniciar o servidor de desenvolvimento**:

  ```sh
  npm run dev
  ```

- **Build para produção**:

  ```sh
  npm run build
  ```

- **Pré-visualizar o build**:

  ```sh
  npm run preview
  ```

- **Checagem de tipos TypeScript**:

  ```sh
  npm run type-check
  ```

- **Lint do código**:

  ```sh
  npm run lint
  ```

- **Formatar código com Prettier**:

  ```sh
  npm run format
  ```

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
