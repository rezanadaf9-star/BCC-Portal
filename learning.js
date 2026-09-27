(() => {
    "use strict";
    const cfg = window.LECTURE_CONFIG || {
    };
    const yt = cfg.youtube || {
    };
    const $ = s => document.querySelector(s);
    const safe = (v, fallback = "") => v == null ? fallback : String(v);
    const state = {
        live:null, lastLecture:null, pollTimer:null, player:null, ytApiReady:null, currentVideoId:null
    };
    const els = {
        liveBadge:$("#liveStatusBadge"), liveTitle:$("#liveTitle"), liveSubject:$("#liveSubject"),
        liveDescription:$("#liveDescription"), liveRoom:$("#liveRoom"), watchLive:$("#watchLiveBtn"),
        upcoming:$("#upcomingList"), upcomingEmpty:$("#upcomingEmpty"), missed:$("#missedList"),
        missedEmpty:$("#missedEmpty"), resumeBox:$("#resumeBox"), resumeText:$("#resumeText"),
        resumeBtn:$("#resumeLectureBtn"), modal:$("#videoModal"), modalTitle:$("#videoModalTitle"),
        modalLogo:$("#videoModalLogo"), closeModal:$("#closeVideoModal"), frame:$("#videoFrame"),
        playerContainer:$("#youtubePlayerContainer"), placeholder:$("#videoPlaceholder"),
        fullscreen:$("#fullscreenVideoBtn"), escHint:$("#escHint"), notice:$("#notificationMessage"),
        noticeText:$("#notificationMessage span")
    };
    function notify(message) {
        if(!els.notice)return;
        els.noticeText.textContent=message;
        els.notice.classList.add("show");
        clearTimeout(notify.timer);
        notify.timer=setTimeout(()=>els.notice.classList.remove("show"),3500);
    }
    function escapeHtml(value) {
        return safe(value).replace(/[&<>"']/g,ch=>( {
            "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"
        }
        [ch]));
    }
    function validVideoId(id) {
        return /^[A-Za-z0-9_-]{6,20}$/.test(safe(id).trim());
    }
    function getSource(item) {
        if(String(item?.source||"").toLowerCase()==="local") return "local";
        if(item?.videoUrl && !item?.videoId) return "local";
        return "youtube";
    }
    function getYouTubeId(item) {
        if(validVideoId(item?.videoId)) return safe(item.videoId).trim();
        const url=safe(item?.youtubeUrl||item?.videoUrl).trim();
        const match=url.match(/(?:v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([A-Za-z0-9_-]{6,20})/);
        return match?match[1]:"";
    }
    function setLiveUI(data) {
        state.live=data||null;
        if(!data) {
            els.liveBadge.className="status-badge live offline";
            els.liveBadge.innerHTML='<i class="fa-solid fa-circle"></i> OFFLINE';
            els.liveTitle.textContent="No Live Now";
            els.liveSubject.textContent="Live Class";
            els.liveDescription.textContent="No live lecture for now.";
            els.liveRoom.textContent="Offline";
            els.watchLive.disabled=true;
            els.watchLive.querySelector("span").textContent="Watch Live";
            return;
        }
        els.liveBadge.className="status-badge live";
        els.liveBadge.innerHTML='<i class="fa-solid fa-circle"></i> LIVE NOW';
        els.liveTitle.textContent=data.title||data.lecture||"Live Lecture";
        els.liveSubject.textContent=data.subject||"Live Class";
        els.liveDescription.textContent=data.description||"Live lecture is currently in progress.";
        els.liveRoom.textContent=data.room||"Online";
        els.watchLive.disabled=false;
        els.watchLive.querySelector("span").textContent="Watch Live";
    }
    function loadYouTubeIframeAPI() {
        if(window.YT?.Player)return Promise.resolve(window.YT);
        if(state.ytApiReady)return state.ytApiReady;
        state.ytApiReady=new Promise((resolve,reject)=> {
            const old=window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady=()=> {
                if(typeof old === "function") old();
                resolve(window.YT);
            };
            const script=document.createElement("script");
            script.src="https://www.youtube.com/iframe_api";
            script.async=true;
            script.onerror=()=>reject(new Error("Could not load YouTube IFrame API."));
            document.head.appendChild(script);
        });
        return state.ytApiReady;
    }
    async function createYouTubePlayer(videoId,title) {
        await loadYouTubeIframeAPI();
        els.playerContainer.innerHTML="<div id=\"youtubePlayer\"></div>";
        state.currentVideoId=videoId;
        state.player=new YT.Player("youtubePlayer", {
            videoId,
            width:"100%",
            height:"100%",
            playerVars: {
                autoplay:1,
                controls:1,
                rel:0,
                playsinline:1,
                enablejsapi:1,
                origin:window.location.origin,
                fs:1
            },
            events: {
                onReady:event=> {
                    try {
                        event.target.playVideo();
                    }
                    catch {
                    }
                },
                onStateChange:event=> {
                    // YT.PlayerState.ENDED = 0. Closing the modal keeps the student on
                    // this website instead of redirecting them to youtube.com.
                    if(event.data===YT.PlayerState.ENDED) closeVideo(true);
                },
                onError:event=> {
                    console.warn("YouTube player error:",event.data);
                }
            }
        });
        els.modalTitle.textContent=title||"Lecture";
    }
    async function openVideo(itemOrVideoId,title,options= {
    }) {
        const item=typeof itemOrVideoId==="object"?(itemOrVideoId|| {
        }): {
            videoId:itemOrVideoId,lecture:title
        };
        const source=getSource(item);
        const lectureTitle=item.lecture||item.title||title||"Lecture";
        els.modalTitle.textContent=lectureTitle;
        els.modalLogo.src=cfg.branding?.logo||"images/logo.png";
        els.modal.classList.add("show");
        els.modal.setAttribute("aria-hidden","false");
        document.body.classList.add("modal-open");
        els.placeholder.style.display="none";
        els.fullscreen.disabled=false;
        if(source==="local") {
            const url=safe(item.videoUrl).trim();
            if(!url) {
                notify("No local MP4 path has been configured for this lecture."); closeVideo(false); return;
            }
            els.playerContainer.innerHTML=`<video id="learningLocalVideo" class="local-video-player" controls autoplay playsinline preload="metadata"><source src="${escapeHtml(url)}" type="video/mp4">Your browser does not support this video.</video>`;
            const video=$("#learningLocalVideo");
            video?.addEventListener("ended",()=>closeVideo(true));
            video?.play().catch(()=> {
            });
        }
        else {
            const videoId=getYouTubeId(item);
            if(!validVideoId(videoId)) {
                notify("This lecture does not have a valid YouTube video ID yet."); closeVideo(false); return;
            }
            try {
                await createYouTubePlayer(videoId,lectureTitle);
            }
            catch(error) {
                console.error(error);
                els.playerContainer.innerHTML=`<div class="player-error"><i class="fa-solid fa-triangle-exclamation"></i><p>Unable to load the YouTube player right now.</p></div>`;
                notify("YouTube player could not be loaded.");
            }
        }
        state.lastLecture= {
            source,videoId:source==="local"?safe(item.videoUrl):getYouTubeId(item),title:lectureTitle,videoUrl:source==="local"?safe(item.videoUrl):undefined
        };
        localStorage.setItem("lastLecture",JSON.stringify(state.lastLecture));
        localStorage.setItem("lastLectureWatchedAt",new Date().toISOString());
    }
    function closeVideo(fromEnded=false) {
        try {
            state.player?.stopVideo?.();
        }
        catch {
        }
        try {
            $("#learningLocalVideo")?.pause?.();
        }
        catch {
        }
        state.player=null;
        state.currentVideoId=null;
        els.modal.classList.remove("show");
        els.modal.setAttribute("aria-hidden","true");
        document.body.classList.remove("modal-open");
        els.playerContainer.innerHTML="";
        els.placeholder.style.display="flex";
        if(document.fullscreenElement)document.exitFullscreen().catch(()=> {
        });
        if(fromEnded) notify("Lecture finished. Returning to Digital Classroom.");
    }
    async function toggleFullscreen() {
        if(!els.frame)return;
        if(!document.fullscreenElement) await els.frame.requestFullscreen?.();
        else await document.exitFullscreen?.();
    }
    function renderUpcoming(items) {
        els.upcoming.innerHTML="";
        const list=(items||[]).filter(x=>x&&x.startTime&&new Date(x.startTime)>new Date()).sort((a,b)=>new Date(a.startTime)-new Date(b.startTime));
        els.upcomingEmpty.style.display=list.length?"none":"flex";
        list.forEach(item=> {
            const d=new Date(item.startTime), row=document.createElement("div");
            row.className="upcoming-item";
            row.innerHTML=`<div class="date-box"><strong>${d.toLocaleDateString("en-IN",{day:"2-digit"})}</strong><span>${d.toLocaleDateString("en-IN",{month:"short"}).toUpperCase()}</span></div><div class="upcoming-info"><h3>${escapeHtml(item.title||"Upcoming Lecture")}</h3><p><i class="fa-regular fa-clock"></i> ${d.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})} &nbsp; • &nbsp; ${escapeHtml(item.room||"Online")}</p></div><button type="button" class="reminder-btn"><i class="fa-regular fa-bell"></i> Set Reminder</button>`;
            row.querySelector(".reminder-btn").onclick=()=>addCalendarReminder(item);
            els.upcoming.appendChild(row);
        });
    }
    function addCalendarReminder(item) {
        const start=new Date(item.startTime), end=new Date(start.getTime()+60*60*1000);
        const fmt=d=>d.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");
        const url=`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(item.title||"Lecture")}&dates=${fmt(start)}/${fmt(end)}&details=${encodeURIComponent(item.description||"Digital Classroom lecture")}`;
        window.open(url,"_blank","noopener,noreferrer");
    }
    function renderMissed() {
        const list=Array.isArray(cfg.missedLectures)?cfg.missedLectures:[];
        els.missed.innerHTML="";
        els.missedEmpty.style.display=list.length?"none":"flex";
        list.forEach(item=> {
            const card=document.createElement("div");
            card.className="missed-card";
            card.innerHTML=`<div class="missed-thumb"><i class="fa-solid fa-play"></i></div><div class="missed-info"><span class="status-badge missed">MISSED</span><h3>${escapeHtml(`$ {
                item.subject||""
            }
            $ {
                item.subject?" - ":""
            }
            $ {
                item.title||"Lecture"
            }
            `)}</h3><p>${escapeHtml(item.description||"Recorded lecture available for viewing.")}</p></div><button type="button" class="primary-btn"><i class="fa-solid fa-play"></i> Watch Now</button>`;
            card.querySelector("button").onclick=()=>openVideo(item,item.title);
            els.missed.appendChild(card);
        });
    }
    function loadResume() {
        try {
            const saved=JSON.parse(localStorage.getItem("lastLecture")||"null");
            if(!saved?.videoId)return;
            state.lastLecture=saved;
            els.resumeBox.hidden=false;
            els.resumeText.textContent=`You were watching ${saved.title||"your last lecture"}.`;
            els.resumeBtn.onclick=()=>openVideo(saved,saved.title);
        }
        catch {
            els.resumeBox.hidden=true;
        }
    }
    async function youtubeRequest(endpoint,params) {
        if(!yt.apiKey||yt.apiKey.startsWith("YOUR_"))throw new Error("YouTube API key not configured.");
        const query=new URLSearchParams( {
            ...params,key:yt.apiKey
        });
        const response=await fetch(`https://www.googleapis.com/youtube/v3/${endpoint}?${query}`);
        if(!response.ok)throw new Error(`YouTube API error ${response.status}`);
        return response.json();
    }
    function getManualLive() {
        const manual=cfg.manualLiveLecture|| {
        };
        if(!manual.isLive||!validVideoId(manual.videoId))return null;
        return {
            videoId:manual.videoId,
            title:manual.lecture||"Live Lecture",
            description:manual.description||"Live lecture is currently in progress.",
            subject:manual.subject||"Live Class",
            teacher:manual.teacher||"",
            room:"Online"
        };
    }
    async function fetchLiveAndUpcoming() {
        if(yt.mode==="manual")return {
            live:getManualLive(),upcoming:cfg.upcomingFallback||[]
        };
        if(yt.mode==="backend") {
            if(!yt.backendEndpoint)throw new Error("Backend mode is selected but backendEndpoint is empty.");
            const response=await fetch(yt.backendEndpoint, {
                cache:"no-store"
            });
            if(!response.ok)throw new Error("Backend endpoint failed.");
            return response.json();
        }
        if(!yt.channelId||yt.channelId.startsWith("YOUR_")||!yt.apiKey||yt.apiKey.startsWith("YOUR_"))throw new Error("YouTube channel ID/API key not configured.");
        const [liveData,upcomingData]=await Promise.all([
        youtubeRequest("search", {
            part:"snippet",channelId:yt.channelId,eventType:"live",type:"video",maxResults:"1"
        }),
        youtubeRequest("search", {
            part:"snippet",channelId:yt.channelId,eventType:"upcoming",type:"video",order:"date",maxResults:"10"
        })
        ]);
        const liveItem=liveData.items?.[0];
        const live=liveItem? {
            videoId:liveItem.id.videoId,
            title:liveItem.snippet.title,
            description:liveItem.snippet.description,
            publishedAt:liveItem.snippet.publishedAt,
            subject:"Live Class",
            room:"Online"
        }
        :null;
        const ids=(upcomingData.items||[]).map(x=>x.id?.videoId).filter(Boolean);
        let details= {
        };
        if(ids.length) {
            const vd=await youtubeRequest("videos", {
                part:"snippet,liveStreamingDetails",id:ids.join(",")
            });
            (vd.items||[]).forEach(x=>details[x.id]=x);
        }
        const upcoming=(upcomingData.items||[]).map(item=> {
            const d=details[item.id.videoId];
            const start=d?.liveStreamingDetails?.scheduledStartTime;
            return {
                videoId:item.id.videoId,title:item.snippet.title,description:item.snippet.description,startTime:start||null,room:"Online"
            };
        }).filter(x=>x.startTime);
        return {
            live,upcoming
        };
    }
    async function refreshLive() {
        try {
            const result=await fetchLiveAndUpcoming();
            const wasLive=!!state.live;
            const nowLive=!!result.live;
            setLiveUI(result.live);
            renderUpcoming(result.upcoming?.length?result.upcoming:cfg.upcomingFallback||[]);
            if(!wasLive&&nowLive) {
                notify(`LIVE NOW: ${result.live.title||"Lecture has started"}`);
                openVideo(result.live,result.live.title, {
                    live:true
                });
            }
        }
        catch(error) {
            if(!state.live) {
                setLiveUI(null); renderUpcoming(cfg.upcomingFallback||[]);
            }
            console.warn(error);
        }
    }
    function startPolling() {
        refreshLive();
        clearInterval(state.pollTimer);
        state.pollTimer=setInterval(refreshLive,30000);
    }
    document.addEventListener("DOMContentLoaded",()=> {
        renderMissed();
        loadResume();
        els.watchLive.onclick=()=>state.live?openVideo(state.live,state.live.title, {
            live:true
        }):notify("No live lecture for now.");
        els.closeModal.onclick=()=>closeVideo(false);
        els.fullscreen.onclick=toggleFullscreen;
        els.modal.onclick=e=> {
            if(e.target===els.modal)closeVideo(false);
        };
        document.addEventListener("fullscreenchange",()=> {
            const full=!!document.fullscreenElement;
            els.fullscreen.innerHTML=`<i class="fa-solid ${full?"fa-compress":"fa-expand"}"></i>`;
            els.fullscreen.setAttribute("aria-label",full?"Exit fullscreen":"Enter fullscreen");
            els.escHint.textContent=full?"ESC to exit fullscreen":"ESC to close";
        });
        document.addEventListener("keydown",e=> {
            if(e.key!=="Escape")return;
            if(document.fullscreenElement)document.exitFullscreen().catch(()=> {
            });
            else if(els.modal.classList.contains("show"))closeVideo(false);
        });
        $("#notificationBtn")?.addEventListener("click",()=>notify("You have no new notifications."));
        startPolling();
    });
})();
