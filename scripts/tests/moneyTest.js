import { convertMoney } from "../scripts/utils/money.js";


console.log('test suit : convertMoney');


console.log('conver cents into dollar');

if (convertMoney(2095)==='20.95'){
    console.log('passed');
}else{
    console.log('failed');
}


console.log('work with 0');

if(convertMoney(0)==='0.00'){
    console.log('passed');
}else{
    console.log('failed');
}


console.log('roud to the nearest cents');

if(convertMoney(2000.5)==='20.01'){
    console.log('passed');
}else{
    console.log('failed');
}
