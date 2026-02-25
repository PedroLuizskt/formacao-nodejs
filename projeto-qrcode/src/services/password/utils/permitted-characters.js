import chalk from "chalk";

async function permittedCharacters() {
  let permitted = [];

  if (process.env.UPPERCASE_LETTERS === "true")
    permitted.push(..."ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  if (process.env.LOWERCASE_LETTERS === "true")
    permitted.push(..."abcdefghijklmnopqrstuvwxyz");

  if (process.env.NUMBERS === "true") 
    permitted.push(..."0123456789");

  if (process.env.SPECIAL_CHARACTERS === "true")
    permitted.push(..."!@#$%^&*()-_");

  // Trava de segurança: Previne que a array fique vazia se tudo no .env for false
  if (permitted.length === 0) {
    console.log(chalk.red("\n⚠️ Nenhuma regra ativa no .env! Usando letras minúsculas por padrão."));
    permitted.push(..."abcdefghijklmnopqrstuvwxyz");
  }

  return permitted;
}

export default permittedCharacters;
