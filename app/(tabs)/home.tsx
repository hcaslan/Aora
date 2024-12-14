import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import { getAllPosts, getCurrentUser } from "../../lib/appwrite";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { Models } from "react-native-appwrite";

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<Models.Document | null>(null);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  console.log(posts[0])
  useEffect(() => {
    getCurrentUser().then((user) => setUser(user));
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={ ({item}) => ( <VideoCard title={item.title} creator={item.creator.username} avatar={item.creator.avatar} thumbnail={item.thumbnail} video={item.video}/>)}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                {user && (
                  <Text className="text-2xl font-psemibold text-white">
                    {user.username}
                  </Text>
                )}
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
              
            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

            </View>
          </View>
        )}
        
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}

        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
