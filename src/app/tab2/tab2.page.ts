import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertController, NavController } from '@ionic/angular';
import { JournalService } from '../journal.service';
import { ModalController } from '@ionic/angular';
import { JournalmodalPage } from '../modals/journalmodal/journalmodal.page';
const circleR = 80;
const circleDasharray = 2 * Math.PI * circleR;



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  percent: BehaviorSubject<number> = new BehaviorSubject(100);
  minuteinput: number;
  minutes: number;
  timer: number; //in seconds
  start: Date;
  finish: number;
  totalTime: number;
  interval;
  sound: string = "gong";
  startDuration = 1;
  journal: any;
  circleR = circleR;
  circleDasharray = circleDasharray;
  state: 'start' | 'stop' = 'stop';

  constructor(public alertController: AlertController, private nav: NavController, private journalService: JournalService, public modalController: ModalController) {
  }
  async ngOnInit(){
    this.journal = this.journalService;
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: JournalmodalPage,
      componentProps: {
        "tempEntry": {entrydate: new Date, sessionlength: this.minuteinput, tags: [], entrybody: null}
      }
    });


    return await modal.present();
  }
  async presentSessionAlert() {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Save Session?',
      // subHeader: 'Subtitle',
      // message: 'Choose whether to save your session, take notes, or cancel',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: () => {
            this.journal.sessionlength = this.minuteinput;
            this.openModal();
          }
        }
      ]
    });

    await alert.present();
  }
  async presentNumberAlert() {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Whoops!',
      // subHeader: 'Subtitle',
      message: 'Please enter a number above Zero, you\'re here to meditate, not to not meditate',
      buttons: [
        {
          text: 'OK',
          role: 'OK',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await alert.present();
  }
  startTimer(duration: number) {
    if (this.minuteinput <= 0 || this.minuteinput == null) {
      this.presentNumberAlert();
    } else {
      this.state = 'start';
      this.finish = Date.now() + duration * 60000;
      this.totalTime = duration * 60;
      clearInterval(this.interval);
      this.timer = this.minuteinput * 60;
      // this.updateTimeValue();
      this.interval = setInterval(() => {
        this.updateTimeValue();
      }, 6.9);
    }
  }

  stopTimer() {
    clearInterval(this.interval);
    this.percent.next(100);
    this.time.next('00:00');
    this.state = 'stop';
  }


  updateTimeValue() {
    let minutes: any = (this.finish - Date.now()) / 60000.0;
    let seconds: any = ((this.finish - Date.now()) / 1000.0) % 60.0;
    let minutes_str = String('0' + Math.floor(minutes)).slice(-2);
    let seconds_str = String('0' + Math.floor(seconds)).slice(-2);

    const text = minutes_str + ':' + seconds_str;
    this.time.next(text);


    const percentage = 100 - ((((this.finish - Date.now()) / 1000) / this.totalTime) * 100);
    this.percent.next(percentage);

    --this.timer;
    if (minutes + seconds <= 0) {
      this.stopTimer();
      let audio = new Audio();
      if (this.sound == "gong") {
        audio.src = "./assets/audio/gong.wav";
      } else
        if (this.sound == "bowl") {
          audio.src = "./assets/audio/bowl.wav";
        } else
          if (this.sound == "block") {
            audio.src = "./assets/audio/block.wav";
          }
      audio.load();
      audio.play();
      this.presentSessionAlert();
    }
  }
  percentageOffset(percent) {
    const percentFloat = percent / 100;
    return circleDasharray * (1 - percentFloat);
  }

}
