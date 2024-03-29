import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProspectosRoutingModule } from './prospectos-routing.module';
import { ProspectoPageComponent } from './pages/prospecto-page/prospecto-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { ProspectoImagePipe } from './pipes/prospecto-image.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    ProspectoPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    CardComponent,
    ProspectoImagePipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ProspectosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProspectosModule { }
