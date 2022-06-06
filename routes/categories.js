var express = require('express');
var router = express.Router();

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async function(req, res) {
  const categ = await prisma.categorie.findMany()
  let {skip , take} = req.query;
  skip = skip || 0
  take = take || 10
  c = [...categ];
res.send(c.splice(skip,take));
});

router.get('/:id', async function(req, res) {
  const categ =  await prisma.categorie.findUnique({
    where:{id:req.params.id},
  })
  const r = categ?categ:'Not Found'
  res.send(r);
  });

router.post('/', async function(req, res) {
    const categorie = await prisma.categorie.create({
      data:req.body,
    })
    res.send(categorie);
});

router.patch('/', async function(req, res) {
  const categorie = await prisma.categorie.update({
    where:{id:req.body.id},
    data:req.body,
  })
    res.send(categorie);
});

router.delete('/:id', async function(req, res) {
  const categorie = await prisma.categorie.delete({
    where:{id:parseInt(req.params.id)},
  })
  res.send(categorie);
});
module.exports = router;