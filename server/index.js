
const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// new imports
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
	cors: {
		origin: "https://localhost:3000"
	}
});
socketIO.on('connection', (socket) => {
	console.log(`=> ${socket.id} user just connected!`);

	socket.on('disconnect', () => {
		socket.disonnect()
		console.log(`* A user disonnected`);
	});
});

app.get("/api", (req,res) => {
	res.json({
		message: "Hello world",
		});
	});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
