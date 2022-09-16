import { ImageBackground } from "react-native";

import { styles } from "./styles";

interface Props {
  children: React.ReactNode;
}

import backgroundImg from "../../assets/background-galaxy.png";

export function Background({ children }: Props) {
  return (
    <ImageBackground
      source={backgroundImg}
      defaultSource={backgroundImg}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}
