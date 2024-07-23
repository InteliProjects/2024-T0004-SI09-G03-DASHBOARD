import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './navbar/about.component';
import { RouteComponent } from './login/route.component';
import { DashboardComponent } from './user-components/dashboard/dashboard.component';
import { VisaoGeralComponent } from './user-components/visao-geral/visao-geral.component';
import { ConfigComponent } from './user-components/config/config.component';
import { AdmVisaoGeralComponent } from './adm-components/adm-visao-geral/adm-visao-geral.component';
import { AdmDashboardComponent } from './adm-components/adm-dashboard/adm-dashboard.component';

export const routes: Routes = [
  { path: '', component: RouteComponent },
  {
    path: 'about',
    component: AboutComponent,
    children: [
      { path: 'dash', component: DashboardComponent },
      { path: 'vision', component: VisaoGeralComponent },
      { path: 'config', component: ConfigComponent },
      { path: 'adm-dash', component: AdmDashboardComponent },
      { path: 'adm-vision', component: AdmVisaoGeralComponent },
      { path: 'adm-config', component: ConfigComponent },
    ],
  },
];
