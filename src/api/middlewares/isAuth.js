module.exports = (req, res, next) => {
	if(!req.session || !req.session.userId) {
		const err = {status: 401, message: "You should login"}
		next(err);
	}
	next();
}