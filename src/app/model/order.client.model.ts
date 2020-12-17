export class Dish {
  dish: String;
  price: Number;
  quantity: Number;
  constructor(dish: String, price: Number, quantity: Number) {
    this.dish = dish;
    this.price = price;
    this.quantity = quantity;
  }
}

export class Order {
  _id: String;
  user: String;
  userId: String;
  restaurantId: String;
  deliverId: String;
  time: Date;
  status: Number; // 0 for not check out, 1 for not finished by the restaurant, 2 for finished.
  dishes: Dish[];
  total: Number;
  address1: String;
  address2: String;
  city: String;
  state: String;
  zip: String;
  phone: String;

  constructor(user: String, userId: String, restaurantId: String, status: Number, dishes: Dish[], total: Number, address1: String, address2: String, city: String, state: String, zip: String, phone: String) {
    this.user = user;
    this.userId = userId;
    this.restaurantId = restaurantId;
    this.status = status;
    this.dishes = dishes;
    this.total = total;
    this.deliverId = null;
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.state = state;
    this.zip = zip;
    this.phone = phone;
  }
}

