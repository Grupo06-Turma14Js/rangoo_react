// ─────────────────────────────────────────────────────────────────────────────
// api.ts — Rangoo Nest
// Base: https://rangoo-nest.onrender.com
//
// Endpoints públicos (sem JWT):
//   POST /usuarios/logar
//   POST /usuarios/cadastrar
//
// Todos os demais exigem: Authorization: Bearer <token>
//
// Atenção: o backend retorna o token já com o prefixo "Bearer ",
// então armazenamos e enviamos exatamente como veio.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = "https://rangoo-nest.onrender.com";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getToken(): string | null {
  return localStorage.getItem("token");
}

function buildHeaders(auth = true): HeadersInit {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    // token já vem com "Bearer " do backend — enviamos como está
    ...(auth && token ? { Authorization: token } : {}),
  };
}

async function http<T>(
  method: string,
  path: string,
  body?: unknown,
  auth = true
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: buildHeaders(auth),
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`[${res.status}] ${msg}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : (undefined as T);
}

// ─── Enums ────────────────────────────────────────────────────────────────────

/** Deve espelhar o enum Objetivo do backend (produto.entity.ts) */
export const Objetivo = {
  EMAGRECIMENTO: "emagrecimento",
  GANHO_MASSA:   "ganho-massa",
  DIABETICO:     "diabetico",
  SEM_LACTOSE:   "sem-lactose",
  SEM_GLUTEN:    "sem-gluten",
} as const;

export type Objetivo = typeof Objetivo[keyof typeof Objetivo];

// ─── Tipos ────────────────────────────────────────────────────────────────────

/** Espelha tb_usuarios */
export interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  tipo: string;
  senha?: string;
  produto?: Produto[];
}

/** Espelha tb_categorias */
export interface Categoria {
  id: number;
  nome: string;
  descricao: string;
  produtos?: Produto[];
}

/** Espelha tb_produtos */
export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  /** decimal no banco — pode chegar como string em alguns drivers */
  preco: number;
  ativo: boolean;
  imcMin: number | null;
  imcMax: number | null;
  objetivo: Objetivo | null;
  categoria: Categoria;
  usuario: Usuario;
}

// ─── Payloads ────────────────────────────────────────────────────────────────

export interface LoginPayload {
  usuario: string;
  senha: string;
}

/** Resposta de POST /usuarios/logar */
export interface LoginResponse {
  id: number;
  nome: string;
  usuario: string;
  foto: string;
  /** token já vem com prefixo "Bearer " */
  token: string;
}

export interface UsuarioPayload {
  id?: number;
  nome: string;
  usuario: string;
  senha: string;
  foto?: string;
  /** "admin" | "user" */
  tipo: string;
}

export interface CategoriaPayload {
  id?: number;
  nome: string;
  descricao: string;
}

export interface ProdutoPayload {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  ativo: boolean;
  imcMin?: number | null;
  imcMax?: number | null;
  objetivo?: Objetivo | null;
  categoria: { id: number };
  usuario: { id: number };
}

// ─── API — Usuário ────────────────────────────────────────────────────────────

export const usuarioApi = {
  /** POST /usuarios/logar — público */
  logar: (payload: LoginPayload): Promise<LoginResponse> =>
    http("POST", "/usuarios/logar", payload, false),

  /** POST /usuarios/cadastrar — público */
  cadastrar: (payload: UsuarioPayload): Promise<Usuario> =>
    http("POST", "/usuarios/cadastrar", payload, false),

  /** GET /usuarios/all — requer JWT */
  findAll: (): Promise<Usuario[]> =>
    http("GET", "/usuarios/all"),

  /** GET /usuarios/:id — requer JWT */
  findById: (id: number): Promise<Usuario> =>
    http("GET", `/usuarios/${id}`),

  /** PUT /usuarios/atualizar — requer JWT */
  atualizar: (payload: UsuarioPayload): Promise<Usuario> =>
    http("PUT", "/usuarios/atualizar", payload),
};

// ─── API — Categoria ──────────────────────────────────────────────────────────

export const categoriaApi = {
  /** GET /categorias — requer JWT */
  findAll: (): Promise<Categoria[]> =>
    http("GET", "/categorias"),

  /** GET /categorias/:id — requer JWT */
  findById: (id: number): Promise<Categoria> =>
    http("GET", `/categorias/${id}`),

  /** POST /categorias — requer JWT */
  create: (payload: CategoriaPayload): Promise<Categoria> =>
    http("POST", "/categorias", payload),

  /** PUT /categorias — requer JWT */
  update: (payload: CategoriaPayload): Promise<Categoria> =>
    http("PUT", "/categorias", payload),

  /** DELETE /categorias/:id — requer JWT */
  delete: (id: number): Promise<{ mensagem: string }> =>
    http("DELETE", `/categorias/${id}`),
};

// ─── API — Produto ────────────────────────────────────────────────────────────

export const produtoApi = {
  /** GET /produtos — requer JWT */
  findAll: (): Promise<Produto[]> =>
    http("GET", "/produtos"),

  /** GET /produtos/:id — requer JWT */
  findById: (id: number): Promise<Produto> =>
    http("GET", `/produtos/${id}`),

  /** GET /produtos/descricao/:descricao — requer JWT */
  findByDescricao: (descricao: string): Promise<Produto[]> =>
    http("GET", `/produtos/descricao/${encodeURIComponent(descricao)}`),

  /** GET /produtos/lista/saudaveis — requer JWT */
  findSaudaveis: (): Promise<Produto[]> =>
    http("GET", "/produtos/lista/saudaveis"),

  /**
   * GET /produtos/recomendados?imc=27.3&objetivo=emagrecimento — requer JWT
   *
   * Retorna produtos ativos compatíveis com o IMC e objetivo informados.
   * A lógica de filtragem vive inteiramente no backend.
   */
  findRecomendados: (imc: number, objetivo: Objetivo): Promise<Produto[]> =>
    http("GET", `/produtos/recomendados?imc=${imc}&objetivo=${objetivo}`),

  /** POST /produtos — requer JWT */
  create: (payload: ProdutoPayload): Promise<Produto> =>
    http("POST", "/produtos", payload),

  /** PUT /produtos — requer JWT */
  update: (payload: ProdutoPayload): Promise<Produto> =>
    http("PUT", "/produtos", payload),

  /** DELETE /produtos/:id — requer JWT */
  delete: (id: number): Promise<void> =>
    http("DELETE", `/produtos/${id}`),
};

// ─── Session ──────────────────────────────────────────────────────────────────

export const session = {
  /** Salva token e dados do usuário após login bem-sucedido. */
  save: (data: LoginResponse): void => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data));
  },

  /** Remove sessão (logout). */
  clear: (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  },

  /** Retorna os dados do usuário logado ou null. */
  getUsuario: (): LoginResponse | null => {
    const raw = localStorage.getItem("usuario");
    return raw ? (JSON.parse(raw) as LoginResponse) : null;
  },

  /** Verifica se há sessão ativa. */
  isLogado: (): boolean => !!getToken(),
};