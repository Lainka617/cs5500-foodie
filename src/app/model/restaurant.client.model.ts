import {Order} from "./order.client.model";

export class Menu {
    _id: String;
    dish_name: String;
    price: Number;
    description: String;
    url: String;

    constructor(id: String, name: String, price: Number, description: String, url: String) {
        this._id = id;
        this.description = description;
        this.dish_name = name;
        this.price = price;
        this.url = url;
    }

}


export class Restaurant {
    _id: String;
    name: String;
    email: String;
    address1: String;
    address2: String;
    city: String;
    state: String;
    zip: String;
    phone: String;
    description: String;


    constructor(id: String, name: String, email: String, address1: String, address2: String, city: String, state: String, zip: String, phone: String, description: String) {
        this._id = id;
        this.name = name;
        this.email = email;
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.description = description;

    }
}
