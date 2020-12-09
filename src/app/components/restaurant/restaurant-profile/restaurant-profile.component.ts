import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {RestaurantService} from '../../../services/restaurant.service.client';
import {Restaurant} from "../../../model/restaurant.client.model";
import {User} from "../../../model/user.client.model";

@Component({
  selector: 'app-restaurant-profile',
  templateUrl: './restaurant-profile.component.html',
  styleUrls: ['./restaurant-profile.component.css']
})
export class RestaurantProfileComponent implements OnInit {
  errorMsg = 'Invalid email address !';

  constructor(private restaurantService: RestaurantService,
               private route: ActivatedRoute,
               private router: Router,
               private sharedService: SharedService) {
        this.restaurant = new Restaurant('', 'name', '', '', '', '', '', '', '', '');
    }
  user: User;
  restaurantId: String;
  restaurant: Restaurant;
  username: String;
  updateFlag: boolean;
  updateMsg: String;
  userErrorFlag: boolean;
  userErrorMsg: String;

  updateRestaurant(restaurant: Restaurant) {
    this.updateFlag = false;
    this.userErrorFlag = false;
    console.log("update!!!");
    console.log(restaurant);
    this.updateProfile();
    // if (typeof restaurant._id !== 'undefined') {
    //   this.userErrorFlag = true;
    // } else {
    //   console.log("update!!!");
    //   console.log(restaurant);
    //   this.updateProfile();
    // }
  }

  updateProfile() {
    this.restaurantService.updateRestaurant(this.restaurant._id, this.restaurant).subscribe(
        (restaurant: Restaurant) => {
          console.log(restaurant);
          this.restaurant = restaurant;
          this.updateFlag = true;
        },
        (error: any) => {
          console.log(error);
        }
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantId = params['restaurantid'];
      console.log("page RestaurantProfile" + this.restaurantId);
    });

    this.user = this.sharedService.user;
    this.updateFlag = false;
    this.userErrorFlag = false;
    this.updateMsg = 'Profile updated!';
    this.userErrorMsg = 'The username already exists! Please use a different name.';
    this.restaurantService.findRestaurantById(this.restaurantId).subscribe(
      (restaurants: Restaurant[]) => {
        
        this.restaurant = restaurants[0];
        console.log((this.restaurant));
        // this.username = this.restaurant.username;
      },
      (error: any) => console.log(error)
    );
  }

}

