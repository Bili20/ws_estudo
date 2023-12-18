import registrarEventosDocumento from "./registrarEventos/registrarEventosDocumento.js";
import registrarEventosInicio from "./registrarEventos/registrarEventosInicio.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    registrarEventosInicio(socket, io);
    registrarEventosDocumento(socket, io);
  });
});
