import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '@material/material.module';

import { TodosItemComponent } from './todos-item.component';
import * as todosReducers from '@todos/store/reducers/todos.reducers';

describe('TodosItemComponent', () => {
  let component: TodosItemComponent;
  let fixture: ComponentFixture<TodosItemComponent>;

  const todo = { id: 1, description: 'Todo #1', completed: false };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        StoreModule.forRoot({
          todos: todosReducers.todosReducer
        })
      ],
      declarations: [TodosItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosItemComponent);
    component = fixture.componentInstance;
    component.todo = todo;
    fixture.detectChanges();
  });

  describe('html template', () => {
    test('should display a todo item', () => {
      const todoItemDe = fixture.debugElement;
      const todoEl = todoItemDe.nativeElement;

      expect(todoEl.textContent).toContain(todo.description);
    });
  });
});
