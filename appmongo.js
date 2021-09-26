
/*db.products.insertOne(
    {
        _id:3,
        name : "Vutter",
        price :34,
        stock : 100,
        review: [
            {
                Name: "Prajwal",
                rating : 4,
                review : "Nice"
            },
            {
                Name :"Raj",
                rating : 4.5,
                review : "Awesome"
            }
        ] 
    }
)*/


const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/fruitdb', {useNewUrlParser: true}, { useUnifiedTopology: true },{useCreateIndex: true})

const fruitSchema = new mongoose.Schema ({
   //Before
    //name : String,
    //rating : Number,
    //review : String 


    //After
    name : {
        type : String,
        required: true
    },
    rating : {
        type : Number,
        min : 1,
        max : 10
    },
    review : String
}) 

const Fruit = mongoose.model('Fruit', fruitSchema)

const fruit = new Fruit ({
    name :'Apple',
    rating : 8,
    
})


fruit.save()
//everrytime we run "fruit.save()" it will save the same const fruit we made above, so we comment it out.


//Now to create a new collection

const personSchema = new mongoose.Schema({
    name : String,
    age : Number,
    favouriteFruit : fruitSchema /* bt this we are telling mongoose that we are
    embedding a fruits document inside the property called favouritefruit, in our Person Collection */
})

const Person = mongoose.model('Person', personSchema)

  // now we can create a new fruit inside person schema
  const pineapple = new Fruit({
      name : "Pineapple",
      score : 9,
      review : "Great fruit"
  })
  pineapple.save()
const person = new Person({
    name :"AMmy",
    age : 10,
    favouriteFruit : pineapple
})
person.save();


// Reading from your Database with Mongoose
Fruit.find(function(err, fruits){
    if(err){
        console.log(err);
    }
    else{
        // Its a good practise to close the connection to our database once we are done.
        mongoose.connection.close()
        for(var i =0; i<fruits.length ; i++){
            r = fruits[i]
            console.log(r.name)

    }
    }
    
    
    
})
// Now , to UPDATE any data from dataset
//we go inside our fruit collection
/*Fruit.updateOne({_id : "61127b73c034960838b2b217"}, {review : "Nice one"}, function(err){
    if(err){
        
        console.log(err)
    }
    else {
        console.log("Successfully Executed")
    }
})*/


// Now to DELETE any data form dataset
Fruit.deleteOne({id : "61127b73c034960838b2b217"}, function(err){
    if(err){
        console.log(err)
    }
    else {
        console.log("Successfully Deleted")
    }
})

/*Person.deleteMany({name : "Prajwal"},function(err){
    if(err){
        console.log(err)
    }
    else {
        console.log("Whole Data delted")
    }
} )*/


//Establishing relationship and embedding documents with Mongoose