import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'projects', pathMatch: 'full' },
    {
        path: 'projects',
        loadComponent: () => import('./components/pages/projects/projects').then(m => m.Projects)
    },
    {
        path: 'contact', 
        loadComponent: () => import('./components/pages/contact/contact').then(m => m.Contact)
    },
    {
        path: 'about',
        loadComponent: () => import('./components/pages/about/about').then(m => m.About)
    },
    {
        path: 'project/:id',
        loadComponent: () => import('./components/pages/project-details/project-details').then(m => m.ProjectDetails)
    },
    { path: '**', redirectTo: 'projects' }
];
