import { Component, OnInit } from '@angular/core';
import {Order} from '../../../model/order.client.model';
import {RestaurantService} from '../../../services/restaurant.service.client';
import {SharedService} from '../../../services/shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Restaurant} from '../../../model/restaurant.client.model';
import {OrderService} from '../../../services/order.service.client';
import { Location } from '@angular/common'

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class RestaurantOrderHistoryComponent implements OnInit {
  completeorders: Order[];
  canceledorders: Order[];
  intransitorders: Order[];
  waitingdeliverorders: Order[];
  preparingorders: Order[];
  employeeId: String;
  restaurantId: String;

  constructor(private  orderService: OrderService,
              private sharedService: SharedService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantId = params['restaurantid'];
      console.log("page RestaurantOrderHistory" + this.restaurantId);
    });
    if (this.restaurantId == 'all') {
      this.orderService.findOrderByStatus(4).subscribe(
        (orders: any) => {
          this.completeorders = orders;
        }
      );
      this.orderService.findOrderByStatus(5).subscribe(
          (orders: any) => {
            this.canceledorders = orders;
          }
      );
      this.orderService.findOrderByStatus(1).subscribe(
          (orders: any) => {
            this.preparingorders = orders;
          }
      );
      this.orderService.findOrderByStatus(2).subscribe(
          (orders: any) => {
            this.waitingdeliverorders = orders;
          }
      );
      this.orderService.findOrderByStatus(3).subscribe(
          (orders: any) => {
            this.intransitorders = orders;
          }
      );

    } else {
      this.orderService.findOrderByStatusAndRestaurant(4, this.restaurantId).subscribe(
        (orders: any) => {
          this.completeorders = orders;
        }
      );
      this.orderService.findOrderByStatusAndRestaurant(5, this.restaurantId).subscribe(
          (orders: any) => {
            this.canceledorders = orders;
          }
      );
      this.orderService.findOrderByStatusAndRestaurant(1, this.restaurantId).subscribe(
          (orders: any) => {
            this.preparingorders = orders;
          }
      );
      this.orderService.findOrderByStatusAndRestaurant(2, this.restaurantId).subscribe(
          (orders: any) => {
            this.waitingdeliverorders = orders;
          }
      );
      this.orderService.findOrderByStatusAndRestaurant(3, this.restaurantId).subscribe(
          (orders: any) => {
            this.intransitorders = orders;
          }
      );
    }


  }

  back() {
    this.location.back()
  }

}
