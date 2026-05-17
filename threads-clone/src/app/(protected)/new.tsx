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
            onPress={() => {}}
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
