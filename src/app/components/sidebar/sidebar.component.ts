import { Component } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { MENU_ROUTES } from 'src/app/data/constants/navigation.constants';
import { ResetLeagueBtnComponent } from "../reset-league-btn/reset-league-btn.component";

@Component({
  selector: 'ui-sidebar',
  standalone: true,
  imports: [SidebarModule, MenuModule, ResetLeagueBtnComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  sidebarOpen = false;
  menuItems = MENU_ROUTES.map(item => ({
    ...item,
    command: () => this.toggleSidebar()
  }));

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen
  }
}
