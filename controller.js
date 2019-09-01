const { Email } = require("./models");

module.exports = (app, db) => {
	app.get("/", (req, res) => {
		res.render("index.ejs")
	});

	app.post("/email", (req, res) => {
		Email.create({email: req.body.email}).then((email) => {
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