<sub>Desenvolvido para evolução técnica por <a href="https://github.com/PedroLuizskt">Pedro Luiz</a></sub>
</div>
<div align="center">
<img width="100%" src="https://capsule-render.vercel.app/api?type=waving&color=26a62f&height=120&section=header"/>
  
  <a href="https://github.com/PedroLuizskt">
    <img src="https://readme-typing-svg.herokuapp.com/?color=339933&size=35&center=true&vCenter=true&width=1000&lines=Bootcamp+Backend+Development;Node.js+Terminal+Engines;Java+Enterprise+Ecosystem&duration=4000&pause=1000" alt="Typing SVG" />
  </a>
</div>

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)

</div>

---

## 🚀 Sobre o Repositório

Este repositório é dedicado ao desenvolvimento e versionamento dos desafios técnicos propostos no Bootcamp de Backend (Node.js & Java). O objetivo arquitetural aqui é construir, iterar e otimizar lógicas de backend, simulando cenários reais de engenharia de software, manipulação de dados e regras de negócio.

A cada novo módulo, um novo projeto será integrado, escalando a complexidade das soluções — desde motores de simulação no terminal com JavaScript até APIs robustas.

---

<br>

<div align="center">
  <img src="03-projeto-mario-kart/docs/header.gif" width="600px" style="border-radius: 10px; box-shadow: 0px 0px 20px rgba(51, 153, 51, 0.4);"/>
</div>

## 🏎️ Desafio de Projeto: Simulador de Corridas do Mario Kart com Node.js

O primeiro desafio consiste em um simulador de corridas focado inteiramente na construção do **Motor Lógico (Engine)** via terminal. O projeto original propunha uma corrida assíncrona entre dois personagens. 

**O Desafio de Engenharia:** Evoluir a lógica para suportar múltiplos competidores simultâneos (escalabilidade de escopo), gerenciar eventos probabilísticos complexos e garantir a integridade dos dados (prevenção de pontuações negativas e tratamento rigoroso de empates técnicos).

### ⚙️ A Engenharia por Trás do Código

O motor não possui interface gráfica; a imersão ocorre pelo processamento matemático e retorno via console.

#### 1. Arquitetura de Entidades e Loop Assíncrono
Os personagens são armazenados em um vetor de objetos estáticos. O loop de corrida (`playRaceEngine`) utiliza controle de fluxo assíncrono (`async/await`) para simular o tempo de processamento e a "rolagem dos dados" de forma sequencial para todos os jogadores ativos.

#### 2. Resolução de Conflitos e Ordenação Vetorial
Diferente da estrutura `if/else` engessada para dois jogadores, o motor implementa ordenação dinâmica de arrays (`Array.prototype.sort`) a cada rodada. 

```javascript
// O cálculo define o vencedor e o perdedor da rodada com base em ordenação decrescente:
roundResults.sort((a, b) => b.total - a.total);
let winner = roundResults[0].player;
let loser = roundResults[roundResults.length - 1].player;

```

Isso permite que a engine receba *N* jogadores sem quebrar a lógica de negócio. Empates no topo da tabela são filtrados e computados para que todos os líderes da rodada pontuem adequadamente.

#### 3. Distribuição Probabilística de Itens

Durante o bloco de `CONFRONTO`, a lógica probabilística (utilizando `Math.random()`) define o peso da punição e a chance de bonificação:

* **Perdedor:** 50% de chance de impacto leve (Casco: -1pt) ou crítico (Bomba: -2pts). O sistema utiliza `Math.max(0, valor)` para garantir a integridade da regra de limite zero.
* **Vencedor:** Benefício volátil com 50% de chance de receber um *Turbo* (+1pt).

---

### 🛠️ Estrutura do Projeto

```text
📦 03-projeto-mario-kart
 ┣ 📂 docs               # Assets visuais (gifs de personagens)
 ┣ 📂 src
 ┃ ┗ 📜 index.js         # Motor principal de simulação e regras de negócio
 ┣ 📜 package.json       # Configuração do ambiente Node
 ┗ 📜 extras.md          # Anotações adicionais e escopo original

```

### 🎮 Como Executar a Simulação

Este projeto foi construído nativamente em **Node.js**.

1. **Acesse o diretório do projeto:**

```bash
cd 03-projeto-mario-kart

```

2. **Execute o motor lógico:**

```bash
node src/index.js

```

