import { documentosColecao } from "./dbConnect.js";

function obterDocumento() {
  const documentos = documentosColecao.find().toArray();
  return documentos;
}

function adicionarDocumento(nome) {
  const resultado = documentosColecao.insertOne({
    nome: nome,
    texto: "",
  });

  return resultado;
}

function encontraDocumento(nome) {
  const documento = documentosColecao.findOne({
    nome: nome,
  });

  return documento;
}

function atualizaDocumento(nomeDocumento, texto) {
  const atualizacao = documentosColecao.updateOne(
    {
      nome: nomeDocumento,
    },
    {
      $set: {
        texto: texto,
      },
    }
  );
  return atualizacao;
}

function excluirDocumento(nome) {
  const resultado = documentosColecao.deleteOne({
    nome,
  });

  return resultado;
}

export {
  encontraDocumento,
  atualizaDocumento,
  obterDocumento,
  adicionarDocumento,
  excluirDocumento,
};
