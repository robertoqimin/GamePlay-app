import { useVoltarAndroid } from '../hooks/useVoltarAndroid';
import AvatarGenerico from '../components/AvatarGenerico';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Partida } from '../dados';

const jogadores = [
  { nome: 'Tiago Luchtemberg', disponivel: true },
  { nome: 'Rodrigo Gonçalves', disponivel: false },
  { nome: 'Diego Fernandes', disponivel: false },
];

export default function TelaDetalhes({
  partida,
  aoVoltar,
}: {
  partida: Partida;
  aoVoltar: () => void;
}) {
  const descricao =
    partida.descricao ||
    'É hoje que vamos chegar ao challenger sem perder uma partida da md10';

  useVoltarAndroid(() => {
    aoVoltar();
    return true;
  });

  return (
    <View style={estilos.tela}>
      <View style={estilos.cabecalho}>
        <Pressable
          onPress={aoVoltar}
          style={({ pressed: pressionado }) => [estilos.botaoCabecalho, pressionado && estilos.pressionado]}
        >
          <Image source={require('../../assets/icones/voltar.png')} style={{ width: 24, height: 24 }} resizeMode="contain" />
        </Pressable>
        <Text style={estilos.tituloCabecalho}>
          Detalhes
        </Text>
        <View style={estilos.botaoCabecalho}>
          <Image source={require('../../assets/icones/compartilhar.png')} style={{ width: 24, height: 24 }} resizeMode="contain" />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={require('../../assets/home/banner.png')}
          style={estilos.banner}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['rgba(19,25,55,0.05)', 'rgba(19,25,55,0.45)', '#131937']}
            locations={[0, 0.5, 1]}
            style={estilos.sobreposicaoBanner}
          >
            <Text style={estilos.tituloPartida}>{partida.titulo}</Text>
            <Text style={estilos.descricao}>{descricao}</Text>
          </LinearGradient>
        </ImageBackground>
        <View style={estilos.jogadores}>
          <View style={estilos.cabecalhoSecao}>
            <Text style={estilos.tituloSecao}>
              Jogadores
            </Text>
            <Text style={estilos.secundario}>Total {jogadores.length}</Text>
          </View>
          {jogadores.map((jogador, indice) => (
            <View key={jogador.nome} style={estilos.jogador}>
              <View style={estilos.avatar}>
                <AvatarGenerico />
              </View>
              <View
                style={[estilos.informacoesJogador, indice < jogadores.length - 1 && estilos.divisoria]}
              >
                <Text style={estilos.nomeJogador}>{jogador.nome}</Text>
                <View style={estilos.status}>
                  <View
                    style={[
                      estilos.ponto,
                      {
                        backgroundColor: jogador.disponivel
                          ? '#32BD50'
                          : '#E51C44',
                      },
                    ]}
                  />
                  <Text style={estilos.secundario}>
                    {jogador.disponivel ? 'Disponível' : 'Ocupado'}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={estilos.rodape}>
          <Pressable
            onPress={() => {}}
            style={({ pressed: pressionado }) => [estilos.entrar, pressionado && estilos.pressionado]}
          >
            <View style={estilos.areaDiscord}>
              <Image
                source={require('../../assets/discord.png')}
                style={estilos.discord}
              />
            </View>
            <Text style={estilos.textoEntrar}>Entrar na partida</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, width: '100%', maxWidth: 560, alignSelf: 'center' },
  cabecalho: {
    height: 73,
    backgroundColor: '#0E1647',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  botaoCabecalho: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloCabecalho: {
    fontFamily: 'Rajdhani_700Bold',
    fontSize: 20,
    color: '#DDE3F0',
  },
  conteudo: { flexGrow: 1 },
  banner: { width: '100%', minHeight: 234 },
  sobreposicaoBanner: {
    flex: 1,
    minHeight: 234,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 90,
    paddingBottom: 24,
  },
  tituloPartida: {
    fontFamily: 'Rajdhani_700Bold',
    fontSize: 30,
    color: '#DDE3F0',
    lineHeight: 36,
  },
  descricao: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    lineHeight: 21,
    color: '#DDE3F0',
    marginTop: 12,
  },
  jogadores: { paddingHorizontal: 16, paddingTop: 24 },
  cabecalhoSecao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  tituloSecao: {
    fontFamily: 'Rajdhani_700Bold',
    fontSize: 18,
    color: '#DDE3F0',
  },
  secundario: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#ABB1CC' },
  jogador: { flexDirection: 'row', gap: 16, minHeight: 72 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#303880',
    marginTop: 3,
  },
  informacoesJogador: { flex: 1, paddingTop: 3, paddingBottom: 14, marginBottom: 12 },
  divisoria: { borderBottomWidth: 1, borderBottomColor: '#252D59' },
  nomeJogador: {
    fontFamily: 'Rajdhani_700Bold',
    fontSize: 18,
    lineHeight: 22,
    color: '#DDE3F0',
  },
  status: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  ponto: { width: 8, height: 8, borderRadius: 4 },
  rodape: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 14,
  },
  entrar: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    borderRadius: 8,
    backgroundColor: '#E51C44',
    overflow: 'hidden',
  },
  areaDiscord: {
    width: 56,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#B81836',
  },
  discord: { width: 24, height: 18, resizeMode: 'contain' },
  textoEntrar: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    color: '#FFFFFF',
  },
  pressionado: { opacity: 0.7 },
});
