import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import {JournalService} from '../journal.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  journalServ: any;
  constructor(public alertController: AlertController, private nav : NavController, private journalService: JournalService) {}
  async ngOnInit(){
    this.journalServ=this.journalService;
  }

}
