import * as cartService from "./services/cart.js";
import createItem from "./services/item.js";

const myCart = [];

console.log("🛍️  Welcome to your Shopee Cart!");

// Criando itens
const item1 = await createItem("hotwheels ferrari", 20.99, 1);
const item2 = await createItem("hotwheels lamborghini", 39.99, 3);
const item3 = await createItem("pneu reserva", 5.50, 2);

// Adicionando itens ao carrinho
await cartService.addItem(myCart, item1);
await cartService.addItem(myCart, item2);
await cartService.addItem(myCart, item3);

// Testando a atualização de quantidade no addItem
const item1Extra = await createItem("hotwheels ferrari", 20.99, 2);
await cartService.addItem(myCart, item1Extra); // O carrinho deve ter 3 ferraris agora

// Removendo quantidades (Lamborghini vai de 3 para 1)
await cartService.removeItem(myCart, item2);
await cartService.removeItem(myCart, item2);

// Deletando um item inteiro da lista
await cartService.deleteItem(myCart, item3.name);

// Exibindo o resultado final
await cartService.displaycart(myCart);
await cartService.calculateTotal(myCart);
