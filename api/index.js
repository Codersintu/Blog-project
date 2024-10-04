const express=require("express")
const morgan=require("morgan")
const dotenv=require("dotenv");
const authRouter=require("./router/auth")
const userRouter=require("./router/user")
const postRouter=require("./router/post")
const categoryRouter=require("./router/category")
const path=require("path")
const cors=require("cors")
const multer=require("multer")
const { default: mongoose } = require("mongoose");
dotenv.config();
const app=express();
app.use("/images", express.static(path.join(__dirname, "/images")));


async function mongoDB(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('connected to mongoDB')
        
    } catch (error) {
        console.log('failed connect to monoDB')
    }
}
mongoDB();

app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
  }));

  app.use("/images", express.static(path.join(__dirname, "public/images")));

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });

app.use(express.json())
app.use(morgan("common"))


app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use("/api/category",categoryRouter)
const PORT=8101;
app.listen(PORT,()=>{
    console.log(`Backend server is running http://localhost:${PORT}`)
})