3. **Resultado Esperado:**
O terminal irá processar os blocos (Retas, Curvas e Confrontos), aplicar a mecânica de dados e itens, e exibir o placar final ordenado dos 4 competidores simultâneos.

---

<div align="center">
<img src="03-projeto-mario-kart/docs/mario.gif" width="50px" /> <img src="03-projeto-mario-kart/docs/bowser.gif" width="50px" />

---

</div>

<br>

## 🛒 Desafio de Projeto: Motor de Carrinho de Compras (Shopee)

O segundo desafio focou na construção de um motor de carrinho de compras executado inteiramente no terminal, inspirado na lógica de backend de grandes e-commerces. 

**O Desafio de Engenharia:** Desenvolver um sistema de gerenciamento de estado confiável para itens mutáveis, modularizar a aplicação separando regras de negócio e garantir a consistência matemática dos subtotais, evitando duplicação de dados em memória.

### ⚙️ A Engenharia por Trás do Código

A arquitetura foi desenhada separando as responsabilidades (Service Pattern) utilizando ES Modules nativos do Node.js (`import/export`).

#### 1. Correção de Escopo Léxico (O Problema do Estado Estático)
A implementação base sofria de um bug de estado: o subtotal de um item era calculado e "congelado" apenas no momento de sua criação. A solução foi alterar a função de cálculo para devolver o controle do contexto dinâmico ao `this` dentro do objeto:

```javascript
// A função tradicional garante que 'this.quantity' pegue o valor atualizado no momento da chamada
subtotal: function () {
  return this.price * this.quantity;
}

```

Isso garante que incrementos ou remoções de itens no carrinho reflitam instantaneamente no valor final, sem a necessidade de recalcular manualmente a cada alteração.

#### 2. Mutação Inteligente de Arrays (Prevenção de Duplicação)

Para evitar que o mesmo produto crie múltiplas linhas no carrinho — o que geraria desperdício de memória e má usabilidade —, a função `addItem` foi refatorada. Utilizei `Array.prototype.findIndex` para buscar a existência prévia do item. Se o item já existe, a engine apenas incrementa a propriedade `quantity`; caso contrário, injeta um novo registro (`push`).

#### 3. Formatação e Precisão Financeira

Lidar com operações de ponto flutuante em JavaScript pode gerar dízimas indesejadas. Implementei o tratamento com `Number.prototype.toFixed(2)` em toda a camada de visualização para garantir o padrão monetário real (ex: `R$ 20.99`), além de aplicar um `reduce` otimizado para a soma do valor global da compra, formatando a saída final como um cupom fiscal no terminal.

---

### 🛠️ Estrutura do Projeto

```text
📦 06-shopee-cart
 ┣ 📂 src
 ┃ ┣ 📂 services
 ┃ ┃ ┣ 📜 cart.js    # Lógica de manipulação do array, buscas e cálculos
 ┃ ┃ ┗ 📜 item.js    # Fábrica de objetos (Factory Pattern)
 ┃ ┗ 📜 index.js     # Ponto de entrada e execução da simulação
 ┗ 📜 package.json   # Configuração de ambiente e definição de módulo (ESM)

```

### 🎮 Como Executar a Simulação

1. **Acesse o diretório do projeto:**

```bash
cd 06-shopee-cart

```

2. **Execute o motor:**

```bash
node src/index.js

```

3. **Resultado Esperado:**
O terminal exibirá a lista de produtos unificada, com os cálculos de subtotais corrigidos de acordo com a quantidade, e o valor total formatado rigorosamente em moeda (R$).

---

<br>

<div align="center">
  <img src="projeto-qrcode/docs/Captura de tela 2026-02-25 150450.png" width="600px" style="border-radius: 10px; box-shadow: 0px 0px 20px rgba(51, 153, 51, 0.4);"/>
</div>

<br>

## 🔲 Desafio de Projeto: Criando um Gerador de QR Codes para E-commerces com Node.js

O terceiro desafio baseou-se na construção de um utilitário de terminal em Node.js focado na produtividade de e-commerces. A aplicação permite a geração rápida de QR Codes para links de produtos e a criação de senhas seguras, sem a necessidade de uma interface gráfica complexa.

**O Desafio de Engenharia:** Consolidar uma ferramenta robusta validando estritamente os *inputs* do usuário, lidar de forma segura com variáveis de ambiente e entregar uma UI/UX limpa e profissional diretamente no console.

### ⚙️ A Engenharia por Trás do Código

