var express = require('express');
var router = express.Router();

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async function(req, res) {
  const comment = await prisma.commentaire.findMany()
  let {skip , take} = req.query;
  skip = skip || 0
  take = take || 10
  c = [...comment];
res.send(c.splice(skip,take));
});

router.get('/:id', async function(req, res) {
  const comment = await prisma.commentaire.findUnique({
    where:{id:req.params.id}
  }) 
  const r = comment?comment:'Not Found'
  res.send(r);
  });

router.post('/', async function(req, res) {
  const comment = await prisma.commentaire.create({
    data:req.body,
  })
    res.send(comment);
});

router.patch('/', async function(req, res) {
  const comment = await prisma.commentaire.update({
    where:{id:req.body.id},
    data:req.body,
  })
    res.send(comment);
});

router.delete('/:id', async function(req, res) {
  const comment = await prisma.commentaire.delete({
    where:{id:parseInt(req.params.id)},
  })
  res.send(comment);
});
module.exports = router;