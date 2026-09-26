export type Categoria = 'ranqueada' | 'duelo' | 'diversao';
export type Partida = {
  id: string;
  titulo: string;
  categoria: Categoria;
  data: string;
  anfitriao: boolean;
  descricao?: string;
  jogo: 'lol' | 'red-dead' | 'csgo' | 'apex' | 'valorant';
};
export const categorias: { id: Categoria; rotulo: string }[] = [
  { id: 'ranqueada', rotulo: 'Ranqueada' },
  { id: 'duelo', rotulo: 'Duelo 1x1' },
  { id: 'diversao', rotulo: 'Diversão' },
];
export const partidasIniciais: Partida[] = [
  {
    id: '1',
    titulo: 'Lendários',
    categoria: 'ranqueada',
    data: '18/06 às 21:00h',
    anfitriao: true,
    jogo: 'lol',
  },
  {
    id: '2',
    titulo: 'É isso, garoto',
    categoria: 'diversao',
    data: '23/06 às 19:00h',
    anfitriao: false,
    jogo: 'red-dead',
  },
  {
    id: '3',
    titulo: 'Rumo ao topo',
    categoria: 'duelo',
    data: '20/06 às 09:00h',
    anfitriao: true,
    jogo: 'csgo',
  },
  {
    id: '4',
    titulo: 'Bora queimar tudo',
    categoria: 'ranqueada',
    data: '20/06 às 14:20h',
    anfitriao: true,
    jogo: 'apex',
  },
  {
    id: '5',
    titulo: 'Valorosos',
    categoria: 'diversao',
    data: '18/06 às 21:00h',
    anfitriao: true,
    jogo: 'valorant',
  },
  {
    id: '6',
    titulo: 'Treino em equipe',
    categoria: 'ranqueada',
    data: '25/06 às 20:00h',
    anfitriao: false,
    jogo: 'lol',
  },
];
export const capas = {
  'red-dead': require('../assets/home/red-dead.jpg'),
  csgo: require('../assets/home/csgo.jpg'),
  apex: require('../assets/home/apex.jpg'),
};
