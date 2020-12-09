import { Component, OnInit } from '@angular/core';
import {RestaurantService} from "../../../services/restaurant.service.client";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedService} from "../../../services/shared.service";
import {Restaurant} from "../../../model/restaurant.client.model";
import {UserService} from "../../../services/user.service.client";

@Component({
  selector: 'app-restaurant-home',
  templateUrl: './restaurant-home.component.html',
  styleUrls: ['./restaurant-home.component.css']
})
export class RestaurantHomeComponent implements OnInit {
  restaurantId: String;

  constructor(private restaurantService: RestaurantService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantId = params['restaurantid'];
      console.log(this.restaurantId);
    });
  }

  deleteUser() {
    this.restaurantService.deleteRestaurant(this.restaurantId).subscribe(
        (restaurant: Restaurant) => {
          console.log('delete user: ' + this.restaurantId);
          this.router.navigate(['/login']);
        },
        (error: any) => console.log(error)
    );
  }

  logout() {
    this.userService.logout().subscribe((data: any) => {
      this.sharedService.user = null;
      this.router.navigate(['/login']);
    });
  }
}
