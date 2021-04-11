import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Journal, JournalEntry } from './models/interface.journal';
@Injectable({
  providedIn: 'root'
})
export class JournalService{
  public myJournal: Journal=[];
  public entryArray: Array<JournalEntry> = [];
  public myEntry: JournalEntry;
  public sessionlength: number;
  public entrytext: string;
  public tagtext: string;
  public sessiondate: Date;
  
  constructor(private storage: Storage){
    this.storage.create();
    this.getJournal();
  }
  
  async getJournal(){
    this.storage.get('journal').then((value)=>{this.myJournal=JSON.parse(value); console.log(value);});
  }
  public async getEntry(index: number): Promise<JournalEntry>{
    await this.storage.get('journal').then((value)=>{this.myJournal=JSON.parse(value); console.log(value);});
    return this.myJournal[index];
  }
  public saveEntry(){
    this.myEntry={ "entrydate": new Date, "entrybody": this.entrytext, "tags": this.tagtext.split(", "), "sessionlength": this.sessionlength };
    this.myJournal.push(this.myEntry);
    this.storage.set('journal', JSON.stringify(this.myJournal));
  }
  
}
