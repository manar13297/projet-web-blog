var express = require('express');
var router = express.Router();

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async function(req, res) {
  const users = await prisma.utilisateur.findMany()
  let {skip , take} = req.query;
  skip = skip || 0
  take = take || 10
  u = [...users];
res.send(u.splice(skip,take));
});

router.get('/:id', async function(req, res) {
  const user = await prisma.utilisateur.findUnique({where:{"id":req.params.id}}) 
  //const r = user?user:'Not Found'
  res.send(user)
  });

  router.post('/', async function(req, res) {
    const user = await prisma.utilisateur.create({
      data:req.body,
    })
    res.send(user);
});

router.patch('/', async function(req, res) {
  const user = await prisma.utilisateur.update({
    where:{id:req.body.id},
    data:req.body,
  })
    res.send(user);
});

router.delete('/:id', async function(req, res) {
  const user = await prisma.utilisateur.delete({
    where:{id:parseInt(req.params.id)},
  })
  res.send(user);
});
module.exports = router;
