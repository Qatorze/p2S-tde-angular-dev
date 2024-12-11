import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

export const preventLoggedInGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Injecte le service d'authentification
  const router = inject(Router); // Injecte le Module Router pour les eventuelles redirections

  // Verifie si le user est connecté
  if (authService.isAuthenticated()) {
    const userRole = authService.getUserRole(); // Obtient le role du user connecté

    // Ici on regirige en function du role du user
    if (userRole === 'user') {
      router.navigate(['/user/feed']);
    } else if (userRole === 'admin') {
      router.navigate(['/admin/dashboard']);
    }
    // Bloque la navigation vers route demandée se le user ne risulte pas connecté ou n'a pas le role requis pour la route de destination.
    return false;
  }
  return true;
};
