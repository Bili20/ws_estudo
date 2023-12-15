import { MongoClient } from "mongodb";

const cliente = new MongoClient(process.env.DB);

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
