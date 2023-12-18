import registrarEventosDocumento from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    registrarEventosInicio(socket, io);
    registrarEventosDocumento(socket, io);
    registrarEventosCadastro(socket, io);
  });
});
