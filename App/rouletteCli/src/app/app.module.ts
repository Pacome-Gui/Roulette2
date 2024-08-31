import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouletteNumberComponent } from './roulette-number/roulette-number.component';
import { HttpClientModule } from '@angular/common/http';
import { RouletteStatComponent } from './roulette-stat/roulette-stat.component';
import { BallNumberComponent } from './ball-number/ball-number.component';
import { TapisComponent } from './tapis/tapis.component';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    RouletteNumberComponent,
    RouletteStatComponent,
    BallNumberComponent,
    MessageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TapisComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
