import { profile, docker } from '../../assets/articles/tech';
import { ethics } from '../../assets/articles/rest';

export const ROUTE = {
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
          'Extract_1.md': { type: 'file', ctx: ethics },
        },
      },
      projects: {
        type: 'folder',
        children: {
          'Docker_Deploy_Frontend.md': { type: 'file', ctx: docker },
        },
      },
    },
  },
};
