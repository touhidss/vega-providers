"use strict";
Object.defineProperty(exports,"__esModule",{value:true});
exports.getPosts=exports.getSearchPosts=void 0;

exports.getPosts=async({signal,providerContext})=>{
try{
const{axios}=providerContext;
const res=await axios.get("https://hanime.tv/api/v8/browse",{signal});
const data=res.data?.results||res.data;
const catalog=[];
data?.forEach(e=>{
if(e?.name&&e?.slug&&e?.cover_url){
catalog.push({
title:e.name,
link:e.slug,
image:e.cover_url
});
}
});
return catalog;
}catch{
return [];
}
};

exports.getSearchPosts=async({searchQuery,signal,providerContext})=>{
try{
const{axios}=providerContext;
const res=await axios.get(`https://hanime.tv/api/v8/search?q=${searchQuery}`,{signal});
const data=res.data?.results||res.data;
const catalog=[];
data?.forEach(e=>{
if(e?.name&&e?.slug&&e?.cover_url){
catalog.push({
title:e.name,
link:e.slug,
image:e.cover_url
});
}
});
return catalog;
}catch{
return [];
}
};
