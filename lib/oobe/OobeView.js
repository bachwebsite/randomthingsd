"use strict";class OobeView{content;state=stateful({color:"var(--oobe-bg)",text:"black",});css=styled.new `
        * {
            color: ${React.use(this.state.text)};
            transition: all 1s;
        }

        self {
            background-color: ${React.use(this.state.color)};
            z-index: 9996;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-content: center;
            flex-wrap: wrap;
        }

        #content {
            padding: 79.6px 40px 23.8px 40px;
            width: 1040px;
            height: 680px;
            box-sizing: border-box;
        }

        #content .screen {
            width: 100%;
            height: 100%;
        }

        .screen h1 {
            margin: 48px 0 0 0;
        }

        .screen #subtitle {
            margin: 16px 0 64px 0;
            font-size: 24px;
        }

        .screen #gridContent {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr);
            grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
        }

        .screen #gridContent #topButtons {
            grid-column: 1 / span 1;
            grid-row: 1 / span 1;
        }

        .screen #gridContent #bottomButtons {
            align-self: end;
            justify-self: start;
            grid-column: 1 / span 1;
            grid-row: 2 / span 1;
        }

        .screen .preferredButton {
            background-color: rgb(26, 115, 232);
            border-radius: 16px;
            border-style: none;
            color: white;
            height: 2em;
            padding-left: 1em;
            padding-right: 1em;
        }

        .screen button {
            background-color: var(--oobe-bg);
            border-radius: 16px;
            border: 1px solid gray;
            color: rgb(26, 115, 232);
            height: 2em;
            margin: 0.5em;
            padding-left: 1em;
            padding-right: 1em;
        }

        #welcome.screen #animation {
            grid-column: 2 / span 1;
            grid-row: 1 / span 2;
            margin-left: auto;
        }
    `;element=(React.createElement("div",{class:this.css},React.createElement("div",{"bind:content":this,id:"content"})));nextButton;steps=[{elm:(React.createElement("div",{class:"screen",id:"welcome"},React.createElement("h1",null,"Welcome to your Chromebook"),React.createElement("div",{id:"subtitle"},"Slow. Insecure. Effortful."),React.createElement("div",{id:"gridContent"},React.createElement("div",{"on:click":()=>{const script=document.createElement("script");script.src=`/apps/eruda.app/eruda.js`;document.head.appendChild(script);script.onload=function(){eruda.init();};},id:"topButtons"},React.createElement("button",null,"Enable Eruda")),React.createElement("img",{id:"animation",src:"assets/oobe/welcome.gif"}),React.createElement("div",{id:"bottomButtons"},React.createElement("button",{"on:click":()=>this.nextStep(),class:"preferredButton"},"Next"))))),on:()=>{},},{elm:(React.createElement("div",{class:"screen"},React.createElement("h1",null,"Choose your experience"),React.createElement("div",{id:"subtitle"},"What kind of Anura user are you?"),React.createElement("button",{"on:click":()=>{anura.settings.set("x86-disabled",false);anura.settings.set("x86-image","debian");this.nextStep();}},"Debian: rootfs (enable v86 with Debian) - ~2.1GB"),React.createElement("br",null),React.createElement("button",{"on:click":()=>{anura.settings.set("x86-disabled",true);this.nextStep();}},"Normal User (disable v86) ~23.3MB"),React.createElement("br",null),React.createElement("button",{"on:click":()=>{anura.settings.set("x86-disabled",true);anura.settings.set("use-sw-cache",false);this.nextStep();}},"Bypass File Cache (disable v86, and disable offline functionality) ~instant"))),on:()=>{},},{elm:(React.createElement("div",{class:"screen",id:"downloadingFiles"},React.createElement("div",{id:"assetsDiv",style:"display:none;"}),React.createElement("h1",null,"Downloading assets"),React.createElement("div",{id:"subtitle"},"For the best experience, AnuraOS needs to download required assets."),React.createElement("img",{src:"/assets/oobe/spinner.gif"}),React.createElement("br",null),React.createElement("span",{id:"tracker"}))),on:async()=>{this.state.color="var(--material-bg)";this.state.text="whitesmoke";if(!anura.settings.get("x86-disabled")){await installx86();}
if(anura.settings.get("use-sw-cache"))
await preloadFiles();console.log("Cached important files");anura.files.set("/apps/libfileview.app/fileHandler.js","txt");anura.files.set("/apps/libfileview.app/fileHandler.js","mp3");anura.files.set("/apps/libfileview.app/fileHandler.js","flac");anura.files.set("/apps/libfileview.app/fileHandler.js","wav");anura.files.set("/apps/libfileview.app/fileHandler.js","ogg");anura.files.set("/apps/libfileview.app/fileHandler.js","mp4");anura.files.set("/apps/libfileview.app/fileHandler.js","mov");anura.files.set("/apps/libfileview.app/fileHandler.js","webm");anura.files.set("/apps/libfileview.app/fileHandler.js","gif");anura.files.set("/apps/libfileview.app/fileHandler.js","png");anura.files.set("/apps/libfileview.app/fileHandler.js","jpg");anura.files.set("/apps/libfileview.app/fileHandler.js","jpeg");anura.files.set("/apps/libfileview.app/fileHandler.js","pdf");anura.files.set("/apps/libfileview.app/fileHandler.js","py");this.complete();},},];i=0;constructor(){this.nextStep();}
nextStep(){const step=this.steps[this.i];this.content.children[0]?.remove();this.content.appendChild(step.elm);if(step.on)
step.on();this.i++;}
complete(){anura.settings.set("oobe-complete",true);document.dispatchEvent(new Event("anura-login-completed"));this.element.remove();}}
async function installx86(){const tracker=document.getElementById("tracker");console.log("installing x86");const x86image=anura.settings.get("x86-image");tracker.innerText="Downloading x86 kernel";const bzimage=await fetch(anura.config.x86[x86image].bzimage);anura.fs.writeFile("/bzimage",Filer.Buffer(await bzimage.arrayBuffer()));tracker.innerText="Downloading x86 initrd";const initrd=await fetch(anura.config.x86[x86image].initrd);anura.fs.writeFile("/initrd.img",Filer.Buffer(await initrd.arrayBuffer()));if(typeof anura.config.x86[x86image].rootfs==="string"){const rootfs=await fetch(anura.config.x86[x86image].rootfs);const blob=await rootfs.blob();await anura.x86hdd.loadfile(blob);}
else if(anura.config.x86[x86image].rootfs){console.log("fetching");const files=[];let limit=4;let i=0;let done=false;let doneSoFar=0;const doWhenAvail=function(){if(limit==0)
return;limit--;const assigned=i;i++;fetch(anura.config.x86[x86image].rootfs[assigned]).then(async(response)=>{if(response.status!=200){console.error("Status code bad on chunk "+assigned);console.error(anura.config.x86[x86image].rootfs[assigned]);console.error("Finished "+doneSoFar+" chunks before error");anura.notifications.add({title:"bad chunk on x86 download",description:`Chunk ${assigned} gave status code ${response.status}\nClick me to reload`,timeout:50000,callback:()=>{location.reload();},});return;}
files[assigned]=await response.blob();limit++;doneSoFar++;tracker.innerHTML=`Downloading x86 rootfs. Chunk ${doneSoFar}/${anura.config.x86[x86image].rootfs.length} done`;if(i<anura.config.x86[x86image].rootfs.length){doWhenAvail();}
if(doneSoFar==anura.config.x86[x86image].rootfs.length){done=true;}
console.log(anura.config.x86[x86image].rootfs.length-
doneSoFar+
" chunks to go");}).catch((e)=>{console.error("Error on chunk "+assigned);anura.notifications.add({title:"bad chunk on x86 download",description:`Chunk ${assigned} had a download error ${e}\nClick me to reload`,timeout:50000,callback:()=>{location.reload();},});});};doWhenAvail();doWhenAvail();doWhenAvail();doWhenAvail();while(!done){await sleep(200);}
console.log(files);console.log("constructing blobs...");tracker.innerText="Concatenating and installing x86 rootfs";await anura.x86hdd.loadfile(new Blob(files));}
console.log("done");}
async function preloadFiles(){try{const list=await(await fetch("cache-load.json")).json();const chunkSize=10;const promises=[];const tracker=document.getElementById("tracker");let i=0;for(const item in list){promises.push(fetch(list[item]));if(Number(item)%chunkSize===chunkSize-1){await Promise.all(promises);}
tracker.innerText=`Downloading anura system files, chunk ${i}`;i++;}
await Promise.all(promises);}
catch(e){console.warn("error durring oobe preload",e);}}