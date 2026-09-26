# GamePlay

Tela de entrada baseada na referência, feita com Expo, React Native e TypeScript somente para Android. Inclui ilustração local, fundo em gradiente, fontes Rajdhani e Inter e botão do Discord com feedback ao pressionar. A tela permite rolagem em dispositivos menores.

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

## Navegação e partidas

O aplicativo inicia na tela azul com o logotipo GamePlay. Tocar em qualquer área abre o login.

O botão “Entrar com Discord” abre diretamente a tela de partidas, sem OAuth. O perfil Tiago e as seis partidas iniciais estilosão dados de demonstração.

- As categorias filtram a lista; tocar novamente remove o filtro.
- O botão “+” abre a tela de agendamento com categoria, seleção de grupo, dia/mêestilos, hora/minuto e descrição de até 100 caracteres.
- “Agendar” apenas retorna à tela do usuário, sem validar campos ou salvar partidas. A tela de agendamento é um protótipo visual.
- Todas as partidas abrem a mesma tela de detalhes, com título/descrição do item, banner e trêestilos jogadores demonstrativos.
- Compartilhar mostra o texto selecionável. “Entrar na partida” é clicável e tem feedback visual ao pressionar, sem abrir avisos ou navegar.

As partidas estilosão dados fixos de demonstração. Algumas capas usam imagens atuais e logotipos equivalentes aos jogos da referência.

A origem dos recursos visuais está documentada em [assets/README.md](assets/README.md).

## Onde editar

- `App.tsx`: carregamento das fontes e navegação entre abertura, login e início.
- `src/screens/`: um arquivo por tela, com seus estilos no final.
- `src/dados.ts`: categorias e partidas de demonstração.
- `src/components/AvatarGenerico.tsx`: avatar genérico.
- `src/hooks/useVoltarAndroid.ts`: comportamento do botão Voltar do Android.
- `src/icones.ts`: desenhos SVG dos ícones.
