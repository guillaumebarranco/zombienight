import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { PlayComponent } from './play/play.component';

import { CapitalizePipe } from './capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    PlayComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MomentModule,
    RouterModule.forRoot([
      {
        path: 'plays',
        component: PlayComponent,
      },
      {
        path: '',
        component: GraphComponent
      }
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
