import { useMMKVString } from "react-native-mmkv";

import { storage } from "./storage";

export const useIsBaseURLSet = () => {
  const [baseURL, setBaseURL] = useMMKVString("base_url", storage);

  return [baseURL, setBaseURL] as const;
};
