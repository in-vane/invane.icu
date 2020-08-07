import { profile, docker } from './articles';

export const DIRECTORY = {
  '/': {
    type: 'folder',
    children: {
      'README.md': { type: 'file', ctx: 'Congrats on finding the egg!' },
    },
  },
  '~': {
    type: 'folder',
    children: {
      'profile.md': { type: 'file', ctx: profile },
      blog: {
        type: 'folder',
        children: {
          'Docker下的前端静态部署.md': { type: 'file', ctx: docker },
        },
      },
      projects: {
        type: 'folder',
        children: {},
      },
    },
  },
};
