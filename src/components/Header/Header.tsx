import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/themed";
import { StyleSheet, View, Text, Image } from "react-native";

const staticInfo = {
  name: "Aurelio Mont",
  uri: "https://avatars.githubusercontent.com/u/3631347?v=4",
};
const Header = () => {
  const { canGoBack, goBack } = useNavigation();
  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View style={styles.arrowContainer}>
          <Button
            icon={<Icon name="arrow-back" color={"black"} size={24} />}
            type="clear"
            onPress={goBack}
          />
        </View>
      ) : null}
      <View style={styles.leftContainer}>
        <Text style={styles.name}>Hello, {staticInfo.name}</Text>
        <Text style={styles.subtitle}>Welcome back to your goal</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={{ uri: staticInfo.uri }} style={styles.profileImage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 24,
  },
  arrowContainer: {},
});

export default Header;
