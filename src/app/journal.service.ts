import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Journal, JournalEntry } from './models/interface.journal';
@Injectable({
  providedIn: 'root'
})
export class JournalService {
  public myJournal: Journal;
  public entryArray: Array<JournalEntry> = [];
  public myEntry: JournalEntry;
  public sessionlength: number;
  public entrytext: string;
  public tagtext: string;
  public sessiondate: Date;
  public nextIndex: number;

  constructor(private storage: Storage) {
    this.storage.create();
    this.nextIndex = 0;
    this.sessionlength = null;
    this.entrytext = null;
    this.tagtext = null;
    this.getJournal();
  }

  async getJournal() {
    this.storage.get('journal').then((value) => { this.myJournal = JSON.parse(value); console.log(value); });
    if (this.myJournal == null) {
      this.myJournal = [];
    }
    this.nextIndex = this.myJournal.length;
  }
  public async getEntry(index: number): Promise<JournalEntry> {
    await this.storage.get('journal').then((value) => { this.myJournal = JSON.parse(value); console.log(value); });
    return this.myJournal[index];
  }
  public removeEntry(tempEntry: JournalEntry){
    this.myJournal.splice(this.myJournal.lastIndexOf(tempEntry), 1);
    this.storage.set('journal', JSON.stringify(this.myJournal));
    this.nextIndex=this.myJournal.length;
  }
  public saveEntry(tempEntry?: JournalEntry, ID?: number) {
    if (ID == null) {
      this.myEntry = { "entrydate": new Date, "entrybody": this.entrytext, "tags": this.tagtext.split(", "), "sessionlength": this.sessionlength };
      this.myJournal.push(this.myEntry);
    }
    else { this.myJournal[ID] = tempEntry; }
    this.storage.set('journal', JSON.stringify(this.myJournal));
  }

}
