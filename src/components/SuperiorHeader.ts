export function renderizarEncabezado(): HTMLElement {
  const contenedor = document.createElement("div");
  contenedor.classList.add(
    "row",
    "justify-content-between",
    "align-items-center",
    "mb-3",
    "p-3",
    "rounded"
  );
  contenedor.style.backgroundColor = "#E5E6F6";
  contenedor.style.color = "#000";

  // Columna izquierda (título principal)
  const columnaIzquierda = document.createElement("div");
  columnaIzquierda.classList.add("col");
  columnaIzquierda.innerHTML = `
    <h5 class="fw-bold text-uppercase mb-1">
      Proceso Electoral Extraordinario 2024 - 202555
    </h5>
    <small class="fw-normal">
      Ministras y Ministros de la Suprema Corte de Justicia de la Nación
    </small>`;

  // Columna central (ENTIDAD / DISTRITO)
  const columnaCentro = document.createElement("div");
  columnaCentro.classList.add("col", "text-center");
  columnaCentro.innerHTML = `
    <div class="fw-semibold">ENTIDAD FEDERATIVA:</div>
    <div class="fw-semibold">DISTRITO ELECTORAL:</div>
  `;

  // Columna derecha (INE)
  const columnaDerecha = document.createElement("div");
  columnaDerecha.classList.add("col", "text-end");
  columnaDerecha.innerHTML = `
    <div class="fw-semibold">INE - 000,000</div>
    <div class="fw-normal">Desprenda aquí</div>
  `;

  contenedor.appendChild(columnaIzquierda);
  contenedor.appendChild(columnaCentro);
  contenedor.appendChild(columnaDerecha);

  return contenedor;
}
