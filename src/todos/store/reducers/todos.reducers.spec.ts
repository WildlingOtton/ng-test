import * as todosReducers from '@todos/store/reducers/todos.reducers';
import * as todosActions from '@todos/store/actions/todos.actions';
import { Todo } from '@todos/models/todo';

describe('TodosReducer', () => {
  describe('undefined action', () => {
    const { initialState } = todosReducers;
    const action = {} as any;
    const state = todosReducers.todosReducer(undefined, action);

    test('should return the default state', () => {
      expect(state).toBe(initialState);
    });
  });

  describe('Loading Todos', () => {
    describe('LOAD_TODOS action', () => {
      const { initialState } = todosReducers;
      const action = new todosActions.LoadTodos();
      const state = todosReducers.todosReducer(initialState, action);

      test('should return the initialState', () => {
        expect(state).toEqual({
          todos: []
        });
      });
    });

    describe('LOAD_TODOS_SUCCESS action', () => {
      test('should return array of todos', () => {
        const todos: Todo[] = [
          { id: 1, description: 'Todo #1', completed: false },
          { id: 2, description: 'Todo #2', completed: true }
        ];

        const { initialState } = todosReducers;
        const action = new todosActions.LoadTodosSuccess(todos);
        const state = todosReducers.todosReducer(initialState, action);

        expect(state.todos).toEqual(todos);
      });
    });

    describe('LOAD_SUCCESS_FAIL action', () => {
      test('should return return the initial state', () => {
        const { initialState } = todosReducers;
        const action = new todosActions.LoadTodosFail({});
        const state = todosReducers.todosReducer(initialState, action);

        expect(state).toEqual(initialState);
      });
    });
  });

  describe('Creating Todos', () => {
    describe('CREATE_TODO_SUCCESS action', () => {
      test('should add new todo to the todos array', () => {
        const todos = [
          { id: 1, description: 'Todo #1', completed: false },
          { id: 2, description: 'Todo #2', completed: true }
        ];

        const newTodo = { description: 'New Todo #1', completed: false };

        const { initialState } = todosReducers;
        const previousState = { ...initialState, todos };
        const action = new todosActions.CreateTodoSuccess(newTodo);
        const state = todosReducers.todosReducer(previousState, action);

        expect(state.todos).toEqual([...todos, newTodo]);
      });
    });
  });

  describe('Updating Todos', () => {
    describe('UPDATE_TODO_SUCCESS action', () => {
      test('should add new todo to the todos array', () => {
        const todos = [
          { id: 1, description: 'Todo #1', completed: false },
          { id: 2, description: 'Todo #2', completed: true }
        ];

        const updatedTodo = {
          id: 1,
          description: 'Updated Todo #1',
          completed: true
        };

        const updatedTodos = [
          updatedTodo,
          { id: 2, description: 'Todo #2', completed: true }
        ];

        const { initialState } = todosReducers;
        const previousState = { ...initialState, todos };
        const action = new todosActions.UpdateTodoSuccess(updatedTodo);
        const state = todosReducers.todosReducer(previousState, action);

        expect(state.todos).toEqual(updatedTodos);
      });
    });
  });

  describe('Removing Todos', () => {
    describe('REMOVE_TODO_SUCCESS action', () => {
      test('should add new todo to the todos array', () => {
        const todoToRemove = {
          id: 1,
          description: 'Todo #1',
          completed: false
        };
        const todoToKeep = { id: 2, description: 'Todo #2', completed: true };
        const todos = [todoToRemove, todoToKeep];

        const { initialState } = todosReducers;
        const previousState = { ...initialState, todos };
        const action = new todosActions.RemoveTodoSuccess(todoToRemove);
        const state = todosReducers.todosReducer(previousState, action);

        expect(state.todos).toEqual([todoToKeep]);
      });
    });
  });
});
