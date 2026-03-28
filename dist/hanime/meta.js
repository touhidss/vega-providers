"use strict";
Object.defineProperty(exports,"__esModule",{value:true});
exports.getMeta=async({link:id,providerContext})=>{
try{
const{axios}=providerContext;
const res=await axios.get(`https://hanime.tv/api/v8/video?id=${id}`);
const data=res.data;
const links=[];
data?.videos_manifest?.servers?.forEach(server=>{
server.streams.forEach(stream=>{
links.push({title:`${stream.height}p`,link:stream.url});
});
});
return{
title:data.name,
synopsis:data.description,
image:data.cover_url,
imdbId:"",
type:"movie",
linkList:[{title:data.name,directLinks:links}]
};
}catch{
return{title:"",synopsis:"",image:"",imdbId:"",type:"movie",linkList:[]};
}
};
