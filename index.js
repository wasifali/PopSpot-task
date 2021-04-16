require('dotenv').config()
const {getTx, submitProcessedTx} = require('./services/transaction.service');
// const {getExchangeRate} = require('./services/exchange.service');
const {processTx} = require('./services/txProcessor.service');

async function fetchProcessAndSubmit() {
    /** fetch tx*/
    const tx = await getTx();

    /** processing tx, to get exchange rate*/
    const _data = await processTx(tx.data);

    /** submit processed tx*/
    await submitProcessedTx(_data);
}

/** entry point */
async function main() {
    /** imitating api calls*/
    const iterations = process.env.TX_COUNT;

    /** promises to submit data */
    const calls = []
    for(let i = 0; i <iterations; i++) {
        calls.push(fetchProcessAndSubmit());
    }

    /** resolve all calls, NOTE: any failed call will fail the promise */
    await Promise.all(calls)
}

/** call main */
main()