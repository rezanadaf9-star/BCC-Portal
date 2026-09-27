(() => {
    "use strict";
    const cfg=window.LECTURE_CONFIG|| {
    }, $=s=>document.querySelector(s), esc=v=>String(v??"").replace(/[&<>"']/g,c=>( {
        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }
    [c]));
    const root=$("#downloadedLibrary"), empty=$("#downloadedEmpty"), count=$("#downloadCount"), search=$("#searchDownloads");
    let all=[...(cfg.downloadedLectures||[])];
    const modal=$("#downloadedVideoModal"), frame=$("#downloadedVideoFrame"), playerBox=$("#downloadedPlayer"), titleEl=$("#downloadedVideoTitle");
    let currentVideo=null;
    function notify(m) {
        const n=$("#notificationMessage"); if(!n)return; n.querySelector("span").textContent=m; n.classList.add("show"); clearTimeout(notify.t); notify.t=setTimeout(()=>n.classList.remove("show"),3000)
    }
    function openVideo(x) {
        const url=String(x.videoUrl||"").trim();
        if(!url) {
            notify("No local video path has been configured for this lecture."); return;
        }
        titleEl.textContent=x.lecture||x.title||"Saved Lecture";
        modal.classList.add("show"); modal.setAttribute("aria-hidden","false"); document.body.classList.add("modal-open");
        playerBox.innerHTML=`<video id="downloadedLocalVideo" class="local-video-player" controls autoplay playsinline preload="metadata"><source src="${esc(url)}" type="video/mp4">Your browser does not support this video.</video>`;
        currentVideo=$("#downloadedLocalVideo"); currentVideo.addEventListener("ended",()=>closeVideo(true)); currentVideo.play().catch(()=> {
        });
    }
    function closeVideo(fromEnded=false) {
        try {
            currentVideo?.pause?.()
        }
        catch {
        }
        currentVideo=null; modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); document.body.classList.remove("modal-open"); playerBox.innerHTML=""; if(document.fullscreenElement)document.exitFullscreen().catch(()=> {
        }); if(fromEnded)notify("Lecture finished. Returning to Downloaded Lectures.")
    }
    function render(list) {
        root.innerHTML=""; list.sort((a,b)=>new Date(b.date||0)-new Date(a.date||0)); count.textContent=`${list.length} Saved`; empty.style.display=list.length?"none":"flex"; list.forEach(x=> {
            const row=document.createElement("article"); row.className="download-row"; row.innerHTML=`<div class="download-icon"><i class="fa-solid fa-file-video"></i></div><div class="download-info"><h3>${esc(x.lecture||x.title||"Saved Lecture")}</h3><p>${esc(x.subject||"")} ${x.chapter?"• "+esc(x.chapter):""} ${x.date?"• "+esc(x.date):""} ${x.size?"• "+esc(x.size):""}</p></div><div class="download-actions"><button type="button" class="secondary-btn"><i class="fa-solid fa-play"></i> Watch</button></div>`; row.querySelector("button").addEventListener("click",()=>openVideo(x)); root.appendChild(row)
        })
    }
    search?.addEventListener("input",()=> {
        const q=search.value.toLowerCase().trim(); render(all.filter(x=>[x.subject,x.chapter,x.lecture,x.title,x.date].join(" ").toLowerCase().includes(q)))
    });
    $("#notificationBtn")?.addEventListener("click",()=>notify("You have no new notifications."));
    $("#closeDownloadedVideo")?.addEventListener("click",()=>closeVideo(false));
    modal?.addEventListener("click",e=> {
        if(e.target===modal)closeVideo(false)
    });
    $("#downloadedFullscreen")?.addEventListener("click",()=>document.fullscreenElement?document.exitFullscreen():frame.requestFullscreen?.());
    document.addEventListener("fullscreenchange",()=> {
        const btn=$("#downloadedFullscreen"),hint=$("#downloadedEsc"); if(btn)btn.innerHTML=`<i class="fa-solid ${document.fullscreenElement?"fa-compress":"fa-expand"}"></i>`; if(hint)hint.textContent=document.fullscreenElement?"ESC to exit fullscreen":"ESC to close"
    });
    document.addEventListener("keydown",e=> {
        if(e.key!=="Escape")return; if(document.fullscreenElement)document.exitFullscreen().catch(()=> {
        }); else if(modal?.classList.contains("show"))closeVideo(false)
    });
    render(all);
})();
