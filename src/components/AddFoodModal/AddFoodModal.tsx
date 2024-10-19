import { FC } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import { AddFoodModalProps } from "../../types";
import { Button, Icon, Input } from "@rneui/themed";

const AddFoodModal: FC<AddFoodModalProps> = ({ onClose, visible }) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeBtnContainer}>
            <Button
              icon={<Icon name="close" size={28} />}
              onPress={onClose}
              type="clear"
            />
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>KCal</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Nomre</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Porción</Text>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Button
              title="Agregar"
              color={"success"}
              radius={"lg"}
              icon={<Icon name="add" color={"white"} />}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "75%",
    backgroundColor: "white",
    padding: 18,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeBtnContainer: {
    alignItems: "flex-end",
  },
  formItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 2,
  },
  legendContainer: {
    flex: 1,
  },
  legend: {
    fontWeight: "500",
  },
  btnContainer: {
    alignItems: "flex-end",
    marginTop: 24,
  },
});

export default AddFoodModal;
