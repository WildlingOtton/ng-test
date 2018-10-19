import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TodosService } from '@todos/services/todos.service';
import { cold } from 'jasmine-marbles';
import { HttpClient } from '@angular/common/http';

describe('TodosService', () => {
  let service: TodosService;
  let http: HttpClient;

  const todos = [
    { id: 1, description: 'Todo #1', completed: false },
    { id: 2, description: 'Todo #2', completed: true }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosService]
    });

    http = TestBed.get(HttpClient);
    service = TestBed.get(TodosService);
  });

  describe('getTodos', () => {
    test('should get all Todos', () => {
      spyOn(service, 'getTodos').and.returnValue(todos);
      expect(service.getTodos()).toEqual(todos);
    });
  });

  describe('createTodo', () => {
    test('should create a new Todo', () => {
      const newTodo = { description: 'New Todo #1', completed: false };
      const createdTodo = {
        id: 1,
        description: 'New Todo #1',
        completed: false
      };
      const expected = cold('-a|', { a: createdTodo });
      http.post = jest.fn(() => expected);

      expect(service.createTodo(newTodo)).toBeObservable(expected);
      expect(http.post).toHaveBeenCalledWith(service.baseUrl, newTodo);
    });
  });

  describe('updateTodo', () => {
    test('should update an existing Todo', () => {
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
      const expected = cold('-a|', { a: updatedTodo });
      http.put = jest.fn(() => expected);

      expect(service.updateTodo(existingTodo)).toBeObservable(expected);
      expect(http.put).toHaveBeenCalledWith(
        `${service.baseUrl}/${existingTodo.id}`,
        existingTodo
      );
    });
  });

  describe('removeTodo', () => {
    test('should create a new Todo', () => {
      const removedTodo = {
        id: 1,
        description: 'Remove Todo #1',
        completed: false
      };
      const expected = cold('-a|', { a: removedTodo });
      http.delete = jest.fn(() => expected);
      expect(service.removeTodo(removedTodo)).toBeObservable(expected);
      expect(http.delete).toHaveBeenCalledWith(
        `${service.baseUrl}/${removedTodo.id}`
      );
    });
  });
});
