"use strict";
Object.defineProperty(exports,"__esModule",{value:true});
exports.getPosts=exports.getSearchPosts=void 0;

exports.getPosts=async({filter,signal,providerContext})=>{
try{
const{axios}=providerContext;
const order=filter==="/recent-movies"?"latest":filter==="/recent-shows"?"popular":"trending";
const res=await axios.get(`https://hanime.tv/api/v8/browse?page=0&order=${order}`,{signal});
const data=res.data?.hentai_videos||[];
const out=[];
data.forEach(e=>{
if(e?.name&&e?.slug&&e?.cover_url){
out.push({title:e.name,link:e.slug,image:e.cover_url});
}
});
return out;
}catch{return[];}
};

exports.getSearchPosts=async({searchQuery,signal,providerContext})=>{
try{
const{axios}=providerContext;
const res=await axios.get(`https://hanime.tv/api/v8/search?q=${encodeURIComponent(searchQuery)}`,{signal});
const data=res.data?.hentai_videos||[];
const out=[];
data.forEach(e=>{
if(e?.name&&e?.slug&&e?.cover_url){
out.push({title:e.name,link:e.slug,image:e.cover_url});
}
});
return out;
}catch{return[];}
};
