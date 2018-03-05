# Relative prices bot

## About the prices

All prices are expressed in US$. Some might be slightly outdated. I welcome any contributions to fix existing prices or add new items, just open a PR.

## Installation

To test the bot locally, you will need to uncomment the config import in index.js. You will also need a config.js file at the root the directory, using the following template :

```
module.exports = {
  consumer_key:         'XXX',
  consumer_secret:      'XXX',
  access_token:         'XXX',
  access_token_secret:  'XXX'
}
```

Fill in each section with your own keys/tokens (the last four are for the Twitter API).
For more information on the Twitter API, visit https://apps.twitter.com/app/new
