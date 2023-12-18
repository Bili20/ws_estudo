import {
  encontraDocumento,
  obterDocumento,
  adicionarDocumento,
} from "../db/documentosDb.js";
function registrarEventosInicio(socket, io) {
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
}
export default registrarEventosInicio;
