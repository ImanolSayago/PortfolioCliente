import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [FooterComponent, ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {

}
