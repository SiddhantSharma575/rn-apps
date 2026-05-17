import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function Profile() {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Pressable
        onPress={handleSignOut}
        disabled={loading}
        className="flex-row items-center gap-2"
      >
        {loading && <ActivityIndicator size="small" color="#fff" />}
        <Text className="text-white text-base font-semibold">Sign Out</Text>
      </Pressable>
    </View>
  );
}
