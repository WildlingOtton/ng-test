import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { DebugElement, Component, Input } from '@angular/core';
import { TodosComponent } from './todos.component';
import { LoadTodos } from '@todos/store/actions/todos.actions';
import { MaterialModule } from '@material/material.module';
import * as todosReducers from '@todos/store/reducers/todos.reducers';
import * as todosActions from '@todos/store/actions/todos.actions';

@Component({
  selector: 'app-todos-list',
  template: ''
})
class MockTodosListComponent {
  @Input()
  todos = [];
}

@Component({
  selector: 'app-todos-form',
  template: ''
})
class MockTodosFormComponent {}

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let store: Store<todosReducers.TodosState>;

  const todos = [
    { id: 1, description: 'Todo #1', completed: false },
    { id: 2, description: 'Todo #2', completed: true }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        StoreModule.forRoot({
          todos: todosReducers.todosReducer
        })
      ],
      declarations: [
        TodosComponent,
        MockTodosListComponent,
        MockTodosFormComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit()', () => {
    test('should dispatch LoadTodos', () => {
      const action = new LoadTodos();

      fixture.detectChanges();

      expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    test('should select all todos from store', () => {
      const action = new todosActions.LoadTodosSuccess(todos);
      store.dispatch(action);

      component.todos$.subscribe(result => {
        expect(result).toEqual(todos);
      });
    });
  });

  describe('html template', () => {
    test('should host the app-todos-form', () => {
      const todoDe: DebugElement = fixture.debugElement;
      const todoEl: HTMLElement = todoDe.nativeElement;
      const todoFormEl: HTMLElement = todoEl.querySelector('app-todos-form');

      expect(todoFormEl).not.toBe(null);
    });

    test('should host the app-todos-list', () => {
      const todoDe: DebugElement = fixture.debugElement;
      const todoEl: HTMLElement = todoDe.nativeElement;
      const todoListEl: HTMLElement = todoEl.querySelector('app-todos-list');

      expect(todoListEl).not.toBe(null);
    });
  });
});
