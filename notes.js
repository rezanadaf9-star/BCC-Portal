(() => {
    "use strict";
    const data=window.NOTES_DATA||[], subjects=(window.LECTURE_CONFIG?.subjects||[]), $=s=>document.querySelector(s), esc=v=>String(v??"").replace(/[&<>"']/g,c=>( {
        "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }
    [c]));
    let notes=[...data], objectUrls=[];
    const grid=$("#todayNotesGrid"), empty=$("#notesEmptyState"), count=$("#notesCount span"), status=$("#folderStatus");
    function localDateKey(d=new Date()) {
        const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,"0"),day=String(d.getDate()).padStart(2,"0"); return `${y}-${m}-${day}`
    }
    function todayNotes() {
        return notes.filter(n=>n.date===localDateKey()).sort((a,b)=>new Date(b.date||0)-new Date(a.date||0))
    }
    function renderToday() {
        objectUrls.forEach(URL.revokeObjectURL); objectUrls=[];
        const list=todayNotes(); grid.innerHTML=""; count.textContent=`${list.length} Note${list.length===1?"":"s"}`; empty.style.display=list.length?"none":"flex";
        list.forEach(n=> {
            const card=document.createElement("article"); card.className="today-note-card"; card.innerHTML=`<div class="today-note-top"><span class="today-note-subject"><i class="fa-solid fa-book-open"></i>${esc(n.subject)}</span><span class="today-note-type">PDF</span></div><div class="today-note-content"><h3>${esc(n.lecture||"Lecture Notes")}</h3><p>${esc(n.description||"Lecture notes for today's class.")}</p><div class="today-note-meta"><span><i class="fa-solid fa-layer-group"></i>${esc(n.chapter||"General")}</span><span><i class="fa-regular fa-calendar"></i>${esc(n.date||"")}</span></div><div class="today-note-actions"><button class="note-action-btn note-view-btn"><i class="fa-regular fa-eye"></i> View</button><button class="note-action-btn note-download-btn"><i class="fa-solid fa-download"></i> Download</button></div></div>`; card.querySelector(".note-view-btn").onclick=()=>viewPdf(n.pdf); card.querySelector(".note-download-btn").onclick=()=>downloadPdf(n.pdf,n.lecture||"lecture-notes"); grid.appendChild(card)
        })
    }
    function viewPdf(pdf) {
        if(!pdf) {
            alert("No PDF path configured."); return
        }
        window.open(pdf,"_blank","noopener")
    }
    function downloadPdf(pdf,name) {
        if(!pdf) {
            alert("No PDF path configured."); return
        }
        const a=document.createElement("a"); a.href=pdf; a.download=`${name.replace(/[^\w-]+/g,"-")}.pdf`; document.body.appendChild(a); a.click(); a.remove()
    }
    function renderSubjects() {
        const root=$("#subjectNotesGrid"); root.innerHTML=""; subjects.forEach(s=> {
            const a=document.createElement("a"); a.className="subject-note-card"; a.href=`notes-subject.html?subject=${encodeURIComponent(s.name)}`; a.innerHTML=`<div class="subject-note-icon ${s.id.split("-")[0]}-icon"><i class="fa-solid ${esc(s.icon)}"></i></div><div class="subject-note-content"><span>SUBJECT NOTES</span><h3>${esc(s.name)}</h3><p>${esc(s.description)}</p></div><i class="fa-solid fa-arrow-right subject-arrow"></i>`; root.appendChild(a)
        })
    }
    async function selectFolder() {
        if(!window.showDirectoryPicker) {
            status.textContent="Folder selection is not supported in this browser. Use notes-data.js or a server manifest."; return
        }
        try {
            const handle=await window.showDirectoryPicker( {
                mode:"read"
            }), found=[];
            async function walk(dir,parts=[]) {
                for await(const [name,h] of dir.entries()) {
                    if(h.kind==="directory")await walk(h,[...parts,name]); else if(name.toLowerCase().endsWith(".pdf")) {
                        const file=await h.getFile(); found.push( {
                            id:`local-${found.length}`,subject:parts[0]||"Other",chapter:parts[1]||"General",lecture:name.replace(/\.pdf$/i,""),date:new Date(file.lastModified).toISOString().slice(0,10),pdf:URL.createObjectURL(file),description:"PDF loaded from the selected Notes folder."
                        })
                    }
                }
            }
            await walk(handle); notes=found; status.textContent=`Selected folder: ${found.length} PDF${found.length===1?"":"s"} found.`; renderToday()
        }
        catch(e) {
            if(e?.name!=="AbortError")status.textContent="Could not read the selected folder."
        }
    }
$("#notificationBtn").onclick=()=> {
        const n=$("#notificationMessage"); n.querySelector("span").textContent="You have no new notifications."; n.classList.add("show"); setTimeout(()=>n.classList.remove("show"),3000)
    };
    renderSubjects(); renderToday();
})();
