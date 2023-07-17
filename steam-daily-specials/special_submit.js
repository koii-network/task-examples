/**
 * 1. Fetch the cid from the database
 * 2. If the cid is not present in the database in this round, then return null
 * 3. If the cid is present in the database in this round, then return the cid
 * 4. signpayload with the cid
 * 5. submission contains the cid, nodePublicKey and signature
 */
require('dotenv').config();
const db = require('./db');
const { Web3Storage, File } = require('web3.storage');
const storageClient = new Web3Storage({
  token: process.env.SECRET_WEB3_STORAGE_KEY,
});
const { namespaceWrapper } = require('./namespaceWrapper');

const submit = async round => {

  const cid = await db.getSpecial(round); // retrieves the cid
  console.log('Found CID in round ', round, cid);
  const signature = await namespaceWrapper.payloadSigning(cid);

  const submissionValue = {
    steam_special: cid,
    nodePublicKey: await namespaceWrapper.getMainAccountPubkey(),
    signature: signature,
  };

  const filename = `steam-special-proof-${round}.json`;
  const file = new File([JSON.stringify(submissionValue)], filename, {
    type: 'application/json',
    });

  const proof_cid = await storageClient.put([file]);
  console.log(`Uploaded and got proof_cid: ${proof_cid}`);

  return proof_cid;
};

module.exports = {
    submit,
};