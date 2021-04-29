import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { JournalService } from '../journal.service';
import { JournalmodalPage } from '../modals/journalmodal/journalmodal.page';
import { JournalEntry } from '../models/interface.journal';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  journal: any;
  filterJournal = [];
  filterTerm: string;
  constructor(
    public alertController: AlertController,
    private nav: NavController,
    private journalService: JournalService,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController) { this.filterTerm = ""; }
  async ngOnInit() {
    this.journal = this.journalService;
    await this.journal.getJournal();
    this.filter();
    console.log(this.journal.myJournal);
  }
  async ionViewDidEnter() {
    await this.filter();
  }
  async filter() {
    if (this.filterTerm == "" || this.filterTerm == null) {
      this.filterJournal = [...this.journal.myJournal];
    } else {
      this.filterJournal = [];
      for (let temp of this.journal.myJournal) {
        if (temp.tags.lastIndexOf(this.filterTerm) != -1) {
          this.filterJournal.push(temp);
        }
      }
    }
  }
  async openModal(temp: JournalEntry) {
    await this.journal.getJournal();
    let index = this.journal.myJournal.lastIndexOf(temp);
    if (index != -1) {
      const modal = await this.modalController.create({
        component: JournalmodalPage,
        componentProps: {
          "tempEntry": this.journal.myJournal[index]
        }
      }
      );
      return await modal.present();
    } else {
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

}
