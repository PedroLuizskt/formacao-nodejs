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
