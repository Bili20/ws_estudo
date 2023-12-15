import {
  encontraDocumento,
  atualizaDocumento,
  obterDocumento,
  adicionarDocumento,
  excluirDocumento,
} from "./documentosDb.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
  socket.on("obter_documentos", async (devolverDocumentos) => {
    const documentos = await obterDocumento();

    devolverDocumentos(documentos);
  });

  socket.on("adicionar_documento", async (nome) => {
    const documentoExiste = (await encontraDocumento(nome)) !== null;

    if (documentoExiste) {
      socket.emit("documento_existente", nome);
    } else {
      const resultado = await adicionarDocumento(nome);

      if (resultado.acknowledged) {
        io.emit("adicionar_documento_interface", nome);
      }
    }
  });

  socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
    socket.join(nomeDocumento);
    const documento = await encontraDocumento(nomeDocumento);

    if (documento) {
      //socket.emit("texto_documento", documento.texto);
      devolverTexto(documento.texto);
    }
  });

  socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
    const atualizacao = await atualizaDocumento(nomeDocumento, texto);
    //socket.broadcast.emit("texto_editor_clientes", texto); // broadcast emite para todos os outros clientes menos para o emissor
    if (atualizacao.modifiedCount) {
      socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
    }
  });

  socket.on("excluir_documento", async (nome) => {
    const resultado = await excluirDocumento(nome);

    if (resultado.deletedCount) {
      io.emit("excluir_documento_sucesso", nome);
    }
  });

  socket.on("disconnect", () => {});
});
