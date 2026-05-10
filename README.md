# Projeto DevOps com Testes Automatizados

Projeto completo para demonstrar práticas DevOps utilizando:

- Testes Unitários
- Testes de Integração
- Testes de Performance
- Integração Contínua (CI)
- GitHub Actions

O objetivo deste projeto é ensinar como automatizar validações de software em um pipeline DevOps moderno.

---

# Objetivos do Projeto

Este projeto demonstra:

- criação de uma API simples em Node.js;
- implementação de testes automatizados;
- configuração de pipeline CI/CD;
- execução automática dos testes a cada commit;
- integração entre desenvolvimento e automação.

---

# Tecnologias Utilizadas

## Backend

- Node.js
- Express

## Testes

- Jest
- Supertest
- Autocannon

## DevOps

- GitHub Actions

---

# Conceitos Demonstrados

## Testes Unitários

Validam pequenas partes isoladas do código.

Exemplo:
- funções;
- métodos;
- cálculos.

---

## Testes de Integração

Validam comunicação entre módulos e serviços.

Exemplo:
- API;
- banco de dados;
- autenticação.

---

## Testes de Performance

Avaliam:
- velocidade;
- estabilidade;
- capacidade de resposta.

---

## Integração Contínua (CI)

A cada commit:
1. O código é validado;
2. Dependências são instaladas;
3. Todos os testes são executados automaticamente.

---

# Pré-requisitos

Instale:

- Node.js
- Git
- Conta no GitHub

---

# Passo 1 — Criar a pasta do projeto

```bash
mkdir projeto-devops-testes

cd projeto-devops-testes
```

---

# Passo 2 — Inicializar projeto Node.js

```bash
npm init -y
```

---

# Passo 3 — Instalar dependências

## Dependência principal

```bash
npm install express
```

## Dependências de testes

```bash
npm install --save-dev jest

npm install --save-dev supertest

npm install --save-dev autocannon
```

---

# Passo 4 — Estrutura do projeto

Crie a seguinte estrutura:

```text
projeto-devops-testes/
│
├── src/
│   ├── app.js
│   └── math.js
│
├── tests/
│   ├── unit/
│   │   └── math.test.js
│   │
│   ├── integration/
│   │   └── app.test.js
│   │
│   └── performance/
│       └── performance.test.js
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .gitignore
├── package.json
└── README.md
```

---

# Passo 5 — Criar arquivo .gitignore

Arquivo:

```text
.gitignore
```

Conteúdo:

```text
node_modules
```

---

# Passo 6 — Criar aplicação

## Arquivo: src/math.js

```javascript
function sum(a, b) {

  return a + b;

}

module.exports = { sum };
```

---

## Arquivo: src/app.js

```javascript
const express = require('express');

const app = express();

app.get('/', (req, res) => {

  res.json({
    message: 'API funcionando'
  });

});

module.exports = app;
```

---

# Passo 7 — Configurar package.json

Edite o arquivo:

```json
{
  "scripts": {
    "test": "jest"
  },
  "dependencies": {
    "express": "^5.2.1"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "autocannon": "^8.0.0",
    "supertest": "^7.2.2"
  }
}
```

---

# Passo 8 — Criar teste unitário

## Arquivo

```text
tests/unit/math.test.js
```

## Código

```javascript
const { sum } = require('../../src/math');

describe('Teste Unitário', () => {

  test('deve somar dois números', () => {

    expect(sum(2, 3)).toBe(5);

  });

});
```

---

# Passo 9 — Criar teste de integração

## Arquivo

```text
tests/integration/app.test.js
```

## Código

```javascript
const request = require('supertest');

const app = require('../../src/app');

describe('Teste de Integração', () => {

  test('GET / deve retornar status 200', async () => {

    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);

    expect(response.body.message)
      .toBe('API funcionando');

  });

});
```

---

# Passo 10 — Criar teste de performance

## Arquivo

```text
tests/performance/performance.test.js
```

## Código

```javascript
jest.setTimeout(15000);

const autocannon = require('autocannon');

const app = require('../../src/app');

let server;

beforeAll(() => {

  server = app.listen(3000);

});

afterAll(() => {

  server.close();

});

describe('Teste de Performance', () => {

  test('deve responder rapidamente', async () => {

    const result = await autocannon({

      url: 'http://localhost:3000',

      connections: 10,

      duration: 5

    });

    expect(result.requests.average)
      .toBeGreaterThan(0);

  });

});
```

---

# Passo 11 — Executar testes localmente

```bash
npm test
```

---

# Resultado esperado

```text
PASS tests/unit/math.test.js
PASS tests/integration/app.test.js
PASS tests/performance/performance.test.js
```

---

# Passo 12 — Criar repositório no GitHub

Acesse:

https://github.com

Crie um novo repositório chamado:

```text
projeto-devops-testes
```

---

# Passo 13 — Conectar projeto ao GitHub

```bash
git init

git add .

git commit -m "Projeto inicial"

git branch -M main

git remote add origin URL_DO_REPOSITORIO

git push -u origin main
```

---

# Passo 14 — Criar pipeline GitHub Actions

Crie o arquivo:

```text
.github/workflows/ci.yml
```

---

# Conteúdo da pipeline

```yaml
name: CI Pipeline

on:

  push:
    branches:
      - main

  pull_request:
    branches:
      - main

jobs:

  tests:

    runs-on: ubuntu-latest

    steps:

      - name: Checkout do código
        uses: actions/checkout@v3

      - name: Configurar Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Instalar dependências
        run: npm install

      - name: Executar testes
        run: npm test
```

---

# Passo 15 — Enviar pipeline

```bash
git add .

git commit -m "Adiciona pipeline CI"

git push
```

---

# Passo 16 — Verificar execução

No GitHub:

1. Abra o repositório
2. Clique em "Actions"
3. Verifique execução da pipeline

---

# Fluxo automatizado

```text
Commit
   ↓
GitHub Actions
   ↓
npm install
   ↓
Testes Unitários
   ↓
Testes Integração
   ↓
Testes Performance
   ↓
Resultado da pipeline
```

---

# O que este projeto demonstra

Este projeto implementa:

- Integração Contínua (CI)
- Automação de testes
- Testes Unitários
- Testes de Integração
- Testes de Performance
- Pipeline DevOps
- GitHub Actions

---

# Benefícios da abordagem DevOps

- Detecção rápida de erros
- Menor retrabalho
- Maior qualidade
- Entregas mais confiáveis
- Automatização do processo
- Feedback contínuo

---

# Problemas comuns e soluções

## Erro: jest permission denied

Solução:

```bash
rm -rf node_modules

npm install
```

---

## Erro: timeout exceeded

Solução:

```javascript
jest.setTimeout(15000);
```

---