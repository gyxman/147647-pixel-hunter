import assert from 'assert';
import {adaptServerData} from '../data/data-adapter';

export const localData = [
  {
    type: `two-of-two`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        src: `https://k38.kn3.net/AD92BA712.jpg`,
        width: 468,
        height: 458,
        answer: `painting`,
      },
      {
        src: `https://k37.kn3.net/47F2604E3.jpg`,
        width: 468,
        height: 458,
        answer: `painting`,
      },
    ],
  }
];

export const serverData = [
  {
    "type": `two-of-two`,
    "question": `Угадайте для каждого изображения фото или рисунок?`,
    "answers": [
      {
        "image":
          {
            "url": `https://k38.kn3.net/AD92BA712.jpg`,
            "width": 468,
            "height": 458
          },
        "type": `painting`
      },
      {
        "image":
          {
            "url": `https://k37.kn3.net/47F2604E3.jpg`,
            "width": 468,
            "height": 458
          },
        "type": `painting`
      }
    ]
  }
];

describe(`Adapt server data`, () => {

  it(`should have several format remote and local data`, () => {
    assert.deepEqual(localData, adaptServerData(serverData));
  });

});
