import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@material/material.module';
import { StoreModule, Store } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { TodosFormComponent } from './todos-form.component';
import * as todosReducers from '@todos/store/reducers/todos.reducers';
import { CreateTodo } from '@todos/store/actions/todos.actions';

describe('TodosFormComponent', () => {
  let component: TodosFormComponent;
  let fixture: ComponentFixture<TodosFormComponent>;
  let store: Store<todosReducers.TodosState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          todos: todosReducers.todosReducer
        })
      ],
      declarations: [TodosFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    fixture = TestBed.createComponent(TodosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should dispatch CreateTodo on form submit', () => {
    const description = 'A Test Description';
    const action = new CreateTodo({ description, completed: false });

    component.todoForm.controls['description'].setValue(description);
    component.onSubmit();

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
