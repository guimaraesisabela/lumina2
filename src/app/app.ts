import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavMenuComponent } from './shared/components/nav-menu/nav-menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavMenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Lumina';
}
