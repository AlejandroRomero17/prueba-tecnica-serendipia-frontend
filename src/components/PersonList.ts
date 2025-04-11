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
    cajas.classList.add("d-flex", "justify-content-between", "mb-3");
    for (let i = 0; i < 5; i++) {
      const entrada = document.createElement("input");
      entrada.type = "text";
      entrada.classList.add("form-control", "text-center");
      entrada.style.width = "18%";
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
    "align-items-center",
    "justify-content-center"
  );

  const leyenda = document.createElement("div");
  leyenda.classList.add("text-center", "p-2", "rounded");
  leyenda.style.backgroundColor = "#EE028C";
  leyenda.style.color = "white";
  leyenda.innerHTML = `
    <div class="fw-bold mb-2">PROPUESTAS</div>
    <span><strong style="color:#EE028C">PE</strong> <span style="color:#000">PODER EJECUTIVO</span></span><br>
    <span><strong style="color:#EE028C">PL</strong> <span style="color:#000">PODER LEGISLATIVO</span></span><br>
    <span><strong style="color:#EE028C">PJ</strong> <span style="color:#000">PODER JUDICIAL</span></span><br>
    <span><strong style="color:#EE028C">EF</strong> <span style="color:#000">MINISTRAS Y MINISTROS EN FUNCIONES</span></span>
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
