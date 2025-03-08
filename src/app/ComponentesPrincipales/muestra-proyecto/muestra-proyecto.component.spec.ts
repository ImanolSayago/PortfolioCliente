import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestraProyectoComponent } from './muestra-proyecto.component';

describe('MuestraProyectoComponent', () => {
  let component: MuestraProyectoComponent;
  let fixture: ComponentFixture<MuestraProyectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuestraProyectoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuestraProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
