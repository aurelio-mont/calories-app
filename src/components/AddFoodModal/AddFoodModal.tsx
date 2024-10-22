import { FC, useEffect, useState } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import { AddFoodModalProps } from "../../types";
import { Button, Icon, Input } from "@rneui/themed";
import useFoodStorage from "../../hooks/useFoodStorage";

const AddFoodModal: FC<AddFoodModalProps> = ({ onClose, visible }) => {
  const [calories, setCalories] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [portion, setPortion] = useState<string>("");

  const { onSaveFood } = useFoodStorage();

  const resetValues = () => {
    setCalories("");
    setName("");
    setPortion("");
  };

  useEffect(() => {
    resetValues;
  }, [visible]);

  const handleAddPress = async () => {
    try {
      await onSaveFood({ calories, name, portion });
      onClose(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => onClose()}
      transparent
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeBtnContainer}>
            <Button
              icon={<Icon name="close" size={28} />}
              onPress={() => onClose()}
              type="clear"
            />
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                value={calories}
                onChangeText={(text) => setCalories(text)}
              />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Calorias</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input value={name} onChangeText={(text) => setName(text)} />
            </View>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>Nombre</Text>
            </View>
          </View>
          <View style={styles.formItem}>
            <View style={styles.inputContainer}>
              <Input
                value={portion}
                onChangeText={(text) => setPortion(text)}
              />
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
              onPress={handleAddPress}
              disabled={
                calories.trim() === "" ||
                name.trim() === "" ||
                portion.trim() === ""
              }
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
