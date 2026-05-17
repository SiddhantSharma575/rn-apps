import PostListItem from "@/components/PostListItem";
import { dummyPosts } from "@/dummyData";
import { supabase } from "@/lib/supabase";
import { Post } from "@/types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Text } from "react-native";

export default function Index() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*, user: profiles(*)");
      if (error) {
        console.error(error);
      } else {
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  console.log(JSON.stringify(posts, null, 2));

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
