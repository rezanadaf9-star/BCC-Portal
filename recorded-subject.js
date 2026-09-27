(() => {
    "use strict";
    const cfg = window.LECTURE_CONFIG || {
    };
    const page = document.body.dataset.subject || "";
    const subject = (cfg.subjects || []).find(s => s.id === page);
    const all = Array.isArray(cfg.recordedLectures) ? cfg.recordedLectures : [];
    const subjectName = subject?.name || document.querySelector("#subjectName")?.textContent || "Subject";
    const listEl = document.querySelector("#subjectLectureList");
    const emptyEl = document.querySelector("#subjectEmpty");
    const search = document.querySelector("#subjectSearch");
    const countEl = document.querySelector("#subjectCount");
    const modal = document.querySelector("#subjectVideoModal");
    const frame = document.querySelector("#subjectVideoFrame");
    const player = document.querySelector("#subjectYoutubePlayer");
    const modalTitle = document.querySelector("#subjectVideoTitle");
    let ytApiReady = null;
    let ytPlayer = null;
    const esc = value => String(value ?? "").replace(/[&<>"']/g,c => ( {
        "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"
    }
    [c]));
    const validId = id => /^[A-Za-z0-9_-]{6,20}$/.test(String(id || "").trim());
    function notify(message) {
        const box=document.querySelector("#notificationMessage"); if(!box)return;
        box.querySelector("span").textContent=message; box.classList.add("show"); clearTimeout(notify.timer);
        notify.timer=setTimeout(()=>box.classList.remove("show"),3000);
    }
    function getSource(item) {
        if(String(item?.source || "").toLowerCase()==="local") return "local";
        if(item?.videoUrl && !item?.videoId) return "local";
        return "youtube";
    }
    function getYouTubeId(item) {
        if(validId(item?.videoId)) return String(item.videoId).trim();
        const url=String(item?.youtubeUrl || item?.videoUrl || "").trim();
        const match=url.match(/(?:v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/live\/)([A-Za-z0-9_-]{6,20})/);
        return match ? match[1] : "";
    }
    function loadYouTubeIframeAPI() {
        if(window.YT?.Player)return Promise.resolve(window.YT);
        if(ytApiReady)return ytApiReady;
        ytApiReady=new Promise((resolve,reject)=> {
            const old=window.onYouTubeIframeAPIReady;
            window.onYouTubeIframeAPIReady=()=> {
                if(typeof old==="function")old(); resolve(window.YT);
            };
            const script=document.createElement("script"); script.src="https://www.youtube.com/iframe_api"; script.async=true;
            script.onerror=()=>reject(new Error("Could not load YouTube IFrame API.")); document.head.appendChild(script);
        });
        return ytApiReady;
    }
    async function openVideo(item) {
        const source=getSource(item);
        const title=item.lecture||item.title||"Recorded Lecture";
        modalTitle.textContent=title;
        modal.classList.add("show"); modal.setAttribute("aria-hidden","false"); document.body.classList.add("modal-open");
        if(source==="local") {
            const url=String(item.videoUrl||"").trim();
            if(!url) {
                notify("No local MP4 path has been configured for this lecture."); closeVideo(false); return;
            }
            player.innerHTML=`<video id="subjectLocalVideo" class="local-video-player" controls autoplay playsinline preload="metadata"><source src="${esc(url)}" type="video/mp4">Your browser does not support this video.</video>`;
            const video=document.querySelector("#subjectLocalVideo");
            video?.addEventListener("ended",()=>closeVideo(true));
            video?.play().catch(()=> {
            });
            return;
        }
        const videoId=getYouTubeId(item);
        if(!validId(videoId)) {
            notify("This lecture does not have a valid YouTube video ID yet."); closeVideo(false); return;
        }
        try {
            await loadYouTubeIframeAPI();
            player.innerHTML="<div id=\"subjectYoutubePlayerInner\"></div>";
            ytPlayer=new YT.Player("subjectYoutubePlayerInner", {
                videoId,width:"100%",height:"100%",
                playerVars: {
                    autoplay:1,controls:1,rel:0,playsinline:1,enablejsapi:1,origin:window.location.origin,fs:1
                },
                events: {
                    onReady:e=> {
                        try {
                            e.target.playVideo();
                        }
                        catch {
                        }
                    },
                    onStateChange:e=> {
                        if(e.data===YT.PlayerState.ENDED)closeVideo(true);
                    }
                }
            });
        }
        catch(error) {
            console.error(error);
            player.innerHTML=`<div class="player-error"><i class="fa-solid fa-triangle-exclamation"></i><p>Unable to load the YouTube player right now.</p></div>`;
            notify("YouTube player could not be loaded.");
        }
    }
    function closeVideo(fromEnded=false) {
        try {
            ytPlayer?.stopVideo?.();
        }
        catch {
        }
        ytPlayer=null;
        const video=document.querySelector("#subjectLocalVideo");
        try {
            video?.pause?.();
        }
        catch {
        }
        modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); document.body.classList.remove("modal-open"); player.innerHTML="";
        if(document.fullscreenElement)document.exitFullscreen().catch(()=> {
        });
        if(fromEnded)notify("Lecture finished. Returning to the subject page.");
    }
    function render(query="") {
        const q=query.trim().toLowerCase();
        const items=all.filter(x=>String(x.subject||"").toLowerCase()===subjectName.toLowerCase())
        .filter(x=>[x.chapter,x.lecture,x.title,x.teacher].join(" ").toLowerCase().includes(q));
        items.sort((a,b)=>new Date(b.date||0)-new Date(a.date||0)||(b.order??0)-(a.order??0));
        countEl.textContent=`${items.length} Lecture${items.length===1?"":"s"}`;
        listEl.innerHTML=""; emptyEl.hidden=items.length>0;
        const grouped= {
        };
        items.forEach(x=> {
            const ch=x.chapter||"General"; (grouped[ch]??=[]).push(x);
        });
        Object.entries(grouped).forEach(([chapter,lectures])=> {
            const block=document.createElement("div"); block.className="chapter-block";
            block.innerHTML=`<div class="chapter-heading"><h3>${esc(chapter)}</h3><span>${lectures.length} lecture${lectures.length===1?"":"s"}</span></div>`;
            lectures.forEach((x,i)=> {
                const row=document.createElement("div"); row.className="lecture-row";
                const source=getSource(x);
                const sourceLabel=source==="local"?"LOCAL MP4":"YOUTUBE";
                row.innerHTML=`<div class="lecture-number">${i+1}</div><div class="lecture-row-info"><h4>${esc(x.lecture||x.title||"Lecture")}</h4><p>${esc(x.date||"Date not specified")}${x.duration?` • $ {
                    esc(x.duration)
                }
                `:""}${x.teacher?` • $ {
                    esc(x.teacher)
                }
                `:""} • ${sourceLabel}</p></div><button type="button" class="watch-btn"><i class="fa-solid fa-play"></i> Watch</button>`;
                row.querySelector("button").addEventListener("click",()=>openVideo(x));
                block.appendChild(row);
            });
            listEl.appendChild(block);
        });
    }
    document.querySelector("#closeSubjectVideo")?.addEventListener("click",()=>closeVideo(false));
    modal?.addEventListener("click",e=> {
        if(e.target===modal)closeVideo(false);
    });
    document.querySelector("#subjectFullscreen")?.addEventListener("click",()=>document.fullscreenElement?document.exitFullscreen():frame.requestFullscreen?.());
    document.addEventListener("fullscreenchange",()=> {
        const btn=document.querySelector("#subjectFullscreen"),hint=document.querySelector("#subjectEsc"); if(btn)btn.innerHTML=`<i class="fa-solid ${document.fullscreenElement?"fa-compress":"fa-expand"}"></i>`; if(hint)hint.textContent=document.fullscreenElement?"ESC to exit fullscreen":"ESC to close";
    });
    document.addEventListener("keydown",e=> {
        if(e.key!=="Escape")return; if(document.fullscreenElement)document.exitFullscreen().catch(()=> {
        }); else if(modal?.classList.contains("show"))closeVideo(false);
    });
    search?.addEventListener("input",()=>render(search.value));
    document.querySelector("#notificationBtn")?.addEventListener("click",()=>notify("You have no new notifications."));
    document.querySelector("#subjectName").textContent=subjectName;
    document.querySelector("#subjectDescription").textContent=subject?.description||`Latest recorded ${subjectName} lectures, organised chapter-wise.`;
    const icon=document.querySelector("#subjectIcon"); if(icon)icon.className=`fa-solid ${subject?.icon||"fa-book-open"}`;
    render();
})();
