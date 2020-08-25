var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

const port = process.env.PORT || 3000;

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.get('/', async(req, res) => {
});

app.post("/", async(req, res) => {
    var n = req.body['post'];
    console.log("My number");
    console.log(n);

    var result = eratosthenes(n);

    function eratosthenes(n) {
	    // Eratosthenes algorithm to find all primes under n
	    var array = [], upperLimit = Math.sqrt(n), output = [];

	    // Make an array from 2 to (n - 1)
	    for (var i = 0; i < n; i++) {
	        array.push(true);
	    }

	    // Remove multiples of primes starting from 2, 3, 5,...
	    for (var i = 2; i <= upperLimit; i++) {
	        if (array[i]) {
	            for (var j = i * i; j < n; j += i) {
	                array[j] = false;
	            }
	        }
	    }

	    // All array[i] set to true are primes
	    for (var i = 2; i < n; i++) {
	        if(array[i]) {
	            output.push(i);
	        }
	    }

	    return output;
	};

	console.log("result eratosthenes");
    console.log(result);

    //Find the median in the
    const arrSort = result.sort();
    const len = arrSort.length;
	const mid = Math.ceil(len / 2)

	const median =
  	len % 2 == 0 ? (arrSort[mid] + arrSort[mid - 1]) / 2 : arrSort[mid - 1];

	console.log("median: ", median);

	var median_result = "median: " + median;

    res.send(median_result);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
