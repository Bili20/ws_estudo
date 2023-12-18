import {
  encontraDocumento,
  atualizaDocumento,
  excluirDocumento,
} from "../db/documentosDb.js";
function registrarEventosDocumento(socket, io) {
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
}
export default registrarEventosDocumento;
