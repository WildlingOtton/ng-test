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
        const payload = { description: 'New Todo #1', completed: false };
        const action = new todosActions.CreateTodo(payload);

        expect({ ...action }).toEqual({
          type: todosActions.CREATE_TODO,
          payload
        });
      });
    });

    describe('CreateTodoSuccess', () => {
      test('should create an action', () => {
        const payload = { id: 1, description: 'New Todo #1', completed: false };
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

  describe('Update Todos Actions', () => {
    describe('UpdateTodo', () => {
      test('should create an action', () => {
        const payload = {
          id: 1,
          description: 'Update Todo #1',
          completed: false
        };
        const action = new todosActions.UpdateTodo(payload);

        expect({ ...action }).toEqual({
          type: todosActions.UPDATE_TODO,
          payload
        });
      });
    });

    describe('UpdateTodoSuccess', () => {
      test('should update an action', () => {
        const payload = {
          id: 1,
          description: 'Updated Todo #1',
          completed: false
        };
        const action = new todosActions.UpdateTodoSuccess(payload);

        expect({ ...action }).toEqual({
          type: todosActions.UPDATE_TODO_SUCCESS,
          payload
        });
      });
    });

    describe('UpdateTodoFail', () => {
      test('should update an action', () => {
        const payload = { message: 'UpdateTodoFail Error Message' };
        const action = new todosActions.UpdateTodoFail(payload);

        expect({ ...action }).toEqual({
          type: todosActions.UPDATE_TODO_FAIL,
          payload
        });
      });
    });
  });

  describe('Remove Todos Actions', () => {
    describe('RemoveTodo', () => {
      test('should create an action', () => {
        const payload = {
          id: 1,
          description: 'Remove Todo #1',
          completed: false
        };
        const action = new todosActions.RemoveTodo(payload);

        expect({ ...action }).toEqual({
          type: todosActions.REMOVE_TODO,
          payload
        });
      });
    });

    describe('RemoveTodoSuccess', () => {
      test('should create an action', () => {
        const payload = { id: 1, description: 'New Todo #1', completed: false };
        const action = new todosActions.RemoveTodoSuccess(payload);

        expect({ ...action }).toEqual({
          type: todosActions.REMOVE_TODO_SUCCESS,
          payload
        });
      });
    });

    describe('RemoveTodoFail', () => {
      test('should create an action', () => {
        const payload = { message: 'RemoveTodoFail Error Message' };
        const action = new todosActions.RemoveTodoFail(payload);

        expect({ ...action }).toEqual({
          type: todosActions.REMOVE_TODO_FAIL,
          payload
        });
      });
    });
  });
});
