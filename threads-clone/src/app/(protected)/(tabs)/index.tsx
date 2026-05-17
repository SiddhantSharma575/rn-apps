import PostListItem from "@/components/PostListItem";
import { dummyPosts } from "@/dummyData";
import { Link } from "expo-router";
import { FlatList, Text } from "react-native";

export default function Index() {
  return (
    <FlatList
      data={dummyPosts}
      renderItem={({ item }) => <PostListItem post={item} />}
      ListHeaderComponent={() => (
        <Link href="/new" asChild>
          <Text className="text-white p-4 text-center text-3xl font-bold">
            Create Post
          </Text>
        </Link>
      )}
    />
  );
}
