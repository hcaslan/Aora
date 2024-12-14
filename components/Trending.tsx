import {
  FlatList,
  Text,
} from "react-native";


const Trending = ({ posts } : any) => {
  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text className="text-white text-3xl">{item.id}</Text>
      )}
    />
  );
};

export default Trending;
