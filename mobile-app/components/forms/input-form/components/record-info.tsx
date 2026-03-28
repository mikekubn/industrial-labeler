import type { RecordResponseByItemIdSchema } from "@/services/record/schemes/recod";

import { StyleSheet, View } from "react-native";

import { Text } from "@/components/Themed";

const RecordInfo = ({ data }: { data: RecordResponseByItemIdSchema }) => {
  return (
    <View style={styles.data}>
      <View>
        <Text style={styles.label}>Název položky</Text>
        <Text style={styles.value}>{data?.item.name}</Text>
      </View>
      <View>
        <Text style={styles.label}>Název materiálu</Text>
        <Text style={styles.value}>{data?.material.name}</Text>
      </View>
    </View>
  );
};

export { RecordInfo };

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "700"
  },
  value: {
    fontSize: 16,
    fontWeight: "400"
  },
  data: {
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
    gap: 40,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});
