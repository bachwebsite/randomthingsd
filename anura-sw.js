importScripts("/nohost-sw.js");importScripts("/sw.js");var cacheenabled=false;workbox.routing.registerRoute(/\/x86\/(.*)/,(req)=>{return handleRequests(req);});const callbacks={};addEventListener("message",(event)=>{if(event.data.anura_target==="anura.x86.proxy"){let callback=callbacks[event.data.id];callback(event.data.value);}
if(event.data.anura_target==="anura.bareurl"){let url=new URL(event.data.value);uv.address=event.data.value;uv.config.bare=event.data.value;uv.bareClient.server=url;if(uv.bareClient&&uv.bareClient.client){uv.bareClient.client.base=url;uv.bareClient.client.getMeta=url;uv.bareClient.client.http=url;uv.bareClient.client.newMeta=url;uv.bareClient.client.ws=url;}}
if(event.data.anura_target==="anura.cache"){cacheenabled=event.data.value;}
if(event.data.anura_target==="anura.cache.invalidate"){invalidateCache();}});async function handleRequests({url,request,event,params}){let clients=(await self.clients.matchAll()).filter((v)=>new URL(v.url).pathname==="/",);if(clients.length<1)
return new Response("no clients were available to take your request");let client=clients[0];let uuid=crypto.randomUUID();console.log(request);client.postMessage({anura_target:"anura.x86.proxy",id:uuid,value:{url:request.url.substring(request.url.indexOf("/x86/")+5),headers:Object.fromEntries(request.headers.entries()),method:request.method,},});console.log("want uuid"+uuid);let resp=await new Promise((resolve)=>{callbacks[uuid]=resolve;});return new Response(resp.body);}
function invalidateCache(){let sh=new fs.Shell();sh.rm("/anura_files",{recursive:true});console.log("cache invalidated!");}
workbox.routing.registerRoute(/^(?!.*(\/bare|\/uncached\/|\/config.json|\/MILESTONE|\/debian-rootfs.bin|\/images\/debian|\/ultraviolet\/))/,({url})=>{if(!cacheenabled)return;if(url.pathname==="/"){url.pathname="/index.html";}
const basepath="/anura_files";let sh=new fs.Shell();let path=decodeURI(url.pathname);let localreq=serve(`${basepath}${path}`,htmlFormatter,false);return new Promise((resolve)=>{localreq.then((r)=>{if(r.ok){resolve(r);}else{fetch(url).then((f)=>{resolve(f);if(f.ok){let cl=f.clone();cl.arrayBuffer().then((b)=>{sh.mkdirp(`${basepath}${path.replace(/[^/]*$/g,"",)}`,()=>{fs.writeFile(`${basepath}${path}`,Buffer(b),);},);});}}).catch((a)=>{console.error(`Could not fetch? ${a}`);});}});});},"GET",);