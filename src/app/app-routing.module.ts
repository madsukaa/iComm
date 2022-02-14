import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/auth/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'timetable',
    loadChildren: () => import('./pages/timetable/timetable.module').then( m => m.TimetablePageModule)
  },
  {
    path: 'signupphoto',
    loadChildren: () => import('./pages/auth/signupphoto/signupphoto.module').then( m => m.SignupphotoPageModule)
  },
  {
    path: 'signupdone',
    loadChildren: () => import('./pages/auth/signupdone/signupdone.module').then( m => m.SignupdonePageModule)
  },
  {
    path: 'lectdashboard',
    loadChildren: () => import('./pages/lecturer/lectdashboard/lectdashboard.module').then( m => m.LectdashboardPageModule)
  },
  {
    path: 'admindashboard',
    loadChildren: () => import('./pages/admin/admindashboard/admindashboard.module').then( m => m.AdmindashboardPageModule)
  },
  {
    path: 'userregister',
    loadChildren: () => import('./pages/admin/userregister/userregister.module').then( m => m.UserregisterPageModule)
  },
  {
    path: 'userview/:id',
    loadChildren: () => import('./pages/admin/userview/userview.module').then( m => m.UserviewPageModule)
  },
  {
    path: 'addsubject',
    loadChildren: () => import('./pages/lecturer/addsubject/addsubject.module').then( m => m.AddsubjectPageModule)
  },
  {
    path: 'subjectview/:id',
    loadChildren: () => import('./pages/lecturer/subjectview/subjectview.module').then( m => m.SubjectviewPageModule)
  },
  {
    path: 'addfile/:id',
    loadChildren: () => import('./pages/lecturer/addfile/addfile.module').then( m => m.AddfilePageModule)
  },
  {
    path: 'updateprofile',
    loadChildren: () => import('./pages/lecturer/updateprofile/updateprofile.module').then( m => m.UpdateprofilePageModule)
  },
  {
    path: 'changepass',
    loadChildren: () => import('./pages/lecturer/changepass/changepass.module').then( m => m.ChangepassPageModule)
  },
  {
    path: 'studchangepass',
    loadChildren: () => import('./pages/studchangepass/studchangepass.module').then( m => m.StudchangepassPageModule)
  },
  {
    path: 'viewsubject/:id',
    loadChildren: () => import('./pages/viewsubject/viewsubject.module').then( m => m.ViewsubjectPageModule)
  },




  //{
  //  path: 'lectprofile',
  //  loadChildren: () => import('./pages/lecturer/lectprofile/lectprofile.module').then( m => m.LectprofilePageModule)
  //},
  //{
  //  path: 'lecthome',
  //  loadChildren: () => import('./pages/lecturer/lecthome/lecthome.module').then( m => m.LecthomePageModule)
  //},
  //{
  //  path: 'lectactivity',
  //  loadChildren: () => import('./pages/lecturer/lectactivity/lectactivity.module').then( m => m.LectactivityPageModule)
  //},





  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
