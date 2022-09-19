import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { Entypo } from "@expo/vector-icons";
import { styles } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GameParams } from "../../@types/navigation";
import { THEME } from "../../theme";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { DuoCard, DuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;
  const navigation = useNavigation();

  function handleRollback() {
    navigation.goBack();
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.0.106:3001/ads/${adsId}/discord`)
      .then((res) => res.json())
      .then((data) => {
        setDiscordDuoSelected(data.discord);
      });
  }

  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");
  useEffect(() => {
    fetch(`http://192.168.0.106:3001/games/${game.id}/ads`)
      .then((res) => res.json())
      .then((data) => {
        setDuos(data);
      });
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleRollback}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right}></View>
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        ></Image>
        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar."
        ></Heading>

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => {
                getDiscordUser(item.id);
              }}
            />
          )}
          horizontal
          contentContainerStyle={[
            duos.length > 0 ? styles.content : styles.emptyContent,
          ]}
          style={styles.containerList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Não há nenhum anúncio ainda...</Text>
          )}
        ></FlatList>

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord="Samuel Baldasso#9627"
          onClose={() => {
            setDiscordDuoSelected("");
          }}
        ></DuoMatch>
      </SafeAreaView>
    </Background>
  );
}
