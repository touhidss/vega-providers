"use strict";
Object.defineProperty(exports,"__esModule",{value:true});
exports.getStream=void 0;

exports.getStream=async({link,providerContext})=>{
try{
const{axios}=providerContext;

const res=await axios.get(`https://hanime.tv/videos/hentai/${link}`);
const html=res.data;

const json=html.match(/window\.__NUXT__=(.*?);<\/script>/)[1];
const data=JSON.parse(json);

const streams=data.state.video.videos_manifest.servers;

const out=[];

streams.forEach(s=>{
s.streams.forEach(q=>{
out.push({
server:"Hanime",
link:q.url,
type:"mp4",
subtitles:[]
});
});
});

return out;
}catch{
return[];
}
};
