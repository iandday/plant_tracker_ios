// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ActivityService, AreaService, EntryService, LocationService, PlantService, UserService } from "../requests/services.gen";
import * as Common from "./common";
/**
* List Locations
* Location
* @returns LocationOut OK
* @throws ApiError
*/
export const useLocationServiceTrackerApiViewLocationListLocationsSuspense = <TData = Common.LocationServiceTrackerApiViewLocationListLocationsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseLocationServiceTrackerApiViewLocationListLocationsKeyFn(queryKey), queryFn: () => LocationService.trackerApiViewLocationListLocations() as TData, ...options });
/**
* Get Location
* Location
* @param data The data for the request.
* @param data.locationId
* @returns LocationOut OK
* @throws ApiError
*/
export const useLocationServiceTrackerApiViewLocationGetLocationSuspense = <TData = Common.LocationServiceTrackerApiViewLocationGetLocationDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ locationId }: {
  locationId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseLocationServiceTrackerApiViewLocationGetLocationKeyFn({ locationId }, queryKey), queryFn: () => LocationService.trackerApiViewLocationGetLocation({ locationId }) as TData, ...options });
/**
* List Areas
* Arean
* @returns AreaOut OK
* @throws ApiError
*/
export const useAreaServiceTrackerApiViewAreaListAreasSuspense = <TData = Common.AreaServiceTrackerApiViewAreaListAreasDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAreaServiceTrackerApiViewAreaListAreasKeyFn(queryKey), queryFn: () => AreaService.trackerApiViewAreaListAreas() as TData, ...options });
/**
* Get Area
* Area
* @param data The data for the request.
* @param data.areaId
* @returns AreaOut OK
* @throws ApiError
*/
export const useAreaServiceTrackerApiViewAreaGetAreaSuspense = <TData = Common.AreaServiceTrackerApiViewAreaGetAreaDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ areaId }: {
  areaId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseAreaServiceTrackerApiViewAreaGetAreaKeyFn({ areaId }, queryKey), queryFn: () => AreaService.trackerApiViewAreaGetArea({ areaId }) as TData, ...options });
/**
* Me
* @returns UserSchema OK
* @throws ApiError
*/
export const useUserServiceTrackerApiViewUserMeSuspense = <TData = Common.UserServiceTrackerApiViewUserMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUserServiceTrackerApiViewUserMeKeyFn(queryKey), queryFn: () => UserService.trackerApiViewUserMe() as TData, ...options });
/**
* Reg Enabled
* @returns RegEnabledSchema OK
* @throws ApiError
*/
export const useUserServiceTrackerApiViewUserRegEnabledSuspense = <TData = Common.UserServiceTrackerApiViewUserRegEnabledDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseUserServiceTrackerApiViewUserRegEnabledKeyFn(queryKey), queryFn: () => UserService.trackerApiViewUserRegEnabled() as TData, ...options });
/**
* List Plants
* Plant
* @param data The data for the request.
* @param data.excludeGraveyard
* @param data.graveyardOnly
* @returns PlantOut OK
* @throws ApiError
*/
export const usePlantServiceTrackerApiViewPlantListPlantsSuspense = <TData = Common.PlantServiceTrackerApiViewPlantListPlantsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ excludeGraveyard, graveyardOnly }: {
  excludeGraveyard?: boolean;
  graveyardOnly?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePlantServiceTrackerApiViewPlantListPlantsKeyFn({ excludeGraveyard, graveyardOnly }, queryKey), queryFn: () => PlantService.trackerApiViewPlantListPlants({ excludeGraveyard, graveyardOnly }) as TData, ...options });
/**
* Get Plant
* Plant
* @param data The data for the request.
* @param data.plantId
* @returns PlantOut OK
* @throws ApiError
*/
export const usePlantServiceTrackerApiViewPlantGetPlantSuspense = <TData = Common.PlantServiceTrackerApiViewPlantGetPlantDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ plantId }: {
  plantId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UsePlantServiceTrackerApiViewPlantGetPlantKeyFn({ plantId }, queryKey), queryFn: () => PlantService.trackerApiViewPlantGetPlant({ plantId }) as TData, ...options });
/**
* List Entries
* Entry
* @returns EntryOut OK
* @throws ApiError
*/
export const useEntryServiceTrackerApiViewEntryListEntriesSuspense = <TData = Common.EntryServiceTrackerApiViewEntryListEntriesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseEntryServiceTrackerApiViewEntryListEntriesKeyFn(queryKey), queryFn: () => EntryService.trackerApiViewEntryListEntries() as TData, ...options });
/**
* Get Plant Entries
* Entry
* @param data The data for the request.
* @param data.plantId
* @returns EntryOut OK
* @throws ApiError
*/
export const useEntryServiceTrackerApiViewEntryGetPlantEntriesSuspense = <TData = Common.EntryServiceTrackerApiViewEntryGetPlantEntriesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ plantId }: {
  plantId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseEntryServiceTrackerApiViewEntryGetPlantEntriesKeyFn({ plantId }, queryKey), queryFn: () => EntryService.trackerApiViewEntryGetPlantEntries({ plantId }) as TData, ...options });
/**
* Get Entry
* Entry
* @param data The data for the request.
* @param data.entryId
* @returns EntryOut OK
* @throws ApiError
*/
export const useEntryServiceTrackerApiViewEntryGetEntrySuspense = <TData = Common.EntryServiceTrackerApiViewEntryGetEntryDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ entryId }: {
  entryId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseEntryServiceTrackerApiViewEntryGetEntryKeyFn({ entryId }, queryKey), queryFn: () => EntryService.trackerApiViewEntryGetEntry({ entryId }) as TData, ...options });
/**
* List Activities
* Activity
* @returns ActivityOut OK
* @throws ApiError
*/
export const useActivityServiceTrackerApiViewActivityListActivitiesSuspense = <TData = Common.ActivityServiceTrackerApiViewActivityListActivitiesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseActivityServiceTrackerApiViewActivityListActivitiesKeyFn(queryKey), queryFn: () => ActivityService.trackerApiViewActivityListActivities() as TData, ...options });
