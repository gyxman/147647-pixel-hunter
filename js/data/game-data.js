const levels = {
  'level-0': {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    options: [
      {
        src: `https://k42.kn3.net/D2F0370D6.jpg`,
        labels: [
          {
            name: `Фото`,
            value: `photo`
          },
          {
            name: `Рисунок`,
            value: `paint`
          }
        ],
        answer: `paint`,
      },
      {
        src: `https://k32.kn3.net/5C7060EC5.jpg`,
        labels: [
          {
            name: `Фото`,
            value: `photo`
          },
          {
            name: `Рисунок`,
            value: `paint`
          }
        ],
        answer: `paint`,
      },
    ],
  },
  'level-1': {
    title: `Угадай, фото или рисунок?`,
    options: [
      {
        src: `https://i.imgur.com/1KegWPz.jpg`,
        labels: [
          {
            name: `Фото`,
            value: `photo`
          },
          {
            name: `Рисунок`,
            value: `paint`
          }
        ],
      },
    ],
    answer: `photo`,
  },
  'level-2': {
    title: `Найдите рисунок среди изображений`,
    options: [
      {
        src: `https://k42.kn3.net/CF42609C8.jpg`,
        answer: `paint`,
      },
      {
        src: `https://i.imgur.com/DiHM5Zb.jpg`,
        answer: `photo`,
      },
      {
        src: `https://i.imgur.com/DKR1HtB.jpg`,
        answer: `photo`,
      },
    ],
  }
};

export default levels;
