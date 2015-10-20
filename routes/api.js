/*
 * Serve JSON to our AngularJS client
 */

// For a real app, you'd make database requests here.
// For this example, "data" acts like an in-memory "database"
var data = {
  "posts": [
    {
      "title": "This is proof that the api is working",
      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "title": "Sed egestas",
      "text": "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus."
    }
  ]
};

var hiw = require('hiw-api');
var apiKey = "da45e11d07eb4ec8950afe79a0d76feb";
var api = new hiw.API(apiKey);

// GET

exports.getIndicators = function(req,res) {
  var indicators = null;
  var indDescrip = null;
  var filter = new hiw.Filter().addEqual(hiw.Indicator.Fields.localeID, parseInt(req.body.localeid));
  hiw.Synchronizer.sync([
    hiw.Indicator.filter(filter, api, function(data, response, error) {
      indicators = data;
      console.log("This is the locale " + indicators);
    },1),
    hiw.IndicatorDescription.filter(filter2, api, function(descrips) {
      indDescrip = descrips;
    })
  ],function ()
  {
    res.json(indicators);
    console.log(req.body.localeid);
  } );

};

exports.posts = function (req, res) {
  var posts = [], i, post, text;
  var sexes;
    var indicatorDescriptions = null;
    var timeframes = null;
    var locales = null;
    var ages = null;


    for (i = 0; i < Math.min(data.posts.length, 5); i++) {
    post = data.posts[i];
    posts.push({
      id: i,
      title: post.title,
      text: post.text.substr(0, 50) + '...'
    });
  }
    hiw.Synchronizer.sync([
        hiw.Locale.getAll(api, function (data)  {
            locales = data;
          //console.log("This is the locale " + locales);

        }),
        hiw.Sex.getAll(api, function (data) {
            sexes = data;
        })],function () {
        var answer = {
          posts: posts,
          hiwdata: locales,
          gender: sexes
        };
                res.json(answer);


        });
};

exports.post = function (req, res) {
  var id = req.params.id;
  if (id >= 0 && id < data.posts.length) {
    res.json({
      post: data.posts[id]
    });
  } else {
    res.json(false);
  }
};

// POST

exports.editPost = function (req, res) {
  var id = req.body.id,
    title = req.body.title,
    text = req.body.text;

  if (id >= 0 && id < data.posts.length) {
    data.posts[id].title = title;
    data.posts[id].text = text;
    res.json(true);
  } else {
    res.json(false);
  }
};

exports.deletePost = function (req, res) {
  var id = req.body.id;

  if (id >= 0 && id < data.posts.length) {
    data.posts.splice(id, 1);
    res.json(true);
  } else {
    res.json(false);
  }
};

exports.addPost = function (req, res) {
  data.posts.push(req.body);
  res.json(req.body);
};