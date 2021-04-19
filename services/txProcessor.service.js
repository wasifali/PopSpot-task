const moment = require('moment');
const {getExchangeRate} = require('./exchange.service');

function parseTx(data) {
    const quoteCurrency = data.exchangeUrl
        .split('&')
        .find(param => param.includes('base')).split('=')[1];
    const exchangeUrl = data.exchangeUrl.replace('Y-MM-DD', moment().subtract(1, 'days').format('YYYY-MM-DD')).replace('{ACCESS_KEY}', process.env.EXCHANGE_API_KEY)
    return {...data, exchangeUrl, baseCurrency: data.currency, amount: data.amount, quoteCurrency}
}

async function processTx(data) {
    const _data = parseTx(data);
    const rate = await getExchangeRate(_data.baseCurrency, _data.quoteCurrency, moment().format('YYYY-MM-DD'), _data.exchangeUrl);
    return {..._data, converted: rate * _data.amount}
}

module.exports = {processTx}
