import { Component} from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
    selector: 'app-league',
    templateUrl: './league.component.html',
    standalone: true,
    imports: [
      NavbarComponent,
      CommonModule,
      RouterOutlet,
      SidebarComponent
    ],
})
export class LeagueComponent {
  isMobile = JSON.parse(localStorage.getItem('mobile') as string);
}
