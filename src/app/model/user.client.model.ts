import {Order} from "./order.client.model";

export class User {
    _id: String;
    username: String;
    password: String;
    // userType: String;
    email: String;
    address1: String;
    address2: String;
    city: String;
    state: String;
    zip: String;
    phone: String;
    credit_card_info: String;
    billing_info: String;
    order_history: Order[];
    //currentOrder: Order;


    constructor(_id: String, username: String, password: String, email: String, address1: String, address2: String, city: String, state: String,zip: String, phone: String, credit_card_info: String,
                billing_info: String) {
        this._id = _id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.address1 = address1;
        this.address2 = address2;
        this.city = address2;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.credit_card_info = credit_card_info;
        this.billing_info = billing_info;
    }
}
