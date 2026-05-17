import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreatePost = () => {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const onSubmit = async () => {
    if (!text.trim() || !user) return;

    const { data, error } = await supabase.from("posts").insert({
      content: text,
      user_id: user.id,
    });
    if (error) {
      console.error(error);
    }
    setText("");
  };

  return (
    <SafeAreaView className="p-4 flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 130 : 0}
        className="flex-1"
      >
        <Text className="text-white text-lg font-bold">username</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={10}
          placeholder="What's on your mind?"
          placeholderTextColor={"#666"}
          className="text-white text-lg font-bold"
        />
        <View className="mt-auto">
          <Pressable
            onPress={onSubmit}
            className="bg-white p-3 px-6 self-end rounded-full"
          >
            <Text className="text-black font-bold">Post</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreatePost;
