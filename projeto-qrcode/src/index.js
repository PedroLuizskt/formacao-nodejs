import prompt from "prompt";
import chalk from "chalk";

import promptSchemaMain from "./prompts-schema/prompt-schema-main.js";
import createQRCode from "./services/qr-code/create.js";
import createPassword from "./services/password/create.js";

async function main() {
  console.clear();
  console.log(chalk.bgGreen.black.bold(" 📦 E-COMMERCE UTILITY KIT \n"));

  prompt.get(promptSchemaMain, async (err, choose) => {
    if (err) {
      console.log(chalk.red("\n❌ Operação cancelada."));
      return;
    }

    if (choose.select == 1) await createQRCode();
    if (choose.select == 2) await createPassword();
  });

  prompt.start();
}

main();
