// generated with @7nohe/openapi-react-query-codegen@1.4.1 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { ActivityService, AreaService, BulkService, EntryService, LocationService, PlantService, UserService } from "../requests/services.gen";
import { AreaIn, AreaPatch, LocationIn, LocationPatch, RegisterIn, TokenObtainPair, TokenRefreshInputSchema, UserSchema } from "../requests/types.gen";
import * as Common from "./common";
/**
* List Locations
* Location
* @returns LocationOut OK
* @throws ApiError
*/
export const useLocationServiceTrackerApiViewLocationListLocations = <TData = Common.LocationServiceTrackerApiViewLocationListLocationsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseLocationServiceTrackerApiViewLocationListLocationsKeyFn(queryKey), queryFn: () => LocationService.trackerApiViewLocationListLocations() as TData, ...options });
/**
* Get Location
* Location
* @param data The data for the request.
* @param data.locationId
* @returns LocationOut OK
* @throws ApiError
*/
export const useLocationServiceTrackerApiViewLocationGetLocation = <TData = Common.LocationServiceTrackerApiViewLocationGetLocationDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ locationId }: {
  locationId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseLocationServiceTrackerApiViewLocationGetLocationKeyFn({ locationId }, queryKey), queryFn: () => LocationService.trackerApiViewLocationGetLocation({ locationId }) as TData, ...options });
/**
* List Areas
* Arean
* @returns AreaOut OK
* @throws ApiError
*/
export const useAreaServiceTrackerApiViewAreaListAreas = <TData = Common.AreaServiceTrackerApiViewAreaListAreasDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAreaServiceTrackerApiViewAreaListAreasKeyFn(queryKey), queryFn: () => AreaService.trackerApiViewAreaListAreas() as TData, ...options });
/**
* Get Area
* Area
* @param data The data for the request.
* @param data.areaId
* @returns AreaOut OK
* @throws ApiError
*/
export const useAreaServiceTrackerApiViewAreaGetArea = <TData = Common.AreaServiceTrackerApiViewAreaGetAreaDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ areaId }: {
  areaId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseAreaServiceTrackerApiViewAreaGetAreaKeyFn({ areaId }, queryKey), queryFn: () => AreaService.trackerApiViewAreaGetArea({ areaId }) as TData, ...options });
/**
* Me
* @returns UserSchema OK
* @throws ApiError
*/
export const useUserServiceTrackerApiViewUserMe = <TData = Common.UserServiceTrackerApiViewUserMeDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUserServiceTrackerApiViewUserMeKeyFn(queryKey), queryFn: () => UserService.trackerApiViewUserMe() as TData, ...options });
/**
* Reg Enabled
* @returns RegEnabledSchema OK
* @throws ApiError
*/
export const useUserServiceTrackerApiViewUserRegEnabled = <TData = Common.UserServiceTrackerApiViewUserRegEnabledDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseUserServiceTrackerApiViewUserRegEnabledKeyFn(queryKey), queryFn: () => UserService.trackerApiViewUserRegEnabled() as TData, ...options });
/**
* List Plants
* Plant
* @param data The data for the request.
* @param data.excludeGraveyard
* @param data.graveyardOnly
* @returns PlantOut OK
* @throws ApiError
*/
export const usePlantServiceTrackerApiViewPlantListPlants = <TData = Common.PlantServiceTrackerApiViewPlantListPlantsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ excludeGraveyard, graveyardOnly }: {
  excludeGraveyard?: boolean;
  graveyardOnly?: boolean;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePlantServiceTrackerApiViewPlantListPlantsKeyFn({ excludeGraveyard, graveyardOnly }, queryKey), queryFn: () => PlantService.trackerApiViewPlantListPlants({ excludeGraveyard, graveyardOnly }) as TData, ...options });
/**
* Get Plant
* Plant
* @param data The data for the request.
* @param data.plantId
* @returns PlantOut OK
* @throws ApiError
*/
export const usePlantServiceTrackerApiViewPlantGetPlant = <TData = Common.PlantServiceTrackerApiViewPlantGetPlantDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ plantId }: {
  plantId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UsePlantServiceTrackerApiViewPlantGetPlantKeyFn({ plantId }, queryKey), queryFn: () => PlantService.trackerApiViewPlantGetPlant({ plantId }) as TData, ...options });
/**
* List Entries
* Entry
* @returns EntryOut OK
* @throws ApiError
*/
export const useEntryServiceTrackerApiViewEntryListEntries = <TData = Common.EntryServiceTrackerApiViewEntryListEntriesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseEntryServiceTrackerApiViewEntryListEntriesKeyFn(queryKey), queryFn: () => EntryService.trackerApiViewEntryListEntries() as TData, ...options });
/**
* Get Plant Entries
* Entry
* @param data The data for the request.
* @param data.plantId
* @returns EntryOut OK
* @throws ApiError
*/
export const useEntryServiceTrackerApiViewEntryGetPlantEntries = <TData = Common.EntryServiceTrackerApiViewEntryGetPlantEntriesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ plantId }: {
  plantId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseEntryServiceTrackerApiViewEntryGetPlantEntriesKeyFn({ plantId }, queryKey), queryFn: () => EntryService.trackerApiViewEntryGetPlantEntries({ plantId }) as TData, ...options });
