import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { FaceCompareComponent } from './components/facecompare/face-compare.component';

export const routes: Routes = [
    { path: '', component: FaceCompareComponent },
    { path: 'login', component: Login }
];
