import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TantrikPariharamPage } from './tantrik-pariharam.page';

describe('TantrikPariharamPage', () => {
  let component: TantrikPariharamPage;
  let fixture: ComponentFixture<TantrikPariharamPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TantrikPariharamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
