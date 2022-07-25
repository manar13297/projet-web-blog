const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {faker} = require('@faker-js/faker')
const NbrAuthors = 10
const NbrArticles = 100
const NbrCateg = 10
const boolean = [true,false]

const AdminUser = {
    "id":10,
    "nom":faker.name.firstName(),
    "email":faker.internet.email(),
    "password":faker.internet.password(),
    "role":"ADMIN",
}

const AuthorUsers = Array.from({length:NbrAuthors}).map((val,idx) =>({
    "id":idx,
    "nom":faker.name.firstName(),
    "email":faker.internet.email(),
    "password":faker.internet.password(),
    "role":"AUTHOR",   
}))


const Categories = Array.from({length:NbrCateg}).map((val , i) =>({
    "id":i,
    "nom":faker.random.word(),
})
)
const Articles = Array.from({length:NbrArticles}).map((val,idx) =>({
    "id":idx,
    "titre":faker.random.words(5),
    "contenu":faker.lorem.paragraphs(5,'<br/>\n'),
    "image":faker.image.business(1200,2300),
    "createdAt":faker.date.past(),
    "updatedAt":faker.date.recent(),
    "published":boolean[Math.floor(Math.random() * 2)],
    "id_user":Math.floor(Math.random() * 10),
}))

async function CreateComments(NbrComments){
    //Create from 0 to n comments for articles
    var j = 0;
    var i=0;
while(i<NbrArticles){
    const comments = Array.from({length:1+Math.floor(Math.random()*NbrComments)})
    .map(()=>({
        "id":j++,
        "email":faker.internet.email(),
        "contenu":faker.lorem.paragraph(),
        "id_article":i,
    }))
    console.log()
    await prisma.commentaire.createMany({data:comments})
    i++

}
}

async function CreateArticleCateg(NbrArCat){
    var id_categ_manager = []
    var arCat = []
    if(NbrArCat>NbrCateg){console.log('Attention! Nbr Categories = ', NbrCateg)}
    else{
        var j = 0;

        while(j<NbrArticles){
            for(i=0;i<1+Math.floor(Math.random() * NbrArCat);i++){
                value = Math.floor(Math.random()*NbrCateg)
                while(id_categ_manager.includes(value))
                    value = Math.floor(Math.random()*NbrCateg)
                id_categ_manager.push(value);
                arCat.push({
                    id_article: j,
                    id_categ: value
                
                 })
        }
            await prisma.article_categ.createMany({data:arCat,})
            arCat = []
            id_categ_manager = []
            j++

    
        }
    }
   
}
async function main() {
    await prisma.utilisateur.deleteMany()
    await prisma.categorie.deleteMany()
    await prisma.article.deleteMany()
    await prisma.article_categ.deleteMany()
    await prisma.commentaire.deleteMany()
    await prisma.utilisateur.createMany({data:AuthorUsers,})
    await prisma.utilisateur.create({ data:AdminUser, })
    await prisma.article.createMany({data:Articles,})

    await prisma.categorie.createMany({data:Categories,})

CreateArticleCateg(4)
CreateComments(20);

}
main()
    .catch(
        (e)=>{
            console.log(e);
            process.exit(1);
        }
    )
    .finally(
        async ()=>{
            await prisma.$disconnect();
        }
    )

