import { Messaging } from './services/messaging';
import { Order } from './entities/order';
import { Persistency } from './services/persistency';
import { ShoppingCart } from './entities/shopping-cart';
import { Product } from './entities/product';
import { PercentDiscount } from './usecases/discount-percent';

const discount = new PercentDiscount(0.1);
const shoppingCart = new ShoppingCart(discount);
const messaging = new Messaging();
const persistency = new Persistency();
const order = new Order(shoppingCart, shoppingCart, messaging, persistency);

const camiseta = new Product('Camiseta', 49.9);
const bermuda = new Product('Bermuda', 79);
const boné = new Product('Boné', 18.5);

shoppingCart.addItems(camiseta);
shoppingCart.addItems(bermuda);
shoppingCart.addItems(boné);

console.log(shoppingCart.getItems());
console.log(shoppingCart.total());
console.log(shoppingCart.totalWithDiscount());
order.checkout();
console.log(order.getOrderStatus());
