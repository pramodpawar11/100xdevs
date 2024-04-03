const { verifyTokens } = require("../services/auth");

function checkAuthentication(cookieName) {
    return async (req, res, next) => {
        try {
            const tokenCookie = req.cookies[cookieName];
            if (!tokenCookie) {
                return next(); // Move to the next middleware
            }

            const userPayload = await verifyTokens(tokenCookie);
            req.user = userPayload;
            return next(); // Move to the next middleware
        } catch (error) {
            // Handle error appropriately
            console.error("Authentication error:", error);
            return res.status(401).send("Authentication failed");
        }
    };
}

module.exports = {
    checkAuthentication,
};
