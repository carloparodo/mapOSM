import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PathPage } from './path.page';

describe('Tab3Page', () => {
  let component: PathPage;
  let fixture: ComponentFixture<PathPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PathPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PathPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
