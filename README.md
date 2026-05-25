# 🥗 Rangoo — Delivery de Alimentos Saudáveis

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📖 Sobre o Projeto

O **Rangoo** é uma plataforma de delivery de alimentos saudáveis desenvolvida para tornar a alimentação equilibrada mais prática, acessível e compatível com a rotina moderna.

A proposta da plataforma é unir tecnologia, experiência do usuário e alimentação funcional em uma interface moderna, intuitiva e responsiva.

O frontend foi desenvolvido com **React + TypeScript**, seguindo conceitos de componentização, reutilização de código, responsividade e integração com API REST.

---

## ✨ Funcionalidades

### 👤 Autenticação
- Login e cadastro de usuários
- Persistência de sessão com LocalStorage
- Armazenamento de token JWT
- Controle de rotas privadas

### 🍱 Produtos
- Listagem dinâmica de produtos
- Cards interativos
- Categorias de alimentos
- Recomendações alimentares
- Scroll horizontal animado

### 🛒 Gerenciamento
- Cadastro de produtos
- Edição de produtos
- Exclusão de produtos
- Gerenciamento de categorias
- Modais reutilizáveis para operações CRUD

### 🧠 Prato Smart (Funcionalidade Especial)
- Cálculo de IMC
- Recomendações personalizadas
- Sugestão de pratos baseada no perfil do usuário

### 🎨 Interface e UX
- Layout responsivo
- Hero section animada
- Microinterações
- Hover effects
- Scroll animations
- Design inspirado em foodtechs modernas

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
|---|---|
| React | Biblioteca principal do frontend |
| TypeScript | Tipagem estática |
| Vite | Ambiente de desenvolvimento |
| TailwindCSS | Estilização |
| React Router DOM | Gerenciamento de rotas |
| Fetch API | Requisições HTTP |
| Phosphor Icons | Ícones |
| Intersection Observer API | Animações on-scroll |

---

## 🧠 Conceitos Aplicados

- Componentização
- Hooks customizados
- Integração frontend/backend
- Gerenciamento de estado
- Responsividade
- Reutilização de componentes
- Estrutura modular
- Separação de responsabilidades
- Animações performáticas

---

## 🛡️ Tratamento de Erros

A aplicação possui tratamento centralizado para requisições HTTP e controle de falhas de rede.

### Exemplo

```ts
if (!res.ok) {
  const msg = await res.text().catch(() => res.statusText);
  throw new Error(`[${res.status}] ${msg}`);
}
```

### Controle de Sessão

```ts
localStorage.setItem("token", data.token);
localStorage.setItem("usuario", JSON.stringify(data));
```

---

## 💻 Estrutura do Projeto

```bash
RANGOO_REACT
├── public
├── src
│   ├── assets
│   │   ├── images
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components
│   │   ├── Produto
│   │   │   ├── Categoriamodal.tsx
│   │   │   ├── Deletarmodal.tsx
│   │   │   ├── Produtocard.tsx
│   │   │   └── Produtomodal.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   │
│   ├── data
│   │   └── feedbacks.ts
│   │
│   ├── pages
│   │   ├── cadastro
│   │   ├── home
│   │   ├── login
│   │   ├── pratosmart
│   │   ├── Produtos
│   │   └── sobre
│   │
│   ├── routes
│   │   └── PrivateRoute.tsx
│   │
│   ├── services
│   │   ├── api.ts
│   │   └── axios.ts
│   │
│   ├── types
│   │   └── index.ts
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🔄 Fluxo do Frontend

```txt
Usuário
   ↓
Interface React
   ↓
Services/API Layer
   ↓
API REST
   ↓
Resposta da API
   ↓
Atualização da Interface
```

---

## 📂 Principais Componentes

| Componente | Responsabilidade |
|---|---|
| Navbar | Navegação principal |
| Footer | Rodapé |
| ProductCard | Card de produto |
| ProductModal | Cadastro e edição |
| CategoriaModal | Gerenciamento de categorias |
| DeleteModal | Confirmação de exclusão |

---

## 🔗 Integração com Backend

O frontend consome uma API REST responsável pela autenticação, gerenciamento de produtos e regras de negócio.

### 🚀 Deploy Backend

```txt
https://rangoo-nest-da5w.onrender.com
```

### 📂 Repositório Backend

```txt
https://github.com/Grupo06-Turma14Js/rangoo_nest
```

##🌐 Deploy Frontend

```txt
[ PREENCHER ]
```

---

## 🚀 Instalação e Execução

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/Grupo06-Turma14Js/rangoo_react.git
```

### 2️⃣ Acesse a pasta

```bash
cd rangoo_react
```

### 3️⃣ Instale as dependências

```bash
npm install
```

### 4️⃣ Execute o projeto

```bash
npm run dev
```

### 5️⃣ Abra no navegador

```bash
http://localhost:5173
```

---

## 🎨 Destaques do Frontend

- Interface moderna e responsiva
- Experiência visual inspirada em foodtechs
- Componentes reutilizáveis
- Navegação fluida
- Estrutura escalável
- Integração com API REST
- Experiência otimizada para desktop e mobile

---

## 👩‍💻 Projeto Desenvolvido em Equipe

Projeto desenvolvido pelo **Grupo 06 — Turma 14 JavaScript da Generation Brasil**.
