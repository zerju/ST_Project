import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddImagesPage } from './add-images';

@NgModule({
  declarations: [
    AddImagesPage,
  ],
  imports: [
    IonicPageModule.forChild(AddImagesPage),
  ],
  exports: [
    AddImagesPage
  ]
})
export class AddImagesPageModule {}
