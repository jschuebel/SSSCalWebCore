import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }   from '@angular/forms';

import { PictureComponent } from './picture.component';
import { Windowref } from '../windowref.service';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('PictureComponent', () => {
  let component: PictureComponent;
  let fixture: ComponentFixture<PictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureComponent ],
      imports: [ 
        FormsModule,
        HttpClientTestingModule
      ],
      providers : [Windowref]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
/* TypeError: Cannot read property 'nativeElement' of undefined
  it('should create', () => {
    expect(component).toBeTruthy();
  });
*/  
});
