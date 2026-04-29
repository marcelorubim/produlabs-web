import { toDate, format } from "date-fns";


export default function(year){
    return [{
        name: 'Janeiro',
        value: 1,
        date: toDate(new Date(year, 0, 1, 0, 0, 0, 0)),
        isoDate: format(toDate(new Date(year, 0, 1, 0, 0, 0, 0)),'yyyyMMdd')
    }, {
        name: 'Fevereiro',
        value: 2,
        date: toDate(new Date(year, 1, 1, 0, 0, 0, 0)),
        isoDate: format(toDate(new Date(year, 1, 1, 0, 0, 0, 0)),'yyyyMMdd')
    }, {
        name: 'Março',
        value: 3,
        date: toDate(new Date(year, 2, 1, 0, 0, 0, 0)),
        isoDate: format(toDate(new Date(year, 2, 1, 0, 0, 0, 0)),'yyyyMMdd')
    }, {
        name: 'Abril',
        value: 4,
        date: toDate(new Date(year, 3, 1, 0, 0, 0, 0)),
        isoDate: format(toDate(new Date(year, 3, 1, 0, 0, 0, 0)),'yyyyMMdd')
    }, {
        name: 'Maio',
        value: 5,
        date: toDate(new Date(year, 4, 1, 0, 0, 0, 0)),
        isoDate: format(toDate(new Date(year, 4, 1, 0, 0, 0, 0)),'yyyyMMdd')
    }, {
        name: 'Junho',
        value: 6,
        date: toDate(new Date(year, 5, 1, 0, 0, 0, 0)),
        isoDate: format(toDate(new Date(year, 5, 1, 0, 0, 0, 0)),'yyyyMMdd')
    }, {
        name: 'Julho',
        value: 7,
        date: toDate(new Date(year, 6, 1, 0, 0, 0, 0)),
        isoDate: format(toDate(new Date(year, 6, 1, 0, 0, 0, 0)),'yyyyMMdd')
    }, {
        name: 'Agosto',
        value: 8,
        date: toDate(new Date(year, 7, 1, 0, 0, 0, 0)),
        isoDate: format(toDate(new Date(year, 7, 1, 0, 0, 0, 0)),'yyyyMMdd')
    }, {
        name: 'Setembro',
        value: 9,
        date: toDate(new Date(year, 8, 1, 0, 0, 0, 0)),
        isoDate: format(toDate(new Date(year, 8, 1, 0, 0, 0, 0)),'yyyyMMdd')
    }, {
        name: 'Outubro',
        value: 10,
        date: toDate(new Date(year, 9, 1, 0, 0, 0, 0)),
        isoDate: format(toDate(new Date(year, 9, 1, 0, 0, 0, 0)),'yyyyMMdd')
    }, {
        name: 'Novembro',
        value: 11,
        date: toDate(new Date(year, 10, 1, 0, 0, 0, 0)),
        isoDate: format(toDate(new Date(year, 10, 1, 0, 0, 0, 0)),'yyyyMMdd')
    }, {
        name: 'Dezembro',
        value: 12,
        date: toDate(new Date(year, 11, 1, 0, 0, 0, 0)),
        isoDate: format(toDate(new Date(year, 11, 1, 0, 0, 0, 0)),'yyyyMMdd')
    }]
} 