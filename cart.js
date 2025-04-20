const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  if(cartItems.length > 0){ 
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be <
      total += cartItems[i].price;           // Bug: cartItems[i] is undefined on the last iteration  
                                             //(Solution while  iteration on cartItems ,iteration should be less than cartItems.length 
    }
  }
  else{
       throw new Error("Cart is Empty")
  }
  return total;
}

function applyDiscount(total, discountRate) {
   
    if (!isNaN(total) && total > 0 && !isNaN(discountRate) && discountRate > 0 && discountRate < 1) {
     
       return total - (total * discountRate); // Bug: Missing validation for discountRate and total .. 
                                              // Solution : Add validation for total and dsiscountRate
    }
    else {
        
        throw new Error("Invalid Discount Rate");
   }
}

function generateReceipt(cartItems, total) {
    let receipt = "Items:\n";
    
    if (!isNaN(total)) {
        cartItems.forEach(item => {                          
        receipt += `${item.name}: $${item.price.toFixed(2)}\n`;
        });
        receipt += `Total: $${total.toFixed(2)}`;
    } else {
        throw new Error("Total is invalid");
    }
    console.log(receipt);
    return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
let proposedDiscount = 0.2;


try {
    const total = calculateTotal(cart);
    
    const discountedTotal = applyDiscount(total, proposedDiscount); // 20% discount
    
    const receipt = generateReceipt(cart, discountedTotal);
 
    if (typeof document !== 'undefined') {                               // [Bug #4] DOM access without checking if 'document' exists (caused issues outside browser environments)
                                                                        // Solution: Wrapped DOM access in if (typeof document !== 'undefined') { ... }
                                                                       // Debug Tool Used: Console error in Node environment showed "document is not defined"
      document.getElementById("total").textContent = `Total: $${discountedTotal.toFixed(2)}`;
      document.getElementById("receipt").textContent = receipt;
    }

}

catch (e) {
    console.error(e.message);           //  Old: console.error(e.Message);
                                       // Solution: Changed to e.message (JavaScript uses lowercase 'message')
}


