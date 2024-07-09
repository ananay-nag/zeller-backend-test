import { SKU, PricingRule } from "../types";
import { skuData } from "../data";


export const appleTVPriceValidate: PricingRule = (items) => {
    const atvCount = items.filter(item => item.code === 'atv').length;
    const discountedCount = Math.floor(atvCount / 3) * 2 + (atvCount % 3);
    return discountedCount * skuData['atv'].price;
};

export const superiPadPriceValidate: PricingRule = (items) => {
    const ipdCount = items.filter(item => item.code === 'ipd').length;
    const price = ipdCount > 4 ? 499.99 : skuData['ipd'].price;
    return ipdCount * price;
};

export class Checkout {
     items: SKU[] = new Array();
     pricingRules: Array<PricingRule>;

    constructor(pricingRules: PricingRule[]) {
        this.pricingRules = pricingRules;
    }


    scan(sku: string): void {
        const item = skuData[sku];
        if (item) {
            this.items.push(item);
        } else {
            console.log(`Item with SKU ${sku} not found.`);
        }
    }

    total(): number {
        let total = 0;
        for (const rule of this.pricingRules) {
            total += rule(this.items);
        }
        const remainingItems = this.items.filter(item =>
            !this.pricingRules.some(rule => rule([item]) > 0)
        );
        total += remainingItems.reduce((sum, item) => sum + item.price, 0);
        return total;
    }
}
