import { Component, Injectable, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LinkComponent } from '../../components/link/link.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, LinkComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
@Injectable()
export class HomeComponent{
  constructor(private cookies: CookieService, private router: Router) {
    /* if (this.cookies.get('logged') === 'true') {
      this.router.navigateByUrl(this.cookies.get('userRole') === 'ROLE_ADMIN' ? '/admin' : '/usuario');
    } */
  }

  /* ngOnInit(): void {
    console.log('HomeComponent.ngOnInit');
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.cookies.get('logged') === 'true') {
      this.router.navigateByUrl(this.cookies.get('userRole') === 'ROLE_ADMIN' ? '/admin' : '/usuario');
    }
  } */

  scrollToPItem() {
    document.getElementById('know-us')?.scrollIntoView({ behavior: 'smooth' });
  }
}