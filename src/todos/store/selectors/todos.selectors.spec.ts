import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import * as todosReducers from '@todos/store/reducers/todos.reducers';
import * as todosActions from '@todos/store/actions/todos.actions';
import * as todosSelectors from '@todos/store/selectors/todos.selectors';

import { Todo } from '@todos/models/todo';

describe('Todos Selectors', () => {
  let store: Store<todosReducers.TodosState>;

  const todos: Todo[] = [
    { id: 1, description: 'Todo #1', completed: false },
    { id: 2, description: 'Todo #2', completed: true }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          todos: todosReducers.todosReducer
        })
      ]
    });

    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getAllTodos', () => {
    it('should return all todos', () => {
      let result;

      store.select(todosSelectors.getAllTodos).subscribe(val => (result = val));

      expect(result).toEqual([]);

      store.dispatch(new todosActions.LoadTodosSuccess(todos));

      expect(result).toEqual(todos);
    });
  });
});
