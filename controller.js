const { Email } = require("./models");

module.exports = (app, db) => {
	app.get("/", (req, res) => {
		res.render("index.ejs")
	});

	app.post("/email", (req, res) => {
		console.log(req.body);
		Email.create({email: req.body.email}).then((email) => {
			if(email) {
				res.json({
					success: true,
					message: {
						type: "success",
						header: "Email entered",
						content: "Email has been entered into mailing list."
					}
				});
			}
		}).catch((err) => {
			/*TODO: catch validation errors (unique, not null, valid email)*/
			console.log(err);
		});
	});
}