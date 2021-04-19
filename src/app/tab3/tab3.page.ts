import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import {JournalService} from '../journal.service';
import { JournalmodalPage } from '../modals/journalmodal/journalmodal.page';
import { JournalEntry } from '../models/interface.journal';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  journal: any;
  constructor(
    public alertController: AlertController, 
    private nav : NavController, 
    private journalService: JournalService, 
    public modalController: ModalController, 
    public actionSheetController: ActionSheetController) {}
  async ngOnInit(){
    this.journal=this.journalService;
  }
  async openModal(temp: JournalEntry) {
    const modal = await this.modalController.create({
      component: JournalmodalPage,
      componentProps: {
        "tempEntry": temp
      }
    }
    );
    return await modal.present();
  }

}
