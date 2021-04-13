export interface Journal extends Array<JournalEntry> { }

export interface JournalEntry {
   entrydate: Date;
   entrybody?: string;
   tags?: string[];
   sessionlength?: number;
}