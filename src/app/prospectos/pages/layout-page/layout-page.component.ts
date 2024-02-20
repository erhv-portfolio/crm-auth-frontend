import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {
  public sidebarItems = [
    { label: 'Dashboard', icon: 'home', url: '/dashboard' },
    { label: 'listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-hero' }

  ];

  private authService = inject(AuthService);

  public user = computed( () => this.authService.currentUser());

  onLogout() {
    this.authService.logout();
  }

}
