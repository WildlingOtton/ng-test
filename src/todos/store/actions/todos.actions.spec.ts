import * as todosActions from '@todos/store/actions/todos.actions';

describe('Todos Actions', () => {
  describe('Load Todos Actions', () => {
    describe('LoadTodos', () => {
      test('should create an action', () => {
        const action = new todosActions.LoadTodos();

        expect({ ...action }).toEqual({
          type: todosActions.LOAD_TODOS
        });
      });
    });

    describe('LoadTodosSucces', () => {
      test('should create an action', () => {
        const payload = [
          {
            id: 1,
            description: 'LoadTodosSuccessTest',
            completed: false
          }
        ];

        const action = new todosActions.LoadTodosSuccess(payload);

        expect({ ...action }).toEqual({
          type: todosActions.LOAD_TODOS_SUCCESS,
          payload
        });
      });
    });

    describe('LoadTodosFail', () => {
      test('should create action', () => {
        const payload = { message: 'LoadTodosFail Error Message' };
        const action = new todosActions.LoadTodosFail(payload);

        expect({ ...action }).toEqual({
          type: todosActions.LOAD_TODOS_FAIL,
          payload
        });
      });
    });
  });

  describe('Create Todos Actions', () => {
    describe('CreateTodo', () => {
      test('should create an action', () => {
        const payload = { description: 'New Todo #', completed: false };
        const action = new todosActions.CreateTodo(payload);

        expect({ ...action }).toEqual({
          type: todosActions.CREATE_TODO,
          payload
        });
      });
    });

    describe('CreateTodoSuccess', () => {
      test('should create an action', () => {
        const payload = { id: 1, description: 'New Todo #', completed: false };
        const action = new todosActions.CreateTodoSuccess(payload);

        expect({ ...action }).toEqual({
          type: todosActions.CREATE_TODO_SUCCESS,
          payload
        });
      });
    });

    describe('CreateTodoFail', () => {
      test('should create an action', () => {
        const payload = { message: 'CreateTodoFail Error Message' };
        const action = new todosActions.CreateTodoFail(payload);

        expect({ ...action }).toEqual({
          type: todosActions.CREATE_TODO_FAIL,
          payload
        });
      });
    });
  });
});
