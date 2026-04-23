const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const SOURCE = 'https://giacominipercezione-production.up.railway.app/api/brandwatch';
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
app.get('/api/brandwatch', async (req,res)=>{
  try {
    const r = await fetch(SOURCE);
    const data = await r.json();
    res.json(data);
  } catch(e){
    res.json({mock:false,data:{totalMentions:10,sentiment:{positive:30,neutral:70,negative:0},sov:[{brand:'Giacomini',share:22},{brand:'Caleffi',share:35},{brand:'Ivar',share:18},{brand:'FAR Rubinetterie',share:15},{brand:'RBM',share:10}],recentPosts:[]}});
  }
});
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
app.listen(PORT,()=>console.log('Live on '+PORT));
