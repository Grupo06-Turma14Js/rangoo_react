export interface Feedback {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

export const FEEDBACKS_DATA: Feedback[] = [
  {
    id: 1,
    name: "Alice Tunker",
    rating: 5,
    comment:
      "A Rangoo mudou completamente minha rotina! As refeições chegam sempre frescas, saborosas e com ingredientes de muita qualidade. Além da praticidade no dia a dia, adoro as recomendações saudáveis do app. Dá pra perceber o cuidado em cada detalhe.",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
  },

  {
    id: 2,
    name: "Beatriz Souza",
    rating: 5,
    comment:
      "Excelente opção para quem não tem tempo de cozinhar mas não abre mão de comer bem. Os pratos são incrivelmente temperados e a entrega é super rápida. Virou meu app favorito de delivery!",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80",
  },

  {
    id: 3,
    name: "Carlos Eduardo",
    rating: 5,
    comment:
      "Cardápio super variado e ingredientes de primeira. Consigo manter minha dieta de forma prática e muito gostosa. O atendimento e o cuidado com a embalagem são impecáveis.",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80",
  },
];