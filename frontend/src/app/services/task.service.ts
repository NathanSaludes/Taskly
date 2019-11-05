import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  
  constructor(private webReqService: WebRequestService) { }

  getLists() {
    return this.webReqService.get('lists');
  }
  
  public createList(title: string) {
    // send a web request to create a new list
    return this.webReqService.post('lists', { title });
  }
  
  
  
  getTasks(listId: any) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }
  
  public createTask(title: string, listId: string) {
    // send a web request to create a new task
    return this.webReqService.post(`lists/${listId}/tasks`, { title });
  }
}
