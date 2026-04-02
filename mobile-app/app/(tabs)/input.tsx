import { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

import { useQueryClient } from "@tanstack/react-query";
import { InputRecordForm } from "@/components/forms/input-form";
import { View } from "@/components/Themed";

const InputScreen = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["items"] });
    queryClient.invalidateQueries({ queryKey: ["materials"] });
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        <InputRecordForm />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    padding: 20
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 16,
    alignItems: "center"
  }
});

export default InputScreen;
