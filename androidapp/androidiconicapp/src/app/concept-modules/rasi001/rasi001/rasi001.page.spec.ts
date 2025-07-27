import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rasi001Page } from './rasi001.page';

describe('Rasi001Page', () => {
  let component: Rasi001Page;
  let fixture: ComponentFixture<Rasi001Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Rasi001Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
