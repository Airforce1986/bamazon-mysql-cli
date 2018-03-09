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

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    mainMenu();
});

var mainMenu = function() {
inquirer.prompt([{
    name: "ManagerStart",
    message: "What would you like to do?",
    type: "list",
    choices: [{
        name: "View Products for Sale"
    }, {
        name: "View Low Inventory"
    }, {
        name: "Add to Inventory"
    }, {
        name: "Add New Product"
    }]
}]).then(function(answer) {
    if (answer.ManagerStart === "View Products for Sale") {
        revealInventory(); 
    } else if (answer.ManagerStart === "View Low Inventory") {
        revealLowInventory();
    } else if (answer.ManagerStart === "Add to Inventory") {
        addInventory();
    } else if (answer.ManagerStart === "Add New Product") {
        addProduct();
    }
});
};


var revealInventory = function() {
    connection.query("SELECT * FROM products", function(err, res) {
        console.log("ID |  Product Name |  Department Name |  Price  | Stock Quantity" )
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        setTimeout(mainMenu, 4000);
    });

};
    

var revealLowInventory = function() {
    connection.query("SELECT * FROM products WHERE products.stock_quantity < 6", function(err, res) {
        //console.log(res);
        if (res.length == undefined) {
            console.log("No low inventory present at the moment!");
        }
            console.log("ID |  Product Name |  Department Name |  Price  | Stock Quantity" )  
        for (var i = 0; i < res.length; i++) {         
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        //setTimeout(purchaseItem, 4000);
        setTimeout(mainMenu, 6000);            
        
    });

};

var addInventory = function() {
    inquirer.prompt([{
        name: "itemID",
        type: "input",
        message: "What is the item ID of the product you would like to add inventory to? \n"
    }, {
        name: "Quantity",
        type: "input",
        message: "How many units of the product would you like to add?"
    }]).then(function(answer) {
        connection.query("SELECT * FROM products WHERE products.id = ?", [answer.itemID], function(err, result) {
            // console.log(res[0].item_id);
            // console.log(res[0].stock_quantity);

            if (result[0].id == answer.itemID) {
                console.log("Successful restock");
                //console.log("You just spent: $" + TotalPrice);
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: result[0].stock_quantity + parseInt(answer.Quantity)
                }, {
                    id: result[0].id
                }], function(err, res) {
                    setTimeout(function(){console.log("You just added " + parseInt(answer.Quantity) + " inventory items to " + result[0].product_name)}, 2000);
                    setTimeout(revealInventory, 3500);
 
                });



            } 
        });

    });
};


var addProduct = function() {
        inquirer.prompt([{        
        name: "productName",
        type: "input",
        message: "What is the name of the product you would like to add inventory to?"
    }, {
        name: "departmentName",
        type: "input",
        message: "What is the department name of the product would you like to add?"
    }, {
        name: "price",
        type: "input",
        message: "What is the price of the product would you like to add?"
    }, {
        name: "Quantity",
        type: "input",
        message: "How many units of the product would you like to add?"
    }]).then(function(answer) {
        connection.query("INSERT INTO products SET ?", {
        product_name: answer.productName,
        department_name: answer.departmentName,
        price: parseInt(answer.price),  
        stock_quantity: parseInt(answer.Quantity)
        }, function(err, res) {
                setTimeout(function(){console.log("You just added " + answer.productName + " to the inventory")}, 2500);
                setTimeout(revealInventory, 1000);
        });
    });
}; 

