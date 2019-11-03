import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  

  constructor(private webReqService: WebRequestService) { }

  
  public createList(title: string) {
    // send a web request to create a new list
    return this.webReqService.post('lists', { title });
  }

  getLists() {
    return this.webReqService.get('lists');
  }

  getTasks(listId: any) {
    return this.webReqService.get(`lists/${listId}/tasks`);
  }
}
