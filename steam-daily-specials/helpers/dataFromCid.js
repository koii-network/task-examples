require('dotenv').config();
const axios = require("axios");
const { Web3Storage } = require("web3.storage");
const storageClient = new Web3Storage({
    token: process.env.SECRET_WEB3_STORAGE_KEY,
  });

module.exports = async (cid) => {
  console.log("CID", cid);
  if (storageClient) {
    const res = await storageClient.get(cid);
    // console.log("RES", res);
    if (!res.ok) {
      // voting false, no value
      return false;
    } else {
      const file = await res.files();
      //console.log("FILE", file);
      //console.log("CID", file[0].cid);
      const url = `https://${file[0].cid}.ipfs.w3s.link/?filename=${file[0].name}`;
      console.log("URL", url);
      try {
        const output = await axios.get(url);
        return output;
      } catch (error) {
        console.log("ERROR", error);
      }
    }
  }
};
