import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from "primeng/api";
import { MENU_ROUTES } from "src/app/data/constants/navigation.constants";
import { ResetLeagueBtnComponent } from "../reset-league-btn/reset-league-btn.component";

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, TabMenuModule, ResetLeagueBtnComponent],
  selector: 'ui-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  menuItems: MenuItem[] = MENU_ROUTES
}