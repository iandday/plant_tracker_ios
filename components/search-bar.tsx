import FeatherIcon from "react-native-vector-icons/Feather";
import { Input, TouchableOpacity, View, Text } from "./ui";

interface searchBarProps {
  search: string;
  setSearch: any;
}

const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export default function SearchBar({ search, setSearch }: searchBarProps) {
  return (
    <>
      <View className='flex flex-row justify-center align-center items-center'>
        <FeatherIcon
          color='#848484'
          name='search'
          size={17}
          className=''
        />

        <Input
          autoCapitalize='none'
          autoCorrect={false}
          clearButtonMode='while-editing'
          onChangeText={(val) => debounce(setSearch(val), 5000)}
          placeholder='Start searching..'
          placeholderTextColor='#848484'
          returnKeyType='done'
          value={search}
          className=''
        />
        {search ? (
          <TouchableOpacity
            onPress={() => {
              setSearch("");
            }}
          >
            <Text className='pl-5'>Cancel</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
}
