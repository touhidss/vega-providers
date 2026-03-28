"use strict";
Object.defineProperty(exports,"__esModule",{value:true});
exports.getStream=void 0;

exports.getStream=async({link:id,providerContext})=>{
try{
const{axios}=providerContext;

const res=await axios.get(`https://hanime.tv/api/v8/video?id=${id}`);
const data=res.data;

const streamLinks=[];

data?.videos_manifest?.servers?.forEach(server=>{
server.streams.forEach(stream=>{
streamLinks.push({
server:`Hanime-${stream.height}p`,
link:stream.url,
type:"mp4",
subtitles:[]
});
});
});

return streamLinks;
}catch{
return [];
}
};
