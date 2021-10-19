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

const PORT = 8080;
const HOST = "0.0.0.0";

const users = [
    {
        id: 1,
        name: "Andrii",
        surname: "Bosyk",
        login: "andriy",
        password: "bosik"
    },
    {
        id: 2,
        name: "Dmytro",
        surname: "Rekechynsky",
        login: "dmytro",
        password: "rekechynsky"
    }
];

const app = express();

app.use((request, response, next) => {
	response.setHeader("Access-Control-Allow-Origin", (process.env.FRONTEND_HOST ? process.env.FRONTEND_HOST : "http://192.168.49.2"));

	response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");

	next();
});

app.get("/api/profiles/:userId", async (request, response) => {
	const userQuery = `SELECT * FROM users WHERE id=${request.params.userId}`;
    const user = users.filter(user => user.id*1 === request.params.userId*1)[0];
	console.log(user);
    const postsLink = `${process.env.POST_SERVICE_HOST ? process.env.POST_SERVICE_HOST : ""}/api/posts/user/${request.params.userId}`;
	console.log(postsLink)
    try {
        const posts = await axios.get(postsLink);
        response.status(200).send({
            ...user,
            posts: posts.data
        });
    } catch (error) {
        response.status(200).send({
            value: "No data found",
            error: error
        });
    }

	/*client.query(userQuery, async (error, result) => {
		if (error) {
			throw error;
		}

		const postsLink = `${process.env.POST_SERVICE_HOST}/api/posts/user/${request.params.userId}`;
		const posts = await axios.get(postsLink);

		response.status(200).send({
			...result.rows[0],
			posts: posts.data
		});
	});*/
});

(async () => {
	//await client.connect();

	app.listen(PORT, HOST);
	console.log(`Running on http://${HOST}:${PORT}`);
})();
