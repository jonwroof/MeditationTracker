import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Journal, JournalEntry } from './models/interface.journal';
@Injectable({
  providedIn: 'root'
})
export class JournalService implements OnInit {
  public myJournal: Journal;
  public myEntry: JournalEntry;
  public sessionlength: number;
  public entrytext: string;
  public tagtext: string;
  public sessiondate: Date;
  public nextIndex: number;

  constructor(private storage: Storage) {
    this.storage.create();
    this.myJournal = [];
    this.nextIndex = 0;
    this.sessionlength = 0;
    this.entrytext = '';
    this.tagtext = '';
    this.getJournal();
  }
  async ngOnInit() {
    this.storage.create();
    this.myJournal = [];
    this.nextIndex = 0;
    this.sessionlength = 0;
    this.entrytext = '';
    this.tagtext = '';
    this.getJournal();
  }

  public async getJournal() {
    try {
      this.storage.create();
      const result = await this.storage.get('journal');
      if (result != null) {
        console.log("successfully retrieved");
        this.myJournal = JSON.parse(result);
      }else{
        this.myJournal = [];
      }
    } catch (reason) {
      console.log(reason);
      this.myJournal = [];
    }


    this.nextIndex = this.myJournal.length;
  }
  public async getEntry(index: number): Promise<JournalEntry> {
    await this.storage.get('journal').then((value) => { this.myJournal = JSON.parse(value); console.log(value); });
    return this.myJournal[index];
  }
  public removeEntry(tempEntry: JournalEntry) {
    this.myJournal.splice(this.myJournal.lastIndexOf(tempEntry), 1);
    this.storage.set('journal', JSON.stringify(this.myJournal));
    this.nextIndex = this.myJournal.length;
  }
  public saveEntry(tempEntry?: JournalEntry, ID?: number) {
    if (ID == null) {
      this.myEntry = { "entrydate": new Date, "entrybody": this.entrytext, "tags": this.tagtext.split(", "), "sessionlength": this.sessionlength };
      this.myJournal.push(this.myEntry);
      this.nextIndex=this.myJournal.length;
    }
    else { this.myJournal[ID] = tempEntry; }
    this.storage.set('journal', JSON.stringify(this.myJournal));
  }

}
