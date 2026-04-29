import numeral from 'numeral';
import { format } from 'date-fns';

numeral.register('locale', 'pt-BR', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    ordinal : function (number) {
        return number === 1 ? 'er' : 'ème';
    },
    currency: {
        symbol: 'R$'
    }
});
numeral.locale('pt-BR');

numeral.defaultFormat('0,00');

export default (number) => numeral(number).format()