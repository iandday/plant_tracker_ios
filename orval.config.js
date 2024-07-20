module.exports = {
  plant_tracker_api: {
    input: "http://localhost/api/openapi.json",
    output: {
      mode: "split",
      target: "./lib/plant_tracker/endpoints/PlantTrackerFromFileSpecWithTransformer.ts",
      schemas: "./lib/plant_tracker/model/",
      client: "react-query",
      allParamsOptional: true,
      mock: false,
      prettier: true,
      override: {
        mutator: {
          path: "./lib/plant_tracker/mutator/custom-instance.ts",
          name: "customInstance",
        },
        query: {
          useQuery: true,
          useSuspenseQuery: true,
        },
      },
    },
  },
  plant_tracker_zod: {
    input: { target: "http://localhost/api/openapi.json" },
    output: {
      target: "./orval/plant_tracker_zod.ts",
      client: "zod",
      mode: "single",
    },
  },
};
