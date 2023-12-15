import {
  emitirExcluirDocumento,
  emitirTextoEditor,
  selecionarDocumento,
} from "./socket-front-documento.js";

const textoEditor = document.getElementById("editor-texto");
const parametros = new URLSearchParams(window.location.search);
const nomeDocumento = parametros.get("nome");
const botaoExcluir = document.getElementById("excluir-documento");

const tituloDocumento = document.getElementById("titulo-documento");

tituloDocumento.textContent = nomeDocumento || "Documento sem nome";

selecionarDocumento(nomeDocumento);

textoEditor.addEventListener("keyup", () => {
  emitirTextoEditor({ texto: textoEditor.value, nomeDocumento });
});

function atualizaTextoEditor(texto) {
  textoEditor.value = texto;
}

botaoExcluir.addEventListener("click", () => {
  emitirExcluirDocumento(nomeDocumento);
});

function alertarERedirecionar(nome) {
  if (nome === nomeDocumento) {
    alert(`Documento ${nome} excluido`);
    window.location.href = "/";
  }
}

export { atualizaTextoEditor, alertarERedirecionar };
