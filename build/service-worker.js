"use strict";var precacheConfig=[["/index.html","b6639f311108e31e2fa6826747cf77c5"],["/static/css/main.3ae3ef4f.css","5f56748961ae13e4db33dfb3a454aaac"],["/static/media/11.875d9dfa.jpg","875d9dfa2a3cd5c3480007ba12486b05"],["/static/media/12.3dd8602d.jpg","3dd8602d4d38f658c4ea8dc1ceb20b26"],["/static/media/13.5047783b.jpg","5047783becf7cab05dcc9a1a4d6b42e5"],["/static/media/14.5ddf86bd.jpg","5ddf86bdb07a60bf555b841e22761100"],["/static/media/15.f8199684.jpg","f819968435da9b483ff4197e7f65e07f"],["/static/media/16.9e29bfde.jpg","9e29bfde90502641275618c8b930153c"],["/static/media/17.6b524f09.jpg","6b524f093287c3c7ff5235b738d5b218"],["/static/media/5.b66793e3.jpg","b66793e3be25cbabbf8b24cf25e233ad"],["/static/media/6.7e2c2da3.jpg","7e2c2da3ad4b23b50fd06cd5e9b8b1fc"],["/static/media/7.09ffe486.jpg","09ffe486647a04793f8dd875e1ec2d0f"],["/static/media/8.3b23b171.jpg","3b23b17193d9b3dd5ceba7b4561e5d6b"],["/static/media/9.bf6d56bf.jpg","bf6d56bf8e95ee89103eb2f8d242629f"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,n,a){var r=new URL(e);return a&&r.pathname.match(a)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(n)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var n=new URL(t).pathname;return e.some(function(e){return n.match(e)})},stripIgnoredUrlParameters=function(e,n){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return n.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],n=e[1],a=new URL(t,self.location),r=createCacheKey(a,hashParamName,n,/\.\w{8}\./);return[a.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(n){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!n.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var n=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!n.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,n=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),a="index.html";(e=urlsToCacheKeys.has(n))||(n=addDirectoryIndex(n,a),e=urlsToCacheKeys.has(n));var r="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(n=new URL(r,self.location).toString(),e=urlsToCacheKeys.has(n)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(n)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});