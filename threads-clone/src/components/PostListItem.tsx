import { Post } from "@/types";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";

dayjs.extend(relativeTime);

function timeAgo(dateString: string): string {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w`;
  return past.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const ACTION_ICONS: {
  icon: React.ComponentProps<typeof Feather>["name"];
  key: "likes" | "replies" | "reposts" | "shares";
}[] = [
  { icon: "heart", key: "likes" },
  { icon: "message-circle", key: "replies" },
  { icon: "repeat", key: "reposts" },
  { icon: "send", key: "shares" },
];

function formatCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export default function PostListItem({ post }: { post: Post }) {
  const hasReplies = post.replies && post.replies.length > 0;

  const counts: Record<"likes" | "replies" | "reposts" | "shares", number> = {
    likes: 0,
    replies: post.replies?.length ?? 0,
    reposts: 0,
    shares: 0,
  };

  return (
    <View className="flex-row px-5 pt-8 pb-5 bg-black border-b border-neutral-800">
      {/* Left column: avatar + thread line */}
      <View className="items-center mr-3.5">
        <Image
          source={{ uri: post.user.image }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
          className="bg-neutral-700"
          contentFit="cover"
        />
        {hasReplies && (
          <View className="w-0.5 flex-1 mt-2 bg-neutral-700 rounded-full" />
        )}
      </View>

      {/* Right column: content */}
      <View className="flex-1">
        {/* Header row */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          {/* name + username — shrinks so the right side is never pushed off */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              minWidth: 0,
              marginRight: 8,
              gap: 6,
            }}
          >
            <Text
              className="text-white font-semibold text-[15px]"
              numberOfLines={1}
              style={{ flexShrink: 1 }}
            >
              {post.user.name}
            </Text>
            <Text
              className="text-neutral-500 text-[13px]"
              numberOfLines={1}
              style={{ flexShrink: 1 }}
            >
              @{post.user.username}
            </Text>
          </View>
          {/* time + more — never shrinks */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <Text className="text-neutral-500 text-[13px]">
              {dayjs(post.createdAt).fromNow()}
            </Text>
            <Pressable hitSlop={8}>
              <Feather name="more-horizontal" size={18} color="#737373" />
            </Pressable>
          </View>
        </View>

        {/* Post content */}
        <Text className="text-white text-[15px] leading-[22px] mb-4">
          {post.content}
        </Text>

        {/* Action buttons with counts */}
        <View className="flex-row gap-6 mt-1 mb-1">
          {ACTION_ICONS.map(({ icon, key }) => (
            <Pressable
              key={key}
              className="flex-row items-center gap-2 px-1 py-1 active:opacity-50"
              hitSlop={8}
            >
              <Feather name={icon} size={21} color="#a3a3a3" />
              <Text className="text-neutral-500 text-[13px]">
                {formatCount(counts[key])}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
