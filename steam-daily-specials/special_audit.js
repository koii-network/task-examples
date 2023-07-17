require('dotenv').config();
const dataFromCid = require('./helpers/dataFromCid');
const {namespaceWrapper} = require('./namespaceWrapper');

const audit = async (submission) => {
    const outputraw = await dataFromCid(submission);
    if (!outputraw) {
        console.log('VOTE FALSE');
        console.log('SLASH VOTE DUE TO FAKE VALUE');
        return false;
    }
    const output = outputraw.data;
    console.log('OUTPUT', output);
    const { steam_special, nodePublicKey, signature } = output;
    const voteResp = await namespaceWrapper.verifySignature(signature, nodePublicKey);
    const cleanVoteRespData = voteResp.data.replace(/"/g, '');
    if (!voteResp || cleanVoteRespData !== steam_special) {
        console.log('VOTE FALSE');
        console.log('SLASH VOTE DUE TO DATA MISMATCH');
        return false;
    }
    const steam_special_resp = await dataFromCid(steam_special);
    if (!steam_special_resp) {
        console.log('VOTE FALSE');
        console.log('SLASH VOTE DUE TO FAKE STEAM special');
        return false;
    }
    // Check if the steam special is valid
    // If format of steam_special_resp.data is image, return true
    // Else return false
    if (!typeof steam_special_resp.data === 'json') {
        console.log('VOTE FALSE');
        console.log('SLASH VOTE DUE TO FAKE STEAM special');
        return false;
    }
    console.log('VOTE TRUE');
    return true;
};

module.exports = {
    audit,
};