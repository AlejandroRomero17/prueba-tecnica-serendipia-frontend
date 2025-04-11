export function crearBuscadorPorNombre(
  alBuscar: (consulta: string) => void
): HTMLElement {
  const contenedor = document.createElement("div");
  contenedor.classList.add("w-100", "p-3", "rounded");
  contenedor.style.backgroundColor = "#E4E5F5";

  // Etiqueta para accesibilidad
  const etiqueta = document.createElement("label");
  etiqueta.setAttribute("for", "buscador");
  etiqueta.classList.add("form-label", "fw-semibold", "text-dark");
  etiqueta.textContent = "Buscar por nombre completo:";

  // Campo de entrada de texto
  const entrada = document.createElement("input");
  entrada.type = "text";
  entrada.id = "buscador";
  entrada.classList.add("form-control", "shadow-sm");
  entrada.placeholder = "Ejemplo: NOMBRE APELLIDO";

  // Evento para detectar texto ingresado
  entrada.addEventListener("input", () => {
    alBuscar(entrada.value.trim());
  });

  contenedor.appendChild(etiqueta);
  contenedor.appendChild(entrada);

  return contenedor;
}
