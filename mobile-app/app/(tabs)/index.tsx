import { ScrollView, StyleSheet } from "react-native";

import { CreateItemForm } from "@/components/forms/create-item-form";
import { CreateMaterialForm } from "@/components/forms/create-material-form";
import { CreateRecordForm } from "@/components/forms/create-record-form";
import { View } from "@/components/Themed";

const RecordsScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
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
