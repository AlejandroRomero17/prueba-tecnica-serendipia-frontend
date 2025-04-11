import { Persona } from "../models/Persona";
import { renderPersonDetail } from "./PersonDetail";
import { renderizarTituloSuperior } from "./Header";
import { renderizarEncabezado } from "./SuperiorHeader";

export function renderizarListaDePersonas(
  personas: Persona[],
  _alSeleccionar: (persona: Persona) => void
): HTMLElement {
  const contenedor = document.createElement("div");
  const cuerpo = document.createElement("div");
  cuerpo.classList.add("row", "gx-3");

  const paginacion = 25;
  let paginaMujeres = 0;
  let paginaHombres = 0;

  function crearBotonesPaginacion(
    total: number,
    actual: number,
    actualizar: (nueva: number) => void
  ): HTMLElement {
    const nav = document.createElement("div");
    nav.classList.add("d-flex", "justify-content-between", "mt-2");

    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "Anterior";
    btnAnterior.classList.add("btn", "btn-light", "btn-sm", "border");
    btnAnterior.disabled = actual === 0;
    btnAnterior.onclick = () => actualizar(actual - 1);

    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "Siguiente";
    btnSiguiente.classList.add("btn", "btn-light", "btn-sm", "border");
    btnSiguiente.disabled = (actual + 1) * paginacion >= total;
    btnSiguiente.onclick = () => actualizar(actual + 1);

    nav.appendChild(btnAnterior);
    nav.appendChild(btnSiguiente);
    return nav;
  }

  function renderColumna(
    titulo: string,
    personas: Persona[],
    pagina: number,
    actualizarPagina: (nueva: number) => void
  ): HTMLElement {
    const columna = document.createElement("div");
    columna.classList.add("col-md-5", "p-3");
    columna.style.backgroundColor = "#7D82D4";
    columna.style.color = "#000";

    const encabezado = document.createElement("h6");
    encabezado.classList.add(
      "text-uppercase",
      "text-center",
      "fw-bold",
      "mb-3"
    );
    encabezado.textContent = titulo;
    columna.appendChild(encabezado);

    const cajas = document.createElement("div");
    cajas.classList.add("d-flex", "justify-content-center", "mb-3");
    cajas.style.gap = "6px";

    for (let i = 0; i < 5; i++) {
      const entrada = document.createElement("input");
      entrada.type = "text";
      entrada.classList.add(
        "form-control",
        "text-center",
        "border-2",
        "rounded"
      );
      entrada.style.width = "58px";
      entrada.style.height = "58px";
      entrada.style.borderColor = "#EE028C";
      entrada.style.fontWeight = "bold";
      entrada.style.fontSize = "1.1rem";
      cajas.appendChild(entrada);
    }

    columna.appendChild(cajas);

    const contenedorLista = document.createElement("div");
    contenedorLista.classList.add("p-3", "rounded");
    contenedorLista.style.backgroundColor = "#FFFFFF";

    const lista = document.createElement("ol");
    lista.classList.add("list-unstyled", "mb-0");

    personas
      .slice(pagina * paginacion, (pagina + 1) * paginacion)
      .forEach((persona) => {
        const elemento = document.createElement("li");
        elemento.classList.add("mb-2", "p-1", "rounded");
        elemento.style.cursor = "pointer";
        elemento.style.transition = "background-color 0.3s";

        const etiqueta = document.createElement("span");
        etiqueta.textContent = persona.propuesta;
        etiqueta.classList.add("fw-bold", "me-2", "px-2", "rounded");
        etiqueta.style.color = "#EE028C";
        etiqueta.style.backgroundColor = "#FFFFFF";
        etiqueta.style.display = "inline-block";

        const textoNombre = document.createTextNode(
          `${persona.primerApellido.toUpperCase()} ${persona.segundoApellido.toUpperCase()} ${persona.nombre.toUpperCase()}`
        );

        elemento.appendChild(etiqueta);
        elemento.appendChild(textoNombre);

        const detalleContenedor = document.createElement("div");
        detalleContenedor.classList.add("mt-2");
        detalleContenedor.style.display = "none";

        let visible = false;
        elemento.addEventListener("click", () => {
          if (visible) {
            detalleContenedor.style.display = "none";
            detalleContenedor.innerHTML = "";
          } else {
            detalleContenedor.innerHTML = "";
            detalleContenedor.appendChild(renderPersonDetail(persona));
            detalleContenedor.style.display = "block";
          }
          visible = !visible;
        });

        elemento.addEventListener("mouseover", () => {
          elemento.style.backgroundColor = "#f1f1f1";
        });
        elemento.addEventListener("mouseout", () => {
          elemento.style.backgroundColor = "transparent";
        });

        lista.appendChild(elemento);
        lista.appendChild(detalleContenedor);
      });

    contenedorLista.appendChild(lista);
    columna.appendChild(contenedorLista);
    columna.appendChild(
      crearBotonesPaginacion(personas.length, pagina, actualizarPagina)
    );

    return columna;
  }

  const mujeres = personas.filter((p) => p.sexo.toLowerCase() === "femenino");
  const hombres = personas.filter((p) => p.sexo.toLowerCase() === "masculino");

  contenedor.appendChild(renderizarEncabezado());
  contenedor.appendChild(renderizarTituloSuperior());

  const actualizarColumnaMujeres = (nuevaPagina: number) => {
    paginaMujeres = nuevaPagina;
    cuerpo.replaceChild(
      renderColumna(
        "Escriba el número correspondiente a cinco mujeres",
        mujeres,
        paginaMujeres,
        actualizarColumnaMujeres
      ),
      cuerpo.querySelector(".col-md-5")!
    );
  };

  const actualizarColumnaHombres = (nuevaPagina: number) => {
    paginaHombres = nuevaPagina;
    cuerpo.replaceChild(
      renderColumna(
        "Escriba el número correspondiente a cinco hombres",
        hombres,
        paginaHombres,
        actualizarColumnaHombres
      ),
      cuerpo.querySelectorAll(".col-md-5")[1]!
    );
  };

  cuerpo.appendChild(
    renderColumna(
      "Escriba el número correspondiente a cinco mujeres",
      mujeres,
      paginaMujeres,
      actualizarColumnaMujeres
    )
  );

  const leyendaContenedor = document.createElement("div");
  leyendaContenedor.classList.add(
    "col-md-2",
    "d-flex",
    "align-items-start",
    "justify-content-center",
    "mt-4"
  );

  const leyenda = document.createElement("div");
  leyenda.classList.add("text-center", "p-2", "rounded");
  leyenda.style.backgroundColor = "#EE028C";
  leyenda.style.color = "white";
  leyenda.innerHTML = `
  <div class="fw-bold mb-2 text-white py-1 px-2 rounded text-center" style="background-color:#EE028C;">
    PROPUESTAS
  </div>
  <div class="border border-2 rounded p-2" style="border-color:#EE028C; background-color:#FFFFFF;">
    <div class="d-flex align-items-start mb-1">
      <span class="fw-bold me-2 text-nowrap" style="color:#EE028C; min-width: 2.5rem;">PE</span>
      <span style="color:#000; flex: 1;">PODER EJECUTIVO</span>
    </div>
    <div class="d-flex align-items-start mb-1">
      <span class="fw-bold me-2 text-nowrap" style="color:#EE028C; min-width: 2.5rem;">PL</span>
      <span style="color:#000; flex: 1;">PODER LEGISLATIVO</span>
    </div>
    <div class="d-flex align-items-start mb-1">
      <span class="fw-bold me-2 text-nowrap" style="color:#EE028C; min-width: 2.5rem;">PJ</span>
      <span style="color:#000; flex: 1;">PODER JUDICIAL</span>
    </div>
    <div class="d-flex align-items-start">
      <span class="fw-bold me-2 text-nowrap" style="color:#EE028C; min-width: 2.5rem;">EF</span>
      <span style="color:#000; flex: 1;">MINISTRAS Y MINISTROS EN FUNCIONES</span>
    </div>
  </div>
  `;

  leyendaContenedor.appendChild(leyenda);

  cuerpo.appendChild(leyendaContenedor);

  cuerpo.appendChild(
    renderColumna(
      "Escriba el número correspondiente a cinco hombres",
      hombres,
      paginaHombres,
      actualizarColumnaHombres
    )
  );

  contenedor.appendChild(cuerpo);
  contenedor.id = "person-list";

  return contenedor;
}
