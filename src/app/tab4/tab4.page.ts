import { Component, OnInit } from '@angular/core';
import { JournalService } from '../journal.service';
import { JournalEntry } from '../models/interface.journal';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  journal: any;
  entry: JournalEntry;
  constructor(public journalService: JournalService) {}
  
  public async getEntry(index: number){
    await this.journalService.getEntry(index).then((value)=>{this.entry=value;});
  }

}
