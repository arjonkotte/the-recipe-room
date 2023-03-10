const recipe = require('../models/recipe')



function index(req,res) {
    recipe.find({}, function(err, recipes) {
    res.render('recipes/index', {title: 'All Recipes', recipes})
    });
}

function newRecipe (req, res) {
    res.render('recipes/new',  { title: 'Add Recipe'})
}

function create(req,res) {
    req.body.ingredients = req.body.ingredients.split(',');
    
    const newRecipe = new recipe(req.body)
    
    newRecipe.save(function(err) {
        if(err) return res.redirect('/recipes/new');
        console.log(err)
        res.redirect('recipes');
    })
}

function show (req, res){
    recipe.findById(req.params.id, function(err, recipe) {
        res.render('recipes/show', { title: recipe.title, recipe} )
    })
}




module.exports = {
    index,
    new: newRecipe,
    create,
    show
}