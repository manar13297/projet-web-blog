var express = require('express');
var router = express.Router();
const categ = [
  {
    "id": 1,
    "name": "categ 1"
  },
  {
    "id": 2,
    "name": "categ 2"
  },
  {
    "id": 3,
    "name": "categ 3"
  },
  {
    "id": 4,
    "name": "categ 4"
  },
  {
    "id": 5,
    "name": "categ 5"
  },
  {
    "id": 6,
    "name": "categ 6"
  },
  {
    "id": 7,
    "name": "categ 7"
  },
  {
    "id": 8,
    "name": "categ 8"
  },
  {
    "id": 9,
    "name": "categ 9"
  },
  {
    "id": 10,
    "name": "categ 10"
  },
  
];
router.get('/', function(req, res) {
  let {skip , take} = req.query;
  skip = skip || 0
  take = take || 10
  c = [...categ];
res.send(c.splice(skip,take));
});

router.get('/:id', function(req, res) {
  const categ = categ.find((c)=>c.id===parseInt(req.params.id));  
  const r = categ?categ:'Not Found'
  res.send(r);
  });

router.post('/', function(req, res) {
    res.send("post categ");
});

router.patch('/', function(req, res) {
    res.send("update categ");
});

router.delete('/:id', function(req, res) {
  res.send("supprimer categorie "+req.params.id);
});

module.exports = router;