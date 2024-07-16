// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { type QueryClient } from "@tanstack/react-query";
import { ActivityService, AreaService, EntryService, LocationService, PlantService, UserService } from "../requests/services.gen";
import * as Common from "./common";
/**
* List Locations
* Location
* @returns LocationOut OK
* @throws ApiError
*/
export const prefetchUseLocationServiceTrackerApiViewLocationListLocations = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseLocationServiceTrackerApiViewLocationListLocationsKeyFn(), queryFn: () => LocationService.trackerApiViewLocationListLocations() });
/**
* Get Location
* Location
* @param data The data for the request.
* @param data.locationId
* @returns LocationOut OK
* @throws ApiError
*/
export const prefetchUseLocationServiceTrackerApiViewLocationGetLocation = (queryClient: QueryClient, { locationId }: {
  locationId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseLocationServiceTrackerApiViewLocationGetLocationKeyFn({ locationId }), queryFn: () => LocationService.trackerApiViewLocationGetLocation({ locationId }) });
/**
* List Areas
* Arean
* @returns AreaOut OK
* @throws ApiError
*/
export const prefetchUseAreaServiceTrackerApiViewAreaListAreas = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseAreaServiceTrackerApiViewAreaListAreasKeyFn(), queryFn: () => AreaService.trackerApiViewAreaListAreas() });
/**
* Get Area
* Area
* @param data The data for the request.
* @param data.areaId
* @returns AreaOut OK
* @throws ApiError
*/
export const prefetchUseAreaServiceTrackerApiViewAreaGetArea = (queryClient: QueryClient, { areaId }: {
  areaId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseAreaServiceTrackerApiViewAreaGetAreaKeyFn({ areaId }), queryFn: () => AreaService.trackerApiViewAreaGetArea({ areaId }) });
/**
* Me
* @returns UserSchema OK
* @throws ApiError
*/
export const prefetchUseUserServiceTrackerApiViewUserMe = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUserServiceTrackerApiViewUserMeKeyFn(), queryFn: () => UserService.trackerApiViewUserMe() });
/**
* Reg Enabled
* @returns RegEnabledSchema OK
* @throws ApiError
*/
export const prefetchUseUserServiceTrackerApiViewUserRegEnabled = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseUserServiceTrackerApiViewUserRegEnabledKeyFn(), queryFn: () => UserService.trackerApiViewUserRegEnabled() });
/**
* List Plants
* Plant
* @param data The data for the request.
* @param data.excludeGraveyard
* @param data.graveyardOnly
* @returns PlantOut OK
* @throws ApiError
*/
export const prefetchUsePlantServiceTrackerApiViewPlantListPlants = (queryClient: QueryClient, { excludeGraveyard, graveyardOnly }: {
  excludeGraveyard?: boolean;
  graveyardOnly?: boolean;
} = {}) => queryClient.prefetchQuery({ queryKey: Common.UsePlantServiceTrackerApiViewPlantListPlantsKeyFn({ excludeGraveyard, graveyardOnly }), queryFn: () => PlantService.trackerApiViewPlantListPlants({ excludeGraveyard, graveyardOnly }) });
/**
* Get Plant
* Plant
* @param data The data for the request.
* @param data.plantId
* @returns PlantOut OK
* @throws ApiError
*/
export const prefetchUsePlantServiceTrackerApiViewPlantGetPlant = (queryClient: QueryClient, { plantId }: {
  plantId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UsePlantServiceTrackerApiViewPlantGetPlantKeyFn({ plantId }), queryFn: () => PlantService.trackerApiViewPlantGetPlant({ plantId }) });
/**
* List Entries
* Entry
* @returns EntryOut OK
* @throws ApiError
*/
export const prefetchUseEntryServiceTrackerApiViewEntryListEntries = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseEntryServiceTrackerApiViewEntryListEntriesKeyFn(), queryFn: () => EntryService.trackerApiViewEntryListEntries() });
/**
* Get Plant Entries
* Entry
* @param data The data for the request.
* @param data.plantId
* @returns EntryOut OK
* @throws ApiError
*/
export const prefetchUseEntryServiceTrackerApiViewEntryGetPlantEntries = (queryClient: QueryClient, { plantId }: {
  plantId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseEntryServiceTrackerApiViewEntryGetPlantEntriesKeyFn({ plantId }), queryFn: () => EntryService.trackerApiViewEntryGetPlantEntries({ plantId }) });
/**
* Get Entry
* Entry
* @param data The data for the request.
* @param data.entryId
* @returns EntryOut OK
* @throws ApiError
*/
export const prefetchUseEntryServiceTrackerApiViewEntryGetEntry = (queryClient: QueryClient, { entryId }: {
  entryId: string;
}) => queryClient.prefetchQuery({ queryKey: Common.UseEntryServiceTrackerApiViewEntryGetEntryKeyFn({ entryId }), queryFn: () => EntryService.trackerApiViewEntryGetEntry({ entryId }) });
/**
* List Activities
* Activity
* @returns ActivityOut OK
* @throws ApiError
*/
export const prefetchUseActivityServiceTrackerApiViewActivityListActivities = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: Common.UseActivityServiceTrackerApiViewActivityListActivitiesKeyFn(), queryFn: () => ActivityService.trackerApiViewActivityListActivities() });
