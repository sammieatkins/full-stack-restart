import { Component } from '@angular/core';

@Component({
  selector: 'cms-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // NAV TOGGLES
  isUserDropdownOpen: boolean = false;
  isNavbarCollapsed: boolean = true;
  
  toggleUserDropdown() {
    // if it's open, switch it to closed, and vice versa
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

}
