"use strict";
Object.defineProperty(exports,"__esModule",{value:true});
exports.getMeta=void 0;

exports.getMeta=async({link,providerContext})=>{
try{
const{axios}=providerContext;

const res=await axios.get(`https://hanime.tv/videos/hentai/${link}`);
const html=res.data;

const json=html.match(/window\.__NUXT__=(.*?);<\/script>/)[1];
const data=JSON.parse(json);

const video=data.state.video;

return{
title:video.name,
synopsis:video.description,
image:video.cover_url,
imdbId:"",
type:"movie",
linkList:[{
title:video.name,
directLinks:[{
title:"Play",
link:link
}]
}]
};
}catch{
return{title:"",synopsis:"",image:"",imdbId:"",type:"movie",linkList:[]};
}
};
