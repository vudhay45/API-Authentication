import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";


const yourUsername = "pasupula";
const yourPassword = "Vudhay@2003";
const yourAPIKey = "4b4cfdf1-b8f2-4050-8392-0de7ec283148";
const yourBearerToken = "f3d45090-57f3-4016-99b4-cb0725bf25d8";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth",async (req, res) => {
  try{
    const result=await axios.get(API_URL + "/random");
      res.render("index.ejs",{content:JSON.stringify(result.data)});
  }catch(error){
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  
    try {
      const result = await axios.get(API_URL + "/all?page=2", {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      });
      res.render("index.ejs", { content: JSON.stringify(result.data) });
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

app.get("/apiKey",async (req, res) => {
  
  try{
    const result=await axios.get(API_URL+"/filter",{
      params:{
        score:5,
        apiKey:yourAPIKey
      },
    });
    res.render("index.ejs",{content:JSON.stringify(result.data)});
  }catch(error){
    res.status(400).send(error.message);
  }
});

app.get("/bearerToken",async (req, res) => {
  
  const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
  };
 try{
  const result=await axios.get(API_URL+"/secrets/2",config)
  res.render("index.ejs",{content:JSON.stringify(result.data)})
 }catch(error){
  res.status(400).send(error.message);
 }

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
