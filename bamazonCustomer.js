var mysql = require("mysql");
var inquirer = require("inquirer");
var productPurchased = [];
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "Bamazon"
});

//this is trying it out. sending us back a confirmation in the terminal
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    revealInventory();
});

var revealInventory = function() {
  console.log("ID |  Product Name |  Department Name |  Price  | Stock Quantity" )
    //.query msql tool in javascript code to run mysql commands
    //grabs all the products 
    //res - response from database
    connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        //this is calling the next into motion 
        purchaseItem();
    });

};


function purchaseItem() {
    inquirer.prompt([{
        name: "itemID",
        type: "input",
        message: "What is the item ID of the product you would like to buy?"
    }, {
        name: "Quantity",
        type: "input",
        message: "How many units of the product would you like to buy?"
    }]).then(function(answer) {
        //[answer.itemid] becomes the ? in the .query connection with the DB
        connection.query("SELECT * FROM products WHERE products.id = ?", [answer.itemID], function(err, res) {
            // console.log(res[0].item_id);
            // console.log(res[0].stock_quantity);
            //[0] is taking the object of the array 
            //parseInt because inquire still thinks the number entered is an array.
            if (res[0].id == answer.itemID && res[0].stock_quantity >= parseInt(answer.Quantity)) {
                //price of item against how many items the user selected
                var TotalPrice = res[0].price * parseInt(answer.Quantity);
                console.log("Successful purchase");
                //console.log("You just spent: $" + TotalPrice);
                //reconnecting with the DB to update the stock quantity 
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: res[0].stock_quantity - parseInt(answer.Quantity)
                }, {
                    id: res[0].id
                }], function(err, res) {
                    setTimeout(revealInventory, 1000);

                    setTimeout(function(){console.log("You just spent: $" + TotalPrice)}, 2500);

                //setTimeout(console.log("You just spent: $" + TotalPrice), 4500);
                });
                //&& parseInt(res[0].stock_quantity) > parseInt(answer.Quantity)


            } else if (res[0].id == answer.itemID && res[0].stock_quantity < parseInt(answer.Quantity)) {
                setTimeout(function(){console.log("You ask for too much!")}, 2500);
                revealInventory();
            }

            // && parseInt(res.stock_quantity) > parseInt(answer.Quantity)
            // else {
            //   console.log("Failure")
            // }
        });

    });
};
