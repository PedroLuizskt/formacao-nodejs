import chalk from "chalk";

const promptSchemaMain = [
  {
    name: "select",
    description: chalk.yellow.bold(
      "Escolha a ferramenta: [1] - GERAR QRCODE ou [2] - GERAR SENHA"
    ),
    pattern: /^[1-2]$/, // Correção: Exige exatamente 1 ou 2, sem repetições
    message: chalk.red.italic("Escolha apenas entre as opções 1 e 2."),
    required: true,
  },
];

export default promptSchemaMain;
