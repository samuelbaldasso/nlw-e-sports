import React from "react";
import { GameController } from "phosphor-react-native";
import { View, TouchableOpacity, Text } from "react-native";
import { THEME } from "../../theme";
import { DuoInfo } from "../DuoInfo";

import { styles } from "./styles";

export interface DuoCardProps {
  hourEnd: string;
  id: string;
  hourstart: string;
  name: string;
  useVoiceChannel: boolean;
  weekDays: string[];
  yearsPlaying: number;
}

interface Props {
  data: DuoCardProps;
  onConnect: () => void;
}
export function DuoCard({ data, onConnect }: Props) {
  return (
    <View style={styles.container}>
      <DuoInfo label="Nome" value={data.name} colorValue="#fff"></DuoInfo>
      <DuoInfo
        label="Tempo de jogo"
        value={`${data.yearsPlaying} anos`}
        colorValue="#fff"
      ></DuoInfo>
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias \u2022 ${data.hourstart} - ${data.hourEnd}`}
        colorValue="#fff"
      ></DuoInfo>
      <DuoInfo
        label="Chamada de áudio"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        colorValue={
          data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT
        }
      ></DuoInfo>

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20}></GameController>
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
