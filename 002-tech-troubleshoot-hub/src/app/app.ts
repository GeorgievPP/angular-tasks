import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TechTroubleshootHub } from './features/tech-troubleshoot-hub/tech-troubleshoot-hub';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TechTroubleshootHub],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
