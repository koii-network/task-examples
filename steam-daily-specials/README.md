# Koii Task - Steam Daily Special

This task scrape steam daily special games and submit the special games to IPFS and the cid of the special is submitted to K2.
## Requirements

- [Node >=16.0.0](https://nodejs.org)

## What's in the task?

- `special_task.js` - This is the main task file. It contains the code for scraping the special games and submitting it to IPFS and K2.
- `special_submit.js` - This file contains the code that use cid of steam special games generate the signatuer, then create a new node_proof, upload to IPFS and use proof_cid as the submission value.
- `special_audit.js` - This file contains function that check if signature is true and avaliable of special. Next return the value of vote.
- `db.js` - This file contains the code for connecting to the database.
- It also include GET endpoint `/getSpecialList` to get the list of specials submitted to K2.

## How to run the task?

- Download desktop node from [here](https://www.koii.network/node?promo=F973BD738033). 
- Run the steam special task from the desktop node.

## How to run the task locally?

To run and test this task locally:
- Clone this repository.
- Run `yarn install` to install all the dependencies.
- Run `yarn test` to start the task.

## What's the reward distribution rule?

Bounty will be distributed to people who submit the daily specials games to IPFS and the cid of the special is submitted to K2. The bounty per round is 1 KOII.

## How to submit the specials to IPFS?

When you run the task, desktop node will ask you insert your web3.storage key. Check the tutorial [here](https://blog.koii.network/Introduce-web3-storage/)

