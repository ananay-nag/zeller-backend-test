import { Checkout, appleTVPriceValidate, superiPadPriceValidate } from './src/app/Checkout';

describe('Checkout System', () => {
    it('should apply 3-for-2 deal on Apple TVs', () => {
        const test1 = new Checkout([appleTVPriceValidate, superiPadPriceValidate]);
        test1.scan('atv');
        test1.scan('atv');
        test1.scan('atv');
        test1.scan('vga');
        expect(test1.total()).toBeCloseTo(249.00, 2);
    });

    it('should apply bulk discount on Super iPads', () => {
        const test2 = new Checkout([appleTVPriceValidate, superiPadPriceValidate]);
        test2.scan('atv');
        test2.scan('ipd');
        test2.scan('ipd');
        test2.scan('atv');
        test2.scan('ipd');
        test2.scan('ipd');
        test2.scan('ipd');
        expect(test2.total()).toBeCloseTo(2718.95, 2);
    });

    it('should not apply bulk discount for less than 5 Super iPads', () => {
        const test3 = new Checkout([appleTVPriceValidate, superiPadPriceValidate]);
        test3.scan('ipd');
        test3.scan('ipd');
        test3.scan('ipd');
        test3.scan('ipd');
        expect(test3.total()).toBeCloseTo(549.99 * 4, 2);
    });

    it('should handle mixed items with no discounts', () => {
        const test4 = new Checkout([appleTVPriceValidate, superiPadPriceValidate]);
        test4.scan('mbp');
        test4.scan('vga');
        expect(test4.total()).toBeCloseTo(1399.99 + 30.00, 2);
    });

    it('should handle empty checkout', () => {
        const test5 = new Checkout([appleTVPriceValidate, superiPadPriceValidate]);
        expect(test5.total()).toBeCloseTo(0.00, 2);
    });

    it('should return correct total with only Apple TV discount', () => {
        const test6 = new Checkout([appleTVPriceValidate]);
        test6.scan('atv');
        test6.scan('atv');
        test6.scan('atv');
        test6.scan('atv');
        expect(test6.total()).toBeCloseTo(3 * 109.50, 2);
    });

    it('should return correct total with only iPad discount', () => {
        const test7 = new Checkout([superiPadPriceValidate]);
        test7.scan('ipd');
        test7.scan('ipd');
        test7.scan('ipd');
        test7.scan('ipd');
        test7.scan('ipd');
        expect(test7.total()).toBeCloseTo(499.99 * 5, 2);
    });
});
