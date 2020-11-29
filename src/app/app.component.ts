import { Component } from '@angular/core';
import { GenericService } from './service/generic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taskAngular';

  constructor(private service: GenericService) {}
  
}
