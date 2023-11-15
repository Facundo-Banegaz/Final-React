import express from "express";
import morgan from "morgan";
import cors from "cors";


// Routes
import RutaArticulos from "./Routes/routesArticulos";
import RutaMarcas from "./Routes/routesMarcas";
import RutaCategorias from "./Routes/routesCategorias";

const app = express();
app.use(cors());
// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));

app.use(express.json());


app.use("/api/articulos", RutaArticulos);

app.use("/api/categorias", RutaCategorias);

app.use("/api/marcas", RutaMarcas);


export default app;