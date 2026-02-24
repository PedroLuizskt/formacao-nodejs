// CASOS DE USO DOS ITENS
async function createItem(name, price, quantity) {
  return {
    name,
    price,
    quantity,
    // Correção: usando 'this' para garantir que calcule com a quantidade atualizada
    subtotal: function () {
      return this.price * this.quantity;
    },
  };
}

export default createItem;
