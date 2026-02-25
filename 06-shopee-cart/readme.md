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
