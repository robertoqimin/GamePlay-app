import { useVoltarAndroid } from '../hooks/useVoltarAndroid';
import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { categorias, capas, partidasIniciais, Partida } from '../dados';
import { icones } from '../icones';

const camposHorario = [
  { rotulo: 'Dia e mês', primeiro: 'dia', segundo: 'mes', separador: '/' },
  { rotulo: 'Horário', primeiro: 'hora', segundo: 'minuto', separador: ':' },
] as const;

const grupos = partidasIniciais.slice(0, 5);
const nomesJogos = {
  lol: 'League of Legends',
  'red-dead': 'Red Dead Redemption 2',
  csgo: 'Counter-Strike',
  apex: 'Apex Legends',
  valorant: 'Valorant',
};

function Grupo({ grupo: { jogo, titulo } }: { grupo: Partida }) {
  return (
    <>
      <View style={[estilos.capa, jogo === 'valorant' && estilos.valorant]}>
        {jogo === 'lol' || jogo === 'valorant' ? (
          <Image source={icones[jogo]} style={{ width: 42, height: 46, tintColor: jogo === 'lol' ? '#C9AB63' : '#FFFFFF' }} resizeMode="contain" />
        ) : (
          <Image source={capas[jogo]} style={estilos.imagemCapa} />
        )}
      </View>
      <View style={estilos.informacoesGrupo}>
        <Text style={estilos.tituloGrupo}>{titulo}</Text>
        <Text style={estilos.secundario}>{nomesJogos[jogo]}</Text>
      </View>
    </>
  );
}

