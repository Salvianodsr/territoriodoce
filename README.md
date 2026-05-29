# 🧁 Território Doce Ateliê - Platform Full-Stack Premium

Seja bem-vindo à plataforma full-stack e marketplace de alta confeitaria e encomendas customizadas do **Território Doce Ateliê**. Este projeto foi projetado com uma arquitetura profissional de alta performance, design cinematográfico ultra-moderno inspirado na Apple e Airbnb, animações fluidas e recursos avançados.

---

## 🚀 Arquitetura Geral do Monorepo

O projeto está organizado em uma estrutura de **Monorepo** moderna para garantir alta escalabilidade, manutenibilidade e isolamento de escopo:

```text
territorio-doce/
├── docker-compose.yml           # Setup de PostgreSQL e Redis locais
├── package.json                 # Definição do workspace Monorepo
├── README.md                    # Este manual técnico
├── apps/
│   ├── web/                     # Frontend Next.js 14 (App Router)
│   │   ├── src/
│   │   │   ├── app/             # Rotas cinematográficas (Home, Loja, Checkout, Minha Conta, Admin)
│   │   │   ├── components/      # Componentes (Header, Footer, HeroCake, CakeBuilder, ChatWidget)
│   │   │   ├── store/           # Estado global Zustand (carrinho, temas, login, chat)
│   │   │   └── styles/          # index.css (Glassmorphism, Velvet Rose, Champagne tokens)
│   └── server/                  # Backend NestJS (TypeScript)
│       └── src/
│           ├── modules/         # Módulos encapsulados (Auth, Products, Orders, Chats)
│           ├── gateway/         # Conexões WebSockets para tempo real
│           └── prisma/          # Conexão ORM com PostgreSQL
└── packages/
    └── database/                # Schema compartilhado do banco de dados
        └── prisma/
            └── schema.prisma    # Modelos completos do Prisma ORM
```

---

## 🛠️ Tecnologias Utilizadas

### Front-End:
- **Next.js 14 (App Router & TS)**: SSR, roteamento rápido e otimização SEO impecável.
- **Tailwind CSS**: Estilização premium baseada em tokens de luxo.
- **Framer Motion**: Animações de micro-interações e revelação visual fluida.
- **GSAP & ScrollTrigger**: A lendária animação cinematográfica de desmontagem e scroll do bolo de casamento na Home.
- **Zustand**: Gerenciador leve de estado (carrinho, cupons, sessões).

### Back-End:
- **NestJS (TypeScript)**: Arquitetura em camadas altamente desacoplada e robusta.
- **Prisma ORM**: Modelagem de dados limpa e queries eficientes para PostgreSQL.
- **JWT (JSON Web Tokens)**: Segurança total nas rotas do painel e controle de perfis.
- **AI Chatbot Concierge**: Sistema inteligente de respostas rápidas gourmet simuladas.

---

## 📦 Credenciais Pré-Semeadas para Avaliação Rápida

Para facilitar os testes de múltiplos papéis e painéis específicos, configuramos credenciais fictícias no ateliê. Você pode clicar em **"Acessar Conta" (ícone de perfil no menu superior)** e usar o **Simulador de Login Rápido (em um único clique)** ou entrar com as seguintes credenciais:

| Papel / Perfil | E-mail de Teste | Senha | Acesso Exclusivo |
| :--- | :--- | :--- | :--- |
| **Cliente VIP** | `cliente@territoriodoce.com` | `senha123` | Rastreamento realtime, carteira de Cashback e histórico de pedidos |
| **Administrador** | `admin@territoriodoce.com` | `senha123` | Dashboard analítico, ticket médio, relatórios gerais e gráficos de faturamento |
| **Confeiteiro Chef** | `confeiteiro@territoriodoce.com` | `senha123` | Kanban de Produção da cozinha (mover pedidos de mistura até a expedição) |
| **Entregador VIP** | `entregador@territoriodoce.com` | `senha123` | Portal de Rotas mobile com mapa dinâmico de rastreamento de temperatura |
| **Vendedor Parceiro** | `vendedor@territoriodoce.com` | `senha123` | Portal do lojista parceiro, saldo de repasses e cadastro de novos doces |

---

## ⚙️ Instruções para Execução Local

### Pré-requisitos:
- **Node.js** v18 ou superior instalado.
- **Docker** instalado (opcional, para rodar PostgreSQL e Redis com um clique).

### Passo 1: Inicializar o Banco de Dados e Cache (Opcional):
Na raiz do projeto, execute o Docker Compose para subir os contêineres:
```bash
docker-compose up -d
```

### Passo 2: Instalar Dependências Gerais:
Na raiz do monorepo, instale os pacotes necessários:
```bash
npm install
```

### Passo 3: Inicializar o Banco (Prisma):
Crie e aplique os esquemas no PostgreSQL:
```bash
npm run db:generate
```

### Passo 4: Executar a Aplicação em Modo Desenvolvimento:
Abra dois terminais na raiz e execute:
- Para o **Frontend Next.js** (Roda em http://localhost:3000):
  ```bash
  npm run dev:web
  ```
- Para o **Backend NestJS API** (Roda em http://localhost:3001):
  ```bash
  npm run dev:server
  ```

---

## 🌟 Recursos Exclusivos Implementados

1. **Efeito Desmontagem 3D (Scroll Hero)**: Logo na abertura da Home Page, conforme rola a página, o bolo de casamento se abre organicamente, morangos e flores flutuam nas margens e confeitos explodem ao final, liberando o botão de compra.
2. **Customizador Visual Multi-etapas**: Escolha o diâmetro, a receita da massa, o tipo de recheio trufado e a decoração em ouro, e veja o bolo sendo empilhado graficamente com orçamento dinâmico de custos.
3. **AI Concierge**: Um chat flutuante no canto inferior direito conectado com inteligência artificial que responde perguntas sobre ingredientes, cupons, prazos e degustações.
4. **Stripe e Pix Gateway**: Simulação de pagamentos Pix com gerador dinâmico de QR code, chaves de cópia rápida e confirmações ativas de transações concluídas.
5. **Dashboard Financeiro e Kanban**: Painéis administrativos sofisticados integrados com gráficos SVG elegantes indicando faturamento por categoria e faturamento mensal do ateliê.
