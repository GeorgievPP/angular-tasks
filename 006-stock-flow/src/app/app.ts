import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { StockFlow } from './features/stock-flow/stock-flow';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StockFlow],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
