import { Component, OnInit } from '@angular/core';
import {Restaurant} from '../../../model/restaurant.client.model';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {RestaurantService} from '../../../services/restaurant.service.client';
import {User} from '../../../model/user.client.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId: String;
  user: any = {};
  restaurants: Restaurant[];
  loginErrorFlag2: boolean;
  loginErrorMsg2 = 'You need to login before going to user profile or order history!';
  constructor(private  restaurantService: RestaurantService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('home!!!');
    this.user = this.sharedService.user;
    if (!this.user) {
      this.user = new User('guest', '', '', '', '', '', '', '');
    }
    this.restaurantService.findAllRestaurant().subscribe(
      (restaurants: any) => {
        this.restaurants = restaurants;
        console.log(this.restaurants);
      }
  );
  }

  orderhistory() {
    console.log('this.user._id ' + this.user._id);
    if (this.user._id === 'guest') {
        this.loginErrorFlag2 = true;
        return;
    }
    this.router.navigate(['/user', this.user._id, 'orderhistory']);
  }

  profile() {
    if (this.user._id === 'guest') {
        this.loginErrorFlag2 = true;
        return;
    }
    this.router.navigate(['/user', this.user._id, 'profile']);
  }

}
