import { Image, Pressable, StyleSheet } from 'react-native';

type Propriedades = { aoContinuar: () => void; pronto: boolean };

export default function TelaInicial({ aoContinuar, pronto }: Propriedades) {
  return (
    <Pressable
      onPress={aoContinuar}
      style={estilos.tela}
    >
      {pronto && (
        <Image
          source={require('../../assets/icones/logo.png')}
          style={estilos.logo}
          resizeMode="contain"
        />
      )}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#0E1647',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 184,
    height: 132,
    transform: [{ translateY: -7 }],
  },
});
