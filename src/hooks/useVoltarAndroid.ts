import { useEffect } from 'react';
import { BackHandler } from 'react-native';

// Retorne false para deixar o Android executar o comportamento padrão.
export function useVoltarAndroid(aoVoltar: () => boolean) {
  useEffect(() => {
    const assinatura = BackHandler.addEventListener(
      'hardwareBackPress',
      aoVoltar,
    );
    return () => assinatura.remove();
  }, [aoVoltar]);
}
