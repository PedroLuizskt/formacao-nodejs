// ✅ -> adicionar item no carrinho com inteligência (soma quantidade se já existir)
async function addItem(userCart, item) {
  const indexFound = userCart.findIndex((p) => p.name === item.name);
  
  if (indexFound !== -1) {
    userCart[indexFound].quantity += item.quantity;
  } else {
    userCart.push(item);
  }
}

// -> deletar item do carrinho (remove a linha inteira)
async function deleteItem(userCart, name) {
  const index = userCart.findIndex((item) => item.name === name);

  if (index !== -1) {
    userCart.splice(index, 1);
  }
}

// -> ✅ remover um item - diminui um item por vez
async function removeItem(userCart, item) {
  const indexFound = userCart.findIndex((p) => p.name === item.name);

  if (indexFound === -1) {
    console.log("⚠️ Item não encontrado.");
    return;
  }

  if (userCart[indexFound].quantity > 1) {
    userCart[indexFound].quantity -= 1;
  } else {
    userCart.splice(indexFound, 1);
  }
}

// ✅ mostra todos os items do carrinho
async function displaycart(userCart) {
  console.log("\n🛒 Shopee Cart List:");
  console.log("---------------------------------");
  userCart.forEach((item, index) => {
    console.log(
      `${index + 1}. ${item.name} - R$ ${item.price.toFixed(2)} | ${
        item.quantity
      }x | Subtotal = R$ ${item.subtotal().toFixed(2)}`
    );
  });
  console.log("---------------------------------");
}

// ✅ -> calcular o total do carrinho
async function calculateTotal(userCart) {
  const result = userCart.reduce((total, item) => total + item.subtotal(), 0);
  console.log(`\n🛍️  TOTAL DA COMPRA: R$ ${result.toFixed(2)}`);
  
  if(result > 0) {
    console.log("🎟️  Cupom de Frete Grátis aplicado!");
  }
}

export { addItem, calculateTotal, deleteItem, removeItem, displaycart };
