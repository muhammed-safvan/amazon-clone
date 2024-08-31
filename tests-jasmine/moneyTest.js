import { convertMoney } from "../scripts/utils/money.js";


describe('test suit : convertMoney',()=>{
    it('convert cents into dollar',()=>{
        expect(convertMoney(2095)).toEqual('20.95');
    });

    it('work with 0',()=>{
        expect(convertMoney(0)).toEqual('0.00');
    });

    it('round to nearest cents',()=>{
        expect(convertMoney(2000.5)).toEqual('20.01');
    })
});