export default function TelaAgendamento({ aoVoltar }: { aoVoltar: () => void }) {
  const [grupo, definirGrupo] = useState(grupos[4]);
  const [selecionandoGrupo, definirSelecionandoGrupo] = useState(false);
  const [horario, definirHorario] = useState({ dia: '', mes: '', hora: '', minuto: '' });
  const [descricao, definirDescricao] = useState('');
  const campoNumerico = (campo: keyof typeof horario) => (
    <TextInput
      value={horario[campo]}
      onChangeText={(texto) => definirHorario((atual) => ({
        ...atual, [campo]: texto.replace(/\D/g, '').slice(0, 2),
      }))}
      keyboardType="number-pad"
      inputMode="numeric"
      maxLength={2}
      selectTextOnFocus
      style={estilos.campoNumerico}
    />
  );

  useVoltarAndroid(() => {
    aoVoltar();
    return true;
  });

  return (
    <View style={estilos.tela}>
      <View style={estilos.cabecalho}>
        <Pressable onPress={aoVoltar} style={estilos.voltar}>
          <Image source={require('../../assets/icones/voltar.png')} style={{ width: 24, height: 24 }} resizeMode="contain" />
        </Pressable>
        <Text style={estilos.tituloCabecalho}>Agendar partida</Text>
      </View>
      <ScrollView
        contentContainerStyle={estilos.formulario}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={estilos.rotulo}>Categoria</Text>
        <View style={estilos.categorias}>
          {categorias.map((item) => (
            <View
              key={item.id}
              style={[
                estilos.categoria,
                item.id === 'ranqueada' && estilos.categoriaSelecionada,
              ]}
            >
              <View
                style={[estilos.marcador, item.id === 'ranqueada' && estilos.marcadorSelecionado]}
              />
              <Image source={icones[item.id]} style={{ width: 48, height: 48, opacity: item.id === 'ranqueada' ? 1 : 0.5 }} resizeMode="contain" />
              <Text style={estilos.nomeCategoria}>{item.rotulo}</Text>
            </View>
          ))}
        </View>

        <Pressable
          onPress={() => definirSelecionandoGrupo(true)}
          style={({ pressed }) => [estilos.grupo, pressed && estilos.pressionado]}
        >
          <Grupo grupo={grupo} />
          <Text style={estilos.seta}>›</Text>
        </Pressable>

        <View style={estilos.dataHorario}>
          {camposHorario.map(({ rotulo, primeiro, segundo, separador }) => (
            <View key={primeiro}>
              <Text style={estilos.rotulo}>{rotulo}</Text>
              <View style={estilos.linhaNumeros}>
                {campoNumerico(primeiro)}
                <Text style={estilos.separador}>{separador}</Text>
                {campoNumerico(segundo)}
              </View>
            </View>
          ))}
        </View>
        <View style={estilos.cabecalhoDescricao}>
          <Text style={estilos.rotulo}>Descrição</Text>
          <Text style={estilos.secundario}>
            {descricao.length
              ? `${descricao.length}/100 caracteres`
              : 'Máx. 100 caracteres'}
          </Text>
        </View>
        <TextInput
          multiline
          maxLength={100}
          value={descricao}
          onChangeText={definirDescricao}
          style={estilos.descricao}
          textAlignVertical="top"
        />
        <View style={estilos.rodape}>
          <Pressable
            onPress={aoVoltar}
            style={({ pressed }) => [estilos.agendar, pressed && estilos.pressionado]}
          >
            <Text style={estilos.textoAgendar}>Agendar</Text>
          </Pressable>
        </View>
      </ScrollView>
      <Modal
        visible={selecionandoGrupo}
        transparent
        animationType="slide"
        onRequestClose={() => definirSelecionandoGrupo(false)}
      >
        <View style={estilos.fundoModal}>
          <View style={estilos.painel}>
            <View style={estilos.cabecalhoPainel}>
              <Text style={estilos.tituloCabecalho}>Selecionar grupo</Text>
              <Pressable
                onPress={() => definirSelecionandoGrupo(false)}
                style={estilos.fechar}
              >
                <Text style={estilos.textoAgendar}>✕</Text>
              </Pressable>
            </View>
            <ScrollView>
              {grupos.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => {
                    definirGrupo(item);
                    definirSelecionandoGrupo(false);
                  }}
                  style={estilos.opcaoGrupo}
                >
                  <Grupo grupo={item} />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, width: '100%', maxWidth: 560, alignSelf: 'center' },
  cabecalho: {
    height: 73,
    backgroundColor: '#0E1647',
    alignItems: 'center',
    justifyContent: 'center',
  },
  voltar: {
    position: 'absolute',
    left: 4,
    top: 17,
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
  formulario: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 14,
  },
  rotulo: {
    fontFamily: 'Rajdhani_700Bold',
    fontSize: 18,
    lineHeight: 22,
    color: '#DDE3F0',
  },
  categorias: { flexDirection: 'row', gap: 8, marginTop: 13 },
  categoria: {
    flex: 1,
    height: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#242C60',
    backgroundColor: '#1C2453',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  categoriaSelecionada: { backgroundColor: '#242D65', borderColor: '#303880' },
  marcador: {
    position: 'absolute',
    right: 7,
    top: 7,
    height: 8,
    width: 8,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#30386D',
  },
  marcadorSelecionado: { backgroundColor: '#E51C44', borderColor: '#E51C44' },
  nomeCategoria: {
    fontFamily: 'Rajdhani_700Bold',
    fontSize: 15,
    color: '#DDE3F0',
  },
  grupo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2C3473',
    borderRadius: 8,
    height: 68,
    marginTop: 32,
  },
  capa: {
    width: 63,
    height: 66,
    borderRadius: 7,
    backgroundColor: '#07303B',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  valorant: { backgroundColor: '#E84661' },
  imagemCapa: { width: '100%', height: '100%', resizeMode: 'cover' },
  informacoesGrupo: { flex: 1, paddingHorizontal: 20, gap: 4 },
  tituloGrupo: {
    fontFamily: 'Rajdhani_700Bold',
    fontSize: 18,
    color: '#DDE3F0',
  },
  secundario: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#ABB1CC' },
  seta: { color: '#ABB1CC', fontSize: 24, marginRight: 22 },
  dataHorario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  linhaNumeros: { flexDirection: 'row', alignItems: 'center', marginTop: 15 },
  campoNumerico: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#303880',
    backgroundColor: '#242D65',
    color: '#DDE3F0',
    fontFamily: 'Inter_500Medium',
    fontSize: 18,
    textAlign: 'center',
    padding: 0,
  },
  separador: { width: 11, textAlign: 'center', color: '#ABB1CC', fontSize: 18 },
  cabecalhoDescricao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 14,
  },
  descricao: {
    minHeight: 95,
    borderWidth: 1,
    borderColor: '#303880',
    borderRadius: 8,
    backgroundColor: '#242D65',
    padding: 12,
    color: '#DDE3F0',
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
  },
  rodape: { flex: 1, justifyContent: 'flex-end', paddingTop: 40 },
  agendar: {
    height: 56,
    borderRadius: 8,
    backgroundColor: '#E51C44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoAgendar: { fontFamily: 'Inter_500Medium', fontSize: 15, color: '#FFFFFF' },
  pressionado: { opacity: 0.7 },
  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  painel: {
    backgroundColor: '#171E49',
    padding: 16,
    paddingBottom: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    maxWidth: 560,
    maxHeight: '80%',
  },
  cabecalhoPainel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  fechar: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  opcaoGrupo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
});
