import { View, Image, FlatList, SafeAreaView } from "react-native";
import logoImg from "../../../src/assets/logo-nlw-esports.png";
import { styles } from "./styles";
import { Heading } from "../../components/Heading";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Background } from "../../components/Background";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const nav = useNavigation();

  function handleNavigation({ id, title, bannerUrl }: GameCardProps) {
    nav.navigate("game", { id, title, bannerUrl });
  }
  useEffect(() => {
    fetch("http://192.168.0.106:3001/games")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar."
        ></Heading>

        <FlatList
          contentContainerStyle={styles.contentList}
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleNavigation(item)} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        ></FlatList>
      </SafeAreaView>
    </Background>
  );
}
