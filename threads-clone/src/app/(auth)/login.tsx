import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) Alert.alert(error.message);
      // router.push("/(protected)/(tabs)");
    } catch (error) {
      Alert.alert(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#101010]"
    >
      <View className="flex-1 justify-center px-6">
        {/* Logo / Title */}
        <View className="items-center mb-12">
          <Text className="text-white text-4xl font-bold tracking-tight">
            Threads
          </Text>
          <Text className="text-neutral-400 text-base mt-2">
            Sign in to continue
          </Text>
        </View>

        {/* Form */}
        <View className="gap-4">
          <View className="bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-4">
            <TextInput
              className="text-white text-base"
              placeholder="Email"
              placeholderTextColor="#737373"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View className="bg-neutral-900 border border-neutral-800 rounded-2xl px-4 py-4">
            <TextInput
              className="text-white text-base"
              placeholder="Password"
              placeholderTextColor="#737373"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="current-password"
            />
          </View>

          <Pressable
            onPress={signInWithEmail}
            className="bg-white rounded-2xl py-4 items-center mt-2 active:opacity-80"
          >
            <Text className="text-black text-base font-semibold">
              {loading ? "Logging in..." : "Log in"}
            </Text>
          </Pressable>
        </View>

        {/* Divider */}
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-neutral-800" />
          <Text className="text-neutral-500 mx-4 text-sm">or</Text>
          <View className="flex-1 h-px bg-neutral-800" />
        </View>

        {/* Sign up link */}
        <Link
          className="flex-row justify-center active:opacity-70"
          href="/(auth)/register"
        >
          <Text className="text-neutral-400 text-sm">
            Don&apos;t have an account?{" "}
          </Text>
          <Text className="text-white text-sm font-semibold">Create one</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
}
