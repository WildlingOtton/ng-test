import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import * as todosActions from '@todos/store/actions/todos.actions';
import { TodosService } from '@todos/services/todos.service';

@Injectable()
export class TodosEffects {
  constructor(private actions$: Actions, private todosService: TodosService) {}

  @Effect()
  loadTodos$ = this.actions$.ofType(todosActions.LOAD_TODOS).pipe(
    switchMap(() => {
      return this.todosService.getTodos().pipe(
        map(todos => new todosActions.LoadTodosSuccess(todos)),
        catchError(error => of(new todosActions.LoadTodosFail({ error })))
      );
    })
  );

  @Effect()
  createTodo$ = this.actions$.ofType(todosActions.CREATE_TODO).pipe(
    map((action: todosActions.CreateTodo) => action.payload),
    switchMap(todo => {
      return this.todosService.createTodo(todo).pipe(
        map(newTodo => new todosActions.CreateTodoSuccess(newTodo)),
        catchError(error => of(new todosActions.CreateTodoFail({ error })))
      );
    })
  );

  @Effect()
  updateTodo$ = this.actions$.ofType(todosActions.UPDATE_TODO).pipe(
    map((action: todosActions.UpdateTodo) => action.payload),
    switchMap(todo => {
      return this.todosService.updateTodo(todo).pipe(
        map(updatedTodo => new todosActions.UpdateTodoSuccess(updatedTodo)),
        catchError(error => of(new todosActions.UpdateTodoFail({ error })))
      );
    })
  );

  @Effect()
  removeTodo$ = this.actions$.ofType(todosActions.REMOVE_TODO).pipe(
    map((action: todosActions.RemoveTodo) => action.payload),
    switchMap(todo => {
      return this.todosService.removeTodo(todo).pipe(
        map(() => new todosActions.RemoveTodoSuccess(todo)),
        catchError(error => of(new todosActions.RemoveTodoFail({ error })))
      );
    })
  );
}