O projeto faz uso intenso de módulos interativos e arquitetura baseada em serviços, com o Node.js lendo arquivos `.env` nativamente (flag `--env-file`).

#### 1. Validação Estrita de Inputs (Expressões Regulares)
A implementação original de validação possuía uma falha silenciosa no *Regex* (`/^[1-2]+$/`), que permitia a passagem de valores repetidos como `11` ou `22`. A regra foi corrigida para uma verificação de caractere único estrita:

```javascript
// O padrão agora exige exatamente o dígito 1 ou 2, ancorado no início (^) e fim ($) da string.
pattern: /^[1-2]$/, 

```

Isso garante que o menu não quebre o fluxo da aplicação caso o usuário digite números duplicados acidentalmente.

#### 2. Resiliência e Prevenção de Falhas (Fallback de Segurança)

A geração de senhas baseia-se em regras de um arquivo `.env`. Contudo, um desenvolvedor ou usuário desatento poderia configurar todas as flags para `false` ou ter um `.env` ausente, o que geraria um *crash* por falta de caracteres para o cálculo matemático. Para mitigar isso, implementei um sistema de *fallback*:

```javascript
// Trava de segurança: Previne colapso da aplicação
if (permitted.length === 0) {
  console.log("⚠️ Nenhuma regra ativa no .env! Usando letras minúsculas por padrão.");
  permitted.push(..."abcdefghijklmnopqrstuvwxyz");
}

```

Isso garante a disponibilidade contínua do software, mesmo diante de má configuração de infraestrutura.

#### 3. UX/UI de Terminal (Formatação e Legibilidade)

Utilizei a biblioteca `chalk` para estruturar a legibilidade dos menus. Adicionei cabeçalhos em formato de blocos (`bgGreen.black.bold`) e limpei a estrutura de perguntas para entregar uma experiência que lembra painéis administrativos profissionais de CLI (Command Line Interface).

---

### 🛠️ Estrutura do Projeto

```text
📦 projeto-qrcode
 ┣ 📂 docs                   # Capturas de tela e diagramas de arquitetura
 ┣ 📂 src
 ┃ ┣ 📂 prompts-schema       # Regras de validação de input (Regex e mensagens)
 ┃ ┣ 📂 services
 ┃ ┃ ┣ 📂 password           # Motor de geração aleatória e regras (.env)
 ┃ ┃ ┗ 📂 qr-code            # Motor de conversão de URL para matriz no terminal
 ┃ ┗ 📜 index.js             # Ponto de entrada (Menu CLI)
 ┣ 📜 .env                   # Configurações de comprimento e tipos de caracteres da senha
 ┗ 📜 package.json           # Configuração de ambiente e scripts (ESM)

```

### 🎮 Como Executar a Ferramenta

1. **Acesse o diretório do projeto:**

```bash
cd projeto-qrcode

```

2. **Instale as dependências da aplicação:**

```bash
npm install

```

3. **Execute o painel interativo:**

```bash
npm start

```



4. **Resultado Esperado:**
O terminal abrirá um menu interativo e colorido perguntando se você deseja gerar um QR Code a partir de uma URL ou gerar uma senha segura baseada nas regras do arquivo `.env`.

---

<br>

## 🎧 Desafio de Projeto: Gerenciador de Podcasts - API NodeJS Com Typescript e HTTP Module

Diferente dos projetos anteriores que residem neste monorepo, o quarto desafio exigiu uma arquitetura escalável e foi movido para um **repositório independente**. O foco foi construir uma API RESTful do zero, utilizando Node.js puro e TypeScript, sem a abstração de frameworks externos (como Express ou Fastify).

**O Desafio de Engenharia:** Aplicar conceitos de *Clean Architecture* em um servidor HTTP nativo, garantindo tipagem estrita, separação de responsabilidades (MSC), segurança de acesso via rede (CORS) e tratamento elegante de rotas inexistentes (Fallback 404). O domínio da aplicação centraliza a curadoria de podcasts de alto nível intelectual (Astrofísica, Biologia Evolutiva e Teoria Musical).

### ⚙️ A Engenharia por Trás do Código

#### 1. Roteamento Nativo e Desacoplamento
A inicialização do servidor (`server.ts`) foi isolada da lógica de roteamento (`app.ts`). O motor de rotas inspeciona manualmente as URLs e os verbos HTTP (`GET`, `OPTIONS`) para delegar o processamento aos *Controllers*, simulando a arquitetura interna de um framework profissional.

