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
      const payload = { message: 'LoadTodosFail Error Message' };
      const action = new todosActions.LoadTodosFail(payload);

      test('should create action', () => {
        expect({ ...action }).toEqual({
          type: todosActions.LOAD_TODOS_FAIL,
          payload
        });
      });
    });
  });
});
