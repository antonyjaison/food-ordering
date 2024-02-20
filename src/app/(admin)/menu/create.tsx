import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import React, { useState } from "react";
import Button from "@components/Button";
import { defaultPizzaImage } from "@components/ProductListItem";
import Colors from "@constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  const isUpdating = !!id;

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    setErrors("");
    if (!name || !price) {
      setErrors("Please fill in all fields");
      return false;
    }
    if (isNaN(Number(price))) {
      setErrors("Price must be a number");
      return false;
    }
    return true;
  };

  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    console.warn("Create");
    resetFields();
  };

  const onUpdateCreate = () => {
    if (!validateInput()) {
      return;
    }

    console.warn("Update");
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdateCreate();
    } else {
      onCreate();
    }
  };

  const onDelete = () => {
    console.warn("Delete");
  };

  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="9.99"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton}>
          Delete
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },
  label: {
    fontSize: 16,
    color: "gray",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    color: Colors.light.tint,
    fontWeight: "bold",
    alignSelf: "center",
    marginVertical: 10,
  },
});

export default CreateProductScreen;
