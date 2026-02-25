import chalk from "chalk";
import handle from "./handle.js";

async function createPassword() {
  console.log(chalk.green("\n🔑 Gerando nova senha segura..."));
  const password = await handle();
  console.log(chalk.bgCyan.black.bold(` SENHA GERADA: ${password} `));
}

export default createPassword;
