/**
 * Generated by orval v6.31.0 🍺
 * Do not edit manually.
 * Plant Tracker API
 * API for interacting with the Plant Tracker application
 * OpenAPI spec version: 1.0.0
 */
import type { TrackerApiViewEntryPostEntryBodyNotes } from "./trackerApiViewEntryPostEntryBodyNotes";
import type { TrackerApiViewEntryPostEntryBodyPlantHealth } from "./trackerApiViewEntryPostEntryBodyPlantHealth";
import type { TrackerApiViewEntryPostEntryBodyPlantId } from "./trackerApiViewEntryPostEntryBodyPlantId";

export type TrackerApiViewEntryPostEntryBody = {
  activities: string[];
  file?: Blob;
  notes?: TrackerApiViewEntryPostEntryBodyNotes;
  plant_health?: TrackerApiViewEntryPostEntryBodyPlantHealth;
  plant_id?: TrackerApiViewEntryPostEntryBodyPlantId;
  Timestamp?: string;
};
