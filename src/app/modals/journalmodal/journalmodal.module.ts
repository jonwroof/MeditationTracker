import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JournalmodalPageRoutingModule } from './journalmodal-routing.module';

import { JournalmodalPage } from './journalmodal.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JournalmodalPageRoutingModule
  ],
  declarations: [JournalmodalPage],
  providers: []
})
export class JournalmodalPageModule {}
