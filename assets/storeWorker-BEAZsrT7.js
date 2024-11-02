var Pe=Object.defineProperty;var Be=(S,x,R)=>x in S?Pe(S,x,{enumerable:!0,configurable:!0,writable:!0,value:R}):S[x]=R;var A=(S,x,R)=>Be(S,typeof x!="symbol"?x+"":x,R);(function(){"use strict";/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const S=Symbol("Comlink.proxy"),x=Symbol("Comlink.endpoint"),R=Symbol("Comlink.releaseProxy"),J=Symbol("Comlink.finalizer"),j=Symbol("Comlink.thrown"),ne=n=>typeof n=="object"&&n!==null||typeof n=="function",fe={canHandle:n=>ne(n)&&n[S],serialize(n){const{port1:e,port2:t}=new MessageChannel;return X(n,e),[t,[t]]},deserialize(n){return n.start(),we(n)}},ge={canHandle:n=>ne(n)&&j in n,serialize({value:n}){let e;return n instanceof Error?e={isError:!0,value:{message:n.message,name:n.name,stack:n.stack}}:e={isError:!1,value:n},[e,[]]},deserialize(n){throw n.isError?Object.assign(new Error(n.value.message),n.value):n.value}},re=new Map([["proxy",fe],["throw",ge]]);function de(n,e){for(const t of n)if(e===t||t==="*"||t instanceof RegExp&&t.test(e))return!0;return!1}function X(n,e=globalThis,t=["*"]){e.addEventListener("message",function r(s){if(!s||!s.data)return;if(!de(t,s.origin)){console.warn(`Invalid origin '${s.origin}' for comlink proxy`);return}const{id:_,type:c,path:i}=Object.assign({path:[]},s.data),u=(s.data.argumentList||[]).map(T);let d;try{const w=i.slice(0,-1).reduce((m,y)=>m[y],n),h=i.reduce((m,y)=>m[y],n);switch(c){case"GET":d=h;break;case"SET":w[i.slice(-1)[0]]=T(s.data.value),d=!0;break;case"APPLY":d=h.apply(w,u);break;case"CONSTRUCT":{const m=new h(...u);d=xe(m)}break;case"ENDPOINT":{const{port1:m,port2:y}=new MessageChannel;X(n,y),d=pe(m,[m])}break;case"RELEASE":d=void 0;break;default:return}}catch(w){d={value:w,[j]:0}}Promise.resolve(d).catch(w=>({value:w,[j]:0})).then(w=>{const[h,m]=H(w);e.postMessage(Object.assign(Object.assign({},h),{id:_}),m),c==="RELEASE"&&(e.removeEventListener("message",r),se(e),J in n&&typeof n[J]=="function"&&n[J]())}).catch(w=>{const[h,m]=H({value:new TypeError("Unserializable return value"),[j]:0});e.postMessage(Object.assign(Object.assign({},h),{id:_}),m)})}),e.start&&e.start()}function be(n){return n.constructor.name==="MessagePort"}function se(n){be(n)&&n.close()}function we(n,e){return Z(n,[],e)}function z(n){if(n)throw new Error("Proxy has been released and is not useable")}function oe(n){return N(n,{type:"RELEASE"}).then(()=>{se(n)})}const W=new WeakMap,$="FinalizationRegistry"in globalThis&&new FinalizationRegistry(n=>{const e=(W.get(n)||0)-1;W.set(n,e),e===0&&oe(n)});function me(n,e){const t=(W.get(e)||0)+1;W.set(e,t),$&&$.register(n,e,n)}function he(n){$&&$.unregister(n)}function Z(n,e=[],t=function(){}){let r=!1;const s=new Proxy(t,{get(_,c){if(z(r),c===R)return()=>{he(s),oe(n),r=!0};if(c==="then"){if(e.length===0)return{then:()=>s};const i=N(n,{type:"GET",path:e.map(u=>u.toString())}).then(T);return i.then.bind(i)}return Z(n,[...e,c])},set(_,c,i){z(r);const[u,d]=H(i);return N(n,{type:"SET",path:[...e,c].map(w=>w.toString()),value:u},d).then(T)},apply(_,c,i){z(r);const u=e[e.length-1];if(u===x)return N(n,{type:"ENDPOINT"}).then(T);if(u==="bind")return Z(n,e.slice(0,-1));const[d,w]=_e(i);return N(n,{type:"APPLY",path:e.map(h=>h.toString()),argumentList:d},w).then(T)},construct(_,c){z(r);const[i,u]=_e(c);return N(n,{type:"CONSTRUCT",path:e.map(d=>d.toString()),argumentList:i},u).then(T)}});return me(s,n),s}function ye(n){return Array.prototype.concat.apply([],n)}function _e(n){const e=n.map(H);return[e.map(t=>t[0]),ye(e.map(t=>t[1]))]}const ie=new WeakMap;function pe(n,e){return ie.set(n,e),n}function xe(n){return Object.assign(n,{[S]:!0})}function H(n){for(const[e,t]of re)if(t.canHandle(n)){const[r,s]=t.serialize(n);return[{type:"HANDLER",name:e,value:r},s]}return[{type:"RAW",value:n},ie.get(n)||[]]}function T(n){switch(n.type){case"HANDLER":return re.get(n.name).deserialize(n.value);case"RAW":return n.value}}function N(n,e,t){return new Promise(r=>{const s=Ee();n.addEventListener("message",function _(c){!c.data||!c.data.id||c.data.id!==s||(n.removeEventListener("message",_),r(c.data))}),n.start&&n.start(),n.postMessage(Object.assign({id:s},e),t)})}function Ee(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}function Se(n){if(n)return n.project_key;throw"getActiveProjectModelGroupKey called without active prosjekt selected"}function Ae(n){return`META_${n}`}class Te{constructor(e,t=1,r="DATA"){A(this,"__name");A(this,"__version");A(this,"__storeName");A(this,"__logEnabled");A(this,"__db");this.__name=e,this.__version=t,this.__storeName=r,this.__logEnabled=!1}enableLog(){this.__logEnabled=!0}__logStart(e){this.__logEnabled&&console.time(`ModelStoreLog_${this.__name}_${this.__storeName}_${e}`)}__logEnd(e){this.__logEnabled&&console.timeEnd(`ModelStoreLog_${this.__name}_${this.__storeName}_${e}`)}close(){return new Promise(e=>{this.__db&&(this.__db.close(),e(!0))})}__open(){return new Promise((e,t)=>{if(this.__db)e(this.__db);else{const r=indexedDB.open(this.__name,this.__version);r.onupgradeneeded=()=>{const s=r.result;s.objectStoreNames.contains(this.__name)||s.createObjectStore(this.__storeName)},r.onblocked=s=>{this.__logEnd("getKey"),t({type:"onblocked",event:s})},r.onerror=s=>{this.__logEnd("getKey"),t({type:"onblocked",event:s})},r.onsuccess=()=>{this.__db=r.result,e(r.result)}}})}getUUID(){return crypto.randomUUID()}getJsonKey(e){return new Promise(async(t,r)=>{this.__logStart("getKey");try{const _=(await this.__open()).transaction(this.__storeName);_.onerror=u=>{this.__logEnd("getKey"),r({type:"store tx error",event:u})};const i=_.objectStore(this.__storeName).get(e);i.onsuccess=()=>{this.__logEnd("getKey"),t(i.result)}}catch(s){this.__logEnd("getKey"),r(s)}})}getBufferKey(e){return new Promise(async(t,r)=>{this.__logStart("getKey");try{const _=(await this.__open()).transaction(this.__storeName);_.onerror=u=>{this.__logEnd("getKey"),r({type:"store tx error",event:u})};const i=_.objectStore(this.__storeName).get(e);i.onsuccess=()=>{this.__logEnd("getKey"),t(i.result)}}catch(s){this.__logEnd("getKey"),r(s)}})}setJsonKey(e,t){return new Promise(async(r,s)=>{var _;this.__logStart("setKey");try{const i=(await this.__open()).transaction(this.__storeName,"readwrite");i.onerror=w=>{this.__logEnd("setKey"),s({type:"store tx error",event:w})};const d=i.objectStore(this.__storeName).put(t,e);d.onsuccess=()=>{this.__logEnd("setKey"),r(d.result)},(_=d.transaction)==null||_.commit()}catch(c){this.__logEnd("setKey"),s(c)}})}setBufferKey(e,t){return new Promise(async(r,s)=>{var _;this.__logStart("setKey");try{const i=(await this.__open()).transaction(this.__storeName,"readwrite");i.onerror=w=>{this.__logEnd("setKey"),s({type:"store tx error",event:w})};const d=i.objectStore(this.__storeName).put(t,e);d.onsuccess=()=>{this.__logEnd("setKey"),r(d.result)},(_=d.transaction)==null||_.commit()}catch(c){this.__logEnd("setKey"),s(c)}})}deleteKey(e){return new Promise(async(t,r)=>{this.__logStart("deleteKey");try{const _=(await this.__open()).transaction(this.__storeName,"readwrite");_.onerror=u=>{this.__logEnd("deleteKey"),r({type:"store tx error",event:u})};const i=_.objectStore(this.__storeName).delete(e);i.onsuccess=()=>{this.__logEnd("deleteKey"),t(i.result)}}catch(s){this.__logEnd("deleteKey"),r(s)}})}deleteDB(){return new Promise((e,t)=>{this.__logStart("deleteDB");const r=indexedDB.deleteDatabase(this.__name);r.onsuccess=()=>{this.__logEnd("deleteDB"),e(!0)},r.onerror=s=>{this.__logEnd("deleteDB"),t({type:"onblocked",event:s})}})}}let o;const E=new Array(128).fill(void 0);E.push(void 0,null,!0,!1);function l(n){return E[n]}let O=E.length;function Le(n){n<132||(E[n]=O,O=n)}function g(n){const e=l(n);return Le(n),e}function Q(n){return n==null}let v=null;function Re(){return(v===null||v.byteLength===0)&&(v=new Float64Array(o.memory.buffer)),v}let K=null;function L(){return(K===null||K.byteLength===0)&&(K=new Int32Array(o.memory.buffer)),K}const ce=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&ce.decode();let C=null;function M(){return(C===null||C.byteLength===0)&&(C=new Uint8Array(o.memory.buffer)),C}function Y(n,e){return n=n>>>0,ce.decode(M().subarray(n,n+e))}function f(n){O===E.length&&E.push(E.length+1);const e=O;return O=E[e],E[e]=n,e}let b=0;const V=typeof TextEncoder<"u"?new TextEncoder("utf-8"):{encode:()=>{throw Error("TextEncoder not available")}},Ne=typeof V.encodeInto=="function"?function(n,e){return V.encodeInto(n,e)}:function(n,e){const t=V.encode(n);return e.set(t),{read:n.length,written:t.length}};function p(n,e,t){if(t===void 0){const i=V.encode(n),u=e(i.length,1)>>>0;return M().subarray(u,u+i.length).set(i),b=i.length,u}let r=n.length,s=e(r,1)>>>0;const _=M();let c=0;for(;c<r;c++){const i=n.charCodeAt(c);if(i>127)break;_[s+c]=i}if(c!==r){c!==0&&(n=n.slice(c)),s=t(s,r,r=c+n.length*3,1)>>>0;const i=M().subarray(s+c,s+r),u=Ne(n,i);c+=u.written,s=t(s,r,c,1)>>>0}return b=c,s}function G(n){const e=typeof n;if(e=="number"||e=="boolean"||n==null)return`${n}`;if(e=="string")return`"${n}"`;if(e=="symbol"){const s=n.description;return s==null?"Symbol":`Symbol(${s})`}if(e=="function"){const s=n.name;return typeof s=="string"&&s.length>0?`Function(${s})`:"Function"}if(Array.isArray(n)){const s=n.length;let _="[";s>0&&(_+=G(n[0]));for(let c=1;c<s;c++)_+=", "+G(n[c]);return _+="]",_}const t=/\[object ([^\]]+)\]/.exec(toString.call(n));let r;if(t.length>1)r=t[1];else return toString.call(n);if(r=="Object")try{return"Object("+JSON.stringify(n)+")"}catch{return"Object"}return n instanceof Error?`${n.name}: ${n.message}
${n.stack}`:r}let k=null;function Oe(){return(k===null||k.byteLength===0)&&(k=new Uint32Array(o.memory.buffer)),k}function ee(n,e){const t=e(n.length*4,4)>>>0;return Oe().set(n,t/4),b=n.length,t}function ae(n,e){const t=e(n.length*1,1)>>>0;return M().set(n,t/1),b=n.length,t}let F=null;function ve(){return(F===null||F.byteLength===0)&&(F=new Float32Array(o.memory.buffer)),F}function U(n,e){const t=e(n.length*4,4)>>>0;return ve().set(n,t/4),b=n.length,t}function te(n,e){try{return n.apply(this,e)}catch(t){o.__wbindgen_exn_store(f(t))}}const le=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>o.__wbg_webinterface_free(n>>>0));class P{static __wrap(e){e=e>>>0;const t=Object.create(P.prototype);return t.__wbg_ptr=e,le.register(t,t.__wbg_ptr,t),t}__destroy_into_raw(){const e=this.__wbg_ptr;return this.__wbg_ptr=0,le.unregister(this),e}free(){const e=this.__destroy_into_raw();o.__wbg_webinterface_free(e)}static new(){const e=o.webinterface_new();return P.__wrap(e)}selection_is_hidden(e){return o.webinterface_selection_is_hidden(this.__wbg_ptr,e)!==0}selection_is_selected(e){return o.webinterface_selection_is_selected(this.__wbg_ptr,e)!==0}selection_add(e,t){const r=ee(e,o.__wbindgen_malloc),s=b;o.webinterface_selection_add(this.__wbg_ptr,r,s,t)}selection_remove(e){const t=ee(e,o.__wbindgen_malloc),r=b;o.webinterface_selection_remove(this.__wbg_ptr,t,r)}selection_clear(e){o.webinterface_selection_clear(this.__wbg_ptr,e)}update_hidden_groups(){const e=o.webinterface_update_hidden_groups(this.__wbg_ptr);return g(e)}selection_set_color(e){const t=p(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=b,s=o.webinterface_selection_set_color(this.__wbg_ptr,t,r);return g(s)}hide_not_selected(){const e=o.webinterface_hide_not_selected(this.__wbg_ptr);return g(e)}unhide_all(){const e=o.webinterface_unhide_all(this.__wbg_ptr);return g(e)}selection_reset(e,t,r,s){const _=o.webinterface_selection_reset(this.__wbg_ptr,e,t,r,s);return g(_)}reset_all_meshes(e,t,r,s){const _=o.webinterface_reset_all_meshes(this.__wbg_ptr,e,t,r,s);return g(_)}selection_show_only_selected(e){const t=o.webinterface_selection_show_only_selected(this.__wbg_ptr,e);return g(t)}selection_invert(){const e=o.webinterface_selection_invert(this.__wbg_ptr);return g(e)}selection_allow_selection_of_hidden(e){o.webinterface_selection_allow_selection_of_hidden(this.__wbg_ptr,e)}selection_save_transformation(e,t,r,s,_,c,i,u,d,w,h,m,y,B,D,I){const q=o.webinterface_selection_save_transformation(this.__wbg_ptr,e,t,r,s,_,c,i,u,d,w,h,m,y,B,D,I);return g(q)}update_selection(){const e=o.webinterface_update_selection(this.__wbg_ptr);return g(e)}undo_transform(){const e=o.webinterface_undo_transform(this.__wbg_ptr);return g(e)}meta_find_key_from_face_index(e,t){const r=p(e,o.__wbindgen_malloc,o.__wbindgen_realloc),s=b;return o.webinterface_meta_find_key_from_face_index(this.__wbg_ptr,r,s,t)>>>0}meshes_get_all(){const e=o.webinterface_meshes_get_all(this.__wbg_ptr);return g(e)}meshes_set_mesh_as_loaded(e,t,r,s,_){const c=p(e,o.__wbindgen_malloc,o.__wbindgen_realloc),i=b;o.webinterface_meshes_set_mesh_as_loaded(this.__wbg_ptr,c,i,f(t),f(r),f(s),f(_))}filter_treeview_fullname(e,t,r){const s=p(e,o.__wbindgen_malloc,o.__wbindgen_realloc),_=b,c=o.webinterface_filter_treeview_fullname(this.__wbg_ptr,s,_,t,r);return g(c)}meshes_remove_mesh_as_loaded(e){const t=p(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=b;o.webinterface_meshes_remove_mesh_as_loaded(this.__wbg_ptr,t,r)}filter_geometry(e,t){o.webinterface_filter_geometry(this.__wbg_ptr,f(e),f(t))}cache(e){const t=ae(e,o.__wbindgen_malloc),r=b;o.webinterface_cache(this.__wbg_ptr,t,r)}add_model_group(e,t){const r=ae(e,o.__wbindgen_malloc),s=b,_=p(t,o.__wbindgen_malloc,o.__wbindgen_realloc),c=b;o.webinterface_add_model_group(this.__wbg_ptr,r,s,_,c)}get_bounding_box_from_selection(e){const t=o.webinterface_get_bounding_box_from_selection(this.__wbg_ptr,e);return g(t)}all_sites_loaded(){o.webinterface_all_sites_loaded(this.__wbg_ptr)}get_bounding_boxes_from_selection(){const e=o.webinterface_get_bounding_boxes_from_selection(this.__wbg_ptr);return g(e)}get_bounding_box_from_ids(e,t){const r=o.webinterface_get_bounding_box_from_ids(this.__wbg_ptr,f(e),t);return g(r)}get_ids_from_fullnames(e,t){const r=o.webinterface_get_ids_from_fullnames(this.__wbg_ptr,f(e),t);return g(r)}treeview_collapse(){o.webinterface_treeview_collapse(this.__wbg_ptr)}treeview_toggle_id(e){o.webinterface_treeview_toggle_id(this.__wbg_ptr,e)}get_fullnames_from_selection(e,t){const r=o.webinterface_get_fullnames_from_selection(this.__wbg_ptr,e,t);return g(r)}get_selected_fullnames_from_loaded(e){const t=o.webinterface_get_selected_fullnames_from_loaded(this.__wbg_ptr,e);return g(t)}get_all_ids_from_fullnames(e,t){const r=o.webinterface_get_all_ids_from_fullnames(this.__wbg_ptr,f(e),t);return g(r)}get_all_ids_from_ids(e){const t=o.webinterface_get_all_ids_from_ids(this.__wbg_ptr,f(e));return g(t)}get_fullname_from_keys(e,t){const r=o.webinterface_get_fullname_from_keys(this.__wbg_ptr,f(e),t);return g(r)}get_parents_from_fullname(e){const t=p(e,o.__wbindgen_malloc,o.__wbindgen_realloc),r=b,s=o.webinterface_get_parents_from_fullname(this.__wbg_ptr,t,r);return g(s)}get_parents_from_id(e){const t=o.webinterface_get_parents_from_id(this.__wbg_ptr,e);return g(t)}treeview_expand_from_id(e){o.webinterface_treeview_expand_from_id(this.__wbg_ptr,e)}treeview_reset_rows(){const e=o.webinterface_treeview_reset_rows(this.__wbg_ptr);return g(e)}reset_culling_all_meshes(){const e=o.webinterface_reset_culling_all_meshes(this.__wbg_ptr);return g(e)}set_occlusion_boxes(e){const t=U(e,o.__wbindgen_malloc),r=b;o.webinterface_set_occlusion_boxes(this.__wbg_ptr,t,r)}cull_items(e,t,r,s,_,c,i,u){const d=U(e,o.__wbindgen_malloc),w=b,h=U(t,o.__wbindgen_malloc),m=b,y=U(_,o.__wbindgen_malloc),B=b,D=ee(c,o.__wbindgen_malloc),I=b,q=U(i,o.__wbindgen_malloc),Fe=b,Ue=o.webinterface_cull_items(this.__wbg_ptr,d,w,h,m,r,s,y,B,D,I,q,Fe,u);return g(Ue)}}async function Ke(n,e){if(typeof Response=="function"&&n instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(n,e)}catch(r){if(n.headers.get("Content-Type")!="application/wasm")console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",r);else throw r}const t=await n.arrayBuffer();return await WebAssembly.instantiate(t,e)}else{const t=await WebAssembly.instantiate(n,e);return t instanceof WebAssembly.Instance?{instance:t,module:n}:t}}function Ce(){const n={};return n.wbg={},n.wbg.__wbindgen_object_drop_ref=function(e){g(e)},n.wbg.__wbg_get_bd8e338fbd5f5cc8=function(e,t){const r=l(e)[t>>>0];return f(r)},n.wbg.__wbindgen_number_get=function(e,t){const r=l(t),s=typeof r=="number"?r:void 0;Re()[e/8+1]=Q(s)?0:s,L()[e/4+0]=!Q(s)},n.wbg.__wbg_new_16b304a2cfa7ff4a=function(){const e=new Array;return f(e)},n.wbg.__wbg_new_72fb9a18b5ae2624=function(){const e=new Object;return f(e)},n.wbg.__wbindgen_string_new=function(e,t){const r=Y(e,t);return f(r)},n.wbg.__wbg_set_f975102236d3c502=function(e,t,r){l(e)[g(t)]=g(r)},n.wbg.__wbindgen_number_new=function(e){return f(e)},n.wbg.__wbg_set_d4638f722068f043=function(e,t,r){l(e)[t>>>0]=g(r)},n.wbg.__wbg_isArray_2ab64d95e09ea0ae=function(e){return Array.isArray(l(e))},n.wbg.__wbg_length_cd7af8117672b8b8=function(e){return l(e).length},n.wbg.__wbg_next_196c84450b364254=function(){return te(function(e){const t=l(e).next();return f(t)},arguments)},n.wbg.__wbg_done_298b57d23c0fc80c=function(e){return l(e).done},n.wbg.__wbg_value_d93c65011f51a456=function(e){const t=l(e).value;return f(t)},n.wbg.__wbindgen_jsval_loose_eq=function(e,t){return l(e)==l(t)},n.wbg.__wbg_isSafeInteger_f7b04ef02296c4d2=function(e){return Number.isSafeInteger(l(e))},n.wbg.__wbindgen_as_number=function(e){return+l(e)},n.wbg.__wbindgen_is_object=function(e){const t=l(e);return typeof t=="object"&&t!==null},n.wbg.__wbg_entries_95cc2c823b285a09=function(e){const t=Object.entries(l(e));return f(t)},n.wbg.__wbindgen_bigint_from_u64=function(e){const t=BigInt.asUintN(64,e);return f(t)},n.wbg.__wbg_new_abda76e883ba8a5f=function(){const e=new Error;return f(e)},n.wbg.__wbg_stack_658279fe44541cf6=function(e,t){const r=l(t).stack,s=p(r,o.__wbindgen_malloc,o.__wbindgen_realloc),_=b;L()[e/4+1]=_,L()[e/4+0]=s},n.wbg.__wbg_error_f851667af71bcfc6=function(e,t){let r,s;try{r=e,s=t,console.error(Y(e,t))}finally{o.__wbindgen_free(r,s,1)}},n.wbg.__wbg_iterator_2cee6dadfd956dfa=function(){return f(Symbol.iterator)},n.wbg.__wbg_get_e3c254076557e348=function(){return te(function(e,t){const r=Reflect.get(l(e),l(t));return f(r)},arguments)},n.wbg.__wbindgen_is_function=function(e){return typeof l(e)=="function"},n.wbg.__wbg_call_27c0f87801dedf93=function(){return te(function(e,t){const r=l(e).call(l(t));return f(r)},arguments)},n.wbg.__wbg_next_40fc327bfc8770e6=function(e){const t=l(e).next;return f(t)},n.wbg.__wbg_length_c20a40f15020d68a=function(e){return l(e).length},n.wbg.__wbindgen_memory=function(){const e=o.memory;return f(e)},n.wbg.__wbg_buffer_12d079cc21e14bdb=function(e){const t=l(e).buffer;return f(t)},n.wbg.__wbg_new_63b92bc8671ed464=function(e){const t=new Uint8Array(l(e));return f(t)},n.wbg.__wbg_set_a47bac70306a19a7=function(e,t,r){l(e).set(l(t),r>>>0)},n.wbg.__wbindgen_boolean_get=function(e){const t=l(e);return typeof t=="boolean"?t?1:0:2},n.wbg.__wbindgen_string_get=function(e,t){const r=l(t),s=typeof r=="string"?r:void 0;var _=Q(s)?0:p(s,o.__wbindgen_malloc,o.__wbindgen_realloc),c=b;L()[e/4+1]=c,L()[e/4+0]=_},n.wbg.__wbg_instanceof_Uint8Array_2b3bbecd033d19f6=function(e){let t;try{t=l(e)instanceof Uint8Array}catch{t=!1}return t},n.wbg.__wbg_instanceof_ArrayBuffer_836825be07d4c9d2=function(e){let t;try{t=l(e)instanceof ArrayBuffer}catch{t=!1}return t},n.wbg.__wbindgen_object_clone_ref=function(e){const t=l(e);return f(t)},n.wbg.__wbindgen_error_new=function(e,t){const r=new Error(Y(e,t));return f(r)},n.wbg.__wbindgen_debug_string=function(e,t){const r=G(l(t)),s=p(r,o.__wbindgen_malloc,o.__wbindgen_realloc),_=b;L()[e/4+1]=_,L()[e/4+0]=s},n.wbg.__wbindgen_throw=function(e,t){throw new Error(Y(e,t))},n.wbg.__wbg_new_d9bc3a0147634640=function(){return f(new Map)},n.wbg.__wbg_set_8417257aaedc936b=function(e,t,r){const s=l(e).set(l(t),l(r));return f(s)},n.wbg.__wbindgen_is_string=function(e){return typeof l(e)=="string"},n.wbg.__wbg_getwithrefkey_edc2c8960f0f1191=function(e,t){const r=l(e)[l(t)];return f(r)},n.wbg.__wbindgen_is_undefined=function(e){return l(e)===void 0},n.wbg.__wbindgen_in=function(e,t){return l(e)in l(t)},n}function Me(n,e){return o=n.exports,ue.__wbindgen_wasm_module=e,F=null,v=null,K=null,k=null,C=null,o}async function ue(n){if(o!==void 0)return o;typeof n>"u"&&(n=new URL(""+new URL("web3d_state_bg-DY1_QFWg.wasm",self.location.href).href,self.location.href));const e=Ce();(typeof n=="string"||typeof Request=="function"&&n instanceof Request||typeof URL=="function"&&n instanceof URL)&&(n=fetch(n));const{instance:t,module:r}=await Ke(await n,e);return Me(t,r)}let a;ue().then(()=>{a=P.new();try{a.cache(new Uint8Array(1e8))}catch(n){console.error(n)}});class ke{constructor(){A(this,"$threeviewRowsLocalCache",[]);A(this,"$threeviewSelectedSites",new Set)}async filterFullname(e,t=0,r=5){return a.filter_treeview_fullname(e,t,r)}async getBoundingBoxFromName(e,t){return this.getBoundingBoxFromNameSync(e,t)}resetTreeLocalCache(){this.$threeviewRowsLocalCache=a.treeview_reset_rows(),this.$threeviewSelectedSites.clear(),this.$threeviewRowsLocalCache.forEach(e=>{e.data&&e.data[4]&&e.data[6]&&this.$threeviewSelectedSites.add(e.data[6])})}getBoundingBoxFromNameSync(e,t){const r=a.get_ids_from_fullnames([e],t),s=a.get_bounding_box_from_ids(r,t);return{X:s.x_max,Y:s.y_max,Z:s.z_max,x:s.x_min,y:s.y_min,z:s.z_min}}async selection_save_transformation(e,t,r,s,_,c,i,u,d,w,h,m,y,B,D,I){return a.selection_save_transformation(e,t,r,s,_,c,i,u,d,w,h,m,y,B,D,I)}async getBoundingBoxFromKeys(e){const t=a.get_bounding_box_from_ids(e,!0);return{X:t.x_max,Y:t.y_max,Z:t.z_max,x:t.x_min,y:t.y_min,z:t.z_min}}async get_fullnames_from_selection(e=!1,t=!1){return a.get_fullnames_from_selection(e,t)}async get_selected_fullnames_from_loaded(e=!1){return a.get_selected_fullnames_from_loaded(e)}async getBoundingBoxFromKey(e){return this.getBoundingBoxFromKeys([e])}async add_model_groups(e,t){const r=e==null?void 0:e.filter(_=>_.$synced),s=new Te(Se(t));if(r!=null&&r.length){const _=r.map(i=>i.name),c=r.map(i=>i.root_name);for(let i=0;i<_.length;i++){const u=await s.getBufferKey(Ae(_[i]));a.add_model_group(new Uint8Array(u),c[i])}}}async undo_transform(){return a.undo_transform()}async get_bounding_box_from_selection(e=!1){const t=a.get_bounding_box_from_selection(e);return{X:t.x_max,Y:t.y_max,Z:t.z_max,x:t.x_min,y:t.y_min,z:t.z_min}}async get_all_ids_from_ids(e){return a.get_all_ids_from_ids([e])}async selection_is_hidden(e){return a.selection_is_hidden(e)}async selection_is_selected(e){return a.selection_is_selected(e)}async selection_add(e,t){a.selection_add(new Uint32Array(e),t)}async selection_remove(e){a.selection_remove(new Uint32Array(e))}async all_sites_loaded(){a.all_sites_loaded()}async selection_clear(e=!1){a==null||a.selection_clear(e)}async selection_invert(){const e=a.selection_invert();return this.resetTreeLocalCache(),e}async selection_set_color(e){const t=a.selection_set_color(e);return this.resetTreeLocalCache(),t}async selection_allow_selection_of_hidden(e){a.selection_allow_selection_of_hidden(e)}async selection_show_only_selected(e){return a.selection_show_only_selected(e)}async unhide_all(){const e=a.unhide_all();return this.resetTreeLocalCache(),e}async selection_reset(e,t,r,s){const _=a.selection_reset(e,t,r,s);return this.resetTreeLocalCache(),_}async hide_not_selected(){const e=a.hide_not_selected();return this.resetTreeLocalCache(),e}async reset_all_meshes(e,t,r,s){const _=a.reset_all_meshes(e,t,r,s);return this.resetTreeLocalCache(),_}async reset_culling_all_meshes(){return a.reset_culling_all_meshes()}async get_bounding_boxes_from_selection(){return a.get_bounding_boxes_from_selection()}async set_occlusion_boxes(e){a.set_occlusion_boxes(new Float32Array(e))}async cull_items(e,t,r,s,_,c,i,u){let d=[0,0,0,0,0,0,0];return i&&(d=[1,i.min.x,i.min.y,i.min.z,i.max.x,i.max.y,i.max.z]),a.cull_items(new Float32Array(e.elements),new Float32Array(t.elements),r,s,new Float32Array([_.x,_.y,_.z]),new Uint32Array(c),new Float32Array(d),u)}async selection_append(){const e=a.update_selection();return this.resetTreeLocalCache(),e}async meta_find_key_from_face_index(e,t){return a.meta_find_key_from_face_index(e,t)}async clear(){a.free(),a=P.new()}async meshes_set_mesh_as_loaded(e,t,r){a.meshes_set_mesh_as_loaded(e,t,r,null,null)}async length(){return this.$threeviewRowsLocalCache.length}async update_hidden_groups(){return a.update_hidden_groups()}async treeview_collapse(){a.treeview_collapse()}async treeview_reset_rows(){this.resetTreeLocalCache()}async get_ids_from_fullnames(e,t){return a.get_ids_from_fullnames(e,t)}async get_fullname_from_keys(e,t=!1){return a.get_fullname_from_keys(e,t)}async treeview_get_local_cache(){return[this.$threeviewRowsLocalCache,this.$threeviewSelectedSites]}async getDataExt(e){if(e){const t=this.get_parents_from_id(e);let r="";return Array.isArray(t[0])&&(r=t[0][0]),{fullname:r,parents:t[0],parentKeys:t[1],key:e}}else return{fullname:null,parents:null,parentKeys:null,key:e}}async treeview_toggle_id(e){a.treeview_toggle_id(e),this.resetTreeLocalCache()}async treeview_expand_from_id(e){e&&(a.treeview_expand_from_id(e),this.resetTreeLocalCache())}get_parents_from_id(e){return a.get_parents_from_id(e)}async filter_geometry(e,t){const r=e.length===0?null:structuredClone(e);return r&&r.forEach(_=>{_.length&&_.forEach(c=>{const i=c;i.filter_type=c.type,delete i.type,i.filter_action=c.filtertype,delete i.filtertype})}),r!=null&&r.length&&t.length&&(console.warn("YOU CAN NOT USE FILTER WITH COLOR, FIRST RUN FILTER WITH EMPTY COLOR ARRAY, THEN  EMTPY FILTER WITH COLOR ARRAY"),console.warn("REASON FOR THIS IS BECAUSE WE NEED TO BUILD NEW MESHES AND SET THEM AS LOADED")),a.filter_geometry(r,t),a.meshes_get_all()}}X(ke)})();
