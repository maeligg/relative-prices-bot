const Twit = require('twit');
const prices = require('./prices.json');

// Uncomment these lines if running locally (see readme for more details)
// const config = require('./config.js');
// process.env = config;

const T = new Twit({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token: process.env.access_token,
  access_token_secret: process.env.access_token_secret,
});

let selectedItemA;
let selectedItemB;

const pickRandomItem = () => {
  const keys = Object.keys(prices);
  return keys[Math.floor(Math.random() * keys.length)];
};

const stringToNumber = stringNumber => parseFloat(stringNumber.replace(/,/g, ''));

const formatNumber = (number) => {
  const string = number.toString();

  const formattedString = string.replace(/(\d)(?=(\d{3})+$)/g, '$1,');

  return formattedString;
};

const comparePrices = () => {
  const itemA = pickRandomItem();
  let itemB;

  // If the price of itemA is too low, we will never find a match
  if (stringToNumber(prices[itemA].price) < 5) {
    comparePrices();
  }

  // We need to make sure the price different between the two items goes in the right direction and is big enough
  while (
    itemB === undefined ||
    stringToNumber(prices[itemA].price) / stringToNumber(prices[itemB].price) < 2
  ) {
    itemB = pickRandomItem();
  }

  selectedItemA = itemA;
  selectedItemB = itemB;
};

// Build and post the tweet
const tweet = () => {
  comparePrices();
  const ratio = formatNumber(Math.floor(stringToNumber(prices[selectedItemA].price) / stringToNumber(prices[selectedItemB].price)));
  const tweetText = `With ${selectedItemA}, you could buy ${ratio} ${
    prices[selectedItemB].plural
  }.`;

  T.post('statuses/update', { status: tweetText }, (postErr, postData) => {
    if (postErr) {
      console.log('error: ', postErr);
      tweet(); // Probably a duplicate status, try tweeting again
    } else {
      console.log('response: ', postData);
    }
  });
};

tweet();

setInterval(tweet, 1000 * 60 * 60 * 3); // tweets every 3 hours
