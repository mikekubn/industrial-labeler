import { useState } from "react";
import { RefreshControl, ScrollView, StyleSheet } from "react-native";

import { useQueryClient } from "@tanstack/react-query";
import { CreateItemForm } from "@/components/forms/create-item-form";
import { CreateMaterialForm } from "@/components/forms/create-material-form";
import { CreateRecordForm } from "@/components/forms/create-record-form";
import { View } from "@/components/Themed";

const RecordsScreen = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["records"] });
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
        <CreateItemForm />
        <CreateMaterialForm />
        <CreateRecordForm />
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

export default RecordsScreen;
