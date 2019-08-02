import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { TablecolumnfilterComponent } from './tablecolumnfilter.component';

describe('TablecolumnfilterComponent', () => {
  let component: TablecolumnfilterComponent;
  let fixture: ComponentFixture<TablecolumnfilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablecolumnfilterComponent ],
      imports: [ 
        BrowserModule,
        FormsModule     
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablecolumnfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
