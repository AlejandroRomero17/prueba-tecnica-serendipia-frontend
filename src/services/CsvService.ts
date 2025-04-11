import Papa from "papaparse";
import { Persona } from "../models/Persona";

export async function loadCsvData(url: string): Promise<Persona[]> {
  try {
    const response = await fetch(url);
    const text = await response.text();
    const result = Papa.parse<Persona>(text, {
      header: true,
      skipEmptyLines: true,
    });
    return result.data;
  } catch (error) {
    console.error("Error al cargar el CSV:", error);
    return [];
  }
}
