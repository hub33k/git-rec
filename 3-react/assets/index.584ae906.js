import{j as l,r as i,R as p,a as h}from"./vendor.02b794c9.js";const m=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const u of t.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&c(u)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}};m();const o=l.exports.jsx,f=l.exports.jsxs,x=l.exports.Fragment,N=({quote:n})=>o(x,{children:o("div",{children:f("figure",{children:[o("blockquote",{children:o("p",{children:n.quote})}),f("figcaption",{children:["\u2014",n.author]})]})},n.quote)}),b="https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json",g=()=>{const[n,s]=i.exports.useState([]),[a,c]=i.exports.useState(!1),[e,t]=i.exports.useState({currentQuoteIndex:NaN,previousQuoteIndex:NaN});i.exports.useEffect(()=>{async function d(){return await fetch(b).then(r=>r.json()).then(r=>{s(r),c(!0)})}d()},[]);const u=()=>Math.floor(Math.random()*n.length);return f("div",{className:"app",children:[o("h1",{className:"app__title",children:"Quotes"}),o("button",{type:"button",className:"button",onClick:()=>{var r;const d=u();t({currentQuoteIndex:d,previousQuoteIndex:(r=e==null?void 0:e.currentQuoteIndex)!=null?r:NaN})},children:"Get a random quote"}),o("button",{type:"button",className:"button",disabled:isNaN(e.previousQuoteIndex),onClick:()=>{isNaN(e.previousQuoteIndex)||t({currentQuoteIndex:e.previousQuoteIndex,previousQuoteIndex:NaN})},children:"Get previous quote"}),o("hr",{}),a&&o("div",{className:"quotes",children:!isNaN(e.currentQuoteIndex)&&o(N,{quote:n[e.currentQuoteIndex]})})]})};p.render(o(h.StrictMode,{children:o(g,{})}),document.getElementById("root"));
