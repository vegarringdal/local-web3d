var Y=Object.defineProperty;var q=(h,d,y)=>d in h?Y(h,d,{enumerable:!0,configurable:!0,writable:!0,value:y}):h[d]=y;var m=(h,d,y)=>(q(h,typeof d!="symbol"?d+"":d,y),y);(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const h=Symbol("Comlink.proxy"),d=Symbol("Comlink.endpoint"),y=Symbol("Comlink.releaseProxy"),P=Symbol("Comlink.finalizer"),w=Symbol("Comlink.thrown"),k=e=>typeof e=="object"&&e!==null||typeof e=="function",C={canHandle:e=>k(e)&&e[h],serialize(e){const{port1:t,port2:n}=new MessageChannel;return A(e,t),[n,[n]]},deserialize(e){return e.start(),H(e)}},z={canHandle:e=>k(e)&&w in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},M=new Map([["proxy",C],["throw",z]]);function I(e,t){for(const n of e)if(t===n||n==="*"||n instanceof RegExp&&n.test(t))return!0;return!1}function A(e,t=globalThis,n=["*"]){t.addEventListener("message",function r(s){if(!s||!s.data)return;if(!I(n,s.origin)){console.warn(`Invalid origin '${s.origin}' for comlink proxy`);return}const{id:i,type:o,path:a}=Object.assign({path:[]},s.data),l=(s.data.argumentList||[]).map(f);let c;try{const _=a.slice(0,-1).reduce((u,E)=>u[E],e),g=a.reduce((u,E)=>u[E],e);switch(o){case"GET":c=g;break;case"SET":_[a.slice(-1)[0]]=f(s.data.value),c=!0;break;case"APPLY":c=g.apply(_,l);break;case"CONSTRUCT":{const u=new g(...l);c=B(u)}break;case"ENDPOINT":{const{port1:u,port2:E}=new MessageChannel;A(e,E),c=R(u,[u])}break;case"RELEASE":c=void 0;break;default:return}}catch(_){c={value:_,[w]:0}}Promise.resolve(c).catch(_=>({value:_,[w]:0})).then(_=>{const[g,u]=K(_);t.postMessage(Object.assign(Object.assign({},g),{id:i}),u),o==="RELEASE"&&(t.removeEventListener("message",r),L(t),P in e&&typeof e[P]=="function"&&e[P]())}).catch(_=>{const[g,u]=K({value:new TypeError("Unserializable return value"),[w]:0});t.postMessage(Object.assign(Object.assign({},g),{id:i}),u)})}),t.start&&t.start()}function U(e){return e.constructor.name==="MessagePort"}function L(e){U(e)&&e.close()}function H(e,t){return N(e,[],t)}function p(e){if(e)throw new Error("Proxy has been released and is not useable")}function D(e){return b(e,{type:"RELEASE"}).then(()=>{L(e)})}const S=new WeakMap,x="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(S.get(e)||0)-1;S.set(e,t),t===0&&D(e)});function V(e,t){const n=(S.get(t)||0)+1;S.set(t,n),x&&x.register(e,t,e)}function $(e){x&&x.unregister(e)}function N(e,t=[],n=function(){}){let r=!1;const s=new Proxy(n,{get(i,o){if(p(r),o===y)return()=>{$(s),D(e),r=!0};if(o==="then"){if(t.length===0)return{then:()=>s};const a=b(e,{type:"GET",path:t.map(l=>l.toString())}).then(f);return a.then.bind(a)}return N(e,[...t,o])},set(i,o,a){p(r);const[l,c]=K(a);return b(e,{type:"SET",path:[...t,o].map(_=>_.toString()),value:l},c).then(f)},apply(i,o,a){p(r);const l=t[t.length-1];if(l===d)return b(e,{type:"ENDPOINT"}).then(f);if(l==="bind")return N(e,t.slice(0,-1));const[c,_]=T(a);return b(e,{type:"APPLY",path:t.map(g=>g.toString()),argumentList:c},_).then(f)},construct(i,o){p(r);const[a,l]=T(o);return b(e,{type:"CONSTRUCT",path:t.map(c=>c.toString()),argumentList:a},l).then(f)}});return V(s,e),s}function j(e){return Array.prototype.concat.apply([],e)}function T(e){const t=e.map(K);return[t.map(n=>n[0]),j(t.map(n=>n[1]))]}const O=new WeakMap;function R(e,t){return O.set(e,t),e}function B(e){return Object.assign(e,{[h]:!0})}function K(e){for(const[t,n]of M)if(n.canHandle(e)){const[r,s]=n.serialize(e);return[{type:"HANDLER",name:t,value:r},s]}return[{type:"RAW",value:e},O.get(e)||[]]}function f(e){switch(e.type){case"HANDLER":return M.get(e.name).deserialize(e.value);case"RAW":return e.value}}function b(e,t,n){return new Promise(r=>{const s=F();e.addEventListener("message",function i(o){!o.data||!o.data.id||o.data.id!==s||(e.removeEventListener("message",i),r(o.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:s},t),n)})}function F(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}class W{constructor(t,n=1,r="DATA"){m(this,"__name");m(this,"__version");m(this,"__storeName");m(this,"__logEnabled");m(this,"__db");this.__name=t,this.__version=n,this.__storeName=r,this.__logEnabled=!1}enableLog(){this.__logEnabled=!0}__logStart(t){this.__logEnabled&&console.time(`ModelStoreLog_${this.__name}_${this.__storeName}_${t}`)}__logEnd(t){this.__logEnabled&&console.timeEnd(`ModelStoreLog_${this.__name}_${this.__storeName}_${t}`)}close(){return new Promise(t=>{this.__db&&(this.__db.close(),t(!0))})}__open(){return new Promise((t,n)=>{if(this.__db)t(this.__db);else{const r=indexedDB.open(this.__name,this.__version);r.onupgradeneeded=()=>{const s=r.result;s.objectStoreNames.contains(this.__name)||s.createObjectStore(this.__storeName)},r.onblocked=s=>{this.__logEnd("getKey"),n({type:"onblocked",event:s})},r.onerror=s=>{this.__logEnd("getKey"),n({type:"onblocked",event:s})},r.onsuccess=()=>{this.__db=r.result,t(r.result)}}})}getUUID(){return crypto.randomUUID()}getKey(t){return new Promise(async(n,r)=>{this.__logStart("getKey");try{const i=(await this.__open()).transaction(this.__storeName);i.onerror=l=>{this.__logEnd("getKey"),r({type:"store tx error",event:l})};const a=i.objectStore(this.__storeName).get(t);a.onsuccess=()=>{this.__logEnd("getKey"),n(a.result)}}catch(s){this.__logEnd("getKey"),r(s)}})}setKey(t,n){return new Promise(async(r,s)=>{var i;this.__logStart("setKey");try{const a=(await this.__open()).transaction(this.__storeName,"readwrite");a.onerror=_=>{this.__logEnd("setKey"),s({type:"store tx error",event:_})};const c=a.objectStore(this.__storeName).put(n,t);c.onsuccess=()=>{this.__logEnd("setKey"),r(c.result)},(i=c.transaction)==null||i.commit()}catch(o){this.__logEnd("setKey"),s(o)}})}getAllKeys(){return new Promise(async(t,n)=>{this.__logStart("getAllKeys");try{const s=(await this.__open()).transaction(this.__storeName,"readwrite");s.onerror=a=>{this.__logEnd("getAllKeys"),n({type:"store tx error",event:a})};const o=s.objectStore(this.__storeName).getAllKeys();o.onsuccess=()=>{this.__logEnd("getAllKeys"),t(o.result)}}catch(r){this.__logEnd("getAllKeys"),n(r)}})}deleteKey(t){return new Promise(async(n,r)=>{this.__logStart("deleteKey");try{const i=(await this.__open()).transaction(this.__storeName,"readwrite");i.onerror=l=>{this.__logEnd("deleteKey"),r({type:"store tx error",event:l})};const a=i.objectStore(this.__storeName).delete(t);a.onsuccess=()=>{this.__logEnd("deleteKey"),n(a.result)}}catch(s){this.__logEnd("deleteKey"),r(s)}})}deleteDB(){return new Promise((t,n)=>{this.__logStart("deleteDB");const r=indexedDB.deleteDatabase(this.__name);r.onsuccess=()=>{this.__logEnd("deleteDB"),t(!0)},r.onerror=s=>{this.__logEnd("deleteDB"),n({type:"onblocked",event:s})}})}}class G{constructor(t){m(this,"__modelStorage");this.__modelStorage=new W(t)}async getIds(t){return await this.__modelStorage.getKey(t)}async getModel(t){const n=this.__modelStorage,r=await this.__modelStorage.getKey(t);if(!r)return null;const s=[];return r.indexID=r.index,r.index=new Uint32Array(await n.getKey(r.index)),s.push(r.index.buffer),r.positionID=r.position,r.position=new Float32Array(await n.getKey(r.position)),s.push(r.position.buffer),R(r,s)}}A(G)})();