module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Email", {
    email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				msg: "This email is already on the mailing list."
			},
			validate: {
				isEmail: {
					msg: "Must be a valid email."
				}
			}
		}
  })
}