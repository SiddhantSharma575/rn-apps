import PostListItem from "@/components/PostListItem";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function Index() {
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*, user: profiles(*)")
      .throwOnError();

    return data;
  };

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <ActivityIndicator className="flex-1 justify-center items-center" />;
  }

  if (isError) {
    return <Text className="text-white">Error fetching posts</Text>;
  }

  return (
    <FlatList
      data={posts}
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
