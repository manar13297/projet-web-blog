var express = require('express');
var router = express.Router();
const articles = [
  {
    "id": 1,
    "name": "article 1"
  },
  {
    "id": 2,
    "name": "article 2"
  },
  {
    "id": 3,
    "name": "article 3"
  },
  {
    "id": 4,
    "name": "article 4"
  },
  {
    "id": 5,
    "name": "article 5"
  },
  {
    "id": 6,
    "name": "article 6"
  },
  {
    "id": 7,
    "name": "article 7"
  },
  {
    "id": 8,
    "name": "article 8"
  },
  {
    "id": 9,
    "name": "article 9"
  },
  {
    "id": 10,
    "name": "article 10"
  },
  
];
router.get('/', function(req, res) {
    let {skip , take} = req.query;
    skip = skip || 0
    take = take || 10
    a = [...articles];
  res.send(a.splice(skip,take));
});

router.get('/:id', function(req, res) {
  const article = articles.find((u)=>u.id===parseInt(req.params.id));  
  const r = article?article:'Not Found'
  res.send(r);
  });

router.post('/', function(req, res) {
    res.send("post article");
});

router.patch('/', function(req, res) {
    res.send("update article");
});

router.delete('/:id', function(req, res) {
    res.send("supprimer article "+req.params.id);
});

module.exports = router;