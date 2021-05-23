import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    protected router: Router
  ) { }

  ngOnInit(): void {
  }

  navigateToFavorites() {
    this.router.navigate(['/favoriete-characters']);
  }

  navigateToHome() {
    this.router.navigate(['/discover-characters']);
  }

}
