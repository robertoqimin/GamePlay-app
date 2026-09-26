import { useVoltarAndroid } from './src/hooks/useVoltarAndroid';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import TelaUsuario from './src/screens/TelaUsuario';
import TelaLogin from './src/screens/TelaLogin';
import TelaInicial from './src/screens/TelaInicial';
import { Rajdhani_500Medium } from '@expo-google-fonts/rajdhani/500Medium';
import { Rajdhani_700Bold } from '@expo-google-fonts/rajdhani/700Bold';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar, StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={['top', 'bottom', 'left', 'right']}
        style={{ flex: 1, backgroundColor: '#171E49' }}
      >
        <StatusBar barStyle="light-content" />
        <ConteudoAplicativo />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function ConteudoAplicativo() {
  const [tela, definirTela] = useState<'inicio' | 'login' | 'usuario'>('inicio');
  useVoltarAndroid(() => {
    if (tela === 'usuario') {
      definirTela('login');
      return true;
    }
    if (tela === 'login') {
      definirTela('inicio');
      return true;
    }
    return false;
  });
  const [fontesCarregadas, erroFonte] = useFonts({
    Rajdhani_700Bold,
    Rajdhani_500Medium,
    Inter_400Regular,
    Inter_500Medium,
  });

  if (tela === 'inicio') {
    return (
      <View style={estilos.tela}>
        <TelaInicial
          pronto={fontesCarregadas || !!erroFonte}
          aoContinuar={() => definirTela('login')}
        />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#171E49', '#141936', '#10152C']}
      style={estilos.tela}
    >
      {(fontesCarregadas || erroFonte) &&
        (tela === 'usuario' ? (
          <TelaUsuario />
        ) : (
          <TelaLogin aoEntrar={() => definirTela('usuario')} />
        ))}
    </LinearGradient>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1 },
});
