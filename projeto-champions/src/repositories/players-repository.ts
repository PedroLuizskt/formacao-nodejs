import { PlayerModel } from "../models/player-model";
import { StatisticsModel } from "../models/statistics-model";

const database: PlayerModel[] = [
  {
    id: 1, name: "Lionel Messi", club: "Paris Saint-Germain", nationality: "Argentina", position: "Forward",
    statistics: { Overall: 93, Pace: 85, Shooting: 94, Passing: 91, Dribbling: 95, Defending: 38, Physical: 65 },
  },
  {
    id: 2, name: "Cristiano Ronaldo", club: "Manchester United", nationality: "Portugal", position: "Forward",
    statistics: { Overall: 92, Pace: 89, Shooting: 93, Passing: 82, Dribbling: 88, Defending: 35, Physical: 78 },
  },
  {
    id: 3, name: "Robert Lewandowski", club: "Bayern Munich", nationality: "Poland", position: "Forward",
    statistics: { Overall: 91, Pace: 80, Shooting: 92, Passing: 78, Dribbling: 83, Defending: 40, Physical: 84 },
  },
  {
    id: 4, name: "Kevin De Bruyne", club: "Manchester City", nationality: "Belgium", position: "Midfielder",
    statistics: { Overall: 91, Pace: 76, Shooting: 85, Passing: 92, Dribbling: 87, Defending: 62, Physical: 79 },
  },
  {
    id: 5, name: "Kylian Mbappé", club: "Paris Saint-Germain", nationality: "France", position: "Forward",
    statistics: { Overall: 90, Pace: 96, Shooting: 86, Passing: 79, Dribbling: 91, Defending: 39, Physical: 76 },
  }
];

export const findAllPlayers = async (): Promise<PlayerModel[]> => {
  return database;
};

export const findPlayerById = async (id: number): Promise<PlayerModel | undefined> => {
  return database.find((player) => player.id === id);
};

export const insertPlayer = async (player: PlayerModel) => {
  database.push(player);
};

export const deleteOnePlayer = async (id: number) => {
  const index = database.findIndex((p) => p.id === id);
  if (index !== -1) {
    database.splice(index, 1);
    return true;
  }
  return false;
};

// CORREÇÃO: Previne crash caso o ID não seja encontrado, retornando undefined
export const findAndModifyPlayer = async (
  id: number,
  statistics: StatisticsModel
): Promise<PlayerModel | undefined> => {
  const playerIndex = database.findIndex((player) => player.id === id);

  if (playerIndex !== -1) {
    database[playerIndex].statistics = statistics;
    return database[playerIndex];
  }

  return undefined; 
};