#### 2. Segurança de Interface (CORS e Tratamento 404)
Para permitir o consumo seguro por aplicações Front-end de domínios distintos, cabeçalhos de CORS (`Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`) foram injetados no ciclo de vida da requisição. Além disso, uma rota universal foi criada para capturar requisições inválidas e retornar um JSON formatado com HTTP Status 404, evitando travamentos no cliente.

#### 3. Higienização de Queries
Para suportar buscas flexíveis e com espaços (ex: `teoria musical`), a camada de serviços utiliza `decodeURIComponent`. Isso garante que parâmetros de URL encodados sejam limpos e validados antes de atingirem a camada de dados (Repository).

---

### 🔗 Acesso ao Repositório Oficial

Este projeto possui sua própria estrutura de configuração, TypeScript e documentação isolada. Você pode conferir o código-fonte, a estrutura MSC e as instruções de uso diretamente no link abaixo:

[![Acessar PodManager API](https://img.shields.io/badge/Acessar_Repositório-PodManager_API-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/PedroLuizskt/node-ts-webapi-without-frameworks-podcast-manager/tree/main)

---

## 🏎️ Projeto: Criando uma Minimal API da Fórmula 1 com Node.js e Fastify

O quinto desafio do bootcamp introduziu o desenvolvimento de microserviços focados em altíssima performance e baixo *overhead*. Para isso, o projeto utiliza Node.js aliado ao framework **Fastify**, reconhecido como um dos web frameworks mais rápidos do ecossistema JavaScript.

**O Desafio de Engenharia:** Evoluir uma API base de leitura simples para um CRUD funcional (Create, Read, Update, Delete) operando em memória. O objetivo foi aplicar tipagem estrita de requisições, injeção correta de variáveis de ambiente e segurança de rede, mantendo o código minimalista em um único arquivo de inicialização.

### ⚙️ A Engenharia por Trás do Código

#### 1. Evolução para CRUD e Integridade de Dados
O código original foi refatorado para suportar mutações de estado e corrigir falhas de integridade (IDs duplicados na base estática). Implementei a rota `POST` para criação de novos pilotos, contendo uma lógica matemática simples de auto-incremento dinâmico (`drivers[drivers.length - 1].id + 1`). A rota `DELETE` foi arquitetada utilizando `Array.prototype.findIndex` para garantir a remoção exata do registro na memória.

#### 2. Tipagem Estrita de Payloads (Interfaces TypeScript)
Para evitar falhas de execução (Runtime Errors), as rotas mutáveis foram blindadas com TypeScript. Utilizei a injeção de genéricos na declaração das rotas do Fastify (`server.post<{ Body: DriverBody }>`), acoplando *Interfaces* personalizadas que obrigam o cliente a enviar os dados no formato exato (`name` e `team`), retornando automaticamente o `HTTP Status 400 (Bad Request)` em caso de falha.

#### 3. Alta Performance, CORS e Variáveis de Ambiente
Para garantir que a API pudesse ser consumida por aplicações Front-end, o plugin `@fastify/cors` foi configurado na inicialização do servidor. Além disso, a porta de rede, que antes estava engessada no código, passou a ser consumida dinamicamente via arquivo `.env` nativo do Node.js, com um *fallback* seguro para a porta 3333.

---

### 🛠️ Estrutura do Projeto

```text
📦 project-formula-1
 ┗ 📂 node-f1
   ┣ 📂 src
   ┃ ┗ 📜 server.ts      # Instância do Fastify, banco em memória e rotas CRUD
   ┣ 📜 .env             # Configuração da porta da API
   ┣ 📜 package.json     # Scripts de execução (tsx e tsup)
   ┗ 📜 tsconfig.json    # Configuração de compilação

```

### 🎮 Como Executar a API Localmente

1. **Acesse o diretório específico do projeto:**

```bash
cd project-formula-1/node-f1

```

2. **Instale as dependências (Fastify, CORS, TypeScript):**

```bash
npm install

```

3. **Inicie o servidor em modo Watch (atualização em tempo real):**

```bash
npm run start:watch

```

4. **Testando os Endpoints (via Postman/Insomnia):**
* **Listar Equipes:** `GET http://localhost:3333/teams`
* **Listar Pilotos:** `GET http://localhost:3333/drivers`
* **Criar Piloto:** `POST http://localhost:3333/drivers` (Enviar JSON com `name` e `team`)
* **Deletar Piloto:** `DELETE http://localhost:3333/drivers/1`

