import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";


//Module Mat
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from "@angular/material/card";

//Components
import { AppComponent } from "./app.component";
import { LobbyComponent } from './components/lobby/lobby.component';
import { GameBoardComponent } from "./components/game-board/game-board.component";
import { PlayerPanelComponent } from './components/player-panel/player-panel.component';


@NgModule({
  declarations: [AppComponent, LobbyComponent, GameBoardComponent, PlayerPanelComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
