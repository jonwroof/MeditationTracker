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
  emptyEntry: JournalEntry;
  constructor(
    public alertController: AlertController,
    private nav: NavController,
    private journalService: JournalService,
    public modalController: ModalController,
    public actionSheetController: ActionSheetController) { this.filterTerm = ""; this.emptyEntry = { "entrydate": new Date, "entrybody": "", "tags": [], "sessionlength": 0 } }
  async ngOnInit() {
    this.journal = this.journalService;
    await this.journal.getJournal();
    this.filter();
    console.log(this.journal.myJournal);
  }
  async ionViewDidEnter() {
    console.log("view entered");
    await this.filter();
  }
  async filter() {
    await this.journal.getJournal();
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
  async openModal(temp?: JournalEntry) {
    await this.journal.getJournal();
    if (this.emptyEntry == temp) { temp.entrydate = new Date; }
    const modal = await this.modalController.create({
      component: JournalmodalPage,
      componentProps: {
        "tempEntry": temp
      }
    }
    );
    await modal.present();


    const { data } = await modal.onDidDismiss();
    if(data){
      this.filter();
    }


  }

}


