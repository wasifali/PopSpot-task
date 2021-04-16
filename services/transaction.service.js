const axios = require('axios')


function getTx() {
    return axios.get(`${process.env.TX_API}get-transaction`);
}

function submitProcessedTx(tx) {
    return axios.post(`${process.env.TX_API}process-transactions`, tx);
}

module.exports = {getTx, submitProcessedTx}