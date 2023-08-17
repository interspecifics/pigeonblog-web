import{i as Ve,f as Ne,h as te,j as Te,s as Ie,n as B,o as Ae}from"../chunks/scheduler.4b895fe1.js";import{p as $e,t as J,b as we,d as X,S as Ce,i as je,g as E,m as g,s as A,h as I,j as C,n as b,f as p,c as L,k as V,a as j,x as _,y as Pe,o as $,e as de,z as Oe,A as ve,l as Le,B as Se,r as Be,u as Re,v as He,w as Ue}from"../chunks/index.50a48fb0.js";function pe(t,e){const a=e.token={};function s(o,r,m,d){if(e.token!==a)return;e.resolved=d;let f=e.ctx;m!==void 0&&(f=f.slice(),f[m]=d);const c=o&&(e.current=o)(f);let i=!1;e.block&&(e.blocks?e.blocks.forEach((l,u)=>{u!==r&&l&&($e(),J(l,1,1,()=>{e.blocks[u]===l&&(e.blocks[u]=null)}),we())}):e.block.d(1),c.c(),X(c,1),c.m(e.mount(),e.anchor),i=!0),e.block=c,e.blocks&&(e.blocks[r]=c),i&&Te()}if(Ve(t)){const o=Ne();if(t.then(r=>{te(o),s(e.then,1,e.value,r),te(null)},r=>{if(te(o),s(e.catch,2,e.error,r),te(null),!e.hasCatch)throw r}),e.current!==e.pending)return s(e.pending,0),!0}else{if(e.current!==e.then)return s(e.then,1,e.value,t),!0;e.resolved=t}}function Xe(t,e,a){const s=e.slice(),{resolved:o}=t;t.current===t.then&&(s[t.value]=o),t.current===t.catch&&(s[t.error]=o),t.block.p(s,a)}function le(t){return(t==null?void 0:t.length)!==void 0?t:Array.from(t)}function qe(t){let e,a,s=t[2](t[0].timestamp)+"",o,r,m,d,f,c=t[0].pigeon+"",i,l,u,n,h=t[1](t[0].lat)+"",v,w,R=t[1](t[0].lon)+"",H,q,se,P,ne,M=t[1](t[0].temp)+"",K,ae,y=t[1](t[0].pres)+"",Q,oe,z=t[1](t[0].alti)+"",W,re,O,ce,F=t[0].NH3+"",Y,ue,Z=t[0].OXI+"",x,ie,G=t[0].RED+"",ee,me,_e;return{c(){e=E("div"),a=E("button"),o=g(s),r=A(),m=E("div"),d=E("div"),f=g("Pigeon: "),i=g(c),l=A(),u=E("div"),n=g("Location: ("),v=g(h),w=g(", "),H=g(R),q=g(")"),se=A(),P=E("div"),ne=g("Temp: "),K=g(M),ae=g(", Press: "),Q=g(y),oe=g(", Alt: "),W=g(z),re=A(),O=E("div"),ce=g("NH3: "),Y=g(F),ue=g(", OXI: "),x=g(Z),ie=g(", RED: "),ee=g(G),this.h()},l(k){e=I(k,"DIV",{class:!0});var D=C(e);a=I(D,"BUTTON",{class:!0});var fe=C(a);o=b(fe,s),fe.forEach(p),r=L(D),m=I(D,"DIV",{class:!0});var S=C(m);d=I(S,"DIV",{class:!0});var he=C(d);f=b(he,"Pigeon: "),i=b(he,c),he.forEach(p),l=L(S),u=I(S,"DIV",{class:!0});var U=C(u);n=b(U,"Location: ("),v=b(U,h),w=b(U,", "),H=b(U,R),q=b(U,")"),U.forEach(p),se=L(S),P=I(S,"DIV",{class:!0});var N=C(P);ne=b(N,"Temp: "),K=b(N,M),ae=b(N,", Press: "),Q=b(N,y),oe=b(N,", Alt: "),W=b(N,z),N.forEach(p),re=L(S),O=I(S,"DIV",{class:!0});var T=C(O);ce=b(T,"NH3: "),Y=b(T,F),ue=b(T,", OXI: "),x=b(T,Z),ie=b(T,", RED: "),ee=b(T,G),T.forEach(p),S.forEach(p),D.forEach(p),this.h()},h(){V(a,"class","card-title svelte-1igr9mo"),V(d,"class",""),V(u,"class",""),V(P,"class",""),V(O,"class",""),V(m,"class","card-content hide svelte-1igr9mo"),V(e,"class","card-container svelte-1igr9mo")},m(k,D){j(k,e,D),_(e,a),_(a,o),_(e,r),_(e,m),_(m,d),_(d,f),_(d,i),_(m,l),_(m,u),_(u,n),_(u,v),_(u,w),_(u,H),_(u,q),_(m,se),_(m,P),_(P,ne),_(P,K),_(P,ae),_(P,Q),_(P,oe),_(P,W),_(m,re),_(m,O),_(O,ce),_(O,Y),_(O,ue),_(O,x),_(O,ie),_(O,ee),me||(_e=Pe(a,"click",t[3]),me=!0)},p(k,[D]){D&1&&s!==(s=k[2](k[0].timestamp)+"")&&$(o,s),D&1&&c!==(c=k[0].pigeon+"")&&$(i,c),D&1&&h!==(h=k[1](k[0].lat)+"")&&$(v,h),D&1&&R!==(R=k[1](k[0].lon)+"")&&$(H,R),D&1&&M!==(M=k[1](k[0].temp)+"")&&$(K,M),D&1&&y!==(y=k[1](k[0].pres)+"")&&$(Q,y),D&1&&z!==(z=k[1](k[0].alti)+"")&&$(W,z),D&1&&F!==(F=k[0].NH3+"")&&$(Y,F),D&1&&Z!==(Z=k[0].OXI+"")&&$(x,Z),D&1&&G!==(G=k[0].RED+"")&&$(ee,G)},i:B,o:B,d(k){k&&p(e),me=!1,_e()}}}function Me(t,e,a){let{measurement:s}=e;const o=d=>d.toFixed(4),r=d=>new Date(d).toISOString(),m=d=>{var i;const c=(i=d.target.parentNode)==null?void 0:i.querySelector(".card-content");c==null||c.classList.toggle("hide")};return t.$$set=d=>{"measurement"in d&&a(0,s=d.measurement)},[s,o,r,m]}class ye extends Ce{constructor(e){super(),je(this,e,Me,qe,Ie,{measurement:0})}}function ge(t,e,a){const s=t.slice();return s[9]=e[a],s}function be(t,e,a){const s=t.slice();return s[13]=e[a],s}function ke(t){let e,a=t[4](t[13])+"",s,o;return{c(){e=E("option"),s=g(a),this.h()},l(r){e=I(r,"OPTION",{});var m=C(e);s=b(m,a),m.forEach(p),this.h()},h(){e.__value=o=t[13],ve(e,e.__value)},m(r,m){j(r,e,m),_(e,s)},p(r,m){m&1&&a!==(a=r[4](r[13])+"")&&$(s,a),m&1&&o!==(o=r[13])&&(e.__value=o,ve(e,e.__value))},d(r){r&&p(e)}}}function ze(t){let e,a=t[12].message+"",s;return{c(){e=E("p"),s=g(a),this.h()},l(o){e=I(o,"P",{style:!0});var r=C(e);s=b(r,a),r.forEach(p),this.h()},h(){Le(e,"color","red")},m(o,r){j(o,e,r),_(e,s)},p(o,r){r&2&&a!==(a=o[12].message+"")&&$(s,a)},i:B,o:B,d(o){o&&p(e)}}}function Fe(t){let e,a="Pigeons:",s,o,r=t[3](t[8]).join(", ")+"",m,d,f,c,i=le(t[8]),l=[];for(let n=0;n<i.length;n+=1)l[n]=De(ge(t,i,n));const u=n=>J(l[n],1,1,()=>{l[n]=null});return{c(){e=E("div"),e.textContent=a,s=A(),o=E("div"),m=g(r),d=A(),f=E("div");for(let n=0;n<l.length;n+=1)l[n].c();this.h()},l(n){e=I(n,"DIV",{"data-svelte-h":!0}),Se(e)!=="svelte-nfdatt"&&(e.textContent=a),s=L(n),o=I(n,"DIV",{});var h=C(o);m=b(h,r),h.forEach(p),d=L(n),f=I(n,"DIV",{class:!0});var v=C(f);for(let w=0;w<l.length;w+=1)l[w].l(v);v.forEach(p),this.h()},h(){V(f,"class","cards-container svelte-1j7en9v")},m(n,h){j(n,e,h),j(n,s,h),j(n,o,h),_(o,m),j(n,d,h),j(n,f,h);for(let v=0;v<l.length;v+=1)l[v]&&l[v].m(f,null);c=!0},p(n,h){if((!c||h&2)&&r!==(r=n[3](n[8]).join(", ")+"")&&$(m,r),h&2){i=le(n[8]);let v;for(v=0;v<i.length;v+=1){const w=ge(n,i,v);l[v]?(l[v].p(w,h),X(l[v],1)):(l[v]=De(w),l[v].c(),X(l[v],1),l[v].m(f,null))}for($e(),v=i.length;v<l.length;v+=1)u(v);we()}},i(n){if(!c){for(let h=0;h<i.length;h+=1)X(l[h]);c=!0}},o(n){l=l.filter(Boolean);for(let h=0;h<l.length;h+=1)J(l[h]);c=!1},d(n){n&&(p(e),p(s),p(o),p(d),p(f)),Oe(l,n)}}}function De(t){let e,a;return e=new ye({props:{measurement:t[9]}}),{c(){Be(e.$$.fragment)},l(s){Re(e.$$.fragment,s)},m(s,o){He(e,s,o),a=!0},p(s,o){const r={};o&2&&(r.measurement=s[9]),e.$set(r)},i(s){a||(X(e.$$.fragment,s),a=!0)},o(s){J(e.$$.fragment,s),a=!1},d(s){Ue(e,s)}}}function Ze(t){let e,a="...waiting";return{c(){e=E("p"),e.textContent=a},l(s){e=I(s,"P",{"data-svelte-h":!0}),Se(e)!=="svelte-mv6tav"&&(e.textContent=a)},m(s,o){j(s,e,o)},p:B,i:B,o:B,d(s){s&&p(e)}}}function Ge(t){let e,a,s,o,r,m,d,f=le(t[0]),c=[];for(let l=0;l<f.length;l+=1)c[l]=ke(be(t,f,l));let i={ctx:t,current:null,token:null,hasCatch:!0,pending:Ze,then:Fe,catch:ze,value:8,error:12,blocks:[,,,]};return pe(o=t[1],i),{c(){e=E("select");for(let l=0;l<c.length;l+=1)c[l].c();a=A(),s=de(),i.block.c()},l(l){e=I(l,"SELECT",{});var u=C(e);for(let n=0;n<c.length;n+=1)c[n].l(u);u.forEach(p),a=L(l),s=de(),i.block.l(l)},m(l,u){j(l,e,u);for(let n=0;n<c.length;n+=1)c[n]&&c[n].m(e,null);j(l,a,u),j(l,s,u),i.block.m(l,i.anchor=u),i.mount=()=>s.parentNode,i.anchor=s,r=!0,m||(d=Pe(e,"change",t[2]),m=!0)},p(l,[u]){if(t=l,u&17){f=le(t[0]);let n;for(n=0;n<f.length;n+=1){const h=be(t,f,n);c[n]?c[n].p(h,u):(c[n]=ke(h),c[n].c(),c[n].m(e,null))}for(;n<c.length;n+=1)c[n].d(1);c.length=f.length}i.ctx=t,u&2&&o!==(o=t[1])&&pe(o,i)||Xe(i,t,u)},i(l){r||(X(i.block),r=!0)},o(l){for(let u=0;u<3;u+=1){const n=i.blocks[u];J(n)}r=!1},d(l){l&&(p(e),p(a),p(s)),Oe(c,l),i.block.d(l),i.token=null,i=null,m=!1,d()}}}const Ee="https://pigeonblog-db-default-rtdb.firebaseio.com";function Je(t,e,a){const s=async l=>{l=l||1;const u=l+24*60*60*1e3,n=`${Ee}/measurements.json`,h=`orderBy="timestamp"&startAt=${l}&endAt=${u}`,w=await(await fetch(`${n}?${h}`)).json();return Object.values(w).sort((H,q)=>H.timestamp-q.timestamp)},o=async()=>{const u=await(await fetch(`${Ee}/sessions.json`)).json();return Object.keys(u).map(h=>parseInt(h))},r=l=>{const u=l.target;f=parseInt(u.value),a(1,i=s(f))},m=l=>{const u=l.reduce((n,h)=>n.add(h.pigeon),new Set);return Array.from(u).sort()},d=l=>new Date(l).toLocaleDateString("en-us",{timeZone:"UTC",weekday:"long",year:"numeric",month:"short",day:"numeric"});let f=0,c=[],i=new Promise(()=>{});return Ae(async()=>{a(0,c=await o()),f=c[0],a(1,i=s(f))}),[c,i,r,m,d]}class We extends Ce{constructor(e){super(),je(this,e,Je,Ge,Ie,{})}}export{We as component};
