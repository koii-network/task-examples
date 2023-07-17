require('dotenv').config();
const PCR = require('puppeteer-chromium-resolver');
const axios = require('axios');
const { Web3Storage, File } = require('web3.storage');
const storageClient = new Web3Storage({
  token: process.env.SECRET_WEB3_STORAGE_KEY,
});

const main = async () => {
  try {
    const options = {};
    const stats = await PCR(options);

    const browser = await stats.puppeteer.launch({
      headless: 'new',
      executablePath: stats.executablePath,
    });
    const page = await browser.newPage();
    await page.goto('https://store.steampowered.com/');

    const gameSales = await page.evaluate(() => {
      const salesList = Array.from(
        document.querySelectorAll('#tab_specials_content .tab_item'),
      );
      return salesList.map(sale => {
        const name = sale.querySelector('.tab_item_name').innerText;
        const originalPrice = sale.querySelector('.discount_original_price')
          ? sale.querySelector('.discount_original_price').innerText
          : 'N/A';
        const finalPrice = sale.querySelector('.discount_final_price')
          ? sale.querySelector('.discount_final_price').innerText
          : 'N/A';
        const topTags = Array.from(sale.querySelectorAll('.top_tag')).map(
          tag => tag.innerText,
        );
        return {
          name,
          originalPrice,
          finalPrice,
          topTags,
        };
      });
    });

    await browser.close();

    console.log('Checking special games...', gameSales);

    const date = new Date().toISOString().slice(0, 10);
    const filename = `steam-daily-special-${date}.json`;

    // Uploading the image to IPFS
    const gameSalesJson = JSON.stringify(gameSales);
    const file = new File([gameSalesJson], filename, {
      type: 'application/json',
    });

    const cid = await storageClient.put([file]);
    console.log(`Uploaded and got CID: ${cid}`);

    return cid;
  } catch (err) {
    console.log('ERROR IN TASK', err);
    return null;
  }
};

module.exports = { main };
