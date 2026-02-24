// Banco de personagens completo
const CHARACTERS = [
  { NOME: "Mario", VELOCIDADE: 4, MANOBRABILIDADE: 3, PODER: 3, PONTOS: 0 },
  { NOME: "Peach", VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 2, PONTOS: 0 },
  { NOME: "Yoshi", VELOCIDADE: 2, MANOBRABILIDADE: 4, PODER: 3, PONTOS: 0 },
  { NOME: "Bowser", VELOCIDADE: 5, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 },
  { NOME: "Luigi", VELOCIDADE: 3, MANOBRABILIDADE: 4, PODER: 4, PONTOS: 0 },
  { NOME: "Donkey Kong", VELOCIDADE: 2, MANOBRABILIDADE: 2, PODER: 5, PONTOS: 0 },
];

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  if (random < 0.33) return "RETA";
  if (random < 0.66) return "CURVA";
  return "CONFRONTO";
}

async function getRandomConfrontationItem() {
  // 50% de chance de casco (-1) ou bomba (-2)
  return Math.random() < 0.5 
    ? { nome: "CASCO 🐢", dano: 1 } 
    : { nome: "BOMBA 💣", dano: 2 };
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playRaceEngine(racers) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 Rodada ${round}`);
    
    let block = await getRandomBlock();
    console.log(`Bloco da vez: ${block}`);

    // Armazena os resultados da rodada para todos os jogadores
    let roundResults = [];

    for (let player of racers) {
      let diceResult = await rollDice();
      let attributeValue = 0;
      let attributeName = "";

      if (block === "RETA") {
        attributeValue = player.VELOCIDADE;
        attributeName = "velocidade";
      } else if (block === "CURVA") {
        attributeValue = player.MANOBRABILIDADE;
        attributeName = "manobrabilidade";
      } else {
        attributeValue = player.PODER;
        attributeName = "poder";
      }

      let total = diceResult + attributeValue;
      roundResults.push({ player, total });

      await logRollResult(player.NOME, attributeName, diceResult, attributeValue);
    }

    // Ordena do maior para o menor resultado
    roundResults.sort((a, b) => b.total - a.total);

    if (block === "RETA" || block === "CURVA") {
      // Pega a maior nota
      let highestScore = roundResults[0].total;
      
      // Todos que tiraram a maior nota ganham ponto (trata empates)
      let winners = roundResults.filter(r => r.total === highestScore);
      
      winners.forEach(w => {
        console.log(`🌟 ${w.player.NOME} marcou um ponto!`);
        w.player.PONTOS++;
      });
    }

    if (block === "CONFRONTO") {
      let winner = roundResults[0].player;
      let loser = roundResults[roundResults.length - 1].player;

      console.log(`\n🥊 CONFRONTO! ${winner.NOME} dominou a pista, e ${loser.NOME} ficou para trás!`);

      // Lógica do item contra o perdedor
      let item = await getRandomConfrontationItem();
      if (loser.PONTOS > 0) {
        loser.PONTOS = Math.max(0, loser.PONTOS - item.dano);
        console.log(`💥 ${loser.NOME} foi atingido por um(a) ${item.nome} e perdeu ${item.dano} ponto(s)!`);
      } else {
        console.log(`🛡️ ${loser.NOME} foi atingido por um(a) ${item.nome}, mas já estava com 0 pontos.`);
      }

      // Lógica do turbo para o vencedor
      let getsTurbo = Math.random() < 0.5; // 50% de chance
      if (getsTurbo) {
        winner.PONTOS++;
        console.log(`🔥 Acelerou! ${winner.NOME} pegou um TURBO e ganhou 1 ponto extra!`);
      }
    }

    console.log("-----------------------------");
  }
}

async function declareWinner(racers) {
  console.log("\n📊 Resultado final:");
  
  // Ordena placar final
  racers.sort((a, b) => b.PONTOS - a.PONTOS);

  racers.forEach(racer => {
    console.log(`${racer.NOME}: ${racer.PONTOS} ponto(s)`);
  });

  let highestPoints = racers[0].PONTOS;
  let champions = racers.filter(r => r.PONTOS === highestPoints);

  if (champions.length === 1) {
    console.log(`\n🏆 ${champions[0].NOME} venceu a corrida! Parabéns!`);
  } else {
    let names = champions.map(c => c.NOME).join(" e ");
    console.log(`\n🎌 A corrida terminou em um EMPATE técnico entre: ${names}!`);
  }
}

(async function main() {
  // Escolhendo 4 jogadores para a corrida
  const activeRacers = [
    CHARACTERS[0], // Mario
    CHARACTERS[3], // Bowser
    CHARACTERS[4], // Luigi
    CHARACTERS[1]  // Peach
  ];

  let namesList = activeRacers.map(r => r.NOME).join(", ");
  console.log(`🚨🏁 Corrida entre ${namesList} começando...\n`);

  await playRaceEngine(activeRacers);
  await declareWinner(activeRacers);
})();
