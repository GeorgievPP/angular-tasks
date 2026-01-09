import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StackFlow } from './features/stack-flow/stack-flow';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StackFlow],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}
