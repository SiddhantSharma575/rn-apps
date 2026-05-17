import PostListItem from "@/components/PostListItem";
import { dummyPosts } from "@/dummyData";
import { FlatList } from "react-native";

export default function Index() {
  return (
    <FlatList
      data={dummyPosts}
      renderItem={({ item }) => <PostListItem post={item} />}
    />
  );
}
