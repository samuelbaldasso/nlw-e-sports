import React, { useState } from "react";
import * as Clipboard from "expo-clipboard";
import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopping, setIsCopping] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);
    Alert.alert(
      "Discord copiado!",
      "Usuário copiado pra você colocar no Discord."
    );
    setIsCopping(false);
  }

  return (
    <Modal
      animationType="fade"
      {...rest}
      transparent={true}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={20}
              color={THEME.COLORS.CAPTION_500}
            ></MaterialIcons>
          </TouchableOpacity>

          <CheckCircle
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          ></CheckCircle>

          <Heading
            title="Let´s play!"
            subtitle="Agora é só começar a jogar..."
            style={{ alignItems: "center", marginTop: 24 }}
          ></Heading>

          <Text style={styles.label}>Adicione no Discord</Text>

          <TouchableOpacity
            onPress={handleCopyDiscordToClipboard}
            style={styles.discordButton}
            disabled={isCopping}
          >
            <Text style={styles.text}>
              {isCopping ? (
                <ActivityIndicator color={THEME.COLORS.PRIMARY} />
              ) : (
                discord
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
