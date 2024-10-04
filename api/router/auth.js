const router=require("express").Router();
const User=require("../module/User")
const bcrypt=require("bcrypt")

router.post("/register", async (req, res) => {
    try {
        // Check if the username or email already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken.' });
        }

        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        // Save the user
        const user = await newUser.save();
        res.status(200).json(user); // 201 Created status
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.post("/login",async(req,res)=>{
    try {
        const user=await User.findOne({username:req.body.username})
        !user && res.status(400).json("user not found")


        const validated=await bcrypt.compare(req.body.password,user.password)
        !validated && res.status(400).json("wrong credential")
        
        const {password,...other}=user._doc;
       res.status(200).json(other)

    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports=router;