import { Checkout, appleTVPriceValidate, superiPadPriceValidate } from "./app/Checkout";


// Method One
const checkoutOne = new Checkout([appleTVPriceValidate, superiPadPriceValidate]);
let itemList = ['atv','atv','atv','vga'];
itemList.map((item)=>{
    checkoutOne.scan(item);
})
console.log(`Total expected: $${checkoutOne.total().toFixed(2)}`); 
// Total expected: $249.00




// Method Two
const checkoutTwo = new Checkout([appleTVPriceValidate, superiPadPriceValidate]);
checkoutTwo.scan('atv');
checkoutTwo.scan('ipd');
checkoutTwo.scan('atv');
checkoutTwo.scan('ipd');
checkoutTwo.scan('ipd');
checkoutTwo.scan('ipd');
checkoutTwo.scan('ipd');
console.log(`Total expected: $${checkoutTwo.total().toFixed(2)}`); 
// Total expected: $2718.95


// Method Three
const checkoutThree = new Checkout([appleTVPriceValidate, superiPadPriceValidate]);
checkoutThree.scan('atv');
console.log(`Total expected: $${checkoutThree.total().toFixed(2)}`); 