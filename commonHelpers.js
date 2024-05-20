import{a as g,S as L,i as d}from"./assets/vendor-eded45c0.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const b=r=>r.reduce((t,{tags:o,webformatURL:n,largeImageURL:e,likes:s,views:i,comments:m,downloads:y})=>t+`<li class="photo-container">
      <a href=${e} class="card-link js-card-link">
          <img class="photo" src="${n}" alt="${o}" >
      </a>
      <div class="info">
          <div class="info-item">
              <span class="title">Likes</span>
              <span class="info">${s}</span>
          </div>
          <div class="info-item">
              <span class="title">Views</span>
              <span class="info">${i}</span>
          </div>
          <div class="info-item">
              <span class="title">Comments</span>
              <span class="info">${m}</span>
          </div>
          <div class="info-item">
              <span class="title">Downloads</span>
              <span class="info">${y}</span>
          </div>
      </div>
  </li>
      `,""),v="43815312-9bcb5c50dbaea15779df2a9f9",S="https://pixabay.com/api/",w=async(r,t)=>(await g(S,{params:{key:v,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:15}})).data,f=document.querySelector(".gallery"),P=document.querySelector(".search-form"),c=document.querySelector(".loader"),a=document.querySelector(".photo-btn");let l=1;const q=15;let h="";const E=new L(".gallery a",{captionsData:"alt",captionsDelay:250});P.addEventListener("submit",B);a.addEventListener("click",$);function M(){a.classList.remove("is-hidden-btn"),a.disabled=!1}function u(){a.classList.add("is-hidden-btn"),a.disabled=!0}async function p(r,t){c.classList.remove("is-hidden"),a.disabled=!0;try{const o=await w(r,t);o.hits.length===0?(d.error({message:"Sorry, there are no images matching your search query. Please try again!"}),u()):(f.insertAdjacentHTML("beforeend",b(o.hits)),E.refresh(),t*q>=o.totalHits?(u(),d.info({message:"We're sorry, but you've reached the end of search results."})):M())}catch(o){console.error("Error fetching photos:",o)}finally{c.classList.add("is-hidden"),a.disabled=!1}}async function $(){a.disabled||(l++,await p(h,l),D())}async function B(r){r.preventDefault();const t=r.target.elements.searchKeyword.value.trim();if(f.innerHTML="",t==="")return u(),d.error({message:"Sorry, there are no images matching your search query. Please try again!"});h=t,c.classList.remove("is-hidden");try{l=1,await p(t,l)}catch(o){console.error("Error during search:",o)}finally{r.target.reset(),c.classList.add("is-hidden")}}function D(){const{height:r}=document.querySelector(".photo-container").firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
