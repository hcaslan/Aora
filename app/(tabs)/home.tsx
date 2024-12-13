import { SetStateAction, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import { getCurrentUser } from "../../lib/appwrite";



const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<Document | null>(null);

  useEffect(() => {
    getCurrentUser().then((user) => setUser(user as SetStateAction<Document | null>));
  }, []);
  const onRefresh = async () => {
    setRefreshing(true);
    
    setRefreshing(false);
  };

  // one flatlist
  // with list header
  // and horizontal flatlist

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={[]}
        renderItem={ () => <View></View>}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                {user && (
                  <Text className="text-2xl font-psemibold text-white">
                    {(user as any).username}
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


            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

            </View>
          </View>
        )}

        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
