import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GemMainComponent } from './features/gem-main-component/gem-main-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GemMainComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
