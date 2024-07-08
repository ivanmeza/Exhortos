import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingFilesComponent } from './loading-files.component';

describe('LoadingFilesComponent', () => {
  let component: LoadingFilesComponent;
  let fixture: ComponentFixture<LoadingFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ LoadingFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
