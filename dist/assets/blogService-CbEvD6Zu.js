function Pe(r,e){var t={};for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&e.indexOf(a)<0&&(t[a]=r[a]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,a=Object.getOwnPropertySymbols(r);n<a.length;n++)e.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(r,a[n])&&(t[a[n]]=r[a[n]]);return t}function Ht(r,e,t,a){function n(o){return o instanceof t?o:new t(function(s){s(o)})}return new(t||(t=Promise))(function(o,s){function i(c){try{u(a.next(c))}catch(y){s(y)}}function l(c){try{u(a.throw(c))}catch(y){s(y)}}function u(c){c.done?o(c.value):n(c.value).then(i,l)}u((a=a.apply(r,e||[])).next())})}const Yt=r=>r?(...e)=>r(...e):(...e)=>fetch(...e);class Xe extends Error{constructor(e,t="FunctionsError",a){super(e),this.name=t,this.context=a}}class qt extends Xe{constructor(e){super("Failed to send a request to the Edge Function","FunctionsFetchError",e)}}class tt extends Xe{constructor(e){super("Relay Error invoking the Edge Function","FunctionsRelayError",e)}}class rt extends Xe{constructor(e){super("Edge Function returned a non-2xx status code","FunctionsHttpError",e)}}var He;(function(r){r.Any="any",r.ApNortheast1="ap-northeast-1",r.ApNortheast2="ap-northeast-2",r.ApSouth1="ap-south-1",r.ApSoutheast1="ap-southeast-1",r.ApSoutheast2="ap-southeast-2",r.CaCentral1="ca-central-1",r.EuCentral1="eu-central-1",r.EuWest1="eu-west-1",r.EuWest2="eu-west-2",r.EuWest3="eu-west-3",r.SaEast1="sa-east-1",r.UsEast1="us-east-1",r.UsWest1="us-west-1",r.UsWest2="us-west-2"})(He||(He={}));class Gt{constructor(e,{headers:t={},customFetch:a,region:n=He.Any}={}){this.url=e,this.headers=t,this.region=n,this.fetch=Yt(a)}setAuth(e){this.headers.Authorization=`Bearer ${e}`}invoke(e){return Ht(this,arguments,void 0,function*(t,a={}){var n;let o,s;try{const{headers:i,method:l,body:u,signal:c,timeout:y}=a;let d={},{region:h}=a;h||(h=this.region);const m=new URL(`${this.url}/${t}`);h&&h!=="any"&&(d["x-region"]=h,m.searchParams.set("forceFunctionRegion",h));let f;u&&(i&&!Object.prototype.hasOwnProperty.call(i,"Content-Type")||!i)?typeof Blob<"u"&&u instanceof Blob||u instanceof ArrayBuffer?(d["Content-Type"]="application/octet-stream",f=u):typeof u=="string"?(d["Content-Type"]="text/plain",f=u):typeof FormData<"u"&&u instanceof FormData?f=u:(d["Content-Type"]="application/json",f=JSON.stringify(u)):u&&typeof u!="string"&&!(typeof Blob<"u"&&u instanceof Blob)&&!(u instanceof ArrayBuffer)&&!(typeof FormData<"u"&&u instanceof FormData)?f=JSON.stringify(u):f=u;let g=c;y&&(s=new AbortController,o=setTimeout(()=>s.abort(),y),c?(g=s.signal,c.addEventListener("abort",()=>s.abort())):g=s.signal);const w=yield this.fetch(m.toString(),{method:l||"POST",headers:Object.assign(Object.assign(Object.assign({},d),this.headers),i),body:f,signal:g}).catch(C=>{throw new qt(C)}),b=w.headers.get("x-relay-error");if(b&&b==="true")throw new tt(w);if(!w.ok)throw new rt(w);let p=((n=w.headers.get("Content-Type"))!==null&&n!==void 0?n:"text/plain").split(";")[0].trim(),_;return p==="application/json"?_=yield w.json():p==="application/octet-stream"||p==="application/pdf"?_=yield w.blob():p==="text/event-stream"?_=w:p==="multipart/form-data"?_=yield w.formData():_=yield w.text(),{data:_,error:null,response:w}}catch(i){return{data:null,error:i,response:i instanceof rt||i instanceof tt?i.context:void 0}}finally{o&&clearTimeout(o)}})}}var Kt=class extends Error{constructor(r){super(r.message),this.name="PostgrestError",this.details=r.details,this.hint=r.hint,this.code=r.code}},Vt=class{constructor(r){var e,t,a;this.shouldThrowOnError=!1,this.method=r.method,this.url=r.url,this.headers=new Headers(r.headers),this.schema=r.schema,this.body=r.body,this.shouldThrowOnError=(e=r.shouldThrowOnError)!==null&&e!==void 0?e:!1,this.signal=r.signal,this.isMaybeSingle=(t=r.isMaybeSingle)!==null&&t!==void 0?t:!1,this.urlLengthLimit=(a=r.urlLengthLimit)!==null&&a!==void 0?a:8e3,r.fetch?this.fetch=r.fetch:this.fetch=fetch}throwOnError(){return this.shouldThrowOnError=!0,this}setHeader(r,e){return this.headers=new Headers(this.headers),this.headers.set(r,e),this}then(r,e){var t=this;this.schema===void 0||(["GET","HEAD"].includes(this.method)?this.headers.set("Accept-Profile",this.schema):this.headers.set("Content-Profile",this.schema)),this.method!=="GET"&&this.method!=="HEAD"&&this.headers.set("Content-Type","application/json");const a=this.fetch;let n=a(this.url.toString(),{method:this.method,headers:this.headers,body:JSON.stringify(this.body),signal:this.signal}).then(async o=>{let s=null,i=null,l=null,u=o.status,c=o.statusText;if(o.ok){var y,d;if(t.method!=="HEAD"){var h;const w=await o.text();w===""||(t.headers.get("Accept")==="text/csv"||t.headers.get("Accept")&&(!((h=t.headers.get("Accept"))===null||h===void 0)&&h.includes("application/vnd.pgrst.plan+text"))?i=w:i=JSON.parse(w))}const f=(y=t.headers.get("Prefer"))===null||y===void 0?void 0:y.match(/count=(exact|planned|estimated)/),g=(d=o.headers.get("content-range"))===null||d===void 0?void 0:d.split("/");f&&g&&g.length>1&&(l=parseInt(g[1])),t.isMaybeSingle&&t.method==="GET"&&Array.isArray(i)&&(i.length>1?(s={code:"PGRST116",details:`Results contain ${i.length} rows, application/vnd.pgrst.object+json requires 1 row`,hint:null,message:"JSON object requested, multiple (or no) rows returned"},i=null,l=null,u=406,c="Not Acceptable"):i.length===1?i=i[0]:i=null)}else{var m;const f=await o.text();try{s=JSON.parse(f),Array.isArray(s)&&o.status===404&&(i=[],s=null,u=200,c="OK")}catch{o.status===404&&f===""?(u=204,c="No Content"):s={message:f}}if(s&&t.isMaybeSingle&&(!(s==null||(m=s.details)===null||m===void 0)&&m.includes("0 rows"))&&(s=null,u=200,c="OK"),s&&t.shouldThrowOnError)throw new Kt(s)}return{error:s,data:i,count:l,status:u,statusText:c}});return this.shouldThrowOnError||(n=n.catch(o=>{var s;let i="",l="",u="";const c=o==null?void 0:o.cause;if(c){var y,d,h,m;const w=(y=c==null?void 0:c.message)!==null&&y!==void 0?y:"",b=(d=c==null?void 0:c.code)!==null&&d!==void 0?d:"";i=`${(h=o==null?void 0:o.name)!==null&&h!==void 0?h:"FetchError"}: ${o==null?void 0:o.message}`,i+=`

Caused by: ${(m=c==null?void 0:c.name)!==null&&m!==void 0?m:"Error"}: ${w}`,b&&(i+=` (${b})`),c!=null&&c.stack&&(i+=`
${c.stack}`)}else{var f;i=(f=o==null?void 0:o.stack)!==null&&f!==void 0?f:""}const g=this.url.toString().length;return(o==null?void 0:o.name)==="AbortError"||(o==null?void 0:o.code)==="ABORT_ERR"?(u="",l="Request was aborted (timeout or manual cancellation)",g>this.urlLengthLimit&&(l+=`. Note: Your request URL is ${g} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`)):((c==null?void 0:c.name)==="HeadersOverflowError"||(c==null?void 0:c.code)==="UND_ERR_HEADERS_OVERFLOW")&&(u="",l="HTTP headers exceeded server limits (typically 16KB)",g>this.urlLengthLimit&&(l+=`. Your request URL is ${g} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),{error:{message:`${(s=o==null?void 0:o.name)!==null&&s!==void 0?s:"FetchError"}: ${o==null?void 0:o.message}`,details:i,hint:l,code:u},data:null,count:null,status:0,statusText:""}})),n.then(r,e)}returns(){return this}overrideTypes(){return this}},zt=class extends Vt{select(r){let e=!1;const t=(r??"*").split("").map(a=>/\s/.test(a)&&!e?"":(a==='"'&&(e=!e),a)).join("");return this.url.searchParams.set("select",t),this.headers.append("Prefer","return=representation"),this}order(r,{ascending:e=!0,nullsFirst:t,foreignTable:a,referencedTable:n=a}={}){const o=n?`${n}.order`:"order",s=this.url.searchParams.get(o);return this.url.searchParams.set(o,`${s?`${s},`:""}${r}.${e?"asc":"desc"}${t===void 0?"":t?".nullsfirst":".nullslast"}`),this}limit(r,{foreignTable:e,referencedTable:t=e}={}){const a=typeof t>"u"?"limit":`${t}.limit`;return this.url.searchParams.set(a,`${r}`),this}range(r,e,{foreignTable:t,referencedTable:a=t}={}){const n=typeof a>"u"?"offset":`${a}.offset`,o=typeof a>"u"?"limit":`${a}.limit`;return this.url.searchParams.set(n,`${r}`),this.url.searchParams.set(o,`${e-r+1}`),this}abortSignal(r){return this.signal=r,this}single(){return this.headers.set("Accept","application/vnd.pgrst.object+json"),this}maybeSingle(){return this.method==="GET"?this.headers.set("Accept","application/json"):this.headers.set("Accept","application/vnd.pgrst.object+json"),this.isMaybeSingle=!0,this}csv(){return this.headers.set("Accept","text/csv"),this}geojson(){return this.headers.set("Accept","application/geo+json"),this}explain({analyze:r=!1,verbose:e=!1,settings:t=!1,buffers:a=!1,wal:n=!1,format:o="text"}={}){var s;const i=[r?"analyze":null,e?"verbose":null,t?"settings":null,a?"buffers":null,n?"wal":null].filter(Boolean).join("|"),l=(s=this.headers.get("Accept"))!==null&&s!==void 0?s:"application/json";return this.headers.set("Accept",`application/vnd.pgrst.plan+${o}; for="${l}"; options=${i};`),o==="json"?this:this}rollback(){return this.headers.append("Prefer","tx=rollback"),this}returns(){return this}maxAffected(r){return this.headers.append("Prefer","handling=strict"),this.headers.append("Prefer",`max-affected=${r}`),this}};const at=new RegExp("[,()]");var re=class extends zt{eq(r,e){return this.url.searchParams.append(r,`eq.${e}`),this}neq(r,e){return this.url.searchParams.append(r,`neq.${e}`),this}gt(r,e){return this.url.searchParams.append(r,`gt.${e}`),this}gte(r,e){return this.url.searchParams.append(r,`gte.${e}`),this}lt(r,e){return this.url.searchParams.append(r,`lt.${e}`),this}lte(r,e){return this.url.searchParams.append(r,`lte.${e}`),this}like(r,e){return this.url.searchParams.append(r,`like.${e}`),this}likeAllOf(r,e){return this.url.searchParams.append(r,`like(all).{${e.join(",")}}`),this}likeAnyOf(r,e){return this.url.searchParams.append(r,`like(any).{${e.join(",")}}`),this}ilike(r,e){return this.url.searchParams.append(r,`ilike.${e}`),this}ilikeAllOf(r,e){return this.url.searchParams.append(r,`ilike(all).{${e.join(",")}}`),this}ilikeAnyOf(r,e){return this.url.searchParams.append(r,`ilike(any).{${e.join(",")}}`),this}regexMatch(r,e){return this.url.searchParams.append(r,`match.${e}`),this}regexIMatch(r,e){return this.url.searchParams.append(r,`imatch.${e}`),this}is(r,e){return this.url.searchParams.append(r,`is.${e}`),this}isDistinct(r,e){return this.url.searchParams.append(r,`isdistinct.${e}`),this}in(r,e){const t=Array.from(new Set(e)).map(a=>typeof a=="string"&&at.test(a)?`"${a}"`:`${a}`).join(",");return this.url.searchParams.append(r,`in.(${t})`),this}notIn(r,e){const t=Array.from(new Set(e)).map(a=>typeof a=="string"&&at.test(a)?`"${a}"`:`${a}`).join(",");return this.url.searchParams.append(r,`not.in.(${t})`),this}contains(r,e){return typeof e=="string"?this.url.searchParams.append(r,`cs.${e}`):Array.isArray(e)?this.url.searchParams.append(r,`cs.{${e.join(",")}}`):this.url.searchParams.append(r,`cs.${JSON.stringify(e)}`),this}containedBy(r,e){return typeof e=="string"?this.url.searchParams.append(r,`cd.${e}`):Array.isArray(e)?this.url.searchParams.append(r,`cd.{${e.join(",")}}`):this.url.searchParams.append(r,`cd.${JSON.stringify(e)}`),this}rangeGt(r,e){return this.url.searchParams.append(r,`sr.${e}`),this}rangeGte(r,e){return this.url.searchParams.append(r,`nxl.${e}`),this}rangeLt(r,e){return this.url.searchParams.append(r,`sl.${e}`),this}rangeLte(r,e){return this.url.searchParams.append(r,`nxr.${e}`),this}rangeAdjacent(r,e){return this.url.searchParams.append(r,`adj.${e}`),this}overlaps(r,e){return typeof e=="string"?this.url.searchParams.append(r,`ov.${e}`):this.url.searchParams.append(r,`ov.{${e.join(",")}}`),this}textSearch(r,e,{config:t,type:a}={}){let n="";a==="plain"?n="pl":a==="phrase"?n="ph":a==="websearch"&&(n="w");const o=t===void 0?"":`(${t})`;return this.url.searchParams.append(r,`${n}fts${o}.${e}`),this}match(r){return Object.entries(r).forEach(([e,t])=>{this.url.searchParams.append(e,`eq.${t}`)}),this}not(r,e,t){return this.url.searchParams.append(r,`not.${e}.${t}`),this}or(r,{foreignTable:e,referencedTable:t=e}={}){const a=t?`${t}.or`:"or";return this.url.searchParams.append(a,`(${r})`),this}filter(r,e,t){return this.url.searchParams.append(r,`${e}.${t}`),this}},Jt=class{constructor(r,{headers:e={},schema:t,fetch:a,urlLengthLimit:n=8e3}){this.url=r,this.headers=new Headers(e),this.schema=t,this.fetch=a,this.urlLengthLimit=n}cloneRequestState(){return{url:new URL(this.url.toString()),headers:new Headers(this.headers)}}select(r,e){const{head:t=!1,count:a}=e??{},n=t?"HEAD":"GET";let o=!1;const s=(r??"*").split("").map(u=>/\s/.test(u)&&!o?"":(u==='"'&&(o=!o),u)).join(""),{url:i,headers:l}=this.cloneRequestState();return i.searchParams.set("select",s),a&&l.append("Prefer",`count=${a}`),new re({method:n,url:i,headers:l,schema:this.schema,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}insert(r,{count:e,defaultToNull:t=!0}={}){var a;const n="POST",{url:o,headers:s}=this.cloneRequestState();if(e&&s.append("Prefer",`count=${e}`),t||s.append("Prefer","missing=default"),Array.isArray(r)){const i=r.reduce((l,u)=>l.concat(Object.keys(u)),[]);if(i.length>0){const l=[...new Set(i)].map(u=>`"${u}"`);o.searchParams.set("columns",l.join(","))}}return new re({method:n,url:o,headers:s,schema:this.schema,body:r,fetch:(a=this.fetch)!==null&&a!==void 0?a:fetch,urlLengthLimit:this.urlLengthLimit})}upsert(r,{onConflict:e,ignoreDuplicates:t=!1,count:a,defaultToNull:n=!0}={}){var o;const s="POST",{url:i,headers:l}=this.cloneRequestState();if(l.append("Prefer",`resolution=${t?"ignore":"merge"}-duplicates`),e!==void 0&&i.searchParams.set("on_conflict",e),a&&l.append("Prefer",`count=${a}`),n||l.append("Prefer","missing=default"),Array.isArray(r)){const u=r.reduce((c,y)=>c.concat(Object.keys(y)),[]);if(u.length>0){const c=[...new Set(u)].map(y=>`"${y}"`);i.searchParams.set("columns",c.join(","))}}return new re({method:s,url:i,headers:l,schema:this.schema,body:r,fetch:(o=this.fetch)!==null&&o!==void 0?o:fetch,urlLengthLimit:this.urlLengthLimit})}update(r,{count:e}={}){var t;const a="PATCH",{url:n,headers:o}=this.cloneRequestState();return e&&o.append("Prefer",`count=${e}`),new re({method:a,url:n,headers:o,schema:this.schema,body:r,fetch:(t=this.fetch)!==null&&t!==void 0?t:fetch,urlLengthLimit:this.urlLengthLimit})}delete({count:r}={}){var e;const t="DELETE",{url:a,headers:n}=this.cloneRequestState();return r&&n.append("Prefer",`count=${r}`),new re({method:t,url:a,headers:n,schema:this.schema,fetch:(e=this.fetch)!==null&&e!==void 0?e:fetch,urlLengthLimit:this.urlLengthLimit})}};function de(r){"@babel/helpers - typeof";return de=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},de(r)}function Zt(r,e){if(de(r)!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var a=t.call(r,e);if(de(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function Qt(r){var e=Zt(r,"string");return de(e)=="symbol"?e:e+""}function Xt(r,e,t){return(e=Qt(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function nt(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(r);e&&(a=a.filter(function(n){return Object.getOwnPropertyDescriptor(r,n).enumerable})),t.push.apply(t,a)}return t}function be(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?nt(Object(t),!0).forEach(function(a){Xt(r,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):nt(Object(t)).forEach(function(a){Object.defineProperty(r,a,Object.getOwnPropertyDescriptor(t,a))})}return r}var er=class At{constructor(e,{headers:t={},schema:a,fetch:n,timeout:o,urlLengthLimit:s=8e3}={}){this.url=e,this.headers=new Headers(t),this.schemaName=a,this.urlLengthLimit=s;const i=n??globalThis.fetch;o!==void 0&&o>0?this.fetch=(l,u)=>{const c=new AbortController,y=setTimeout(()=>c.abort(),o),d=u==null?void 0:u.signal;if(d){if(d.aborted)return clearTimeout(y),i(l,u);const h=()=>{clearTimeout(y),c.abort()};return d.addEventListener("abort",h,{once:!0}),i(l,be(be({},u),{},{signal:c.signal})).finally(()=>{clearTimeout(y),d.removeEventListener("abort",h)})}return i(l,be(be({},u),{},{signal:c.signal})).finally(()=>clearTimeout(y))}:this.fetch=i}from(e){if(!e||typeof e!="string"||e.trim()==="")throw new Error("Invalid relation name: relation must be a non-empty string.");return new Jt(new URL(`${this.url}/${e}`),{headers:new Headers(this.headers),schema:this.schemaName,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}schema(e){return new At(this.url,{headers:this.headers,schema:e,fetch:this.fetch,urlLengthLimit:this.urlLengthLimit})}rpc(e,t={},{head:a=!1,get:n=!1,count:o}={}){var s;let i;const l=new URL(`${this.url}/rpc/${e}`);let u;const c=h=>h!==null&&typeof h=="object"&&(!Array.isArray(h)||h.some(c)),y=a&&Object.values(t).some(c);y?(i="POST",u=t):a||n?(i=a?"HEAD":"GET",Object.entries(t).filter(([h,m])=>m!==void 0).map(([h,m])=>[h,Array.isArray(m)?`{${m.join(",")}}`:`${m}`]).forEach(([h,m])=>{l.searchParams.append(h,m)})):(i="POST",u=t);const d=new Headers(this.headers);return y?d.set("Prefer",o?`count=${o},return=minimal`:"return=minimal"):o&&d.set("Prefer",`count=${o}`),new re({method:i,url:l,headers:d,schema:this.schemaName,body:u,fetch:(s=this.fetch)!==null&&s!==void 0?s:fetch,urlLengthLimit:this.urlLengthLimit})}};class tr{constructor(){}static detectEnvironment(){var e;if(typeof WebSocket<"u")return{type:"native",constructor:WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocket<"u")return{type:"native",constructor:globalThis.WebSocket};if(typeof global<"u"&&typeof global.WebSocket<"u")return{type:"native",constructor:global.WebSocket};if(typeof globalThis<"u"&&typeof globalThis.WebSocketPair<"u"&&typeof globalThis.WebSocket>"u")return{type:"cloudflare",error:"Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",workaround:"Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."};if(typeof globalThis<"u"&&globalThis.EdgeRuntime||typeof navigator<"u"&&(!((e=navigator.userAgent)===null||e===void 0)&&e.includes("Vercel-Edge")))return{type:"unsupported",error:"Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",workaround:"Use serverless functions or a different deployment target for WebSocket functionality."};const t=globalThis.process;if(t){const a=t.versions;if(a&&a.node){const n=a.node,o=parseInt(n.replace(/^v/,"").split(".")[0]);return o>=22?typeof globalThis.WebSocket<"u"?{type:"native",constructor:globalThis.WebSocket}:{type:"unsupported",error:`Node.js ${o} detected but native WebSocket not found.`,workaround:"Provide a WebSocket implementation via the transport option."}:{type:"unsupported",error:`Node.js ${o} detected without native WebSocket support.`,workaround:`For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`}}}return{type:"unsupported",error:"Unknown JavaScript runtime without WebSocket support.",workaround:"Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."}}static getWebSocketConstructor(){const e=this.detectEnvironment();if(e.constructor)return e.constructor;let t=e.error||"WebSocket not supported in this environment.";throw e.workaround&&(t+=`

Suggested solution: ${e.workaround}`),new Error(t)}static createWebSocket(e,t){const a=this.getWebSocketConstructor();return new a(e,t)}static isWebSocketSupported(){try{const e=this.detectEnvironment();return e.type==="native"||e.type==="ws"}catch{return!1}}}const rr="2.95.3",ar=`realtime-js/${rr}`,nr="1.0.0",It="2.0.0",ot=It,Ye=1e4,or=1e3,sr=100;var U;(function(r){r[r.connecting=0]="connecting",r[r.open=1]="open",r[r.closing=2]="closing",r[r.closed=3]="closed"})(U||(U={}));var R;(function(r){r.closed="closed",r.errored="errored",r.joined="joined",r.joining="joining",r.leaving="leaving"})(R||(R={}));var j;(function(r){r.close="phx_close",r.error="phx_error",r.join="phx_join",r.reply="phx_reply",r.leave="phx_leave",r.access_token="access_token"})(j||(j={}));var qe;(function(r){r.websocket="websocket"})(qe||(qe={}));var K;(function(r){r.Connecting="connecting",r.Open="open",r.Closing="closing",r.Closed="closed"})(K||(K={}));class ir{constructor(e){this.HEADER_LENGTH=1,this.USER_BROADCAST_PUSH_META_LENGTH=6,this.KINDS={userBroadcastPush:3,userBroadcast:4},this.BINARY_ENCODING=0,this.JSON_ENCODING=1,this.BROADCAST_EVENT="broadcast",this.allowedMetadataKeys=[],this.allowedMetadataKeys=e??[]}encode(e,t){if(e.event===this.BROADCAST_EVENT&&!(e.payload instanceof ArrayBuffer)&&typeof e.payload.event=="string")return t(this._binaryEncodeUserBroadcastPush(e));let a=[e.join_ref,e.ref,e.topic,e.event,e.payload];return t(JSON.stringify(a))}_binaryEncodeUserBroadcastPush(e){var t;return this._isArrayBuffer((t=e.payload)===null||t===void 0?void 0:t.payload)?this._encodeBinaryUserBroadcastPush(e):this._encodeJsonUserBroadcastPush(e)}_encodeBinaryUserBroadcastPush(e){var t,a;const n=(a=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&a!==void 0?a:new ArrayBuffer(0);return this._encodeUserBroadcastPush(e,this.BINARY_ENCODING,n)}_encodeJsonUserBroadcastPush(e){var t,a;const n=(a=(t=e.payload)===null||t===void 0?void 0:t.payload)!==null&&a!==void 0?a:{},s=new TextEncoder().encode(JSON.stringify(n)).buffer;return this._encodeUserBroadcastPush(e,this.JSON_ENCODING,s)}_encodeUserBroadcastPush(e,t,a){var n,o;const s=e.topic,i=(n=e.ref)!==null&&n!==void 0?n:"",l=(o=e.join_ref)!==null&&o!==void 0?o:"",u=e.payload.event,c=this.allowedMetadataKeys?this._pick(e.payload,this.allowedMetadataKeys):{},y=Object.keys(c).length===0?"":JSON.stringify(c);if(l.length>255)throw new Error(`joinRef length ${l.length} exceeds maximum of 255`);if(i.length>255)throw new Error(`ref length ${i.length} exceeds maximum of 255`);if(s.length>255)throw new Error(`topic length ${s.length} exceeds maximum of 255`);if(u.length>255)throw new Error(`userEvent length ${u.length} exceeds maximum of 255`);if(y.length>255)throw new Error(`metadata length ${y.length} exceeds maximum of 255`);const d=this.USER_BROADCAST_PUSH_META_LENGTH+l.length+i.length+s.length+u.length+y.length,h=new ArrayBuffer(this.HEADER_LENGTH+d);let m=new DataView(h),f=0;m.setUint8(f++,this.KINDS.userBroadcastPush),m.setUint8(f++,l.length),m.setUint8(f++,i.length),m.setUint8(f++,s.length),m.setUint8(f++,u.length),m.setUint8(f++,y.length),m.setUint8(f++,t),Array.from(l,w=>m.setUint8(f++,w.charCodeAt(0))),Array.from(i,w=>m.setUint8(f++,w.charCodeAt(0))),Array.from(s,w=>m.setUint8(f++,w.charCodeAt(0))),Array.from(u,w=>m.setUint8(f++,w.charCodeAt(0))),Array.from(y,w=>m.setUint8(f++,w.charCodeAt(0)));var g=new Uint8Array(h.byteLength+a.byteLength);return g.set(new Uint8Array(h),0),g.set(new Uint8Array(a),h.byteLength),g.buffer}decode(e,t){if(this._isArrayBuffer(e)){let a=this._binaryDecode(e);return t(a)}if(typeof e=="string"){const a=JSON.parse(e),[n,o,s,i,l]=a;return t({join_ref:n,ref:o,topic:s,event:i,payload:l})}return t({})}_binaryDecode(e){const t=new DataView(e),a=t.getUint8(0),n=new TextDecoder;switch(a){case this.KINDS.userBroadcast:return this._decodeUserBroadcast(e,t,n)}}_decodeUserBroadcast(e,t,a){const n=t.getUint8(1),o=t.getUint8(2),s=t.getUint8(3),i=t.getUint8(4);let l=this.HEADER_LENGTH+4;const u=a.decode(e.slice(l,l+n));l=l+n;const c=a.decode(e.slice(l,l+o));l=l+o;const y=a.decode(e.slice(l,l+s));l=l+s;const d=e.slice(l,e.byteLength),h=i===this.JSON_ENCODING?JSON.parse(a.decode(d)):d,m={type:this.BROADCAST_EVENT,event:c,payload:h};return s>0&&(m.meta=JSON.parse(y)),{join_ref:null,ref:null,topic:u,event:this.BROADCAST_EVENT,payload:m}}_isArrayBuffer(e){var t;return e instanceof ArrayBuffer||((t=e==null?void 0:e.constructor)===null||t===void 0?void 0:t.name)==="ArrayBuffer"}_pick(e,t){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).filter(([a])=>t.includes(a)))}}class Et{constructor(e,t){this.callback=e,this.timerCalc=t,this.timer=void 0,this.tries=0,this.callback=e,this.timerCalc=t}reset(){this.tries=0,clearTimeout(this.timer),this.timer=void 0}scheduleTimeout(){clearTimeout(this.timer),this.timer=setTimeout(()=>{this.tries=this.tries+1,this.callback()},this.timerCalc(this.tries+1))}}var $;(function(r){r.abstime="abstime",r.bool="bool",r.date="date",r.daterange="daterange",r.float4="float4",r.float8="float8",r.int2="int2",r.int4="int4",r.int4range="int4range",r.int8="int8",r.int8range="int8range",r.json="json",r.jsonb="jsonb",r.money="money",r.numeric="numeric",r.oid="oid",r.reltime="reltime",r.text="text",r.time="time",r.timestamp="timestamp",r.timestamptz="timestamptz",r.timetz="timetz",r.tsrange="tsrange",r.tstzrange="tstzrange"})($||($={}));const st=(r,e,t={})=>{var a;const n=(a=t.skipTypes)!==null&&a!==void 0?a:[];return e?Object.keys(e).reduce((o,s)=>(o[s]=lr(s,r,e,n),o),{}):{}},lr=(r,e,t,a)=>{const n=e.find(i=>i.name===r),o=n==null?void 0:n.type,s=t[r];return o&&!a.includes(o)?Rt(o,s):Ge(s)},Rt=(r,e)=>{if(r.charAt(0)==="_"){const t=r.slice(1,r.length);return dr(e,t)}switch(r){case $.bool:return ur(e);case $.float4:case $.float8:case $.int2:case $.int4:case $.int8:case $.numeric:case $.oid:return cr(e);case $.json:case $.jsonb:return hr(e);case $.timestamp:return yr(e);case $.abstime:case $.date:case $.daterange:case $.int4range:case $.int8range:case $.money:case $.reltime:case $.text:case $.time:case $.timestamptz:case $.timetz:case $.tsrange:case $.tstzrange:return Ge(e);default:return Ge(e)}},Ge=r=>r,ur=r=>{switch(r){case"t":return!0;case"f":return!1;default:return r}},cr=r=>{if(typeof r=="string"){const e=parseFloat(r);if(!Number.isNaN(e))return e}return r},hr=r=>{if(typeof r=="string")try{return JSON.parse(r)}catch{return r}return r},dr=(r,e)=>{if(typeof r!="string")return r;const t=r.length-1,a=r[t];if(r[0]==="{"&&a==="}"){let o;const s=r.slice(1,t);try{o=JSON.parse("["+s+"]")}catch{o=s?s.split(","):[]}return o.map(i=>Rt(e,i))}return r},yr=r=>typeof r=="string"?r.replace(" ","T"):r,Ct=r=>{const e=new URL(r);return e.protocol=e.protocol.replace(/^ws/i,"http"),e.pathname=e.pathname.replace(/\/+$/,"").replace(/\/socket\/websocket$/i,"").replace(/\/socket$/i,"").replace(/\/websocket$/i,""),e.pathname===""||e.pathname==="/"?e.pathname="/api/broadcast":e.pathname=e.pathname+"/api/broadcast",e.href};class De{constructor(e,t,a={},n=Ye){this.channel=e,this.event=t,this.payload=a,this.timeout=n,this.sent=!1,this.timeoutTimer=void 0,this.ref="",this.receivedResp=null,this.recHooks=[],this.refEvent=null}resend(e){this.timeout=e,this._cancelRefEvent(),this.ref="",this.refEvent=null,this.receivedResp=null,this.sent=!1,this.send()}send(){this._hasReceived("timeout")||(this.startTimeout(),this.sent=!0,this.channel.socket.push({topic:this.channel.topic,event:this.event,payload:this.payload,ref:this.ref,join_ref:this.channel._joinRef()}))}updatePayload(e){this.payload=Object.assign(Object.assign({},this.payload),e)}receive(e,t){var a;return this._hasReceived(e)&&t((a=this.receivedResp)===null||a===void 0?void 0:a.response),this.recHooks.push({status:e,callback:t}),this}startTimeout(){if(this.timeoutTimer)return;this.ref=this.channel.socket._makeRef(),this.refEvent=this.channel._replyEventName(this.ref);const e=t=>{this._cancelRefEvent(),this._cancelTimeout(),this.receivedResp=t,this._matchReceive(t)};this.channel._on(this.refEvent,{},e),this.timeoutTimer=setTimeout(()=>{this.trigger("timeout",{})},this.timeout)}trigger(e,t){this.refEvent&&this.channel._trigger(this.refEvent,{status:e,response:t})}destroy(){this._cancelRefEvent(),this._cancelTimeout()}_cancelRefEvent(){this.refEvent&&this.channel._off(this.refEvent,{})}_cancelTimeout(){clearTimeout(this.timeoutTimer),this.timeoutTimer=void 0}_matchReceive({status:e,response:t}){this.recHooks.filter(a=>a.status===e).forEach(a=>a.callback(t))}_hasReceived(e){return this.receivedResp&&this.receivedResp.status===e}}var it;(function(r){r.SYNC="sync",r.JOIN="join",r.LEAVE="leave"})(it||(it={}));class ce{constructor(e,t){this.channel=e,this.state={},this.pendingDiffs=[],this.joinRef=null,this.enabled=!1,this.caller={onJoin:()=>{},onLeave:()=>{},onSync:()=>{}};const a=(t==null?void 0:t.events)||{state:"presence_state",diff:"presence_diff"};this.channel._on(a.state,{},n=>{const{onJoin:o,onLeave:s,onSync:i}=this.caller;this.joinRef=this.channel._joinRef(),this.state=ce.syncState(this.state,n,o,s),this.pendingDiffs.forEach(l=>{this.state=ce.syncDiff(this.state,l,o,s)}),this.pendingDiffs=[],i()}),this.channel._on(a.diff,{},n=>{const{onJoin:o,onLeave:s,onSync:i}=this.caller;this.inPendingSyncState()?this.pendingDiffs.push(n):(this.state=ce.syncDiff(this.state,n,o,s),i())}),this.onJoin((n,o,s)=>{this.channel._trigger("presence",{event:"join",key:n,currentPresences:o,newPresences:s})}),this.onLeave((n,o,s)=>{this.channel._trigger("presence",{event:"leave",key:n,currentPresences:o,leftPresences:s})}),this.onSync(()=>{this.channel._trigger("presence",{event:"sync"})})}static syncState(e,t,a,n){const o=this.cloneDeep(e),s=this.transformState(t),i={},l={};return this.map(o,(u,c)=>{s[u]||(l[u]=c)}),this.map(s,(u,c)=>{const y=o[u];if(y){const d=c.map(g=>g.presence_ref),h=y.map(g=>g.presence_ref),m=c.filter(g=>h.indexOf(g.presence_ref)<0),f=y.filter(g=>d.indexOf(g.presence_ref)<0);m.length>0&&(i[u]=m),f.length>0&&(l[u]=f)}else i[u]=c}),this.syncDiff(o,{joins:i,leaves:l},a,n)}static syncDiff(e,t,a,n){const{joins:o,leaves:s}={joins:this.transformState(t.joins),leaves:this.transformState(t.leaves)};return a||(a=()=>{}),n||(n=()=>{}),this.map(o,(i,l)=>{var u;const c=(u=e[i])!==null&&u!==void 0?u:[];if(e[i]=this.cloneDeep(l),c.length>0){const y=e[i].map(h=>h.presence_ref),d=c.filter(h=>y.indexOf(h.presence_ref)<0);e[i].unshift(...d)}a(i,c,l)}),this.map(s,(i,l)=>{let u=e[i];if(!u)return;const c=l.map(y=>y.presence_ref);u=u.filter(y=>c.indexOf(y.presence_ref)<0),e[i]=u,n(i,u,l),u.length===0&&delete e[i]}),e}static map(e,t){return Object.getOwnPropertyNames(e).map(a=>t(a,e[a]))}static transformState(e){return e=this.cloneDeep(e),Object.getOwnPropertyNames(e).reduce((t,a)=>{const n=e[a];return"metas"in n?t[a]=n.metas.map(o=>(o.presence_ref=o.phx_ref,delete o.phx_ref,delete o.phx_ref_prev,o)):t[a]=n,t},{})}static cloneDeep(e){return JSON.parse(JSON.stringify(e))}onJoin(e){this.caller.onJoin=e}onLeave(e){this.caller.onLeave=e}onSync(e){this.caller.onSync=e}inPendingSyncState(){return!this.joinRef||this.joinRef!==this.channel._joinRef()}}var lt;(function(r){r.ALL="*",r.INSERT="INSERT",r.UPDATE="UPDATE",r.DELETE="DELETE"})(lt||(lt={}));var he;(function(r){r.BROADCAST="broadcast",r.PRESENCE="presence",r.POSTGRES_CHANGES="postgres_changes",r.SYSTEM="system"})(he||(he={}));var L;(function(r){r.SUBSCRIBED="SUBSCRIBED",r.TIMED_OUT="TIMED_OUT",r.CLOSED="CLOSED",r.CHANNEL_ERROR="CHANNEL_ERROR"})(L||(L={}));class oe{constructor(e,t={config:{}},a){var n,o;if(this.topic=e,this.params=t,this.socket=a,this.bindings={},this.state=R.closed,this.joinedOnce=!1,this.pushBuffer=[],this.subTopic=e.replace(/^realtime:/i,""),this.params.config=Object.assign({broadcast:{ack:!1,self:!1},presence:{key:"",enabled:!1},private:!1},t.config),this.timeout=this.socket.timeout,this.joinPush=new De(this,j.join,this.params,this.timeout),this.rejoinTimer=new Et(()=>this._rejoinUntilConnected(),this.socket.reconnectAfterMs),this.joinPush.receive("ok",()=>{this.state=R.joined,this.rejoinTimer.reset(),this.pushBuffer.forEach(s=>s.send()),this.pushBuffer=[]}),this._onClose(()=>{this.rejoinTimer.reset(),this.socket.log("channel",`close ${this.topic} ${this._joinRef()}`),this.state=R.closed,this.socket._remove(this)}),this._onError(s=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,s),this.state=R.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("timeout",()=>{this._isJoining()&&(this.socket.log("channel",`timeout ${this.topic}`,this.joinPush.timeout),this.state=R.errored,this.rejoinTimer.scheduleTimeout())}),this.joinPush.receive("error",s=>{this._isLeaving()||this._isClosed()||(this.socket.log("channel",`error ${this.topic}`,s),this.state=R.errored,this.rejoinTimer.scheduleTimeout())}),this._on(j.reply,{},(s,i)=>{this._trigger(this._replyEventName(i),s)}),this.presence=new ce(this),this.broadcastEndpointURL=Ct(this.socket.endPoint),this.private=this.params.config.private||!1,!this.private&&(!((o=(n=this.params.config)===null||n===void 0?void 0:n.broadcast)===null||o===void 0)&&o.replay))throw`tried to use replay on public channel '${this.topic}'. It must be a private channel.`}subscribe(e,t=this.timeout){var a,n,o;if(this.socket.isConnected()||this.socket.connect(),this.state==R.closed){const{config:{broadcast:s,presence:i,private:l}}=this.params,u=(n=(a=this.bindings.postgres_changes)===null||a===void 0?void 0:a.map(h=>h.filter))!==null&&n!==void 0?n:[],c=!!this.bindings[he.PRESENCE]&&this.bindings[he.PRESENCE].length>0||((o=this.params.config.presence)===null||o===void 0?void 0:o.enabled)===!0,y={},d={broadcast:s,presence:Object.assign(Object.assign({},i),{enabled:c}),postgres_changes:u,private:l};this.socket.accessTokenValue&&(y.access_token=this.socket.accessTokenValue),this._onError(h=>e==null?void 0:e(L.CHANNEL_ERROR,h)),this._onClose(()=>e==null?void 0:e(L.CLOSED)),this.updateJoinPayload(Object.assign({config:d},y)),this.joinedOnce=!0,this._rejoin(t),this.joinPush.receive("ok",async({postgres_changes:h})=>{var m;if(this.socket._isManualToken()||this.socket.setAuth(),h===void 0){e==null||e(L.SUBSCRIBED);return}else{const f=this.bindings.postgres_changes,g=(m=f==null?void 0:f.length)!==null&&m!==void 0?m:0,w=[];for(let b=0;b<g;b++){const p=f[b],{filter:{event:_,schema:C,table:S,filter:E}}=p,W=h&&h[b];if(W&&W.event===_&&oe.isFilterValueEqual(W.schema,C)&&oe.isFilterValueEqual(W.table,S)&&oe.isFilterValueEqual(W.filter,E))w.push(Object.assign(Object.assign({},p),{id:W.id}));else{this.unsubscribe(),this.state=R.errored,e==null||e(L.CHANNEL_ERROR,new Error("mismatch between server and client bindings for postgres changes"));return}}this.bindings.postgres_changes=w,e&&e(L.SUBSCRIBED);return}}).receive("error",h=>{this.state=R.errored,e==null||e(L.CHANNEL_ERROR,new Error(JSON.stringify(Object.values(h).join(", ")||"error")))}).receive("timeout",()=>{e==null||e(L.TIMED_OUT)})}return this}presenceState(){return this.presence.state}async track(e,t={}){return await this.send({type:"presence",event:"track",payload:e},t.timeout||this.timeout)}async untrack(e={}){return await this.send({type:"presence",event:"untrack"},e)}on(e,t,a){return this.state===R.joined&&e===he.PRESENCE&&(this.socket.log("channel",`resubscribe to ${this.topic} due to change in presence callbacks on joined channel`),this.unsubscribe().then(async()=>await this.subscribe())),this._on(e,t,a)}async httpSend(e,t,a={}){var n;if(t==null)return Promise.reject("Payload is required for httpSend()");const o={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(o.Authorization=`Bearer ${this.socket.accessTokenValue}`);const s={method:"POST",headers:o,body:JSON.stringify({messages:[{topic:this.subTopic,event:e,payload:t,private:this.private}]})},i=await this._fetchWithTimeout(this.broadcastEndpointURL,s,(n=a.timeout)!==null&&n!==void 0?n:this.timeout);if(i.status===202)return{success:!0};let l=i.statusText;try{const u=await i.json();l=u.error||u.message||l}catch{}return Promise.reject(new Error(l))}async send(e,t={}){var a,n;if(!this._canPush()&&e.type==="broadcast"){console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");const{event:o,payload:s}=e,i={apikey:this.socket.apiKey?this.socket.apiKey:"","Content-Type":"application/json"};this.socket.accessTokenValue&&(i.Authorization=`Bearer ${this.socket.accessTokenValue}`);const l={method:"POST",headers:i,body:JSON.stringify({messages:[{topic:this.subTopic,event:o,payload:s,private:this.private}]})};try{const u=await this._fetchWithTimeout(this.broadcastEndpointURL,l,(a=t.timeout)!==null&&a!==void 0?a:this.timeout);return await((n=u.body)===null||n===void 0?void 0:n.cancel()),u.ok?"ok":"error"}catch(u){return u.name==="AbortError"?"timed out":"error"}}else return new Promise(o=>{var s,i,l;const u=this._push(e.type,e,t.timeout||this.timeout);e.type==="broadcast"&&!(!((l=(i=(s=this.params)===null||s===void 0?void 0:s.config)===null||i===void 0?void 0:i.broadcast)===null||l===void 0)&&l.ack)&&o("ok"),u.receive("ok",()=>o("ok")),u.receive("error",()=>o("error")),u.receive("timeout",()=>o("timed out"))})}updateJoinPayload(e){this.joinPush.updatePayload(e)}unsubscribe(e=this.timeout){this.state=R.leaving;const t=()=>{this.socket.log("channel",`leave ${this.topic}`),this._trigger(j.close,"leave",this._joinRef())};this.joinPush.destroy();let a=null;return new Promise(n=>{a=new De(this,j.leave,{},e),a.receive("ok",()=>{t(),n("ok")}).receive("timeout",()=>{t(),n("timed out")}).receive("error",()=>{n("error")}),a.send(),this._canPush()||a.trigger("ok",{})}).finally(()=>{a==null||a.destroy()})}teardown(){this.pushBuffer.forEach(e=>e.destroy()),this.pushBuffer=[],this.rejoinTimer.reset(),this.joinPush.destroy(),this.state=R.closed,this.bindings={}}async _fetchWithTimeout(e,t,a){const n=new AbortController,o=setTimeout(()=>n.abort(),a),s=await this.socket.fetch(e,Object.assign(Object.assign({},t),{signal:n.signal}));return clearTimeout(o),s}_push(e,t,a=this.timeout){if(!this.joinedOnce)throw`tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;let n=new De(this,e,t,a);return this._canPush()?n.send():this._addToPushBuffer(n),n}_addToPushBuffer(e){if(e.startTimeout(),this.pushBuffer.push(e),this.pushBuffer.length>sr){const t=this.pushBuffer.shift();t&&(t.destroy(),this.socket.log("channel",`discarded push due to buffer overflow: ${t.event}`,t.payload))}}_onMessage(e,t,a){return t}_isMember(e){return this.topic===e}_joinRef(){return this.joinPush.ref}_trigger(e,t,a){var n,o;const s=e.toLocaleLowerCase(),{close:i,error:l,leave:u,join:c}=j;if(a&&[i,l,u,c].indexOf(s)>=0&&a!==this._joinRef())return;let d=this._onMessage(s,t,a);if(t&&!d)throw"channel onMessage callbacks must return the payload, modified or unmodified";["insert","update","delete"].includes(s)?(n=this.bindings.postgres_changes)===null||n===void 0||n.filter(h=>{var m,f,g;return((m=h.filter)===null||m===void 0?void 0:m.event)==="*"||((g=(f=h.filter)===null||f===void 0?void 0:f.event)===null||g===void 0?void 0:g.toLocaleLowerCase())===s}).map(h=>h.callback(d,a)):(o=this.bindings[s])===null||o===void 0||o.filter(h=>{var m,f,g,w,b,p;if(["broadcast","presence","postgres_changes"].includes(s))if("id"in h){const _=h.id,C=(m=h.filter)===null||m===void 0?void 0:m.event;return _&&((f=t.ids)===null||f===void 0?void 0:f.includes(_))&&(C==="*"||(C==null?void 0:C.toLocaleLowerCase())===((g=t.data)===null||g===void 0?void 0:g.type.toLocaleLowerCase()))}else{const _=(b=(w=h==null?void 0:h.filter)===null||w===void 0?void 0:w.event)===null||b===void 0?void 0:b.toLocaleLowerCase();return _==="*"||_===((p=t==null?void 0:t.event)===null||p===void 0?void 0:p.toLocaleLowerCase())}else return h.type.toLocaleLowerCase()===s}).map(h=>{if(typeof d=="object"&&"ids"in d){const m=d.data,{schema:f,table:g,commit_timestamp:w,type:b,errors:p}=m;d=Object.assign(Object.assign({},{schema:f,table:g,commit_timestamp:w,eventType:b,new:{},old:{},errors:p}),this._getPayloadRecords(m))}h.callback(d,a)})}_isClosed(){return this.state===R.closed}_isJoined(){return this.state===R.joined}_isJoining(){return this.state===R.joining}_isLeaving(){return this.state===R.leaving}_replyEventName(e){return`chan_reply_${e}`}_on(e,t,a){const n=e.toLocaleLowerCase(),o={type:n,filter:t,callback:a};return this.bindings[n]?this.bindings[n].push(o):this.bindings[n]=[o],this}_off(e,t){const a=e.toLocaleLowerCase();return this.bindings[a]&&(this.bindings[a]=this.bindings[a].filter(n=>{var o;return!(((o=n.type)===null||o===void 0?void 0:o.toLocaleLowerCase())===a&&oe.isEqual(n.filter,t))})),this}static isEqual(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const a in e)if(e[a]!==t[a])return!1;return!0}static isFilterValueEqual(e,t){return(e??void 0)===(t??void 0)}_rejoinUntilConnected(){this.rejoinTimer.scheduleTimeout(),this.socket.isConnected()&&this._rejoin()}_onClose(e){this._on(j.close,{},e)}_onError(e){this._on(j.error,{},t=>e(t))}_canPush(){return this.socket.isConnected()&&this._isJoined()}_rejoin(e=this.timeout){this._isLeaving()||(this.socket._leaveOpenTopic(this.topic),this.state=R.joining,this.joinPush.resend(e))}_getPayloadRecords(e){const t={new:{},old:{}};return(e.type==="INSERT"||e.type==="UPDATE")&&(t.new=st(e.columns,e.record)),(e.type==="UPDATE"||e.type==="DELETE")&&(t.old=st(e.columns,e.old_record)),t}}const Be=()=>{},ke={HEARTBEAT_INTERVAL:25e3,RECONNECT_DELAY:10,HEARTBEAT_TIMEOUT_FALLBACK:100},mr=[1e3,2e3,5e3,1e4],fr=1e4,gr=`
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;class pr{constructor(e,t){var a;if(this.accessTokenValue=null,this.apiKey=null,this._manuallySetToken=!1,this.channels=new Array,this.endPoint="",this.httpEndpoint="",this.headers={},this.params={},this.timeout=Ye,this.transport=null,this.heartbeatIntervalMs=ke.HEARTBEAT_INTERVAL,this.heartbeatTimer=void 0,this.pendingHeartbeatRef=null,this.heartbeatCallback=Be,this.ref=0,this.reconnectTimer=null,this.vsn=ot,this.logger=Be,this.conn=null,this.sendBuffer=[],this.serializer=new ir,this.stateChangeCallbacks={open:[],close:[],error:[],message:[]},this.accessToken=null,this._connectionState="disconnected",this._wasManualDisconnect=!1,this._authPromise=null,this._heartbeatSentAt=null,this._resolveFetch=n=>n?(...o)=>n(...o):(...o)=>fetch(...o),!(!((a=t==null?void 0:t.params)===null||a===void 0)&&a.apikey))throw new Error("API key is required to connect to Realtime");this.apiKey=t.params.apikey,this.endPoint=`${e}/${qe.websocket}`,this.httpEndpoint=Ct(e),this._initializeOptions(t),this._setupReconnectionTimer(),this.fetch=this._resolveFetch(t==null?void 0:t.fetch)}connect(){if(!(this.isConnecting()||this.isDisconnecting()||this.conn!==null&&this.isConnected())){if(this._setConnectionState("connecting"),this.accessToken&&!this._authPromise&&this._setAuthSafely("connect"),this.transport)this.conn=new this.transport(this.endpointURL());else try{this.conn=tr.createWebSocket(this.endpointURL())}catch(e){this._setConnectionState("disconnected");const t=e.message;throw t.includes("Node.js")?new Error(`${t}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`):new Error(`WebSocket not available: ${t}`)}this._setupConnectionHandlers()}}endpointURL(){return this._appendParams(this.endPoint,Object.assign({},this.params,{vsn:this.vsn}))}disconnect(e,t){if(!this.isDisconnecting())if(this._setConnectionState("disconnecting",!0),this.conn){const a=setTimeout(()=>{this._setConnectionState("disconnected")},100);this.conn.onclose=()=>{clearTimeout(a),this._setConnectionState("disconnected")},typeof this.conn.close=="function"&&(e?this.conn.close(e,t??""):this.conn.close()),this._teardownConnection()}else this._setConnectionState("disconnected")}getChannels(){return this.channels}async removeChannel(e){const t=await e.unsubscribe();return t==="ok"&&this._remove(e),this.channels.length===0&&this.disconnect(),t}async removeAllChannels(){const e=await Promise.all(this.channels.map(t=>t.unsubscribe()));return this.channels=[],this.disconnect(),e}log(e,t,a){this.logger(e,t,a)}connectionState(){switch(this.conn&&this.conn.readyState){case U.connecting:return K.Connecting;case U.open:return K.Open;case U.closing:return K.Closing;default:return K.Closed}}isConnected(){return this.connectionState()===K.Open}isConnecting(){return this._connectionState==="connecting"}isDisconnecting(){return this._connectionState==="disconnecting"}channel(e,t={config:{}}){const a=`realtime:${e}`,n=this.getChannels().find(o=>o.topic===a);if(n)return n;{const o=new oe(`realtime:${e}`,t,this);return this.channels.push(o),o}}push(e){const{topic:t,event:a,payload:n,ref:o}=e,s=()=>{this.encode(e,i=>{var l;(l=this.conn)===null||l===void 0||l.send(i)})};this.log("push",`${t} ${a} (${o})`,n),this.isConnected()?s():this.sendBuffer.push(s)}async setAuth(e=null){this._authPromise=this._performAuth(e);try{await this._authPromise}finally{this._authPromise=null}}_isManualToken(){return this._manuallySetToken}async sendHeartbeat(){var e;if(!this.isConnected()){try{this.heartbeatCallback("disconnected")}catch(t){this.log("error","error in heartbeat callback",t)}return}if(this.pendingHeartbeatRef){this.pendingHeartbeatRef=null,this._heartbeatSentAt=null,this.log("transport","heartbeat timeout. Attempting to re-establish connection");try{this.heartbeatCallback("timeout")}catch(t){this.log("error","error in heartbeat callback",t)}this._wasManualDisconnect=!1,(e=this.conn)===null||e===void 0||e.close(or,"heartbeat timeout"),setTimeout(()=>{var t;this.isConnected()||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout()},ke.HEARTBEAT_TIMEOUT_FALLBACK);return}this._heartbeatSentAt=Date.now(),this.pendingHeartbeatRef=this._makeRef(),this.push({topic:"phoenix",event:"heartbeat",payload:{},ref:this.pendingHeartbeatRef});try{this.heartbeatCallback("sent")}catch(t){this.log("error","error in heartbeat callback",t)}this._setAuthSafely("heartbeat")}onHeartbeat(e){this.heartbeatCallback=e}flushSendBuffer(){this.isConnected()&&this.sendBuffer.length>0&&(this.sendBuffer.forEach(e=>e()),this.sendBuffer=[])}_makeRef(){let e=this.ref+1;return e===this.ref?this.ref=0:this.ref=e,this.ref.toString()}_leaveOpenTopic(e){let t=this.channels.find(a=>a.topic===e&&(a._isJoined()||a._isJoining()));t&&(this.log("transport",`leaving duplicate topic "${e}"`),t.unsubscribe())}_remove(e){this.channels=this.channels.filter(t=>t.topic!==e.topic)}_onConnMessage(e){this.decode(e.data,t=>{if(t.topic==="phoenix"&&t.event==="phx_reply"&&t.ref&&t.ref===this.pendingHeartbeatRef){const u=this._heartbeatSentAt?Date.now()-this._heartbeatSentAt:void 0;try{this.heartbeatCallback(t.payload.status==="ok"?"ok":"error",u)}catch(c){this.log("error","error in heartbeat callback",c)}this._heartbeatSentAt=null,this.pendingHeartbeatRef=null}const{topic:a,event:n,payload:o,ref:s}=t,i=s?`(${s})`:"",l=o.status||"";this.log("receive",`${l} ${a} ${n} ${i}`.trim(),o),this.channels.filter(u=>u._isMember(a)).forEach(u=>u._trigger(n,o,s)),this._triggerStateCallbacks("message",t)})}_clearTimer(e){var t;e==="heartbeat"&&this.heartbeatTimer?(clearInterval(this.heartbeatTimer),this.heartbeatTimer=void 0):e==="reconnect"&&((t=this.reconnectTimer)===null||t===void 0||t.reset())}_clearAllTimers(){this._clearTimer("heartbeat"),this._clearTimer("reconnect")}_setupConnectionHandlers(){this.conn&&("binaryType"in this.conn&&(this.conn.binaryType="arraybuffer"),this.conn.onopen=()=>this._onConnOpen(),this.conn.onerror=e=>this._onConnError(e),this.conn.onmessage=e=>this._onConnMessage(e),this.conn.onclose=e=>this._onConnClose(e),this.conn.readyState===U.open&&this._onConnOpen())}_teardownConnection(){if(this.conn){if(this.conn.readyState===U.open||this.conn.readyState===U.connecting)try{this.conn.close()}catch(e){this.log("error","Error closing connection",e)}this.conn.onopen=null,this.conn.onerror=null,this.conn.onmessage=null,this.conn.onclose=null,this.conn=null}this._clearAllTimers(),this._terminateWorker(),this.channels.forEach(e=>e.teardown())}_onConnOpen(){this._setConnectionState("connected"),this.log("transport",`connected to ${this.endpointURL()}`),(this._authPromise||(this.accessToken&&!this.accessTokenValue?this.setAuth():Promise.resolve())).then(()=>{this.flushSendBuffer()}).catch(t=>{this.log("error","error waiting for auth on connect",t),this.flushSendBuffer()}),this._clearTimer("reconnect"),this.worker?this.workerRef||this._startWorkerHeartbeat():this._startHeartbeat(),this._triggerStateCallbacks("open")}_startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>this.sendHeartbeat(),this.heartbeatIntervalMs)}_startWorkerHeartbeat(){this.workerUrl?this.log("worker",`starting worker for from ${this.workerUrl}`):this.log("worker","starting default worker");const e=this._workerObjectUrl(this.workerUrl);this.workerRef=new Worker(e),this.workerRef.onerror=t=>{this.log("worker","worker error",t.message),this._terminateWorker()},this.workerRef.onmessage=t=>{t.data.event==="keepAlive"&&this.sendHeartbeat()},this.workerRef.postMessage({event:"start",interval:this.heartbeatIntervalMs})}_terminateWorker(){this.workerRef&&(this.log("worker","terminating worker"),this.workerRef.terminate(),this.workerRef=void 0)}_onConnClose(e){var t;this._setConnectionState("disconnected"),this.log("transport","close",e),this._triggerChanError(),this._clearTimer("heartbeat"),this._wasManualDisconnect||(t=this.reconnectTimer)===null||t===void 0||t.scheduleTimeout(),this._triggerStateCallbacks("close",e)}_onConnError(e){this._setConnectionState("disconnected"),this.log("transport",`${e}`),this._triggerChanError(),this._triggerStateCallbacks("error",e);try{this.heartbeatCallback("error")}catch(t){this.log("error","error in heartbeat callback",t)}}_triggerChanError(){this.channels.forEach(e=>e._trigger(j.error))}_appendParams(e,t){if(Object.keys(t).length===0)return e;const a=e.match(/\?/)?"&":"?",n=new URLSearchParams(t);return`${e}${a}${n}`}_workerObjectUrl(e){let t;if(e)t=e;else{const a=new Blob([gr],{type:"application/javascript"});t=URL.createObjectURL(a)}return t}_setConnectionState(e,t=!1){this._connectionState=e,e==="connecting"?this._wasManualDisconnect=!1:e==="disconnecting"&&(this._wasManualDisconnect=t)}async _performAuth(e=null){let t,a=!1;if(e)t=e,a=!0;else if(this.accessToken)try{t=await this.accessToken()}catch(n){this.log("error","Error fetching access token from callback",n),t=this.accessTokenValue}else t=this.accessTokenValue;a?this._manuallySetToken=!0:this.accessToken&&(this._manuallySetToken=!1),this.accessTokenValue!=t&&(this.accessTokenValue=t,this.channels.forEach(n=>{const o={access_token:t,version:ar};t&&n.updateJoinPayload(o),n.joinedOnce&&n._isJoined()&&n._push(j.access_token,{access_token:t})}))}async _waitForAuthIfNeeded(){this._authPromise&&await this._authPromise}_setAuthSafely(e="general"){this._isManualToken()||this.setAuth().catch(t=>{this.log("error",`Error setting auth in ${e}`,t)})}_triggerStateCallbacks(e,t){try{this.stateChangeCallbacks[e].forEach(a=>{try{a(t)}catch(n){this.log("error",`error in ${e} callback`,n)}})}catch(a){this.log("error",`error triggering ${e} callbacks`,a)}}_setupReconnectionTimer(){this.reconnectTimer=new Et(async()=>{setTimeout(async()=>{await this._waitForAuthIfNeeded(),this.isConnected()||this.connect()},ke.RECONNECT_DELAY)},this.reconnectAfterMs)}_initializeOptions(e){var t,a,n,o,s,i,l,u,c,y,d,h;switch(this.transport=(t=e==null?void 0:e.transport)!==null&&t!==void 0?t:null,this.timeout=(a=e==null?void 0:e.timeout)!==null&&a!==void 0?a:Ye,this.heartbeatIntervalMs=(n=e==null?void 0:e.heartbeatIntervalMs)!==null&&n!==void 0?n:ke.HEARTBEAT_INTERVAL,this.worker=(o=e==null?void 0:e.worker)!==null&&o!==void 0?o:!1,this.accessToken=(s=e==null?void 0:e.accessToken)!==null&&s!==void 0?s:null,this.heartbeatCallback=(i=e==null?void 0:e.heartbeatCallback)!==null&&i!==void 0?i:Be,this.vsn=(l=e==null?void 0:e.vsn)!==null&&l!==void 0?l:ot,e!=null&&e.params&&(this.params=e.params),e!=null&&e.logger&&(this.logger=e.logger),(e!=null&&e.logLevel||e!=null&&e.log_level)&&(this.logLevel=e.logLevel||e.log_level,this.params=Object.assign(Object.assign({},this.params),{log_level:this.logLevel})),this.reconnectAfterMs=(u=e==null?void 0:e.reconnectAfterMs)!==null&&u!==void 0?u:m=>mr[m-1]||fr,this.vsn){case nr:this.encode=(c=e==null?void 0:e.encode)!==null&&c!==void 0?c:(m,f)=>f(JSON.stringify(m)),this.decode=(y=e==null?void 0:e.decode)!==null&&y!==void 0?y:(m,f)=>f(JSON.parse(m));break;case It:this.encode=(d=e==null?void 0:e.encode)!==null&&d!==void 0?d:this.serializer.encode.bind(this.serializer),this.decode=(h=e==null?void 0:e.decode)!==null&&h!==void 0?h:this.serializer.decode.bind(this.serializer);break;default:throw new Error(`Unsupported serializer version: ${this.vsn}`)}if(this.worker){if(typeof window<"u"&&!window.Worker)throw new Error("Web Worker is not supported");this.workerUrl=e==null?void 0:e.workerUrl}}}var ye=class extends Error{constructor(r,e){var t;super(r),this.name="IcebergError",this.status=e.status,this.icebergType=e.icebergType,this.icebergCode=e.icebergCode,this.details=e.details,this.isCommitStateUnknown=e.icebergType==="CommitStateUnknownException"||[500,502,504].includes(e.status)&&((t=e.icebergType)==null?void 0:t.includes("CommitState"))===!0}isNotFound(){return this.status===404}isConflict(){return this.status===409}isAuthenticationTimeout(){return this.status===419}};function wr(r,e,t){const a=new URL(e,r);if(t)for(const[n,o]of Object.entries(t))o!==void 0&&a.searchParams.set(n,o);return a.toString()}async function vr(r){return!r||r.type==="none"?{}:r.type==="bearer"?{Authorization:`Bearer ${r.token}`}:r.type==="header"?{[r.name]:r.value}:r.type==="custom"?await r.getHeaders():{}}function br(r){const e=r.fetchImpl??globalThis.fetch;return{async request({method:t,path:a,query:n,body:o,headers:s}){const i=wr(r.baseUrl,a,n),l=await vr(r.auth),u=await e(i,{method:t,headers:{...o?{"Content-Type":"application/json"}:{},...l,...s},body:o?JSON.stringify(o):void 0}),c=await u.text(),y=(u.headers.get("content-type")||"").includes("application/json"),d=y&&c?JSON.parse(c):c;if(!u.ok){const h=y?d:void 0,m=h==null?void 0:h.error;throw new ye((m==null?void 0:m.message)??`Request failed with status ${u.status}`,{status:u.status,icebergType:m==null?void 0:m.type,icebergCode:m==null?void 0:m.code,details:h})}return{status:u.status,headers:u.headers,data:d}}}}function Te(r){return r.join("")}var kr=class{constructor(r,e=""){this.client=r,this.prefix=e}async listNamespaces(r){const e=r?{parent:Te(r.namespace)}:void 0;return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces`,query:e})).data.namespaces.map(a=>({namespace:a}))}async createNamespace(r,e){const t={namespace:r.namespace,properties:e==null?void 0:e.properties};return(await this.client.request({method:"POST",path:`${this.prefix}/namespaces`,body:t})).data}async dropNamespace(r){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${Te(r.namespace)}`})}async loadNamespaceMetadata(r){return{properties:(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${Te(r.namespace)}`})).data.properties}}async namespaceExists(r){try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${Te(r.namespace)}`}),!0}catch(e){if(e instanceof ye&&e.status===404)return!1;throw e}}async createNamespaceIfNotExists(r,e){try{return await this.createNamespace(r,e)}catch(t){if(t instanceof ye&&t.status===409)return;throw t}}};function J(r){return r.join("")}var Tr=class{constructor(r,e="",t){this.client=r,this.prefix=e,this.accessDelegation=t}async listTables(r){return(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${J(r.namespace)}/tables`})).data.identifiers}async createTable(r,e){const t={};return this.accessDelegation&&(t["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${J(r.namespace)}/tables`,body:e,headers:t})).data.metadata}async updateTable(r,e){const t=await this.client.request({method:"POST",path:`${this.prefix}/namespaces/${J(r.namespace)}/tables/${r.name}`,body:e});return{"metadata-location":t.data["metadata-location"],metadata:t.data.metadata}}async dropTable(r,e){await this.client.request({method:"DELETE",path:`${this.prefix}/namespaces/${J(r.namespace)}/tables/${r.name}`,query:{purgeRequested:String((e==null?void 0:e.purge)??!1)}})}async loadTable(r){const e={};return this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation),(await this.client.request({method:"GET",path:`${this.prefix}/namespaces/${J(r.namespace)}/tables/${r.name}`,headers:e})).data.metadata}async tableExists(r){const e={};this.accessDelegation&&(e["X-Iceberg-Access-Delegation"]=this.accessDelegation);try{return await this.client.request({method:"HEAD",path:`${this.prefix}/namespaces/${J(r.namespace)}/tables/${r.name}`,headers:e}),!0}catch(t){if(t instanceof ye&&t.status===404)return!1;throw t}}async createTableIfNotExists(r,e){try{return await this.createTable(r,e)}catch(t){if(t instanceof ye&&t.status===409)return await this.loadTable({namespace:r.namespace,name:e.name});throw t}}},_r=class{constructor(r){var a;let e="v1";r.catalogName&&(e+=`/${r.catalogName}`);const t=r.baseUrl.endsWith("/")?r.baseUrl:`${r.baseUrl}/`;this.client=br({baseUrl:t,auth:r.auth,fetchImpl:r.fetch}),this.accessDelegation=(a=r.accessDelegation)==null?void 0:a.join(","),this.namespaceOps=new kr(this.client,e),this.tableOps=new Tr(this.client,e,this.accessDelegation)}async listNamespaces(r){return this.namespaceOps.listNamespaces(r)}async createNamespace(r,e){return this.namespaceOps.createNamespace(r,e)}async dropNamespace(r){await this.namespaceOps.dropNamespace(r)}async loadNamespaceMetadata(r){return this.namespaceOps.loadNamespaceMetadata(r)}async listTables(r){return this.tableOps.listTables(r)}async createTable(r,e){return this.tableOps.createTable(r,e)}async updateTable(r,e){return this.tableOps.updateTable(r,e)}async dropTable(r,e){await this.tableOps.dropTable(r,e)}async loadTable(r){return this.tableOps.loadTable(r)}async namespaceExists(r){return this.namespaceOps.namespaceExists(r)}async tableExists(r){return this.tableOps.tableExists(r)}async createNamespaceIfNotExists(r,e){return this.namespaceOps.createNamespaceIfNotExists(r,e)}async createTableIfNotExists(r,e){return this.tableOps.createTableIfNotExists(r,e)}},xe=class extends Error{constructor(r,e="storage",t,a){super(r),this.__isStorageError=!0,this.namespace=e,this.name=e==="vectors"?"StorageVectorsError":"StorageError",this.status=t,this.statusCode=a}};function Oe(r){return typeof r=="object"&&r!==null&&"__isStorageError"in r}var _e=class extends xe{constructor(r,e,t,a="storage"){super(r,a,e,t),this.name=a==="vectors"?"StorageVectorsApiError":"StorageApiError",this.status=e,this.statusCode=t}toJSON(){return{name:this.name,message:this.message,status:this.status,statusCode:this.statusCode}}},Pt=class extends xe{constructor(r,e,t="storage"){super(r,t),this.name=t==="vectors"?"StorageVectorsUnknownError":"StorageUnknownError",this.originalError=e}};const Sr=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),$r=r=>{if(typeof r!="object"||r===null)return!1;const e=Object.getPrototypeOf(r);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Symbol.toStringTag in r)&&!(Symbol.iterator in r)},Ke=r=>{if(Array.isArray(r))return r.map(t=>Ke(t));if(typeof r=="function"||r!==Object(r))return r;const e={};return Object.entries(r).forEach(([t,a])=>{const n=t.replace(/([-_][a-z])/gi,o=>o.toUpperCase().replace(/[-_]/g,""));e[n]=Ke(a)}),e},Ar=r=>!r||typeof r!="string"||r.length===0||r.length>100||r.trim()!==r||r.includes("/")||r.includes("\\")?!1:/^[\w!.\*'() &$@=;:+,?-]+$/.test(r);function me(r){"@babel/helpers - typeof";return me=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},me(r)}function Ir(r,e){if(me(r)!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var a=t.call(r,e);if(me(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function Er(r){var e=Ir(r,"string");return me(e)=="symbol"?e:e+""}function Rr(r,e,t){return(e=Er(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function ut(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(r);e&&(a=a.filter(function(n){return Object.getOwnPropertyDescriptor(r,n).enumerable})),t.push.apply(t,a)}return t}function T(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?ut(Object(t),!0).forEach(function(a){Rr(r,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):ut(Object(t)).forEach(function(a){Object.defineProperty(r,a,Object.getOwnPropertyDescriptor(t,a))})}return r}const ct=r=>{var e;return r.msg||r.message||r.error_description||(typeof r.error=="string"?r.error:(e=r.error)===null||e===void 0?void 0:e.message)||JSON.stringify(r)},Cr=async(r,e,t,a)=>{if(r&&typeof r=="object"&&"status"in r&&"ok"in r&&typeof r.status=="number"&&!(t!=null&&t.noResolveJson)){const n=r,o=n.status||500;if(typeof n.json=="function")n.json().then(s=>{const i=(s==null?void 0:s.statusCode)||(s==null?void 0:s.code)||o+"";e(new _e(ct(s),o,i,a))}).catch(()=>{if(a==="vectors"){const s=o+"";e(new _e(n.statusText||`HTTP ${o} error`,o,s,a))}else{const s=o+"";e(new _e(n.statusText||`HTTP ${o} error`,o,s,a))}});else{const s=o+"";e(new _e(n.statusText||`HTTP ${o} error`,o,s,a))}}else e(new Pt(ct(r),r,a))},Pr=(r,e,t,a)=>{const n={method:r,headers:(e==null?void 0:e.headers)||{}};return r==="GET"||r==="HEAD"||!a?T(T({},n),t):($r(a)?(n.headers=T({"Content-Type":"application/json"},e==null?void 0:e.headers),n.body=JSON.stringify(a)):n.body=a,e!=null&&e.duplex&&(n.duplex=e.duplex),T(T({},n),t))};async function le(r,e,t,a,n,o,s){return new Promise((i,l)=>{r(t,Pr(e,a,n,o)).then(u=>{if(!u.ok)throw u;if(a!=null&&a.noResolveJson)return u;if(s==="vectors"){const c=u.headers.get("content-type");if(u.headers.get("content-length")==="0"||u.status===204)return{};if(!c||!c.includes("application/json"))return{}}return u.json()}).then(u=>i(u)).catch(u=>Cr(u,l,a,s))})}function xt(r="storage"){return{get:async(e,t,a,n)=>le(e,"GET",t,a,n,void 0,r),post:async(e,t,a,n,o)=>le(e,"POST",t,n,o,a,r),put:async(e,t,a,n,o)=>le(e,"PUT",t,n,o,a,r),head:async(e,t,a,n)=>le(e,"HEAD",t,T(T({},a),{},{noResolveJson:!0}),n,void 0,r),remove:async(e,t,a,n,o)=>le(e,"DELETE",t,n,o,a,r)}}const xr=xt("storage"),{get:fe,post:B,put:Ve,head:Or,remove:et}=xr,M=xt("vectors");var ie=class{constructor(r,e={},t,a="storage"){this.shouldThrowOnError=!1,this.url=r,this.headers=e,this.fetch=Sr(t),this.namespace=a}throwOnError(){return this.shouldThrowOnError=!0,this}async handleOperation(r){var e=this;try{return{data:await r(),error:null}}catch(t){if(e.shouldThrowOnError)throw t;if(Oe(t))return{data:null,error:t};throw t}}},Mr=class{constructor(r,e){this.downloadFn=r,this.shouldThrowOnError=e}then(r,e){return this.execute().then(r,e)}async execute(){var r=this;try{return{data:(await r.downloadFn()).body,error:null}}catch(e){if(r.shouldThrowOnError)throw e;if(Oe(e))return{data:null,error:e};throw e}}};let Ot;Ot=Symbol.toStringTag;var Dr=class{constructor(r,e){this.downloadFn=r,this.shouldThrowOnError=e,this[Ot]="BlobDownloadBuilder",this.promise=null}asStream(){return new Mr(this.downloadFn,this.shouldThrowOnError)}then(r,e){return this.getPromise().then(r,e)}catch(r){return this.getPromise().catch(r)}finally(r){return this.getPromise().finally(r)}getPromise(){return this.promise||(this.promise=this.execute()),this.promise}async execute(){var r=this;try{return{data:await(await r.downloadFn()).blob(),error:null}}catch(e){if(r.shouldThrowOnError)throw e;if(Oe(e))return{data:null,error:e};throw e}}};const Br={limit:100,offset:0,sortBy:{column:"name",order:"asc"}},ht={cacheControl:"3600",contentType:"text/plain;charset=UTF-8",upsert:!1};var jr=class extends ie{constructor(r,e={},t,a){super(r,e,a,"storage"),this.bucketId=t}async uploadOrUpdate(r,e,t,a){var n=this;return n.handleOperation(async()=>{let o;const s=T(T({},ht),a);let i=T(T({},n.headers),r==="POST"&&{"x-upsert":String(s.upsert)});const l=s.metadata;typeof Blob<"u"&&t instanceof Blob?(o=new FormData,o.append("cacheControl",s.cacheControl),l&&o.append("metadata",n.encodeMetadata(l)),o.append("",t)):typeof FormData<"u"&&t instanceof FormData?(o=t,o.has("cacheControl")||o.append("cacheControl",s.cacheControl),l&&!o.has("metadata")&&o.append("metadata",n.encodeMetadata(l))):(o=t,i["cache-control"]=`max-age=${s.cacheControl}`,i["content-type"]=s.contentType,l&&(i["x-metadata"]=n.toBase64(n.encodeMetadata(l))),(typeof ReadableStream<"u"&&o instanceof ReadableStream||o&&typeof o=="object"&&"pipe"in o&&typeof o.pipe=="function")&&!s.duplex&&(s.duplex="half")),a!=null&&a.headers&&(i=T(T({},i),a.headers));const u=n._removeEmptyFolders(e),c=n._getFinalPath(u),y=await(r=="PUT"?Ve:B)(n.fetch,`${n.url}/object/${c}`,o,T({headers:i},s!=null&&s.duplex?{duplex:s.duplex}:{}));return{path:u,id:y.Id,fullPath:y.Key}})}async upload(r,e,t){return this.uploadOrUpdate("POST",r,e,t)}async uploadToSignedUrl(r,e,t,a){var n=this;const o=n._removeEmptyFolders(r),s=n._getFinalPath(o),i=new URL(n.url+`/object/upload/sign/${s}`);return i.searchParams.set("token",e),n.handleOperation(async()=>{let l;const u=T({upsert:ht.upsert},a),c=T(T({},n.headers),{"x-upsert":String(u.upsert)});return typeof Blob<"u"&&t instanceof Blob?(l=new FormData,l.append("cacheControl",u.cacheControl),l.append("",t)):typeof FormData<"u"&&t instanceof FormData?(l=t,l.append("cacheControl",u.cacheControl)):(l=t,c["cache-control"]=`max-age=${u.cacheControl}`,c["content-type"]=u.contentType),{path:o,fullPath:(await Ve(n.fetch,i.toString(),l,{headers:c})).Key}})}async createSignedUploadUrl(r,e){var t=this;return t.handleOperation(async()=>{let a=t._getFinalPath(r);const n=T({},t.headers);e!=null&&e.upsert&&(n["x-upsert"]="true");const o=await B(t.fetch,`${t.url}/object/upload/sign/${a}`,{},{headers:n}),s=new URL(t.url+o.url),i=s.searchParams.get("token");if(!i)throw new xe("No token returned by API");return{signedUrl:s.toString(),path:r,token:i}})}async update(r,e,t){return this.uploadOrUpdate("PUT",r,e,t)}async move(r,e,t){var a=this;return a.handleOperation(async()=>await B(a.fetch,`${a.url}/object/move`,{bucketId:a.bucketId,sourceKey:r,destinationKey:e,destinationBucket:t==null?void 0:t.destinationBucket},{headers:a.headers}))}async copy(r,e,t){var a=this;return a.handleOperation(async()=>({path:(await B(a.fetch,`${a.url}/object/copy`,{bucketId:a.bucketId,sourceKey:r,destinationKey:e,destinationBucket:t==null?void 0:t.destinationBucket},{headers:a.headers})).Key}))}async createSignedUrl(r,e,t){var a=this;return a.handleOperation(async()=>{let n=a._getFinalPath(r),o=await B(a.fetch,`${a.url}/object/sign/${n}`,T({expiresIn:e},t!=null&&t.transform?{transform:t.transform}:{}),{headers:a.headers});const s=t!=null&&t.download?`&download=${t.download===!0?"":t.download}`:"";return{signedUrl:encodeURI(`${a.url}${o.signedURL}${s}`)}})}async createSignedUrls(r,e,t){var a=this;return a.handleOperation(async()=>{const n=await B(a.fetch,`${a.url}/object/sign/${a.bucketId}`,{expiresIn:e,paths:r},{headers:a.headers}),o=t!=null&&t.download?`&download=${t.download===!0?"":t.download}`:"";return n.map(s=>T(T({},s),{},{signedUrl:s.signedURL?encodeURI(`${a.url}${s.signedURL}${o}`):null}))})}download(r,e,t){const a=typeof(e==null?void 0:e.transform)<"u"?"render/image/authenticated":"object",n=this.transformOptsToQueryString((e==null?void 0:e.transform)||{}),o=n?`?${n}`:"",s=this._getFinalPath(r),i=()=>fe(this.fetch,`${this.url}/${a}/${s}${o}`,{headers:this.headers,noResolveJson:!0},t);return new Dr(i,this.shouldThrowOnError)}async info(r){var e=this;const t=e._getFinalPath(r);return e.handleOperation(async()=>Ke(await fe(e.fetch,`${e.url}/object/info/${t}`,{headers:e.headers})))}async exists(r){var e=this;const t=e._getFinalPath(r);try{return await Or(e.fetch,`${e.url}/object/${t}`,{headers:e.headers}),{data:!0,error:null}}catch(a){if(e.shouldThrowOnError)throw a;if(Oe(a)&&a instanceof Pt){const n=a.originalError;if([400,404].includes(n==null?void 0:n.status))return{data:!1,error:a}}throw a}}getPublicUrl(r,e){const t=this._getFinalPath(r),a=[],n=e!=null&&e.download?`download=${e.download===!0?"":e.download}`:"";n!==""&&a.push(n);const o=typeof(e==null?void 0:e.transform)<"u"?"render/image":"object",s=this.transformOptsToQueryString((e==null?void 0:e.transform)||{});s!==""&&a.push(s);let i=a.join("&");return i!==""&&(i=`?${i}`),{data:{publicUrl:encodeURI(`${this.url}/${o}/public/${t}${i}`)}}}async remove(r){var e=this;return e.handleOperation(async()=>await et(e.fetch,`${e.url}/object/${e.bucketId}`,{prefixes:r},{headers:e.headers}))}async list(r,e,t){var a=this;return a.handleOperation(async()=>{const n=T(T(T({},Br),e),{},{prefix:r||""});return await B(a.fetch,`${a.url}/object/list/${a.bucketId}`,n,{headers:a.headers},t)})}async listV2(r,e){var t=this;return t.handleOperation(async()=>{const a=T({},r);return await B(t.fetch,`${t.url}/object/list-v2/${t.bucketId}`,a,{headers:t.headers},e)})}encodeMetadata(r){return JSON.stringify(r)}toBase64(r){return typeof Buffer<"u"?Buffer.from(r).toString("base64"):btoa(r)}_getFinalPath(r){return`${this.bucketId}/${r.replace(/^\/+/,"")}`}_removeEmptyFolders(r){return r.replace(/^\/|\/$/g,"").replace(/\/+/g,"/")}transformOptsToQueryString(r){const e=[];return r.width&&e.push(`width=${r.width}`),r.height&&e.push(`height=${r.height}`),r.resize&&e.push(`resize=${r.resize}`),r.format&&e.push(`format=${r.format}`),r.quality&&e.push(`quality=${r.quality}`),e.join("&")}};const Nr="2.95.3",ve={"X-Client-Info":`storage-js/${Nr}`};var Lr=class extends ie{constructor(r,e={},t,a){const n=new URL(r);a!=null&&a.useNewHostname&&/supabase\.(co|in|red)$/.test(n.hostname)&&!n.hostname.includes("storage.supabase.")&&(n.hostname=n.hostname.replace("supabase.","storage.supabase."));const o=n.href.replace(/\/$/,""),s=T(T({},ve),e);super(o,s,t,"storage")}async listBuckets(r){var e=this;return e.handleOperation(async()=>{const t=e.listBucketOptionsToQueryString(r);return await fe(e.fetch,`${e.url}/bucket${t}`,{headers:e.headers})})}async getBucket(r){var e=this;return e.handleOperation(async()=>await fe(e.fetch,`${e.url}/bucket/${r}`,{headers:e.headers}))}async createBucket(r,e={public:!1}){var t=this;return t.handleOperation(async()=>await B(t.fetch,`${t.url}/bucket`,{id:r,name:r,type:e.type,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:t.headers}))}async updateBucket(r,e){var t=this;return t.handleOperation(async()=>await Ve(t.fetch,`${t.url}/bucket/${r}`,{id:r,name:r,public:e.public,file_size_limit:e.fileSizeLimit,allowed_mime_types:e.allowedMimeTypes},{headers:t.headers}))}async emptyBucket(r){var e=this;return e.handleOperation(async()=>await B(e.fetch,`${e.url}/bucket/${r}/empty`,{},{headers:e.headers}))}async deleteBucket(r){var e=this;return e.handleOperation(async()=>await et(e.fetch,`${e.url}/bucket/${r}`,{},{headers:e.headers}))}listBucketOptionsToQueryString(r){const e={};return r&&("limit"in r&&(e.limit=String(r.limit)),"offset"in r&&(e.offset=String(r.offset)),r.search&&(e.search=r.search),r.sortColumn&&(e.sortColumn=r.sortColumn),r.sortOrder&&(e.sortOrder=r.sortOrder)),Object.keys(e).length>0?"?"+new URLSearchParams(e).toString():""}},Fr=class extends ie{constructor(r,e={},t){const a=r.replace(/\/$/,""),n=T(T({},ve),e);super(a,n,t,"storage")}async createBucket(r){var e=this;return e.handleOperation(async()=>await B(e.fetch,`${e.url}/bucket`,{name:r},{headers:e.headers}))}async listBuckets(r){var e=this;return e.handleOperation(async()=>{const t=new URLSearchParams;(r==null?void 0:r.limit)!==void 0&&t.set("limit",r.limit.toString()),(r==null?void 0:r.offset)!==void 0&&t.set("offset",r.offset.toString()),r!=null&&r.sortColumn&&t.set("sortColumn",r.sortColumn),r!=null&&r.sortOrder&&t.set("sortOrder",r.sortOrder),r!=null&&r.search&&t.set("search",r.search);const a=t.toString(),n=a?`${e.url}/bucket?${a}`:`${e.url}/bucket`;return await fe(e.fetch,n,{headers:e.headers})})}async deleteBucket(r){var e=this;return e.handleOperation(async()=>await et(e.fetch,`${e.url}/bucket/${r}`,{},{headers:e.headers}))}from(r){var e=this;if(!Ar(r))throw new xe("Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.");const t=new _r({baseUrl:this.url,catalogName:r,auth:{type:"custom",getHeaders:async()=>e.headers},fetch:this.fetch}),a=this.shouldThrowOnError;return new Proxy(t,{get(n,o){const s=n[o];return typeof s!="function"?s:async(...i)=>{try{return{data:await s.apply(n,i),error:null}}catch(l){if(a)throw l;return{data:null,error:l}}}}})}},Wr=class extends ie{constructor(r,e={},t){const a=r.replace(/\/$/,""),n=T(T({},ve),{},{"Content-Type":"application/json"},e);super(a,n,t,"vectors")}async createIndex(r){var e=this;return e.handleOperation(async()=>await M.post(e.fetch,`${e.url}/CreateIndex`,r,{headers:e.headers})||{})}async getIndex(r,e){var t=this;return t.handleOperation(async()=>await M.post(t.fetch,`${t.url}/GetIndex`,{vectorBucketName:r,indexName:e},{headers:t.headers}))}async listIndexes(r){var e=this;return e.handleOperation(async()=>await M.post(e.fetch,`${e.url}/ListIndexes`,r,{headers:e.headers}))}async deleteIndex(r,e){var t=this;return t.handleOperation(async()=>await M.post(t.fetch,`${t.url}/DeleteIndex`,{vectorBucketName:r,indexName:e},{headers:t.headers})||{})}},Ur=class extends ie{constructor(r,e={},t){const a=r.replace(/\/$/,""),n=T(T({},ve),{},{"Content-Type":"application/json"},e);super(a,n,t,"vectors")}async putVectors(r){var e=this;if(r.vectors.length<1||r.vectors.length>500)throw new Error("Vector batch size must be between 1 and 500 items");return e.handleOperation(async()=>await M.post(e.fetch,`${e.url}/PutVectors`,r,{headers:e.headers})||{})}async getVectors(r){var e=this;return e.handleOperation(async()=>await M.post(e.fetch,`${e.url}/GetVectors`,r,{headers:e.headers}))}async listVectors(r){var e=this;if(r.segmentCount!==void 0){if(r.segmentCount<1||r.segmentCount>16)throw new Error("segmentCount must be between 1 and 16");if(r.segmentIndex!==void 0&&(r.segmentIndex<0||r.segmentIndex>=r.segmentCount))throw new Error(`segmentIndex must be between 0 and ${r.segmentCount-1}`)}return e.handleOperation(async()=>await M.post(e.fetch,`${e.url}/ListVectors`,r,{headers:e.headers}))}async queryVectors(r){var e=this;return e.handleOperation(async()=>await M.post(e.fetch,`${e.url}/QueryVectors`,r,{headers:e.headers}))}async deleteVectors(r){var e=this;if(r.keys.length<1||r.keys.length>500)throw new Error("Keys batch size must be between 1 and 500 items");return e.handleOperation(async()=>await M.post(e.fetch,`${e.url}/DeleteVectors`,r,{headers:e.headers})||{})}},Hr=class extends ie{constructor(r,e={},t){const a=r.replace(/\/$/,""),n=T(T({},ve),{},{"Content-Type":"application/json"},e);super(a,n,t,"vectors")}async createBucket(r){var e=this;return e.handleOperation(async()=>await M.post(e.fetch,`${e.url}/CreateVectorBucket`,{vectorBucketName:r},{headers:e.headers})||{})}async getBucket(r){var e=this;return e.handleOperation(async()=>await M.post(e.fetch,`${e.url}/GetVectorBucket`,{vectorBucketName:r},{headers:e.headers}))}async listBuckets(r={}){var e=this;return e.handleOperation(async()=>await M.post(e.fetch,`${e.url}/ListVectorBuckets`,r,{headers:e.headers}))}async deleteBucket(r){var e=this;return e.handleOperation(async()=>await M.post(e.fetch,`${e.url}/DeleteVectorBucket`,{vectorBucketName:r},{headers:e.headers})||{})}},Yr=class extends Hr{constructor(r,e={}){super(r,e.headers||{},e.fetch)}from(r){return new qr(this.url,this.headers,r,this.fetch)}async createBucket(r){var e=()=>super.createBucket,t=this;return e().call(t,r)}async getBucket(r){var e=()=>super.getBucket,t=this;return e().call(t,r)}async listBuckets(r={}){var e=()=>super.listBuckets,t=this;return e().call(t,r)}async deleteBucket(r){var e=()=>super.deleteBucket,t=this;return e().call(t,r)}},qr=class extends Wr{constructor(r,e,t,a){super(r,e,a),this.vectorBucketName=t}async createIndex(r){var e=()=>super.createIndex,t=this;return e().call(t,T(T({},r),{},{vectorBucketName:t.vectorBucketName}))}async listIndexes(r={}){var e=()=>super.listIndexes,t=this;return e().call(t,T(T({},r),{},{vectorBucketName:t.vectorBucketName}))}async getIndex(r){var e=()=>super.getIndex,t=this;return e().call(t,t.vectorBucketName,r)}async deleteIndex(r){var e=()=>super.deleteIndex,t=this;return e().call(t,t.vectorBucketName,r)}index(r){return new Gr(this.url,this.headers,this.vectorBucketName,r,this.fetch)}},Gr=class extends Ur{constructor(r,e,t,a,n){super(r,e,n),this.vectorBucketName=t,this.indexName=a}async putVectors(r){var e=()=>super.putVectors,t=this;return e().call(t,T(T({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async getVectors(r){var e=()=>super.getVectors,t=this;return e().call(t,T(T({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async listVectors(r={}){var e=()=>super.listVectors,t=this;return e().call(t,T(T({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async queryVectors(r){var e=()=>super.queryVectors,t=this;return e().call(t,T(T({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}async deleteVectors(r){var e=()=>super.deleteVectors,t=this;return e().call(t,T(T({},r),{},{vectorBucketName:t.vectorBucketName,indexName:t.indexName}))}},Kr=class extends Lr{constructor(r,e={},t,a){super(r,e,t,a)}from(r){return new jr(this.url,this.headers,r,this.fetch)}get vectors(){return new Yr(this.url+"/vector",{headers:this.headers,fetch:this.fetch})}get analytics(){return new Fr(this.url+"/iceberg",this.headers,this.fetch)}};const Mt="2.95.3",ae=30*1e3,ze=3,je=ze*ae,Vr="http://localhost:9999",zr="supabase.auth.token",Jr={"X-Client-Info":`gotrue-js/${Mt}`},Je="X-Supabase-Api-Version",Dt={"2024-01-01":{timestamp:Date.parse("2024-01-01T00:00:00.0Z"),name:"2024-01-01"}},Zr=/^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,Qr=10*60*1e3;class ge extends Error{constructor(e,t,a){super(e),this.__isAuthError=!0,this.name="AuthError",this.status=t,this.code=a}}function v(r){return typeof r=="object"&&r!==null&&"__isAuthError"in r}class Xr extends ge{constructor(e,t,a){super(e,t,a),this.name="AuthApiError",this.status=t,this.code=a}}function ea(r){return v(r)&&r.name==="AuthApiError"}class V extends ge{constructor(e,t){super(e),this.name="AuthUnknownError",this.originalError=t}}class F extends ge{constructor(e,t,a,n){super(e,a,n),this.name=t,this.status=a}}class O extends F{constructor(){super("Auth session missing!","AuthSessionMissingError",400,void 0)}}function Ne(r){return v(r)&&r.name==="AuthSessionMissingError"}class Z extends F{constructor(){super("Auth session or user missing","AuthInvalidTokenResponseError",500,void 0)}}class Se extends F{constructor(e){super(e,"AuthInvalidCredentialsError",400,void 0)}}class $e extends F{constructor(e,t=null){super(e,"AuthImplicitGrantRedirectError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}function ta(r){return v(r)&&r.name==="AuthImplicitGrantRedirectError"}class dt extends F{constructor(e,t=null){super(e,"AuthPKCEGrantCodeExchangeError",500,void 0),this.details=null,this.details=t}toJSON(){return{name:this.name,message:this.message,status:this.status,details:this.details}}}class ra extends F{constructor(){super("PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.","AuthPKCECodeVerifierMissingError",400,"pkce_code_verifier_not_found")}}class Ze extends F{constructor(e,t){super(e,"AuthRetryableFetchError",t,void 0)}}function Le(r){return v(r)&&r.name==="AuthRetryableFetchError"}class yt extends F{constructor(e,t,a){super(e,"AuthWeakPasswordError",t,"weak_password"),this.reasons=a}}class Qe extends F{constructor(e){super(e,"AuthInvalidJwtError",400,"invalid_jwt")}}const Ee="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""),mt=` 	
\r=`.split(""),aa=(()=>{const r=new Array(128);for(let e=0;e<r.length;e+=1)r[e]=-1;for(let e=0;e<mt.length;e+=1)r[mt[e].charCodeAt(0)]=-2;for(let e=0;e<Ee.length;e+=1)r[Ee[e].charCodeAt(0)]=e;return r})();function ft(r,e,t){if(r!==null)for(e.queue=e.queue<<8|r,e.queuedBits+=8;e.queuedBits>=6;){const a=e.queue>>e.queuedBits-6&63;t(Ee[a]),e.queuedBits-=6}else if(e.queuedBits>0)for(e.queue=e.queue<<6-e.queuedBits,e.queuedBits=6;e.queuedBits>=6;){const a=e.queue>>e.queuedBits-6&63;t(Ee[a]),e.queuedBits-=6}}function Bt(r,e,t){const a=aa[r];if(a>-1)for(e.queue=e.queue<<6|a,e.queuedBits+=6;e.queuedBits>=8;)t(e.queue>>e.queuedBits-8&255),e.queuedBits-=8;else{if(a===-2)return;throw new Error(`Invalid Base64-URL character "${String.fromCharCode(r)}"`)}}function gt(r){const e=[],t=s=>{e.push(String.fromCodePoint(s))},a={utf8seq:0,codepoint:0},n={queue:0,queuedBits:0},o=s=>{sa(s,a,t)};for(let s=0;s<r.length;s+=1)Bt(r.charCodeAt(s),n,o);return e.join("")}function na(r,e){if(r<=127){e(r);return}else if(r<=2047){e(192|r>>6),e(128|r&63);return}else if(r<=65535){e(224|r>>12),e(128|r>>6&63),e(128|r&63);return}else if(r<=1114111){e(240|r>>18),e(128|r>>12&63),e(128|r>>6&63),e(128|r&63);return}throw new Error(`Unrecognized Unicode codepoint: ${r.toString(16)}`)}function oa(r,e){for(let t=0;t<r.length;t+=1){let a=r.charCodeAt(t);if(a>55295&&a<=56319){const n=(a-55296)*1024&65535;a=(r.charCodeAt(t+1)-56320&65535|n)+65536,t+=1}na(a,e)}}function sa(r,e,t){if(e.utf8seq===0){if(r<=127){t(r);return}for(let a=1;a<6;a+=1)if(!(r>>7-a&1)){e.utf8seq=a;break}if(e.utf8seq===2)e.codepoint=r&31;else if(e.utf8seq===3)e.codepoint=r&15;else if(e.utf8seq===4)e.codepoint=r&7;else throw new Error("Invalid UTF-8 sequence");e.utf8seq-=1}else if(e.utf8seq>0){if(r<=127)throw new Error("Invalid UTF-8 sequence");e.codepoint=e.codepoint<<6|r&63,e.utf8seq-=1,e.utf8seq===0&&t(e.codepoint)}}function se(r){const e=[],t={queue:0,queuedBits:0},a=n=>{e.push(n)};for(let n=0;n<r.length;n+=1)Bt(r.charCodeAt(n),t,a);return new Uint8Array(e)}function ia(r){const e=[];return oa(r,t=>e.push(t)),new Uint8Array(e)}function z(r){const e=[],t={queue:0,queuedBits:0},a=n=>{e.push(n)};return r.forEach(n=>ft(n,t,a)),ft(null,t,a),e.join("")}function la(r){return Math.round(Date.now()/1e3)+r}function ua(){return Symbol("auth-callback")}const x=()=>typeof window<"u"&&typeof document<"u",Y={tested:!1,writable:!1},jt=()=>{if(!x())return!1;try{if(typeof globalThis.localStorage!="object")return!1}catch{return!1}if(Y.tested)return Y.writable;const r=`lswt-${Math.random()}${Math.random()}`;try{globalThis.localStorage.setItem(r,r),globalThis.localStorage.removeItem(r),Y.tested=!0,Y.writable=!0}catch{Y.tested=!0,Y.writable=!1}return Y.writable};function ca(r){const e={},t=new URL(r);if(t.hash&&t.hash[0]==="#")try{new URLSearchParams(t.hash.substring(1)).forEach((n,o)=>{e[o]=n})}catch{}return t.searchParams.forEach((a,n)=>{e[n]=a}),e}const Nt=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),ha=r=>typeof r=="object"&&r!==null&&"status"in r&&"ok"in r&&"json"in r&&typeof r.json=="function",ne=async(r,e,t)=>{await r.setItem(e,JSON.stringify(t))},q=async(r,e)=>{const t=await r.getItem(e);if(!t)return null;try{return JSON.parse(t)}catch{return t}},P=async(r,e)=>{await r.removeItem(e)};class Me{constructor(){this.promise=new Me.promiseConstructor((e,t)=>{this.resolve=e,this.reject=t})}}Me.promiseConstructor=Promise;function Ae(r){const e=r.split(".");if(e.length!==3)throw new Qe("Invalid JWT structure");for(let a=0;a<e.length;a++)if(!Zr.test(e[a]))throw new Qe("JWT not in base64url format");return{header:JSON.parse(gt(e[0])),payload:JSON.parse(gt(e[1])),signature:se(e[2]),raw:{header:e[0],payload:e[1]}}}async function da(r){return await new Promise(e=>{setTimeout(()=>e(null),r)})}function ya(r,e){return new Promise((a,n)=>{(async()=>{for(let o=0;o<1/0;o++)try{const s=await r(o);if(!e(o,null,s)){a(s);return}}catch(s){if(!e(o,s)){n(s);return}}})()})}function ma(r){return("0"+r.toString(16)).substr(-2)}function fa(){const e=new Uint32Array(56);if(typeof crypto>"u"){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~",a=t.length;let n="";for(let o=0;o<56;o++)n+=t.charAt(Math.floor(Math.random()*a));return n}return crypto.getRandomValues(e),Array.from(e,ma).join("")}async function ga(r){const t=new TextEncoder().encode(r),a=await crypto.subtle.digest("SHA-256",t),n=new Uint8Array(a);return Array.from(n).map(o=>String.fromCharCode(o)).join("")}async function pa(r){if(!(typeof crypto<"u"&&typeof crypto.subtle<"u"&&typeof TextEncoder<"u"))return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."),r;const t=await ga(r);return btoa(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}async function Q(r,e,t=!1){const a=fa();let n=a;t&&(n+="/PASSWORD_RECOVERY"),await ne(r,`${e}-code-verifier`,n);const o=await pa(a);return[o,a===o?"plain":"s256"]}const wa=/^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;function va(r){const e=r.headers.get(Je);if(!e||!e.match(wa))return null;try{return new Date(`${e}T00:00:00.0Z`)}catch{return null}}function ba(r){if(!r)throw new Error("Missing exp claim");const e=Math.floor(Date.now()/1e3);if(r<=e)throw new Error("JWT has expired")}function ka(r){switch(r){case"RS256":return{name:"RSASSA-PKCS1-v1_5",hash:{name:"SHA-256"}};case"ES256":return{name:"ECDSA",namedCurve:"P-256",hash:{name:"SHA-256"}};default:throw new Error("Invalid alg claim")}}const Ta=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;function X(r){if(!Ta.test(r))throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not")}function Fe(){const r={};return new Proxy(r,{get:(e,t)=>{if(t==="__isUserNotAvailableProxy")return!0;if(typeof t=="symbol"){const a=t.toString();if(a==="Symbol(Symbol.toPrimitive)"||a==="Symbol(Symbol.toStringTag)"||a==="Symbol(util.inspect.custom)")return}throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`)},set:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)},deleteProperty:(e,t)=>{throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`)}})}function _a(r,e){return new Proxy(r,{get:(t,a,n)=>{if(a==="__isInsecureUserWarningProxy")return!0;if(typeof a=="symbol"){const o=a.toString();if(o==="Symbol(Symbol.toPrimitive)"||o==="Symbol(Symbol.toStringTag)"||o==="Symbol(util.inspect.custom)"||o==="Symbol(nodejs.util.inspect.custom)")return Reflect.get(t,a,n)}return!e.value&&typeof a=="string"&&(console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."),e.value=!0),Reflect.get(t,a,n)}})}function pt(r){return JSON.parse(JSON.stringify(r))}const G=r=>r.msg||r.message||r.error_description||r.error||JSON.stringify(r),Sa=[502,503,504];async function wt(r){var e;if(!ha(r))throw new Ze(G(r),0);if(Sa.includes(r.status))throw new Ze(G(r),r.status);let t;try{t=await r.json()}catch(o){throw new V(G(o),o)}let a;const n=va(r);if(n&&n.getTime()>=Dt["2024-01-01"].timestamp&&typeof t=="object"&&t&&typeof t.code=="string"?a=t.code:typeof t=="object"&&t&&typeof t.error_code=="string"&&(a=t.error_code),a){if(a==="weak_password")throw new yt(G(t),r.status,((e=t.weak_password)===null||e===void 0?void 0:e.reasons)||[]);if(a==="session_not_found")throw new O}else if(typeof t=="object"&&t&&typeof t.weak_password=="object"&&t.weak_password&&Array.isArray(t.weak_password.reasons)&&t.weak_password.reasons.length&&t.weak_password.reasons.reduce((o,s)=>o&&typeof s=="string",!0))throw new yt(G(t),r.status,t.weak_password.reasons);throw new Xr(G(t),r.status||500,a)}const $a=(r,e,t,a)=>{const n={method:r,headers:(e==null?void 0:e.headers)||{}};return r==="GET"?n:(n.headers=Object.assign({"Content-Type":"application/json;charset=UTF-8"},e==null?void 0:e.headers),n.body=JSON.stringify(a),Object.assign(Object.assign({},n),t))};async function k(r,e,t,a){var n;const o=Object.assign({},a==null?void 0:a.headers);o[Je]||(o[Je]=Dt["2024-01-01"].name),a!=null&&a.jwt&&(o.Authorization=`Bearer ${a.jwt}`);const s=(n=a==null?void 0:a.query)!==null&&n!==void 0?n:{};a!=null&&a.redirectTo&&(s.redirect_to=a.redirectTo);const i=Object.keys(s).length?"?"+new URLSearchParams(s).toString():"",l=await Aa(r,e,t+i,{headers:o,noResolveJson:a==null?void 0:a.noResolveJson},{},a==null?void 0:a.body);return a!=null&&a.xform?a==null?void 0:a.xform(l):{data:Object.assign({},l),error:null}}async function Aa(r,e,t,a,n,o){const s=$a(e,a,n,o);let i;try{i=await r(t,Object.assign({},s))}catch(l){throw console.error(l),new Ze(G(l),0)}if(i.ok||await wt(i),a!=null&&a.noResolveJson)return i;try{return await i.json()}catch(l){await wt(l)}}function D(r){var e;let t=null;Ra(r)&&(t=Object.assign({},r),r.expires_at||(t.expires_at=la(r.expires_in)));const a=(e=r.user)!==null&&e!==void 0?e:r;return{data:{session:t,user:a},error:null}}function vt(r){const e=D(r);return!e.error&&r.weak_password&&typeof r.weak_password=="object"&&Array.isArray(r.weak_password.reasons)&&r.weak_password.reasons.length&&r.weak_password.message&&typeof r.weak_password.message=="string"&&r.weak_password.reasons.reduce((t,a)=>t&&typeof a=="string",!0)&&(e.data.weak_password=r.weak_password),e}function H(r){var e;return{data:{user:(e=r.user)!==null&&e!==void 0?e:r},error:null}}function Ia(r){return{data:r,error:null}}function Ea(r){const{action_link:e,email_otp:t,hashed_token:a,redirect_to:n,verification_type:o}=r,s=Pe(r,["action_link","email_otp","hashed_token","redirect_to","verification_type"]),i={action_link:e,email_otp:t,hashed_token:a,redirect_to:n,verification_type:o},l=Object.assign({},s);return{data:{properties:i,user:l},error:null}}function bt(r){return r}function Ra(r){return r.access_token&&r.refresh_token&&r.expires_in}const We=["global","local","others"];class Ca{constructor({url:e="",headers:t={},fetch:a}){this.url=e,this.headers=t,this.fetch=Nt(a),this.mfa={listFactors:this._listFactors.bind(this),deleteFactor:this._deleteFactor.bind(this)},this.oauth={listClients:this._listOAuthClients.bind(this),createClient:this._createOAuthClient.bind(this),getClient:this._getOAuthClient.bind(this),updateClient:this._updateOAuthClient.bind(this),deleteClient:this._deleteOAuthClient.bind(this),regenerateClientSecret:this._regenerateOAuthClientSecret.bind(this)}}async signOut(e,t=We[0]){if(We.indexOf(t)<0)throw new Error(`@supabase/auth-js: Parameter scope must be one of ${We.join(", ")}`);try{return await k(this.fetch,"POST",`${this.url}/logout?scope=${t}`,{headers:this.headers,jwt:e,noResolveJson:!0}),{data:null,error:null}}catch(a){if(v(a))return{data:null,error:a};throw a}}async inviteUserByEmail(e,t={}){try{return await k(this.fetch,"POST",`${this.url}/invite`,{body:{email:e,data:t.data},headers:this.headers,redirectTo:t.redirectTo,xform:H})}catch(a){if(v(a))return{data:{user:null},error:a};throw a}}async generateLink(e){try{const{options:t}=e,a=Pe(e,["options"]),n=Object.assign(Object.assign({},a),t);return"newEmail"in a&&(n.new_email=a==null?void 0:a.newEmail,delete n.newEmail),await k(this.fetch,"POST",`${this.url}/admin/generate_link`,{body:n,headers:this.headers,xform:Ea,redirectTo:t==null?void 0:t.redirectTo})}catch(t){if(v(t))return{data:{properties:null,user:null},error:t};throw t}}async createUser(e){try{return await k(this.fetch,"POST",`${this.url}/admin/users`,{body:e,headers:this.headers,xform:H})}catch(t){if(v(t))return{data:{user:null},error:t};throw t}}async listUsers(e){var t,a,n,o,s,i,l;try{const u={nextPage:null,lastPage:0,total:0},c=await k(this.fetch,"GET",`${this.url}/admin/users`,{headers:this.headers,noResolveJson:!0,query:{page:(a=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&a!==void 0?a:"",per_page:(o=(n=e==null?void 0:e.perPage)===null||n===void 0?void 0:n.toString())!==null&&o!==void 0?o:""},xform:bt});if(c.error)throw c.error;const y=await c.json(),d=(s=c.headers.get("x-total-count"))!==null&&s!==void 0?s:0,h=(l=(i=c.headers.get("link"))===null||i===void 0?void 0:i.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(m=>{const f=parseInt(m.split(";")[0].split("=")[1].substring(0,1)),g=JSON.parse(m.split(";")[1].split("=")[1]);u[`${g}Page`]=f}),u.total=parseInt(d)),{data:Object.assign(Object.assign({},y),u),error:null}}catch(u){if(v(u))return{data:{users:[]},error:u};throw u}}async getUserById(e){X(e);try{return await k(this.fetch,"GET",`${this.url}/admin/users/${e}`,{headers:this.headers,xform:H})}catch(t){if(v(t))return{data:{user:null},error:t};throw t}}async updateUserById(e,t){X(e);try{return await k(this.fetch,"PUT",`${this.url}/admin/users/${e}`,{body:t,headers:this.headers,xform:H})}catch(a){if(v(a))return{data:{user:null},error:a};throw a}}async deleteUser(e,t=!1){X(e);try{return await k(this.fetch,"DELETE",`${this.url}/admin/users/${e}`,{headers:this.headers,body:{should_soft_delete:t},xform:H})}catch(a){if(v(a))return{data:{user:null},error:a};throw a}}async _listFactors(e){X(e.userId);try{const{data:t,error:a}=await k(this.fetch,"GET",`${this.url}/admin/users/${e.userId}/factors`,{headers:this.headers,xform:n=>({data:{factors:n},error:null})});return{data:t,error:a}}catch(t){if(v(t))return{data:null,error:t};throw t}}async _deleteFactor(e){X(e.userId),X(e.id);try{return{data:await k(this.fetch,"DELETE",`${this.url}/admin/users/${e.userId}/factors/${e.id}`,{headers:this.headers}),error:null}}catch(t){if(v(t))return{data:null,error:t};throw t}}async _listOAuthClients(e){var t,a,n,o,s,i,l;try{const u={nextPage:null,lastPage:0,total:0},c=await k(this.fetch,"GET",`${this.url}/admin/oauth/clients`,{headers:this.headers,noResolveJson:!0,query:{page:(a=(t=e==null?void 0:e.page)===null||t===void 0?void 0:t.toString())!==null&&a!==void 0?a:"",per_page:(o=(n=e==null?void 0:e.perPage)===null||n===void 0?void 0:n.toString())!==null&&o!==void 0?o:""},xform:bt});if(c.error)throw c.error;const y=await c.json(),d=(s=c.headers.get("x-total-count"))!==null&&s!==void 0?s:0,h=(l=(i=c.headers.get("link"))===null||i===void 0?void 0:i.split(","))!==null&&l!==void 0?l:[];return h.length>0&&(h.forEach(m=>{const f=parseInt(m.split(";")[0].split("=")[1].substring(0,1)),g=JSON.parse(m.split(";")[1].split("=")[1]);u[`${g}Page`]=f}),u.total=parseInt(d)),{data:Object.assign(Object.assign({},y),u),error:null}}catch(u){if(v(u))return{data:{clients:[]},error:u};throw u}}async _createOAuthClient(e){try{return await k(this.fetch,"POST",`${this.url}/admin/oauth/clients`,{body:e,headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(v(t))return{data:null,error:t};throw t}}async _getOAuthClient(e){try{return await k(this.fetch,"GET",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(v(t))return{data:null,error:t};throw t}}async _updateOAuthClient(e,t){try{return await k(this.fetch,"PUT",`${this.url}/admin/oauth/clients/${e}`,{body:t,headers:this.headers,xform:a=>({data:a,error:null})})}catch(a){if(v(a))return{data:null,error:a};throw a}}async _deleteOAuthClient(e){try{return await k(this.fetch,"DELETE",`${this.url}/admin/oauth/clients/${e}`,{headers:this.headers,noResolveJson:!0}),{data:null,error:null}}catch(t){if(v(t))return{data:null,error:t};throw t}}async _regenerateOAuthClientSecret(e){try{return await k(this.fetch,"POST",`${this.url}/admin/oauth/clients/${e}/regenerate_secret`,{headers:this.headers,xform:t=>({data:t,error:null})})}catch(t){if(v(t))return{data:null,error:t};throw t}}}function kt(r={}){return{getItem:e=>r[e]||null,setItem:(e,t)=>{r[e]=t},removeItem:e=>{delete r[e]}}}const ee={debug:!!(globalThis&&jt()&&globalThis.localStorage&&globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug")==="true")};class Lt extends Error{constructor(e){super(e),this.isAcquireTimeout=!0}}class Pa extends Lt{}async function xa(r,e,t){ee.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquire lock",r,e);const a=new globalThis.AbortController;return e>0&&setTimeout(()=>{a.abort(),ee.debug&&console.log("@supabase/gotrue-js: navigatorLock acquire timed out",r)},e),await Promise.resolve().then(()=>globalThis.navigator.locks.request(r,e===0?{mode:"exclusive",ifAvailable:!0}:{mode:"exclusive",signal:a.signal},async n=>{if(n){ee.debug&&console.log("@supabase/gotrue-js: navigatorLock: acquired",r,n.name);try{return await t()}finally{ee.debug&&console.log("@supabase/gotrue-js: navigatorLock: released",r,n.name)}}else{if(e===0)throw ee.debug&&console.log("@supabase/gotrue-js: navigatorLock: not immediately available",r),new Pa(`Acquiring an exclusive Navigator LockManager lock "${r}" immediately failed`);if(ee.debug)try{const o=await globalThis.navigator.locks.query();console.log("@supabase/gotrue-js: Navigator LockManager state",JSON.stringify(o,null,"  "))}catch(o){console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state",o)}return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"),await t()}}))}function Oa(){if(typeof globalThis!="object")try{Object.defineProperty(Object.prototype,"__magic__",{get:function(){return this},configurable:!0}),__magic__.globalThis=__magic__,delete Object.prototype.__magic__}catch{typeof self<"u"&&(self.globalThis=self)}}function Ft(r){if(!/^0x[a-fA-F0-9]{40}$/.test(r))throw new Error(`@supabase/auth-js: Address "${r}" is invalid.`);return r.toLowerCase()}function Ma(r){return parseInt(r,16)}function Da(r){const e=new TextEncoder().encode(r);return"0x"+Array.from(e,a=>a.toString(16).padStart(2,"0")).join("")}function Ba(r){var e;const{chainId:t,domain:a,expirationTime:n,issuedAt:o=new Date,nonce:s,notBefore:i,requestId:l,resources:u,scheme:c,uri:y,version:d}=r;{if(!Number.isInteger(t))throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);if(!a)throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');if(s&&s.length<8)throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${s}`);if(!y)throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');if(d!=="1")throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${d}`);if(!((e=r.statement)===null||e===void 0)&&e.includes(`
`))throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${r.statement}`)}const h=Ft(r.address),m=c?`${c}://${a}`:a,f=r.statement?`${r.statement}
`:"",g=`${m} wants you to sign in with your Ethereum account:
${h}

${f}`;let w=`URI: ${y}
Version: ${d}
Chain ID: ${t}${s?`
Nonce: ${s}`:""}
Issued At: ${o.toISOString()}`;if(n&&(w+=`
Expiration Time: ${n.toISOString()}`),i&&(w+=`
Not Before: ${i.toISOString()}`),l&&(w+=`
Request ID: ${l}`),u){let b=`
Resources:`;for(const p of u){if(!p||typeof p!="string")throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${p}`);b+=`
- ${p}`}w+=b}return`${g}
${w}`}class I extends Error{constructor({message:e,code:t,cause:a,name:n}){var o;super(e,{cause:a}),this.__isWebAuthnError=!0,this.name=(o=n??(a instanceof Error?a.name:void 0))!==null&&o!==void 0?o:"Unknown Error",this.code=t}}class Re extends I{constructor(e,t){super({code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:t,message:e}),this.name="WebAuthnUnknownError",this.originalError=t}}function ja({error:r,options:e}){var t,a,n;const{publicKey:o}=e;if(!o)throw Error("options was missing required publicKey property");if(r.name==="AbortError"){if(e.signal instanceof AbortSignal)return new I({message:"Registration ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:r})}else if(r.name==="ConstraintError"){if(((t=o.authenticatorSelection)===null||t===void 0?void 0:t.requireResidentKey)===!0)return new I({message:"Discoverable credentials were required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",cause:r});if(e.mediation==="conditional"&&((a=o.authenticatorSelection)===null||a===void 0?void 0:a.userVerification)==="required")return new I({message:"User verification was required during automatic registration but it could not be performed",code:"ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",cause:r});if(((n=o.authenticatorSelection)===null||n===void 0?void 0:n.userVerification)==="required")return new I({message:"User verification was required but no available authenticator supported it",code:"ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",cause:r})}else{if(r.name==="InvalidStateError")return new I({message:"The authenticator was previously registered",code:"ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",cause:r});if(r.name==="NotAllowedError")return new I({message:r.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r});if(r.name==="NotSupportedError")return o.pubKeyCredParams.filter(i=>i.type==="public-key").length===0?new I({message:'No entry in pubKeyCredParams was of type "public-key"',code:"ERROR_MALFORMED_PUBKEYCREDPARAMS",cause:r}):new I({message:"No available authenticator supported any of the specified pubKeyCredParams algorithms",code:"ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",cause:r});if(r.name==="SecurityError"){const s=window.location.hostname;if(Wt(s)){if(o.rp.id!==s)return new I({message:`The RP ID "${o.rp.id}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:r})}else return new I({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:r})}else if(r.name==="TypeError"){if(o.user.id.byteLength<1||o.user.id.byteLength>64)return new I({message:"User ID was not between 1 and 64 characters",code:"ERROR_INVALID_USER_ID_LENGTH",cause:r})}else if(r.name==="UnknownError")return new I({message:"The authenticator was unable to process the specified options, or could not create a new credential",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:r})}return new I({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r})}function Na({error:r,options:e}){const{publicKey:t}=e;if(!t)throw Error("options was missing required publicKey property");if(r.name==="AbortError"){if(e.signal instanceof AbortSignal)return new I({message:"Authentication ceremony was sent an abort signal",code:"ERROR_CEREMONY_ABORTED",cause:r})}else{if(r.name==="NotAllowedError")return new I({message:r.message,code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r});if(r.name==="SecurityError"){const a=window.location.hostname;if(Wt(a)){if(t.rpId!==a)return new I({message:`The RP ID "${t.rpId}" is invalid for this domain`,code:"ERROR_INVALID_RP_ID",cause:r})}else return new I({message:`${window.location.hostname} is an invalid domain`,code:"ERROR_INVALID_DOMAIN",cause:r})}else if(r.name==="UnknownError")return new I({message:"The authenticator was unable to process the specified options, or could not create a new assertion signature",code:"ERROR_AUTHENTICATOR_GENERAL_ERROR",cause:r})}return new I({message:"a Non-Webauthn related error has occurred",code:"ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",cause:r})}class La{createNewAbortSignal(){if(this.controller){const t=new Error("Cancelling existing WebAuthn API call for new one");t.name="AbortError",this.controller.abort(t)}const e=new AbortController;return this.controller=e,e.signal}cancelCeremony(){if(this.controller){const e=new Error("Manually cancelling existing WebAuthn API call");e.name="AbortError",this.controller.abort(e),this.controller=void 0}}}const Fa=new La;function Wa(r){if(!r)throw new Error("Credential creation options are required");if(typeof PublicKeyCredential<"u"&&"parseCreationOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseCreationOptionsFromJSON=="function")return PublicKeyCredential.parseCreationOptionsFromJSON(r);const{challenge:e,user:t,excludeCredentials:a}=r,n=Pe(r,["challenge","user","excludeCredentials"]),o=se(e).buffer,s=Object.assign(Object.assign({},t),{id:se(t.id).buffer}),i=Object.assign(Object.assign({},n),{challenge:o,user:s});if(a&&a.length>0){i.excludeCredentials=new Array(a.length);for(let l=0;l<a.length;l++){const u=a[l];i.excludeCredentials[l]=Object.assign(Object.assign({},u),{id:se(u.id).buffer,type:u.type||"public-key",transports:u.transports})}}return i}function Ua(r){if(!r)throw new Error("Credential request options are required");if(typeof PublicKeyCredential<"u"&&"parseRequestOptionsFromJSON"in PublicKeyCredential&&typeof PublicKeyCredential.parseRequestOptionsFromJSON=="function")return PublicKeyCredential.parseRequestOptionsFromJSON(r);const{challenge:e,allowCredentials:t}=r,a=Pe(r,["challenge","allowCredentials"]),n=se(e).buffer,o=Object.assign(Object.assign({},a),{challenge:n});if(t&&t.length>0){o.allowCredentials=new Array(t.length);for(let s=0;s<t.length;s++){const i=t[s];o.allowCredentials[s]=Object.assign(Object.assign({},i),{id:se(i.id).buffer,type:i.type||"public-key",transports:i.transports})}}return o}function Ha(r){var e;if("toJSON"in r&&typeof r.toJSON=="function")return r.toJSON();const t=r;return{id:r.id,rawId:r.id,response:{attestationObject:z(new Uint8Array(r.response.attestationObject)),clientDataJSON:z(new Uint8Array(r.response.clientDataJSON))},type:"public-key",clientExtensionResults:r.getClientExtensionResults(),authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Ya(r){var e;if("toJSON"in r&&typeof r.toJSON=="function")return r.toJSON();const t=r,a=r.getClientExtensionResults(),n=r.response;return{id:r.id,rawId:r.id,response:{authenticatorData:z(new Uint8Array(n.authenticatorData)),clientDataJSON:z(new Uint8Array(n.clientDataJSON)),signature:z(new Uint8Array(n.signature)),userHandle:n.userHandle?z(new Uint8Array(n.userHandle)):void 0},type:"public-key",clientExtensionResults:a,authenticatorAttachment:(e=t.authenticatorAttachment)!==null&&e!==void 0?e:void 0}}function Wt(r){return r==="localhost"||/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(r)}function Tt(){var r,e;return!!(x()&&"PublicKeyCredential"in window&&window.PublicKeyCredential&&"credentials"in navigator&&typeof((r=navigator==null?void 0:navigator.credentials)===null||r===void 0?void 0:r.create)=="function"&&typeof((e=navigator==null?void 0:navigator.credentials)===null||e===void 0?void 0:e.get)=="function")}async function qa(r){try{const e=await navigator.credentials.create(r);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Re("Browser returned unexpected credential type",e)}:{data:null,error:new Re("Empty credential response",e)}}catch(e){return{data:null,error:ja({error:e,options:r})}}}async function Ga(r){try{const e=await navigator.credentials.get(r);return e?e instanceof PublicKeyCredential?{data:e,error:null}:{data:null,error:new Re("Browser returned unexpected credential type",e)}:{data:null,error:new Re("Empty credential response",e)}}catch(e){return{data:null,error:Na({error:e,options:r})}}}const Ka={hints:["security-key"],authenticatorSelection:{authenticatorAttachment:"cross-platform",requireResidentKey:!1,userVerification:"preferred",residentKey:"discouraged"},attestation:"direct"},Va={userVerification:"preferred",hints:["security-key"],attestation:"direct"};function Ce(...r){const e=n=>n!==null&&typeof n=="object"&&!Array.isArray(n),t=n=>n instanceof ArrayBuffer||ArrayBuffer.isView(n),a={};for(const n of r)if(n)for(const o in n){const s=n[o];if(s!==void 0)if(Array.isArray(s))a[o]=s;else if(t(s))a[o]=s;else if(e(s)){const i=a[o];e(i)?a[o]=Ce(i,s):a[o]=Ce(s)}else a[o]=s}return a}function za(r,e){return Ce(Ka,r,e||{})}function Ja(r,e){return Ce(Va,r,e||{})}class Za{constructor(e){this.client=e,this.enroll=this._enroll.bind(this),this.challenge=this._challenge.bind(this),this.verify=this._verify.bind(this),this.authenticate=this._authenticate.bind(this),this.register=this._register.bind(this)}async _enroll(e){return this.client.mfa.enroll(Object.assign(Object.assign({},e),{factorType:"webauthn"}))}async _challenge({factorId:e,webauthn:t,friendlyName:a,signal:n},o){var s;try{const{data:i,error:l}=await this.client.mfa.challenge({factorId:e,webauthn:t});if(!i)return{data:null,error:l};const u=n??Fa.createNewAbortSignal();if(i.webauthn.type==="create"){const{user:c}=i.webauthn.credential_options.publicKey;if(!c.name){const y=a;if(y)c.name=`${c.id}:${y}`;else{const h=(await this.client.getUser()).data.user,m=((s=h==null?void 0:h.user_metadata)===null||s===void 0?void 0:s.name)||(h==null?void 0:h.email)||(h==null?void 0:h.id)||"User";c.name=`${c.id}:${m}`}}c.displayName||(c.displayName=c.name)}switch(i.webauthn.type){case"create":{const c=za(i.webauthn.credential_options.publicKey,o==null?void 0:o.create),{data:y,error:d}=await qa({publicKey:c,signal:u});return y?{data:{factorId:e,challengeId:i.id,webauthn:{type:i.webauthn.type,credential_response:y}},error:null}:{data:null,error:d}}case"request":{const c=Ja(i.webauthn.credential_options.publicKey,o==null?void 0:o.request),{data:y,error:d}=await Ga(Object.assign(Object.assign({},i.webauthn.credential_options),{publicKey:c,signal:u}));return y?{data:{factorId:e,challengeId:i.id,webauthn:{type:i.webauthn.type,credential_response:y}},error:null}:{data:null,error:d}}}}catch(i){return v(i)?{data:null,error:i}:{data:null,error:new V("Unexpected error in challenge",i)}}}async _verify({challengeId:e,factorId:t,webauthn:a}){return this.client.mfa.verify({factorId:t,challengeId:e,webauthn:a})}async _authenticate({factorId:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:a=typeof window<"u"?[window.location.origin]:void 0,signal:n}={}},o){if(!t)return{data:null,error:new ge("rpId is required for WebAuthn authentication")};try{if(!Tt())return{data:null,error:new V("Browser does not support WebAuthn",null)};const{data:s,error:i}=await this.challenge({factorId:e,webauthn:{rpId:t,rpOrigins:a},signal:n},{request:o});if(!s)return{data:null,error:i};const{webauthn:l}=s;return this._verify({factorId:e,challengeId:s.challengeId,webauthn:{type:l.type,rpId:t,rpOrigins:a,credential_response:l.credential_response}})}catch(s){return v(s)?{data:null,error:s}:{data:null,error:new V("Unexpected error in authenticate",s)}}}async _register({friendlyName:e,webauthn:{rpId:t=typeof window<"u"?window.location.hostname:void 0,rpOrigins:a=typeof window<"u"?[window.location.origin]:void 0,signal:n}={}},o){if(!t)return{data:null,error:new ge("rpId is required for WebAuthn registration")};try{if(!Tt())return{data:null,error:new V("Browser does not support WebAuthn",null)};const{data:s,error:i}=await this._enroll({friendlyName:e});if(!s)return await this.client.mfa.listFactors().then(c=>{var y;return(y=c.data)===null||y===void 0?void 0:y.all.find(d=>d.factor_type==="webauthn"&&d.friendly_name===e&&d.status!=="unverified")}).then(c=>c?this.client.mfa.unenroll({factorId:c==null?void 0:c.id}):void 0),{data:null,error:i};const{data:l,error:u}=await this._challenge({factorId:s.id,friendlyName:s.friendly_name,webauthn:{rpId:t,rpOrigins:a},signal:n},{create:o});return l?this._verify({factorId:s.id,challengeId:l.challengeId,webauthn:{rpId:t,rpOrigins:a,type:l.webauthn.type,credential_response:l.webauthn.credential_response}}):{data:null,error:u}}catch(s){return v(s)?{data:null,error:s}:{data:null,error:new V("Unexpected error in register",s)}}}}Oa();const Qa={url:Vr,storageKey:zr,autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,headers:Jr,flowType:"implicit",debug:!1,hasCustomAuthorizationHeader:!1,throwOnError:!1,lockAcquireTimeout:1e4};async function _t(r,e,t){return await t()}const te={};class pe{get jwks(){var e,t;return(t=(e=te[this.storageKey])===null||e===void 0?void 0:e.jwks)!==null&&t!==void 0?t:{keys:[]}}set jwks(e){te[this.storageKey]=Object.assign(Object.assign({},te[this.storageKey]),{jwks:e})}get jwks_cached_at(){var e,t;return(t=(e=te[this.storageKey])===null||e===void 0?void 0:e.cachedAt)!==null&&t!==void 0?t:Number.MIN_SAFE_INTEGER}set jwks_cached_at(e){te[this.storageKey]=Object.assign(Object.assign({},te[this.storageKey]),{cachedAt:e})}constructor(e){var t,a,n;this.userStorage=null,this.memoryStorage=null,this.stateChangeEmitters=new Map,this.autoRefreshTicker=null,this.autoRefreshTickTimeout=null,this.visibilityChangedCallback=null,this.refreshingDeferred=null,this.initializePromise=null,this.detectSessionInUrl=!0,this.hasCustomAuthorizationHeader=!1,this.suppressGetSessionWarning=!1,this.lockAcquired=!1,this.pendingInLock=[],this.broadcastChannel=null,this.logger=console.log;const o=Object.assign(Object.assign({},Qa),e);if(this.storageKey=o.storageKey,this.instanceID=(t=pe.nextInstanceID[this.storageKey])!==null&&t!==void 0?t:0,pe.nextInstanceID[this.storageKey]=this.instanceID+1,this.logDebugMessages=!!o.debug,typeof o.debug=="function"&&(this.logger=o.debug),this.instanceID>0&&x()){const s=`${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;console.warn(s),this.logDebugMessages&&console.trace(s)}if(this.persistSession=o.persistSession,this.autoRefreshToken=o.autoRefreshToken,this.admin=new Ca({url:o.url,headers:o.headers,fetch:o.fetch}),this.url=o.url,this.headers=o.headers,this.fetch=Nt(o.fetch),this.lock=o.lock||_t,this.detectSessionInUrl=o.detectSessionInUrl,this.flowType=o.flowType,this.hasCustomAuthorizationHeader=o.hasCustomAuthorizationHeader,this.throwOnError=o.throwOnError,this.lockAcquireTimeout=o.lockAcquireTimeout,o.lock?this.lock=o.lock:this.persistSession&&x()&&(!((a=globalThis==null?void 0:globalThis.navigator)===null||a===void 0)&&a.locks)?this.lock=xa:this.lock=_t,this.jwks||(this.jwks={keys:[]},this.jwks_cached_at=Number.MIN_SAFE_INTEGER),this.mfa={verify:this._verify.bind(this),enroll:this._enroll.bind(this),unenroll:this._unenroll.bind(this),challenge:this._challenge.bind(this),listFactors:this._listFactors.bind(this),challengeAndVerify:this._challengeAndVerify.bind(this),getAuthenticatorAssuranceLevel:this._getAuthenticatorAssuranceLevel.bind(this),webauthn:new Za(this)},this.oauth={getAuthorizationDetails:this._getAuthorizationDetails.bind(this),approveAuthorization:this._approveAuthorization.bind(this),denyAuthorization:this._denyAuthorization.bind(this),listGrants:this._listOAuthGrants.bind(this),revokeGrant:this._revokeOAuthGrant.bind(this)},this.persistSession?(o.storage?this.storage=o.storage:jt()?this.storage=globalThis.localStorage:(this.memoryStorage={},this.storage=kt(this.memoryStorage)),o.userStorage&&(this.userStorage=o.userStorage)):(this.memoryStorage={},this.storage=kt(this.memoryStorage)),x()&&globalThis.BroadcastChannel&&this.persistSession&&this.storageKey){try{this.broadcastChannel=new globalThis.BroadcastChannel(this.storageKey)}catch(s){console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available",s)}(n=this.broadcastChannel)===null||n===void 0||n.addEventListener("message",async s=>{this._debug("received broadcast notification from other tab or client",s);try{await this._notifyAllSubscribers(s.data.event,s.data.session,!1)}catch(i){this._debug("#broadcastChannel","error",i)}})}this.initialize().catch(s=>{this._debug("#initialize()","error",s)})}isThrowOnErrorEnabled(){return this.throwOnError}_returnResult(e){if(this.throwOnError&&e&&e.error)throw e.error;return e}_logPrefix(){return`GoTrueClient@${this.storageKey}:${this.instanceID} (${Mt}) ${new Date().toISOString()}`}_debug(...e){return this.logDebugMessages&&this.logger(this._logPrefix(),...e),this}async initialize(){return this.initializePromise?await this.initializePromise:(this.initializePromise=(async()=>await this._acquireLock(this.lockAcquireTimeout,async()=>await this._initialize()))(),await this.initializePromise)}async _initialize(){var e;try{let t={},a="none";if(x()&&(t=ca(window.location.href),this._isImplicitGrantCallback(t)?a="implicit":await this._isPKCECallback(t)&&(a="pkce")),x()&&this.detectSessionInUrl&&a!=="none"){const{data:n,error:o}=await this._getSessionFromURL(t,a);if(o){if(this._debug("#_initialize()","error detecting session from URL",o),ta(o)){const l=(e=o.details)===null||e===void 0?void 0:e.code;if(l==="identity_already_exists"||l==="identity_not_found"||l==="single_identity_not_deletable")return{error:o}}return{error:o}}const{session:s,redirectType:i}=n;return this._debug("#_initialize()","detected session in URL",s,"redirect type",i),await this._saveSession(s),setTimeout(async()=>{i==="recovery"?await this._notifyAllSubscribers("PASSWORD_RECOVERY",s):await this._notifyAllSubscribers("SIGNED_IN",s)},0),{error:null}}return await this._recoverAndRefresh(),{error:null}}catch(t){return v(t)?this._returnResult({error:t}):this._returnResult({error:new V("Unexpected error during initialization",t)})}finally{await this._handleVisibilityChange(),this._debug("#_initialize()","end")}}async signInAnonymously(e){var t,a,n;try{const o=await k(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{data:(a=(t=e==null?void 0:e.options)===null||t===void 0?void 0:t.data)!==null&&a!==void 0?a:{},gotrue_meta_security:{captcha_token:(n=e==null?void 0:e.options)===null||n===void 0?void 0:n.captchaToken}},xform:D}),{data:s,error:i}=o;if(i||!s)return this._returnResult({data:{user:null,session:null},error:i});const l=s.session,u=s.user;return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:u,session:l},error:null})}catch(o){if(v(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async signUp(e){var t,a,n;try{let o;if("email"in e){const{email:c,password:y,options:d}=e;let h=null,m=null;this.flowType==="pkce"&&([h,m]=await Q(this.storage,this.storageKey)),o=await k(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,redirectTo:d==null?void 0:d.emailRedirectTo,body:{email:c,password:y,data:(t=d==null?void 0:d.data)!==null&&t!==void 0?t:{},gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken},code_challenge:h,code_challenge_method:m},xform:D})}else if("phone"in e){const{phone:c,password:y,options:d}=e;o=await k(this.fetch,"POST",`${this.url}/signup`,{headers:this.headers,body:{phone:c,password:y,data:(a=d==null?void 0:d.data)!==null&&a!==void 0?a:{},channel:(n=d==null?void 0:d.channel)!==null&&n!==void 0?n:"sms",gotrue_meta_security:{captcha_token:d==null?void 0:d.captchaToken}},xform:D})}else throw new Se("You must provide either an email or phone number and a password");const{data:s,error:i}=o;if(i||!s)return await P(this.storage,`${this.storageKey}-code-verifier`),this._returnResult({data:{user:null,session:null},error:i});const l=s.session,u=s.user;return s.session&&(await this._saveSession(s.session),await this._notifyAllSubscribers("SIGNED_IN",l)),this._returnResult({data:{user:u,session:l},error:null})}catch(o){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(o))return this._returnResult({data:{user:null,session:null},error:o});throw o}}async signInWithPassword(e){try{let t;if("email"in e){const{email:o,password:s,options:i}=e;t=await k(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{email:o,password:s,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}},xform:vt})}else if("phone"in e){const{phone:o,password:s,options:i}=e;t=await k(this.fetch,"POST",`${this.url}/token?grant_type=password`,{headers:this.headers,body:{phone:o,password:s,gotrue_meta_security:{captcha_token:i==null?void 0:i.captchaToken}},xform:vt})}else throw new Se("You must provide either an email or phone number and a password");const{data:a,error:n}=t;if(n)return this._returnResult({data:{user:null,session:null},error:n});if(!a||!a.session||!a.user){const o=new Z;return this._returnResult({data:{user:null,session:null},error:o})}return a.session&&(await this._saveSession(a.session),await this._notifyAllSubscribers("SIGNED_IN",a.session)),this._returnResult({data:Object.assign({user:a.user,session:a.session},a.weak_password?{weakPassword:a.weak_password}:null),error:n})}catch(t){if(v(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOAuth(e){var t,a,n,o;return await this._handleProviderSignIn(e.provider,{redirectTo:(t=e.options)===null||t===void 0?void 0:t.redirectTo,scopes:(a=e.options)===null||a===void 0?void 0:a.scopes,queryParams:(n=e.options)===null||n===void 0?void 0:n.queryParams,skipBrowserRedirect:(o=e.options)===null||o===void 0?void 0:o.skipBrowserRedirect})}async exchangeCodeForSession(e){return await this.initializePromise,this._acquireLock(this.lockAcquireTimeout,async()=>this._exchangeCodeForSession(e))}async signInWithWeb3(e){const{chain:t}=e;switch(t){case"ethereum":return await this.signInWithEthereum(e);case"solana":return await this.signInWithSolana(e);default:throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`)}}async signInWithEthereum(e){var t,a,n,o,s,i,l,u,c,y,d;let h,m;if("message"in e)h=e.message,m=e.signature;else{const{chain:f,wallet:g,statement:w,options:b}=e;let p;if(x())if(typeof g=="object")p=g;else{const N=window;if("ethereum"in N&&typeof N.ethereum=="object"&&"request"in N.ethereum&&typeof N.ethereum.request=="function")p=N.ethereum;else throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.")}else{if(typeof g!="object"||!(b!=null&&b.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");p=g}const _=new URL((t=b==null?void 0:b.url)!==null&&t!==void 0?t:window.location.href),C=await p.request({method:"eth_requestAccounts"}).then(N=>N).catch(()=>{throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid")});if(!C||C.length===0)throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");const S=Ft(C[0]);let E=(a=b==null?void 0:b.signInWithEthereum)===null||a===void 0?void 0:a.chainId;if(!E){const N=await p.request({method:"eth_chainId"});E=Ma(N)}const W={domain:_.host,address:S,statement:w,uri:_.href,version:"1",chainId:E,nonce:(n=b==null?void 0:b.signInWithEthereum)===null||n===void 0?void 0:n.nonce,issuedAt:(s=(o=b==null?void 0:b.signInWithEthereum)===null||o===void 0?void 0:o.issuedAt)!==null&&s!==void 0?s:new Date,expirationTime:(i=b==null?void 0:b.signInWithEthereum)===null||i===void 0?void 0:i.expirationTime,notBefore:(l=b==null?void 0:b.signInWithEthereum)===null||l===void 0?void 0:l.notBefore,requestId:(u=b==null?void 0:b.signInWithEthereum)===null||u===void 0?void 0:u.requestId,resources:(c=b==null?void 0:b.signInWithEthereum)===null||c===void 0?void 0:c.resources};h=Ba(W),m=await p.request({method:"personal_sign",params:[Da(h),S]})}try{const{data:f,error:g}=await k(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"ethereum",message:h,signature:m},!((y=e.options)===null||y===void 0)&&y.captchaToken?{gotrue_meta_security:{captcha_token:(d=e.options)===null||d===void 0?void 0:d.captchaToken}}:null),xform:D});if(g)throw g;if(!f||!f.session||!f.user){const w=new Z;return this._returnResult({data:{user:null,session:null},error:w})}return f.session&&(await this._saveSession(f.session),await this._notifyAllSubscribers("SIGNED_IN",f.session)),this._returnResult({data:Object.assign({},f),error:g})}catch(f){if(v(f))return this._returnResult({data:{user:null,session:null},error:f});throw f}}async signInWithSolana(e){var t,a,n,o,s,i,l,u,c,y,d,h;let m,f;if("message"in e)m=e.message,f=e.signature;else{const{chain:g,wallet:w,statement:b,options:p}=e;let _;if(x())if(typeof w=="object")_=w;else{const S=window;if("solana"in S&&typeof S.solana=="object"&&("signIn"in S.solana&&typeof S.solana.signIn=="function"||"signMessage"in S.solana&&typeof S.solana.signMessage=="function"))_=S.solana;else throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.")}else{if(typeof w!="object"||!(p!=null&&p.url))throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");_=w}const C=new URL((t=p==null?void 0:p.url)!==null&&t!==void 0?t:window.location.href);if("signIn"in _&&_.signIn){const S=await _.signIn(Object.assign(Object.assign(Object.assign({issuedAt:new Date().toISOString()},p==null?void 0:p.signInWithSolana),{version:"1",domain:C.host,uri:C.href}),b?{statement:b}:null));let E;if(Array.isArray(S)&&S[0]&&typeof S[0]=="object")E=S[0];else if(S&&typeof S=="object"&&"signedMessage"in S&&"signature"in S)E=S;else throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");if("signedMessage"in E&&"signature"in E&&(typeof E.signedMessage=="string"||E.signedMessage instanceof Uint8Array)&&E.signature instanceof Uint8Array)m=typeof E.signedMessage=="string"?E.signedMessage:new TextDecoder().decode(E.signedMessage),f=E.signature;else throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields")}else{if(!("signMessage"in _)||typeof _.signMessage!="function"||!("publicKey"in _)||typeof _!="object"||!_.publicKey||!("toBase58"in _.publicKey)||typeof _.publicKey.toBase58!="function")throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");m=[`${C.host} wants you to sign in with your Solana account:`,_.publicKey.toBase58(),...b?["",b,""]:[""],"Version: 1",`URI: ${C.href}`,`Issued At: ${(n=(a=p==null?void 0:p.signInWithSolana)===null||a===void 0?void 0:a.issuedAt)!==null&&n!==void 0?n:new Date().toISOString()}`,...!((o=p==null?void 0:p.signInWithSolana)===null||o===void 0)&&o.notBefore?[`Not Before: ${p.signInWithSolana.notBefore}`]:[],...!((s=p==null?void 0:p.signInWithSolana)===null||s===void 0)&&s.expirationTime?[`Expiration Time: ${p.signInWithSolana.expirationTime}`]:[],...!((i=p==null?void 0:p.signInWithSolana)===null||i===void 0)&&i.chainId?[`Chain ID: ${p.signInWithSolana.chainId}`]:[],...!((l=p==null?void 0:p.signInWithSolana)===null||l===void 0)&&l.nonce?[`Nonce: ${p.signInWithSolana.nonce}`]:[],...!((u=p==null?void 0:p.signInWithSolana)===null||u===void 0)&&u.requestId?[`Request ID: ${p.signInWithSolana.requestId}`]:[],...!((y=(c=p==null?void 0:p.signInWithSolana)===null||c===void 0?void 0:c.resources)===null||y===void 0)&&y.length?["Resources",...p.signInWithSolana.resources.map(E=>`- ${E}`)]:[]].join(`
`);const S=await _.signMessage(new TextEncoder().encode(m),"utf8");if(!S||!(S instanceof Uint8Array))throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");f=S}}try{const{data:g,error:w}=await k(this.fetch,"POST",`${this.url}/token?grant_type=web3`,{headers:this.headers,body:Object.assign({chain:"solana",message:m,signature:z(f)},!((d=e.options)===null||d===void 0)&&d.captchaToken?{gotrue_meta_security:{captcha_token:(h=e.options)===null||h===void 0?void 0:h.captchaToken}}:null),xform:D});if(w)throw w;if(!g||!g.session||!g.user){const b=new Z;return this._returnResult({data:{user:null,session:null},error:b})}return g.session&&(await this._saveSession(g.session),await this._notifyAllSubscribers("SIGNED_IN",g.session)),this._returnResult({data:Object.assign({},g),error:w})}catch(g){if(v(g))return this._returnResult({data:{user:null,session:null},error:g});throw g}}async _exchangeCodeForSession(e){const t=await q(this.storage,`${this.storageKey}-code-verifier`),[a,n]=(t??"").split("/");try{if(!a&&this.flowType==="pkce")throw new ra;const{data:o,error:s}=await k(this.fetch,"POST",`${this.url}/token?grant_type=pkce`,{headers:this.headers,body:{auth_code:e,code_verifier:a},xform:D});if(await P(this.storage,`${this.storageKey}-code-verifier`),s)throw s;if(!o||!o.session||!o.user){const i=new Z;return this._returnResult({data:{user:null,session:null,redirectType:null},error:i})}return o.session&&(await this._saveSession(o.session),await this._notifyAllSubscribers("SIGNED_IN",o.session)),this._returnResult({data:Object.assign(Object.assign({},o),{redirectType:n??null}),error:s})}catch(o){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(o))return this._returnResult({data:{user:null,session:null,redirectType:null},error:o});throw o}}async signInWithIdToken(e){try{const{options:t,provider:a,token:n,access_token:o,nonce:s}=e,i=await k(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,body:{provider:a,id_token:n,access_token:o,nonce:s,gotrue_meta_security:{captcha_token:t==null?void 0:t.captchaToken}},xform:D}),{data:l,error:u}=i;if(u)return this._returnResult({data:{user:null,session:null},error:u});if(!l||!l.session||!l.user){const c=new Z;return this._returnResult({data:{user:null,session:null},error:c})}return l.session&&(await this._saveSession(l.session),await this._notifyAllSubscribers("SIGNED_IN",l.session)),this._returnResult({data:l,error:u})}catch(t){if(v(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async signInWithOtp(e){var t,a,n,o,s;try{if("email"in e){const{email:i,options:l}=e;let u=null,c=null;this.flowType==="pkce"&&([u,c]=await Q(this.storage,this.storageKey));const{error:y}=await k(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{email:i,data:(t=l==null?void 0:l.data)!==null&&t!==void 0?t:{},create_user:(a=l==null?void 0:l.shouldCreateUser)!==null&&a!==void 0?a:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},code_challenge:u,code_challenge_method:c},redirectTo:l==null?void 0:l.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:y})}if("phone"in e){const{phone:i,options:l}=e,{data:u,error:c}=await k(this.fetch,"POST",`${this.url}/otp`,{headers:this.headers,body:{phone:i,data:(n=l==null?void 0:l.data)!==null&&n!==void 0?n:{},create_user:(o=l==null?void 0:l.shouldCreateUser)!==null&&o!==void 0?o:!0,gotrue_meta_security:{captcha_token:l==null?void 0:l.captchaToken},channel:(s=l==null?void 0:l.channel)!==null&&s!==void 0?s:"sms"}});return this._returnResult({data:{user:null,session:null,messageId:u==null?void 0:u.message_id},error:c})}throw new Se("You must provide either an email or phone number.")}catch(i){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(i))return this._returnResult({data:{user:null,session:null},error:i});throw i}}async verifyOtp(e){var t,a;try{let n,o;"options"in e&&(n=(t=e.options)===null||t===void 0?void 0:t.redirectTo,o=(a=e.options)===null||a===void 0?void 0:a.captchaToken);const{data:s,error:i}=await k(this.fetch,"POST",`${this.url}/verify`,{headers:this.headers,body:Object.assign(Object.assign({},e),{gotrue_meta_security:{captcha_token:o}}),redirectTo:n,xform:D});if(i)throw i;if(!s)throw new Error("An error occurred on token verification.");const l=s.session,u=s.user;return l!=null&&l.access_token&&(await this._saveSession(l),await this._notifyAllSubscribers(e.type=="recovery"?"PASSWORD_RECOVERY":"SIGNED_IN",l)),this._returnResult({data:{user:u,session:l},error:null})}catch(n){if(v(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}}async signInWithSSO(e){var t,a,n,o,s;try{let i=null,l=null;this.flowType==="pkce"&&([i,l]=await Q(this.storage,this.storageKey));const u=await k(this.fetch,"POST",`${this.url}/sso`,{body:Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({},"providerId"in e?{provider_id:e.providerId}:null),"domain"in e?{domain:e.domain}:null),{redirect_to:(a=(t=e.options)===null||t===void 0?void 0:t.redirectTo)!==null&&a!==void 0?a:void 0}),!((n=e==null?void 0:e.options)===null||n===void 0)&&n.captchaToken?{gotrue_meta_security:{captcha_token:e.options.captchaToken}}:null),{skip_http_redirect:!0,code_challenge:i,code_challenge_method:l}),headers:this.headers,xform:Ia});return!((o=u.data)===null||o===void 0)&&o.url&&x()&&!(!((s=e.options)===null||s===void 0)&&s.skipBrowserRedirect)&&window.location.assign(u.data.url),this._returnResult(u)}catch(i){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(i))return this._returnResult({data:null,error:i});throw i}}async reauthenticate(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._reauthenticate())}async _reauthenticate(){try{return await this._useSession(async e=>{const{data:{session:t},error:a}=e;if(a)throw a;if(!t)throw new O;const{error:n}=await k(this.fetch,"GET",`${this.url}/reauthenticate`,{headers:this.headers,jwt:t.access_token});return this._returnResult({data:{user:null,session:null},error:n})})}catch(e){if(v(e))return this._returnResult({data:{user:null,session:null},error:e});throw e}}async resend(e){try{const t=`${this.url}/resend`;if("email"in e){const{email:a,type:n,options:o}=e,{error:s}=await k(this.fetch,"POST",t,{headers:this.headers,body:{email:a,type:n,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}},redirectTo:o==null?void 0:o.emailRedirectTo});return this._returnResult({data:{user:null,session:null},error:s})}else if("phone"in e){const{phone:a,type:n,options:o}=e,{data:s,error:i}=await k(this.fetch,"POST",t,{headers:this.headers,body:{phone:a,type:n,gotrue_meta_security:{captcha_token:o==null?void 0:o.captchaToken}}});return this._returnResult({data:{user:null,session:null,messageId:s==null?void 0:s.message_id},error:i})}throw new Se("You must provide either an email or phone number and a type")}catch(t){if(v(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async getSession(){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>this._useSession(async t=>t))}async _acquireLock(e,t){this._debug("#_acquireLock","begin",e);try{if(this.lockAcquired){const a=this.pendingInLock.length?this.pendingInLock[this.pendingInLock.length-1]:Promise.resolve(),n=(async()=>(await a,await t()))();return this.pendingInLock.push((async()=>{try{await n}catch{}})()),n}return await this.lock(`lock:${this.storageKey}`,e,async()=>{this._debug("#_acquireLock","lock acquired for storage key",this.storageKey);try{this.lockAcquired=!0;const a=t();for(this.pendingInLock.push((async()=>{try{await a}catch{}})()),await a;this.pendingInLock.length;){const n=[...this.pendingInLock];await Promise.all(n),this.pendingInLock.splice(0,n.length)}return await a}finally{this._debug("#_acquireLock","lock released for storage key",this.storageKey),this.lockAcquired=!1}})}finally{this._debug("#_acquireLock","end")}}async _useSession(e){this._debug("#_useSession","begin");try{const t=await this.__loadSession();return await e(t)}finally{this._debug("#_useSession","end")}}async __loadSession(){this._debug("#__loadSession()","begin"),this.lockAcquired||this._debug("#__loadSession()","used outside of an acquired lock!",new Error().stack);try{let e=null;const t=await q(this.storage,this.storageKey);if(this._debug("#getSession()","session from storage",t),t!==null&&(this._isValidSession(t)?e=t:(this._debug("#getSession()","session from storage is not valid"),await this._removeSession())),!e)return{data:{session:null},error:null};const a=e.expires_at?e.expires_at*1e3-Date.now()<je:!1;if(this._debug("#__loadSession()",`session has${a?"":" not"} expired`,"expires_at",e.expires_at),!a){if(this.userStorage){const s=await q(this.userStorage,this.storageKey+"-user");s!=null&&s.user?e.user=s.user:e.user=Fe()}if(this.storage.isServer&&e.user&&!e.user.__isUserNotAvailableProxy){const s={value:this.suppressGetSessionWarning};e.user=_a(e.user,s),s.value&&(this.suppressGetSessionWarning=!0)}return{data:{session:e},error:null}}const{data:n,error:o}=await this._callRefreshToken(e.refresh_token);return o?this._returnResult({data:{session:null},error:o}):this._returnResult({data:{session:n},error:null})}finally{this._debug("#__loadSession()","end")}}async getUser(e){if(e)return await this._getUser(e);await this.initializePromise;const t=await this._acquireLock(this.lockAcquireTimeout,async()=>await this._getUser());return t.data.user&&(this.suppressGetSessionWarning=!0),t}async _getUser(e){try{return e?await k(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:e,xform:H}):await this._useSession(async t=>{var a,n,o;const{data:s,error:i}=t;if(i)throw i;return!(!((a=s.session)===null||a===void 0)&&a.access_token)&&!this.hasCustomAuthorizationHeader?{data:{user:null},error:new O}:await k(this.fetch,"GET",`${this.url}/user`,{headers:this.headers,jwt:(o=(n=s.session)===null||n===void 0?void 0:n.access_token)!==null&&o!==void 0?o:void 0,xform:H})})}catch(t){if(v(t))return Ne(t)&&(await this._removeSession(),await P(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({data:{user:null},error:t});throw t}}async updateUser(e,t={}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._updateUser(e,t))}async _updateUser(e,t={}){try{return await this._useSession(async a=>{const{data:n,error:o}=a;if(o)throw o;if(!n.session)throw new O;const s=n.session;let i=null,l=null;this.flowType==="pkce"&&e.email!=null&&([i,l]=await Q(this.storage,this.storageKey));const{data:u,error:c}=await k(this.fetch,"PUT",`${this.url}/user`,{headers:this.headers,redirectTo:t==null?void 0:t.emailRedirectTo,body:Object.assign(Object.assign({},e),{code_challenge:i,code_challenge_method:l}),jwt:s.access_token,xform:H});if(c)throw c;return s.user=u.user,await this._saveSession(s),await this._notifyAllSubscribers("USER_UPDATED",s),this._returnResult({data:{user:s.user},error:null})})}catch(a){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(a))return this._returnResult({data:{user:null},error:a});throw a}}async setSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._setSession(e))}async _setSession(e){try{if(!e.access_token||!e.refresh_token)throw new O;const t=Date.now()/1e3;let a=t,n=!0,o=null;const{payload:s}=Ae(e.access_token);if(s.exp&&(a=s.exp,n=a<=t),n){const{data:i,error:l}=await this._callRefreshToken(e.refresh_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});if(!i)return{data:{user:null,session:null},error:null};o=i}else{const{data:i,error:l}=await this._getUser(e.access_token);if(l)return this._returnResult({data:{user:null,session:null},error:l});o={access_token:e.access_token,refresh_token:e.refresh_token,user:i.user,token_type:"bearer",expires_in:a-t,expires_at:a},await this._saveSession(o),await this._notifyAllSubscribers("SIGNED_IN",o)}return this._returnResult({data:{user:o.user,session:o},error:null})}catch(t){if(v(t))return this._returnResult({data:{session:null,user:null},error:t});throw t}}async refreshSession(e){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._refreshSession(e))}async _refreshSession(e){try{return await this._useSession(async t=>{var a;if(!e){const{data:s,error:i}=t;if(i)throw i;e=(a=s.session)!==null&&a!==void 0?a:void 0}if(!(e!=null&&e.refresh_token))throw new O;const{data:n,error:o}=await this._callRefreshToken(e.refresh_token);return o?this._returnResult({data:{user:null,session:null},error:o}):n?this._returnResult({data:{user:n.user,session:n},error:null}):this._returnResult({data:{user:null,session:null},error:null})})}catch(t){if(v(t))return this._returnResult({data:{user:null,session:null},error:t});throw t}}async _getSessionFromURL(e,t){try{if(!x())throw new $e("No browser detected.");if(e.error||e.error_description||e.error_code)throw new $e(e.error_description||"Error in URL with unspecified error_description",{error:e.error||"unspecified_error",code:e.error_code||"unspecified_code"});switch(t){case"implicit":if(this.flowType==="pkce")throw new dt("Not a valid PKCE flow url.");break;case"pkce":if(this.flowType==="implicit")throw new $e("Not a valid implicit grant flow url.");break;default:}if(t==="pkce"){if(this._debug("#_initialize()","begin","is PKCE flow",!0),!e.code)throw new dt("No code detected.");const{data:b,error:p}=await this._exchangeCodeForSession(e.code);if(p)throw p;const _=new URL(window.location.href);return _.searchParams.delete("code"),window.history.replaceState(window.history.state,"",_.toString()),{data:{session:b.session,redirectType:null},error:null}}const{provider_token:a,provider_refresh_token:n,access_token:o,refresh_token:s,expires_in:i,expires_at:l,token_type:u}=e;if(!o||!i||!s||!u)throw new $e("No session defined in URL");const c=Math.round(Date.now()/1e3),y=parseInt(i);let d=c+y;l&&(d=parseInt(l));const h=d-c;h*1e3<=ae&&console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${h}s, should have been closer to ${y}s`);const m=d-y;c-m>=120?console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale",m,d,c):c-m<0&&console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew",m,d,c);const{data:f,error:g}=await this._getUser(o);if(g)throw g;const w={provider_token:a,provider_refresh_token:n,access_token:o,expires_in:y,expires_at:d,refresh_token:s,token_type:u,user:f.user};return window.location.hash="",this._debug("#_getSessionFromURL()","clearing window.location.hash"),this._returnResult({data:{session:w,redirectType:e.type},error:null})}catch(a){if(v(a))return this._returnResult({data:{session:null,redirectType:null},error:a});throw a}}_isImplicitGrantCallback(e){return typeof this.detectSessionInUrl=="function"?this.detectSessionInUrl(new URL(window.location.href),e):!!(e.access_token||e.error_description)}async _isPKCECallback(e){const t=await q(this.storage,`${this.storageKey}-code-verifier`);return!!(e.code&&t)}async signOut(e={scope:"global"}){return await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>await this._signOut(e))}async _signOut({scope:e}={scope:"global"}){return await this._useSession(async t=>{var a;const{data:n,error:o}=t;if(o&&!Ne(o))return this._returnResult({error:o});const s=(a=n.session)===null||a===void 0?void 0:a.access_token;if(s){const{error:i}=await this.admin.signOut(s,e);if(i&&!(ea(i)&&(i.status===404||i.status===401||i.status===403)||Ne(i)))return this._returnResult({error:i})}return e!=="others"&&(await this._removeSession(),await P(this.storage,`${this.storageKey}-code-verifier`)),this._returnResult({error:null})})}onAuthStateChange(e){const t=ua(),a={id:t,callback:e,unsubscribe:()=>{this._debug("#unsubscribe()","state change callback with id removed",t),this.stateChangeEmitters.delete(t)}};return this._debug("#onAuthStateChange()","registered callback with id",t),this.stateChangeEmitters.set(t,a),(async()=>(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{this._emitInitialSession(t)})))(),{data:{subscription:a}}}async _emitInitialSession(e){return await this._useSession(async t=>{var a,n;try{const{data:{session:o},error:s}=t;if(s)throw s;await((a=this.stateChangeEmitters.get(e))===null||a===void 0?void 0:a.callback("INITIAL_SESSION",o)),this._debug("INITIAL_SESSION","callback id",e,"session",o)}catch(o){await((n=this.stateChangeEmitters.get(e))===null||n===void 0?void 0:n.callback("INITIAL_SESSION",null)),this._debug("INITIAL_SESSION","callback id",e,"error",o),console.error(o)}})}async resetPasswordForEmail(e,t={}){let a=null,n=null;this.flowType==="pkce"&&([a,n]=await Q(this.storage,this.storageKey,!0));try{return await k(this.fetch,"POST",`${this.url}/recover`,{body:{email:e,code_challenge:a,code_challenge_method:n,gotrue_meta_security:{captcha_token:t.captchaToken}},headers:this.headers,redirectTo:t.redirectTo})}catch(o){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(o))return this._returnResult({data:null,error:o});throw o}}async getUserIdentities(){var e;try{const{data:t,error:a}=await this.getUser();if(a)throw a;return this._returnResult({data:{identities:(e=t.user.identities)!==null&&e!==void 0?e:[]},error:null})}catch(t){if(v(t))return this._returnResult({data:null,error:t});throw t}}async linkIdentity(e){return"token"in e?this.linkIdentityIdToken(e):this.linkIdentityOAuth(e)}async linkIdentityOAuth(e){var t;try{const{data:a,error:n}=await this._useSession(async o=>{var s,i,l,u,c;const{data:y,error:d}=o;if(d)throw d;const h=await this._getUrlForProvider(`${this.url}/user/identities/authorize`,e.provider,{redirectTo:(s=e.options)===null||s===void 0?void 0:s.redirectTo,scopes:(i=e.options)===null||i===void 0?void 0:i.scopes,queryParams:(l=e.options)===null||l===void 0?void 0:l.queryParams,skipBrowserRedirect:!0});return await k(this.fetch,"GET",h,{headers:this.headers,jwt:(c=(u=y.session)===null||u===void 0?void 0:u.access_token)!==null&&c!==void 0?c:void 0})});if(n)throw n;return x()&&!(!((t=e.options)===null||t===void 0)&&t.skipBrowserRedirect)&&window.location.assign(a==null?void 0:a.url),this._returnResult({data:{provider:e.provider,url:a==null?void 0:a.url},error:null})}catch(a){if(v(a))return this._returnResult({data:{provider:e.provider,url:null},error:a});throw a}}async linkIdentityIdToken(e){return await this._useSession(async t=>{var a;try{const{error:n,data:{session:o}}=t;if(n)throw n;const{options:s,provider:i,token:l,access_token:u,nonce:c}=e,y=await k(this.fetch,"POST",`${this.url}/token?grant_type=id_token`,{headers:this.headers,jwt:(a=o==null?void 0:o.access_token)!==null&&a!==void 0?a:void 0,body:{provider:i,id_token:l,access_token:u,nonce:c,link_identity:!0,gotrue_meta_security:{captcha_token:s==null?void 0:s.captchaToken}},xform:D}),{data:d,error:h}=y;return h?this._returnResult({data:{user:null,session:null},error:h}):!d||!d.session||!d.user?this._returnResult({data:{user:null,session:null},error:new Z}):(d.session&&(await this._saveSession(d.session),await this._notifyAllSubscribers("USER_UPDATED",d.session)),this._returnResult({data:d,error:h}))}catch(n){if(await P(this.storage,`${this.storageKey}-code-verifier`),v(n))return this._returnResult({data:{user:null,session:null},error:n});throw n}})}async unlinkIdentity(e){try{return await this._useSession(async t=>{var a,n;const{data:o,error:s}=t;if(s)throw s;return await k(this.fetch,"DELETE",`${this.url}/user/identities/${e.identity_id}`,{headers:this.headers,jwt:(n=(a=o.session)===null||a===void 0?void 0:a.access_token)!==null&&n!==void 0?n:void 0})})}catch(t){if(v(t))return this._returnResult({data:null,error:t});throw t}}async _refreshAccessToken(e){const t=`#_refreshAccessToken(${e.substring(0,5)}...)`;this._debug(t,"begin");try{const a=Date.now();return await ya(async n=>(n>0&&await da(200*Math.pow(2,n-1)),this._debug(t,"refreshing attempt",n),await k(this.fetch,"POST",`${this.url}/token?grant_type=refresh_token`,{body:{refresh_token:e},headers:this.headers,xform:D})),(n,o)=>{const s=200*Math.pow(2,n);return o&&Le(o)&&Date.now()+s-a<ae})}catch(a){if(this._debug(t,"error",a),v(a))return this._returnResult({data:{session:null,user:null},error:a});throw a}finally{this._debug(t,"end")}}_isValidSession(e){return typeof e=="object"&&e!==null&&"access_token"in e&&"refresh_token"in e&&"expires_at"in e}async _handleProviderSignIn(e,t){const a=await this._getUrlForProvider(`${this.url}/authorize`,e,{redirectTo:t.redirectTo,scopes:t.scopes,queryParams:t.queryParams});return this._debug("#_handleProviderSignIn()","provider",e,"options",t,"url",a),x()&&!t.skipBrowserRedirect&&window.location.assign(a),{data:{provider:e,url:a},error:null}}async _recoverAndRefresh(){var e,t;const a="#_recoverAndRefresh()";this._debug(a,"begin");try{const n=await q(this.storage,this.storageKey);if(n&&this.userStorage){let s=await q(this.userStorage,this.storageKey+"-user");!this.storage.isServer&&Object.is(this.storage,this.userStorage)&&!s&&(s={user:n.user},await ne(this.userStorage,this.storageKey+"-user",s)),n.user=(e=s==null?void 0:s.user)!==null&&e!==void 0?e:Fe()}else if(n&&!n.user&&!n.user){const s=await q(this.storage,this.storageKey+"-user");s&&(s!=null&&s.user)?(n.user=s.user,await P(this.storage,this.storageKey+"-user"),await ne(this.storage,this.storageKey,n)):n.user=Fe()}if(this._debug(a,"session from storage",n),!this._isValidSession(n)){this._debug(a,"session is not valid"),n!==null&&await this._removeSession();return}const o=((t=n.expires_at)!==null&&t!==void 0?t:1/0)*1e3-Date.now()<je;if(this._debug(a,`session has${o?"":" not"} expired with margin of ${je}s`),o){if(this.autoRefreshToken&&n.refresh_token){const{error:s}=await this._callRefreshToken(n.refresh_token);s&&(console.error(s),Le(s)||(this._debug(a,"refresh failed with a non-retryable error, removing the session",s),await this._removeSession()))}}else if(n.user&&n.user.__isUserNotAvailableProxy===!0)try{const{data:s,error:i}=await this._getUser(n.access_token);!i&&(s!=null&&s.user)?(n.user=s.user,await this._saveSession(n),await this._notifyAllSubscribers("SIGNED_IN",n)):this._debug(a,"could not get user data, skipping SIGNED_IN notification")}catch(s){console.error("Error getting user data:",s),this._debug(a,"error getting user data, skipping SIGNED_IN notification",s)}else await this._notifyAllSubscribers("SIGNED_IN",n)}catch(n){this._debug(a,"error",n),console.error(n);return}finally{this._debug(a,"end")}}async _callRefreshToken(e){var t,a;if(!e)throw new O;if(this.refreshingDeferred)return this.refreshingDeferred.promise;const n=`#_callRefreshToken(${e.substring(0,5)}...)`;this._debug(n,"begin");try{this.refreshingDeferred=new Me;const{data:o,error:s}=await this._refreshAccessToken(e);if(s)throw s;if(!o.session)throw new O;await this._saveSession(o.session),await this._notifyAllSubscribers("TOKEN_REFRESHED",o.session);const i={data:o.session,error:null};return this.refreshingDeferred.resolve(i),i}catch(o){if(this._debug(n,"error",o),v(o)){const s={data:null,error:o};return Le(o)||await this._removeSession(),(t=this.refreshingDeferred)===null||t===void 0||t.resolve(s),s}throw(a=this.refreshingDeferred)===null||a===void 0||a.reject(o),o}finally{this.refreshingDeferred=null,this._debug(n,"end")}}async _notifyAllSubscribers(e,t,a=!0){const n=`#_notifyAllSubscribers(${e})`;this._debug(n,"begin",t,`broadcast = ${a}`);try{this.broadcastChannel&&a&&this.broadcastChannel.postMessage({event:e,session:t});const o=[],s=Array.from(this.stateChangeEmitters.values()).map(async i=>{try{await i.callback(e,t)}catch(l){o.push(l)}});if(await Promise.all(s),o.length>0){for(let i=0;i<o.length;i+=1)console.error(o[i]);throw o[0]}}finally{this._debug(n,"end")}}async _saveSession(e){this._debug("#_saveSession()",e),this.suppressGetSessionWarning=!0,await P(this.storage,`${this.storageKey}-code-verifier`);const t=Object.assign({},e),a=t.user&&t.user.__isUserNotAvailableProxy===!0;if(this.userStorage){!a&&t.user&&await ne(this.userStorage,this.storageKey+"-user",{user:t.user});const n=Object.assign({},t);delete n.user;const o=pt(n);await ne(this.storage,this.storageKey,o)}else{const n=pt(t);await ne(this.storage,this.storageKey,n)}}async _removeSession(){this._debug("#_removeSession()"),this.suppressGetSessionWarning=!1,await P(this.storage,this.storageKey),await P(this.storage,this.storageKey+"-code-verifier"),await P(this.storage,this.storageKey+"-user"),this.userStorage&&await P(this.userStorage,this.storageKey+"-user"),await this._notifyAllSubscribers("SIGNED_OUT",null)}_removeVisibilityChangedCallback(){this._debug("#_removeVisibilityChangedCallback()");const e=this.visibilityChangedCallback;this.visibilityChangedCallback=null;try{e&&x()&&(window!=null&&window.removeEventListener)&&window.removeEventListener("visibilitychange",e)}catch(t){console.error("removing visibilitychange callback failed",t)}}async _startAutoRefresh(){await this._stopAutoRefresh(),this._debug("#_startAutoRefresh()");const e=setInterval(()=>this._autoRefreshTokenTick(),ae);this.autoRefreshTicker=e,e&&typeof e=="object"&&typeof e.unref=="function"?e.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(e);const t=setTimeout(async()=>{await this.initializePromise,await this._autoRefreshTokenTick()},0);this.autoRefreshTickTimeout=t,t&&typeof t=="object"&&typeof t.unref=="function"?t.unref():typeof Deno<"u"&&typeof Deno.unrefTimer=="function"&&Deno.unrefTimer(t)}async _stopAutoRefresh(){this._debug("#_stopAutoRefresh()");const e=this.autoRefreshTicker;this.autoRefreshTicker=null,e&&clearInterval(e);const t=this.autoRefreshTickTimeout;this.autoRefreshTickTimeout=null,t&&clearTimeout(t)}async startAutoRefresh(){this._removeVisibilityChangedCallback(),await this._startAutoRefresh()}async stopAutoRefresh(){this._removeVisibilityChangedCallback(),await this._stopAutoRefresh()}async _autoRefreshTokenTick(){this._debug("#_autoRefreshTokenTick()","begin");try{await this._acquireLock(0,async()=>{try{const e=Date.now();try{return await this._useSession(async t=>{const{data:{session:a}}=t;if(!a||!a.refresh_token||!a.expires_at){this._debug("#_autoRefreshTokenTick()","no session");return}const n=Math.floor((a.expires_at*1e3-e)/ae);this._debug("#_autoRefreshTokenTick()",`access token expires in ${n} ticks, a tick lasts ${ae}ms, refresh threshold is ${ze} ticks`),n<=ze&&await this._callRefreshToken(a.refresh_token)})}catch(t){console.error("Auto refresh tick failed with error. This is likely a transient error.",t)}}finally{this._debug("#_autoRefreshTokenTick()","end")}})}catch(e){if(e.isAcquireTimeout||e instanceof Lt)this._debug("auto refresh token tick lock not available");else throw e}}async _handleVisibilityChange(){if(this._debug("#_handleVisibilityChange()"),!x()||!(window!=null&&window.addEventListener))return this.autoRefreshToken&&this.startAutoRefresh(),!1;try{this.visibilityChangedCallback=async()=>{try{await this._onVisibilityChanged(!1)}catch(e){this._debug("#visibilityChangedCallback","error",e)}},window==null||window.addEventListener("visibilitychange",this.visibilityChangedCallback),await this._onVisibilityChanged(!0)}catch(e){console.error("_handleVisibilityChange",e)}}async _onVisibilityChanged(e){const t=`#_onVisibilityChanged(${e})`;this._debug(t,"visibilityState",document.visibilityState),document.visibilityState==="visible"?(this.autoRefreshToken&&this._startAutoRefresh(),e||(await this.initializePromise,await this._acquireLock(this.lockAcquireTimeout,async()=>{if(document.visibilityState!=="visible"){this._debug(t,"acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");return}await this._recoverAndRefresh()}))):document.visibilityState==="hidden"&&this.autoRefreshToken&&this._stopAutoRefresh()}async _getUrlForProvider(e,t,a){const n=[`provider=${encodeURIComponent(t)}`];if(a!=null&&a.redirectTo&&n.push(`redirect_to=${encodeURIComponent(a.redirectTo)}`),a!=null&&a.scopes&&n.push(`scopes=${encodeURIComponent(a.scopes)}`),this.flowType==="pkce"){const[o,s]=await Q(this.storage,this.storageKey),i=new URLSearchParams({code_challenge:`${encodeURIComponent(o)}`,code_challenge_method:`${encodeURIComponent(s)}`});n.push(i.toString())}if(a!=null&&a.queryParams){const o=new URLSearchParams(a.queryParams);n.push(o.toString())}return a!=null&&a.skipBrowserRedirect&&n.push(`skip_http_redirect=${a.skipBrowserRedirect}`),`${e}?${n.join("&")}`}async _unenroll(e){try{return await this._useSession(async t=>{var a;const{data:n,error:o}=t;return o?this._returnResult({data:null,error:o}):await k(this.fetch,"DELETE",`${this.url}/factors/${e.factorId}`,{headers:this.headers,jwt:(a=n==null?void 0:n.session)===null||a===void 0?void 0:a.access_token})})}catch(t){if(v(t))return this._returnResult({data:null,error:t});throw t}}async _enroll(e){try{return await this._useSession(async t=>{var a,n;const{data:o,error:s}=t;if(s)return this._returnResult({data:null,error:s});const i=Object.assign({friendly_name:e.friendlyName,factor_type:e.factorType},e.factorType==="phone"?{phone:e.phone}:e.factorType==="totp"?{issuer:e.issuer}:{}),{data:l,error:u}=await k(this.fetch,"POST",`${this.url}/factors`,{body:i,headers:this.headers,jwt:(a=o==null?void 0:o.session)===null||a===void 0?void 0:a.access_token});return u?this._returnResult({data:null,error:u}):(e.factorType==="totp"&&l.type==="totp"&&(!((n=l==null?void 0:l.totp)===null||n===void 0)&&n.qr_code)&&(l.totp.qr_code=`data:image/svg+xml;utf-8,${l.totp.qr_code}`),this._returnResult({data:l,error:null}))})}catch(t){if(v(t))return this._returnResult({data:null,error:t});throw t}}async _verify(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async t=>{var a;const{data:n,error:o}=t;if(o)return this._returnResult({data:null,error:o});const s=Object.assign({challenge_id:e.challengeId},"webauthn"in e?{webauthn:Object.assign(Object.assign({},e.webauthn),{credential_response:e.webauthn.type==="create"?Ha(e.webauthn.credential_response):Ya(e.webauthn.credential_response)})}:{code:e.code}),{data:i,error:l}=await k(this.fetch,"POST",`${this.url}/factors/${e.factorId}/verify`,{body:s,headers:this.headers,jwt:(a=n==null?void 0:n.session)===null||a===void 0?void 0:a.access_token});return l?this._returnResult({data:null,error:l}):(await this._saveSession(Object.assign({expires_at:Math.round(Date.now()/1e3)+i.expires_in},i)),await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED",i),this._returnResult({data:i,error:l}))})}catch(t){if(v(t))return this._returnResult({data:null,error:t});throw t}})}async _challenge(e){return this._acquireLock(this.lockAcquireTimeout,async()=>{try{return await this._useSession(async t=>{var a;const{data:n,error:o}=t;if(o)return this._returnResult({data:null,error:o});const s=await k(this.fetch,"POST",`${this.url}/factors/${e.factorId}/challenge`,{body:e,headers:this.headers,jwt:(a=n==null?void 0:n.session)===null||a===void 0?void 0:a.access_token});if(s.error)return s;const{data:i}=s;if(i.type!=="webauthn")return{data:i,error:null};switch(i.webauthn.type){case"create":return{data:Object.assign(Object.assign({},i),{webauthn:Object.assign(Object.assign({},i.webauthn),{credential_options:Object.assign(Object.assign({},i.webauthn.credential_options),{publicKey:Wa(i.webauthn.credential_options.publicKey)})})}),error:null};case"request":return{data:Object.assign(Object.assign({},i),{webauthn:Object.assign(Object.assign({},i.webauthn),{credential_options:Object.assign(Object.assign({},i.webauthn.credential_options),{publicKey:Ua(i.webauthn.credential_options.publicKey)})})}),error:null}}})}catch(t){if(v(t))return this._returnResult({data:null,error:t});throw t}})}async _challengeAndVerify(e){const{data:t,error:a}=await this._challenge({factorId:e.factorId});return a?this._returnResult({data:null,error:a}):await this._verify({factorId:e.factorId,challengeId:t.id,code:e.code})}async _listFactors(){var e;const{data:{user:t},error:a}=await this.getUser();if(a)return{data:null,error:a};const n={all:[],phone:[],totp:[],webauthn:[]};for(const o of(e=t==null?void 0:t.factors)!==null&&e!==void 0?e:[])n.all.push(o),o.status==="verified"&&n[o.factor_type].push(o);return{data:n,error:null}}async _getAuthenticatorAssuranceLevel(e){var t,a,n,o;if(e)try{const{payload:h}=Ae(e);let m=null;h.aal&&(m=h.aal);let f=m;const{data:{user:g},error:w}=await this.getUser(e);if(w)return this._returnResult({data:null,error:w});((a=(t=g==null?void 0:g.factors)===null||t===void 0?void 0:t.filter(_=>_.status==="verified"))!==null&&a!==void 0?a:[]).length>0&&(f="aal2");const p=h.amr||[];return{data:{currentLevel:m,nextLevel:f,currentAuthenticationMethods:p},error:null}}catch(h){if(v(h))return this._returnResult({data:null,error:h});throw h}const{data:{session:s},error:i}=await this.getSession();if(i)return this._returnResult({data:null,error:i});if(!s)return{data:{currentLevel:null,nextLevel:null,currentAuthenticationMethods:[]},error:null};const{payload:l}=Ae(s.access_token);let u=null;l.aal&&(u=l.aal);let c=u;((o=(n=s.user.factors)===null||n===void 0?void 0:n.filter(h=>h.status==="verified"))!==null&&o!==void 0?o:[]).length>0&&(c="aal2");const d=l.amr||[];return{data:{currentLevel:u,nextLevel:c,currentAuthenticationMethods:d},error:null}}async _getAuthorizationDetails(e){try{return await this._useSession(async t=>{const{data:{session:a},error:n}=t;return n?this._returnResult({data:null,error:n}):a?await k(this.fetch,"GET",`${this.url}/oauth/authorizations/${e}`,{headers:this.headers,jwt:a.access_token,xform:o=>({data:o,error:null})}):this._returnResult({data:null,error:new O})})}catch(t){if(v(t))return this._returnResult({data:null,error:t});throw t}}async _approveAuthorization(e,t){try{return await this._useSession(async a=>{const{data:{session:n},error:o}=a;if(o)return this._returnResult({data:null,error:o});if(!n)return this._returnResult({data:null,error:new O});const s=await k(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:n.access_token,body:{action:"approve"},xform:i=>({data:i,error:null})});return s.data&&s.data.redirect_url&&x()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(s.data.redirect_url),s})}catch(a){if(v(a))return this._returnResult({data:null,error:a});throw a}}async _denyAuthorization(e,t){try{return await this._useSession(async a=>{const{data:{session:n},error:o}=a;if(o)return this._returnResult({data:null,error:o});if(!n)return this._returnResult({data:null,error:new O});const s=await k(this.fetch,"POST",`${this.url}/oauth/authorizations/${e}/consent`,{headers:this.headers,jwt:n.access_token,body:{action:"deny"},xform:i=>({data:i,error:null})});return s.data&&s.data.redirect_url&&x()&&!(t!=null&&t.skipBrowserRedirect)&&window.location.assign(s.data.redirect_url),s})}catch(a){if(v(a))return this._returnResult({data:null,error:a});throw a}}async _listOAuthGrants(){try{return await this._useSession(async e=>{const{data:{session:t},error:a}=e;return a?this._returnResult({data:null,error:a}):t?await k(this.fetch,"GET",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:t.access_token,xform:n=>({data:n,error:null})}):this._returnResult({data:null,error:new O})})}catch(e){if(v(e))return this._returnResult({data:null,error:e});throw e}}async _revokeOAuthGrant(e){try{return await this._useSession(async t=>{const{data:{session:a},error:n}=t;return n?this._returnResult({data:null,error:n}):a?(await k(this.fetch,"DELETE",`${this.url}/user/oauth/grants`,{headers:this.headers,jwt:a.access_token,query:{client_id:e.clientId},noResolveJson:!0}),{data:{},error:null}):this._returnResult({data:null,error:new O})})}catch(t){if(v(t))return this._returnResult({data:null,error:t});throw t}}async fetchJwk(e,t={keys:[]}){let a=t.keys.find(i=>i.kid===e);if(a)return a;const n=Date.now();if(a=this.jwks.keys.find(i=>i.kid===e),a&&this.jwks_cached_at+Qr>n)return a;const{data:o,error:s}=await k(this.fetch,"GET",`${this.url}/.well-known/jwks.json`,{headers:this.headers});if(s)throw s;return!o.keys||o.keys.length===0||(this.jwks=o,this.jwks_cached_at=n,a=o.keys.find(i=>i.kid===e),!a)?null:a}async getClaims(e,t={}){try{let a=e;if(!a){const{data:h,error:m}=await this.getSession();if(m||!h.session)return this._returnResult({data:null,error:m});a=h.session.access_token}const{header:n,payload:o,signature:s,raw:{header:i,payload:l}}=Ae(a);t!=null&&t.allowExpired||ba(o.exp);const u=!n.alg||n.alg.startsWith("HS")||!n.kid||!("crypto"in globalThis&&"subtle"in globalThis.crypto)?null:await this.fetchJwk(n.kid,t!=null&&t.keys?{keys:t.keys}:t==null?void 0:t.jwks);if(!u){const{error:h}=await this.getUser(a);if(h)throw h;return{data:{claims:o,header:n,signature:s},error:null}}const c=ka(n.alg),y=await crypto.subtle.importKey("jwk",u,c,!0,["verify"]);if(!await crypto.subtle.verify(c,y,s,ia(`${i}.${l}`)))throw new Qe("Invalid JWT signature");return{data:{claims:o,header:n,signature:s},error:null}}catch(a){if(v(a))return this._returnResult({data:null,error:a});throw a}}}pe.nextInstanceID={};const Xa=pe,en="2.95.3";let ue="";typeof Deno<"u"?ue="deno":typeof document<"u"?ue="web":typeof navigator<"u"&&navigator.product==="ReactNative"?ue="react-native":ue="node";const tn={"X-Client-Info":`supabase-js-${ue}/${en}`},rn={headers:tn},an={schema:"public"},nn={autoRefreshToken:!0,persistSession:!0,detectSessionInUrl:!0,flowType:"implicit"},on={};function we(r){"@babel/helpers - typeof";return we=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},we(r)}function sn(r,e){if(we(r)!="object"||!r)return r;var t=r[Symbol.toPrimitive];if(t!==void 0){var a=t.call(r,e);if(we(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(r)}function ln(r){var e=sn(r,"string");return we(e)=="symbol"?e:e+""}function un(r,e,t){return(e=ln(e))in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function St(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(r);e&&(a=a.filter(function(n){return Object.getOwnPropertyDescriptor(r,n).enumerable})),t.push.apply(t,a)}return t}function A(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?St(Object(t),!0).forEach(function(a){un(r,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):St(Object(t)).forEach(function(a){Object.defineProperty(r,a,Object.getOwnPropertyDescriptor(t,a))})}return r}const cn=r=>r?(...e)=>r(...e):(...e)=>fetch(...e),hn=()=>Headers,dn=(r,e,t)=>{const a=cn(t),n=hn();return async(o,s)=>{var i;const l=(i=await e())!==null&&i!==void 0?i:r;let u=new n(s==null?void 0:s.headers);return u.has("apikey")||u.set("apikey",r),u.has("Authorization")||u.set("Authorization",`Bearer ${l}`),a(o,A(A({},s),{},{headers:u}))}};function yn(r){return r.endsWith("/")?r:r+"/"}function mn(r,e){var t,a;const{db:n,auth:o,realtime:s,global:i}=r,{db:l,auth:u,realtime:c,global:y}=e,d={db:A(A({},l),n),auth:A(A({},u),o),realtime:A(A({},c),s),storage:{},global:A(A(A({},y),i),{},{headers:A(A({},(t=y==null?void 0:y.headers)!==null&&t!==void 0?t:{}),(a=i==null?void 0:i.headers)!==null&&a!==void 0?a:{})}),accessToken:async()=>""};return r.accessToken?d.accessToken=r.accessToken:delete d.accessToken,d}function fn(r){const e=r==null?void 0:r.trim();if(!e)throw new Error("supabaseUrl is required.");if(!e.match(/^https?:\/\//i))throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");try{return new URL(yn(e))}catch{throw Error("Invalid supabaseUrl: Provided URL is malformed.")}}var gn=class extends Xa{constructor(r){super(r)}},pn=class{constructor(r,e,t){var a,n;this.supabaseUrl=r,this.supabaseKey=e;const o=fn(r);if(!e)throw new Error("supabaseKey is required.");this.realtimeUrl=new URL("realtime/v1",o),this.realtimeUrl.protocol=this.realtimeUrl.protocol.replace("http","ws"),this.authUrl=new URL("auth/v1",o),this.storageUrl=new URL("storage/v1",o),this.functionsUrl=new URL("functions/v1",o);const s=`sb-${o.hostname.split(".")[0]}-auth-token`,i={db:an,realtime:on,auth:A(A({},nn),{},{storageKey:s}),global:rn},l=mn(t??{},i);if(this.storageKey=(a=l.auth.storageKey)!==null&&a!==void 0?a:"",this.headers=(n=l.global.headers)!==null&&n!==void 0?n:{},l.accessToken)this.accessToken=l.accessToken,this.auth=new Proxy({},{get:(c,y)=>{throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(y)} is not possible`)}});else{var u;this.auth=this._initSupabaseAuthClient((u=l.auth)!==null&&u!==void 0?u:{},this.headers,l.global.fetch)}this.fetch=dn(e,this._getAccessToken.bind(this),l.global.fetch),this.realtime=this._initRealtimeClient(A({headers:this.headers,accessToken:this._getAccessToken.bind(this)},l.realtime)),this.accessToken&&Promise.resolve(this.accessToken()).then(c=>this.realtime.setAuth(c)).catch(c=>console.warn("Failed to set initial Realtime auth token:",c)),this.rest=new er(new URL("rest/v1",o).href,{headers:this.headers,schema:l.db.schema,fetch:this.fetch,timeout:l.db.timeout,urlLengthLimit:l.db.urlLengthLimit}),this.storage=new Kr(this.storageUrl.href,this.headers,this.fetch,t==null?void 0:t.storage),l.accessToken||this._listenForAuthEvents()}get functions(){return new Gt(this.functionsUrl.href,{headers:this.headers,customFetch:this.fetch})}from(r){return this.rest.from(r)}schema(r){return this.rest.schema(r)}rpc(r,e={},t={head:!1,get:!1,count:void 0}){return this.rest.rpc(r,e,t)}channel(r,e={config:{}}){return this.realtime.channel(r,e)}getChannels(){return this.realtime.getChannels()}removeChannel(r){return this.realtime.removeChannel(r)}removeAllChannels(){return this.realtime.removeAllChannels()}async _getAccessToken(){var r=this,e,t;if(r.accessToken)return await r.accessToken();const{data:a}=await r.auth.getSession();return(e=(t=a.session)===null||t===void 0?void 0:t.access_token)!==null&&e!==void 0?e:r.supabaseKey}_initSupabaseAuthClient({autoRefreshToken:r,persistSession:e,detectSessionInUrl:t,storage:a,userStorage:n,storageKey:o,flowType:s,lock:i,debug:l,throwOnError:u},c,y){const d={Authorization:`Bearer ${this.supabaseKey}`,apikey:`${this.supabaseKey}`};return new gn({url:this.authUrl.href,headers:A(A({},d),c),storageKey:o,autoRefreshToken:r,persistSession:e,detectSessionInUrl:t,storage:a,userStorage:n,flowType:s,lock:i,debug:l,throwOnError:u,fetch:y,hasCustomAuthorizationHeader:Object.keys(this.headers).some(h=>h.toLowerCase()==="authorization")})}_initRealtimeClient(r){return new pr(this.realtimeUrl.href,A(A({},r),{},{params:A(A({},{apikey:this.supabaseKey}),r==null?void 0:r.params)}))}_listenForAuthEvents(){return this.auth.onAuthStateChange((r,e)=>{this._handleTokenChanged(r,"CLIENT",e==null?void 0:e.access_token)})}_handleTokenChanged(r,e,t){(r==="TOKEN_REFRESHED"||r==="SIGNED_IN")&&this.changedAccessToken!==t?(this.changedAccessToken=t,this.realtime.setAuth(t)):r==="SIGNED_OUT"&&(this.realtime.setAuth(),e=="STORAGE"&&this.auth.signOut(),this.changedAccessToken=void 0)}};const wn=(r,e,t)=>new pn(r,e,t);function vn(){if(typeof window<"u")return!1;const r=globalThis.process;if(!r)return!1;const e=r.version;if(e==null)return!1;const t=e.match(/^v(\d+)\./);return t?parseInt(t[1],10)<=18:!1}vn()&&console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");const bn="https://mpmquhofbijzxezqegrc.supabase.co",kn="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wbXF1aG9mYmlyanplemVncmMiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc2OTgwNzAwMiwiZXhwIjoyMDg1MzgzMDAyfQ._KsgRM485wNJkIXU39xznsKnx4ROFGV9vZxmPTiAbg8",$t=wn(bn,kn),Ue=[{id:"1",slug:"financial-independence-fire-math",title:"The Math Behind Financial Independence (FIRE): A Complete Guide",excerpt:`The "Financial Independence, Retire Early" movement isn't magic, and it's not just for tech millionaires. It is simple math. We break down the 4% Rule, Savings Rates, and exactly how to calculate your freedom number.`,date:"2026-02-10",displayDate:"February 10, 2026",readTime:"12 min read",category:"Finance",relatedToolLink:"/finance/fire",relatedToolName:"FIRE Calculator",content:`
## What is FIRE?

Financial Independence, Retire Early (FIRE) is a lifestyle movement with a simple goal: accumulate enough assets so that the passive income from those assets covers your living expenses forever.

At that point, working becomes optional. You don't have to quit, but you can.

But how do you know when you've reached that point? Is it $1 million? $5 million?

The answer lies in two key concepts: **The 4% Rule** and your **Savings Rate**.

## The Safe Withdrawal Rate (The 4% Rule)

In 1998, three professors at Trinity University published a study (often called "The Trinity Study") that looked at stock and bond returns over the last 70 years. They wanted to answer a simple question:

> How much money can you withdraw from your portfolio each year, adjusted for inflation, without running out of money for 30 years?

### The Result
They found that a portfolio of 50% stocks and 50% bonds had a **95% success rate** with a **4% withdrawal rate**.

This means if you have **$1,000,000** invested, you can withdraw **$40,000** in year one.
In year two, if inflation is 2%, you withdraw **$40,800**.
And so on.

### Calculating Your Number
Because of this rule, we can easily calculate your "FIRE Number" (the amount you need to retire).

It is simply your annual expenses divided by 0.04. Or, easier math: **Annual Expenses x 25**.

- **Spend $40,000/year?** You need $1,000,000.
- **Spend $60,000/year?** You need $1,500,000.
- **Spend $100,000/year?** You need $2,500,000.

This is why lifestyle inflation is so dangerous. Every $1,000/month you add to your lifestyle requires you to save an additional **$300,000** to sustain it!

## The Magic of Savings Rate

Most people focus on "Rate of Return". They want to beat the market. They want the 100x crypto coin.

But the most powerful variable in the FIRE equation is your **Savings Rate** (the percentage of your income you invest).

Let's assume a standard 5% real return on investments (inflation-adjusted) and starting from zero.

### The Standard Path
If you save **10%** of your income (the recommended amount):
- You need to work for **51 years** to replace your income.
- Start at 22, retire at 73.

### The Aggressive Path
If you save **30%** of your income:
- You need to work for **28 years**.
- Start at 22, retire at 50.

### The FIRE Path
If you save **50%** of your income:
- You need to work for **17 years**.
- Start at 22, retire at 39.

### The Extreme Path
If you save **70%** of your income:
- You need to work for **8.5 years**.
- Start at 22, retire at 30.

> **Key Takeaway:** Increasing your savings rate effectively does two things: it increases the amount of money you have accumulating, AND it decreases the amount of money you need to live on forever. It is a double-ended lever.

Not sure where to start with your savings rate? Our guide to [the 50/30/20 budgeting rule](/blog/50-30-20-budgeting-rule-guide) gives you a dead-simple framework to allocate your income.

## How to Increase Your Savings Rate

There are only two ways to increase the gap between income and expenses:

### 1. Earn More (Unlimited Upside)
- Negotiate a raise.
- Switch jobs (the biggest salary jumps usually come from leaving).
- Start a side hustle (check out our Freelance Rate Calculator).
- Learn high-income skills (coding, sales, etc).

### 2. Spend Less (Limited Downside)
- **Housing:** This is usually the biggest expense. Can you "house hack" (rent out a room)? Can you move to a lower cost of living area? (See our Rent vs Buy Calculator).
- **Transportation:** Cars are wealth destroyers. Buy used, keep them for 10+ years.
- **Food:** Cooking at home vs eating out is often a $500/month difference.

## The Role of Inflation

Inflation is the silent killer of early retirement. $1 million today will not buy $1 million worth of goods in 20 years.

However, the 4% rule accounts for this. It assumes you increase your withdrawal amount by inflation each year.

But during your *accumulation phase*, you need to adjust your expectation. If your target is $1M in "today's dollars", and inflation is 3%, in 10 years you actually need about $1.34M to have the same purchasing power.

Our **FIRE Calculator** has an "Inflation Adjustment" toggle that handles this math for you automatically.

## Why Do It?

It's not about "not working". Most people who reach FIRE continue to work.

But they work on what they *want* to work on.

- They start risky businesses.
- They volunteer.
- They spend time with kids.
- They create art.

FIRE is about buying back your time. It is about Freedom.

## Ready to calculate your date?

Stop guessing. Input your current savings, monthly contributions, and spending into our calculator.

[Open FIRE Calculator](/finance/fire)
`},{id:"2",slug:"emergency-fund-guide",title:"Why Your Emergency Fund Is Your Most Important Investment",excerpt:"Before you buy stocks, crypto, or real estate, you need a safety net. Here is why cash is king when life happens, and exactly how much you need to save.",date:"2026-02-08",displayDate:"February 8, 2026",readTime:"10 min read",category:"Finance",relatedToolLink:"/finance/emergency",relatedToolName:"Emergency Fund Calculator",content:`
## Murphy's Law of Finance

"Anything that can go wrong, will go wrong."

In personal finance, this usually manifests as:
- Your car breaks down the same week you get laid off.
- Your roof leaks the day after you put all your cash into a locked retirement account.
- You have a medical emergency while the stock market is down 20%.

This is why you need an **Emergency Fund**.

## What is an Emergency Fund?

It is specialized savings account dedicated *only* to unexpected, necessary expenses.

It is NOT for:
- A new TV.
- A vacation.
- investments.
- Down payment on a house.

It IS for:
- Job loss (paying rent/mortgage).
- Medical bills.
- Car repairs.
- Home repairs.

## Why "Investing" Your Emergency Fund is a Bad Idea

I hear this often: *"Why should I keep $10,000 in cash earning 0.5% (or even 4%) when I could get 10% in the S&P 500?"*

**The Correlation Problem.**

Bad things often happen together. During a recession:
1. You are most likely to lose your job.
2. The stock market is likely to crash.

If your "Emergency Fund" is in stocks, you might be forced to sell them at a 30% loss just to pay rent. That is a financial disaster.

Your emergency fund is **Insurance**, not **Investment**. Its "Return on Investment" is not 5% or 10%. Its return is that it prevents you from going into high-interest credit card debt (25% APR) or selling assets at the bottom.

## How Much Do You Need?

The standard advice is **3 to 6 months of expenses**.

But where do you fall on that spectrum?

### Lean Emergency Fund (3 Months)
You can aim for the lower end if:
- You are single (no dependents).
- You rent (no surprise roof repairs).
- You have a stable job with high demand (e.g., nurse, government).
- You have low insurance deductibles.

### Fat Emergency Fund (6+ Months)
You should aim for the higher end if:
- You have children or a non-working spouse.
- You own an older home.
- You are self-employed or have variable income (freelancer).
- You work in a volatile industry (tech startups, sales).
- You have health issues.

## What Counts as "Expenses"?

When calculating your fund, use your **Survival Budget**, not your current spending.

If you lost your job tomorrow, you would probably cut:
- Netflix/Spotify.
- Dining out.
- Vacation savings.
- New clothes.

You would keep:
- Rent/Mortgage.
- Utilities.
- Insurance.
- Groceries.
- Gas.
- Debt minimum payments.

Our **Emergency Fund Calculator** allows you to input these specific categories to see your tailored number.

## Where to Keep It?

**Do not** put it in your checking account. You will accidentally spend it.

**Do not** put it in the stock market (see above).

**Do:** Put it in a **High-Yield Savings Account (HYSA)**.
- It is separate from your daily money (mental barrier).
- It is FDIC insured (zero risk).
- It earns decent interest (currently 4-5%), which helps fight inflation.
- It is liquid (you can get the money in 1-2 days).

## The Psychological Benefit

This is the most underrated part. having 6 months of expenses in the bank changes how you walk into work.

- You happen to negotiation harder? You aren't desperate.
- Your boss creates a toxic environment? You can quit.
- A global pandemic shuts down the economy? You don't panic.

Money is freedom. The Emergency Fund is the foundation of that freedom.

## Action Plan

1. **Calculate your number:** Use our tool to find your monthly survival number.
2. **Start small:** Aim for $1,000 first. This covers most car repairs.
3. **Automate:** Set up a $100/mo auto-transfer to your HYSA.
4. **Don't touch it:** Unless it's a real emergency.

Once your emergency fund is covered, use the [50/30/20 budgeting rule](/blog/50-30-20-budgeting-rule-guide) to keep your savings on autopilot.

[Calculate Your Emergency Fund](/finance/emergency)
`},{id:"3",slug:"sleep-productivity-science",title:"Sleep vs. Productivity: The Hidden Link to Performance",excerpt:'Think you can "hustle" on 4 hours of sleep? Science says you are functioning like you are drunk. Here is how to optimize your sleep cycles for peak cognitive output.',date:"2026-02-06",displayDate:"February 6, 2026",readTime:"9 min read",category:"Health",relatedToolLink:"/health/sleep",relatedToolName:"Sleep Cycle Calculator",content:`
## The "Hustle Culture" Lie

We have all heard it. *"I'll sleep when I'm dead."* *"The early bird gets the worm."*

Elon Musk famously slept on the factory floor. But what works for the 0.0001% often destroys the rest of us.

The science is clear: **Sleep is not downtime. It is active processing.**

## What Happens When You Sleep?

Your brain isn't just "off". It is doing critical maintenance:
1. **Memory Consolidation:** Moving short-term memories (what you learned today) to long-term storage.
2. **Toxin Clearing:** The "Glymphatic System" opens up and flushes out metabolic waste products (like beta-amyloid, linked to Alzheimer's) that build up during the day.
3. **Emotional Regulation:** Resetting the amygdala (fear center) so you don't snap at your coworker tomorrow.

## The Cost of Sleep Deprivation

Walker, author of *Why We Sleep*, calls sleep deprivation the "slow motion suicide."

If you sleep **6 hours a night** for two weeks, your cognitive performance drops to the same level as someone who has been awake for **24 hours straight**. You are legally drunk, cognitively speaking.

But the scary part? **You don't feel it.** You lose the ability to judge your own impairment. You think you are "fine", but your reaction times, logical reasoning, and creativity have all tanked.

## Understanding Sleep Cycles

Sleep isn't a solid block. It happens in 90-minute waves called **Ultradian Rhythms**.

### The 4 Stages
1. **NREM 1 (Light sleep):** Transition.
2. **NREM 2 (Light sleep):** Body temp drops, heart rate slows.
3. **NREM 3 (Deep sleep):** Physical repair. Growth hormone released. Muscle recovery.
4. **REM (Dreaming):** Cognitive repair. Creativity. Problem solving.

A full cycle takes about **90 minutes**.

### The "Wake Up Groggy" Problem
If your alarm goes off in the middle of Stage 3 (Deep Sleep), you wake up with "Sleep Inertia." You feel heavy, confused, and tired, even if you slept 8 hours.

If you wake up at the end of a cycle (Light Sleep), you wake up feeling refreshed, even if you slept less.

This is the math behind our **Sleep Cycle Calculator**. It targets those 90-minute windows.

## Sleep Hygiene: How to Optimize

It's not just about quantity (hours), it's about quality.

### 1. Light Control (Circadian Rhythm)
- **Morning:** Get bright sunlight in your eyes within 30 mins of waking. This sets your cortisol anchor and starts the timer for melatonin release 12-14 hours later.
- **Evening:** Avoid blue light (screens) 2 hours before bed. Blue light suppresses melatonin.

### 2. Temperature
- Your core body temperature needs to drop by about 2-3°F to initiate sleep.
- Keep your room cool (65-68°F / 18-20°C).
- Take a warm shower before bed (the rebound cooling effect helps).

### 3. Caffeine Timing
- Caffeine has a "half-life" of 5-6 hours.
- If you drink a coffee at 4 PM, 50% of it is still in your system at 10 PM.
- Stop caffeine 10 hours before bed.

### 4. Consistency
- Go to bed and wake up at the same time, *even on weekends*.
- "Social Jetlag" (sleeping in on Saturday) confuses your biological clock.

## The ROI of Sleep

If you are a knowledge worker, your asset is your brain.

Sleeping 8 hours instead of 6 might "cost" you 2 hours of work time. But if your efficiency, creativity, and decision-making double, you come out ahead.

Don't calculate how little sleep you can survive on. Calculate how much you need to thrive.

[Find Your Optimal Wake Time](/health/sleep)
`},{id:"4",slug:"hidden-costs-buying-home-2026",title:"The Hidden Costs of Buying a Home in 2026: It is Not Just the Mortgage",excerpt:'Thinking of buying a house? The mortgage payment is just the tip of the iceberg. We break down the "unrecoverable costs" of homeownership including PMI, taxes, and maintenance that most calculators hide.',date:"2026-02-12",displayDate:"February 12, 2026",readTime:"11 min read",category:"Finance",relatedToolLink:"/finance/mortgage",relatedToolName:"Mortgage Calculator",content:`
## The "Rent is Throwing Money Away" Myth

We have all heard it: *"Why pay your landlord's mortgage when you could be building equity?"*

It sounds logical. But it is mathematically flawed.

When you buy a home, you aren't just paying for the home. You are paying for:
1.  **Interest** (Rent you pay to the bank).
2.  **Property Taxes** (Rent you pay to the government).
3.  **Insurance** (Rent you pay to the insurance company).
4.  **Maintenance** (Rent you pay to the hardware store).
5.  **HOA Fees** (Rent you pay to your neighbors).

These are **Unrecoverable Costs**. You never get this money back. It does not build equity. It is gone, just like rent.

## The 5% Rule

A good rule of thumb is that unrecoverable costs total about **5% of the home's value per year**.

-   **Interest:** ~3-4% (mix of debt/equity cost).
-   **Property Tax:** ~1-2%.
-   **Maintenance:** ~1%.

If you buy a **$500,000** home, your unrecoverable costs are roughly **$25,000/year** ($2,083/month).

If you can rent a similar home for **$2,000/month**, renting is actually *cheaper* than owning, even before we talk about the down payment opportunity cost.

## The Silent Wealth Killer: PMI

Private Mortgage Insurance (PMI) is a fee charged to borrowers who put down less than 20%.

It protects the *lender*, not you.

If you put 5% down on that $500,000 home, you might pay **0.5% to 1%** in PMI annually. That is **$2,500 - $5,000** a year thrown into the furnace.

Our upgraded **Mortgage Calculator** includes a specific field for PMI so you can see exactly how much this "junk fee" is costing you monthly.

## Property Taxes: The Forever Bill

You can pay off your mortgage. You can never pay off the government.

In states like Texas or New Jersey, property taxes can be **2.0% - 2.5%** of your home's value.

On a $500,000 home, that is **$10,000 - $12,500 per year** forever. And it goes up every time your home value increases.

## Determining True Affordability

Don't just look at the Principal & Interest. That number is a fantasy.

You need to calculate **PITI**:
-   **P**rincipal
-   **I**nterest
-   **T**axes
-   **I**nsurance

And then add **M** (Maintenance).

### The 1% Maintenance Rule
Expect to spend **1% of your home's value** every year on maintenance. Roofs leak. Water heaters explode. AC units die.

If you aren't saving $400/month for repairs on your $500k house, you aren't saving enough.

## Run the Numbers

Don't rely on Zillow's "estimated payment" (which often excludes taxes/insurance/PMI).

Use our advanced calculator to see the *real* cost of your dream home.

[Calculate True Mortgage Cost](/finance/mortgage)
`},{id:"5",slug:"compound-interest-inflation-monster",title:"Compound Interest vs. The Inflation Monster: How to Keep Your Wealth",excerpt:'Inflation is the "Silent Killer" of wealth. If you are keeping cash in a savings account, you are losing money every single day. Here is the math behind Real Return and how to beat it.',date:"2026-02-14",displayDate:"February 14, 2026",readTime:"8 min read",category:"Finance",relatedToolLink:"/finance/investment",relatedToolName:"Investment Calculator",content:`
## The $100 Hamburger

Imagine it is 1990. You have **$100**. You can buy about **40 Big Macs**.

Imagine it is 2026. You have that same **$100**. You can buy... maybe **12 Big Macs**.

You didn't "lose" money. You still have a $100 bill. But you lost **Purchasing Power**.

This is inflation. And it is eating your savings alive.

## Nominal vs. Real Return

This is the most important concept in investing.

-   **Nominal Return:** The number on the screen. (e.g., "My stock went up 8%!")
-   **Real Return:** The number after inflation.

If your savings account pays **5% interest**, but inflation is **3%**, your *Real Return* is only **2%**.

If your savings account pays **0.5%** (hello, big banks) and inflation is **3%**, your Real Return is **-2.5%**.

**You are safely losing money.**

## The Rule of 72

The Rule of 72 is a mental math shortcut to estimate how long it takes for an investment to double.

**Formula: 72 / Interest Rate = Years to Double**

-   At **2%** return: 72 / 2 = **36 Years** to double.
-   At **7%** return: 72 / 7 = **10.2 Years** to double.
-   At **10%** return: 72 / 10 = **7.2 Years** to double.

### The Reverse Rule of 72 (Inflation)
It works for debt and inflation too.

If inflation is **4%**, your money loses *half* its value in **18 years** (72 / 4).

## How to Beat the Monster

You cannot beat inflation with a savings account. You need assets that appreciate or pay dividends.

1.  **Stocks (Equities):** Historically return 7-10% (Nominal) or 5-7% (Real).
2.  **Real Estate:** Generally keeps pace with inflation + cash flow.
3.  **Treasury TIPS:** Government bonds explicitly linked to inflation.

## Visualizing the Impact

We built an **Investment Calculator** that doesn't just show you the big "Nominal" number (which looks impressive but is misleading).

It has a **"Real Value"** toggle.

Turn it on, and you will see what that future million dollars is actually worth in *today's buying power*.

It is often shocking. But it is better to be shocked now than when you retire.

[Check Your Real Returns](/finance/investment)
`},{id:"6",slug:"bmi-what-your-number-really-means",title:"BMI in 2026: What Your Number Actually Means (and What It Doesn't)",excerpt:`Your BMI says you're "overweight" but you can deadlift 400 lbs? Here's why BMI is useful for populations but flawed for individuals, and what to use instead.`,date:"2026-02-12",displayDate:"February 12, 2026",readTime:"8 min read",category:"Health",relatedToolLink:"/health/bmi",relatedToolName:"BMI Calculator",content:`
## The Most Misunderstood Number in Health

Body Mass Index (BMI) is everywhere. Doctors use it. Insurance companies use it. The internet loves to argue about it.

But what is it actually measuring? And more importantly, what is it **not** measuring?

## The Formula

BMI is dead simple:

> **BMI = Weight (kg) / Height (m)²**

Or in freedom units: **BMI = (Weight (lbs) × 703) / Height (inches)²**

A Belgian mathematician named Adolphe Quetelet invented it in the **1830s**. Not a doctor. A *mathematician*. He was studying population statistics, not diagnosing individuals.

This is the first clue that something is off.

## The Categories

The World Health Organization defines these ranges:

| BMI | Category |
|---|---|
| < 18.5 | Underweight |
| 18.5 - 24.9 | Normal weight |
| 25.0 - 29.9 | Overweight |
| 30.0+ | Obese |

These categories were set in 1998. Before that, the "overweight" threshold was 27.8 for men and 27.3 for women. Overnight, millions of Americans went from "normal" to "overweight" without gaining a single pound.

## Where BMI Works

BMI is a **screening tool**. It is cheap, fast, and requires no equipment beyond a scale and a tape measure.

For **populations**, it is surprisingly effective. Studies consistently show that populations with higher average BMIs have higher rates of:
- Type 2 diabetes
- Cardiovascular disease
- Certain cancers
- All-cause mortality

If you are a public health researcher tracking trends across millions of people, BMI is genuinely useful.

## Where BMI Fails

For **individuals**, BMI has serious blind spots:

### 1. It Ignores Body Composition
BMI cannot distinguish between muscle and fat. A 6'0", 220 lb bodybuilder at 10% body fat has the same BMI (29.8 — "overweight") as a 6'0", 220 lb sedentary person at 35% body fat.

Dwayne "The Rock" Johnson has a BMI of ~34. He is technically "obese."

### 2. It Ignores Fat Distribution
Visceral fat (around your organs) is far more dangerous than subcutaneous fat (under your skin). Two people with identical BMIs can have wildly different health risks based on *where* they carry their weight.

Waist-to-hip ratio is a much better predictor of cardiovascular disease than BMI.

### 3. It Varies by Ethnicity
The standard BMI categories were developed primarily using data from white European populations. Research shows that:
- South Asian populations tend to develop metabolic issues at *lower* BMIs.
- Some Pacific Islander populations maintain good metabolic health at *higher* BMIs.

## Better Alternatives

If you want a more complete picture, combine BMI with:

1. **Waist Circumference:** Men > 40 inches and Women > 35 inches correlates strongly with metabolic syndrome.
2. **Body Fat Percentage:** DEXA scans, calipers, or even smart scales give a rough estimate.
3. **Blood Work:** Fasting glucose, triglycerides, and HDL cholesterol tell you what is actually happening inside.

## So Should You Ignore BMI?

No. But use it as one data point in a larger picture.

If your BMI is 32 and you don't exercise, that is a meaningful signal. If your BMI is 27 and you strength train 4x a week with good blood markers, it is probably noise.

**Know your number. But don't let it define you.**

[Check Your BMI](/health/bmi)
`},{id:"7",slug:"calories-in-calories-out-guide",title:"Calories In vs Calories Out: The Only Weight Loss Equation That Works",excerpt:"Forget keto, carnivore, and juice cleanses. Every diet that has ever worked follows one rule: energy balance. Here's the science of TDEE, macros, and why protein is king.",date:"2026-02-11",displayDate:"February 11, 2026",readTime:"10 min read",category:"Health",relatedToolLink:"/health/calories",relatedToolName:"Calorie Calculator",content:`
## The One Rule

Every diet that has ever worked — keto, paleo, vegan, intermittent fasting, Weight Watchers — works because of **one thing**:

> **You consumed fewer calories than you burned.**

That's it. There is no metabolic magic. No "fat-burning foods." No "starvation mode" that makes you gain weight by eating less. (That isn't a thing.)

This is the **First Law of Thermodynamics** applied to biology. Energy cannot be created or destroyed. If you consume less energy than your body needs, the deficit comes from stored energy (body fat).

## Understanding TDEE

Your **Total Daily Energy Expenditure (TDEE)** is the total number of calories your body burns in a day. It has four components:

### 1. BMR (Basal Metabolic Rate) — 60-70%
The calories your body burns just being alive. Breathing, pumping blood, maintaining body temperature. Even in a coma, your body burns this much.

### 2. NEAT (Non-Exercise Activity Thermogenesis) — 15-25%
Everything that isn't "exercise." Walking to the fridge. Fidgeting. Standing up. Taking the stairs.

This is the **most variable** component and the one most people underestimate. An office worker might burn 200 NEAT calories. A construction worker might burn 1,500.

### 3. TEF (Thermic Effect of Food) — 5-10%
Digesting food itself costs energy. Protein costs the most to digest (~25% of its calories), carbs are in the middle (~8%), and fat is the cheapest (~2%).

This is one reason high-protein diets "feel" more effective. You are burning more calories just processing the food.

### 4. EAT (Exercise Activity Thermogenesis) — 5-10%
Your actual gym time. Surprisingly, this is the *smallest* component for most people. A brutal hour of weightlifting might burn 300 calories. A chai latte from Starbucks is 240.

You cannot outrun a bad diet.

## The Macro Split

Calories determine if you **gain or lose** weight. Macronutrients determine **what** you gain or lose.

### Protein: The King
- **Goal: 0.7-1g per pound of body weight.**
- Preserves muscle during a deficit.
- Most satiating macro (you feel fuller longer).
- Highest TEF (costs the most to digest).
- If you only optimize one thing, optimize protein.

### Fat: The Minimum
- **Goal: 0.3-0.4g per pound of body weight.**
- Essential for hormone production (testosterone, estrogen).
- Going below ~50g/day for extended periods can cause hormonal chaos.
- Don't fear fat. But don't chug olive oil either.

### Carbs: The Remainder
- **Goal: Fill the rest of your calories with carbs.**
- Carbs are your body's preferred fuel for intense exercise.
- They are not "evil." Insulin is not "evil." Context matters.
- If you lift weights or do intense cardio, you need carbs.

## Practical Application

### Step 1: Calculate your TDEE
Use our **Calorie Calculator** to get your maintenance calories based on age, weight, height, and activity level.

### Step 2: Set your target
- **Fat Loss:** Eat 300-500 calories below TDEE. A 500 cal/day deficit = ~1 lb/week fat loss.
- **Muscle Gain:** Eat 200-300 calories above TDEE.
- **Maintenance:** Eat at TDEE.

### Step 3: Hit your protein
Use our **Macro Calculator** to see the exact gram breakdown for your goal.

### Step 4: Be patient
You didn't gain the weight in a week. You won't lose it in a week. Aim for 0.5-1% of body weight per week. Anything faster and you're losing muscle.

## The Biggest Mistake

People eat 1,200 calories, lose 15 lbs in a month, feel amazing, then gain 20 lbs back.

Why? Because 1,200 calories is not sustainable. You lose muscle along with fat. Your BMR drops. You feel terrible. You binge. You are worse off than when you started.

**Slow and steady wins the race.** A 300-500 calorie deficit is boring. But it works. Forever.

[Calculate Your Calories](/health/calories) | [Find Your Macros](/health/macro-split)
`},{id:"8",slug:"debt-snowball-vs-avalanche",title:"Debt Snowball vs Debt Avalanche: Which Strategy Saves You More?",excerpt:"You have multiple debts. Should you pay off the smallest balance first (Snowball) or the highest interest rate (Avalanche)? We run the numbers on both.",date:"2026-02-09",displayDate:"February 9, 2026",readTime:"8 min read",category:"Finance",relatedToolLink:"/finance/debt-payoff",relatedToolName:"Debt Payoff Planner",content:`
## The Debt Problem

The average American household carries **$104,215** in total debt (2024 data). That includes mortgages, auto loans, student loans, and credit cards.

If you have multiple debts, you face a strategic choice: **Which one do you pay off first?**

There are two dominant schools of thought.

## Method 1: The Debt Snowball (Dave Ramsey)

**Strategy:** Pay minimum on everything, throw all extra money at the **smallest balance** first.

### How It Works
1. List all debts from smallest balance to largest.
2. Pay minimums on everything except the smallest.
3. Attack the smallest debt with every extra dollar.
4. When it is gone, roll that payment into the next smallest.
5. Repeat until debt-free.

### Example
| Debt | Balance | Rate | Min Payment |
|---|---|---|---|
| Store Card | $800 | 24% | $25 |
| Credit Card | $4,200 | 19% | $85 |
| Car Loan | $12,000 | 6% | $300 |
| Student Loan | $28,000 | 5% | $280 |

**Snowball order:** Store Card → Credit Card → Car Loan → Student Loan

### Why It Works (Psychology)
You get a **quick win** by eliminating the Store Card in 1-2 months. That dopamine hit? It is powerful. Studies show that people who use the Snowball method are **more likely to become debt-free** than those who use mathematically optimal strategies.

Motivation matters more than math when you are drowning.

## Method 2: The Debt Avalanche (Math Nerds)

**Strategy:** Pay minimum on everything, throw all extra money at the **highest interest rate** first.

### How It Works
1. List all debts from highest interest rate to lowest.
2. Pay minimums on everything except the highest rate.
3. Attack the highest-rate debt with every extra dollar.
4. When it is gone, roll that payment into the next highest rate.
5. Repeat.

### Same Example, Different Order
**Avalanche order:** Store Card (24%) → Credit Card (19%) → Car Loan (6%) → Student Loan (5%)

In this example, the order happens to be similar. But imagine the Store Card had a $5,000 balance. The Snowball would tell you to pay the $800 card first (even if it is at 6%), while the Avalanche says pay the $5,000 card first (because it is at 24%).

### Why It Works (Math)
The Avalanche method **always** saves you the most money in total interest paid. It is mathematically optimal.

In most scenarios, the difference is a few hundred to a few thousand dollars.

## Head-to-Head Comparison

| Factor | Snowball | Avalanche |
|---|---|---|
| Total interest paid | Higher | **Lower** |
| Time to first win | **Faster** | Slower |
| Motivation boost | **Higher** | Lower |
| Mathematical efficiency | Lower | **Higher** |
| Completion rate | **Higher** | Lower |

## The Hybrid Approach

Here is what I actually recommend:

1. If you have a debt with a **very high rate** (25%+ credit card), attack that first regardless of balance. The math is too punishing to ignore.
2. After that, switch to **Snowball** for the psychological wins.
3. Use our **Debt Payoff Planner** to model both scenarios and see the exact dollar difference.

Sometimes the difference between Snowball and Avalanche is only $200 over 3 years. In that case, go with whatever keeps you motivated.

Once your debt is gone, redirect those payments into the 20% savings bucket using the [50/30/20 budgeting rule](/blog/50-30-20-budgeting-rule-guide).

## The Real Enemy

Both methods work. Neither works if you keep adding new debt.

While paying off debt:
- Cut up the credit cards (or freeze them in a block of ice).
- Build a mini emergency fund ($1,000) so you don't charge the next car repair.
- Track your spending ruthlessly.

[Plan Your Debt Payoff](/finance/debt-payoff)
`},{id:"9",slug:"renting-vs-buying-2026-analysis",title:"Renting vs Buying in 2026: The Spreadsheet That Settles the Debate",excerpt:'Your parents say "buy a house." TikTok says "renting is better." Who is right? Neither. The answer depends on 7 variables. We break down the math.',date:"2026-02-07",displayDate:"February 7, 2026",readTime:"9 min read",category:"Finance",relatedToolLink:"/finance/rent-vs-buy",relatedToolName:"Rent vs Buy Calculator",content:`
## The Most Expensive Decision You Will Ever Make

Buying a home is likely the largest financial transaction of your life. Get it right, and it builds generational wealth. Get it wrong, and it is the anchor that drowns your finances.

The problem? Most advice is **emotional**, not mathematical.

- *"Rent is throwing money away!"* (It is not.)
- *"Real estate always goes up!"* (It does not.)
- *"You need to own a home to be successful!"* (You do not.)

Let's kill the emotions and do the math.

## The True Cost of Owning

When you pay rent, the entire payment is a cost. Simple.

When you "pay your mortgage," only a fraction goes to equity. The rest is gone forever:

### Unrecoverable Costs of Owning
1. **Mortgage Interest:** In year one of a 30-year mortgage at 6.5%, roughly **64%** of your payment is interest. You are renting money from the bank.
2. **Property Taxes:** 1-2.5% of your home's value per year. Forever. Even after you pay off the mortgage.
3. **Homeowner's Insurance:** $1,500-$3,000/year depending on location.
4. **Maintenance:** The 1% Rule says expect to spend 1% of your home's value annually on repairs. Roofs, HVAC, plumbing, appliances.
5. **HOA Fees:** If applicable, $200-$800/month.
6. **PMI:** If you put less than 20% down, add 0.5-1% of the loan annually.
7. **Transaction Costs:** 5-6% realtor fees when you sell. On a $500K home, that is $25,000-$30,000.

## The True Cost of Renting

Renters have it simpler:
1. **Rent payment.** That is basically it.
2. **Renter's insurance:** ~$15-30/month.

But renters face:
- **No equity building.** You don't own anything.
- **Rent increases.** Typically 3-5% per year.
- **Less control.** Can't renovate. Can be asked to move.

## The Opportunity Cost Nobody Talks About

Here is the variable most "Buy!" advocates ignore:

If you **don't** spend $100,000 on a down payment, you can **invest** that money.

The S&P 500 has returned ~10% annually (7% after inflation) over the last century.

$100,000 invested at 7% real return for 30 years = **$761,225.**

That is the *opportunity cost* of your down payment. Your house needs to appreciate by more than this amount (after all unrecoverable costs) for buying to "win."

## The Break-Even Timeline

This is the key question: **How long do you need to stay in the home for buying to beat renting?**

Because of transaction costs (6% on sale + closing costs on purchase), buying is almost always worse if you move within **3-5 years**.

The break-even point depends on:
- Your local rent-to-price ratio
- Mortgage interest rate
- Property tax rate
- Expected home appreciation
- Expected investment returns

Our **Rent vs Buy Calculator** computes this exact break-even for your specific situation.

## When Buying Wins
- You will stay **7+ years** in the same location.
- The rent-to-price ratio is high (monthly rent > 0.7% of home price).
- You have a low interest rate locked in.
- You value stability, customization, and "forced savings."

## When Renting Wins
- You might move in **< 5 years**.
- You live in an expensive market (SF, NYC, LA) where rents are cheap relative to prices.
- You can invest the down payment instead.
- You value flexibility and low maintenance.

## The Emotional Factor

Here is the truth: for many people, homeownership is not a financial decision. It is an emotional one.

- The pride of owning.
- The stability for kids.
- The freedom to paint your walls whatever color you want.

Those things have real value. They just don't show up on a spreadsheet.

**Know the math. Then make your decision with both your head and your heart.**

[Run Your Rent vs Buy Analysis](/finance/rent-vs-buy)
`},{id:"10",slug:"zone-2-training-heart-rate-guide",title:"Zone 2 Training: Why the World's Best Athletes Train Slow",excerpt:`Elite marathoners spend 80% of their training at an easy pace. Here's the science of heart rate zones, the Karvonen formula, and why "going harder" is making you slower.`,date:"2026-02-05",displayDate:"February 5, 2026",readTime:"7 min read",category:"Health",relatedToolLink:"/health/heart-rate",relatedToolName:"Heart Rate Calculator",content:`
## The Paradox of Going Slow

Norwegian cross-country skiers dominate their sport. Kenyan marathoners break world records year after year. What do they have in common?

**They train slow. Really slow.**

About **80% of their training** is done at a conversational pace. Low intensity. Zone 2. It looks lazy. It feels easy. And it is the foundation of elite performance.

This is the **80/20 Rule of Endurance Training** (also called "Polarized Training"), and the science behind it is compelling.

## Understanding Heart Rate Zones

Your heart rate during exercise tells you which energy system you are using. There are 5 zones:

| Zone | % of Max HR | Feels Like | Energy System |
|---|---|---|---|
| Zone 1 | 50-60% | Very easy, walking | Recovery |
| **Zone 2** | **60-70%** | **Easy, conversational** | **Aerobic / Fat burning** |
| Zone 3 | 70-80% | Moderate, uncomfortable | Mixed |
| Zone 4 | 80-90% | Hard, can speak in phrases | Threshold |
| Zone 5 | 90-100% | All-out, sprint | Anaerobic |

## Why Zone 2 Is Magic

Zone 2 is the intensity where your body primarily burns **fat** for fuel and builds **mitochondria** (the powerhouses of your cells).

### 1. Mitochondrial Biogenesis
Training in Zone 2 stimulates the creation of **new mitochondria** in your muscle cells. More mitochondria = more energy production = better endurance.

This adaptation takes months, not weeks. That is why consistency matters more than intensity.

### 2. Fat Oxidation
At Zone 2 intensity, your body gets ~60-70% of its energy from fat. At Zone 4+, it shifts almost entirely to carbohydrates (glycogen).

Since you have ~40,000+ calories stored as fat but only ~2,000 as glycogen, training your body to burn fat efficiently means you can go longer before "bonking" (hitting the wall).

### 3. Cardiac Efficiency
Sustained Zone 2 training increases **stroke volume** (the amount of blood your heart pumps per beat). Over time, your resting heart rate drops because your heart becomes a more efficient pump.

Elite endurance athletes often have resting heart rates of 35-45 BPM vs. 70-80 for sedentary adults.

### 4. Recovery
Zone 2 sessions don't beat you up. They promote blood flow, clear metabolic waste, and allow you to train more total volume without burning out.

## The Karvonen Formula

To find your personal zones, you need the **Karvonen Method:**

> **Target HR = ((Max HR - Resting HR) × % Intensity) + Resting HR**

### Example
- Max HR: 190 (estimated as 220 - age)
- Resting HR: 60
- Heart Rate Reserve (HRR): 190 - 60 = 130

**Zone 2 (60-70%):**
- Low: (130 × 0.60) + 60 = **138 BPM**
- High: (130 × 0.70) + 60 = **151 BPM**

This is more accurate than simple "% of Max HR" because it accounts for your fitness level (resting HR).

Our **Heart Rate Calculator** does this math for you across all 5 zones.

## The Talk Test

Don't have a heart rate monitor? Use the **Talk Test:**

- **Zone 2:** You can hold a full conversation. Complete sentences. Not gasping.
- **Zone 3:** You can speak in short phrases but prefer not to.
- **Zone 4+:** You can only get out a few words.

If you can't talk comfortably, you are going too hard for Zone 2.

## How to Implement

### For Runners
- **3-4 days/week:** Easy runs in Zone 2 (yes, this might mean walking hills).
- **1 day/week:** Interval session (Zone 4-5).
- **1 day/week:** Tempo run (Zone 3-4).

### For Gym-Goers
- **2-3 days/week:** 30-45 min of walking, cycling, or rowing in Zone 2.
- Continue your normal strength training.
- Zone 2 cardio does not interfere with muscle gains when done at low intensity.

### For Beginners
- Start with **150 minutes per week** of Zone 2 cardio (WHO recommendation).
- Walking counts. A brisk walk is Zone 2 for most beginners.
- Build up to 200-300 minutes per week over 3-6 months.

## The Ego Problem

Zone 2 training requires you to check your ego at the door.

You will feel like you should be going harder. Your Strava will look "slow." Your gym buddy might laugh.

Ignore all of it. The world's best endurance athletes got there by going slow most of the time.

**Train slow to race fast.**

[Calculate Your Heart Rate Zones](/health/heart-rate)
`},{id:"11",slug:"retirement-number-how-much-enough",title:'How Much Is "Enough"? The Retirement Number Nobody Talks About',excerpt:"Financial advisors say you need $2 million. Your uncle says he retired on $500K. Who is right? We break down the math behind your personal retirement number — and why the generic advice is dangerously wrong.",date:"2026-02-18",displayDate:"February 18, 2026",readTime:"10 min read",category:"Finance",relatedToolLink:"/finance/retirement",relatedToolName:"Retirement Calculator",content:`
## The $2 Million Myth

Every financial article throws out the same number: *"You need $2 million to retire."*

But that number is meaningless without context. A retiree in rural Arkansas has very different needs than one in San Francisco. A couple with a paid-off house and no debt needs far less than someone still renting.

**Your retirement number is personal.** And calculating it wrong — in either direction — can ruin decades of your life.

## The Replacement Rate Approach

Most financial planners use the **80% Rule**: you will need roughly 80% of your pre-retirement income in retirement.

If you earn $100,000/year, they say you need $80,000/year in retirement.

### Why 80%?

Because some expenses disappear:
- No more commuting costs.
- No more payroll taxes (FICA).
- No more retirement contributions.
- Your mortgage may be paid off.

But some expenses **increase**:
- **Healthcare.** Medicare doesn't cover everything. Supplemental insurance is $200-$400/month.
- **Travel.** You finally have time.
- **Hobbies.** Golf, fishing, gardening — free time isn't free.

## The Income Floor Method

A smarter approach is to build an **Income Floor** — guaranteed income that covers your non-negotiable expenses.

### Step 1: Calculate Your Base Expenses
- Housing (including property tax & insurance)
- Food
- Healthcare premiums & out-of-pocket
- Utilities
- Insurance (auto, home)
- Essential transportation

### Step 2: Subtract Guaranteed Income
- Social Security (check your estimate at ssa.gov)
- Pension (if you have one)
- Any rental income or annuities

### Step 3: The Gap = What Your Portfolio Needs to Cover

**Example:**
- Base expenses: $4,500/month ($54,000/year)
- Social Security: $2,200/month ($26,400/year)
- **Gap: $2,300/month ($27,600/year)**

Using the 4% Rule: $27,600 × 25 = **$690,000**

That is very different from "$2 million."

## The Lifestyle Layer

On top of your floor, add your **Lifestyle Budget** — the fun stuff:
- Travel: $5,000-$15,000/year
- Dining out, entertainment: $3,000-$6,000/year
- Gifts to kids/grandkids: $2,000-$5,000/year
- Hobbies: $1,000-$3,000/year

This layer is flexible. In a bad market year, you cut back on vacations. Your floor stays intact.

## The Healthcare Wildcard

Healthcare is the biggest unpredictable expense in retirement.

- **Before 65:** You need private insurance. ACA marketplace plans run $500-$1,500/month for a couple.
- **After 65:** Medicare kicks in, but you still pay premiums, copays, and deductibles. Average out-of-pocket healthcare in retirement: ~$315,000 per couple (Fidelity 2024 estimate).

This is why retiring at 55 is dramatically more expensive than retiring at 65. Those 10 years of private insurance can cost $100,000+.

## The Inflation Factor

If you retire at 65 and live to 90, that is 25 years of inflation.

At 3% inflation:
- $50,000/year today = $105,000/year in 25 years.

The 4% Rule accounts for this by allowing inflation-adjusted withdrawals. But if inflation spikes (like 2022-2023), your plan gets stressed.

### The Guardrails Strategy
Instead of a fixed withdrawal rate, use guardrails:
- **Normal times:** Withdraw 4%.
- **Great market year (+20%+):** Give yourself a 10% raise.
- **Bad market year (-15%+):** Cut spending by 10%.

This simple adjustment dramatically improves portfolio survival rates.

## The Time vs Money Tradeoff

Here is the uncomfortable truth: **every year you work past your "enough" number, you are trading irreplaceable time for unnecessary money.**

But every year you retire *before* your number, you risk running out.

The solution? **Run the math.** Input your actual expenses, income sources, and savings into our calculator. See your personal number — not some generic article's guess.

[Calculate Your Retirement Number](/finance/retirement)
`},{id:"12",slug:"car-loan-mistakes-costing-thousands",title:"5 Car Loan Mistakes That Cost You Thousands",excerpt:"The average car payment is $738/month. But most buyers never calculate the true cost of their loan. Here are 5 costly mistakes — and how to avoid every one of them.",date:"2026-02-17",displayDate:"February 17, 2026",readTime:"8 min read",category:"Finance",relatedToolLink:"/finance/loan",relatedToolName:"Auto Loan Calculator",content:`
## The American Car Trap

Americans owe over **$1.6 trillion** in auto debt. The average new car payment is **$738/month**. The average used car payment is **$532/month**.

That is a mortgage payment in many parts of the country — for an asset that loses 20% of its value the moment you drive it off the lot.

Here are the 5 most expensive mistakes car buyers make.

## Mistake #1: Focusing on Monthly Payment, Not Total Cost

The dealer asks: *"What monthly payment works for you?"*

This is a trap. They can make almost any payment "work" by stretching the loan term.

### The Math
A $35,000 car at 7% interest:

| Term | Monthly Payment | Total Interest Paid |
|---|---|---|
| 48 months | $838 | **$5,238** |
| 60 months | $693 | **$6,564** |
| 72 months | $598 | **$8,063** |
| 84 months | $530 | **$9,521** |

The 84-month loan "saves" you $308/month but costs you **$4,283 more** in interest.

**Rule:** Never finance a car for more than 48-60 months. If you can't afford the payment at 48 months, you can't afford the car.

## Mistake #2: Ignoring the Down Payment

Putting $0 down means you are immediately **underwater** (you owe more than the car is worth).

A new car depreciates roughly:
- **20%** in year 1
- **15%** in year 2
- **10-12%** per year after that

If you finance $35,000 with $0 down, after one year your car is worth ~$28,000 but you still owe ~$30,000. If you get in an accident or need to sell, you **owe the bank $2,000** for a car you no longer have.

**Rule:** Put at least 20% down on a new car, 10% on used.

## Mistake #3: Not Getting Pre-Approved

Walking into a dealership without pre-approval is like showing up to a negotiation blindfolded.

The dealer will run your credit and offer you *their* rate — which is almost always higher than what you can get from:
- Your credit union (often 1-2% lower than dealer rates)
- Your bank
- Online lenders

**Rule:** Get pre-approved from at least 2 sources before stepping onto the lot. Use the dealer's rate only if they beat your pre-approval.

## Mistake #4: Rolling Negative Equity

This is the death spiral.

You owe $8,000 more on your current car than it is worth. The dealer says: *"No problem! We will roll that $8,000 into your new loan."*

Now you are financing your new $35,000 car PLUS $8,000 of old debt = **$43,000 loan on a $35,000 car**.

You are underwater from day one. And when you want to trade this one in, you will be $12,000 underwater.

**Rule:** Never roll negative equity. Pay off the old car or save up to cover the gap first.

## Mistake #5: Forgetting Insurance Costs

That shiny new BMW might have the same monthly payment as a Honda CR-V. But the insurance?

- **BMW 3 Series:** ~$250/month insurance
- **Honda CR-V:** ~$140/month insurance

That is $110/month ($1,320/year) you didn't factor in.

High-performance cars, luxury brands, and vehicles with poor safety ratings all cost dramatically more to insure.

**Rule:** Get an insurance quote *before* you buy. Add it to your monthly budget calculation.

## The Smart Car Budget

Here is the formula:

**Total car costs should not exceed 15% of your gross monthly income.**

That includes:
- Loan payment
- Insurance
- Gas
- Maintenance

If you earn $5,000/month gross, your total car budget is $750/month. If the payment alone is $700, you can't afford it.

## Run Your Numbers

Stop guessing. Input the price, interest rate, down payment, and loan term to see your real monthly cost and total interest paid.

[Calculate Your Auto Loan](/finance/loan)
`},{id:"13",slug:"freelance-hourly-rate-formula",title:"The Freelancer's Pricing Formula: Stop Charging Too Little",excerpt:"Most freelancers charge $30-50/hr and wonder why they are broke. The math says your rate should be 2-3x what you think. Here is the formula — and the psychology behind charging what you are worth.",date:"2026-02-16",displayDate:"February 16, 2026",readTime:"9 min read",category:"Finance",relatedToolLink:"/finance/freelance-rate",relatedToolName:"Freelance Rate Calculator",content:`
## The $50/Hour Freelancer Who Earns Less Than Minimum Wage

Meet Alex. Alex is a freelance graphic designer who charges $50/hour. Sounds decent, right?

Let's do the real math:
- **Billable hours:** 25/week (the other 15 are admin, marketing, invoicing, and "looking for clients")
- **Annual billable hours:** 25 × 48 weeks (taking 4 weeks off) = 1,200 hours
- **Gross revenue:** $50 × 1,200 = $60,000

But wait. Alex is self-employed:
- **Self-employment tax (15.3%):** -$9,180
- **Health insurance:** -$6,000/year
- **Software subscriptions:** -$3,600/year
- **Equipment:** -$2,000/year
- **Accounting/legal:** -$1,500/year

**Take-home: ~$37,720**

Divided by 2,000 actual hours worked (including non-billable time), Alex's **effective hourly rate is $18.86.**

Alex is barely above minimum wage.

## The Employee Equivalency Formula

When you were employed, your $70,000 salary came with:
- Health insurance (~$7,000/year employer contribution)
- 401k match (~$3,500/year)
- Paid vacation (10 days = $2,700)
- Paid sick days (5 days = $1,350)
- Employer's half of FICA (7.65% = $5,355)
- Office space, equipment, software

Your **Total Compensation** was closer to **$90,000+**.

To match this as a freelancer, you need to bill significantly more per hour.

## The Formula

Here is how to calculate your minimum viable rate:

> **Hourly Rate = (Target Annual Income + Business Costs + Taxes) ÷ Annual Billable Hours**

### Step 1: Target Income
What do you want to take home after everything? Let's say $80,000.

### Step 2: Business Costs
- Health insurance: $6,000
- Retirement contributions: $8,000
- Software/tools: $3,600
- Equipment depreciation: $2,000
- Professional development: $1,500
- Accounting/legal: $1,500
- Marketing: $2,000
- **Total: $24,600**

### Step 3: Taxes
Self-employment tax (15.3%) + income tax (~22% effective) = ~37.3% total tax burden.

To take home $80,000, you need to earn: $80,000 ÷ (1 - 0.373) = ~$127,600 gross.

### Step 4: Billable Hours
Be honest. Track your time for a month. Most freelancers bill 60-70% of their working hours.

If you work 40 hrs/week × 48 weeks = 1,920 hours
At 65% billable: 1,248 billable hours

### The Result
($80,000 + $24,600 + taxes baked in) → $127,600 ÷ 1,248 = **$102/hour**

Alex should be charging **$100+/hour**, not $50.

## Why Freelancers Undercharge

### 1. The Employee Mindset
You compare your rate to your old salary. "$50/hour = $100K/year!" No. It equals $37K after reality hits.

### 2. Impostor Syndrome
*"Who would pay me $100/hour?"* Answer: companies that would otherwise hire a full-time employee at $80K + $25K in benefits. You are still saving them money.

### 3. Competition Fear
*"But other freelancers on Upwork charge $25/hour."* Those freelancers are either in a low cost-of-living country, new to the industry, or going out of business. Do not race to the bottom.

## How to Raise Your Rates

### For New Clients
Just... charge more. New clients have no anchor. Quote your new rate with confidence.

### For Existing Clients
Give 30-60 days notice. Frame it positively:

*"Starting [date], my rate will be $X. This reflects my increased experience and the value I deliver. I wanted to give you plenty of notice."*

Some will leave. That is fine. You replace one $50/hr client with one $100/hr client, work half the hours, and earn the same money.

### The Value Pricing Alternative
Even better: stop charging by the hour entirely. Charge by the **project** or by the **value delivered**.

A logo design that takes you 4 hours but generates $500K in brand recognition? That is worth $5,000, not $400.

## Calculate Your Real Rate

Stop guessing. Input your target income, expenses, and billable hours. See what you should actually be charging.

[Find Your Freelance Rate](/finance/freelance-rate)
`},{id:"14",slug:"roi-everything-decision-framework",title:"ROI on Everything: A Decision Framework for Life",excerpt:"ROI is not just for stocks. Every major decision — gym membership, online course, moving cities — has a return on investment. Here is how to think like an investor about your entire life.",date:"2026-02-15",displayDate:"February 15, 2026",readTime:"8 min read",category:"Finance",relatedToolLink:"/finance/roi",relatedToolName:"ROI Calculator",content:`
## Beyond Stocks and Bonds

When people hear "ROI," they think stock market. *"My portfolio returned 12% last year."*

But Return on Investment is a universal decision-making framework. Every time you spend money, time, or energy, you are making an investment. And every investment has a return — positive or negative.

Learning to calculate ROI on **everything** is a superpower.

## The Basic Formula

> **ROI = (Gain from Investment - Cost of Investment) ÷ Cost of Investment × 100**

Simple. If you spend $1,000 and get $1,500 back, your ROI is 50%.

But the real power comes from applying this to non-obvious decisions.

## ROI of a Gym Membership

**Cost:** $50/month = $600/year

**Returns (research-backed):**
- **Reduced healthcare costs.** Regular exercisers save ~$2,500/year in medical expenses (Journal of the American Heart Association).
- **Increased productivity.** Exercise improves cognitive function by ~20% (Harvard Medical School). If you earn $60K, that is $12,000 in potential productivity gains.
- **Reduced sick days.** Active people take 4.1 fewer sick days per year. At your hourly rate, that is real money.
- **Longer lifespan.** 150 min/week of exercise adds ~3.4 years of life (PLOS Medicine).

**ROI: Conservatively 300-500%.** The gym is one of the best investments you will ever make.

## ROI of an Online Course

**Scenario:** A $500 coding bootcamp that teaches you Python.

**If you never use it:** ROI = -100%. You wasted $500.

**If you automate 2 hours/week of work:**
- Time saved: 104 hours/year
- At $40/hour: $4,160/year in value
- **ROI: 732% in year one.** And it compounds every year.

**If it lands you a new job paying $15K more:**
- **ROI: 2,900%.** In the first year alone.

The key variable? **Action.** The course itself is worthless. The application of knowledge has infinite ROI.

## ROI of Moving to a New City

This one is complex, but the math is doable.

**Costs:**
- Moving expenses: $5,000
- First/last/security: $4,000
- Lost local network: Hard to quantify
- Emotional stress: Real but not financial

**Potential Returns:**
- Salary increase: +$20,000/year (SF vs Kansas City tech salaries)
- Or cost-of-living decrease: -$15,000/year in expenses (NYC → Austin)
- Career opportunities: Access to better companies, bigger market
- Quality of life: Weather, culture, proximity to family

**Break-even:** If the move costs $10K and saves/earns you $15K/year, you break even in 8 months.

## ROI of Cooking at Home

**Average American spending:**
- Eating out: $3,500/year
- Groceries: $5,000/year

**If you shift 50% of restaurant meals to home cooking:**
- Savings: ~$1,200/year
- Time investment: ~2 extra hours/week cooking = 104 hours/year
- **Effective hourly rate: $11.50/hr**

Not amazing. But factor in health benefits (home-cooked meals average 200 fewer calories) and it improves significantly.

## The Time ROI Framework

Money is not the only currency. Time has ROI too.

**Rule of thumb:** If something saves you 1 hour per week and takes 10 hours to set up, the break-even is 10 weeks. After that, it is pure profit.

Examples:
- **Meal prepping (Sunday, 2 hrs):** Saves 5+ decision points per week and 3+ hours of cooking. ROI positive in week 1.
- **Learning keyboard shortcuts:** 4 hours of practice saves ~30 min/day. ROI positive in 2 months. Then compounds for your entire career.
- **Automating bill payments:** 1 hour to set up, saves 2 hours/month. ROI positive in 2 weeks.

## How to Use This Thinking

Before any significant purchase or time commitment, ask:

1. **What is my cost?** (Money, time, energy)
2. **What is my expected return?** (Money, time saved, health, happiness)
3. **What is the timeline?** (When do I break even?)
4. **What is the risk?** (What if it doesn't work out?)

This is not about being a robot. It is about making **intentional** decisions instead of reactive ones.

## Calculate Any ROI

Input your investment cost and expected returns. See the exact percentage return, annualized rate, and break-even timeline.

[Calculate Your ROI](/finance/roi)
`},{id:"15",slug:"saving-for-big-purchase-math",title:"The Math Behind Saving for Any Big Purchase",excerpt:"Down payment. Dream vacation. New laptop. Emergency fund. Whatever you are saving for, there is a formula to get there without suffering. Here is the system.",date:"2026-02-14",displayDate:"February 14, 2026",readTime:"7 min read",category:"Finance",relatedToolLink:"/finance/savings-goal",relatedToolName:"Savings Goal Calculator",content:`
## The Wish vs The Plan

Everyone has something they want to buy. But there is a gap between "I want a $3,000 vacation" and "I will have $3,000 ready by June."

That gap is **math**. And the math is surprisingly simple.

## The Basic Formula

> **Monthly Savings = Goal Amount ÷ Months Until Deadline**

Want $3,000 in 6 months? Save $500/month. Done.

But this ignores two things: **interest earned** and **what you can actually afford.**

## Making Interest Work for You

If you put your savings in a High-Yield Savings Account (HYSA) earning 4-5% APY, your money works while you sleep.

### Example: Saving $10,000 in 12 months

**Without interest (mattress method):** $10,000 ÷ 12 = $833.33/month

**With 5% HYSA:** You only need ~$813/month. The interest covers the last $243.

Not life-changing for a 1-year goal. But for longer timelines:

### Saving $50,000 for a Down Payment in 3 Years

**Without interest:** $50,000 ÷ 36 = $1,388.89/month

**With 5% HYSA:** ~$1,290/month. You save **$3,564 less** thanks to compound interest.

**In a brokerage account at 7%:** ~$1,210/month. But with the risk that your balance could drop 20% right when you need it.

**Rule:** For goals under 3 years, use a HYSA. For goals over 5 years, consider investing.

## The Priority Matrix

Most people have multiple savings goals competing for the same dollars. Here is how to prioritize:

### Tier 1: Non-Negotiable
1. **Emergency Fund** (3-6 months expenses) — This comes first. Always.
2. **High-interest debt payoff** (anything above 7-8%)

### Tier 2: Important
3. **Retirement contributions** (at least up to employer match)
4. **Major necessary purchases** (reliable car, home down payment)

### Tier 3: Lifestyle
5. **Travel and experiences**
6. **Electronics and upgrades**
7. **Fun money**

## The Bucket System

Don't try to save for everything in one account. You will lose track.

**Create separate "buckets"** in your HYSA (most banks like Ally and Marcus allow sub-accounts):

- 🏠 Down Payment Fund
- ✈️ Travel Fund
- 🚨 Emergency Fund
- 💻 Equipment Fund

Set up automatic transfers on payday. $200 to down payment, $100 to travel, $50 to equipment. It happens automatically and you never "forget."

## The Latte Factor (And Why It Is Overrated)

You have heard it: *"Skip your $5 latte and you will be rich!"*

$5/day × 365 = $1,825/year. That is real money. But obsessing over small expenses while ignoring the big ones is like mopping the floor while the roof leaks.

### The Big 3
Your biggest savings impact comes from optimizing:
1. **Housing** (Can you get a roommate? Move to a cheaper area?)
2. **Transportation** (Can you go from 2 cars to 1? Buy used?)
3. **Food** (Meal prep instead of daily DoorDash?)

These three categories account for 60-70% of most people's spending. Cut 10% from each and you save more than skipping lattes for a decade.

## The Savings Rate Sweet Spot

How much of your income should you save in total?

| Savings Rate | Timeline to Major Goals |
|---|---|
| 10% | Very slow, standard pace |
| 20% | Good, building wealth steadily |
| 30% | Aggressive, ahead of schedule |
| 50%+ | FIRE territory |

If you are just starting, aim for 20%. Use the 50/30/20 rule:
- **50%** Needs (rent, food, insurance)
- **30%** Wants (dining, entertainment, shopping)
- **20%** Savings & debt repayment

## Set Your Goal, Hit Your Number

Pick your goal. Set your timeline. See exactly how much you need to save each month — and watch the progress bar fill up.

[Plan Your Savings Goal](/finance/savings-goal)
`},{id:"16",slug:"macro-split-guide-protein-carbs-fat",title:"Your Ideal Macro Split: Protein, Carbs & Fat Explained",excerpt:"Keto says cut carbs. Vegan says cut fat. Bodybuilders say eat everything. Who is right? The answer depends on YOUR goals. Here is how to calculate your personal macro split.",date:"2026-02-13",displayDate:"February 13, 2026",readTime:"9 min read",category:"Health",relatedToolLink:"/health/macro-split",relatedToolName:"Macro Calculator",content:`
## The Diet Wars Are Pointless

Keto vs Vegan. Carnivore vs Mediterranean. Paleo vs everything.

Here is the truth that no diet influencer wants you to hear: **all diets that work, work because of calorie control.** The macro ratio determines what you gain, lose, or maintain — but total calories determines the direction.

So instead of picking a tribe, let's talk about what protein, carbs, and fats actually do, and how to find your ideal ratio.

## The Three Macronutrients

### Protein: The Builder
- **4 calories per gram**
- Builds and repairs muscle tissue
- Most satiating macro (keeps you full longest)
- Highest thermic effect (~25% of calories burned just digesting it)
- Your body cannot store excess protein efficiently — it uses it or converts it

**Bottom line:** Protein is the most important macro for body composition, period. Whether you want to lose fat, gain muscle, or maintain, protein should be your priority.

### Carbohydrates: The Fuel
- **4 calories per gram**
- Primary fuel for high-intensity exercise
- Stored as glycogen in muscles and liver (~2,000 calories stored)
- Only macro that rapidly fuels anaerobic activity (sprinting, heavy lifting)
- Includes fiber, which is essential for gut health

**Bottom line:** Carbs are not evil. They are fuel. If you lift weights or do intense exercise, you need them. If you sit at a desk all day, you need less.

### Fat: The Regulator
- **9 calories per gram** (most calorie-dense)
- Essential for hormone production (testosterone, estrogen, cortisol)
- Needed for vitamin absorption (A, D, E, K are fat-soluble)
- Provides essential fatty acids your body cannot make
- Minimum intake: ~0.3g per pound of body weight

**Bottom line:** Never go below 50g of fat per day. Hormonal disruption is not worth the calorie savings.

## Macro Splits by Goal

### Fat Loss
- **Protein:** 1.0g per pound of body weight (high to preserve muscle)
- **Fat:** 0.3-0.4g per pound (minimum for hormones)
- **Carbs:** Fill remaining calories

**Example (180 lb person at 2,000 calories):**
- Protein: 180g (720 cal) = 36%
- Fat: 60g (540 cal) = 27%
- Carbs: 185g (740 cal) = 37%

### Muscle Gain
- **Protein:** 0.8-1.0g per pound of body weight
- **Fat:** 0.3-0.4g per pound
- **Carbs:** As high as possible (fuel for training + recovery)

**Example (180 lb person at 2,800 calories):**
- Protein: 160g (640 cal) = 23%
- Fat: 65g (585 cal) = 21%
- Carbs: 394g (1,575 cal) = 56%

### Maintenance / General Health
- **Protein:** 0.7-0.8g per pound
- **Fat:** 0.3-0.4g per pound
- **Carbs:** Remainder

**Example (180 lb person at 2,400 calories):**
- Protein: 140g (560 cal) = 23%
- Fat: 65g (585 cal) = 24%
- Carbs: 314g (1,255 cal) = 53%

## The Protein Priority System

If tracking all three macros feels overwhelming, just track **protein**. Here is why it works:

1. Hit your protein target every day.
2. Eat mostly whole foods for the rest.
3. The fat and carbs tend to balance themselves naturally.

Most people who "can't lose weight" are eating 50-80g of protein per day. Bump that to 140-180g and watch what happens:
- You feel fuller (less snacking).
- You burn more calories digesting food (thermic effect).
- You preserve muscle during a deficit (you lose fat, not muscle).

## Common Mistakes

### 1. Fear of Carbs
Cutting carbs works for fat loss because it cuts calories. But so does cutting anything. If you exercise intensely, low carbs = low energy = bad workouts = less muscle = slower metabolism. Counterproductive.

### 2. Not Enough Protein
The RDA for protein (0.36g/lb) is the minimum to prevent deficiency. It is miles below the optimal amount for body composition. Aim for 2-3x the RDA.

### 3. Ignoring Fiber
Fiber is a carbohydrate that your body cannot digest. It feeds your gut bacteria, regulates blood sugar, and keeps you full. Aim for 25-35g/day. Most people get 15g.

## Find Your Personal Split

Stop following generic percentages. Input your weight, goal, and activity level to get a personalized gram breakdown for protein, carbs, and fat.

[Calculate Your Macros](/health/macro-split)
`},{id:"17",slug:"one-rep-max-strength-training-guide",title:"Why Knowing Your One Rep Max Makes You Stronger",excerpt:"You don't need to actually lift your max to benefit from knowing it. Your 1RM unlocks percentage-based training, progressive overload tracking, and smarter programming. Here is how.",date:"2026-02-12",displayDate:"February 12, 2026",readTime:"8 min read",category:"Health",relatedToolLink:"/health/1rm",relatedToolName:"One Rep Max Calculator",content:`
## What Is a One Rep Max (1RM)?

Your One Rep Max is the maximum weight you can lift for a single repetition with proper form. It is the gold standard for measuring absolute strength.

But here is the thing: **you almost never need to actually test it.**

Testing a true 1RM is risky (especially for beginners), requires a spotter, and is physically draining. Instead, you can **estimate** it from any set you do in the gym.

## The Estimation Formulas

The most popular formula is the **Epley Formula:**

> **1RM = Weight × (1 + Reps ÷ 30)**

If you bench press 185 lbs for 6 reps:
- 1RM = 185 × (1 + 6/30) = 185 × 1.2 = **222 lbs**

Other formulas (Brzycki, Lander, Lombardi) give slightly different numbers. Our calculator uses multiple formulas and gives you a range, which is more useful than a single number.

**Accuracy note:** These formulas are most accurate with 1-10 reps. Above 10, the estimation becomes less reliable because muscular endurance becomes a bigger factor than pure strength.

## Why Your 1RM Matters

### 1. Percentage-Based Programming

Most serious training programs prescribe weights as a percentage of your 1RM:

| % of 1RM | Reps | Training Effect |
|---|---|---|
| 90-100% | 1-2 | Maximal strength, neural adaptation |
| 80-90% | 3-5 | Strength, moderate hypertrophy |
| 70-80% | 6-10 | Hypertrophy (muscle growth) |
| 60-70% | 10-15 | Muscular endurance |
| 50-60% | 15+ | Endurance, recovery |

If your program says "Squat 5×5 at 75%," and your estimated 1RM is 300 lbs, you load **225 lbs**.

No guessing. No ego lifting. Science.

### 2. Progressive Overload Tracking

Progressive overload is the #1 principle of getting stronger. You need to lift more over time.

But "more" does not mean more weight every session. It means more **total stimulus.** Tracking your estimated 1RM over months reveals your true strength trajectory, even if your day-to-day sets vary.

**Example progression:**
- January: Bench 185 × 6 → Estimated 1RM = 222 lbs
- March: Bench 185 × 8 → Estimated 1RM = 234 lbs
- May: Bench 195 × 7 → Estimated 1RM = 241 lbs

Your estimated 1RM went up 19 lbs in 4 months. That is measurable progress, even though you never actually tested your max.

### 3. Injury Prevention

Knowing your 1RM prevents two dangerous mistakes:
- **Going too heavy:** If your 1RM is 225, attempting 250 is an injury risk.
- **Going too light:** If your 1RM is 300 and you always lift 135, you are wasting time.

## The Big 4 Lifts

These four movements are the best indicators of total-body strength:

| Lift | Beginner 1RM | Intermediate 1RM | Advanced 1RM |
|---|---|---|---|
| **Squat** | 1.0× body weight | 1.5× BW | 2.0× BW |
| **Bench Press** | 0.75× BW | 1.25× BW | 1.5× BW |
| **Deadlift** | 1.25× BW | 1.75× BW | 2.5× BW |
| **Overhead Press** | 0.5× BW | 0.75× BW | 1.0× BW |

These benchmarks give you targets to work toward.

## How to Use the Calculator

1. Pick a lift you performed recently.
2. Enter the weight and reps.
3. Get your estimated 1RM and percentage chart.
4. Use the percentages to program your next training block.

**Pro tip:** Retest every 4-6 weeks by performing a heavy set of 3-5 reps on each major lift. Plug it in, update your numbers, and adjust your training weights accordingly.

## Common Mistakes

### Ego Testing
Do not attempt a true 1RM without a spotter, proper warm-up, and at least 6 months of consistent training. Estimations are safer and nearly as accurate.

### Ignoring Form
Your 1RM is only valid if the rep is clean. A half-squat or bounced bench press inflates your number and leads to programming with weights that are too heavy for full range of motion.

### Not Retesting
Your 1RM changes as you get stronger. A number from 6 months ago is stale. Recalculate regularly.

[Estimate Your One Rep Max](/health/1rm)
`},{id:"18",slug:"pomodoro-technique-deep-work",title:"The Pomodoro Technique: How 25 Minutes Changes Everything",excerpt:"You sit down to work. Three hours later, you have checked email 14 times, scrolled Twitter, and accomplished nothing meaningful. The Pomodoro Technique fixes this with one simple rule: work for 25 minutes. Then stop.",date:"2026-02-11",displayDate:"February 11, 2026",readTime:"7 min read",category:"Productivity",relatedToolLink:"/productivity/pomodoro",relatedToolName:"Pomodoro Timer",content:`
## The Attention Crisis

The average knowledge worker is interrupted every **11 minutes** (University of California research). After each interruption, it takes **23 minutes** to fully regain focus.

Do the math: you are never in a state of deep focus during a normal workday.

Email notifications. Slack pings. A coworker walking by. Your phone buzzing. Each one resets the 23-minute clock.

The Pomodoro Technique is a simple system designed to protect your attention.

## How It Works

The method was invented by Francesco Cirillo in the late 1980s, using a tomato-shaped kitchen timer (pomodoro = Italian for tomato).

### The Rules
1. **Choose one task** to work on.
2. **Set a timer for 25 minutes.**
3. **Work on ONLY that task.** No email. No phone. No switching tabs.
4. **When the timer rings, stop.** Even mid-sentence.
5. **Take a 5-minute break.** Stand up. Stretch. Get water.
6. **After 4 pomodoros, take a 15-30 minute break.**

That is it. Deceptively simple. Remarkably effective.

## Why 25 Minutes?

The 25-minute interval is short enough that your brain does not resist starting (overcoming procrastination), but long enough to make meaningful progress.

### The Zeigarnik Effect
Psychologist Bluma Zeigarnik discovered that people remember unfinished tasks better than completed ones. When you stop mid-task at the end of a pomodoro, your brain keeps processing it in the background during the break.

This is why you often have your best ideas in the shower or on a walk — your subconscious is still working.

### Parkinson's Law
*"Work expands to fill the time available for its completion."*

Without a deadline, a task that should take 2 hours will take all day. The 25-minute timer creates an artificial deadline, compressing your focus.

## The Break Is Not Optional

Skipping breaks feels productive. It is not.

Your brain operates in cycles of **focused attention** and **diffuse thinking.** Both are necessary for creative problem-solving.

During the break:
- **Stand up.** Sitting for extended periods reduces cognitive function.
- **Look at something far away.** Screens keep your eyes focused at ~2 feet. Give them a rest.
- **Move.** Walk to the window. Do 10 pushups. Refill your water.
- **Do NOT check your phone.** Social media during breaks demolishes the restorative effect.

## Tracking Pomodoros = Tracking Productivity

Traditional time tracking asks: *"How many hours did you work?"* This is useless. You can "work" 8 hours and accomplish nothing.

Pomodoro tracking asks: *"How many focused, uninterrupted 25-minute blocks did you complete?"*

Most people find they complete **8-10 pomodoros** in a "productive" day. That is 3.3-4.2 hours of **deep work.**

Sound low? Cal Newport, author of *Deep Work*, argues that even elite performers rarely sustain more than 4 hours of truly deep work per day. The rest is shallow work (email, meetings, admin).

If you are consistently hitting 10+ pomodoros per day, you are in the top tier of knowledge worker productivity.

## Common Objections

### "I can't stop in the middle of something!"
You can. The Zeigarnik Effect means your brain will pick up exactly where you left off after the break. You will not lose your train of thought — you will actually return with fresh perspective.

### "25 minutes is too short."
For some deep tasks (writing, coding), you can extend to 45 or 50 minutes. The key principle is the same: a fixed interval of protected focus followed by a break.

### "I work in an open office."
Headphones are your "Do Not Disturb" sign. When the timer is running, you do not respond to non-urgent interruptions. Tell your team: "I check messages every 25 minutes."

### "What about meetings?"
Meetings are not pomodoros. Schedule your pomodoro blocks **between** meetings. Even 2-3 pomodoros between meetings is better than zero focused work.

## The Compound Effect

One pomodoro is not impressive. But consistency is.

- 4 pomodoros/day × 5 days = 20 pomodoros/week
- 20 × 48 weeks = 960 pomodoros/year
- 960 × 25 min = **400 hours of deep work per year**

That is enough to write a book, learn a language, build an app, or master a new skill.

## Start Your First Pomodoro

Stop planning. Stop reading about productivity. Set the timer. Pick one task. Go.

[Start a Pomodoro Session](/productivity/pomodoro)
`},{id:"19",slug:"salary-vs-hourly-real-comparison",title:"Salary vs. Hourly in 2026: Which Actually Pays More? (With Calculator)",excerpt:"Your friend earns $85K salary. You make $42/hr. We ran the real math — factoring overtime, benefits, PTO, and taxes. The answer surprised us. Use our free converter to check yours.",date:"2026-02-09",displayDate:"February 9, 2026",readTime:"7 min read",category:"Productivity",relatedToolLink:"/productivity/salary-hourly",relatedToolName:"Salary ↔ Hourly Converter",content:`
## The Comparison Problem

"I make $85,000 a year."
"I make $42 an hour."

Who earns more? Your instinct says do the math: $42 × 2,080 hours (40 hrs × 52 weeks) = $87,360. So the hourly worker wins by $2,360.

**But that is the wrong comparison.** Here is why.

## What "Salary" Really Means

A salaried employee earning $85,000:
- Works roughly 45-50 hours/week (Gallup data says full-time salaried workers average 47 hours/week)
- Gets no overtime pay (exempt status)
- Gets paid for holidays, vacation, and sick days

**Effective hourly rate:** $85,000 ÷ (47 hrs × 52 weeks) = **$34.78/hour**

That $85K salary is actually $34.78/hour. Suddenly the comparison looks very different.

## What "Hourly" Really Means

An hourly employee at $42/hour:
- Gets paid for *exactly* the hours worked (no more, no less)
- Gets overtime (1.5x) for hours over 40/week
- May not get paid holidays, vacation, or sick days (depends on employer)

**If they work 40 hours/week with 2 weeks unpaid vacation:**
$42 × 40 × 50 = **$84,000**

**If they work 45 hours/week (5 hours overtime):**
(40 × $42) + (5 × $63) × 50 = **$99,750**

The hourly worker at $42/hr working modest overtime earns **$15K more** than the salaried worker.

## The Benefits Equation

But wait — salary jobs typically include benefits that hourly jobs may not:

| Benefit | Typical Annual Value |
|---|---|
| Health insurance (employer share) | $6,000 - $12,000 |
| 401k match (3-6%) | $2,550 - $5,100 |
| Paid vacation (10-15 days) | $3,270 - $4,904 |
| Paid sick days (5-7 days) | $1,635 - $2,288 |
| Paid holidays (10 days) | $3,270 |

**Total benefits value:** $16,725 - $27,562

If you add $22,000 in benefits to the $85K salary, total compensation is **$107,000**.

The hourly worker at $42/hr with no benefits needs to factor in:
- Buy own health insurance: -$6,000/year
- No paid vacation: Already accounted for (50 weeks vs 52)
- No 401k match: -$0 from employer

**Net comparison:**
- Salary: $85,000 + $22,000 benefits = $107,000 total comp
- Hourly (40 hrs): $84,000 - $6,000 insurance = $78,000 effective
- Hourly (45 hrs + OT): $99,750 - $6,000 = $93,750 effective

## When Hourly Wins

Hourly compensation wins when:
- **Overtime is available.** Each OT hour is worth 1.5x. Salaried workers get zero for extra hours.
- **You value flexibility.** Some hourly roles let you work more when you want money and less when you want time.
- **The base rate is high.** Skilled trades (electricians, plumbers) and healthcare (nurses, technicians) often earn $50-75+/hr with extensive OT.

## When Salary Wins

Salary wins when:
- **Benefits are strong.** A $75K salary with full benefits can beat a $95K hourly role with none.
- **Hours are reasonable.** If you genuinely work 40 hours and get paid for 40, the math is clean.
- **Career advancement.** Salaried roles more often lead to promotions, bonuses, and equity.
- **Predictability.** Same paycheck every period regardless of sick days or slow weeks.

## The Real Question

Stop asking "which pays more?" Start asking:

1. **What are my actual hours?** Track them for a month.
2. **What are the total benefits?** Ask HR for your total compensation statement.
3. **What is my effective hourly rate?** Total comp ÷ actual hours worked.

Two people can have the same job title at the same company with very different effective hourly rates based on how many extra hours they work.

## Convert and Compare

Stop estimating. Input your salary or hourly rate and see the exact conversion in both directions.

[Convert Salary ↔ Hourly](/productivity/salary-hourly)
`},{id:"20",slug:"meetings-cost-company-calculator",title:"That Meeting Could Have Been an Email: The Real Cost",excerpt:"The average employee spends 31 hours per month in unproductive meetings. At $50/hour average compensation, a 10-person meeting costs $500/hour. Here is the math that will change how your company schedules.",date:"2026-02-08",displayDate:"February 8, 2026",readTime:"7 min read",category:"Productivity",relatedToolLink:"/productivity/meeting-cost",relatedToolName:"Meeting Cost Calculator",content:`
## The Meeting Epidemic

According to research by Atlassian:
- The average employee attends **62 meetings per month.**
- **31 hours/month** are spent in meetings considered unproductive.
- Employees consider **50% of meeting time** to be wasted.

Let's put a dollar figure on that waste.

## The True Cost of a Meeting

A meeting does not just cost "time." It costs **money, attention, and opportunity.**

### Direct Cost: Compensation

> **Meeting Cost = (Average Hourly Rate × Number of Attendees) × Duration in Hours**

**Example: 1-hour meeting with 8 people**
If the average fully-loaded cost (salary + benefits + overhead) is $75/hour:

$75 × 8 × 1 = **$600**

That is a $600 meeting. Was it worth $600?

### Hidden Cost: Context Switching

A 30-minute meeting does not cost 30 minutes. It costs:
- 15 minutes preparing/traveling to the meeting
- 30 minutes in the meeting
- 23 minutes regaining deep focus afterward (UC Irvine research)

**Total impact: 68 minutes** for a "30-minute" meeting.

### Opportunity Cost: What They Are Not Doing

Every person in that meeting is NOT:
- Writing code
- Closing deals
- Solving problems
- Creating content

If your best engineer spends 3 hours/day in meetings, they have 5 hours left for engineering. You hired a full-time engineer but you are only getting 62.5% of one.

## The Annual Meeting Tax

Let's do the scary math:

**Assumptions:**
- 8 meetings/week per employee (conservative)
- Average meeting: 45 minutes + 23 min recovery = 68 minutes
- Average attendees: 5
- Average loaded rate: $75/hour

**Per employee, per week:**
8 meetings × 68 min = 544 min = **9.1 hours in meetings**

**Per employee, per year (48 working weeks):**
9.1 × 48 = **436 hours** in meetings = **10.9 full working weeks**

**Dollar cost per employee per year:**
436 × $75 = **$32,700** spent in meetings

**For a 50-person company:**
$32,700 × 50 = **$1,635,000/year** spent in meetings

If half of those meetings are unproductive (as employees report), your company is burning **$817,500/year** in wasted meeting time.

## The Meeting Decision Tree

Before scheduling a meeting, run through this checklist:

### Could this be an email?
If you are sharing information that does not require real-time discussion, **send an email or Slack message.** Most "status update" meetings fall here.

### Could this be a document?
If you need input from multiple people but not simultaneously, **create a shared doc** and let people comment on their own time.

### Does this need everyone?
Most meetings have 2-3 essential attendees and 5-6 "just in case" attendees. **Invite only the decision-makers.** Send notes to everyone else.

### Does this need an hour?
The default calendar block is 60 minutes. But most 1-hour meetings have 20 minutes of actual content and 40 minutes of rambling. **Default to 25 minutes.** Extend only if needed.

## Meeting Best Practices (If You Must Meet)

### 1. Require an Agenda
No agenda = no meeting. Period. If you cannot articulate the purpose and desired outcome in 3 bullet points, you do not need a meeting.

### 2. Start on Time
Waiting 5 minutes for stragglers costs: 5 min × 8 people = 40 person-minutes wasted. **Start at the scheduled time regardless of who is present.**

### 3. End with Action Items
Every meeting should produce:
- WHO is doing WHAT by WHEN?
- If no action items exist, the meeting was informational and should have been an email.

### 4. No-Meeting Blocks
Protect 2-4 hour blocks on your calendar for deep work. Many companies (Shopify, Asana) have implemented "No Meeting Wednesdays" with dramatic productivity improvements.

## Calculate Before You Schedule

Next time you are about to send that meeting invite, plug in the numbers first. See the dollar cost. Then ask yourself: *"Is this discussion worth $600?"*

[Calculate Your Meeting Cost](/productivity/meeting-cost)
`},{id:"21",slug:"50-30-20-budgeting-rule-guide",title:"The 50/30/20 Rule: The Simplest Budget That Actually Works",excerpt:"Most budgets fail because they are too complicated. The 50/30/20 rule splits your after-tax income into three buckets — Needs, Wants, and Savings — and it takes five minutes to set up. Here is the complete guide.",date:"2026-02-25",displayDate:"February 25, 2026",readTime:"9 min read",category:"Finance",relatedToolLink:"/finance/savings-goal",relatedToolName:"Savings Goal Calculator",content:`
## Why Most Budgets Fail

You download a budgeting app. You categorize every latte, every Uber, every $2.99 subscription. By day three you are drowning in categories. By week two, you have stopped logging entirely.

Sound familiar?

The problem is not willpower. The problem is **complexity.** Traditional budgets ask you to track 30+ categories. That is not a budget. That is a part-time job.

The 50/30/20 rule takes a fundamentally different approach: **three buckets. That is it.**

## The Framework

Senator Elizabeth Warren popularized this rule in her 2005 book *All Your Worth*. The concept is beautifully simple:

> **50% → Needs** (things you must pay)
> **30% → Wants** (things you choose to pay)
> **20% → Savings & Debt** (building your future)

These percentages are applied to your **after-tax income** (take-home pay), not your gross salary.

## Breaking Down Each Bucket

### 50% — Needs (The Non-Negotiables)

These are expenses that would exist even if you lived the most boring life possible:

- **Housing:** Rent or mortgage payment (including property tax and insurance)
- **Utilities:** Electricity, water, gas, internet (basic plan)
- **Groceries:** Food you cook at home (not DoorDash)
- **Transportation:** Car payment, gas, insurance, public transit
- **Insurance:** Health, auto, renter's/homeowner's
- **Minimum debt payments:** Student loans, credit cards (minimums only)
- **Childcare:** If you need it to work

**The Test:** If you did not pay this, would something bad happen (eviction, repossession, lawsuit)? If yes, it is a Need.

### 30% — Wants (The Fun Stuff)

This is everything you *choose* to spend money on but could technically live without:

- **Dining out & takeout**
- **Entertainment:** Netflix, Spotify, concerts, games
- **Shopping:** Clothes beyond basics, gadgets, home decor
- **Gym membership** (you could exercise outside for free)
- **Vacations & travel**
- **Hobbies:** Golf, photography, woodworking
- **Upgraded services:** Premium phone plan, faster internet

**The Test:** If you cancelled this tomorrow, would your life be inconvenienced but not endangered? If yes, it is a Want.

### 20% — Savings & Debt Payoff (Future You)

This is the bucket that builds wealth:

- **Emergency fund contributions** (aim for [3-6 months of expenses](/blog/emergency-fund-guide))
- **Retirement accounts:** 401(k), IRA, Roth IRA
- **Investing:** Brokerage accounts, index funds
- **Extra debt payments:** Anything above the minimum on student loans, credit cards, etc. (see our [Snowball vs Avalanche guide](/blog/debt-snowball-vs-avalanche))
- **Savings goals:** Down payment fund, vacation fund, new car fund

**The Test:** Does this payment make Future You richer or more secure? If yes, it goes here.

## Real-World Example

Let's say your monthly take-home pay is **$5,000**.

| Bucket | Percentage | Amount | Example Breakdown |
|--------|-----------|--------|-------------------|
| Needs | 50% | $2,500 | Rent $1,400 + Utilities $200 + Groceries $400 + Car $300 + Insurance $200 |
| Wants | 30% | $1,500 | Dining $300 + Entertainment $100 + Shopping $200 + Gym $50 + Travel $400 + Other $450 |
| Savings | 20% | $1,000 | 401(k) $500 + Emergency Fund $200 + Roth IRA $300 |

That is it. Three numbers to track. If your Needs are under $2,500, your Wants are under $1,500, and you are saving at least $1,000 — you are winning.

## The Tricky Categorizations

Some expenses live in a gray area. Here is how to think about them:

### Gym Membership ($50/month)
**Want.** You can exercise for free (running, bodyweight workouts, YouTube). A gym is a convenience upgrade.

### Phone Bill ($80/month)
**Split it.** A basic phone plan ($30) is a Need in 2026. The $50 premium upgrade for unlimited data and a new iPhone? That is a Want.

### Netflix ($15/month)
**Want.** Entertainment is always a Want, no matter how essential it feels.

### Student Loan Payment ($400/month)
**Split it.** The minimum payment ($250) is a Need. The extra $150 you throw at it? That is Savings & Debt Payoff (the 20% bucket).

### Pet Expenses ($100/month)
**Need.** You made a commitment. Food and vet care for your pet are non-negotiable.

## Adapting for High-Cost Cities

If you live in San Francisco, New York, or London, your housing alone might eat 40% of your income. The 50% Needs bucket can feel impossible.

**Modified ratios for high-cost areas:**

- **60% Needs / 20% Wants / 20% Savings** — Squeeze your Wants, protect your Savings
- **55% Needs / 25% Wants / 20% Savings** — Moderate compromise

The key rule: **Never sacrifice the 20% savings.** That is your lifeline. If your Needs exceed 50%, cut Wants first. If Wants are already minimal, it is time to either increase income or consider relocating.

## Pay Yourself First

Most people budget like this:

> Income → Bills → Spending → Save whatever is left

The problem? There is never anything left.

**Flip the script:**

> Income → **Savings (20%)** → Bills → Spend the rest

Set up automatic transfers on payday. Before you even see the money, your 20% is gone — invested, saved, working for you.

This is called **"Pay Yourself First"** and it is the single most powerful budgeting habit. It removes willpower from the equation entirely.

## How to Automate the Entire System

### Step 1: Calculate Your Numbers
Use our **Savings Goal Calculator** to determine exactly how much your 20% should be, and how long it takes to hit your target (emergency fund, down payment, retirement milestone).

### Step 2: Set Up Auto-Transfers on Payday
- **Savings account:** 10% of take-home (emergency fund / goals)
- **Investment account:** 10% of take-home (401(k) or brokerage) — learn about [real returns vs inflation](/blog/compound-interest-inflation-monster)
- **Bills account:** 50% of take-home (Needs)
- **Spending account:** 30% remains (Wants)

### Step 3: Forget About It
Seriously. Once automated, you do not need to track every coffee. You do not need spreadsheets. Your system handles it.

Check in once a month to make sure the ratios still make sense. That is your entire "budget review."

## Common Objections

### "I cannot save 20% right now."
Start with 5%. Then increase by 1% every month. In a year you are at 17%. The habit matters more than the number.

### "My income is irregular (freelancer)."
Use your **lowest-earning month** from the past year as your baseline. Budget 50/30/20 on that number. In good months, put the surplus into savings.

### "I have too much debt."
The 20% bucket includes debt payoff. If you have high-interest credit card debt (20%+ APR), consider temporarily going to **50/20/30** — splitting 30% to aggressive debt payoff and 20% to wants — until the toxic debt is gone.

## The Bottom Line

The best budget is the one you actually follow.

The 50/30/20 rule works because it is simple enough to remember, flexible enough to adapt, and automated enough to maintain.

Stop overthinking your finances. **Three buckets. One automated system. Five minutes to set up.**

[Set Your Savings Goal](/finance/savings-goal)
`},{id:"22",slug:"tipping-guide-how-much-to-tip-2026",title:"2026 Tip Chart: Exactly How Much to Tip (Uber Eats, Restaurants, Delivery & More)",excerpt:"Updated for 2026. Tip 15%, 18%, or 20%? See the exact amounts for every service — restaurants, Uber Eats, delivery, salons, rideshare, and movers. Includes printable tip chart and calculator.",date:"2026-02-26",displayDate:"February 26, 2026",readTime:"9 min read",category:"Productivity",relatedToolLink:"/productivity/tip-calculator",relatedToolName:"Tip Calculator",content:`
## The Tipping Crisis

Something strange happened in the 2020s. Tipping went from a simple 15-20% at restaurants to an ever-present guilt machine.

You order a black coffee. The tablet spins around: **18%, 22%, 25%?** You grab a bottle of water at a convenience store. **Tip?** You pick up your own takeout. **Tip??**

According to a 2025 Bankrate survey, **66% of Americans** say tipping culture has gotten out of control. Yet nobody wants to be "that person" who stiffs the barista.

Let's bring sanity back with actual guidelines.

## The Standard Tipping Rules

### Full-Service Restaurants: 15-20%

This is the bedrock. Your server earns **$2.13/hour** in many states (the federal tipped minimum wage). Tips are not a bonus — they are the paycheck.

- **15%:** Acceptable service.
- **18%:** Good service (this is the new baseline).
- **20%:** Great service.
- **25%+:** Exceptional or you are a regular who wants to be remembered.

**Math tip:** To calculate 20% instantly, move the decimal one place left (that is 10%), then double it.

$85 bill → $8.50 → × 2 = **$17 tip**.

Or just use our **Tip Calculator** which handles split bills and custom percentages.

### Coffee Shops & Counter Service: $1-2 or 0-15%

This is where it gets controversial. Counter-service workers typically earn full minimum wage (not the tipped minimum).

- **Drip coffee / simple order:** $1 or skip.
- **Complex drink (latte art, multiple modifications):** $1-2 or 15%.
- **You are a daily regular:** Tip consistently. They remember.

You should **not** feel guilty pressing "No Tip" for a bottle of water.

### Food Delivery (Uber Eats, DoorDash, Grubhub): 15-20%

Delivery drivers use their own car, pay for their own gas, and deal with traffic so you don't have to.

- **Standard order:** 15-18% or $5 minimum (whichever is higher).
- **Bad weather, late night, large order:** 20%+.
- **Pre-tip vs post-tip:** Many apps ask you to tip before delivery. Tip at least 15% to ensure someone actually picks up your order.

#### Uber Eats Tipping Rates in 2026

Uber Eats drivers often earn less than you think after the platform takes its cut. Here is what to tip in 2026:

| Order Size | Recommended Tip | Why |
|---|---|---|
| Small (under $15) | $3-5 flat | Percentage tips on small orders are too low to cover driver costs |
| Medium ($15-40) | 18-20% | Standard delivery effort |
| Large ($40-80) | 15-18% | Larger orders already generate a higher base fee |
| Catering ($80+) | 15% + extra for stairs/setup | Heavy, multiple bags, often requires extra trips |

**Key rules for app-based delivery:**
- **Always tip in the app** (not cash) — drivers see the tip before accepting, and low/no-tip orders sit undelivered.
- **Bad weather or holidays?** Add $2-5 extra. Drivers are out in the rain so you are not.
- **Late delivery?** Tip the driver anyway — delays are usually the restaurant's fault, not the driver's.

### Rideshare (Uber/Lyft): 15-20%

Drivers earn roughly $10-15/hour after expenses. A tip makes a real difference.

- **Standard ride:** 15-20% or $3-5 minimum.
- **Airport with luggage:** 20%.
- **They waited for you or took a special route:** 20%+.

### Hair Salon / Barber: 15-25%

- **Standard cut:** 20%.
- **Color, highlights, complex styling:** 20-25%.
- **The salon owner:** Traditionally, you didn't tip the owner. This norm is changing — 10-15% for owners is increasingly common.

### Hotel Housekeeping: $2-5/night

This is the most under-tipped service in America. Leave cash daily (not just at checkout) because different staff may clean your room each day.

### Movers: $20-50/person

Moving is brutal physical labor. Tip each mover individually.

- **Small move (studio/1BR):** $20-25/person.
- **Large move (3BR+, stairs, heavy items):** $40-50/person.

## The Tipping Math Nobody Talks About

### Pre-Tax vs Post-Tax

Should you tip on the pre-tax amount or the total with tax?

**Technically:** Pre-tax. The server did not cook your sales tax.

**Practically:** Most people tip on the total because it is easier. On a $100 meal with 8% tax, the difference between tipping 20% pre-tax ($20) and post-tax ($21.60) is $1.60. Not worth the mental gymnastics.

### Splitting Bills

This is where tipping gets messy. Five friends, separate items, shared appetizers, different drink tabs.

> **Pro tip:** Calculate the tip on the **total bill**, then split evenly. Individual item-by-item tipping almost always shortchanges the server due to rounding.

Our **Tip Calculator** has a built-in bill split feature that handles this instantly.

## When NOT to Tip

Not every situation requires a tip:

- **Retail purchases** (clothing stores, electronics).
- **Fast food drive-through.**
- **Self-checkout.**
- **Professional services** (doctors, lawyers, accountants).
- **Government employees** (mail carriers at holidays are an exception — up to $25 gift is acceptable).

## The International Perspective

American tipping culture is an outlier. In most countries:

- **Japan:** Tipping is considered **rude**. It implies the service was charity.
- **Europe:** Service charge is typically included. Round up or leave 5-10% for exceptional service.
- **Australia:** Tipping is not expected. Workers earn living wages ($23+/hour minimum).
- **Middle East:** 10-15% is customary at restaurants.

If you travel frequently, understanding local norms saves you from both over-tipping and offending.

## The Real Cost of Tipping on Your Budget

If you eat out 3 times a week with an average bill of $50 and tip 20%:

- **Weekly tip spend:** $30
- **Monthly:** $130
- **Annually:** $1,560

That is a significant budget line item. Compare your dining and tipping spend against the [50/30/20 budgeting rule](/blog/50-30-20-budgeting-rule-guide) — tips come from your 30% "Wants" bucket.

Understanding your effective [hourly rate](/blog/salary-vs-hourly-real-comparison) also puts tip amounts in perspective.

## Calculate Any Tip Instantly

Stop doing mental math. Enter the bill, pick your percentage, split among friends, and see the exact amount per person.

[Open Tip Calculator](/productivity/tip-calculator)
`},{id:"23",slug:"gpa-guide-good-gpa-colleges-employers-2026",title:"Is Your GPA Good Enough? What Colleges and Employers Actually Look For in 2026",excerpt:"Your GPA matters — but not in the way you think. A 3.5 is golden for some paths and irrelevant for others. Here is what colleges, grad schools, and employers actually care about, with the math behind weighted vs unweighted GPA.",date:"2026-02-27",displayDate:"February 27, 2026",readTime:"10 min read",category:"Productivity",relatedToolLink:"/productivity/gpa",relatedToolName:"GPA Calculator",content:`
## The GPA Obsession

Every semester, millions of students ask the same question: *"Is my GPA good enough?"*

The answer, frustratingly, is: **"Good enough for what?"**

A 3.0 GPA can get you into excellent state universities, land solid jobs, and lead to a great career. A 4.0 GPA might be required for Harvard Medical School. Context is everything.

Let's break down what "good" actually means across different paths.

## How GPA Is Calculated

### Unweighted GPA (4.0 Scale)

The standard scale:

| Letter Grade | Grade Points |
|---|---|
| A / A+ | 4.0 |
| A- | 3.7 |
| B+ | 3.3 |
| B | 3.0 |
| B- | 2.7 |
| C+ | 2.3 |
| C | 2.0 |
| D | 1.0 |
| F | 0.0 |

> **GPA = Total Grade Points ÷ Total Credit Hours**

**Example:** If you take 5 courses (3 credits each) and earn A, B+, A-, B, A:

(4.0 + 3.3 + 3.7 + 3.0 + 4.0) × 3 = 54.0 grade points ÷ 15 credit hours = **3.6 GPA**

### Weighted GPA (5.0 Scale)

Many high schools add a full point for AP/IB courses:

- An **A in AP Chemistry** = 5.0 (instead of 4.0)
- A **B in AP History** = 4.0 (instead of 3.0)

This is why you see GPAs above 4.0. A student with a 4.3 weighted GPA took challenging courses and earned mostly A's and B+'s.

**Important:** Colleges recalculate your GPA using their own system. A 4.5 weighted GPA does not mean what you think it means — they strip the weighting and look at the raw grades in context.

## What Colleges Actually Want

### Top 20 Universities (Ivy League, Stanford, MIT)

- **GPA:** 3.9+ unweighted (with the most rigorous courseload available)
- **But GPA is only ~30-40% of the decision.** They care equally about essays, extracurriculars, recommendations, and test scores.
- A 4.0 with no activities loses to a 3.8 with genuine passion projects.

### Top 50 Universities

- **GPA:** 3.5-3.9 unweighted.
- **Course rigor matters.** A 3.5 with 8 AP courses beats a 3.9 with zero AP courses.

### State Universities (Flagship)

- **GPA:** 3.0-3.5 for competitive admits.
- **Many have automatic admission** above a certain GPA (e.g., University of Texas guarantees admission to top 6% of class).

### Community College → Transfer Path

- **GPA:** 2.0+ for admission (open enrollment).
- **Transfer GPA:** 3.0-3.5 to transfer to a 4-year university.
- This is one of the most underrated paths in education. Save $40,000 on the first two years, then transfer to the same school.

## What Grad Schools Want

### Medical School

- **Average MCAT + GPA for admitted students:** 3.73 GPA (AAMC 2024 data).
- Science GPA (BCPM) is weighted separately and often scrutinized more closely.
- Below 3.5? Not impossible, but you need a stellar MCAT and compelling narrative.

### Law School

- **Top 14 law schools:** 3.7+ GPA.
- LSAT score is weighted equally or more than GPA.
- GPA trends matter — an upward trend (3.0 freshman year → 3.8 senior year) is viewed favorably.

### MBA Programs

- **Top 10 programs (HBS, Wharton):** 3.6+ average.
- Work experience (3-5 years) matters more than GPA at this level.
- **Below 3.0?** Many top programs will still consider you with a strong GMAT and resume.

## What Employers Actually Look For

Here is the truth most career counselors will not tell you:

### Your First Job

- **GPA matters for:** Investment banking, consulting, Big 4 accounting, some tech companies.
- **Typical cutoff:** 3.0-3.5 minimum to pass the resume screen.
- **Google, Apple, many tech companies:** Have officially dropped GPA requirements.

### After 2-3 Years of Experience

- **GPA is irrelevant.** Nobody cares. Your work experience, skills, and results speak for themselves.
- Remove your GPA from your resume after your first promotion.

### The Exceptions

Some fields check GPA throughout your career:
- Federal government jobs (some agencies).
- Academic positions.
- Certain engineering certifications.

## How to Improve Your GPA

### The Credit-Hour Leverage Effect

Not all grades impact your GPA equally. A 4-credit course affects your GPA **twice as much** as a 2-credit course.

**Strategy:** If you are recovering from a bad semester, load up on courses where you can earn A's in **high credit-hour classes**.

### The Semester Reset

Your cumulative GPA gets harder to move the more credits you have. With 15 credits, one bad grade swings your GPA by ~0.3. With 90 credits, the same grade moves it ~0.05.

**Implication:** Early semesters matter more. A bad freshman year takes 2+ years of straight A's to recover from.

### Grade Replacement Policies

Many schools let you retake a course and replace the old grade. Check your university's policy — this is the single most effective GPA repair tool.

## The GPA Optimization Mindset

Instead of asking "how do I get a perfect GPA," ask:

1. **What is my target?** (3.5 for most goals, 3.8+ for elite grad schools)
2. **What is my current trajectory?** Use our calculator to project your cumulative GPA.
3. **Where can I gain the most ground?** Focus on high-credit courses where you can earn A's.

A student with a 3.5 who spent time on internships, research, and leadership will outperform a 4.0 student with no real-world experience — every time.

## Calculate Your GPA

Stop guessing. Enter your courses, credits, and grades. See your semester and cumulative GPA instantly, and project what you need next semester to hit your target.

[Calculate Your GPA](/productivity/gpa)
`},{id:"24",slug:"time-to-millionaire-wealth-building-math",title:"How Long to Become a Millionaire? Calculator + Timeline by Savings Rate (2026)",excerpt:"Enter your age and savings rate to see your exact millionaire timeline. At $500/month you hit $1M in 26 years. At $2,000/month? Just 18. Real math — not motivational fluff.",date:"2026-02-28",displayDate:"February 28, 2026",readTime:"10 min read",category:"Finance",relatedToolLink:"/finance/time-to-millionaire",relatedToolName:"Time to Millionaire Calculator",content:`
## The Millionaire Next Door

When you hear "millionaire," you picture Lamborghinis and mansions. But the average American millionaire drives a Toyota, lives in a modest home, and built their wealth over 20-30 years of consistent saving and investing.

According to the National Study of Millionaires (Ramsey Solutions, 2024):
- **79%** of millionaires did NOT inherit their wealth.
- The average millionaire reached 7 figures at age **49**.
- The #1 wealth-building tool? Their **employer-sponsored 401(k)**.

The secret is not a six-figure salary. It is **time in the market** and **consistent contributions**. And the math is more achievable than you think.

## The Magic Formula

The future value of regular investments is calculated with this formula:

> **FV = PMT × [((1 + r)^n - 1) / r]**

Where:
- **FV** = Future value ($1,000,000)
- **PMT** = Monthly contribution
- **r** = Monthly return rate
- **n** = Number of months

Don't worry about memorizing this. Our calculator does it for you. But understanding the variables is powerful.

## The Three Levers

### Lever 1: Starting Amount

Starting with $0 vs $50,000 can shave 5-7 years off your timeline. Even a small head start matters enormously because those early dollars have the longest time to compound.

**$10,000 invested at age 25 at 10% annual return:**
- At age 65: **$452,592** — from a single deposit.

That is the power of time. Those dollars worked for 40 years while you did nothing.

### Lever 2: Monthly Contribution

This is the lever you have the most control over. Here is how monthly savings translates to millionaire timelines (assuming 10% annual return, starting from $0):

| Monthly Investment | Years to $1M |
|---|---|
| $200 | 38.8 years |
| $500 | 30.0 years |
| $1,000 | 23.4 years |
| $1,500 | 19.5 years |
| $2,000 | 17.0 years |
| $3,000 | 13.5 years |

**Key insight:** Doubling your contribution does not halve the time. Going from $500 to $1,000/month saves you 6.6 years. Going from $2,000 to $4,000 saves only ~5 years. This is because compound interest does more heavy lifting as time increases.

### Lever 3: Rate of Return

Your investment return dramatically changes the timeline:

| Monthly Investment | 6% Return | 8% Return | 10% Return | 12% Return |
|---|---|---|---|---|
| $500 | 41.6 years | 34.3 years | 30.0 years | 26.3 years |
| $1,000 | 33.4 years | 27.6 years | 23.4 years | 20.5 years |

**Historical context:**
- **S&P 500:** ~10% average annual return (1926-2025)
- **Total US Bond Market:** ~5-6% average
- **High-Yield Savings Account:** ~4-5% (2025)
- **Under your mattress:** 0% (actually -3% after inflation)

The difference between a savings account (5%) and the stock market (10%) is **12+ years** of your life for the same contribution amount.

## The Compound Interest Avalanche

Here is why starting early matters more than starting big:

### Scenario A: Start at 25, invest $500/month until 65
- Total contributed: $240,000
- Portfolio value at 65 (10% return): **$2,655,555**
- **Growth from interest: $2,415,555** (91% of your wealth came from compound interest, not your contributions)

### Scenario B: Start at 35, invest $1,000/month until 65
- Total contributed: $360,000
- Portfolio value at 65 (10% return): **$2,171,321**

**Person A invested $120,000 LESS and ended up $484,234 RICHER.** That is the cost of waiting 10 years.

This is what Einstein (allegedly) called the eighth wonder of the world. Your money makes money, which makes more money.

Read more about how compound interest battles inflation in our deep dive on [Real Returns vs The Inflation Monster](/blog/compound-interest-inflation-monster).

## The "But I Cannot Afford to Invest" Objection

If $500/month sounds impossible, start with what you can:

- **$50/month** makes you a millionaire in about 48 years. Start at 22, millionaire by 70. Not glamorous, but it works.
- **$100/month** gets you there in ~42 years.

The key is **starting**. You can increase contributions as your income grows.

### The 1% Increase Strategy

Every time you get a raise, increase your investment by 1% of your salary.

**Example:** You earn $50,000 and currently invest 5% ($208/month).
- Year 1 raise (3%): Increase to 6% → $250/month
- Year 2 raise (3%): Increase to 7% → $300/month
- Year 5: You are investing 10% and barely noticed the change.

This is painless because you never "lose" money you already had. You simply redirect future raises.

## Real vs Nominal Millionaire

Here is the uncomfortable truth: **$1,000,000 in 30 years will not buy what $1,000,000 buys today.**

At 3% inflation, $1M in 30 years has the purchasing power of about **$412,000** in today's dollars.

Does that mean the goal is meaningless? No. It means:
1. Your actual target might be **$2-3M nominal** to be a "real" millionaire as we imagine it today.
2. The math still works — you just need to account for inflation in your timeline.

Use our **Time to Millionaire Calculator** with the inflation-adjusted toggle to see your *real* target.

Once you hit your number you can also check when you can stop working entirely with our [FIRE Calculator](/finance/fire) — the natural next step after hitting seven figures. And during the journey, make sure your investments are earning real returns above inflation using our [Investment Calculator](/blog/compound-interest-inflation-monster).

## The Action Plan

1. **Calculate your number.** Use our calculator to see exactly how many years it takes at your current savings rate.
2. **Open an investment account.** If you have a 401(k) with employer match, start there (it is free money).
3. **Automate.** Set up automatic monthly transfers. Remove yourself from the decision.
4. **Increase annually.** Use the 1% raise strategy above.
5. **Do not touch it.** The #1 enemy of wealth building is withdrawing early.

## See Your Millionaire Date

Enter your starting amount, monthly contribution, and expected return. See the exact date you will cross $1,000,000 — and watch the compound interest chart do its thing.

[Calculate Your Time to Millionaire](/finance/time-to-millionaire)
`},{id:"25",slug:"ideal-word-count-guide-2026",title:"The Ideal Word Count for Every Type of Writing in 2026",excerpt:"Is your blog post too short to rank? Is your email too long to be read? We break down the science-backed ideal word counts for blog posts, social media, emails, SEO pages, and more — and show you how to count yours in seconds.",date:"2026-03-02",displayDate:"March 2, 2026",readTime:"9 min read",category:"Productivity",relatedToolLink:"/productivity/word-counter",relatedToolName:"Word & Character Counter",content:`
## Does Word Count Actually Matter?

It depends who you ask.

Google's John Mueller has said explicitly: **"Word count is not a ranking factor."**

And he is technically correct. Google does not count words and reward the highest number.

But here is what *is* a ranking factor — **depth, quality, and how completely you answer the user's question**. And it just so happens that comprehensively covering a topic usually requires a certain number of words.

So word count is a *proxy*, not a *rule*. It is a signal of how much you said, not how well you said it.

With that framing, let's look at the research-backed sweet spots for every major type of writing.

## Blog Posts & Articles

This is the most studied category, and also the most misunderstood.

### The First-Page Average

Multiple studies (Backlinko, HubSpot, SEMrush) consistently find that the average content ranking on Google's first page is between **1,447 and 2,200 words**.

But averages are misleading. A single 5,000-word pillar page skews the average just as much as ten 800-word posts.

### The Framework That Works

| Post Type | Target Length | Why |
|---|---|---|
| News & Current Events | 400–700 words | Readers want facts fast |
| Opinion / Personal Essay | 800–1,200 words | Make your point and stop |
| How-To Guide | 1,500–2,500 words | Step-by-step needs space |
| SEO Blog Post | 1,500–2,500 words | Covers related questions |
| Listicle ("X best...") | 1,000–1,800 words | One section per item |
| Pillar / Cornerstone Content | 3,000–5,000+ words | Covers an entire topic |
| Product Review | 1,500–2,500 words | Pros, cons, verdict |

> **The Golden Rule:** Your post should be exactly as long as it needs to be to fully answer the question. Not a word shorter. Not one padded word longer.

## The "Fluffy Content" Problem

The biggest mistake new bloggers make is hitting a word count by adding *fluff*.

Phrases like:
- "In this article, we will be exploring..."
- "That is a great question!"
- "As we mentioned above..."
- "Without further ado..."

These add words but subtract value. Google's Helpful Content system is specifically trained to detect and penalize content written for word count rather than for humans.

**Quality beats quantity, every single time.**

## Social Media Character Limits

Unlike long-form content, social media is all about *constraints*. Each platform forces you to be concise.

| Platform | Character Limit | Optimal Length |
|---|---|---|
| Twitter / X | 280 characters | 71–100 characters (most clicks) |
| LinkedIn Post | 3,000 characters | 1,300–1,700 characters |
| Instagram Caption | 2,200 characters | 138–150 characters (above fold) |
| Facebook Post | 63,206 characters | ~40–80 characters (most reach) |
| YouTube Description | 5,000 characters | 250 words in the first paragraph |
| Pinterest Description | 500 characters | 150–300 characters |

> **Pro tip:** Instagram only shows about 125 characters before the "...more" cut-off. Front-load your hook.

You can check your social copy against all these limits in real time using our [Word & Character Counter](/productivity/word-counter) — it shows progress bars for each platform.

## Email Subject Lines & Body Copy

Email is where word count has the most direct, measurable impact on a single metric: **open rate** and **click-through rate**.

### Subject Lines
- **Optimal length:** 6–10 words / 41–50 characters
- Subject lines with 6–10 words have the highest open rate (~21%)
- Subject lines over 70 characters get cut off on mobile
- **Keep it under 50 characters** to be safe on all devices

### Email Body
- **Newsletters:** 200–500 words. Get to the point.
- **Promotional emails:** 50–125 words. One CTA, one message.
- **Onboarding sequences:** 300–500 words. Teach one concept per email.
- **Cold outreach:** Under 150 words. Respect their time.

Long emails are deleted. Concise emails are read.

## SEO-Specific Content Types

### Meta Descriptions
- **Maximum:** 160 characters
- **Ideal:** 150–155 characters (use every character)
- Anything over 160 gets truncated by Google with "..."
- This is your ad copy — make it compel the click

### Page Titles / Title Tags
- **Maximum:** 60 characters
- **Ideal:** 50–60 characters
- Google typically cuts off titles at ~600px (about 60 characters)
- Put the primary keyword near the front

### URL Slugs
- Keep them short: 3–5 words
- No stop words (the, a, an, and)
- Example: "/productivity/word-counter" not "/the-best-free-online-word-and-character-counter-tool"

## Academic & Professional Writing

For students and professionals, word counts are often *requirements*, not suggestions.

### Standard Lengths by Document Type

| Document | Typical Length |
|---|---|
| Essay (High School) | 500–1,000 words |
| Essay (College) | 1,500–3,000 words |
| Research Paper | 3,000–8,000 words |
| Thesis | 10,000–100,000 words |
| Business Proposal | 2,000–5,000 words |
| Executive Summary | 300–500 words |
| Resume | 400–600 words (1 page) |
| Cover Letter | 250–400 words (3 paragraphs) |

> **For essays:** Always aim for the middle of the range. "1,500 to 2,000 words" means 1,750 is ideal — not 1,510 trying to squeak through.

## Reading Time: Why It Matters

Many modern platforms (Medium, Substack, LinkedIn Articles) show estimated reading time. Readers use this to decide if they have time to engage.

The average adult reads at **238 words per minute**.

| Word Count | Reading Time |
|---|---|
| 500 words | ~2 min |
| 1,000 words | ~4 min |
| 1,500 words | ~6 min |
| 2,000 words | ~8 min |
| 2,500 words | ~11 min |
| 5,000 words | ~21 min |

Research from Medium found that the ideal reading time for maximum engagement is **7 minutes** — which corresponds to roughly **1,600 words**.

This is why so many successful blog posts cluster around the 1,500–2,000 word range. It is not arbitrary. It is the sweet spot where readers feel they got value without giving up 20 minutes of their day.

## How to Check Your Word Count Instantly

Enough theory. Here is how to put it into practice.

Our **Word & Character Counter** gives you:

1. **Word count** — real-time as you type or paste
2. **Character count** (with and without spaces)
3. **Sentence and paragraph count**
4. **Estimated reading time** at 238 WPM
5. **Platform character limits** — visual progress bars for Twitter, LinkedIn, Instagram, SMS, and SEO meta tags
6. **"Try sample text"** to see it in action instantly

It is 100% private. Your text never leaves your browser.

[Count Your Words Now](/productivity/word-counter)
`},{id:"29",slug:"investment-calculator-inflation-guide-2026",title:"How to Use an Investment Calculator with Inflation in 2026: See Your Real Returns",excerpt:"That 8% annual return looks great on paper — until inflation eats half of it. Learn how to calculate real investment returns using an inflation-adjusted investment calculator, and why ignoring inflation is the biggest mistake new investors make.",date:"2026-03-03",displayDate:"March 3, 2026",readTime:"10 min read",category:"Finance",relatedToolLink:"/finance/investment",relatedToolName:"Investment Calculator",content:`
## The $1 Million Illusion

You open your brokerage app in 2055. It says **$1,000,000**. You pop champagne.

But here is the problem: a gallon of milk costs $14. A modest house costs $900,000. Your "million" buys what $400,000 buys today.

You didn't fail. You just forgot to account for **inflation**.

This is why every serious investor needs an **investment calculator with inflation** — not just a basic compound interest tool.

## What Inflation Actually Does to Your Portfolio

Inflation is the steady erosion of purchasing power over time. At a seemingly harmless 3% annual rate:

| Years | $100 Buys Today's Equivalent Of |
|---|---|
| 5 years | $86 |
| 10 years | $74 |
| 20 years | $55 |
| 30 years | $41 |

That means if you retire in 30 years with $1 million in nominal terms, you have roughly **$410,000** in today's purchasing power.

This is not a worst-case scenario. This is the *average* scenario based on historical U.S. inflation data.

## Nominal Returns vs. Real Returns: The Critical Difference

This is the single most important concept for long-term investors.

- **Nominal Return**: The raw percentage your investment grows. "The S&P 500 returned 10% this year."
- **Real Return**: The growth *after* subtracting inflation. "After 3% inflation, my real return was 7%."

### The Formula

> **Real Return ≈ Nominal Return − Inflation Rate**

(The exact formula uses division, but subtraction gives a close approximation.)

### Why This Matters

If you're using a basic compound interest calculator that shows your $500/month growing to $1.2 million over 30 years at 8% — that number is **misleading**.

An inflation-adjusted investment calculator would show you that $1.2 million is worth roughly **$500,000 in today's dollars** at 3% inflation.

Still a great number. But very different from $1.2 million.

## Historical Context: What Asset Classes Actually Return

Here is how different investments have performed historically, *after* inflation:

| Asset Class | Nominal Return | Real Return (After Inflation) |
|---|---|---|
| U.S. Stocks (S&P 500) | ~10% | ~7% |
| International Stocks | ~8% | ~5% |
| Bonds (10-Year Treasury) | ~5% | ~2% |
| Cash (Savings Account) | ~2–4% | ~0% (or negative) |
| Gold | ~7% | ~4% |
| Real Estate | ~8–10% | ~5–7% |

> **Key Insight**: Cash in a savings account earning 4% with inflation at 3.5% gives you a real return of 0.5%. You are barely treading water. You are *safely going nowhere*.

For a deeper dive into why compound interest fights the inflation monster, read our guide on [Compound Interest vs. Inflation](/blog/compound-interest-inflation-monster).

## How Our Investment Calculator Handles Inflation

Our **Investment Calculator** is purpose-built for this exact problem. Here is what sets it apart:

### 1. Inflation-Adjusted Toggle
Click "Show Real Value" and instantly see your future balance in **today's purchasing power**. No mental math. No spreadsheets.

### 2. Custom Inflation Rate
We default to 3% (the long-term U.S. average), but you can adjust it to model different scenarios:
- **2%**: Fed's target rate (optimistic)
- **3%**: Historical average (realistic)
- **4–5%**: Recent elevated inflation (stress-test)

### 3. Visual Chart Comparison
The chart shows two lines side by side:
- 📈 **Blue line**: Nominal value (what your statement says)
- 📈 **Green line**: Real value (what it actually buys)

The gap between these two lines is the "Inflation Tax" — and it grows exponentially over time.

## A Practical Example

Let's say you are 28 years old and you invest **$500/month** into a diversified stock portfolio until age 60 (32 years).

### Without Inflation Adjustment
- Monthly contribution: $500
- Annual return: 8%
- **Final balance: $1,013,562**

### With 3% Inflation Adjustment
- Same inputs
- **Real value: $394,247 in today's dollars**

That is a **61% gap**. The money is real. You will have over a million in your account. But a loaf of bread might cost $8 by then.

This is not meant to discourage you. It is meant to help you **plan accurately**.

If your retirement goal is $1 million in today's purchasing power, you actually need to target around **$2.6 million in nominal terms** (at 3% inflation over 32 years).

## 5 Strategies to Beat Inflation

### 1. Invest in Equities
Stocks are the most reliable inflation hedge over long periods. The S&P 500 has outpaced inflation in every 20-year rolling period in modern history.

### 2. Increase Contributions Over Time
If you get a 3% raise each year, increase your investment contributions by 3%. This keeps your *real* contributions constant instead of letting inflation erode them.

### 3. Consider TIPS (Treasury Inflation-Protected Securities)
These government bonds adjust their principal based on CPI (Consumer Price Index). They guarantee a real return by design.

### 4. Own Real Assets
Real estate, commodities, and businesses tend to rise with inflation because their prices are directly linked to the cost of goods.

### 5. Avoid Long Holding Periods in Cash
Every year your money sits in a checking account, it loses 2–4% of its value. Move your emergency fund to a High-Yield Savings Account ([build your emergency fund first](/blog/emergency-fund-guide)), and invest the rest.

## The Bottom Line

An investment calculator without inflation is like a GPS without traffic data — it will show you a destination, but the arrival time is a fantasy.

**Use real returns. Plan for real life.**

Our calculator is 100% free, runs in your browser, and requires no signup.

[Open Investment Calculator](/finance/investment)
`},{id:"27",slug:"percentage-calculator-types-guide-2026",title:"Percentage Calculator: 5 Types You Actually Need (2026 Guide)",excerpt:"Most people only know one way to calculate percentages. But there are 5 distinct types — and each solves a different real-world problem. Here are the formulas, examples, and a free calculator for every one.",date:"2026-03-05",displayDate:"March 5, 2026",readTime:"10 min read",category:"Productivity",relatedToolLink:"/productivity/percentage",relatedToolName:"Percentage Calculator",image:"/images/blog/percentage-calculator-hero.png",content:`
## Why "How to Calculate Percentages" Gets 1 Million Searches a Month

Because percentages are everywhere. Sales tax. Tip at a restaurant. Your exam grade. Your salary raise. Inflation eating your savings.

But here is the thing most people miss: **there is not just one type of percentage calculation.** There are five. And mixing them up is how you overbid on a house, miscalculate your portfolio return, or tip 12% when you meant to tip 20%.

Let's break down every type you will actually use, with the formula and a real-world example.

## Type 1: Basic Percentage — "What is X% of Y?"

This is the one everyone knows. Finding a slice of a whole number.

> **Formula: (Percentage / 100) × Total = Result**

### Real-World Examples

| Scenario | Calculation | Answer |
|----------|-------------|--------|
| 20% tip on a $85 dinner | (20 / 100) × 85 | **$17.00** |
| 8.25% sales tax on a $1,200 laptop | (8.25 / 100) × 1,200 | **$99.00** |
| 15% discount on $250 shoes | (15 / 100) × 250 | **$37.50 off** |
| 30% down payment on $400,000 house | (30 / 100) × 400,000 | **$120,000** |

### Mental Math Shortcut

To find **10%** of any number, just move the decimal point one place left.

- 10% of $350 = **$35**
- From there, 20% = double it = **$70**
- And 5% = half of 10% = **$17.50**

This trick works at restaurants, stores, and anywhere you need a quick estimate without pulling out your phone.

## Type 2: Reverse Percentage — "Y is What Percent of X?"

This answers: *what proportion of the total does this part represent?*

> **Formula: (Part / Whole) × 100 = Percentage**

### Real-World Examples

| Scenario | Calculation | Answer |
|----------|-------------|--------|
| You scored 42 out of 50 on a test | (42 / 50) × 100 | **84%** |
| 12 of 40 employees are remote | (12 / 40) × 100 | **30%** |
| You spent $800 of your $3,200 paycheck on rent | (800 / 3,200) × 100 | **25%** |
| 7 out of 35 leads converted to sales | (7 / 35) × 100 | **20%** |

### Why This Matters

This is the type you need when tracking [savings rates](/blog/financial-independence-fire-math). If you earn $5,000/month and save $1,500, your savings rate is (1,500 / 5,000) × 100 = **30%** — which puts you on an aggressive FIRE path.

## Type 3: Percentage Change — "How Much Did It Go Up or Down?"

This is maybe the most practical type, and the one people get wrong the most.

> **Formula: ((New Value − Old Value) / Old Value) × 100 = % Change**

A **positive** result means an increase. A **negative** result means a decrease.

### Real-World Examples

| Scenario | Old | New | Calculation | Answer |
|----------|-----|-----|-------------|--------|
| Your rent went from $1,500 to $1,650 | $1,500 | $1,650 | ((1,650 − 1,500) / 1,500) × 100 | **+10%** |
| Gas dropped from $4.20 to $3.57 | $4.20 | $3.57 | ((3.57 − 4.20) / 4.20) × 100 | **−15%** |
| Stock went from $150 to $195 | $150 | $195 | ((195 − 150) / 150) × 100 | **+30%** |
| Your weight went from 200 lbs to 185 lbs | 200 | 185 | ((185 − 200) / 200) × 100 | **−7.5%** |

### The Asymmetry Trap

Here is a fact that trips up even smart people:

**A 50% loss requires a 100% gain to break even.**

If your $10,000 portfolio drops 50% to $5,000 — you need it to double (+100%) just to get back to $10,000.

This is why protecting capital matters. Use our [Investment Calculator](/finance/investment) to model scenarios with and without drawdowns.

## Type 4: Percentage Difference — "How Different Are Two Numbers?"

This compares two values when neither is clearly the "original." It is different from percentage *change* because there is no before/after.

> **Formula: (|Value 1 − Value 2| / ((Value 1 + Value 2) / 2)) × 100 = % Difference**

### When to Use This

| Scenario | Value 1 | Value 2 | % Difference |
|----------|---------|---------|--------------|
| Comparing two job offers: $85K vs $92K | $85,000 | $92,000 | **7.9%** |
| Two products: 500 cal vs 620 cal | 500 | 620 | **21.4%** |
| Test scores across two classes: 78 vs 84 | 78 | 84 | **7.4%** |

### Percentage Change vs. Percentage Difference

| Concept | When to Use | Formula Denominator |
|---------|-------------|---------------------|
| **Percentage Change** | One value is "before," the other is "after" | Old value |
| **Percentage Difference** | Comparing two independent values | Average of both values |

Getting these confused is a common mistake in business reporting. If your two stores earned $40K and $50K, the *difference* is 22.2%. But saying Store B is "25% more than Store A" is a *change* calculation — and it gives a different number.

## Type 5: Compound Percentage — "What Happens Over Multiple Periods?"

This is where percentage math gets powerful — and where most people get it wrong.

> If you get a 10% raise every year for 3 years, you do NOT earn 30% more. You earn **33.1%** more.

The formula for compound growth:

> **Final Value = Initial Value × (1 + Rate/100)^Periods**

### Example: Salary Growth

Starting salary: **$60,000**, 5% annual raise.

| Year | Salary | Total % Gain |
|------|--------|-------------|
| 0 | $60,000 | — |
| 1 | $63,000 | +5.0% |
| 2 | $66,150 | +10.3% |
| 3 | $69,458 | +15.8% |
| 5 | $76,577 | +27.6% |
| 10 | $97,734 | +62.9% |

After 10 years, that 5% annual raise turned into nearly **63% total growth** — not 50%.

This is the same principle behind compound interest. Our [Compound Interest Calculator](/finance/investment) visualizes exactly how this snowball effect works over 10, 20, or 30 years. If you are planning for retirement, understanding compounding is non-negotiable — see our [retirement savings guide](/blog/retirement-number-how-much-enough).

## Quick Reference: All 5 Types at a Glance

| # | Type | Question It Answers | Formula |
|---|------|---------------------|---------|
| 1 | Basic Percentage | What is 20% of 500? | (P / 100) × Total |
| 2 | Reverse Percentage | 42 is what % of 50? | (Part / Whole) × 100 |
| 3 | Percentage Change | How much did rent increase? | ((New − Old) / Old) × 100 |
| 4 | Percentage Difference | How different are two salaries? | (|A − B| / Avg) × 100 |
| 5 | Compound Percentage | What's my salary after 5 years of 5% raises? | Value × (1 + R)^n |

## Common Mistakes to Avoid

### 1. Adding Percentages That Shouldn't Be Added

A 20% discount followed by an additional 10% discount is **NOT** 30% off.

- Original price: **$100**
- After 20% off: **$80**
- After 10% off the new price: **$72**
- **Actual total discount: 28%**, not 30%.

### 2. Confusing "Percentage Points" with "Percent"

If interest rates go from 4% to 5%, that is:
- A **1 percentage point** increase
- But a **25% increase** in the rate itself (because (5 − 4) / 4 = 0.25)

Politicians and journalists love to exploit this ambiguity. Now you can spot it.

### 3. Forgetting to Convert Between Decimal and Percent

25% = 0.25. Always divide by 100 before plugging into formulas. This is the #1 calculation error worldwide.

## FAQ

### How do I calculate a percentage of a number?

Divide the percentage by 100 and multiply by the number. For example, 15% of 200 = (15 / 100) × 200 = 30. You can also use our free [Percentage Calculator](/productivity/percentage) for instant results.

### What is the formula for percentage change?

Percentage change = ((New Value − Old Value) / Old Value) × 100. A positive result means an increase, and a negative result means a decrease.

### What is the difference between percentage change and percentage difference?

Percentage change compares a "before" and "after" value using the old value as the base. Percentage difference compares two independent values using their average as the base. Use change when there is a time element; use difference when comparing two unrelated numbers.

### How do I reverse a percentage to find the original number?

If you know that a number Y is P% of the original, divide Y by (P / 100). For example, if $45 is 15% of the total bill, the total is $45 / 0.15 = $300.

### Why does a 50% loss need a 100% gain to recover?

Because the gain is calculated on the *reduced* amount. If $10,000 drops 50% to $5,000, a 50% gain on $5,000 only brings you to $7,500. You need 100% of $5,000 to get back to $10,000. This asymmetry is why [protecting your investments](/blog/compound-interest-inflation-monster) matters.

## Stop Guessing. Start Calculating.

Percentages are the language of money, health, and data. Knowing which type to use — and how to calculate it correctly — makes you better at negotiating raises, tracking your [budget](/blog/50-30-20-budgeting-rule-guide), spotting misleading statistics, and making smarter decisions.

Our calculator handles all 5 types instantly, no formulas required.

[Open Percentage Calculator](/productivity/percentage)
`},{id:"28",slug:"age-calculator-exact-age-guide-2026",title:"Age Calculator: How to Find Your Exact Age in Years, Months & Days (2026)",excerpt:"Need to know your exact age down to the day? Learn 3 methods to calculate your age — manually, in Excel, or with our free online tool. Plus, discover your zodiac sign and generational cohort.",date:"2026-03-05",displayDate:"March 5, 2026",readTime:"8 min read",category:"Productivity",relatedToolLink:"/productivity/age",relatedToolName:"Age Calculator",image:"/images/blog/age-calculator-hero.png",content:`
## Why You Might Need Your Exact Age

"How old are you?" seems like a simple question. But the answer depends on **when you ask it** — and how precise you need to be.

Here are real situations where knowing your exact age in years, months, and days actually matters:

| Situation | Why Exact Age Matters |
|-----------|----------------------|
| Passport or visa application | Many countries require age in years, months, and days |
| Retirement planning | Social Security benefits change by months, not just years |
| Insurance premiums | Rates shift on your exact birthday, not January 1 |
| Medical screening schedules | Colonoscopies, mammograms, etc. are triggered by precise age |
| Age-restricted activities | Driving, voting, drinking — the exact day matters |

Most people just subtract birth years. That gives you a rough number, but it can be off by an entire year depending on whether your birthday has passed yet.

Let's fix that.

## Method 1: Calculate Age Manually (Step-by-Step)

Here's the formula most online calculators use behind the scenes:

> **Age = Today's Date − Date of Birth**, adjusted for month and day.

### Step-by-Step Example

Suppose today is **March 5, 2026** and you were born on **July 18, 1993**.

| Step | Calculation | Result |
|------|-------------|--------|
| 1. Subtract years | 2026 − 1993 | 33 (preliminary) |
| 2. Compare months | March (3) vs. July (7) | March is before July |
| 3. Adjust for birthday not yet passed | 33 − 1 | **32 years** |
| 4. Months since last birthday | Aug → Mar = 7 months | **7 months** |
| 5. Remaining days | 18 → 5 (adjusted) | **15 days** |

**Result: 32 years, 7 months, 15 days.**

### The Leap Year Catch

If you were born on **February 29**, your birthday only occurs every 4 years. In non-leap years, most systems count March 1 as your birthday. Our [Age Calculator](/productivity/age) handles this automatically.

## Method 2: Calculate Age in Excel or Google Sheets

For bulk calculations (employee records, student lists, etc.), spreadsheet formulas are fastest.

### DATEDIF Formula (Works in Both Excel and Google Sheets)

| Cell | Formula | Returns |
|------|---------|---------|
| B2 | Birth date (e.g., 7/18/1993) | — |
| C2 | \`=DATEDIF(B2, TODAY(), "Y")\` | Years |
| D2 | \`=DATEDIF(B2, TODAY(), "YM")\` | Remaining months |
| E2 | \`=DATEDIF(B2, TODAY(), "MD")\` | Remaining days |
| F2 | \`=C2 & " years, " & D2 & " months, " & E2 & " days"\` | Full text |

> **Tip:** \`DATEDIF\` is an undocumented Excel function — it will not appear in autocomplete, but it works perfectly. Google Sheets supports it too.

### INT Formula (Alternative)

\`=INT((TODAY()-B2)/365.25)\` gives approximate age in years. The 365.25 accounts for leap years, but it is less precise than \`DATEDIF\` for months and days.

## Method 3: Use Our Free Online Age Calculator

The fastest option. Enter your birthdate and get instant results:

- **Exact age** in years, months, and days
- **Total days alive** (great for milestone celebrations)
- **Days until your next birthday**
- **Zodiac sign** and **generational cohort**
- **Day of the week** you were born on

No sign-up, no data collection, no ads in the way.

[Open Age Calculator →](/productivity/age)

## Bonus: What Generation Do You Belong To?

Your birth year places you in a generational cohort that shapes cultural identity, workplace expectations, and consumer behavior.

| Generation | Birth Years | Defining Traits |
|------------|-------------|-----------------|
| Silent Generation | Before 1946 | Discipline, institutional loyalty |
| Baby Boomers | 1946–1964 | Optimism, career-driven |
| Gen X | 1965–1980 | Independence, skepticism |
| Millennials | 1981–1996 | Tech-savvy, value experiences |
| Gen Z | 1997–2012 | Digital natives, social justice focus |
| Gen Alpha | 2013–present | AI-native, screen-first |

Our [Age Calculator](/productivity/age) automatically displays your generation based on your birthdate.

## Bonus: Your Zodiac Sign by Birthday

Your Western zodiac sign is determined by the month and day you were born:

| Sign | Symbol | Date Range |
|------|--------|------------|
| Capricorn | ♑ | Dec 22 – Jan 19 |
| Aquarius | ♒ | Jan 20 – Feb 18 |
| Pisces | ♓ | Feb 19 – Mar 20 |
| Aries | ♈ | Mar 21 – Apr 19 |
| Taurus | ♉ | Apr 20 – May 20 |
| Gemini | ♊ | May 21 – Jun 20 |
| Cancer | ♋ | Jun 21 – Jul 22 |
| Leo | ♌ | Jul 23 – Aug 22 |
| Virgo | ♍ | Aug 23 – Sep 22 |
| Libra | ♎ | Sep 23 – Oct 22 |
| Scorpio | ♏ | Oct 23 – Nov 21 |
| Sagittarius | ♐ | Nov 22 – Dec 21 |

Our [Age Calculator](/productivity/age) identifies your sign instantly — no charts required.

## Fun Age Milestones Worth Tracking

Want to celebrate something unusual? Here are some milestones most people miss:

| Milestone | Approximate Age | Why It is Cool |
|-----------|-----------------|----------------|
| 10,000 days old | ~27 years, 5 months | Your first five-digit day |
| 1 billion seconds | ~31 years, 8 months | One. Billion. Seconds. |
| 20,000 days old | ~54 years, 9 months | Half of 100 in days |
| 2 billion heartbeats | ~60 years | Based on ~70 bpm average |

Use the [Date Difference Calculator](/productivity/date-difference) to find the exact date of your next milestone.

## FAQ

### How do I calculate my exact age?

Enter your date of birth into our free [Age Calculator](/productivity/age). It computes your exact age in years, months, and days by comparing your birthdate to today's date, accounting for varying month lengths and leap years.

### How many days old am I?

Our calculator displays your total age in days alongside years, months, weeks, and hours. Simply enter your birthdate and the "Total Days" card shows the exact count. For example, a 30-year-old is approximately 10,957 days old.

### Does the age calculator handle leap years?

Yes. It uses full calendar arithmetic that correctly handles leap years (years divisible by 4, except century years not divisible by 400). It also notes whether you were born in a leap year.

### How do I calculate age in Excel?

Use the \`DATEDIF\` function: \`=DATEDIF(B2, TODAY(), "Y")\` returns full years, \`"YM"\` returns remaining months, and \`"MD"\` returns remaining days. See the full formula table above.

### What is the difference between completed age and running age?

Completed age counts full years you have lived (e.g., 32 after your 32nd birthday). Running age counts the year you are currently in (e.g., 33 during your 32nd year). Western systems use completed age; some Eastern cultures use running age.

## Stop Guessing. Know Your Exact Age.

Whether you need your age for a form, a medical appointment, or just curiosity — doing the math manually is error-prone and tedious. Our [Age Calculator](/productivity/age) gives you the precise answer in under a second, along with your zodiac sign, generation, and the number of days until your next birthday.

[Open Age Calculator](/productivity/age)
`},{id:"29",slug:"compound-interest-calculator-guide-2026",title:"Compound Interest Calculator: How Your Money Really Grows (2026 Guide)",excerpt:"Compound interest is the single most powerful force in personal finance. Learn the formula, see how compounding frequency changes your returns, and use our free calculator to project your wealth.",date:"2026-03-05",displayDate:"March 5, 2026",readTime:"9 min read",category:"Finance",relatedToolLink:"/finance/investment",relatedToolName:"Investment Calculator",image:"/images/blog/compound-interest-hero.png",content:`
## Why Compound Interest Is Called the "Eighth Wonder of the World"

Albert Einstein allegedly called compound interest "the most powerful force in the universe." Whether he actually said it is debatable. **Whether it is true is not.**

Simple interest pays you on your original deposit. Compound interest pays you on your deposit **plus all the interest you have already earned.** Over time, this creates exponential growth — and the difference is staggering.

| Year | Simple Interest (5%) | Compound Interest (5%) | Difference |
|------|---------------------|------------------------|------------|
| 1 | $10,500 | $10,500 | $0 |
| 5 | $12,500 | $12,763 | +$263 |
| 10 | $15,000 | $16,289 | +$1,289 |
| 20 | $20,000 | $26,533 | +$6,533 |
| 30 | $25,000 | $43,219 | +$18,219 |

Starting with $10,000 at 5% interest, simple interest gives you $25,000 after 30 years. Compound interest gives you **$43,219** — nearly double. And the gap only widens with time.

## The Compound Interest Formula (Explained Simply)

> **A = P(1 + r/n)^(nt)**

Here is what each variable means:

| Variable | Meaning | Example |
|----------|---------|---------|
| A | Final amount (what you end up with) | $16,289 |
| P | Principal (your initial investment) | $10,000 |
| r | Annual interest rate (as a decimal) | 0.05 (for 5%) |
| n | Compounding frequency per year | 12 (monthly) |
| t | Time in years | 10 |

### Step-by-Step Example

You invest **$10,000** at **5% annual interest** compounded **monthly** for **10 years**:

1. Convert rate: r = 5% = 0.05
2. Compounding frequency: n = 12 (monthly)
3. Plug in: A = 10,000 × (1 + 0.05/12)^(12 × 10)
4. Calculate: A = 10,000 × (1.004167)^120
5. Result: **A = $16,470.09**

That is $6,470.09 earned — $5,000 from the rate itself and **$1,470.09 from interest earning interest.**

Skip the math entirely — use our [Investment Calculator](/finance/investment) to model any scenario instantly.

## How Compounding Frequency Changes Everything

Interest can compound annually, quarterly, monthly, daily, or even continuously. Here is how $10,000 grows at 5% over 10 years at each frequency:

| Compounding | Times/Year | Final Value | Interest Earned |
|-------------|-----------|-------------|-----------------|
| Annually | 1 | $16,288.95 | $6,288.95 |
| Quarterly | 4 | $16,436.19 | $6,436.19 |
| Monthly | 12 | $16,470.09 | $6,470.09 |
| Daily | 365 | $16,486.65 | $6,486.65 |
| Continuously | ∞ | $16,487.21 | $6,487.21 |

**Key takeaway:** Going from annual to monthly compounding adds nearly **$200** in extra earnings. Going from monthly to daily adds only about $17 more. The biggest jump is from annual to quarterly.

Most savings accounts and CDs compound daily or monthly. The [Investment Calculator](/finance/investment) lets you compare all frequencies side by side.

## The Early Starter vs. Late Starter: Why Time Beats Money

This is the most important table in personal finance:

| Investor | Starts At | Invests Until | Monthly Amount | Total Invested | Balance at 65 (7% return) |
|----------|-----------|--------------|----------------|----------------|---------------------------|
| Early Starter | Age 25 | Age 35 | $500/mo | $60,000 | **$602,070** |
| Late Starter | Age 35 | Age 65 | $500/mo | $180,000 | **$566,765** |

The early starter invests **one-third** of what the late starter invests — and ends up with **more money.** That is compound interest at work. The extra 10 years of compounding time more than compensates for 20 fewer years of contributions.

This is why every financial advisor says the same thing: **start early, even if it is a small amount.**

Model your own early-vs-late scenario with our free [Investment Calculator](/finance/investment).

## The Rule of 72: A Mental Math Shortcut

Want to know how long it takes to double your money? Divide 72 by your interest rate.

> **Years to double = 72 ÷ Interest Rate**

| Interest Rate | Years to Double |
|---------------|----------------|
| 2% | 36 years |
| 4% | 18 years |
| 6% | 12 years |
| 8% | 9 years |
| 10% | 7.2 years |
| 12% | 6 years |

At a 7% average stock market return, your money doubles roughly every **10.3 years**. Invest $10,000 at 25, and by 65 you could have roughly **$160,000** — from a single deposit with no additional contributions.

## Compound Interest and Inflation: The Hidden Enemy

Compound interest works in reverse too. Inflation compounds against your purchasing power every year.

| Scenario | Annual Rate | $10,000 After 20 Years |
|----------|------------|----------------------|
| Investment growth | +7% | $38,697 |
| Inflation erosion | -3% | $5,438 (purchasing power) |
| **Real return** | **+4%** | **$21,911** |

Your investments might grow to $38,697 nominally, but if inflation averages 3%, that money only buys what **$21,911** buys today. This is why your real return (growth minus inflation) is the number that actually matters.

Read more in our article on [how inflation silently eats your savings](/blog/compound-interest-inflation-monster).

## How to Calculate Compound Interest in Excel

For spreadsheet power users, here is how to set up compound interest calculations:

| Cell | Formula | Purpose |
|------|---------|---------|
| B1 | 10000 | Principal |
| B2 | 0.05 | Annual rate |
| B3 | 12 | Compounding frequency |
| B4 | 10 | Years |
| B5 | \`=B1*(1+B2/B3)^(B3*B4)\` | Final amount |
| B6 | \`=B5-B1\` | Interest earned |

Or use the built-in \`FV\` function for investments with regular contributions:

\`=FV(rate/periods, total_periods, -payment, -principal)\`

Example: \`=FV(0.05/12, 120, -500, -10000)\` calculates the future value of $10,000 plus $500/month at 5% compounded monthly for 10 years.

## 5 Ways to Maximize Compound Interest

| Strategy | How It Helps | Tool to Use |
|----------|-------------|-------------|
| Start investing early | More compounding time | [Investment Calculator](/finance/investment) |
| Increase contributions annually | Growing base compounds faster | [Savings Goal Calculator](/finance/savings-goal) |
| Choose higher-frequency compounding | Slightly more total return | [Investment Calculator](/finance/investment) |
| Reinvest dividends | Let earnings compound | — |
| Minimize fees | Fees reduce your compounding base | [ROI Calculator](/finance/roi) |

## FAQ

### What is compound interest in simple terms?

Compound interest is interest earned on both your original deposit and on all interest already earned. Unlike simple interest (which only applies to the principal), compound interest causes your money to grow exponentially over time. Use our free [Investment Calculator](/finance/investment) to see the effect on any amount.

### How much will $10,000 grow with compound interest?

At 7% annual interest compounded monthly, $10,000 grows to approximately $20,097 in 10 years, $40,387 in 20 years, and $81,165 in 30 years — all without adding another dollar. The longer it compounds, the faster it grows.

### How often should interest be compounded?

More frequent compounding produces slightly higher returns. Monthly compounding is the most common for savings accounts and CDs. The difference between monthly and daily compounding is minimal (about $17 per $10,000 over 10 years at 5%), so monthly is effectively optimal.

### What is the Rule of 72?

The Rule of 72 is a mental math shortcut: divide 72 by the annual interest rate to estimate how many years it takes to double your money. At 6%, your money doubles in approximately 12 years. At 10%, approximately 7.2 years.

### Does compound interest work on debt too?

Yes — and it works against you. Credit card debt at 20% APR compounded daily grows rapidly. A $5,000 balance making only minimum payments can take 15+ years to pay off and cost over $7,000 in interest alone. See our [Debt Payoff Calculator](/finance/debt-payoff) to plan your escape.

## Start Growing Your Money Today

Compound interest rewards patience. Every month you delay investing is a month of compounding you will never get back. The math is clear: start now, contribute consistently, and let time do the heavy lifting.

Our Investment Calculator shows exactly how your money grows at any rate, any frequency, with or without monthly contributions — no sign-up required.

[Open Investment Calculator](/finance/investment)
`},{id:"30",slug:"how-to-calculate-loan-payments-emi-formula-2026",title:"How to Calculate Loan Payments: EMI Formula Explained (2026 Guide)",excerpt:"The EMI formula looks intimidating — until you break it down. Learn how monthly loan payments are calculated, see real examples for auto loans, mortgages, and personal loans, and use our free calculators to plan your debt.",date:"2026-03-06",displayDate:"March 6, 2026",readTime:"10 min read",category:"Finance",relatedToolLink:"/finance/auto-loan",relatedToolName:"Auto Loan Calculator",image:"/images/blog/loan-payments-hero.png",content:`
## Every Loan Comes Down to One Formula

Whether you are financing a $25,000 car, a $400,000 house, or a $10,000 personal loan, your monthly payment is calculated the same way. Banks do not use magic. They use math.

The formula is called **EMI** — Equated Monthly Installment. Once you understand it, you will never look at a loan the same way again.

## The EMI Formula

> **EMI = P × r × (1 + r)^n / [(1 + r)^n − 1]**

Where:
- **P** = Principal (the amount you borrow)
- **r** = Monthly interest rate (annual rate ÷ 12 ÷ 100)
- **n** = Total number of monthly payments (years × 12)

It looks scary. Let us walk through a real example.

## Worked Example: $20,000 Auto Loan

Say you borrow **$20,000** for a car at **6% APR** for **5 years**.

**Step 1: Convert the rate**
Monthly rate = 6% ÷ 12 = 0.5% = **0.005**

**Step 2: Calculate total payments**
n = 5 years × 12 = **60 months**

**Step 3: Plug into the formula**
EMI = 20,000 × 0.005 × (1.005)^60 / [(1.005)^60 − 1]
EMI = 20,000 × 0.005 × 1.3489 / [1.3489 − 1]
EMI = 134.89 / 0.3489
**EMI = $386.66/month**

**Total paid:** $386.66 × 60 = **$23,199.60**
**Total interest:** $23,199.60 − $20,000 = **$3,199.60**

You can verify this instantly with our [Auto Loan Calculator](/finance/auto-loan).

## How Amortization Actually Works

Here is the part most people miss: **your payment stays the same, but the split between interest and principal changes every month.**

In the first month, a larger chunk goes to interest. By the last month, almost all of it goes to principal.

| Month | Payment | → Principal | → Interest | Remaining Balance |
|-------|---------|------------|------------|-------------------|
| 1 | $387 | $287 | $100 | $19,713 |
| 12 | $387 | $304 | $83 | $16,464 |
| 30 | $387 | $330 | $57 | $11,079 |
| 48 | $387 | $360 | $27 | $5,074 |
| 60 | $387 | $385 | $2 | $0 |

> **Key takeaway:** In the early years of a long loan (like a mortgage), you are mostly paying interest. This is why extra payments early in the loan term save the most money.

## Loan Types Compared: Same Formula, Very Different Numbers

The EMI formula works for all amortizing loans. But the inputs change dramatically by loan type:

| Loan Type | Typical Amount | Typical APR (2026) | Typical Term | Monthly Payment | Total Interest |
|-----------|---------------|-------------------|-------------|-----------------|---------------|
| Auto loan | $35,000 | 6.5% | 5 years | $685 | $6,100 |
| Personal loan | $15,000 | 11% | 3 years | $491 | $2,676 |
| Mortgage | $350,000 | 6.8% | 30 years | $2,284 | $472,240 |
| Student loan | $40,000 | 5.5% | 10 years | $434 | $12,080 |

Notice the mortgage: you borrow $350,000 and pay back **$822,000**. The interest alone is more than the house. That is the brutal math of 30-year loans.

Use our [Mortgage Calculator](/finance/mortgage) to see the real cost of your home purchase.

## 4 Ways to Reduce Your Total Interest

### 1. Shorten the Loan Term
A $350,000 mortgage at 6.8%:
- **30 years:** $2,284/month, $472K interest
- **15 years:** $3,115/month, $210K interest

You pay $831 more per month but save **$262,000** in interest. That is financial freedom.

### 2. Make Extra Payments
Adding just **$100/month** to the auto loan example above:
- Pays off **8 months early**
- Saves **$490 in interest**

Even small extra payments early in the loan have an outsized impact because of how amortization front-loads interest.

### 3. Refinance When Rates Drop
If you took out a 7% mortgage and rates drop to 5.5%, refinancing a $300,000 balance saves roughly **$300/month**. Do the math with our calculator before paying closing costs.

### 4. Avoid Extending the Term
Dealerships love offering 72- and 84-month auto loans because the monthly payment looks small. But on a $35,000 car at 6.5%:
- **60 months:** $685/month, $6,100 interest
- **84 months:** $520/month, **$8,680 interest**

You "save" $165/month but pay $2,580 more total. And by month 36, you likely owe more than the car is worth (this is called being "underwater").

## Interest Rate vs. APR: Know the Difference

When shopping for loans, you will see two numbers:

- **Interest rate:** The annual cost of borrowing, calculated on the outstanding balance.
- **APR (Annual Percentage Rate):** The interest rate PLUS fees (origination fees, closing costs, etc.).

APR is always higher than the interest rate. **Always compare loans using APR**, not the interest rate alone.

For example, a personal loan might advertise 10% interest but charge a 3% origination fee. The actual APR could be 12%+. That fee gets deducted upfront — so you borrow $15,000 but only receive $14,550.

## Fixed vs. Variable Rate: Which Is Safer?

| Feature | Fixed Rate | Variable Rate |
|---------|-----------|---------------|
| Monthly payment | Never changes | Can increase or decrease |
| Interest rate | Locked at signing | Tied to a benchmark (e.g., SOFR) |
| Best when | Rates are low or you want predictability | Rates are high and expected to fall |
| Risk | None (payment is guaranteed) | Payments can spike in rising-rate environments |

> **Rule of thumb:** If you cannot afford a 2% rate increase on a variable-rate loan, choose fixed. Predictability is worth a premium.

## The Hidden Cost Most People Ignore: Opportunity Cost

Every dollar you put toward loan payments is a dollar you are **not** investing.

If you have a 4% auto loan, paying it off early means you "earn" 4% risk-free. But if your investments return 8%, that extra payment costs you 4% in lost growth.

This is why financial advisors often say: **pay off high-interest debt aggressively (credit cards at 20%+), but keep low-interest debt (3-5%) and invest the difference.**

Our [Debt Payoff Planner](/finance/debt-payoff) helps you decide which debts to attack first using the Snowball or Avalanche method. And our guide on [debt payoff strategies](/blog/debt-snowball-vs-avalanche) breaks down both approaches in detail.

## FAQ

### What is EMI in simple terms?

EMI stands for Equated Monthly Installment. It is the fixed amount you pay to a lender every month until your loan is fully repaid. Each EMI includes both principal (the borrowed money) and interest (the cost of borrowing). Use our free [Auto Loan Calculator](/finance/auto-loan) to find your EMI for any loan amount.

### How much will a $30,000 loan cost per month?

It depends on the interest rate and term. At 7% APR for 5 years, a $30,000 loan costs approximately $594/month, and you will pay $5,640 in total interest. At 4% for 3 years, the same loan costs $886/month with only $1,886 in interest. Shorter terms mean higher payments but much less interest.

### Is it better to pay extra on a loan or invest?

If your loan rate is above 6-7%, pay it off aggressively — you are unlikely to consistently beat that return in the market. If your rate is below 4-5%, consider making minimum payments and investing the difference. The math favors investing when loan rates are low. See our [Investment Calculator](/finance/investment) to model both scenarios.

### What happens if I miss a loan payment?

Most lenders charge a late fee (typically $25-50 or 5% of the payment). After 30 days late, the missed payment is reported to credit bureaus, which can drop your credit score by 50-100 points. After 90+ days, the loan may go into default. Always contact your lender before missing a payment — most offer hardship programs.

### Does paying off a loan early cost money?

Some loans have **prepayment penalties**, especially mortgages and some auto loans. Check your loan agreement for a "prepayment clause." If there is no penalty, paying off early saves you all the remaining interest that would have accrued. On a mortgage, this can be tens of thousands of dollars.

## Stop Guessing. Calculate Your Payments.

The EMI formula is the same whether you are buying a car, a house, or consolidating debt. The only variables are the amount, the rate, and the time.

Our calculators do the math instantly — no sign-up, no data collection, completely free.

[Calculate Auto Loan Payment](/finance/auto-loan) | [Calculate Mortgage Payment](/finance/mortgage) | [Plan Debt Payoff](/finance/debt-payoff)
`},{id:"31",slug:"how-to-calculate-retirement-savings-goal-2026",title:"How to Calculate Your Retirement Savings Goal (2026 Guide)",excerpt:"How much do you actually need to retire? Forget generic advice. Here is the math: the 25x Rule, age-based savings milestones, and exactly how inflation and Social Security change your number.",date:"2026-03-06",displayDate:"March 6, 2026",readTime:"11 min read",category:"Finance",relatedToolLink:"/finance/retirement",relatedToolName:"Retirement Calculator",image:"/images/blog/retirement-savings-hero.png",content:`
## The Million-Dollar Question (Literally)

"How much money do I need to retire?"

It is the most important financial question most people will ever ask. And the answer is not "$1 million" or "$2 million." It is personal. It depends on **when** you want to retire, **how** you want to live, and **where** your income will come from.

But the math behind it? That is universal. Let us break it down.

## The 25x Rule: Your Retirement Number in 30 Seconds

The simplest way to calculate your retirement goal:

> **Retirement Number = Annual Expenses in Retirement × 25**

This is based on the **4% Safe Withdrawal Rate** — a well-studied rule from the Trinity Study showing that withdrawing 4% of your portfolio annually (adjusted for inflation) has a 95%+ success rate over 30 years.

### Quick Examples

| Annual Spending | × 25 | Retirement Goal |
|----------------|------|----------------|
| $40,000 | × 25 | **$1,000,000** |
| $60,000 | × 25 | **$1,500,000** |
| $80,000 | × 25 | **$2,000,000** |
| $100,000 | × 25 | **$2,500,000** |

> **Key insight:** Every $1,000/month you can cut from your retirement expenses reduces your goal by **$300,000**. Lifestyle design and retirement planning are the same thing.

Want to see your exact number? Our [Retirement Calculator](/finance/retirement) does all of this math instantly.

## Step-by-Step: Calculate Your Personal Number

### Step 1: Estimate Your Retirement Expenses

Start with your **current monthly spending** and adjust:

| Expense | Working Years | Retirement | Change |
|---------|--------------|------------|--------|
| Housing | $2,000 | $1,500 | Mortgage paid off |
| Food | $600 | $500 | Less eating out |
| Transportation | $500 | $300 | No commute |
| Healthcare | $200 | $600 | Insurance + out-of-pocket |
| Travel/Hobbies | $200 | $500 | More free time |
| Insurance | $300 | $200 | No life/disability |
| Taxes | Varies | Lower | Lower income bracket |
| **Total** | **$3,800** | **$3,600** | —4% |

Most financial planners use the **70-80% rule**: expect to spend 70-80% of your pre-retirement income in retirement. But this varies wildly. Healthcare costs alone can eat up any savings from a paid-off mortgage.

### Step 2: Subtract Guaranteed Income

Not all retirement income needs to come from savings. Subtract:

- **Social Security:** Average benefit is ~$1,900/month in 2026. Check your estimate at [ssa.gov](https://www.ssa.gov/myaccount/).
- **Pension:** If you have one (increasingly rare).
- **Rental income:** If you own investment property.

**The Income Gap** = Monthly Expenses − Guaranteed Income

Using our example: $3,600 − $1,900 = **$1,700/month gap**

Annual gap: $1,700 × 12 = **$20,400**

### Step 3: Apply the 25x Rule

Retirement savings needed: $20,400 × 25 = **$510,000**

That is a *very different* number than the generic "$1 million" advice. And it accounts for Social Security.

Our [Savings Goal Calculator](/finance/savings-goal) can work backward from this number to tell you exactly how much to save monthly.

## Age-Based Savings Milestones

Where should you be at each age? Here is a commonly used benchmark (based on Fidelity research):

| Age | Savings Target | If You Earn $60,000 | If You Earn $100,000 |
|-----|---------------|--------------------|--------------------|
| 30 | 1× salary | $60,000 | $100,000 |
| 35 | 2× salary | $120,000 | $200,000 |
| 40 | 3× salary | $180,000 | $300,000 |
| 45 | 4× salary | $240,000 | $400,000 |
| 50 | 6× salary | $360,000 | $600,000 |
| 55 | 7× salary | $420,000 | $700,000 |
| 60 | 8× salary | $480,000 | $800,000 |
| 67 | 10× salary | $600,000 | $1,000,000 |

**Behind schedule?** Do not panic. The most powerful lever is your **savings rate**, not your starting point. Someone saving 30% of their income can catch up faster than you think. Our guide on [FIRE and savings rates](/blog/financial-independence-fire-math) explains the math.

## The Inflation Factor: Why $1 Million Is Not What It Used to Be

This is the part that sneaks up on people. At 3% average inflation:

| Today's Value | In 10 Years | In 20 Years | In 30 Years |
|--------------|------------|------------|------------|
| $1,000,000 | $744,000 | $554,000 | $412,000 |
| $500,000 | $372,000 | $277,000 | $206,000 |

If you are 35 and plan to retire at 65, your $1 million goal actually needs to be about **$2.4 million in nominal dollars** to have the same purchasing power.

This is why investing in assets that **beat inflation** (stocks, real estate) matters more than "safe" savings accounts that pay 4-5% while inflation eats 3%.

Our [Investment Calculator](/finance/investment) has a "Real Value" toggle that shows your projected wealth in **today's dollars** after inflation. It is often a sobering reality check.

## How Much Should You Save Each Month?

This depends on your age, current savings, and target retirement age. Here are some scenarios:

### Starting from $0

| Target Goal | Save Monthly at 7% Return | Years to Goal |
|------------|--------------------------|---------------|
| $500,000 | $450/month | 30 years |
| $500,000 | $850/month | 20 years |
| $500,000 | $1,800/month | 15 years |
| $1,000,000 | $900/month | 30 years |
| $1,000,000 | $1,700/month | 20 years |

### Starting from $100,000

| Target Goal | Savings | Save Monthly at 7% | Years to Goal |
|------------|---------|-------------------|---------------|
| $500,000 | $100K head start | $250/month | 20 years |
| $1,000,000 | $100K head start | $1,250/month | 20 years |

> **The early bird advantage:** Starting at 25 instead of 35 with the same $500/month contribution at 7% gives you **$566,000 more** by age 65. That is the power of an extra decade of [compound interest](/blog/compound-interest-inflation-monster).

## The 3 Biggest Retirement Math Mistakes

### 1. Ignoring Healthcare Costs

A 65-year-old couple in 2026 can expect to spend approximately **$315,000** on healthcare throughout retirement (Fidelity estimate). This includes Medicare premiums, supplemental insurance, copays, and prescriptions.

If you are retiring **before** 65 (before Medicare eligibility), budget $500-$1,500/month for private health insurance.

### 2. Underestimating Longevity

A healthy 65-year-old today has a 50% chance of living past 85 and a 25% chance of reaching 92. Plan for **30 years of retirement**, not 20.

Running out of money at 85 is worse than having too much at 90.

### 3. Not Accounting for Taxes

Withdrawals from traditional 401(k) and IRA accounts are taxed as ordinary income. If your "retirement number" is $1 million, about $750,000-$850,000 is actually yours. The rest goes to taxes.

Roth accounts (Roth IRA, Roth 401k) grow and withdraw **tax-free** — making your $1 million truly $1 million. The trade-off is paying taxes on contributions now.

## The 15% Savings Rate Rule

If all these numbers feel overwhelming, here is one actionable rule:

> **Save at least 15% of your gross income for retirement, starting in your 20s.**

At a $60,000 salary, that is $750/month. With a typical employer 401(k) match of 3-6%, you may only need to contribute 9-12% of your own money.

If you are starting later (30s or 40s), bump it to 20-25%.

## FAQ

### How much do I need to retire at 55?

Retiring at 55 means funding 30+ years without Social Security (which starts at 62-67). You will need roughly **28-30× your annual expenses** instead of 25× to account for the longer timeline. For $60,000/year spending, that is approximately $1.7 million. Use our [FIRE Calculator](/finance/fire) to model early retirement scenarios.

### Is $1 million enough to retire?

It depends on your spending. At a 4% withdrawal rate, $1 million provides $40,000/year. Add Social Security (~$23,000/year average), and you have $63,000/year total. For many people, that is enough. For high-cost-of-living areas, it may not be. Our [Retirement Calculator](/finance/retirement) can personalize this answer.

### How much should I have saved by 40?

The Fidelity benchmark suggests **3× your annual salary** by 40. On a $75,000 salary, that is $225,000. If you are behind, increasing your savings rate by even 5% can close the gap significantly over the next 20 years.

### What is the 4% rule?

The 4% rule states that you can withdraw 4% of your retirement portfolio in year one, then adjust for inflation each year, with a 95%+ chance of not running out of money over 30 years. On a $1 million portfolio, that is $40,000 in year one, $41,200 in year two (at 3% inflation), and so on.

### Should I pay off my mortgage before retiring?

Generally yes. A paid-off home dramatically reduces your monthly expenses, which reduces your retirement number. A $2,000/month mortgage payment requires $600,000 in savings to sustain (25× $24,000). Paying off that mortgage is equivalent to "earning" $600,000. See our [Mortgage Calculator](/finance/mortgage) to plan your payoff timeline.

## Stop Guessing. Calculate Your Number.

Your retirement goal is not a mystery. It is a formula: **annual gap × 25, adjusted for inflation and taxes.** The earlier you know your number, the easier it is to hit.

Our Retirement Calculator builds a complete plan — with inflation, Social Security estimates, and monthly savings targets — in under 60 seconds. No sign-up. No data stored. Just math.

[Calculate Your Retirement Goal](/finance/retirement) | [Set a Savings Target](/finance/savings-goal) | [Plan for Early Retirement](/finance/fire)
`},{id:"32",slug:"freelance-rate-calculator-how-to-set-hourly-rate-2026",title:"Freelance Rate Calculator: How to Set Your Hourly Rate (2026 Guide)",excerpt:"Most freelancers undercharge by 30-50%. Here is the formula to calculate your real hourly rate, factoring in taxes, benefits, non-billable hours, and business expenses — so you stop leaving money on the table.",date:"2026-03-06",displayDate:"March 6, 2026",readTime:"10 min read",category:"Finance",relatedToolLink:"/finance/freelance-rate",relatedToolName:"Freelance Rate Calculator",image:"/images/blog/freelance-rate-hero.png",content:`
## The Freelancer's Biggest Mistake: Charging Your Old Salary

You earned $75,000 at your corporate job. You divide by 2,080 hours (40 hours × 52 weeks) and get $36/hour. So you charge $40/hour as a freelancer, figuring you gave yourself a raise.

**You just took a massive pay cut.** Here is why.

## The Real Hourly Rate Formula

As a freelancer, you pay for things your employer used to cover. The formula that actually works:

> **Hourly Rate = (Target Income + Taxes + Benefits + Expenses) ÷ Billable Hours**

Let us walk through each component with real numbers.

## Step 1: Set Your Target Annual Income

Start with what you want to **take home** after everything. This is your net income target — rent, food, savings, fun.

For this example: **$80,000** target net income.

## Step 2: Add Self-Employment Taxes

As an employee, your employer pays half your Social Security and Medicare taxes. As a freelancer, you pay **both halves**.

| Tax | Employee Pays | Freelancer Pays |
|-----|--------------|-----------------|
| Social Security | 6.2% | **12.4%** |
| Medicare | 1.45% | **2.9%** |
| Income Tax | ~22% | ~22% |
| **Total** | ~30% | **~37%** |

To cover $80,000 net at a 37% effective tax rate, you need to earn **$126,984 gross**.

Quick math: $80,000 ÷ (1 − 0.37) = $126,984

## Step 3: Add Benefits You Must Self-Fund

| Benefit | Employer Covers | You Pay (Annual) |
|---------|----------------|-----------------|
| Health insurance | $7,000-$15,000 | **$8,000** |
| Retirement (401k match) | $3,000-$6,000 | **$4,800** (6% of income) |
| Paid vacation (3 weeks) | $4,600 | **$0** (but reduces billable hours) |
| Paid sick days (5 days) | $1,500 | **$0** (but reduces billable hours) |
| Equipment/software | $2,000 | **$2,000** |
| **Total** | ~$18,000 | **$14,800** |

Running total: $126,984 + $14,800 = **$141,784**

## Step 4: Add Business Expenses

| Expense | Annual Cost |
|---------|------------|
| Accounting/bookkeeping | $1,500 |
| Liability insurance | $800 |
| Software subscriptions | $1,200 |
| Marketing/website | $500 |
| Coworking space (optional) | $2,400 |
| Professional development | $600 |
| **Total** | **$7,000** |

Running total: $141,784 + $7,000 = **$148,784**

## Step 5: Calculate Actual Billable Hours

This is where most freelancers get the math catastrophically wrong.

You do not work 2,080 billable hours per year. Here is the real math:

| Category | Hours |
|----------|-------|
| Total hours in a year (52 × 40) | 2,080 |
| − Vacation (3 weeks) | −120 |
| − Holidays (10 days) | −80 |
| − Sick days (5 days) | −40 |
| **Available working hours** | **1,840** |
| − Admin/invoicing (10%) | −184 |
| − Marketing/sales (15%) | −276 |
| − Learning/upskilling (5%) | −92 |
| **Actual billable hours** | **1,288** |

> **Reality check:** Only about **62%** of your working time is billable. The rest goes to finding clients, doing admin, and staying sharp. If you price based on 2,080 hours, you are undercharging by 38%.

## Step 6: Calculate Your Rate

> **$148,784 ÷ 1,288 hours = $115.52/hour**

Compare that to the naive calculation: $80,000 ÷ 2,080 = $38.46/hour.

**The real rate is 3× what most freelancers charge.** This is why so many freelancers burn out — they are working full-time hours for part-time pay.

Use our [Freelance Rate Calculator](/finance/freelance-rate) to run your own numbers instantly.

## Freelance Rates by Industry (2026 Benchmarks)

| Profession | Entry Level | Mid Level | Senior/Expert |
|-----------|------------|----------|--------------|
| Web Developer | $50-$75 | $75-$125 | $125-$200 |
| Graphic Designer | $35-$55 | $55-$85 | $85-$150 |
| Copywriter | $40-$65 | $65-$100 | $100-$175 |
| Video Editor | $35-$55 | $55-$90 | $90-$150 |
| Marketing Consultant | $60-$90 | $90-$150 | $150-$300 |
| AI/ML Specialist | $80-$120 | $120-$200 | $200-$400 |

> These are US market rates. Adjust by ±30% for your region. Our [Salary to Hourly Converter](/productivity/salary-hourly) can help you benchmark against salaried equivalents.

## 3 Pricing Models Compared

### 1. Hourly Rate
**Best for:** New freelancers, unpredictable scope, ongoing retainers

| Pros | Cons |
|------|------|
| Simple to understand | Penalizes efficiency (faster = less pay) |
| Fair for scope creep | Clients worry about overbilling |
| Easy to adjust | Income ceiling |

### 2. Project-Based (Fixed Price)
**Best for:** Well-defined deliverables, experienced freelancers

| Pros | Cons |
|------|------|
| Rewards efficiency | Scope creep risk |
| Client knows total cost | Must estimate accurately |
| Higher perceived value | Harder to price initially |

### 3. Value-Based Pricing
**Best for:** Consultants, senior experts, high-impact work

| Pros | Cons |
|------|------|
| Unlimited earning potential | Requires confidence and track record |
| Aligned with client ROI | Harder to justify to new clients |
| Premium positioning | Requires ROI data |

> **Career progression:** Start hourly → move to project-based → graduate to value-based. Each transition typically doubles your effective hourly rate.

## The "Double Your Rate" Test

Here is a counterintuitive truth: **raising your rates often increases your income AND your client quality.**

Why? Premium clients:
- Have bigger budgets
- Trust your expertise
- Respect your time
- Refer other premium clients
- Cause less scope creep

Budget clients:
- Nickel-and-dime every hour
- Micromanage your process
- Request endless revisions
- Pay late
- Leave bad reviews when they cannot get champagne service at beer prices

**Test it:** Double your rate for the next 5 proposals. You might close 2 instead of 4 — but at 2× the rate, you earn the same revenue with half the work.

## When to Raise Your Rates

| Signal | Action |
|--------|--------|
| Fully booked for 3+ months | Raise by 15-20% |
| Closing more than 50% of proposals | You are too cheap — raise by 25% |
| Existing clients never push back | Raise by 10% for new clients |
| You learned a new high-value skill | Raise immediately for new clients |
| Annual inflation adjustment | Raise by 3-5% every January |

## FAQ

### How much should a freelancer charge per hour?

Your rate depends on your target income, taxes, benefits, and billable hours. A freelancer targeting $80,000 net income typically needs to charge $100-$130/hour to cover self-employment taxes, health insurance, retirement savings, and non-billable time. Use our [Freelance Rate Calculator](/finance/freelance-rate) to calculate your personal number.

### Why do freelancers charge more than employees?

Freelancers pay both sides of payroll taxes (an extra 7.65%), fund their own health insurance ($5,000-$15,000/year), pay for equipment and software, receive no paid vacation or sick days, and spend 30-40% of time on non-billable work. After accounting for these costs, a $120/hour freelancer often nets less than a $75,000 salaried employee.

### Should I charge hourly or per project?

Hourly works best when starting out or when scope is unclear. Project-based pricing rewards your efficiency and gives clients cost certainty. As you gain experience and can estimate projects accurately, transition to project-based — you will typically earn 20-40% more for the same work.

### How do I handle clients who say my rate is too high?

Never lower your rate. Instead, adjust the scope. "That rate includes X, Y, and Z. If we reduce the scope to just X, I can offer it at $[lower amount]." This positions you as flexible without devaluing your work. If a client truly cannot afford you, they are not your target client.

### How often should I raise my freelance rates?

At minimum, raise rates annually to match inflation (3-5%). Beyond that, raise when you are consistently booked, gaining new skills, or noticing that clients never push back on pricing. Grandfathering existing clients for 3-6 months is good practice.

## Calculate Your Real Rate Now

Stop guessing. Stop undercharging. Our Freelance Rate Calculator factors in your target income, tax rate, benefits, expenses, and actual billable hours — so you know exactly what to charge.

Want to know where you stand financially? Once you have your rate, check if your freelance income can fund early retirement with our [FIRE Calculator](/finance/fire).

[Calculate Your Freelance Rate](/finance/freelance-rate) | [Compare to Salary](/productivity/salary-hourly) | [Plan Financial Independence](/finance/fire)
`},{id:"33",slug:"typing-speed-improvement-guide-2026",title:"How to Improve Your Typing Speed (Backed by Science) — 2026 Guide",excerpt:"The average person types 40 WPM. Top performers hit 100+. The difference? Technique, not talent. Here are the proven strategies to double your speed — and a free test to track your progress.",date:"2026-03-06",displayDate:"March 6, 2026",readTime:"11 min read",category:"Productivity",relatedToolLink:"/productivity/typing-speed",relatedToolName:"Typing Speed Test",image:"/images/blog/typing-speed-guide-hero.png",content:`
## Why Typing Speed Is a Productivity Multiplier

Think typing speed doesn't matter in the age of voice assistants and AI? Think again.

The average knowledge worker types for **4+ hours per day** — emails, reports, Slack messages, code, documents. If you type at **40 WPM** (the average), that same work takes you **twice as long** as someone typing at 80 WPM.

Over a year, that is roughly **500 hours** of extra time spent just moving your fingers. That is 12 full work weeks. Gone.

Typing speed is not about being a "fast typer." It is about **removing the bottleneck between your brain and the screen**. When you can type as fast as you think, your writing flows. Your ideas don't get lost waiting for your fingers to catch up.

## How Fast Should You Type? (WPM Benchmarks)

Before you improve, you need to know where you stand. Take our free [Typing Speed Test](/productivity/typing-speed) to get your baseline WPM and accuracy.

Here is how your speed compares:

| WPM Range | Level | Who Types This Fast? |
|---|---|---|
| < 30 | Hunt-and-peck | Beginners, elderly, non-daily users |
| 30 – 40 | Below average | Most casual computer users |
| 40 – 60 | Average | Office workers, students |
| 60 – 80 | Above average | Experienced professionals, writers |
| 80 – 100 | Fast | Programmers, journalists, data entry |
| 100 – 120 | Expert | Professional typists, court reporters |
| 120+ | Elite | Competitive typists, stenographers |

> **Key Insight:** Going from 40 to 80 WPM is achievable for anyone willing to practice deliberately for 4–6 weeks. Going from 80 to 120 requires months of focused effort.

## Step 1: Learn the Home Row (Foundation)

Every fast typist in the world uses **touch typing** — typing without looking at the keyboard. The foundation is the **Home Row**.

### Finger Placement
- **Left hand:** Pinky on A, ring on S, middle on D, index on F.
- **Right hand:** Index on J, middle on K, ring on L, pinky on ;.
- **Thumbs:** Hover over the space bar.

The F and J keys have small bumps — these are your anchor points. Your fingers should **always return** to the Home Row after striking any key.

### Why This Works
Each finger is responsible for a specific column of keys. This eliminates the "hunt" part of hunt-and-peck. Your brain builds a spatial map, and after enough repetition, your fingers move automatically — like playing piano from muscle memory.

**Stop looking at the keyboard.** Yes, you will be slower at first. Yes, you will make mistakes. But within 2 weeks of disciplined practice, you will be faster than before, and within 4 weeks, significantly faster.

## Step 2: Prioritize Accuracy Over Speed

This is counterintuitive but critical: **slow down to speed up.**

If you type at 60 WPM with 85% accuracy, you are actually slower than someone typing at 50 WPM with 99% accuracy. Why? Because every error requires:

1. Noticing the mistake (cognitive load).
2. Pressing Backspace (wasted keystrokes).
3. Retyping the correct character (double work).

A single error can cost 3–5 keystrokes to fix. Multiply that across hundreds of words, and the "fast but sloppy" typist loses badly.

> **Rule of thumb:** If your accuracy drops below 95%, you are typing too fast for your current skill level. Slow down until accuracy is consistently above 97%, then gradually increase speed.

## Step 3: Practice Deliberately (Not Just Randomly)

Typing the same easy sentences over and over builds comfort, not speed. **Deliberate practice** means targeting your weaknesses.

### Five Proven Practice Strategies

**1. Identify Your Weak Keys**
Most people have trouble with specific keys — often Q, Z, X, or the number row. Track which keys cause the most errors and drill those specifically.

**2. Practice Common Word Patterns**
The most common 100 English words make up **50% of all written text**. Words like "the," "and," "have," "that." Your fingers should flow through these as single units, not individual letters.

**3. Scan Ahead While Typing**
Elite typists read 2–3 words ahead of what they are currently typing. This keeps the flow continuous and eliminates the pause-read-type cycle.

**4. Use Timed Drills**
Short, intense bursts (1–3 minutes) with maximum focus beat long, unfocused sessions. Aim for 15 minutes of focused drills per day — that is enough to see measurable progress within a week.

**5. Vary Your Content**
Don't just practice typing tests. Type along with articles, copy recipes, transcribe podcast sections. Real-world text includes punctuation, numbers, and formatting that standard drills miss.

Need help staying focused during practice sessions? The [Pomodoro Technique](/productivity/pomodoro) is perfect: 25 minutes of focused typing practice, 5 minutes rest. Read our [deep work guide](/blog/pomodoro-technique-deep-work) for the science behind it.

## Step 4: Optimize Your Ergonomics

Bad posture doesn't just cause pain — it actively slows you down. Tension in your wrists, shoulders, or neck creates micro-hesitations in every keystroke.

### The Optimal Setup

- **Chair height:** Feet flat on the floor, thighs parallel to the ground.
- **Elbow angle:** 90 degrees or slightly wider. Forearms parallel to the desk.
- **Wrist position:** Neutral (straight line from forearm to knuckles). **Never** rest your wrists on the desk while actively typing.
- **Monitor:** Top of screen at eye level, arm's length away.
- **Key pressure:** Light touches. You are not hammering nails. Mechanical keyboards help here by providing tactile feedback before the key bottoms out.

### Take Breaks
Every 25–30 minutes, stretch your hands, wrists, and shoulders. The 20-20-20 rule works for eyes too: every 20 minutes, look at something 20 feet away for 20 seconds.

## Step 5: Use the Right Tools

### Free Typing Practice Resources

- **Our Typing Speed Test** — Test your WPM and accuracy instantly, no sign-up required. [Take the test now](/productivity/typing-speed).
- **Keybr.com** — Adaptive practice that automatically focuses on your weakest keys.
- **MonkeyType** — Highly customizable, minimalist typing tests.
- **TypeRacer** — Competitive multiplayer typing races (great for motivation).
- **ZType** — A space shooter where you type words to destroy enemies (surprisingly effective practice).

### Keyboard Shortcuts That Save Time

Beyond raw speed, learn shortcuts that eliminate mouse usage:

- **Ctrl + Backspace** — Delete entire word (instead of letter by letter).
- **Ctrl + A** — Select all text.
- **Ctrl + Shift + Arrow** — Select word by word.
- **Home / End** — Jump to start/end of line.

These compound over thousands of daily interactions. If you write frequently, pair this with our [Word Counter](/productivity/word-counter) to track your daily output.

## The 30-Day Speed Challenge

Here is a realistic timeline for improvement:

| Week | Focus | Expected Gain |
|---|---|---|
| Week 1 | Home row positioning, stop looking at keyboard | Accuracy up, speed may drop temporarily |
| Week 2 | Top and bottom row integration | Speed returns to baseline with better accuracy |
| Week 3 | Speed drills, common word patterns | +10-15 WPM over baseline |
| Week 4 | Punctuation, numbers, real-world text | +15-25 WPM over baseline, 95%+ accuracy |

> After 30 days of 15 minutes/day practice, most people see a **30-50% improvement** in typing speed. That is 40 WPM → 55-60 WPM, or 60 WPM → 80-90 WPM.

## Frequently Asked Questions

### What is a good typing speed in 2026?

For most office workers, **60-80 WPM** with 95%+ accuracy is considered proficient. For roles that involve heavy typing (programming, data entry, journalism), **80-100 WPM** is the professional standard. You can measure your current speed with our free [Typing Speed Test](/productivity/typing-speed).

### How long does it take to learn touch typing?

Most people can learn the basics of touch typing in **2-4 weeks** with 15-20 minutes of daily practice. Reaching a comfortable, fast speed (70+ WPM) typically takes **2-3 months** of consistent practice. The key is not to revert to looking at the keyboard during the learning phase.

### Does keyboard type affect typing speed?

Yes, but less than technique. Mechanical keyboards with tactile switches can improve speed by 5-10% because they provide feedback before the key fully depresses. However, a good typist on a cheap membrane keyboard will always outperform a bad typist on a $300 mechanical board.

### Is it worth improving typing speed with voice typing and AI?

Absolutely. AI tools like ChatGPT still require typed prompts, edits, and refinements. Voice typing requires corrections. Even in 2026, typing remains the primary interface for precise digital communication. Faster typing means faster iteration with AI tools — you prompt, edit, and refine in half the time.

### Can I improve typing speed on a phone?

Phone typing uses a fundamentally different technique (thumbs vs. all fingers). The strategies in this article focus on desktop/laptop typing. For phone speed, predictive text and swipe typing are more effective. Desktop typing skills do not transfer to mobile, and vice versa.

## Start Measuring, Start Improving

You cannot improve what you do not measure. Take 60 seconds right now and find out where you stand.

Our Typing Speed Test gives you your exact WPM, accuracy percentage, and a performance rating — no sign-up, no ads blocking the test, just instant results.

[Test Your Typing Speed](/productivity/typing-speed) | [Track Your Words](/productivity/word-counter) | [Stay Focused While Practicing](/productivity/pomodoro)
`},{id:"34",slug:"date-difference-calculator-guide-2026",title:"How to Calculate Days Between Two Dates (And Why It Matters) — 2026 Guide",excerpt:"How many days until your vacation? How long is your contract? How old are you in days? Date math sounds simple until you hit leap years, inclusive counting, and months with different lengths.",date:"2026-03-06",displayDate:"March 6, 2026",readTime:"10 min read",category:"Productivity",relatedToolLink:"/productivity/date-difference",relatedToolName:"Date Difference Calculator",image:"/images/blog/date-difference-guide-hero.png",content:`
## Why Date Math Is Harder Than You Think

Quick: how many days are between March 1 and March 31?

If you said 30, you are right. But what about February 1 to March 1? In a normal year, that is 28 days. In a leap year, 29. And January 1 to March 1? It depends on the year.

This is why date math trips people up. Unlike regular arithmetic, the "units" keep changing. A month can be 28, 29, 30, or 31 days long. A year can be 365 or 366. And whether you include the start date, end date, or both changes the answer by 1.

For quick everyday calculations, skip the mental math entirely and use our [Date Difference Calculator](/productivity/date-difference) — it handles all the edge cases for you.

## 8 Real-World Reasons You Need Date Math

Most people think date calculators are niche. They are not. Here are scenarios where knowing the exact days between two dates matters:

| Scenario | Why Exact Days Matter |
|---|---|
| **Pregnancy due date** | 280 days from last menstrual period, not "9 months" |
| **Project deadline** | Sprint planning, delivery dates, buffer calculation |
| **Visa/passport expiry** | Many countries require 6 months (180 days) remaining validity |
| **Wedding countdown** | Vendor booking deadlines, countdown displays |
| **Lease or contract length** | Pro-rated rent, early termination penalties |
| **Age in days** | Fun milestone tracking — you have lived roughly 10,000 days by age 27 |
| **Retirement countdown** | Exact working days until freedom (use our [Retirement Calculator](/finance/retirement) too) |
| **Loan/mortgage term** | Interest accrues daily; exact day count affects total cost |

> **Key insight:** The financial world runs on exact day counts. Interest calculations (actual/360, actual/365) use the precise number of days, not rounded months. Getting the count wrong by even 1 day can mean hundreds of dollars in difference on large loans.

## The Simple Formula (Manual Method)

If you need to calculate by hand, the most reliable approach is:

### Step 1: Convert Each Date to Its Day-of-Year

January 1 = Day 1. January 31 = Day 31. February 1 = Day 32. And so on.

| Month | Days in Month | Cumulative Day |
|---|---|---|
| January | 31 | 31 |
| February | 28 (29 in leap year) | 59 (60) |
| March | 31 | 90 (91) |
| April | 30 | 120 (121) |
| May | 31 | 151 (152) |
| June | 30 | 181 (182) |
| July | 31 | 212 (213) |
| August | 31 | 243 (244) |
| September | 30 | 273 (274) |
| October | 31 | 304 (305) |
| November | 30 | 334 (335) |
| December | 31 | 365 (366) |

### Step 2: Subtract

If both dates are in the same year: **End Day-of-Year − Start Day-of-Year = Days Between**

Example: March 15 to October 20 (non-leap year)
- March 15 = Day 59 + 15 = Day 74
- October 20 = Day 273 + 20 = Day 293
- Difference = 293 − 74 = **219 days**

If the dates span different years, add 365 (or 366 for leap years) for each full year in between, then calculate the remainder.

Or just use our [Date Difference Calculator](/productivity/date-difference). It is faster and handles all edge cases.

## The Inclusive vs. Exclusive Trap

This is where most people (and even some software) get confused.

**Question:** How many days from Monday to Wednesday?

- **Exclusive counting (most common):** 2 days (Tuesday and Wednesday, or just the gap)
- **Inclusive counting:** 3 days (Monday, Tuesday, Wednesday — counting both endpoints)

### When to Use Which

| Counting Method | When to Use | Example |
|---|---|---|
| **Exclusive** | Duration, elapsed time, ages | "I started on Jan 1 and finished on Jan 10" = 9 days of work |
| **Inclusive** | Event days, calendar ranges | "The conference runs from Jan 1 to Jan 3" = 3 event days |

> **Rule of thumb:** If you are asking "how long did this take?", use exclusive. If you are asking "how many days does this cover?", use inclusive (add 1 to the difference).

Our calculator lets you toggle between both modes so you always get the number you need.

## Why "1 Month" Is Not a Real Unit of Time

This catches people all the time. A month is not a fixed unit.

- **January to February:** 31 days
- **February to March:** 28 or 29 days
- **November to December:** 30 days

When someone says "the project is due in 2 months," that could mean anywhere from 59 to 62 days depending on when you start counting.

This is why professional contracts almost always specify exact dates rather than "X months from now." And why our tool shows you years, months, AND remaining days — so you have the complete picture.

Curious how this affects age calculation? See how we break it down precisely in our [guide to exact age calculation](/blog/age-calculator-exact-age-guide-2026), or try the [Age Calculator](/productivity/age) directly.

## Leap Year: The Exception to the Exception

You probably know the rule: a year divisible by 4 is a leap year.

But did you know there are exceptions to the exception?

### The Full Leap Year Rule

1. **Divisible by 4?** → Leap year
2. **BUT divisible by 100?** → NOT a leap year
3. **BUT divisible by 400?** → IS a leap year

### Real-World Test

| Year | Divisible by 4? | Divisible by 100? | Divisible by 400? | Leap Year? |
|---|---|---|---|---|
| 2024 | Yes | No | — | **Yes** |
| 2025 | No | — | — | **No** |
| 2028 | Yes | No | — | **Yes** |
| 1900 | Yes | Yes | No | **No** |
| 2000 | Yes | Yes | Yes | **Yes** |

The year 1900 was NOT a leap year (divisible by 100 but not 400). The year 2000 WAS (divisible by 400). This error actually caused bugs in early spreadsheet software.

## Quick Mental Shortcuts

For rough estimates without a calculator:

- **Weeks to days:** Multiply by 7. "3 weeks" = 21 days.
- **Months to days:** Multiply by 30.44 (the average month length). "6 months" ≈ 183 days.
- **Years to days:** Multiply by 365.25 (accounting for leap years). "2 years" ≈ 730.5 days.

For anything requiring precision — financial calculations, legal deadlines, medical dates — always use a tool. The [Date Difference Calculator](/productivity/date-difference) gives exact results instantly.

## Frequently Asked Questions

### How do I calculate the number of days between two dates?

Subtract the earlier date from the later date. If both dates are in the same year, convert each to its day-of-year number and subtract. For cross-year spans, account for 365 or 366 days per year. The easiest method is using our free [Date Difference Calculator](/productivity/date-difference) which handles leap years, month boundaries, and inclusive/exclusive counting automatically.

### Should I count the start date, end date, or both?

It depends on your purpose. For **durations** (how long something lasted), the standard is exclusive counting — subtract and do NOT count the start date. For **event ranges** (how many days an event spans), use inclusive counting — add 1 to include both the first and last day.

### How many days are in a year exactly?

A standard year has **365 days**. A leap year has **366 days**. The average year length, accounting for leap years, is approximately **365.2425 days**. This is why the Gregorian calendar has such specific leap year rules — to keep the calendar year aligned with the Earth's orbit.

### Why do different tools give me different day counts?

The most common reason is **inclusive vs. exclusive counting**. One tool might count both the start and end dates while another counts only one or neither. Always check which method a tool uses. Our calculator clearly labels its counting method and lets you switch.

### How many days old am I?

Take your birthdate and calculate the days to today. As a rough guide: at age 20 you have lived about **7,300 days**, at age 30 about **10,950 days**, and at age 40 about **14,600 days**. For your exact number down to the day, use our [Age Calculator](/productivity/age).

## Stop Guessing, Start Counting

Whether you are planning a wedding, tracking a pregnancy, calculating contract terms, or just curious how many days until your next vacation — guessing with "about 3 months" is not good enough.

Our Date Difference Calculator gives you the exact count in seconds — years, months, days, and even weekdays — with no sign-up and no ads blocking your result.

[Calculate Days Between Dates](/productivity/date-difference) | [Find Your Exact Age](/productivity/age) | [Plan Your Retirement](/finance/retirement)
`},{id:"35",slug:"unit-conversion-mistakes-guide-2026",title:"Unit Conversion Mistakes That Cost Millions (And How to Avoid Them) — 2026 Guide",excerpt:"A $327 million spacecraft crashed because someone mixed up metric and imperial units. Here are the 7 most common conversion mistakes — and how a 60-second check prevents all of them.",date:"2026-03-07",displayDate:"March 7, 2026",readTime:"10 min read",category:"Productivity",relatedToolLink:"/productivity/unit-converter",relatedToolName:"Unit Converter",image:"/images/blog/unit-conversion-guide-hero.png",content:`
## The $327 Million Unit Conversion Error

In 1999, NASA's Mars Climate Orbiter disintegrated in the Martian atmosphere. The cause was not a hardware failure or a software crash. It was a **unit conversion mistake**.

One engineering team at Lockheed Martin calculated thrust data in **pound-force seconds** (imperial). Another team at NASA's Jet Propulsion Laboratory expected the data in **newton-seconds** (metric). Nobody caught the mismatch. The spacecraft entered Mars' atmosphere at the wrong angle and was destroyed.

**Cost: $327.6 million.** All because of a conversion between pounds and newtons.

This is the most famous unit conversion disaster, but it is far from the only one. Unit errors cause medication overdoses, construction failures, cooking disasters, and costly engineering mistakes every single day.

The good news? They are all preventable. Here is how.

## The 7 Most Common Unit Conversion Mistakes

These are the errors that trip up students, professionals, and even NASA engineers:

| # | Mistake | Example | Consequence |
|---|---|---|---|
| 1 | **Mixing metric and imperial** | Using inches where centimeters were expected | Measurements off by 2.54x |
| 2 | **Forgetting to square or cube** | Converting area: using 1 ft = 0.3048 m instead of 1 ft² = 0.0929 m² | Area off by 10x |
| 3 | **Using wrong conversion factor** | 1 inch = 2.5 cm (wrong) instead of 2.54 cm (right) | Small error compounds across large projects |
| 4 | **Confusing US and UK units** | US gallon (3.785 L) vs imperial gallon (4.546 L) | 20% difference |
| 5 | **Misreading abbreviations** | mg (milligram) vs g (gram) — 1,000x difference | Critical in medicine |
| 6 | **Rounding too early** | Rounding 2.54 to 2.5 before multiplying across 1,000 units | Cumulative error of 16 units |
| 7 | **Dropping units mid-calculation** | Writing "12" instead of "12 inches" | Impossible to catch errors later |

> **Rule of thumb:** If your answer seems too big or too small, it probably is. A quick sanity check — "Does this number make sense?" — catches most conversion errors before they become problems.

For instant, error-free conversions, use our [Unit Converter](/productivity/unit-converter). It handles all unit types with precise conversion factors built in.

## Metric vs Imperial: The Quick-Reference Table

These are the conversions you will use 90% of the time:

### Length

| Metric | Imperial | Conversion |
|---|---|---|
| 1 centimeter | 0.394 inches | × 0.394 |
| 1 meter | 3.281 feet | × 3.281 |
| 1 kilometer | 0.621 miles | × 0.621 |
| 1 inch | 2.54 cm | × 2.54 |
| 1 foot | 30.48 cm | × 30.48 |
| 1 mile | 1.609 km | × 1.609 |

### Weight

| Metric | Imperial | Conversion |
|---|---|---|
| 1 gram | 0.035 ounces | × 0.035 |
| 1 kilogram | 2.205 pounds | × 2.205 |
| 1 ounce | 28.35 grams | × 28.35 |
| 1 pound | 0.454 kg | × 0.454 |

### Volume

| Metric | Imperial | Conversion |
|---|---|---|
| 1 liter | 0.264 US gallons | × 0.264 |
| 1 milliliter | 0.034 US fluid ounces | × 0.034 |
| 1 US cup | 236.6 mL | × 236.6 |
| 1 US gallon | 3.785 liters | × 3.785 |

### Temperature

The temperature formula is the one most people get wrong. It is not a simple multiplication.

- **Celsius to Fahrenheit:** (°C × 9/5) + 32 = °F
- **Fahrenheit to Celsius:** (°F − 32) × 5/9 = °C

| °C | °F | Context |
|---|---|---|
| 0 | 32 | Water freezes |
| 37 | 98.6 | Body temperature |
| 100 | 212 | Water boils |
| 180 | 356 | Oven for baking |
| 220 | 428 | Pizza oven |

This matters for health tools too — our [BMI Calculator](/health/bmi) accepts both metric and imperial inputs so you never have to convert manually.

## Kitchen Conversions: The Ones That Actually Matter

Cooking is where most people encounter unit conversion in daily life. International recipes freely mix cups, grams, milliliters, and ounces.

### The Essential Kitchen Cheat Sheet

| Ingredient Type | 1 Cup (US) Equals |
|---|---|
| Water / milk | 240 mL / 8 fl oz |
| All-purpose flour | 125 g / 4.4 oz |
| Granulated sugar | 200 g / 7 oz |
| Brown sugar (packed) | 220 g / 7.8 oz |
| Butter | 227 g / 8 oz / 2 sticks |
| Rice (uncooked) | 185 g / 6.5 oz |

> **Why cups are unreliable for baking:** A "cup of flour" can weigh anywhere from 120g to 160g depending on how you scoop it. Professional bakers always weigh ingredients in grams. If a recipe matters, weigh it.

Tracking your nutrition? Our [Calorie Calculator](/health/calories) works with standard serving sizes so you do not have to guess at portion weights.

## The Dimensional Analysis Method (Never Get It Wrong)

This is the technique that engineers and scientists use to guarantee correct conversions. It works every time because the math checks itself.

### How It Works

Write your starting value with its unit. Then multiply by conversion factors expressed as fractions, arranged so unwanted units cancel out.

**Example: Convert 5 miles to kilometers**

5 miles × (1.609 km / 1 mile) = 8.045 km

The "miles" unit appears in both the numerator and denominator, so it cancels. You are left with kilometers. If the units do not cancel, you set up the fraction wrong — and you know it immediately.

**Example: Convert 150 pounds to kilograms**

150 lb × (0.4536 kg / 1 lb) = 68.04 kg

### Why This Works

- You can **chain** multiple conversions: miles → feet → inches → centimeters
- Units that cancel **guarantee** correctness
- If units do not cancel, you **immediately see** the error

This differs from just memorizing conversion factors because dimensional analysis **self-verifies**. You do not need to remember whether to multiply or divide — the units tell you.

For conversions you do regularly, skip the math entirely and use our [Unit Converter](/productivity/unit-converter). It applies precise factors for 20+ unit categories.

## Why the World Can't Agree on One System

Only **three countries** do not officially use the metric system: the United States, Myanmar, and Liberia. Yet the US still uses miles, Fahrenheit, and pounds in daily life.

This creates a permanent need for conversion. If you travel, cook with international recipes, follow non-US scientific papers, or work with global teams — you will convert units regularly.

The metric system is mathematically simpler (everything scales by 10), but the imperial system is deeply embedded in American culture, law, and infrastructure. Neither is going away.

Your best strategy: learn the 10–15 most common conversions by heart, and use a tool for everything else. Our converter handles [length, weight, volume, temperature, area, speed, and more](/productivity/unit-converter).

## Frequently Asked Questions

### What is the easiest way to convert units without making mistakes?

Use the **dimensional analysis method**: write your value with its unit, multiply by a conversion fraction so the old unit cancels, and read off the new unit. If units do not cancel, you set up the conversion backwards — which is the self-checking beauty of this technique. For instant results, use our free [Unit Converter](/productivity/unit-converter).

### Why are metric and imperial systems different?

The imperial system evolved from historical British measurements (a "foot" was literally a foot, a "yard" was a stride). The metric system was designed during the French Revolution (1790s) to be logical and base-10. Most of the world adopted metric, but the US retained imperial for historical and practical reasons.

### Is a US gallon the same as a UK gallon?

No. A US gallon is **3.785 liters**. An imperial (UK) gallon is **4.546 liters** — about 20% larger. This is one of the most common sources of confusion when reading British vs. American recipes, fuel economy figures, or product labels.

### How do I convert Celsius to Fahrenheit quickly?

The exact formula is (°C × 9/5) + 32 = °F. For a quick mental estimate: **double the Celsius, then add 30**. For example, 25°C → (25 × 2) + 30 = 80°F (actual: 77°F). Close enough for daily use, but use the exact formula or a converter for cooking or science.

### Do unit conversion errors really cause serious problems?

Yes. Beyond the Mars Orbiter ($327M), a 1983 Air Canada flight nearly crashed because fuel was loaded in pounds instead of kilograms (the "Gimli Glider" incident). Medical dosing errors from mg/g confusion can be fatal. In construction, imperial/metric mix-ups cause structural failures. These are not theoretical risks — they happen regularly.

## Convert Instantly, Convert Correctly

Memorizing every conversion factor is impossible. Making a mistake is easy. Our Unit Converter gives you precise results across 20+ categories — length, weight, volume, temperature, area, speed, and more — in under a second.

No formulas to remember. No units to cancel. Just type, convert, done.

[Convert Units Instantly](/productivity/unit-converter) | [Calculate a Percentage](/productivity/percentage) | [Check Your BMI](/health/bmi)
`},{id:"36",slug:"how-to-save-for-down-payment-house-2026",title:"How to Save for a Down Payment on a House in 2026 (Step-by-Step)",excerpt:"Think you need 20% down to buy a house? You don't. But saving smarter — not just harder — is what separates first-time buyers who close from those who keep renting. Here's the exact math and strategy.",date:"2026-03-07",displayDate:"March 7, 2026",readTime:"12 min read",category:"Finance",relatedToolLink:"/finance/savings-goal",relatedToolName:"Savings Goal Calculator",image:"/images/blog/down-payment-savings-hero.png",content:`
## The 20% Down Payment Myth

Everyone says you need 20% down to buy a house. Your parents say it. The internet says it. Even some real estate agents say it.

**It is not true.**

The median first-time buyer in 2026 puts down **9-10%**. Millions of buyers close with as little as **3%** or even **0% down** using government-backed loan programs.

So why does the 20% number persist? Because putting less than 20% down triggers **Private Mortgage Insurance (PMI)** — an extra fee that protects the lender, not you. PMI typically costs **0.5% to 1%** of your loan annually.

On a $400,000 home with 5% down, that is an extra **$1,900 to $3,800 per year** until you hit 20% equity. It is not ideal, but it is not a dealbreaker either — especially if home prices are rising faster than you can save.

> **Key Takeaway:** Don't let the 20% myth keep you renting. Calculate whether your PMI cost is less than the equity you would gain by buying sooner. Use our [Mortgage Calculator](/finance/mortgage) to see exactly how PMI affects your monthly payment.

## How Much Do You Actually Need?

Your required down payment depends on the loan type. Here is the breakdown:

| Loan Type | Minimum Down | Credit Score | PMI Required? | Best For |
|---|---|---|---|---|
| **Conventional** | 3-5% | 620+ | Yes (if < 20%) | Good credit buyers |
| **FHA** | 3.5% | 580+ | Yes (always) | First-time buyers, lower credit |
| **VA** | 0% | No minimum | No | Veterans, active military |
| **USDA** | 0% | 640+ | No (but guarantee fee) | Rural areas |
| **Conventional 20%** | 20% | 620+ | No | Best rates, no extra fees |

### Running the Numbers

Let's say you want to buy a **$350,000** home. Here is what each down payment looks like:

| Down Payment % | Down Payment Amount | Loan Amount | Estimated PMI/year |
|---|---|---|---|
| 3% | $10,500 | $339,500 | ~$2,375 |
| 5% | $17,500 | $332,500 | ~$2,328 |
| 10% | $35,000 | $315,000 | ~$1,575 |
| 20% | $70,000 | $280,000 | $0 |

The difference between 3% and 20% is **$59,500** in upfront cash. At a savings rate of $1,000/month, that is nearly **5 extra years** of renting.

Is those 5 years of rent worth avoiding PMI? For many buyers, the answer is no. Use our [Rent vs Buy Calculator](/finance/rent-vs-buy) to model your specific situation.

## The Hidden Costs Beyond the Down Payment

Your down payment is not the only cash you need at closing. Budget for these too:

### Closing Costs: 2-5% of Loan Amount
These cover the appraisal, title insurance, attorney fees, origination fees, and recording fees. On a $300,000 loan, expect **$6,000 to $15,000** at the closing table.

### Prepaid Items
- **Homeowner's insurance:** First year paid upfront (~$1,200-$2,400).
- **Property taxes:** Often 2-6 months prepaid into escrow.
- **Prepaid interest:** Interest from closing day through end of month.

### Moving and Immediate Costs
- Moving expenses.
- Utilities setup and deposits.
- Immediate repairs or furniture.

> **Rule of Thumb:** Save your **down payment + 3-5% of the home price** for closing costs, plus keep your [Emergency Fund](/finance/emergency) untouched. Draining your emergency fund to buy a house is how people end up underwater.

## 6 Strategies to Save Faster

### 1. Automate a Dedicated Savings Account

Open a **High-Yield Savings Account (HYSA)** separate from your checking. Set up an automatic transfer on payday. In 2026, many HYSAs offer **4-5% APY**, which means your money grows while you save.

On a $30,000 goal with $1,000/month deposits at 4.5% APY, you earn about **$2,800 in free interest** over 2.5 years.

Use our [Savings Goal Calculator](/finance/savings-goal) to see exactly how long it takes to reach your target.

### 2. Follow the 50/30/20 Rule

If you don't have a budget, start with the [50/30/20 budgeting framework](/blog/50-30-20-budgeting-rule-guide):

- **50%** of after-tax income → Needs (rent, groceries, insurance)
- **30%** → Wants (dining out, entertainment, subscriptions)
- **20%** → Savings and debt repayment

To accelerate your down payment, temporarily shift to **50/20/30** — move 10% from "Wants" to "Savings". On a $5,000/month income, that is an extra **$500/month** ($6,000/year) toward your down payment.

### 3. Redirect Windfalls

Every unexpected dollar should go straight to the down payment fund:

- **Tax refunds:** The average refund in 2026 is ~$3,100.
- **Work bonuses:** Even a $1,000 bonus moves the needle.
- **Side hustle income:** Freelancing, tutoring, rideshare. Our guide on [setting your freelance rate](/blog/freelance-hourly-rate-formula) can help you maximize that income.
- **Cash gifts:** Birthday and holiday money.

### 4. Cut the Big 3

Small savings (skip the latte) are overrated. Big savings (housing, transport, food) are where the real money is.

| Category | Possible Savings | Monthly Impact |
|---|---|---|
| **Housing** | Get a roommate or move to a cheaper unit | $300-$800 |
| **Transportation** | Drive a used car, bike, or take transit | $200-$500 |
| **Food** | Cook at home, meal prep, cut delivery apps | $200-$400 |

Even one of these changes can add $300-$800/month to your down payment fund.

### 5. Use First-Time Buyer Programs

Many states and cities offer **Down Payment Assistance (DPA)** programs for first-time buyers. These can include:

- **Grants** (free money that does not need to be repaid).
- **Forgivable loans** (forgiven after 5-10 years of living in the home).
- **Matched savings programs** (they match your savings 2:1 or 3:1).
- **Tax credits** (reduces your federal tax bill).

Check your state's Housing Finance Authority website. These programs are often underused because buyers don't know they exist.

### 6. Invest Wisely (If Your Timeline is 3+ Years Away)

If your home purchase is **3+ years** away, you might consider investing part of your down payment in a conservative portfolio (index funds or bonds) to beat inflation.

However, if you plan to buy within **1-2 years**, keep the money in a HYSA. The stock market can drop 20% in a year, and you don't want your down payment shrinking right when you need it.

Use our [Investment Calculator](/finance/investment) to model different growth scenarios and see the real (inflation-adjusted) value of your savings.

## The Opportunity Cost of Waiting

Here is the math that most "save more" articles ignore:

If home prices in your area increase by **4% per year** (the historical average), a $350,000 house today will cost **$364,000** next year. That is **$14,000** in price appreciation.

If you are saving $1,000/month, you save $12,000 in a year — but the house got $14,000 more expensive. **You fell further behind.**

This is why many financial advisors recommend buying with a smaller down payment sooner rather than saving for 20% over 5+ years, especially in appreciating markets.

The flip side: if the market is flat or declining, waiting makes sense. Context matters.

## Your Step-by-Step Action Plan

Here is the exact sequence, whether you are 6 months or 3 years from buying:

### Step 1: Set your target
Use our [Savings Goal Calculator](/finance/savings-goal) to determine how much you need (down payment + closing costs + reserves).

### Step 2: Get pre-approved
Talk to a lender **before** you start house hunting. A pre-approval letter tells you exactly what you can borrow and at what rate. It also reveals issues with your credit early enough to fix them.

### Step 3: Open a dedicated HYSA
Separate your down payment fund from your daily money. Name the account "House Fund" — psychology matters.

### Step 4: Automate transfers
Set up automatic transfers on payday. Treat this like a bill, not an optional deposit.

### Step 5: Attack the Big 3
Pick one category (housing, transport, food) and make one change this month.

### Step 6: Check for DPA programs
Google "[your state] down payment assistance" and see if you qualify. Free money exists.

### Step 7: Track your progress monthly
Revisit your [Savings Goal Calculator](/finance/savings-goal) each month. Watching the progress bar fill up is motivating.

## Frequently Asked Questions

### How much should I save for a down payment in 2026?

It depends on the loan type. Conventional loans require as little as **3-5%** down. FHA loans need **3.5%**. VA and USDA loans allow **0% down** for eligible borrowers. While 20% avoids PMI, most first-time buyers put down 9-10%. A good target is your down payment amount plus **3-5%** of the home price for closing costs, while keeping a separate emergency fund. Use our [Savings Goal Calculator](/finance/savings-goal) to set a precise target.

### Is it better to rent and save for a larger down payment or buy now with less?

There is no universal answer — it depends on your local market. If home prices are rising faster than you can save (common in 2026), buying sooner with a smaller down payment often wins, even with PMI. If the market is flat or declining, waiting to save more can make sense. Use our [Rent vs Buy Calculator](/finance/rent-vs-buy) to compare both scenarios with your actual numbers.

### What is PMI and how do I get rid of it?

Private Mortgage Insurance (PMI) is a fee added to conventional loans when you put down less than 20%. It protects the lender if you default. PMI costs **0.5% to 1%** of the loan amount per year. You can request PMI removal once you reach **20% equity** (either from payments or home appreciation). FHA loans have their own Mortgage Insurance Premium (MIP) that lasts for the life of the loan unless you refinance. See the full breakdown in our [Mortgage Calculator](/finance/mortgage).

### Where should I keep my down payment savings?

Put it in a **High-Yield Savings Account (HYSA)** — not your checking account, not the stock market, and not crypto. HYSAs offer 4-5% APY in 2026, are FDIC insured (zero risk), and keep your money liquid. If your timeline is 3+ years, you could invest a portion conservatively, but never risk money you need within 1-2 years.

### Can I use gift money for a down payment?

Yes. Most loan programs allow gift funds from family members for the down payment. You will need a signed **gift letter** stating the money is a gift, not a loan, and documentation showing the transfer. FHA, VA, and conventional loans all accept gift funds, though each has specific rules about how much can be gifted.

## Start Saving Today

Stop guessing. Input your home price, target down payment, and monthly savings into our calculator and see exactly when you will be ready to buy.

[Calculate Your Savings Goal](/finance/savings-goal) | [Run the Mortgage Numbers](/finance/mortgage) | [Compare Renting vs Buying](/finance/rent-vs-buy)
`}];function Tn(r){return{id:String(r.id),slug:r.slug,title:r.title,excerpt:r.excerpt,content:r.content,date:r.date,displayDate:r.display_date,readTime:r.read_time,category:r.category,relatedToolLink:r.related_tool_link,relatedToolName:r.related_tool_name,...r.image?{image:r.image}:{}}}const _n=5*60*1e3;let Ie=null,Ut=0;function Sn(){return Ie&&Date.now()-Ut<_n}async function $n(){if(Sn())return Ie;if(!$t)return Ue;try{const{data:r,error:e}=await $t.from("blog_posts").select("*").order("date",{ascending:!1});return e||!r||r.length===0?(console.warn("[blogService] Supabase fetch failed, using local fallback",e),Ue):(Ie=r.map(Tn),Ut=Date.now(),Ie)}catch(r){return console.warn("[blogService] Network error, using local fallback",r),Ue}}async function An(r){return(await $n()).find(t=>t.slug===r)}export{An as a,$n as g};
