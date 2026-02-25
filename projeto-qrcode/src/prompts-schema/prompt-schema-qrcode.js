import chalk from "chalk";

const promptSchemaQRCode = [
  {
    name: "link",
    description: chalk.yellow("Digite o link (URL) para gerar o QR CODE"),
    required: true,
  },
  {
    name: "type",
    description: chalk.yellow(
      "Escolha o tipo de QR Code: [1] - NORMAL ou [2] - TERMINAL (Versão Reduzida)"
    ),
    pattern: /^[1-2]$/, // Correção do Regex
    message: chalk.red.italic("Escolha apenas entre as opções 1 e 2."),
    required: true,
  },
];

export default promptSchemaQRCode;
