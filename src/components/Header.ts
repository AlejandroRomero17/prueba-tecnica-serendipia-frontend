export function renderizarTituloSuperior(): HTMLElement {
  const contenedor = document.createElement("div");
  contenedor.classList.add("text-center", "py-3", "mb-3");
  contenedor.style.backgroundColor = "#7D82D4"; // Fondo lila
  contenedor.style.color = "white";

  const subtitulo = document.createElement("div");
  subtitulo.classList.add("fw-bold");
  subtitulo.style.fontSize = "1rem";
  subtitulo.textContent = "PROCESO ELECTORAL EXTRAORDINARIO 2024-2025";

  const titulo = document.createElement("div");
  titulo.classList.add("fw-bold", "text-uppercase");
  titulo.style.fontSize = "1.5rem";
  titulo.textContent =
    "MINISTRAS Y MINISTROS DE LA SUPREMA CORTE DE JUSTICIA DE LA NACIÓN";

  contenedor.appendChild(subtitulo);
  contenedor.appendChild(titulo);

  return contenedor;
}
