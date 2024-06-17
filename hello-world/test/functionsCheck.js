const dotenv = require('dotenv');
require('dotenv').config();
const { coreLogic } = require('../coreLogic');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function executeTasks() {
    for (let i = 0; i < 10; i++) {
        let delay = 60000;
        let round = i;
        await coreLogic.task(round);
        await coreLogic.submitTask(round);
        await coreLogic.auditTask(round);
        
        await sleep(delay);

        console.log('stopping searcher at round', round);
    }
}

executeTasks();
