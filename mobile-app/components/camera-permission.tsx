import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type CameraPermissionProps = {
  onRequestPermission: () => void | Promise<void>;
};

const CameraPermission = ({ onRequestPermission }: CameraPermissionProps) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator
      >
        <Text style={styles.message}>Potřebujeme vaše oprávnění k přístupu k kaměře</Text>
        <Pressable accessibilityRole="button" style={styles.scanButton} onPress={onRequestPermission}>
          <Text style={styles.scanButtonText}>Udělit oprávnění k kaměře</Text>
        </Pressable>
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
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#333"
  },
  scanButton: {
    width: 260,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    backgroundColor: "#2563eb"
  },
  scanButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center"
  }
});

export { CameraPermission };
