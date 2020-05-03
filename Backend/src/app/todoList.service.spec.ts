/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodoListService } from './todoList.service';

describe('Service: TodoList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoListService]
    });
  });

  it('should ...', inject([TodoListService], (service: TodoListService) => {
    expect(service).toBeTruthy();
  }));
});
