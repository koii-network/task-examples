const { Connection, PublicKey } = require("@_koi/web3.js");
const { TASK_ID } = require("./init");
async function main() {
  const connection = new Connection("https://testnet.koii.network/");
  const accountInfo = await connection.getAccountInfo(
    new PublicKey(TASK_ID)
  );
  console.log(JSON.parse(accountInfo.data + ""));
}
main();
