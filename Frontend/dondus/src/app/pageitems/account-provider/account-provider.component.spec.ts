import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProviderComponent } from './account-provider.component';

describe('AccountProviderComponent', () => {
  let component: AccountProviderComponent;
  let fixture: ComponentFixture<AccountProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