/**
* Get Entry
* Entry
* @param data The data for the request.
* @param data.entryId
* @returns EntryOut OK
* @throws ApiError
*/
export const useEntryServiceTrackerApiViewEntryGetEntry = <TData = Common.EntryServiceTrackerApiViewEntryGetEntryDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ entryId }: {
  entryId: string;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseEntryServiceTrackerApiViewEntryGetEntryKeyFn({ entryId }, queryKey), queryFn: () => EntryService.trackerApiViewEntryGetEntry({ entryId }) as TData, ...options });
/**
* List Activities
* Activity
* @returns ActivityOut OK
* @throws ApiError
*/
export const useActivityServiceTrackerApiViewActivityListActivities = <TData = Common.ActivityServiceTrackerApiViewActivityListActivitiesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseActivityServiceTrackerApiViewActivityListActivitiesKeyFn(queryKey), queryFn: () => ActivityService.trackerApiViewActivityListActivities() as TData, ...options });
/**
* Create Location
* Location
* @param data The data for the request.
* @param data.requestBody
* @returns LocationOut OK
* @throws ApiError
*/
export const useLocationServiceTrackerApiViewLocationCreateLocation = <TData = Common.LocationServiceTrackerApiViewLocationCreateLocationMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: LocationIn;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: LocationIn;
}, TContext>({ mutationFn: ({ requestBody }) => LocationService.trackerApiViewLocationCreateLocation({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* Create Area
* Area
* @param data The data for the request.
* @param data.requestBody
* @returns AreaOut OK
* @throws ApiError
*/
export const useAreaServiceTrackerApiViewAreaCreateArea = <TData = Common.AreaServiceTrackerApiViewAreaCreateAreaMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: AreaIn;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: AreaIn;
}, TContext>({ mutationFn: ({ requestBody }) => AreaService.trackerApiViewAreaCreateArea({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* New Token
* @param data The data for the request.
* @param data.requestBody
* @returns TokenObtainPairOut OK
* @throws ApiError
*/
export const useUserServiceTrackerApiViewUserNewToken = <TData = Common.UserServiceTrackerApiViewUserNewTokenMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: TokenObtainPair;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: TokenObtainPair;
}, TContext>({ mutationFn: ({ requestBody }) => UserService.trackerApiViewUserNewToken({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* Refresh Token
* @param data The data for the request.
* @param data.requestBody
* @returns TokenRefreshPairOut OK
* @throws ApiError
*/
export const useUserServiceTrackerApiViewUserRefreshToken = <TData = Common.UserServiceTrackerApiViewUserRefreshTokenMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: TokenRefreshInputSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: TokenRefreshInputSchema;
}, TContext>({ mutationFn: ({ requestBody }) => UserService.trackerApiViewUserRefreshToken({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* Register
* @param data The data for the request.
* @param data.requestBody
* @returns UserSchema OK
* @throws ApiError
*/
export const useUserServiceTrackerApiViewUserRegister = <TData = Common.UserServiceTrackerApiViewUserRegisterMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: RegisterIn;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: RegisterIn;
}, TContext>({ mutationFn: ({ requestBody }) => UserService.trackerApiViewUserRegister({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* Create Plant
* Plant
* @param data The data for the request.
* @param data.formData
* @returns PlantOut OK
* @throws ApiError
*/
export const usePlantServiceTrackerApiViewPlantCreatePlant = <TData = Common.PlantServiceTrackerApiViewPlantCreatePlantMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: { area_id: string; purchase_date?: string; graveyard?: boolean; death_date?: string; name: string; common_name?: string; scientific_name?: string; notes?: string; file?: Blob | File; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: { area_id: string; purchase_date?: string; graveyard?: boolean; death_date?: string; name: string; common_name?: string; scientific_name?: string; notes?: string; file?: Blob | File; };
}, TContext>({ mutationFn: ({ formData }) => PlantService.trackerApiViewPlantCreatePlant({ formData }) as unknown as Promise<TData>, ...options });
/**
* Post Plant
* Plant
* @param data The data for the request.
* @param data.plantId
* @param data.formData
* @returns PlantOut OK
* @throws ApiError
*/
export const usePlantServiceTrackerApiViewPlantPostPlant = <TData = Common.PlantServiceTrackerApiViewPlantPostPlantMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: { purchase_date?: string; graveyard?: boolean; death_date?: string; name?: string; common_name?: string; scientific_name?: string; notes?: string; file?: Blob | File; };
  plantId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: { purchase_date?: string; graveyard?: boolean; death_date?: string; name?: string; common_name?: string; scientific_name?: string; notes?: string; file?: Blob | File; };
  plantId: string;
}, TContext>({ mutationFn: ({ formData, plantId }) => PlantService.trackerApiViewPlantPostPlant({ formData, plantId }) as unknown as Promise<TData>, ...options });
/**
* Create Entry
* Entry
* @param data The data for the request.
* @param data.formData
* @returns EntryOut OK
* @throws ApiError
*/
export const useEntryServiceTrackerApiViewEntryCreateEntry = <TData = Common.EntryServiceTrackerApiViewEntryCreateEntryMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: { activities: string[]; Timestamp: string; plant_id: string; notes?: string; plant_health?: number; file?: Blob | File; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: { activities: string[]; Timestamp: string; plant_id: string; notes?: string; plant_health?: number; file?: Blob | File; };
}, TContext>({ mutationFn: ({ formData }) => EntryService.trackerApiViewEntryCreateEntry({ formData }) as unknown as Promise<TData>, ...options });
/**
* Bulk Create Plant
* Bulk
* @param data The data for the request.
* @param data.formData
* @returns BulkPlantCreateResponse OK
* @throws ApiError
*/
export const useBulkServiceTrackerApiViewBulkBulkCreatePlant = <TData = Common.BulkServiceTrackerApiViewBulkBulkCreatePlantMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  formData: { file: Blob | File; };
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  formData: { file: Blob | File; };
}, TContext>({ mutationFn: ({ formData }) => BulkService.trackerApiViewBulkBulkCreatePlant({ formData }) as unknown as Promise<TData>, ...options });
/**
* Patch Location
* Location
* @param data The data for the request.
* @param data.locationId
* @param data.requestBody
* @returns LocationOut OK
* @throws ApiError
*/
export const useLocationServiceLocationPatchLocation = <TData = Common.LocationServiceLocationPatchLocationMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  locationId: string;
  requestBody: LocationPatch;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  locationId: string;
  requestBody: LocationPatch;
}, TContext>({ mutationFn: ({ locationId, requestBody }) => LocationService.locationPatchLocation({ locationId, requestBody }) as unknown as Promise<TData>, ...options });
/**
* Patch Area
* Area
* @param data The data for the request.
* @param data.areaId
* @param data.requestBody
* @returns AreaOut OK
* @throws ApiError
*/
export const useAreaServiceAreaPatchArea = <TData = Common.AreaServiceAreaPatchAreaMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  areaId: string;
  requestBody: AreaPatch;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  areaId: string;
  requestBody: AreaPatch;
}, TContext>({ mutationFn: ({ areaId, requestBody }) => AreaService.areaPatchArea({ areaId, requestBody }) as unknown as Promise<TData>, ...options });
/**
* Update Me
* @param data The data for the request.
* @param data.requestBody
* @returns UserSchema OK
* @throws ApiError
*/
export const useUserServiceTrackerApiViewUserUpdateMe = <TData = Common.UserServiceTrackerApiViewUserUpdateMeMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: UserSchema;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: UserSchema;
}, TContext>({ mutationFn: ({ requestBody }) => UserService.trackerApiViewUserUpdateMe({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* Delete Location
* Location
* @param data The data for the request.
* @param data.locationId
* @returns DeleteStatus OK
* @throws ApiError
*/
export const useLocationServiceTrackerApiViewLocationDeleteLocation = <TData = Common.LocationServiceTrackerApiViewLocationDeleteLocationMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  locationId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  locationId: string;
}, TContext>({ mutationFn: ({ locationId }) => LocationService.trackerApiViewLocationDeleteLocation({ locationId }) as unknown as Promise<TData>, ...options });
/**
* Delete Area
* Area
* @param data The data for the request.
* @param data.areaId
* @returns DeleteStatus OK
* @throws ApiError
*/
export const useAreaServiceTrackerApiViewAreaDeleteArea = <TData = Common.AreaServiceTrackerApiViewAreaDeleteAreaMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  areaId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  areaId: string;
}, TContext>({ mutationFn: ({ areaId }) => AreaService.trackerApiViewAreaDeleteArea({ areaId }) as unknown as Promise<TData>, ...options });
/**
* Delete Plant
* Plant
* @param data The data for the request.
* @param data.plantId
* @returns DeleteStatus OK
* @throws ApiError
*/
export const usePlantServiceTrackerApiViewPlantDeletePlant = <TData = Common.PlantServiceTrackerApiViewPlantDeletePlantMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  plantId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  plantId: string;
}, TContext>({ mutationFn: ({ plantId }) => PlantService.trackerApiViewPlantDeletePlant({ plantId }) as unknown as Promise<TData>, ...options });
/**
* Delete Entry
* Entry
* @param data The data for the request.
* @param data.entryId
* @returns DeleteStatus OK
* @throws ApiError
*/
export const useEntryServiceTrackerApiViewEntryDeleteEntry = <TData = Common.EntryServiceTrackerApiViewEntryDeleteEntryMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  entryId: string;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  entryId: string;
}, TContext>({ mutationFn: ({ entryId }) => EntryService.trackerApiViewEntryDeleteEntry({ entryId }) as unknown as Promise<TData>, ...options });
