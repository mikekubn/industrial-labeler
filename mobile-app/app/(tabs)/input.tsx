import { ScrollView, StyleSheet } from "react-native";

import { InputRecordForm } from "@/components/forms/input-form";
import { View } from "@/components/Themed";

const InputScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
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
