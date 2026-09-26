import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AvatarGenerico from '../components/AvatarGenerico';
import { icones } from '../icones';
import { Partida, categorias, partidasIniciais, capas } from '../dados';
import TelaAgendamento from './TelaAgendamento';
import TelaDetalhes from './TelaDetalhes';

export default function TelaUsuario() {
  const [agendando, definirAgendando] = useState(false);
  const [partidaSelecionada, definirPartidaSelecionada] = useState<Partida | null>(null);

  if (agendando) {
    return <TelaAgendamento aoVoltar={() => definirAgendando(false)} />;
  }

  if (partidaSelecionada) {
    return (
      <TelaDetalhes
        partida={partidaSelecionada}
        aoVoltar={() => definirPartidaSelecionada(null)}
      />
    );
  }

  return (
    <View style={estilos.tela}>
      <ScrollView
        contentContainerStyle={estilos.recipiente}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.cabecalho}>
          <View style={estilos.molduraAvatar}>
            <AvatarGenerico />
          </View>
          <View style={estilos.saudacao}>
            <Text style={estilos.ola}>
              Olá, <Text style={estilos.nome}>Tiago</Text>
            </Text>
            <Text style={estilos.mensagem}>Hoje é dia de vitória</Text>
          </View>
          <Pressable
            style={({ pressed }) => [estilos.adicionar, pressed && estilos.pressionado]}
            onPress={() => definirAgendando(true)}
          >
            <Text style={estilos.mais}>＋</Text>
          </Pressable>
        </View>

        <View style={estilos.categorias}>
          {categorias.map((item) => (
            <View key={item.id} style={estilos.categoria}>
              <LinearGradient
                colors={['#1D2452', '#242C65']}
                style={estilos.conteudoCategoria}
              >
                <Image source={icones[item.id]} style={estilos.iconeCategoria} resizeMode="contain" />
                <Text style={estilos.nomeCategoria}>{item.rotulo}</Text>
              </LinearGradient>
            </View>
          ))}
        </View>

        <View style={estilos.cabecalhoSecao}>
          <Text style={estilos.tituloSecao}>Partidas agendadas</Text>
          <Text style={estilos.total}>Total {partidasIniciais.length}</Text>
        </View>
        {partidasIniciais.map((partida) => (
          <CartaoPartida
            key={partida.id}
            partida={partida}
            aoAbrir={() => definirPartidaSelecionada(partida)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const rotulosCategorias = {
  ranqueada: 'Ranqueada',
  duelo: '1×1',
  diversao: 'Diversão',
};

function CartaoPartida({ partida, aoAbrir }: { partida: Partida; aoAbrir: () => void }) {
  const { titulo, categoria, data, anfitriao, jogo } = partida;
  const papel = anfitriao ? 'Anfitrião' : 'Visitante';
  const corPapel = anfitriao ? '#E51C44' : '#32BD50';
  const usaIcone = jogo === 'lol' || jogo === 'valorant';
  const imagem = usaIcone ? icones[jogo] : capas[jogo];

  return (
    <Pressable
      onPress={aoAbrir}
      style={({ pressed }) => [estilos.partida, pressed && estilos.pressionado]}
    >
      <View style={[estilos.capa, jogo === 'valorant' && estilos.capaValorant]}>
        <Image
          source={imagem}
          style={usaIcone
            ? [estilos.iconeJogo, { tintColor: jogo === 'lol' ? '#C9AB63' : '#FFFFFF' }]
            : estilos.imagemCapa}
          resizeMode={usaIcone ? 'contain' : 'cover'}
        />
      </View>
      <View style={estilos.conteudoPartida}>
        <View style={estilos.linhaPartida}>
          <Text numberOfLines={1} style={estilos.tituloPartida}>{titulo}</Text>
          <Text style={estilos.categoriaPartida}>{rotulosCategorias[categoria]}</Text>
        </View>
        <View style={estilos.linhaPartida}>
          <View style={estilos.informacoes}>
            <Image source={icones.calendario} style={estilos.iconeCalendario} resizeMode="contain" />
            <Text style={estilos.data}>{data}</Text>
          </View>
          <View style={estilos.informacoes}>
            <Image
              source={icones.jogador}
              style={[estilos.iconeJogador, { tintColor: corPapel }]}
              resizeMode="contain"
            />
            <Text style={[estilos.papel, { color: corPapel }]}>{papel}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, width: '100%', maxWidth: 560, alignSelf: 'center' },
  recipiente: { paddingHorizontal: 16, paddingTop: 25, paddingBottom: 32 },
  cabecalho: { flexDirection: 'row', alignItems: 'center' },
  molduraAvatar: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E51C44',
    padding: 2,
    overflow: 'hidden',
  },
  saudacao: { flex: 1, marginLeft: 20 },
  ola: {
    fontFamily: 'Rajdhani_500Medium',
    fontSize: 24,
    color: '#DDE3F0',
    lineHeight: 28,
  },
  nome: { fontFamily: 'Rajdhani_700Bold' },
  mensagem: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#ABB1CC',
    marginTop: 3,
  },
  adicionar: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#E51C44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mais: { color: '#FFFFFF', fontSize: 26, lineHeight: 30 },
  pressionado: { opacity: 0.7 },
  categorias: { flexDirection: 'row', gap: 8, marginTop: 40 },
  categoria: {
    flex: 1,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2D367A',
    overflow: 'hidden',
  },
  conteudoCategoria: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  nomeCategoria: {
    fontFamily: 'Rajdhani_700Bold',
    color: '#DDE3F0',
    fontSize: 15,
  },
  cabecalhoSecao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 38,
    marginBottom: 24,
  },
  tituloSecao: {
    fontFamily: 'Rajdhani_700Bold',
    fontSize: 20,
    color: '#DDE3F0',
  },
  total: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#ABB1CC' },
  partida: { flexDirection: 'row', marginBottom: 31, minHeight: 70, gap: 20 },
  capa: {
    width: 64,
    height: 68,
    borderWidth: 1,
    borderColor: '#2B3470',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#07303B',
  },
  capaValorant: { backgroundColor: '#E84661' },
  imagemCapa: { width: '100%', height: '100%' },
  iconeCategoria: { width: 48, height: 48 },
  iconeJogo: { width: 44, height: 48 },
  iconeCalendario: { width: 16, height: 16 },
  iconeJogador: { width: 12, height: 15 },
  conteudoPartida: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 3,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#242B58',
  },
  linhaPartida: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  tituloPartida: {
    flex: 1,
    fontFamily: 'Rajdhani_700Bold',
    fontSize: 18,
    color: '#DDE3F0',
  },
  categoriaPartida: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#ABB1CC',
  },
  informacoes: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  data: { fontFamily: 'Inter_400Regular', fontSize: 12, color: '#DDE3F0' },
  papel: { fontFamily: 'Inter_400Regular', fontSize: 12 },
});
