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

export const girlsData: GirlData[] = [
  {
    name: "Саша",
    slug: "sasha",
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
    name: "Вика",
    slug: "vika",
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
    name: "Лена",
    slug: "lena",
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
    name: "Маша",
    slug: "masha",
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
    name: "Аня",
    slug: "anya",
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
    name: "Катя",
    slug: "katya",
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
