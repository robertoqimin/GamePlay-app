import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

type Propriedades = { aoEntrar: () => void };

export default function TelaLogin({ aoEntrar }: Propriedades) {
  const { width: largura, height: altura } = useWindowDimensions();
  const larguraIlustracao = Math.min(largura, 400) + 26;

  return (
    <ScrollView
      style={estilos.rolagem}
      contentContainerStyle={[
        estilos.conteudoRolagem,
        { minHeight: altura, paddingTop: Math.max(24, (altura - 642) / 2) },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={estilos.estrutura}>
        <Image
          source={require('../../assets/illustration.png')}
          style={{
            width: larguraIlustracao,
            height: larguraIlustracao * (357 / 375),
          }}
          resizeMode="contain"
        />
        <View style={estilos.conteudo}>
          <Text style={estilos.titulo}>
            {'Conecte-se\ne organize suas\njogatinas'}
          </Text>
          <Text style={estilos.subtitulo}>
            {'Crie grupos para jogar seus games\nfavoritos com seus amigos'}
          </Text>
          <Pressable
            onPress={aoEntrar}
            style={({ pressed: pressionado }) => [
              estilos.botao,
              pressionado && estilos.botaoPressionado,
            ]}
          >
            <View style={estilos.areaIcone}>
              <Image
                source={require('../../assets/discord.png')}
                style={estilos.iconeDiscord}
              />
            </View>
            <Text style={estilos.textoBotao}>Entrar com Discord</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  rolagem: { flex: 1 },
  conteudoRolagem: { alignItems: 'center', paddingBottom: 40 },
  estrutura: { width: '100%', maxWidth: 400, alignItems: 'center' },
  conteudo: {
    width: '100%',
    alignItems: 'center',
    marginTop: -52,
    paddingHorizontal: 32,
  },
  titulo: {
    fontFamily: 'Rajdhani_700Bold',
    fontSize: 40,
    lineHeight: 40,
    color: '#DDE3F0',
    textAlign: 'center',
    includeFontPadding: false,
  },
  subtitulo: {
    marginTop: 16,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    lineHeight: 25,
    textAlign: 'center',
    color: '#DDE3F0',
  },
  botao: {
    marginTop: 48,
    width: '100%',
    maxWidth: 274,
    minHeight: 56,
    backgroundColor: '#E51C44',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  botaoPressionado: { backgroundColor: '#C5163A', opacity: 0.9 },
  areaIcone: {
    width: 56,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#B81836',
  },
  iconeDiscord: { width: 24, height: 18, resizeMode: 'contain' },
  textoBotao: {
    flex: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingVertical: 16,
  },
});
