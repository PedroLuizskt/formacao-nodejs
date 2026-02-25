
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
