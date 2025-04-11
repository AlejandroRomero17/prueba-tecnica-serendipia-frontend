import { renderizarEncabezado } from "./SuperiorHeader";
import { renderizarTituloSuperior } from "./Header";
import { crearBuscadorPorNombre } from "./Search";
import { renderizarListaDePersonas } from "./PersonList";
import { Persona } from "../models/Persona";
import { loadCsvData } from "../services/CsvService";

export async function renderMainView() {
  const app = document.getElementById("app");
  if (!app) return;
  app.innerHTML = "";

  // Contenedor principal estilo "boleta"
  const contenedorBoleta = document.createElement("div");
  contenedorBoleta.classList.add(
    "container",
    "border",
    "p-4",
    "my-4",
    "rounded",
    "shadow-sm"
  );
  contenedorBoleta.style.backgroundColor = "#f3f2f2";

  // 🟪 Primero encabezado institucional
  contenedorBoleta.appendChild(renderizarEncabezado());

  // 🟣 Luego el título morado grande
  contenedorBoleta.appendChild(renderizarTituloSuperior());

  // Separador visual
  contenedorBoleta.appendChild(document.createElement("hr"));

  // Buscador
  const contenedorBuscador = document.createElement("div");
  contenedorBuscador.classList.add("mb-4");
  contenedorBuscador.appendChild(
    crearBuscadorPorNombre((consulta: string) => {
      actualizarListaDePersonas(consulta);
    })
  );
  contenedorBoleta.appendChild(contenedorBuscador);

  // Subtítulo
  const subtitulo = document.createElement("div");
  subtitulo.classList.add("text-center", "mb-4");
  const texto = document.createElement("h6");
  texto.classList.add("text-uppercase");
  texto.textContent = "Seleccione las candidaturas de su preferencia";
  subtitulo.appendChild(texto);
  contenedorBoleta.appendChild(subtitulo);

  // Datos desde CSV
  const personas: Persona[] = await loadCsvData("/data.csv");

  // Lista principal
  let listaElementos = renderizarListaDePersonas(personas, () => {});
  listaElementos.id = "person-list";
  contenedorBoleta.appendChild(listaElementos);

  app.appendChild(contenedorBoleta);

  // Actualización dinámica con filtro de búsqueda
  function actualizarListaDePersonas(consulta: string) {
    const resultado = personas.filter((p) => {
      const nombreCompleto = `${p.nombre} ${p.segundoNombre ?? ""} ${
        p.primerApellido
      } ${p.segundoApellido}`.toLowerCase();
      return nombreCompleto.includes(consulta.toLowerCase());
    });

    const nuevaLista = renderizarListaDePersonas(resultado, () => {});
    nuevaLista.id = "person-list";

    const anterior = contenedorBoleta.querySelector("#person-list");
    if (anterior) {
      contenedorBoleta.replaceChild(nuevaLista, anterior);
    } else {
      contenedorBoleta.appendChild(nuevaLista);
    }
  }
}
