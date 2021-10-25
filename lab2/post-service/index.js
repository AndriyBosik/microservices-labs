const express = require("express");
const axios = require("axios");
//const Client = require("pg").Client;

require("dotenv").config();

/*const client = new Client({
	user: process.env.USERNAME,
	host: process.env.HOST,
	database: process.env.DATABASE,
	password: process.env.PASSWORD,
	port: process.env.PORT
});*/

const PORT = 8000;
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

const app = express();

app.use((request, response, next) => {
	response.setHeader("Access-Control-Allow-Origin", "http://192.168.49.2");

	response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");

	next();
});

let sum = 0;

const makeRequest = async (i) => {
	const start = new Date().getTime();
	const response = await axios.get("http://192.168.49.2/api/fake-posts/user/1");
	const end = new Date().getTime();
	sum += end - start;
	console.log(response);
	if (i === 99) {
		console.log(sum);
	}
}

app.get("/api/posts/test", async (request, response) => {
	for (let i = 0; i < 100; i++) {
		if (i == 99) {
			await makeRequest(i);
		} else {
			makeRequest(i);
		}
	}
	response.status(200).json({});
});

app.get("/api/posts/user/:userId", (request, response) => {
	/*client.query(`SELECT * FROM posts WHERE user_id=${request.params.userId}`, (error, result) => {
		if (error) {
			throw error;
		}
		response.status(200).json(result.rows);
	});*/
    response.status(200).json(posts.filter(post => post.user_id*1 === request.params.userId*1));
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
