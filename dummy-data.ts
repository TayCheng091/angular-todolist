import { IEvent } from 'src/app/models/data-type';

export const DUMMY_EVENTS: IEvent[] = [
  {
    id: 'e1',
    title: 'Programming for everyone',
    description:
      'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
    location: 'Somestreet 25, 12345 San Somewhereo',
    date: '2021-05-12',
    image:
      'https://media.gq-magazine.co.uk/photos/5d13a6cbeef9210ba4a001d2/16:9/pass/fitness-hp-gq-13dec18_getty_b.jpg',
    isCompleted: true,
  },
  {
    id: 'e2',
    title: 'Networking for introverts',
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: 'New Wall Street 5, 98765 New Work',
    date: '2021-05-30',
    image: 'https://picsum.photos/500/300?radom=2',
    isCompleted: false,
  },
  {
    id: 'e3',
    title: 'Networking for extroverts',
    description:
      'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
    location: 'My Street 12, 10115 Broke City',
    date: '2022-04-10',
    image: 'https://picsum.photos/500/300?radom=3',
    isCompleted: true,
  },
];
