# GamePlay

Tela de entrada baseada na referência, feita com Expo, React Native e TypeScript somente para Android.

## Executar

```sh
npm install
npm start
```

### No celular Android

1. Instale o Expo Go compatível com o SDK 57: https://expo.dev/go?platform=android&device=true&sdkVersion=57.
2. Conecte computador e celular à mesma rede Wi-Fi.
3. Execute `npm start` e abra o Expo Go no celular para escanear o QR code.

Para um emulador aberto no Android Studio, use `npm run android`. Se a rede bloquear a conexão, experimente `npm start -- --tunnel` (pode solicitar a instalação do suporte ao túnel).

A navegação respeita as áreas seguras do Android e o botão Voltar retorna à tela anterior. O formulário usa redimensionamento da janela ao abrir o teclado.

`npm run export:android` valida e exporta o bundle Android em `dist-android/`; esse comando não gera um APK.

## Verificar

```sh
npm run typecheck
npm run export:android
```

A exportação Android fica em `dist-android/`.
