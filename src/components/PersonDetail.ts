import { Persona } from "../models/Persona";

export function renderPersonDetail(persona: Persona): HTMLElement {
  const container = document.createElement("div");

  // Construir el nombre completo en formato tradicional mexicano
  const nombreCompleto = `${persona.primerApellido} ${persona.segundoApellido} ${
    persona.nombre
  }${persona.segundoNombre ? " " + persona.segundoNombre : ""}`.toUpperCase();

  container.innerHTML = `
    <h6 class="fw-bold mb-2">Detalles:</h6>
    <ul class="list-group">
      <li class="list-group-item"><strong>Nombre completo:</strong> ${nombreCompleto}</li>
      <li class="list-group-item"><strong>Nombre:</strong> ${
        persona.nombre
      }</li>
      ${
        persona.segundoNombre
          ? `<li class="list-group-item"><strong>Segundo nombre:</strong> ${persona.segundoNombre}</li>`
          : ""
      }
      <li class="list-group-item"><strong>Apellido paterno:</strong> ${
        persona.primerApellido
      }</li>
      <li class="list-group-item"><strong>Apellido materno:</strong> ${
        persona.segundoApellido
      }</li>
      <li class="list-group-item"><strong>Edad:</strong> ${persona.edad}</li>
      <li class="list-group-item"><strong>Sexo:</strong> ${persona.sexo}</li>
      <li class="list-group-item"><strong>Ocupación:</strong> ${
        persona.ocupacion
      }</li>
      <li class="list-group-item"><strong>Nivel de estudios:</strong> ${
        persona.nivelDeEstudios
      }</li>
      <li class="list-group-item"><strong>Propuesta:</strong> ${
        persona.propuesta
      }</li>
    </ul>
  `;

  return container;
}
