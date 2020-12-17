import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/user.client.model';
import {Order} from '../../../model/order.client.model';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';
import {OrderService} from '../../../services/order.service.client';
import {RestaurantService} from '../../../services/restaurant.service.client';
import { Restaurant } from 'src/app/model/restaurant.client.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  userId: string;
  orderId: string;
  restaurantId: string;
  restaurant: Restaurant;
  user: User;
  order: Order;
  status: any = 'unknown';

  constructor(private _activatedRoute: ActivatedRoute, private _sharedService: SharedService,
              private orderService: OrderService, private restaurantSerivce: RestaurantService, private router: Router) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.userId = params['uid'];
      this.orderId = params['oid'];
      console.log('user id: ' + this.userId);
      console.log('order id: ' + this.orderId);
    });

    this.user = this._sharedService.user;
    this.orderService.findOrderById(this.orderId).subscribe(
        (order: any) => {
          this.order = order;
          console.log(this.order);
          this.restaurantId = order.restaurantId;
          console.log('restaurant id: ' + this.restaurantId);
          if (this.order.status === 3) {
            this.status = 'In transit';
          } else if (this.order.status === 2) {
            this.status = 'Waiting for Delivery';
          } else if (this.order.status === 0) {
            this.status =  'Incomplete';
          } else if (this.order.status === 1) {
            this.status = 'Preparing';
          } else if (this.order.status === 4) {
            this.status = 'Completed';
          } else if (this.order.status === 5) {
            this.status = 'Cancelled';
          }
          this.restaurantSerivce.findRestaurantById(this.restaurantId).subscribe(
            (restaurants: Restaurant[]) => {
              this.restaurant = restaurants[0];
              console.log(this.restaurant);
            }
          );
      
        }
    );
    // this.restaurantSerivce.findRestaurantById(this.restaurantId).subscribe(
    //   (restaurants: Restaurant[]) => {
    //     this.restaurant = restaurants[0];
    //     console.log(this.restaurant);
    //   }
    // );

  }

    cancelOrder(order: Order) {
        this.orderService.cancelOrder(order.user, order._id).subscribe(
            () => {
                console.log('cancel order');
            }
        );
        this.router.navigate(['/user', this.user._id, 'orderhistory']);
    }

}
