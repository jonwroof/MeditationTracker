import { Component, Input, OnInit } from '@angular/core';
import {
  ModalController,
  NavParams
} from '@ionic/angular';
import { JournalService } from 'src/app/journal.service';
@Component({
  selector: 'app-journal-modal',
  templateUrl: './journalmodal.page.html',
  styleUrls: ['./journalmodal.page.scss'],
})
export class JournalmodalPage implements OnInit {

  journal: any;
  journalinput: string;
  tagtext: string;
  @Input() ID: number;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private journalService: JournalService
  ) { }

  ngOnInit() {
    this.journal = this.journalService
  }

  closeModal() {
    this.journal.entrytext=this.journalinput;
    this.journal.tagtext=this.tagtext;
    this.journal.sessiondate=new Date();
    this.journal.saveEntry();
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
