import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SportTrackerPage } from './features/sport-tracker-page/sport-tracker-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SportTrackerPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
