require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');



/**
 * Get  /
 * Homepage
 */

exports.homepage = async(req, res) => {
    try {

        const limitNumber = 2;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        // const thai = await Recipe.find({ 'category': 'Thai' }).limit(limitNumber);
        // const american = await Recipe.find({ 'category': 'American' }).limit(limitNumber);
        // const african = await Recipe.find({ 'category': 'African' }).limit(limitNumber);
        const vegan = await Recipe.find({ 'category': 'Vegan' }).limit(limitNumber);
        const nonVegan = await Recipe.find({ 'category': 'Non-Vegan' }).limit(limitNumber);
        
        const food = { latest, vegan, nonVegan} ;

        // const food = { latest, thai, american, african, indian, mexican} ;


        res.render('index', { title: 'Cooking Blog - Homepage', categories, food });      
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occured"});       
    }
}



/**
 * Get  /categories
 * Categories
 */

exports.exploreCategories = async(req, res) => {
    try {

        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', { title: 'Cooking Blog - Categories', categories });      
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occured"});       
    }
}


/**
 * Get  /categories/id
 * Categories By Id
 */

exports.exploreCategoriesById = async(req, res) => {
    try {

        let categoryId = req.params.id;

        const limitNumber = 20;
        const categoryById = await Recipe.find({'category': categoryId }).limit(limitNumber);
        res.render('categories', { title: 'Cooking Blog - Categories', categoryById });      
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occured"});       
    }
}




/**
 * post  /Search
 * Search
 */

exports.searchRecipe = async(req, res) => {
    try {

        let searchTerm = req.body.searchTerm;

        let recipe = await Recipe.find({$text: { $search: searchTerm, $diacriticSensitive: true} });
        res.render('search', { title: 'Cooking Blog - Search', recipe });  
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occured"});       
    }   
}




/**
 * Get  /recipe/:id
 * Recipe
 */

exports.exploreRecipe = async(req, res) => {
    try {
        let recipeId = req.params.id;

        const recipe = await Recipe.findById(recipeId);
        res.render('recipe', { title: 'Cooking Blog - Recipes', recipe });      
    } catch (error) {
        res.status(500).send({ message: error.message || "Error occured"});       
    }
}


/**
 * Get  /Submit-recipe
 * submitRecipe
 */

exports.submitRecipe = async(req, res) => {
    const infoErrorsObj = req.flash('inforErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recipe', { title: 'Cooking Blog - Submit Recipe', infoErrorsObj,  infoSubmitObj });   
}


/**
 * Post  /Submit-recipe
 * submitRecipe
 */

exports.submitRecipeOnPost = async(req, res) => {
    try {

        // const newRecipe = new Recipe({
        //     name: ' New Jollof Rice',
        //     description: 'Jollof Rice description.....',
        //     email: 'agaye@example.com',
        //     ingredients: 'rice',
        //     category:  'Non-Vegan',
        //     image: 'jollof.jpg'
        // });

        // await newRecipe.save();

        req.flash('infoSubmit', 'Recipe has been added.')
        res.redirect('/submit-recipe');     
    } catch (error) {
        // res.json(error);
        req.flash('infoErrors', error);
        res.redirect('/submit-recipe');     
    }
    
}





// async function insertDummyRecipeData() {
//     try {
//         await Recipe.insertMany([
//             {
//                 "name": "Vegan Sloppy Joes",
//                 "description": "A plant-based twist on the classic American favorite made with lentils and a tangy BBQ sauce.",
//                 "email": "veganchef@example.com",
//                 "ingredients": [
//                     "1 cup cooked lentils",
//                     "1/2 cup tomato sauce",
//                     "1 tbsp soy sauce",
//                     "1 tbsp maple syrup",
//                     "1 onion, diced",
//                     "4 hamburger buns",
//                     "Salt",
//                     "Pepper"
//                 ],
//                 "category": "Vegan",
//                 "image": "vegan_sloppy_joes.jpg"
//             },
//             {
//                 "name": "Vegan Chana Masala",
//                 "description": "A hearty Indian chickpea curry cooked with a blend of spices and tomatoes.",
//                 "email": "veganindianchef@example.com",
//                 "ingredients": [
//                     "2 cups cooked chickpeas",
//                     "2 tomatoes, pureed",
//                     "1 onion, diced",
//                     "2 tbsp chana masala spice mix",
//                     "1 tsp cumin seeds",
//                     "Cilantro for garnish"
//                 ],
//                 "category": "Vegan",
//                 "image": "vegan_chana_masala.jpg"
//             },
//                   {
//                 "name": "Vegan Tofu Tacos",
//                 "description": "Soft corn tortillas filled with spiced tofu, fresh salsa, and creamy avocado.",
//                 "email": "vegantacos@example.com",
//                 "ingredients": [
//                     "200g firm tofu, crumbled",
//                     "2 tsp taco seasoning",
//                     "6 corn tortillas",
//                     "1 cup salsa",
//                     "1 avocado, sliced",
//                     "Fresh cilantro"
//                 ],
//                 "category": "Vegan",
//                 "image": "vegan_tofu_tacos.jpg"
//             },
//             {
//                 "name": "Vegan Green Thai Curry",
//                 "description": "A flavorful green curry made with coconut milk, vegetables, and tofu.",
//                 "email": "thaivegan@example.com",
//                 "ingredients": [
//                     "1 cup coconut milk",
//                     "2 tbsp green curry paste",
//                     "200g tofu, cubed",
//                     "1 zucchini, sliced",
//                     "1 bell pepper, sliced",
//                     "Thai basil for garnish"
//                 ],
//                 "category": "Vegan",
//                 "image": "vegan_green_curry.jpg"
//             },
//             {
//                 "name": "Vegan Jollof Rice",
//                 "description": "A popular West African dish made with rice, tomatoes, and spices, in a fully plant-based version.",
//                 "email": "veganwestafrica@example.com",
//                 "ingredients": [
//                     "2 cups long-grain rice",
//                     "4 tomatoes, pureed",
//                     "1 red bell pepper",
//                     "1 onion, diced",
//                     "2 tbsp vegetable oil",
//                     "1 tsp thyme",
//                     "1 tsp curry powder"
//                 ],
//                 "category": "Vegan",
//                 "image": "vegan_jollof.jpg"
//             }
//         ]);
//         console.log('Recipes inserted successfully!');
//     } catch (error) {
//         console.log('Error inserting recipes:', error);
//     }
// };

// insertDummyRecipeData();













// function to insert data in the db
// async function insertDummyCategoryData(){

//     try {
//       await Category.insertMany([
//         {
//           "name": "American",
//           "image": "american.jpg"
//         },
//         {
//           "name": "Indian",
//           "image": "indian.jpg"
//         },
//         {
//           "name": "Italian",
//           "image": "italian.jpg"
//         },
//         {
//            "name": "Thai",
//            "image": "thai.jpg"
//         },
//         {
//           "name": "African",
//           "image": "african.jpg"
//         }
//       ]
      

//       );
//     } catch (error) {
//         console.log('err', + error)
//     }
// }

// insertDummyCategoryData();
