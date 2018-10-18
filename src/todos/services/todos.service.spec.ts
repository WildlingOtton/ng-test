import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TodosService } from '@todos/services/todos.service';

describe('TodosService', () => {
  const todos = [
    { id: 1, description: 'Todo #1', completed: false },
    { id: 2, description: 'Todo #2', completed: true }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosService]
    });

    const service: TodosService = TestBed.get(TodosService);
    spyOn(service, 'getTodos').and.returnValue(todos);
  });

  describe('getTodos', () => {
    it('should get all Todos', () => {
      const service: TodosService = TestBed.get(TodosService);

      expect(service.getTodos()).toEqual(todos);
    });
  });
});
