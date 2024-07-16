// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseQueryResult } from "@tanstack/react-query";
import { ActivityService, AreaService, BulkService, EntryService, LocationService, PlantService, UserService } from "../requests/services.gen";
export type LocationServiceTrackerApiViewLocationListLocationsDefaultResponse = Awaited<ReturnType<typeof LocationService.trackerApiViewLocationListLocations>>;
export type LocationServiceTrackerApiViewLocationListLocationsQueryResult<TData = LocationServiceTrackerApiViewLocationListLocationsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useLocationServiceTrackerApiViewLocationListLocationsKey = "LocationServiceTrackerApiViewLocationListLocations";
export const UseLocationServiceTrackerApiViewLocationListLocationsKeyFn = (queryKey?: Array<unknown>) => [useLocationServiceTrackerApiViewLocationListLocationsKey, ...(queryKey ?? [])];
export type LocationServiceTrackerApiViewLocationGetLocationDefaultResponse = Awaited<ReturnType<typeof LocationService.trackerApiViewLocationGetLocation>>;
export type LocationServiceTrackerApiViewLocationGetLocationQueryResult<TData = LocationServiceTrackerApiViewLocationGetLocationDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useLocationServiceTrackerApiViewLocationGetLocationKey = "LocationServiceTrackerApiViewLocationGetLocation";
export const UseLocationServiceTrackerApiViewLocationGetLocationKeyFn = ({ locationId }: {
  locationId: string;
}, queryKey?: Array<unknown>) => [useLocationServiceTrackerApiViewLocationGetLocationKey, ...(queryKey ?? [{ locationId }])];
export type AreaServiceTrackerApiViewAreaListAreasDefaultResponse = Awaited<ReturnType<typeof AreaService.trackerApiViewAreaListAreas>>;
export type AreaServiceTrackerApiViewAreaListAreasQueryResult<TData = AreaServiceTrackerApiViewAreaListAreasDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAreaServiceTrackerApiViewAreaListAreasKey = "AreaServiceTrackerApiViewAreaListAreas";
export const UseAreaServiceTrackerApiViewAreaListAreasKeyFn = (queryKey?: Array<unknown>) => [useAreaServiceTrackerApiViewAreaListAreasKey, ...(queryKey ?? [])];
export type AreaServiceTrackerApiViewAreaGetAreaDefaultResponse = Awaited<ReturnType<typeof AreaService.trackerApiViewAreaGetArea>>;
export type AreaServiceTrackerApiViewAreaGetAreaQueryResult<TData = AreaServiceTrackerApiViewAreaGetAreaDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useAreaServiceTrackerApiViewAreaGetAreaKey = "AreaServiceTrackerApiViewAreaGetArea";
export const UseAreaServiceTrackerApiViewAreaGetAreaKeyFn = ({ areaId }: {
  areaId: string;
}, queryKey?: Array<unknown>) => [useAreaServiceTrackerApiViewAreaGetAreaKey, ...(queryKey ?? [{ areaId }])];
export type UserServiceTrackerApiViewUserMeDefaultResponse = Awaited<ReturnType<typeof UserService.trackerApiViewUserMe>>;
export type UserServiceTrackerApiViewUserMeQueryResult<TData = UserServiceTrackerApiViewUserMeDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUserServiceTrackerApiViewUserMeKey = "UserServiceTrackerApiViewUserMe";
export const UseUserServiceTrackerApiViewUserMeKeyFn = (queryKey?: Array<unknown>) => [useUserServiceTrackerApiViewUserMeKey, ...(queryKey ?? [])];
export type UserServiceTrackerApiViewUserRegEnabledDefaultResponse = Awaited<ReturnType<typeof UserService.trackerApiViewUserRegEnabled>>;
export type UserServiceTrackerApiViewUserRegEnabledQueryResult<TData = UserServiceTrackerApiViewUserRegEnabledDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useUserServiceTrackerApiViewUserRegEnabledKey = "UserServiceTrackerApiViewUserRegEnabled";
export const UseUserServiceTrackerApiViewUserRegEnabledKeyFn = (queryKey?: Array<unknown>) => [useUserServiceTrackerApiViewUserRegEnabledKey, ...(queryKey ?? [])];
export type PlantServiceTrackerApiViewPlantListPlantsDefaultResponse = Awaited<ReturnType<typeof PlantService.trackerApiViewPlantListPlants>>;
export type PlantServiceTrackerApiViewPlantListPlantsQueryResult<TData = PlantServiceTrackerApiViewPlantListPlantsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePlantServiceTrackerApiViewPlantListPlantsKey = "PlantServiceTrackerApiViewPlantListPlants";
export const UsePlantServiceTrackerApiViewPlantListPlantsKeyFn = ({ excludeGraveyard, graveyardOnly }: {
  excludeGraveyard?: boolean;
  graveyardOnly?: boolean;
} = {}, queryKey?: Array<unknown>) => [usePlantServiceTrackerApiViewPlantListPlantsKey, ...(queryKey ?? [{ excludeGraveyard, graveyardOnly }])];
export type PlantServiceTrackerApiViewPlantGetPlantDefaultResponse = Awaited<ReturnType<typeof PlantService.trackerApiViewPlantGetPlant>>;
export type PlantServiceTrackerApiViewPlantGetPlantQueryResult<TData = PlantServiceTrackerApiViewPlantGetPlantDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const usePlantServiceTrackerApiViewPlantGetPlantKey = "PlantServiceTrackerApiViewPlantGetPlant";
export const UsePlantServiceTrackerApiViewPlantGetPlantKeyFn = ({ plantId }: {
  plantId: string;
}, queryKey?: Array<unknown>) => [usePlantServiceTrackerApiViewPlantGetPlantKey, ...(queryKey ?? [{ plantId }])];
export type EntryServiceTrackerApiViewEntryListEntriesDefaultResponse = Awaited<ReturnType<typeof EntryService.trackerApiViewEntryListEntries>>;
export type EntryServiceTrackerApiViewEntryListEntriesQueryResult<TData = EntryServiceTrackerApiViewEntryListEntriesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useEntryServiceTrackerApiViewEntryListEntriesKey = "EntryServiceTrackerApiViewEntryListEntries";
export const UseEntryServiceTrackerApiViewEntryListEntriesKeyFn = (queryKey?: Array<unknown>) => [useEntryServiceTrackerApiViewEntryListEntriesKey, ...(queryKey ?? [])];
export type EntryServiceTrackerApiViewEntryGetPlantEntriesDefaultResponse = Awaited<ReturnType<typeof EntryService.trackerApiViewEntryGetPlantEntries>>;
export type EntryServiceTrackerApiViewEntryGetPlantEntriesQueryResult<TData = EntryServiceTrackerApiViewEntryGetPlantEntriesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useEntryServiceTrackerApiViewEntryGetPlantEntriesKey = "EntryServiceTrackerApiViewEntryGetPlantEntries";
export const UseEntryServiceTrackerApiViewEntryGetPlantEntriesKeyFn = ({ plantId }: {
  plantId: string;
}, queryKey?: Array<unknown>) => [useEntryServiceTrackerApiViewEntryGetPlantEntriesKey, ...(queryKey ?? [{ plantId }])];
export type EntryServiceTrackerApiViewEntryGetEntryDefaultResponse = Awaited<ReturnType<typeof EntryService.trackerApiViewEntryGetEntry>>;
export type EntryServiceTrackerApiViewEntryGetEntryQueryResult<TData = EntryServiceTrackerApiViewEntryGetEntryDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useEntryServiceTrackerApiViewEntryGetEntryKey = "EntryServiceTrackerApiViewEntryGetEntry";
export const UseEntryServiceTrackerApiViewEntryGetEntryKeyFn = ({ entryId }: {
  entryId: string;
}, queryKey?: Array<unknown>) => [useEntryServiceTrackerApiViewEntryGetEntryKey, ...(queryKey ?? [{ entryId }])];
export type ActivityServiceTrackerApiViewActivityListActivitiesDefaultResponse = Awaited<ReturnType<typeof ActivityService.trackerApiViewActivityListActivities>>;
export type ActivityServiceTrackerApiViewActivityListActivitiesQueryResult<TData = ActivityServiceTrackerApiViewActivityListActivitiesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useActivityServiceTrackerApiViewActivityListActivitiesKey = "ActivityServiceTrackerApiViewActivityListActivities";
export const UseActivityServiceTrackerApiViewActivityListActivitiesKeyFn = (queryKey?: Array<unknown>) => [useActivityServiceTrackerApiViewActivityListActivitiesKey, ...(queryKey ?? [])];
export type LocationServiceTrackerApiViewLocationCreateLocationMutationResult = Awaited<ReturnType<typeof LocationService.trackerApiViewLocationCreateLocation>>;
export type AreaServiceTrackerApiViewAreaCreateAreaMutationResult = Awaited<ReturnType<typeof AreaService.trackerApiViewAreaCreateArea>>;
export type UserServiceTrackerApiViewUserNewTokenMutationResult = Awaited<ReturnType<typeof UserService.trackerApiViewUserNewToken>>;
export type UserServiceTrackerApiViewUserRefreshTokenMutationResult = Awaited<ReturnType<typeof UserService.trackerApiViewUserRefreshToken>>;
export type UserServiceTrackerApiViewUserRegisterMutationResult = Awaited<ReturnType<typeof UserService.trackerApiViewUserRegister>>;
export type PlantServiceTrackerApiViewPlantCreatePlantMutationResult = Awaited<ReturnType<typeof PlantService.trackerApiViewPlantCreatePlant>>;
export type PlantServiceTrackerApiViewPlantPostPlantMutationResult = Awaited<ReturnType<typeof PlantService.trackerApiViewPlantPostPlant>>;
export type EntryServiceTrackerApiViewEntryCreateEntryMutationResult = Awaited<ReturnType<typeof EntryService.trackerApiViewEntryCreateEntry>>;
export type BulkServiceTrackerApiViewBulkBulkCreatePlantMutationResult = Awaited<ReturnType<typeof BulkService.trackerApiViewBulkBulkCreatePlant>>;
export type LocationServiceLocationPatchLocationMutationResult = Awaited<ReturnType<typeof LocationService.locationPatchLocation>>;
export type AreaServiceAreaPatchAreaMutationResult = Awaited<ReturnType<typeof AreaService.areaPatchArea>>;
export type UserServiceTrackerApiViewUserUpdateMeMutationResult = Awaited<ReturnType<typeof UserService.trackerApiViewUserUpdateMe>>;
export type LocationServiceTrackerApiViewLocationDeleteLocationMutationResult = Awaited<ReturnType<typeof LocationService.trackerApiViewLocationDeleteLocation>>;
export type AreaServiceTrackerApiViewAreaDeleteAreaMutationResult = Awaited<ReturnType<typeof AreaService.trackerApiViewAreaDeleteArea>>;
export type PlantServiceTrackerApiViewPlantDeletePlantMutationResult = Awaited<ReturnType<typeof PlantService.trackerApiViewPlantDeletePlant>>;
export type EntryServiceTrackerApiViewEntryDeleteEntryMutationResult = Awaited<ReturnType<typeof EntryService.trackerApiViewEntryDeleteEntry>>;
