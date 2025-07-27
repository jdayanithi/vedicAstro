import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeshaRasiPage } from './mesha-rasi.page';

describe('MeshaRasiPage', () => {
  let component: MeshaRasiPage;
  let fixture: ComponentFixture<MeshaRasiPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MeshaRasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
