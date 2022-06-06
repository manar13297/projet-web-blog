var express = require('express');
var router = express.Router();

const comment = [
  {
    "id": 1,
    "name": "comment 1"
  },
  {
    "id": 2,
    "name": "comment 2"
  },
  {
    "id": 3,
    "name": "comment 3"
  },
  {
    "id": 4,
    "name": "comment 4"
  },
  {
    "id": 5,
    "name": "comment 5"
  },
  {
    "id": 6,
    "name": "comment 6"
  },
  {
    "id": 7,
    "name": "comment 7"
  },
  {
    "id": 8,
    "name": "categ 8"
  },
  {
    "id": 9,
    "name": "comment 9"
  },
  {
    "id": 10,
    "name": "comment 10"
  },
  
];
router.get('/', function(req, res) {
  let {skip , take} = req.query;
  skip = skip || 0
  take = take || 10
  c = [...comment];
res.send(c.splice(skip,take));
});

router.get('/:id', function(req, res) {
  const comment = comment.find((c)=>c.id===parseInt(req.params.id));  
  const r = comment?comment:'Not Found'
  res.send(r);
  });

  router.post('/', function(req, res) {
    res.send("post comment");
});

router.patch('/', function(req, res) {
    res.send("update comment");
});

router.delete('/:id', function(req, res) {
  res.send("supprimer comment "+req.params.id);
});
module.exports = router;