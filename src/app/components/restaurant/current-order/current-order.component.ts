import { Component, OnInit } from '@angular/core';
import {Order} from '../../../model/order.client.model';
import {RestaurantService} from '../../../services/restaurant.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {OrderService} from '../../../services/order.service.client';
import { Location } from '@angular/common'

@Component({
  selector: 'app-current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css']
})
export class CurrentOrderComponent implements OnInit {

  employeeId: String;
  restaurantId: String;
  orders: Order[];

  constructor(private restaurantService: RestaurantService,
              private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private sharedService: SharedService,
              private location: Location) { }

  ngOnInit() {
    this.employeeId = this.sharedService.user._id;
    this.route.params.subscribe(params => {
      this.restaurantId = params['restaurantid'];
      console.log("page RestaurantProfile" + this.restaurantId);
    });
    if (this.restaurantId == 'all') {
      this.orderService.findAllCurrentOrders().subscribe(
        (orders: any) => {
          this.orders = orders;
          console.log(this.orders);
        }        
      );

    } else {
      this.orderService.findOrderByStatusAndRestaurant(1, this.restaurantId).subscribe(
        (orders: any) => {
          this.orders = orders;
          console.log(this.orders);
        }
      );
    }

  }

  sendtoAlldelivery(order: Order) {
    this.orderService.postOrder(order.user, order._id).subscribe(
        () => {
          console.log('send order to delivery!');
        }
    );
    this.ngOnInit();

  }

  cancelOrder(order: Order) {
    this.orderService.cancelOrder(order.user, order._id).subscribe(
        () => {
          console.log('cancel order');
        }
    );
    this.ngOnInit();

  }

  back() {
    this.location.back()
  }

}
