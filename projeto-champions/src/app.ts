import express from "express";
import router from "./routes";
import cors from "cors";

function createApp() {
  const app = express();

  app.use(express.json());
  
  app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PATCH", "DELETE"],
  }));

  app.use("/api", router);

   
  // Sem um path definido, este middleware captura naturalmente tudo o que o router acima não resolveu.
  app.use((req, res) => {
    res.status(404).json({ message: "Rota não encontrada na API da Champions League." });
  });

  return app;
}

export default createApp;
