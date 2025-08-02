import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MudakuPariharangalPage } from './mudaku-pariharangal.page';

describe('MudakuPariharangalPage', () => {
  let component: MudakuPariharangalPage;
  let fixture: ComponentFixture<MudakuPariharangalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MudakuPariharangalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
