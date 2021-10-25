const express = require("express");
//const Client = require("pg").Client;

require("dotenv").config();

/*const client = new Client({
	user: process.env.USERNAME,
	host: process.env.HOST,
	database: process.env.DATABASE,
	password: process.env.PASSWORD,
	port: process.env.PORT
});*/

const PORT = 8081;
const HOST = "0.0.0.0";

const posts = [
    {
        id: 1,
        content: "First post",
        user_id: 2
    },
    {
        id: 2,
        content: "Second post",
        user_id: 1
    },
];

const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms));
}

let isBroken = false;

const app = express();

app.use((request, response, next) => {
	response.setHeader("Access-Control-Allow-Origin", "http://192.168.49.2");

	response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");

	next();
});

app.get("/api/fake-posts/user/:userId", async (request, response) => {
	if (isBroken) {
		await sleep(10000);
	}
	/*client.query(`SELECT * FROM posts WHERE user_id=${request.params.userId}`, (error, result) => {
		if (error) {
			throw error;
		}
		response.status(200).json(result.rows);
	});*/
    response.status(200).json(posts.filter(post => post.user_id*1 === request.params.userId*1));
});

app.get("/api/fake-posts/break", (request, response) => {
	isBroken = true;
	console.log("broken");
	response.status(200).json({});
});

app.get("/", (request, response) => {
	/*client.query("SELECT * FROM posts", (error, result) => {
		if (error) {
			throw error;
		}
		response.status(200).json(result.rows);
	});*/
    response.status(200).json(posts);
});

(async () => {
	//await client.connect();

	app.listen(PORT, HOST);
	console.log(`Running on http://${HOST}:${PORT}`);
})();
