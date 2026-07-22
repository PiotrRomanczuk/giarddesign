import { unsplash } from './unsplash'

export interface HeroSlide {
  id: string
  heading: string
  accentWord?: string
  description: string
  image: string
  imageAlt: string
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'ogrod',
    heading: 'Nowoczesna aranżacja Twojego ogrodu',
    description:
      'Marka GiardDesign to wieloletnie doświadczenie i wysoka estetyka realizacji. Oferujemy kompleksowy zakres usług z indywidualnym podejściem do każdego projektu.',
    image: unsplash('1558904541-efa843a96f01', 1400, 1000),
    imageAlt: 'Nowoczesny ogród z geometrycznymi rabatami i żywopłotami',
  },
  {
    id: 'wizualizacje',
    heading: 'Zobacz swój ogród, zanim powstanie',
    description:
      'Tworzymy fotorealistyczne wizualizacje 3D i wirtualne spacery, dzięki którym zobaczysz efekt końcowy na długo przed rozpoczęciem prac ogrodowych.',
    image: unsplash('1764212515460-04fcb75657c2', 1400, 1000),
    imageAlt: 'Widok z lotu ptaka na geometryczną aranżację żywopłotów',
  },
  {
    id: 'realizacje',
    heading: 'Od koncepcji po gotową realizację',
    description:
      'Nasz zespół projektantów i architektów krajobrazu towarzyszy Ci na każdym etapie — od pierwszego szkicu, przez wizualizację, aż po pielęgnację gotowego ogrodu.',
    image: unsplash('1778305071523-1090e19e621a', 1400, 1000),
    imageAlt: 'Alejka ogrodowa pod pergolą porośniętą różami',
  },
]
