import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DnaAstrologyPage } from './dna-astrology.page';

describe('DnaAstrologyPage', () => {
  let component: DnaAstrologyPage;
  let fixture: ComponentFixture<DnaAstrologyPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DnaAstrologyPage]
    });
    fixture = TestBed.createComponent(DnaAstrologyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
