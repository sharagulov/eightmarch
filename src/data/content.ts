export interface GirlData {
  name: string;
  slug: string;
  videoUrl: string;
  poem: string[];
  catImages: string[];
}

const defaultCatImages = [
  "https://cataas.com/cat/cute",
  "https://cataas.com/cat/says/hello",
  "https://cataas.com/cat/orange",
  "https://cataas.com/cat",
  "https://cataas.com/cat/angry"
];

/** Pastel color palettes for Vanta FOG — one per girl, distinct but same warm tone */
export const backgroundPalettes: Record<string, { highlight: number; midtone: number; lowlight: number; base: number; gradient: string }> = {
  masha:          { highlight: 0xf5e0c0, midtone: 0xffd0b8, lowlight: 0xffc8b0, base: 0xfff5e8, gradient: 'from-amber-950/75 via-zinc-900 to-orange-950/55' },
  nastyashvedova: { highlight: 0xf5c8d0, midtone: 0xffb8c8, lowlight: 0xffb0c0, base: 0xffe8f0, gradient: 'from-pink-950/80 via-zinc-900 to-rose-950/55' },
  nastyazhukova:  { highlight: 0xe8d4e8, midtone: 0xffc8e0, lowlight: 0xffc0d8, base: 0xfff0f8, gradient: 'from-violet-950/70 via-zinc-900 to-rose-950/50' },
  alena:          { highlight: 0xeed8e0, midtone: 0xffc0d0, lowlight: 0xffb8c8, base: 0xfff0f5, gradient: 'from-rose-950/75 via-zinc-900 to-pink-950/55' },
  veronika:       { highlight: 0xf0ecd8, midtone: 0xffe8d8, lowlight: 0xffe0d0, base: 0xfff8f0, gradient: 'from-amber-950/70 via-zinc-900 to-yellow-950/50' },
  sasha:          { highlight: 0xf0d7a5, midtone: 0xffb4a8, lowlight: 0xffb3a3, base: 0xffebeb, gradient: 'from-rose-950/80 via-zinc-900 to-amber-950/60' },
};

/** Generates 5 new random cat image URLs (cache-busting for fresh cats) */
export const getRandomCatUrls = (): string[] => {
  const t = Date.now();
  return [
    `https://cataas.com/cat?t=${t}-0`,
    `https://cataas.com/cat?t=${t}-1`,
    `https://cataas.com/cat?t=${t}-2`,
    `https://cataas.com/cat?t=${t}-3`,
    `https://cataas.com/cat?t=${t}-4`,
  ];
};

export const girlsData: GirlData[] = [
  {
    name: "Маша",
    slug: "masha",
    videoUrl: "https://cdn.pixabay.com/video/2019/11/22/29514-376510103_large.mp4",
    poem: [
      "Пусть весна приносит радость,",
      "Солнце светит каждый день.",
      "Улыбайся, наслаждайся,",
      "Пусть цветет в душе сирень!"
    ],
    catImages: defaultCatImages
  },
  {
    name: "Настя",
    slug: "nastyashvedova",
    videoUrl: "https://cdn.pixabay.com/video/2021/08/11/84687-586701552_large.mp4",
    poem: [
      "С 8 Марта поздравляю,",
      "Счастья, света и тепла.",
      "В этот день тебе желаю,",
      "Чтоб как роза ты цвела!"
    ],
    catImages: defaultCatImages
  },
  {
    name: "Настя",
    slug: "nastyazhukova",
    videoUrl: "https://cdn.pixabay.com/video/2016/09/21/5398-183786499_large.mp4",
    poem: [
      "Прекрасный праздник наступил,",
      "Цветов, улыбок и чудес.",
      "Желаю бодрости и сил,",
      "И счастья просто до небес!"
    ],
    catImages: defaultCatImages
  },
  {
    name: "Алена",
    slug: "alena",
    videoUrl: "https://cdn.pixabay.com/video/2022/10/25/136440-764951152_large.mp4",
    poem: [
      "Пускай сбываются мечты,",
      "Весна подарит вдохновенье.",
      "Любви, здоровья, красоты,",
      "И праздничного настроенья!"
    ],
    catImages: defaultCatImages
  },
  {
    name: "Вероника",
    slug: "veronika",
    videoUrl: "https://cdn.pixabay.com/video/2020/04/17/36423-412258810_large.mp4",
    poem: [
      "В день весенний, очень ясный,",
      "Поздравления прими.",
      "Будь всегда такой прекрасной,",
      "В радости, добре, любви!"
    ],
    catImages: defaultCatImages
  },
  {
    name: "Саша",
    slug: "sasha",
    videoUrl: "https://cdn.pixabay.com/video/2019/11/14/29080-373204780_large.mp4",
    poem: [
      "Весна стучится в каждый дом,",
      "Несет с собой тепло и свет.",
      "Пусть счастье будет в нем твоем,",
      "Успех, удача, жизнь без бед!"
    ],
    catImages: defaultCatImages
  }
];
