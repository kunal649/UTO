
const User = require("../../models/user");

async function GoogleAuthorizedUsers(req, res) {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        res.json(user);
    }
    catch (error) {
        console.error("User Fetch Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      } 
}

module.exports = GoogleAuthorizedUsers;
