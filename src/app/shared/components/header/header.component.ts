import { Component } from '@angular/core';
import { faSignInAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-header',
  standalone: false,

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  faSignInAlt = faSignInAlt;
  faHeart = faHeart;
  faSearch = faSearch;
}
