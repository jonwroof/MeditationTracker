import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JournalmodalPage } from './journalmodal.page';

describe('JournalmodalPage', () => {
  let component: JournalmodalPage;
  let fixture: ComponentFixture<JournalmodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalmodalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JournalmodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
