import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LobbyComponent } from "./components/lobby/lobby.component";

const routes: Routes = [
  { path: "", redirectTo: "/lobby", pathMatch: "full" },
  { path: "lobby", component: LobbyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
