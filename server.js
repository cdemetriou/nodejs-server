

var express =  require("express");
var mysql   =  require('mysql');
var bodyParser = require('body-parser');
var app     =  express();
app.use(bodyParser.json());


var pool    =  mysql.createPool({
    connectionLimit : 50,
    host     : 'HOST_ADRESS',
    port     : 'PORT',
    user     : 'MASTER_USERNAME',
    password : 'MASTER_PASSWORD',
    database : 'DB_NAME',
    debug    :  false
});


// ------------------------------------
// INSERT NEW USER
// Post request to set new user details
//-------------------------------------
app.post("/users",function(req,res){
        setUser(req,res);
});

function setUser(req,res) {
  
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   
        console.log('connected as id ' + connection.threadId);
      
        var query = "INSERT INTO ?? ( ??, ??,??,??,??) VALUES (?,?,?,?,?)";
        var table = ["users","date","email","protein","carbs","fats",req.body.date,req.body.email,req.body.protein,req.body.carbs,req.body.fats];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
        connection.release();
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "User Added !"});
        }
        });
  });
}



// ------------------------------------
// GET USER DETAILS
// Get request to retrieve user by email
// ------------------------------------
app.get("/users/:email",function(req,res){
        getUserDetails(req,res);
});

function getUserDetails(req,res) {
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   
        console.log('connected as id ' + connection.threadId);
          
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["users","email",req.params.email];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
        connection.release();
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            console.log(rows);

            res.json({"Error" : false, "Message" : "Success", "Users" : rows});
        }
        });
    });
}




// ------------------------------------
// UPDATE USER DETAILS
// Post request to set new user details
// ------------------------------------
app.post("/user_details",function(req,res){
        setUserDetails(req,res);
});

function setUserDetails(req,res) {
  
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   
        console.log('connected as id ' + connection.threadId);

        var query = "INSERT INTO ?? ( ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";
        var table = ["users","date","email", "age", "gender","weight","height","bmi", "pal", "goal", "calories", "protein","carbs","fats", req.body.date, req.body.email, req.body.age, req.body.gender, req.body.weight, req.body.height, req.body.bmi, req.body.pal, req.body.goal, req.body.calories, req.body.protein, req.body.carbs, req.body.fats];
  
       // var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?";
        //var table = ["users","gender",req.body.gender, "age", req.body.age, "weight", req.body.weight, "height", req.body.height,"pal", req.body.pal, "goal", req.body.goal, "calories", req.body.calories, "email", req.body.email];
        query = mysql.format(query,table);
        console.log(query);         
        connection.query(query,function(err,rows){
        connection.release();
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "Updated user for email "+req.body.email});
        }
        });
  });
}



// ------------------------------------
// UPDATE USER MACROS
// Put request to update user macros
// ------------------------------------
app.put("/user_macros",function(req,res){
        setUserMacros(req,res);
});

function setUserMacros(req,res) {
  
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   
        console.log('connected as id ' + connection.threadId);
  
        var query = "UPDATE ?? SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ? AND ?? = ?";
        var table = ["users","protein",req.body.protein, "carbs", req.body.carbs, "fats", req.body.fats, "email", req.body.email, "date", req.body.date];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
        connection.release();
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "Updated user macros for email "+req.body.email});
        }
        });
  });
}



// ------------------------------------
// UPDATE USER CALORIES
// Put request to set new user calories
// ------------------------------------
app.put("/set_calorie_exp",function(req,res){
        setCalorieExp(req,res);
});

function setCalorieExp(req,res) {
  
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   
        console.log('connected as id ' + connection.threadId);
  
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["users","calories",req.body.calories, "email", req.body.email];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
        connection.release();
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "Updated user macros for email "+req.body.email});
        }
        });
  });
}



// ------------------------------------
// INSERT NEW FOOD
// Post request to insert food
//-------------------------------------
app.post("/food",function(req,res){
        storeFood(req,res);
});

function storeFood(req,res) {
  
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   
        console.log('connected as id ' + connection.threadId);
      
        var query = "INSERT INTO ??(??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var table = ["user_foods", "date", "amount", "item_id", "item_name", "brand_name", "nf_calories", "nf_total_fat", "nf_saturated_fat", "nf_trans_fatty_acid", "nf_polyunsaturated_fat", "nf_monounsaturated_fat", "nf_cholesterol", "nf_sodium", "nf_total_carbohydrate", "nf_dietary_fiber", "nf_sugars", "nf_protein", "nf_vitamin_a_dv", "nf_vitamin_c_dv", "nf_calcium_dv", "nf_iron_dv", "nf_serving_size_qty", "nf_serving_size_unit", "nf_serving_weight_grams", "allergen_contains_milk", "allergen_contains_eggs", "allergen_contains_fish", "allergen_contains_tree_nuts", "allergen_contains_peanuts", "allergen_contains_wheat", "allergen_contains_soybeans", "allergen_contains_gluten", "email", req.body.date, req.body.amount, req.body.item_id, req.body.item_name, req.body.brand_name, req.body.nf_calories, req.body.nf_total_fat, req.body.nf_saturated_fat, req.body.nf_trans_fatty_acid, req.body.nf_polyunsaturated_fat, req.body.nf_monounsaturated_fat, req.body.nf_cholesterol, req.body.nf_sodium, req.body.nf_total_carbohydrate, req.body.nf_dietary_fiber, req.body.nf_sugars, req.body.nf_protein, req.body.nf_vitamin_a_dv, req.body.nf_vitamin_c_dv, req.body.nf_calcium_dv, req.body.nf_iron_dv, req.body.nf_serving_size_qty, req.body.nf_serving_size_unit, req.body.nf_serving_weight_grams, req.body.allergen_contains_milk, req.body.allergen_contains_eggs, req.body.allergen_contains_fish, req.body.allergen_contains_tree_nuts, req.body.allergen_contains_peanuts, req.body.allergen_contains_wheat, req.body.allergen_contains_soybeans, req.body.allergen_contains_gluten, req.body.email];
       

        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
        connection.release();
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "Food Added to "+req.body.email+" with title "+req.body.item_name});
        }
        });
  });
}




// ------------------------------------
// GET USER DAILY FOODS
// Get request to retrieve user food
// ------------------------------------
app.get("/food/:email/:date",function(req,res){
        getFoods(req,res);
});

function getFoods(req,res) {
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   
        console.log('connected as id ' + connection.threadId);
          
        var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
        var table = ["user_foods","date", req.params.date, "email",req.params.email];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
        connection.release();
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "Success", "Foods" : rows});
        }
        });
    });
}



// ------------------------------------
// DELETE SPECIFIC FOODS
// Delete request to user specific food
// ------------------------------------
app.delete("/food/:item_id/:date/:email",function(req,res){
        deleteFood(req,res);
});

function deleteFood(req,res) {
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }   
        console.log('connected as id ' + connection.threadId);
          
        var query = "DELETE FROM ?? WHERE ??=? AND ??=? AND ??=?";
        var table = ["user_foods","item_id", req.params.item_id, "date", req.params.date, "email",req.params.email];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
        connection.release();
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "Food with title "+ req.body.item_name + "removed."});
        }
        });
    });
}

app.listen(3000,function(){
    console.log("All right ! I am alive at Port 3000.");
});