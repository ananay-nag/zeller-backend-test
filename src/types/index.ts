export interface SKU {
    code: string;
    name: string;
    price: number;
}

export type PricingRule = (items: SKU[]) => number;

export interface SKUTable { 
    [code: string]: SKU 
}