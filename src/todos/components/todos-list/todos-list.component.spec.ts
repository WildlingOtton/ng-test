import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';
import { TodosListComponent } from './todos-list.component';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '@material/material.module';

@Component({
  selector: 'app-todos-item',
  template: ''
})
class MockTodosItemComponent {
  @Input()
  todo = {};
}

describe('TodosListComponent', () => {
  let component: TodosListComponent;
  let fixture: ComponentFixture<TodosListComponent>;

  const todos = [
    { id: 1, description: 'Todo #1', completed: false },
    { id: 2, description: 'Todo #2', completed: true }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [TodosListComponent, MockTodosItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListComponent);
    component = fixture.componentInstance;
    component.todos = todos;

    fixture.detectChanges();
  });

  test('should list todos', () => {
    const debugEl = fixture.debugElement.query(By.css('.todos-list'));
    const listEl = debugEl.nativeElement as HTMLUListElement;
    expect(listEl.childElementCount).toBe(todos.length);
  });
});
