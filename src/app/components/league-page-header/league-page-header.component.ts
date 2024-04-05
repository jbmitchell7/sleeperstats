import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'ui-league-page-header',
  template: `<h1 class="text-3xl pb-4">{{title}}</h1>`
})
export class LeaguePageHeaderComponent {
  @Input() title = ''
}
