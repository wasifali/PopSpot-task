const axios = require('axios')
// const {exchange} = require('../cache/exhange.cache')
axios.create(process.env.ECHANGE_API);

/**
 * @type {{"2021-04-05": {AED: {EUR: number}}}}
 */
const exchange = {
    "2021-04-05": {
        "AED": {"EUR": 1.56666}
    }
}


/**
 * @param baseCurrency
 * @param quoteCurrency
 * @param date
 * @param exchangeUrl api url from where get the exchange rate, this url comes with tx payload
 */
async function getExchangeRate(baseCurrency, quoteCurrency, date, exchangeUrl) {
    /** get current day conversion rate from file */
    if( exchange[date] &&
        exchange[date][baseCurrency] &&
        exchange[date][baseCurrency][quoteCurrency]) return exchange[date][baseCurrency][quoteCurrency].toFixed(4);

    /** *if not found in file, get from api*, and cache it in file */
    const _data = await axios.get(exchangeUrl);

    /** save data into cache */
    exchange[date] = {...exchange[date], [baseCurrency]: _data.data.rates};

    return exchange[date][baseCurrency][quoteCurrency];

}

module.exports = {getExchangeRate}