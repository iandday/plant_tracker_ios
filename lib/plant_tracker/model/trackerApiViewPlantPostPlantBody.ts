/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * Plant Tracker API
 * API for interacting with the Plant Tracker application
 * OpenAPI spec version: 1.0.0
 */
import type { TrackerApiViewPlantPostPlantBodyAreaId } from "./trackerApiViewPlantPostPlantBodyAreaId";
import type { TrackerApiViewPlantPostPlantBodyCommonName } from "./trackerApiViewPlantPostPlantBodyCommonName";
import type { TrackerApiViewPlantPostPlantBodyName } from "./trackerApiViewPlantPostPlantBodyName";
import type { TrackerApiViewPlantPostPlantBodyNotes } from "./trackerApiViewPlantPostPlantBodyNotes";
import type { TrackerApiViewPlantPostPlantBodyScientificName } from "./trackerApiViewPlantPostPlantBodyScientificName";

export type TrackerApiViewPlantPostPlantBody = {
  area_id?: TrackerApiViewPlantPostPlantBodyAreaId;
  common_name?: TrackerApiViewPlantPostPlantBodyCommonName;
  death_date?: string;
  file?: Blob;
  graveyard?: boolean;
  name?: TrackerApiViewPlantPostPlantBodyName;
  notes?: TrackerApiViewPlantPostPlantBodyNotes;
  purchase_date?: string;
  scientific_name?: TrackerApiViewPlantPostPlantBodyScientificName;
};
