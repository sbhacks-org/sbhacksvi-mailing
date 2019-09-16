const { Email } = require("./models");

module.exports = (app, db) => {
	app.get("/", (req, res) => {
		res.render("index.ejs")
	});

	app.get("/sponsors-slidedeck", (req, res) => {
		res.redirect(process.env.SLIDE_DECK_LINK)
	});

	app.post("/email", (req, res) => {
		Email.create({email: req.body.email}).then((email) => {
			console.log('Duplicate email');
			return res.json({
				success: true,
				message: {
					type: "success",
					header: "Email entered",
					content: "Email has been entered into mailing list."
				}
			});
		}).catch((err) => {
			// Duplicate email
			if (err["name"] == "SequelizeUniqueConstraintError")
			{
				console.log('Duplicate email');
				return res.json({
					success: false,
					message: {
						type: "failure",
						header: "Duplicate",
						content: "Email already exists."
					}
				});
			}
			// Invalid email or null
			if (err["name"] == "SequelizeValidationError") {
				console.log('Invalid/null email');
				return res.json({
					success: false,
					message: {
						type: "failure",
						header: "Invalid",
						content: "Email is not valid."
					}
				});
			}
		});
	});
}