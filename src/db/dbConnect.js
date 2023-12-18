import { MongoClient } from "mongodb";

const cliente = new MongoClient(
  "mongodb+srv://admin:admin123@cluster0.rck1fvl.mongodb.net/?retryWrites=true&w=majority"
);
let documentosColecao;

try {
  await cliente.connect();

  const db = cliente.db("websocket");
  documentosColecao = db.collection("documentos");

  console.log("conectado com sucesso");
} catch (e) {
  console.log(e);
}
export { documentosColecao };
