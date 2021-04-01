import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public alertController: AlertController, private nav : NavController) {
  }
  
  async presentSessionAlert() {
    const alert = await this.alertController.create({
      header: 'Save Session Notes?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: () => {
            this.nav.navigateRoot('tabs/tab4');
          }
        }
      ]
    });
    
    await alert.present();
  }


 saveNotes(){
    this.presentSessionAlert();
  }
}
