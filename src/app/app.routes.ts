import { Routes } from '@angular/router';
import { CharacterlistComponent } from './components/characterlist/characterlist';
import { CharacterfilterComponent } from './components/characterfilter/characterfilter';
import { CharacterdetailsComponent } from './components/characterdetails/characterdetails';

export const routes: Routes = [
  { path: '', component: CharacterlistComponent },
  { path: 'filter', component: CharacterfilterComponent },
  { path: 'character/:id', component: CharacterdetailsComponent }
];