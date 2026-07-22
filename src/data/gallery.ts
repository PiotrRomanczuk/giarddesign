import { unsplash } from './unsplash'

export interface GalleryImage {
  id: string
  src: string
  full: string
  alt: string
  ratio: number // height / width, used to size masonry items before the image loads
}

function img(id: string, alt: string, height: number, width = 600): GalleryImage {
  return {
    id,
    src: unsplash(id, width, height),
    full: unsplash(id, 1600),
    alt,
    ratio: height / width,
  }
}

export const galleryImages: GalleryImage[] = [
  img('1761469169518-3815040504a2', 'Schody ogrodowe wśród tropikalnej zieleni', 800),
  img('1694885190541-40037b8a6b13', 'Nowoczesny taras z basenem', 420),
  img('1778305071523-1090e19e621a', 'Alejka pod pergolą porośniętą różami', 760),
  img('1783273552643-da35cce900ce', 'Oczko wodne z rybami koi', 600),
  img('1599685315640-9ceab2f58148', 'Ścieżka w tropikalnym ogrodzie', 700),
  img('1779630215539-0a8ec4760ef9', 'Pergola z widokiem na niebo', 420),
  img('1769503236428-7773271074cf', 'Drewniana pergola przy nowoczesnym budynku', 500),
  img('1775743239793-5480f44d6e56', 'Kamienny dziedziniec wśród zieleni', 600),
  img('1782055828658-f16a2430ba6e', 'Drewniana krata pergoli nad ścieżką', 460),
  img('1775356127691-3aa87e5d8175', 'Kompozycja roślinna w ogrodzie', 680),
  img('1769690093863-4f2a3fd17dd2', 'Zagospodarowany ogród przydomowy', 520),
  img('1760947073169-3ff3a2e175c0', 'Zbliżenie na kwiaty ozdobne', 600),
  img('1769732169411-31ecab4d0f73', 'Basen ogrodowy o zmierzchu', 420),
  img('1780898259326-4ad741d812bc', 'Nowoczesny dom z basenem', 760),
  img('1628012209120-d9db7abf7eab', 'Elewacja nowoczesnej rezydencji', 500),
  img('1698994705178-d244d73ea573', 'Minimalistyczna architektura ogrodowa', 600),
  img('1657346088167-b982455bf29a', 'Nowoczesny dom jednorodzinny', 680),
  img('1761637823730-fab1f300084d', 'Detal kamiennej elewacji', 460),
]

export const INITIAL_VISIBLE_COUNT = 9
