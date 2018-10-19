import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '@material/material.module';
import { TodosItemComponent } from './todos-item.component';
import * as todosReducers from '@todos/store/reducers/todos.reducers';
import { UpdateTodo } from '@todos/store/actions/todos.actions';

describe('TodosItemComponent', () => {
  let component: TodosItemComponent;
  let fixture: ComponentFixture<TodosItemComponent>;
  let store: Store<todosReducers.TodosState>;

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
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodosItemComponent);
    component = fixture.componentInstance;
    component.todo = todo;
    fixture.detectChanges();
  });

  test('should dispatch UpdateTodo on checkbox click', () => {
    const action = new UpdateTodo({ ...todo, completed: !todo.completed });
    const checkboxDe = fixture.debugElement.query(By.css('.toggle-completed'));
    const checkboxEl = checkboxDe.nativeElement as HTMLInputElement;

    checkboxEl.click();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  describe('html template', () => {
    test('should display a todo item', () => {
      const todoItemDe = fixture.debugElement;
      const todoEl = todoItemDe.nativeElement;

      expect(todoEl.textContent).toContain(todo.description);
    });
  });
});
