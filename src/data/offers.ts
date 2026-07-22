export interface OfferCard {
  id: string
  icon: 'projekty' | 'wizualizacje' | 'realizacje'
  title: string
  description: string
  linkLabel: string
  targetId: string
}

export const offerCards: OfferCard[] = [
  {
    id: 'projekty',
    icon: 'projekty',
    title: 'Projekty',
    description:
      'Zaprojektujemy Twój ogród w nowoczesnym stylu i z najlepszym wykorzystaniem istniejącej przestrzeni.',
    linkLabel: 'Dowiedz się więcej',
    targetId: 'o-firmie',
  },
  {
    id: 'wizualizacje',
    icon: 'wizualizacje',
    title: 'Wizualizacje',
    description:
      'Przedstawimy Ci projekty koncepcyjne w postaci wirtualnego spaceru animowanego w technologii 3D.',
    linkLabel: 'Dowiedz się więcej',
    targetId: 'o-firmie',
  },
  {
    id: 'realizacje',
    icon: 'realizacje',
    title: 'Realizacje',
    description:
      'Zrealizujemy Twoje marzenie przy użyciu najnowszych rozwiązań i zaawansowanych technologii.',
    linkLabel: 'Zobacz nasze realizacje',
    targetId: 'realizacje',
  },
]
