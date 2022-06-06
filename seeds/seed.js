const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const faker = require('@faker-js/faker')
async function main() {
    await prisma.utilisateur.deleteMany()
    await prisma.categorie.deleteMany()
    await prisma.article.deleteMany()
    await prisma.article_categ.deleteMany()
    await prisma.commentaire.deleteMany()

    for(let i=0 ; i<9 ; i++){
        await prisma.utilisateur.create({
            data:{
                "nom":faker.faker.name.firstName(),
                "email":faker.faker.internet.email(),
                "password":faker.faker.internet.password(),
                "role":"AUTHOR"
            },
        })
    }
    await prisma.utilisateur.create({
        data:{
            "nom":faker.faker.name.firstName(),
            "email":faker.faker.internet.email(),
            "password":faker.faker.internet.password(),
            "role":"ADMIN"
        },
    })
    for(let i=0;i<9 ; i++){
        await prisma.categorie.create({
            data:{
                nom:faker.faker.random.word()
            },
        })
    }
    for(let i=0;i<99 ; i++){
        await prisma.article.create({
            data:{
                "titre":faker.faker.random.words(10),
                "contenu":faker.faker.lorem(),
                "image":faker.faker.image.business(1200,2300),
                "createdAt":faker.faker.date(),
                "updatedAt":faker.faker.date(),
                "published":faker.faker.datatype.number({
                    'min':0,
                    'max':1
                }),
                "id_user":faker.faker.datatype.number({
                    'min':2,
                    'max':10
                })


            },
        });

        await prisma.article_categ.create({
            data:{
                "id_article":faker.faker.datatype.number({
                    'min':1,
                    'max':100
                }),
                "id_categ":faker.faker.datatype.number({
                    'min':1,
                    'max':10
                })
    
            },
        })

    }

    for(let i=1;i<=100;i++){
        await prisma.commentaire.create({
            data:{
                "email":faker.faker.internet.email(),
                "contenu":faker.faker.random.lorem(),
                "id_article":{i}
            },
        })
    }

}

main().catch(e=>{
    console.error(e);
    process.exit(1);
}).finally(async()=>{
    await prisma.$disconnect();
})