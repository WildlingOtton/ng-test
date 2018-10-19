import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { empty, Observable } from 'rxjs';

import { TodosService } from '@todos/services/todos.service';
import { TodosEffects } from '@todos/store/effects/todos.effects';
import {
  LoadTodos,
  LoadTodosSuccess,
  LoadTodosFail,
  CreateTodo,
  CreateTodoSuccess,
  CreateTodoFail,
  UpdateTodo,
  UpdateTodoSuccess,
  UpdateTodoFail
} from '@todos/store/actions/todos.actions';
import { create } from 'domain';

describe('TodosEffects', () => {
  let actions: Observable<any>;
  let todosService: TodosService;
  let effects: TodosEffects;

  const todos = [
    { id: 1, description: 'Todo #1', completed: false },
    { id: 2, description: 'Todo #2', completed: true }
  ];

  const mockService = {
    getTodos: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosEffects,
        provideMockActions(() => actions),
        { provide: TodosService, useValue: mockService }
      ]
    });

    todosService = TestBed.get(TodosService);
    effects = TestBed.get(TodosEffects);
  });

  describe('loadTodos$', () => {
    test('should get all Todos on success', () => {
      const action = new LoadTodos();
      const completion = new LoadTodosSuccess(todos);

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: todos });
      const expected = cold('--(b)', { b: completion });

      todosService.getTodos = jest.fn(() => response);

      expect(effects.loadTodos$).toBeObservable(expected);
    });

    test('should return a LoadTodosFail action with error message on failure', () => {
      const action = new LoadTodos();
      const error = new Error();
      const outcome = new LoadTodosFail({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--(b)', { b: outcome });
      todosService.getTodos = jest.fn(() => response);

      expect(effects.loadTodos$).toBeObservable(expected);
    });
  });

  describe('createTodo$', () => {
    test('should return an CreateTodoSuccess action, with todo, on success', () => {
      const newTodo = { description: 'New Todo #1', completed: false };
      const createdTodo = { ...newTodo, id: 1 };
      const action = new CreateTodo(newTodo);
      const outcome = new CreateTodoSuccess(createdTodo);

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: createdTodo });
      const expected = cold('--b', { b: outcome });
      todosService.createTodo = jest.fn(() => response);

      expect(effects.createTodo$).toBeObservable(expected);
    });

    test('should return an CreateTodoFail action, with an error, on failure', () => {
      const newTodo = { description: 'New Todo #1', completed: false };
      const action = new CreateTodo(newTodo);
      const error = new Error();
      const outcome = new CreateTodoFail({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--(b)', { b: outcome });
      todosService.createTodo = jest.fn(() => response);

      expect(effects.createTodo$).toBeObservable(expected);
    });
  });

  describe('updateTodos$', () => {
    test('should return an UpdateTodoSuccess action, with updated todo, on success', () => {
      const existingTodo = {
        id: 1,
        description: 'Existing Todo #1',
        completed: false
      };
      const updatedTodo = {
        id: 1,
        description: 'Updated Todo #1',
        completed: true
      };
      const action = new UpdateTodo(existingTodo);
      const outcome = new UpdateTodoSuccess(updatedTodo);

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: updatedTodo });
      const expected = cold('--b', { b: outcome });
      todosService.updateTodo = jest.fn(() => response);

      expect(effects.updateTodo$).toBeObservable(expected);
    });

    test('should return an UpdateTodoFail action, with an error, on failure', () => {
      const existingTodo = {
        id: 1,
        description: 'Existing Todo #1',
        completed: false
      };
      const action = new UpdateTodo(existingTodo);
      const error = new Error();
      const outcome = new UpdateTodoFail({ error });

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('--(b)', { b: outcome });
      todosService.updateTodo = jest.fn(() => response);

      expect(effects.updateTodo$).toBeObservable(expected);
    });
  });
});
