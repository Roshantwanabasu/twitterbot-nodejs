const Twit = require("twit");

const twit = new Twit(require("./config.js"));

const hashtagSearch = { q: "#coding", count: 100, result_type: "recent" };

// This function finds the latest tweet with the MeetMaye hashtag and retweets.
const retweetLatest = async() => {
  try {
       twit.get("search/tweets", hashtagSearch, (error, data) => {
    if (error) {
      console.log(error.message);
    } else {
      const retweetId = data.statuses[0].id_str;
      twit.post("statuses/retweet/" + retweetId, {}, (error, response) => {
      
        if (error) {
          console.log(error.message);
        } else if (response) {
          console.log("Success! Retweeted!");
        }
      });
    }
  });
  } catch(error) {
    console.log(error)
  }
};

retweetLatest();
setInterval(retweetLatest, 1000 * 60 * 30);
