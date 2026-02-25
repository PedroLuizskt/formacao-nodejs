
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
