import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './shared/components/search-bar/search-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
onSearch($event: string) {
throw new Error('Method not implemented.');
}
  protected readonly title = signal('lotiva');
searchTerm: any;
}
