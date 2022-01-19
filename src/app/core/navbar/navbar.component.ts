import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isCollapsed: boolean = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigate(path: string) {
    this.isCollapsed = true;
    this.router.navigate([path]);
  }

}
