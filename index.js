import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));


app.get("/", async (req, res) => {
   //const result = await axios.get(`https://v2.jokeapi.dev/joke/Any`);
   //console.log(result);
    res.render("index.ejs", {
        content: "Waiting for data...",
    });

});

app.post("/get-joke", async (req, res) => {
    try{
        const category = req.body["category"];
        const blacklist = req.body["blacklist"];
        const type = req.body["type"];
        if(type === "twopart"){
            const result = await axios.get(`https://v2.jokeapi.dev/joke/${category}?blacklistFlags=${blacklist}&type=${type}`);
            console.log("Console log:" +JSON.stringify(result.data));
            res.render("index.ejs", {
                content: JSON.stringify(result.data.setup) + "\t" + JSON.stringify(result.data.delivery),
            });
        }else{
            const result = await axios.get(`https://v2.jokeapi.dev/joke/${category}?blacklistFlags=${blacklist}&type=${type}`);
            console.log("Console log:" +JSON.stringify(result.data));
            res.render("index.ejs", {
                content: JSON.stringify(result.data.joke),
            });
        }
        //console.log(category);

        }
    catch(error){
        res.render("index.ejs", { content: error.response.data});

        };
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
