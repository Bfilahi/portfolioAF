import { Injectable, signal } from '@angular/core';


export interface IProject {
  id: number;
  thumbnail: string;
  name: string;
  about: string;
  year: string;
  tags: string[];
  images: string[];
  demoUrl: string;
  codeUrl: string;
  docsUrl?: string;
  admin?: {
    email: string, 
    password: string
  },
  user: {
    email: string,
    password: string
  }
};

@Injectable({
  providedIn: 'root',
})
export class Project {
  public projects = signal<IProject[]>([
    {
      id: 1,
      thumbnail: 'clothery/clothery_thumbnail.png',
      name: 'clothery',
      about:
        'A modern fashion marketplace featuring secure third-party authentication, automated cloud-media management, and a robust Stripe payment pipeline',
      year: '2025',
      tags: [
        'angular',
        'spring boot',
        'JPA/Hibernate',
        'auth0',
        'SCSS',
        'postgreSQL',
        'cloudinary',
        'stripe',
      ],
      images: [
        'clothery/clothery_erd.png',
        'clothery/clothery.gif',
        'clothery/clothery_cart.gif',
        'clothery/clothery_filter.gif',
        'clothery/clothery_admin.gif',
      ],
      demoUrl: 'https://clothery-frontend.vercel.app/home',
      codeUrl: 'https://github.com/Bfilahi/clothery-app',
      admin: {
        email: 'admin@clothery.com',
        password: 'Admin123!',
      },
      user: {
        email: 'user@clothery.com',
        password: 'User123!',
      },
    },
    {
      id: 2,
      thumbnail: 'kickscorner/kickscorner_thumbnail.png',
      name: 'kicksCorner',
      about: 'E-commerce Platform for Sneaker Enthusiasts',
      year: '2025',
      tags: [
        'angular',
        'spring boot',
        'spring security',
        'JPA/Hibernate',
        'tailwind CSS',
        'three.js',
        'postgreSQL',
        'cloudinary',
        'swagger',
        'stripe',
      ],
      images: [
        'kickscorner/kickscorner_erd.png',
        'kickscorner/kickscorner.gif',
        'kickscorner/kickscorner_cart.gif',
        'kickscorner/kickscorner_browse.gif',
        'kickscorner/kickscorner_admin.gif',
      ],
      demoUrl: 'https://kickscorner-frontend.vercel.app/home',
      codeUrl: 'https://github.com/Bfilahi/kickscorner-app',
      docsUrl: 'https://kickscorner.site/swagger-ui/index.html',
      admin: {
        email: 'admin@kickscorner.com',
        password: 'Admin123!',
      },
      user: {
        email: 'user@kickscorner.com',
        password: 'User123!',
      },
    },
    {
      id: 3,
      thumbnail: 'taska/taska_thumbnail.png',
      name: 'taska',
      about:
        'a hierarchical task management environment where data integrity and user-specific security are important.',
      year: '2025',
      tags: [
        'angular',
        'spring boot',
        'spring security',
        'JPA/Hibernate',
        'angular material',
        'tailwind CSS',
        'postgreSQL',
        'swagger',
      ],
      images: [
        'taska/taska_erd.png',
        'taska/taska.gif',
        'taska/taska_browse.gif',
        'taska/taska_add_edit_delete_task.gif',
        'taska/taska_view_project_add_note.gif',
      ],
      demoUrl: 'https://taska-frontend.vercel.app/',
      codeUrl: 'https://github.com/Bfilahi/taska-app',
      docsUrl: 'https://my-tasks.shop/swagger-ui/index.html',
      user: {
        email: 'user@taska.com',
        password: 'User123!',
      },
    },
    {
      id: 4,
      thumbnail: 'clipquest/clipquest_thumbnail.png',
      name: 'clipQuest',
      about:
        'A high-performance video-sharing application designed to handle media uploads, secure user authentication, and real-time social engagement.',
      year: '2025',
      tags: [
        'angular',
        'spring boot',
        'spring security',
        'JPA/Hibernate',
        'tailwind CSS',
        'postgreSQL',
        'cloudinary',
        'swagger',
      ],
      images: [
        'clipquest/clipquest_erd.png',
        'clipquest/clipquest.gif',
        'clipquest/clipquest_browse.gif',
        'clipquest/clipquest_like_and_comment.gif',
        'clipquest/clipquest_manage_and_upload.gif',
      ],
      demoUrl: 'https://clip-quest-frontend.vercel.app/',
      codeUrl: 'https://github.com/Bfilahi/clipquest-app',
      docsUrl: 'https://clip.quest/swagger-ui/index.html',
      user: {
        email: 'user@clipquest.it',
        password: 'User123!',
      },
    },
  ]);
}
