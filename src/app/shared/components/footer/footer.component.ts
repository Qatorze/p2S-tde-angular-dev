import { Component } from '@angular/core';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-footer',
  standalone: false,

  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  faCopyright = faCopyright;
}
