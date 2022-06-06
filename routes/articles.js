var express = require('express');
var router = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async function(req, res) {
  const articles = await prisma.article.findMany()
    let {skip , take} = req.query;
    skip = skip || 0
    take = take || 10
    a = [...articles];
  res.send(a.splice(skip,take));
});

router.get('/:id', async function(req, res) {
  const article = prisma.article.findUnique({
    where:{id:req.params.id},
  });  
  const r = article?article:'Not Found'
  res.send(r);
  });

  router.post('/', async function(req, res) {
    const article = await prisma.article.create({
      data:req.body,
    })
    res.send(article);
});

router.patch('/', async function(req, res) {
  const article = await prisma.article.update({
    where:{id:req.body.id},
    data:req.body,
  })
    res.send(article);
});

router.delete('/:id', async function(req, res) {
  const article = await prisma.article.delete({
    where:{id:parseInt(req.params.id)},
  })
  res.send(article);
});
module.exports = router;