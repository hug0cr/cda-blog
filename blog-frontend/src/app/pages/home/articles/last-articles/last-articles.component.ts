import { Component } from '@angular/core';
import {Post} from "../../../../shared/model/post";

@Component({
  selector: 'app-last-articles',
  templateUrl: './last-articles.component.html',
  styleUrls: ['./last-articles.component.scss']
})
export class LastArticlesComponent {
  lastArticles: Post[] = [
    {
      id: 1,
      title: 'Spring',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris faucibus felis sodales nibh porta suscipit. Proin sit amet est vitae leo scelerisque volutpat. Vivamus imperdiet, tellus eu fringilla pharetra, ante quam venenatis dolor, quis ultricies mi velit at arcu.'
    },
    {
      id: 2,
      title: 'Angular',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris faucibus felis sodales nibh porta suscipit. Proin sit amet est vitae leo scelerisque volutpat. Vivamus imperdiet, tellus eu fringilla pharetra, ante quam venenatis dolor, quis ultricies mi velit at arcu.'
    },
    {
      id: 1,
      title: 'Spring',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris faucibus felis sodales nibh porta suscipit. Proin sit amet est vitae leo scelerisque volutpat. Vivamus imperdiet, tellus eu fringilla pharetra, ante quam venenatis dolor, quis ultricies mi velit at arcu.'
    },
    {
      id: 2,
      title: 'Angular',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris faucibus felis sodales nibh porta suscipit. Proin sit amet est vitae leo scelerisque volutpat. Vivamus imperdiet, tellus eu fringilla pharetra, ante quam venenatis dolor, quis ultricies mi velit at arcu.'
    },{
      id: 1,
      title: 'Spring',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris faucibus felis sodales nibh porta suscipit. Proin sit amet est vitae leo scelerisque volutpat. Vivamus imperdiet, tellus eu fringilla pharetra, ante quam venenatis dolor, quis ultricies mi velit at arcu.'
    },
    {
      id: 2,
      title: 'Angular',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris faucibus felis sodales nibh porta suscipit. Proin sit amet est vitae leo scelerisque volutpat. Vivamus imperdiet, tellus eu fringilla pharetra, ante quam venenatis dolor, quis ultricies mi velit at arcu.'
    },{
      id: 1,
      title: 'Spring',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris faucibus felis sodales nibh porta suscipit. Proin sit amet est vitae leo scelerisque volutpat. Vivamus imperdiet, tellus eu fringilla pharetra, ante quam venenatis dolor, quis ultricies mi velit at arcu.'
    },
    {
      id: 2,
      title: 'Angular',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris faucibus felis sodales nibh porta suscipit. Proin sit amet est vitae leo scelerisque volutpat. Vivamus imperdiet, tellus eu fringilla pharetra, ante quam venenatis dolor, quis ultricies mi velit at arcu.'
    }
  ];


}
