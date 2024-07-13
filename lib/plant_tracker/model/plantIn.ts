/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * Book Store API
 * Book Store API for renting books and notifying available/returned books in a store
 * OpenAPI spec version: 1.0.0
 */
import type { PlantInCommonName } from "./plantInCommonName";
import type { PlantInNotes } from "./plantInNotes";
import type { PlantInScientificName } from "./plantInScientificName";

export interface PlantIn {
  area_id: string;
  common_name?: PlantInCommonName;
  death_date?: string;
  graveyard?: boolean;
  name: string;
  notes?: PlantInNotes;
  purchase_date?: string;
  scientific_name?: PlantInScientificName;
}
