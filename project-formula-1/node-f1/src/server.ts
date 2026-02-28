import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });

server.register(cors, {
  origin: "*",
});

const teams = [
  { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
  { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
  { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
  { id: 4, name: "Ferrari", base: "Maranello, Italy" },
  { id: 5, name: "Alpine", base: "Enstone, United Kingdom" },
  { id: 6, name: "Aston Martin", base: "Silverstone, United Kingdom" },
  { id: 7, name: "Alfa Romeo Racing", base: "Hinwil, Switzerland" },
  { id: 8, name: "AlphaTauri", base: "Faenza, Italy" },
  { id: 9, name: "Williams", base: "Grove, United Kingdom" },
  { id: 10, name: "Haas", base: "Kannapolis, United States" }
];

const drivers = [
  { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
  { id: 2, name: "Lewis Hamilton", team: "Ferrari" },
  { id: 3, name: "Lando Norris", team: "McLaren" }, // Correção: id 3
];

// --- ROTAS DE LEITURA (GET) ---

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200);
  return { teams };
});

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200);
  return { drivers };
});

interface DriverParams {
  id: string;
}

server.get<{ Params: DriverParams }>("/drivers/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  const driver = drivers.find((d) => d.id === id);

  if (!driver) {
    response.type("application/json").code(404);
    return { message: "Driver Not Found" };
  } else {
    response.type("application/json").code(200);
    return { driver };
  }
});

// --- ROTAS DE ESCRITA (POST / DELETE) ---

interface DriverBody {
  name: string;
  team: string;
}

server.post<{ Body: DriverBody }>("/drivers", async (request, response) => {
  const { name, team } = request.body;

  if (!name || !team) {
    response.code(400);
    return { message: "Bad Request: 'name' and 'team' are required." };
  }

  const newDriver = {
    id: drivers.length > 0 ? drivers[drivers.length - 1].id + 1 : 1, // Auto-incremento simples
    name,
    team
  };

  drivers.push(newDriver);
  response.type("application/json").code(201); // 201 Created
  return { message: "Driver created successfully", driver: newDriver };
});

server.delete<{ Params: DriverParams }>("/drivers/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  const driverIndex = drivers.findIndex((d) => d.id === id);

  if (driverIndex === -1) {
    response.type("application/json").code(404);
    return { message: "Driver Not Found" };
  }

  drivers.splice(driverIndex, 1);
  response.type("application/json").code(200);
  return { message: "Driver deleted successfully" };
});

// --- INICIALIZAÇÃO DO SERVIDOR ---

// Usa a porta do .env ou fallback para 3333
const port = process.env.PORT ? parseInt(process.env.PORT) : 3333;

server.listen({ port }, () => {
  console.log(`🏎️  F1 API Server running on port ${port}`);
});
