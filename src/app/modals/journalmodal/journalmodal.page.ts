import { Component, Input, OnInit } from '@angular/core';
import {
  ModalController,
  NavParams
} from '@ionic/angular';
import { JournalService } from 'src/app/journal.service';
import { JournalEntry } from 'src/app/models/interface.journal';
@Component({
  selector: 'app-journal-modal',
  templateUrl: './journalmodal.page.html',
  styleUrls: ['./journalmodal.page.scss'],
})
export class JournalmodalPage implements OnInit {

  journal: any;
  journalinput: string;
  tagtext: string;
  @Input() tempEntry?: JournalEntry;
  index: number;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private journalService: JournalService
  ) { }

  async ngOnInit() {
    this.journal = this.journalService;
    await this.journal.getJournal();
    let indextemp = 0;
    let found = false;
    for (let temp of this.journal.myJournal) {
      if (temp.entrydate == this.tempEntry.entrydate) {
        found = true;
        break;
      }
      indextemp++;
    }
    if (found) {
      this.journalinput = this.tempEntry.entrybody;
      this.tagtext = this.tempEntry.tags.join(', ');
      this.index = indextemp;
    } else {
      this.index = this.journalService.nextIndex;
      this.tempEntry = { entrydate: new Date, entrybody: null, tags: [], sessionlength: this.journalService.sessionlength }
      this.tagtext = '';
      this.journalinput = '';
    }
  }

  closeModal() {
    this.tempEntry.entrybody = this.journalinput;
    this.tempEntry.tags = this.tagtext.split(', ');
    this.journal.saveEntry(this.tempEntry, this.index);
    this.dismiss();
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
