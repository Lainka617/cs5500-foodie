import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Menu, Restaurant} from "../model/restaurant.client.model";
import {Router} from "@angular/router";
import {SharedService} from "./shared.service";
import {map} from 'rxjs/operators';

@Injectable()
export class RestaurantService {


    constructor(private _http: HttpClient, private sharedService: SharedService, private router: Router){}
    baseUrl = environment.baseUrl;
    options = {withCredentials: false};
    
    createRestaurant(restaurant: Restaurant) {
        return this._http.post(this.baseUrl + '/api/restaurant/createrestaurant', restaurant);
    }

    findRestaurantById(restaurantId: String) {
        return this._http.get(this.baseUrl + '/api/restaurant/findrestaurantbyid/' + restaurantId);
    }

    findRestaurantByName(restaurantName: String) {
        return this._http.get(this.baseUrl + '/api/restaurant/findrestaurantbyname/' + restaurantName);
    }

    findRestaurantByZipcode(zipCode: String) {
        return this._http.get(this.baseUrl + '/api/restaurant/findrestaurantbyzip/' + zipCode);
    }

    findAllRestaurant() {
        return this._http.get<Restaurant>(this.baseUrl + '/api/restaurant/findallrestaurant');
    }

    updateRestaurant(restaurantId: String, restaurant: Restaurant) {
        return this._http.put(this.baseUrl + '/api/restaurant/updateRestaurant/' + restaurantId, restaurant);
    }

    deleteRestaurant(restaurantId: String) {
        return this._http.delete(this.baseUrl + '/api/restaurant/restaurant/' + restaurantId);
    }
}
