import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Drivers } from '@ionic/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { JournalService } from './journal.service';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    IonicStorageModule.forRoot({
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
  })],
  providers: [
    { provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy}, 
      JournalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
