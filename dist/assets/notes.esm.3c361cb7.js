var Te=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},vt=function(n){return n&&n.Math==Math&&n},B=vt(typeof globalThis=="object"&&globalThis)||vt(typeof window=="object"&&window)||vt(typeof self=="object"&&self)||vt(typeof Te=="object"&&Te)||function(){return this}()||Function("return this")(),oe={},C=function(n){try{return!!n()}catch{return!0}},U=!C(function(){return Object.defineProperty({},1,{get:function(){return 7}})[1]!=7}),Ln={},In={}.propertyIsEnumerable,On=Object.getOwnPropertyDescriptor,cr=On&&!In.call({1:2},1);Ln.f=cr?function(n){var e=On(this,n);return!!e&&e.enumerable}:In;var se=function(n,e){return{enumerable:!(1&n),configurable:!(2&n),writable:!(4&n),value:e}},pr={}.toString,dt=function(n){return pr.call(n).slice(8,-1)},dr=dt,fr="".split,le=C(function(){return!Object("z").propertyIsEnumerable(0)})?function(n){return dr(n)=="String"?fr.call(n,""):Object(n)}:Object,I=function(n){if(n==null)throw TypeError("Can't call method on "+n);return n},hr=le,gr=I,ft=function(n){return hr(gr(n))},O=function(n){return typeof n=="object"?n!==null:typeof n=="function"},yt=O,ce=function(n,e){if(!yt(n))return n;var t,r;if(e&&typeof(t=n.toString)=="function"&&!yt(r=t.call(n))||typeof(t=n.valueOf)=="function"&&!yt(r=t.call(n))||!e&&typeof(t=n.toString)=="function"&&!yt(r=t.call(n)))return r;throw TypeError("Can't convert object to primitive value")},Dr=I,G=function(n){return Object(Dr(n))},mr=G,vr={}.hasOwnProperty,Y=function(n,e){return vr.call(mr(n),e)},_e=O,te=B.document,yr=_e(te)&&_e(te.createElement),$n=function(n){return yr?te.createElement(n):{}},kr=$n,Pn=!U&&!C(function(){return Object.defineProperty(kr("div"),"a",{get:function(){return 7}}).a!=7}),Er=U,xr=Ln,Ar=se,br=ft,wr=ce,Cr=Y,Fr=Pn,ze=Object.getOwnPropertyDescriptor;oe.f=Er?ze:function(n,e){if(n=br(n),e=wr(e,!0),Fr)try{return ze(n,e)}catch{}if(Cr(n,e))return Ar(!xr.f.call(n,e),n[e])};var M={},Sr=O,_=function(n){if(!Sr(n))throw TypeError(String(n)+" is not an object");return n},Br=U,Tr=Pn,Re=_,_r=ce,Le=Object.defineProperty;M.f=Br?Le:function(n,e,t){if(Re(n),e=_r(e,!0),Re(t),Tr)try{return Le(n,e,t)}catch{}if("get"in t||"set"in t)throw TypeError("Accessors not supported");return"value"in t&&(n[e]=t.value),n};var zr=M,Rr=se,X=U?function(n,e,t){return zr.f(n,e,Rr(1,t))}:function(n,e,t){return n[e]=t,n},tt={exports:{}},Ie=B,Lr=X,pe=function(n,e){try{Lr(Ie,n,e)}catch{Ie[n]=e}return e},Ir=pe,de=B["__core-js_shared__"]||Ir("__core-js_shared__",{}),ee=de,Or=Function.toString;typeof ee.inspectSource!="function"&&(ee.inspectSource=function(n){return Or.call(n)});var Mn=ee.inspectSource,$r=Mn,Oe=B.WeakMap,Pr=typeof Oe=="function"&&/native code/.test($r(Oe)),zt={exports:{}},$e=de;(zt.exports=function(n,e){return $e[n]||($e[n]=e!==void 0?e:{})})("versions",[]).push({version:"3.12.1",mode:"global",copyright:"\xA9 2021 Denis Pushkarev (zloirock.ru)"});var wt,ut,Ct,Mr=0,jr=Math.random(),jn=function(n){return"Symbol("+String(n===void 0?"":n)+")_"+(++Mr+jr).toString(36)},Nr=zt.exports,Ur=jn,Pe=Nr("keys"),Nn=function(n){return Pe[n]||(Pe[n]=Ur(n))},fe={},qr=Pr,Zr=O,Hr=X,Ot=Y,$t=de,Wr=Nn,Jr=fe,Vr=B.WeakMap;if(qr||$t.state){var H=$t.state||($t.state=new Vr),Kr=H.get,Me=H.has,Qr=H.set;wt=function(n,e){if(Me.call(H,n))throw new TypeError("Object already initialized");return e.facade=n,Qr.call(H,n,e),e},ut=function(n){return Kr.call(H,n)||{}},Ct=function(n){return Me.call(H,n)}}else{var V=Wr("state");Jr[V]=!0,wt=function(n,e){if(Ot(n,V))throw new TypeError("Object already initialized");return e.facade=n,Hr(n,V,e),e},ut=function(n){return Ot(n,V)?n[V]:{}},Ct=function(n){return Ot(n,V)}}var he={set:wt,get:ut,has:Ct,enforce:function(n){return Ct(n)?ut(n):wt(n,{})},getterFor:function(n){return function(e){var t;if(!Zr(e)||(t=ut(e)).type!==n)throw TypeError("Incompatible receiver, "+n+" required");return t}}},Gr=B,je=X,Yr=Y,Xr=pe,ti=Mn,ei=he.get,ni=he.enforce,ri=String(String).split("String");(tt.exports=function(n,e,t,r){var i,u=!!r&&!!r.unsafe,s=!!r&&!!r.enumerable,o=!!r&&!!r.noTargetGet;typeof t=="function"&&(typeof e!="string"||Yr(t,"name")||je(t,"name",e),(i=ni(t)).source||(i.source=ri.join(typeof e=="string"?e:""))),n!==Gr?(u?!o&&n[e]&&(s=!0):delete n[e],s?n[e]=t:je(n,e,t)):s?n[e]=t:Xr(e,t)})(Function.prototype,"toString",function(){return typeof this=="function"&&ei(this).source||ti(this)});var Pt=B,Mt=B,Ne=function(n){return typeof n=="function"?n:void 0},Rt=function(n,e){return arguments.length<2?Ne(Pt[n])||Ne(Mt[n]):Pt[n]&&Pt[n][e]||Mt[n]&&Mt[n][e]},ge={},ii=Math.ceil,ui=Math.floor,ht=function(n){return isNaN(n=+n)?0:(n>0?ui:ii)(n)},ai=ht,oi=Math.min,q=function(n){return n>0?oi(ai(n),9007199254740991):0},si=ht,li=Math.max,ci=Math.min,De=function(n,e){var t=si(n);return t<0?li(t+e,0):ci(t,e)},pi=ft,di=q,fi=De,Ue=function(n){return function(e,t,r){var i,u=pi(e),s=di(u.length),o=fi(r,s);if(n&&t!=t){for(;s>o;)if((i=u[o++])!=i)return!0}else for(;s>o;o++)if((n||o in u)&&u[o]===t)return n||o||0;return!n&&-1}},Un={includes:Ue(!0),indexOf:Ue(!1)},jt=Y,hi=ft,gi=Un.indexOf,Di=fe,qn=function(n,e){var t,r=hi(n),i=0,u=[];for(t in r)!jt(Di,t)&&jt(r,t)&&u.push(t);for(;e.length>i;)jt(r,t=e[i++])&&(~gi(u,t)||u.push(t));return u},me=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],mi=qn,vi=me.concat("length","prototype");ge.f=Object.getOwnPropertyNames||function(n){return mi(n,vi)};var Zn={};Zn.f=Object.getOwnPropertySymbols;var yi=ge,ki=Zn,Ei=_,xi=Rt("Reflect","ownKeys")||function(n){var e=yi.f(Ei(n)),t=ki.f;return t?e.concat(t(n)):e},Ai=Y,bi=xi,wi=oe,Ci=M,Fi=C,Si=/#|\.prototype\./,gt=function(n,e){var t=Ti[Bi(n)];return t==zi||t!=_i&&(typeof e=="function"?Fi(e):!!e)},Bi=gt.normalize=function(n){return String(n).replace(Si,".").toLowerCase()},Ti=gt.data={},_i=gt.NATIVE="N",zi=gt.POLYFILL="P",Hn=gt,Nt=B,Ri=oe.f,Li=X,Ii=tt.exports,Oi=pe,$i=function(n,e){for(var t=bi(e),r=Ci.f,i=wi.f,u=0;u<t.length;u++){var s=t[u];Ai(n,s)||r(n,s,i(e,s))}},Pi=Hn,F=function(n,e){var t,r,i,u,s,o=n.target,a=n.global,c=n.stat;if(t=a?Nt:c?Nt[o]||Oi(o,{}):(Nt[o]||{}).prototype)for(r in e){if(u=e[r],i=n.noTargetGet?(s=Ri(t,r))&&s.value:t[r],!Pi(a?r:o+(c?".":"#")+r,n.forced)&&i!==void 0){if(typeof u==typeof i)continue;$i(u,i)}(n.sham||i&&i.sham)&&Li(u,"sham",!0),Ii(t,r,u,n)}},Mi=_,ve=function(){var n=Mi(this),e="";return n.global&&(e+="g"),n.ignoreCase&&(e+="i"),n.multiline&&(e+="m"),n.dotAll&&(e+="s"),n.unicode&&(e+="u"),n.sticky&&(e+="y"),e},ct={},qe=C;function Ze(n,e){return RegExp(n,e)}ct.UNSUPPORTED_Y=qe(function(){var n=Ze("a","y");return n.lastIndex=2,n.exec("abcd")!=null}),ct.BROKEN_CARET=qe(function(){var n=Ze("^r","gy");return n.lastIndex=2,n.exec("str")!=null});var ji=ve,He=ct,Ni=zt.exports,Ft=RegExp.prototype.exec,Ui=Ni("native-string-replace",String.prototype.replace),Wn=Ft,Ut=function(){var n=/a/,e=/b*/g;return Ft.call(n,"a"),Ft.call(e,"a"),n.lastIndex!==0||e.lastIndex!==0}(),We=He.UNSUPPORTED_Y||He.BROKEN_CARET,qt=/()??/.exec("")[1]!==void 0;(Ut||qt||We)&&(Wn=function(n){var e,t,r,i,u=this,s=We&&u.sticky,o=ji.call(u),a=u.source,c=0,l=n;return s&&((o=o.replace("y","")).indexOf("g")===-1&&(o+="g"),l=String(n).slice(u.lastIndex),u.lastIndex>0&&(!u.multiline||u.multiline&&n[u.lastIndex-1]!==`
`)&&(a="(?: "+a+")",l=" "+l,c++),t=new RegExp("^(?:"+a+")",o)),qt&&(t=new RegExp("^"+a+"$(?!\\s)",o)),Ut&&(e=u.lastIndex),r=Ft.call(s?t:u,l),s?r?(r.input=r.input.slice(c),r[0]=r[0].slice(c),r.index=u.lastIndex,u.lastIndex+=r[0].length):u.lastIndex=0:Ut&&r&&(u.lastIndex=u.global?r.index+r[0].length:e),qt&&r&&r.length>1&&Ui.call(r[0],t,function(){for(i=1;i<arguments.length-2;i++)arguments[i]===void 0&&(r[i]=void 0)}),r});var pt=Wn;F({target:"RegExp",proto:!0,forced:/./.exec!==pt},{exec:pt});var W,St,Zt=Rt("navigator","userAgent")||"",Je=B.process,Ve=Je&&Je.versions,Ke=Ve&&Ve.v8;Ke?St=(W=Ke.split("."))[0]<4?1:W[0]+W[1]:Zt&&(!(W=Zt.match(/Edge\/(\d+)/))||W[1]>=74)&&(W=Zt.match(/Chrome\/(\d+)/))&&(St=W[1]);var ye=St&&+St,Qe=ye,qi=C,Jn=!!Object.getOwnPropertySymbols&&!qi(function(){return!String(Symbol())||!Symbol.sham&&Qe&&Qe<41}),Zi=Jn&&!Symbol.sham&&typeof Symbol.iterator=="symbol",Hi=B,Wi=zt.exports,Ge=Y,Ji=jn,Ye=Jn,Vi=Zi,rt=Wi("wks"),at=Hi.Symbol,Ki=Vi?at:at&&at.withoutSetter||Ji,T=function(n){return Ge(rt,n)&&(Ye||typeof rt[n]=="string")||(Ye&&Ge(at,n)?rt[n]=at[n]:rt[n]=Ki("Symbol."+n)),rt[n]},Xe=tt.exports,Qi=pt,Bt=C,ke=T,Gi=X,Yi=ke("species"),Ht=RegExp.prototype,Xi=!Bt(function(){var n=/./;return n.exec=function(){var e=[];return e.groups={a:"7"},e},"".replace(n,"$<a>")!=="7"}),tn="a".replace(/./,"$0")==="$0",en=ke("replace"),nn=!!/./[en]&&/./[en]("a","$0")==="",tu=!Bt(function(){var n=/(?:)/,e=n.exec;n.exec=function(){return e.apply(this,arguments)};var t="ab".split(n);return t.length!==2||t[0]!=="a"||t[1]!=="b"}),Lt=function(n,e,t,r){var i=ke(n),u=!Bt(function(){var p={};return p[i]=function(){return 7},""[n](p)!=7}),s=u&&!Bt(function(){var p=!1,d=/a/;return n==="split"&&((d={}).constructor={},d.constructor[Yi]=function(){return d},d.flags="",d[i]=/./[i]),d.exec=function(){return p=!0,null},d[i](""),!p});if(!u||!s||n==="replace"&&(!Xi||!tn||nn)||n==="split"&&!tu){var o=/./[i],a=t(i,""[n],function(p,d,h,D,v){var g=d.exec;return g===Qi||g===Ht.exec?u&&!v?{done:!0,value:o.call(d,h,D)}:{done:!0,value:p.call(h,d,D)}:{done:!1}},{REPLACE_KEEPS_$0:tn,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:nn}),c=a[0],l=a[1];Xe(String.prototype,n,c),Xe(Ht,i,e==2?function(p,d){return l.call(p,this,d)}:function(p){return l.call(p,this)})}r&&Gi(Ht[i],"sham",!0)},eu=Object.is||function(n,e){return n===e?n!==0||1/n==1/e:n!=n&&e!=e},nu=dt,ru=pt,It=function(n,e){var t=n.exec;if(typeof t=="function"){var r=t.call(n,e);if(typeof r!="object")throw TypeError("RegExp exec method returned something other than an Object or null");return r}if(nu(n)!=="RegExp")throw TypeError("RegExp#exec called on incompatible receiver");return ru.call(n,e)},iu=_,uu=I,rn=eu,au=It;Lt("search",1,function(n,e,t){return[function(r){var i=uu(this),u=r==null?void 0:r[n];return u!==void 0?u.call(r,i):new RegExp(r)[n](String(i))},function(r){var i=t(e,r,this);if(i.done)return i.value;var u=iu(r),s=String(this),o=u.lastIndex;rn(o,0)||(u.lastIndex=0);var a=au(u,s);return rn(u.lastIndex,o)||(u.lastIndex=o),a===null?-1:a.index}]});var ou=ht,su=I,un=function(n){return function(e,t){var r,i,u=String(su(e)),s=ou(t),o=u.length;return s<0||s>=o?n?"":void 0:(r=u.charCodeAt(s))<55296||r>56319||s+1===o||(i=u.charCodeAt(s+1))<56320||i>57343?n?u.charAt(s):r:n?u.slice(s,s+2):i-56320+(r-55296<<10)+65536}},lu={codeAt:un(!1),charAt:un(!0)}.charAt,Ee=function(n,e,t){return e+(t?lu(n,e).length:1)},cu=_,pu=q,du=I,fu=Ee,an=It;function et(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function on(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function nt(n,e,t){return e&&on(n.prototype,e),t&&on(n,t),n}function hu(n,e){return function(t){if(Array.isArray(t))return t}(n)||function(t,r){var i=t&&(typeof Symbol!="undefined"&&t[Symbol.iterator]||t["@@iterator"]);if(i!=null){var u,s,o=[],a=!0,c=!1;try{for(i=i.call(t);!(a=(u=i.next()).done)&&(o.push(u.value),!r||o.length!==r);a=!0);}catch(l){c=!0,s=l}finally{try{a||i.return==null||i.return()}finally{if(c)throw s}}return o}}(n,e)||Vn(n,e)||function(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}()}function Vn(n,e){if(n){if(typeof n=="string")return sn(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set"?Array.from(n):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?sn(n,e):void 0}}function sn(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function it(n,e){var t=typeof Symbol!="undefined"&&n[Symbol.iterator]||n["@@iterator"];if(!t){if(Array.isArray(n)||(t=Vn(n))||e&&n&&typeof n.length=="number"){t&&(n=t);var r=0,i=function(){};return{s:i,n:function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}},e:function(a){throw a},f:i}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var u,s=!0,o=!1;return{s:function(){t=t.call(n)},n:function(){var a=t.next();return s=a.done,a},e:function(a){o=!0,u=a},f:function(){try{s||t.return==null||t.return()}finally{if(o)throw u}}}}Lt("match",1,function(n,e,t){return[function(r){var i=du(this),u=r==null?void 0:r[n];return u!==void 0?u.call(r,i):new RegExp(r)[n](String(i))},function(r){var i=t(e,r,this);if(i.done)return i.value;var u=cu(r),s=String(this);if(!u.global)return an(u,s);var o=u.unicode;u.lastIndex=0;for(var a,c=[],l=0;(a=an(u,s))!==null;){var p=String(a[0]);c[l]=p,p===""&&(u.lastIndex=fu(s,pu(u.lastIndex),o)),l++}return l===0?null:c}]});var gu=G,Du=Math.floor,mu="".replace,vu=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,yu=/\$([$&'`]|\d{1,2})/g,ku=Lt,Eu=_,xu=q,Au=ht,bu=I,wu=Ee,Cu=function(n,e,t,r,i,u){var s=t+n.length,o=r.length,a=yu;return i!==void 0&&(i=gu(i),a=vu),mu.call(u,a,function(c,l){var p;switch(l.charAt(0)){case"$":return"$";case"&":return n;case"`":return e.slice(0,t);case"'":return e.slice(s);case"<":p=i[l.slice(1,-1)];break;default:var d=+l;if(d===0)return c;if(d>o){var h=Du(d/10);return h===0?c:h<=o?r[h-1]===void 0?l.charAt(1):r[h-1]+l.charAt(1):c}p=r[d-1]}return p===void 0?"":p})},Fu=It,Su=Math.max,Bu=Math.min;ku("replace",2,function(n,e,t,r){var i=r.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,u=r.REPLACE_KEEPS_$0,s=i?"$":"$0";return[function(o,a){var c=bu(this),l=o==null?void 0:o[n];return l!==void 0?l.call(o,c,a):e.call(String(c),o,a)},function(o,a){if(!i&&u||typeof a=="string"&&a.indexOf(s)===-1){var c=t(e,o,this,a);if(c.done)return c.value}var l=Eu(o),p=String(this),d=typeof a=="function";d||(a=String(a));var h=l.global;if(h){var D=l.unicode;l.lastIndex=0}for(var v=[];;){var g=Fu(l,p);if(g===null||(v.push(g),!h))break;String(g[0])===""&&(l.lastIndex=wu(p,xu(l.lastIndex),D))}for(var k,x="",A=0,S=0;S<v.length;S++){g=v[S];for(var j=String(g[0]),b=Su(Bu(Au(g.index),p.length),0),R=[],$=1;$<g.length;$++)R.push((k=g[$])===void 0?k:String(k));var J=g.groups;if(d){var Z=[j].concat(R,b,p);J!==void 0&&Z.push(J);var mt=String(a.apply(void 0,Z))}else mt=Cu(j,p,b,R,J,a);b>=A&&(x+=p.slice(A,b)+mt,A=b+j.length)}return x+p.slice(A)}]});var Tu=O,_u=_,zu=function(n){if(!Tu(n)&&n!==null)throw TypeError("Can't set "+String(n)+" as a prototype");return n},Ru=Object.setPrototypeOf||("__proto__"in{}?function(){var n,e=!1,t={};try{(n=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(t,[]),e=t instanceof Array}catch{}return function(r,i){return _u(r),zu(i),e?n.call(r,i):r.__proto__=i,r}}():void 0),Lu=O,ln=Ru,Iu=O,Ou=dt,$u=T("match"),xe=function(n){var e;return Iu(n)&&((e=n[$u])!==void 0?!!e:Ou(n)=="RegExp")},Pu=Rt,Mu=M,ju=U,cn=T("species"),Nu=U,Kn=B,Uu=Hn,qu=function(n,e,t){var r,i;return ln&&typeof(r=e.constructor)=="function"&&r!==t&&Lu(i=r.prototype)&&i!==t.prototype&&ln(n,i),n},Zu=M.f,Hu=ge.f,Wu=xe,Ju=ve,Vu=ct,Ku=tt.exports,Qu=C,Gu=he.enforce,Yu=function(n){var e=Pu(n),t=Mu.f;ju&&e&&!e[cn]&&t(e,cn,{configurable:!0,get:function(){return this}})},Xu=T("match"),L=Kn.RegExp,Wt=L.prototype,ot=/a/g,Jt=/a/g,Vt=new L(ot)!==ot,Kt=Vu.UNSUPPORTED_Y;if(Nu&&Uu("RegExp",!Vt||Kt||Qu(function(){return Jt[Xu]=!1,L(ot)!=ot||L(Jt)==Jt||L(ot,"i")!="/a/i"}))){for(var P=function(n,e){var t,r=this instanceof P,i=Wu(n),u=e===void 0;if(!r&&i&&n.constructor===P&&u)return n;Vt?i&&!u&&(n=n.source):n instanceof P&&(u&&(e=Ju.call(n)),n=n.source),Kt&&(t=!!e&&e.indexOf("y")>-1)&&(e=e.replace(/y/g,""));var s=qu(Vt?new L(n,e):L(n,e),r?this:Wt,P);return Kt&&t&&(Gu(s).sticky=!0),s},ta=function(n){n in P||Zu(P,n,{configurable:!0,get:function(){return L[n]},set:function(e){L[n]=e}})},pn=Hu(L),dn=0;pn.length>dn;)ta(pn[dn++]);Wt.constructor=P,P.prototype=Wt,Ku(Kn,"RegExp",P)}Yu("RegExp");var ea=tt.exports,na=_,ra=C,ia=ve,Qn=RegExp.prototype,Gn=Qn.toString,ua=ra(function(){return Gn.call({source:"a",flags:"b"})!="/a/b"}),aa=Gn.name!="toString";(ua||aa)&&ea(RegExp.prototype,"toString",function(){var n=na(this),e=String(n.source),t=n.flags;return"/"+e+"/"+String(t===void 0&&n instanceof RegExp&&!("flags"in Qn)?ia.call(n):t)},{unsafe:!0});var Yn=function(n){if(typeof n!="function")throw TypeError(String(n)+" is not a function");return n},fn=_,oa=Yn,sa=T("species"),la=Lt,ca=xe,pa=_,hn=I,da=function(n,e){var t,r=fn(n).constructor;return r===void 0||(t=fn(r)[sa])==null?e:oa(t)},fa=Ee,ha=q,gn=It,ga=pt,K=ct.UNSUPPORTED_Y,Da=[].push,ma=Math.min;la("split",2,function(n,e,t){var r;return r="abbc".split(/(b)*/)[1]=="c"||"test".split(/(?:)/,-1).length!=4||"ab".split(/(?:ab)*/).length!=2||".".split(/(.?)(.?)/).length!=4||".".split(/()()/).length>1||"".split(/.?/).length?function(i,u){var s=String(hn(this)),o=u===void 0?4294967295:u>>>0;if(o===0)return[];if(i===void 0)return[s];if(!ca(i))return e.call(s,i,o);for(var a,c,l,p=[],d=(i.ignoreCase?"i":"")+(i.multiline?"m":"")+(i.unicode?"u":"")+(i.sticky?"y":""),h=0,D=new RegExp(i.source,d+"g");(a=ga.call(D,s))&&!((c=D.lastIndex)>h&&(p.push(s.slice(h,a.index)),a.length>1&&a.index<s.length&&Da.apply(p,a.slice(1)),l=a[0].length,h=c,p.length>=o));)D.lastIndex===a.index&&D.lastIndex++;return h===s.length?!l&&D.test("")||p.push(""):p.push(s.slice(h)),p.length>o?p.slice(0,o):p}:"0".split(void 0,0).length?function(i,u){return i===void 0&&u===0?[]:e.call(this,i,u)}:e,[function(i,u){var s=hn(this),o=i==null?void 0:i[n];return o!==void 0?o.call(i,s,u):r.call(String(s),i,u)},function(i,u){var s=t(r,i,this,u,r!==e);if(s.done)return s.value;var o=pa(i),a=String(this),c=da(o,RegExp),l=o.unicode,p=(o.ignoreCase?"i":"")+(o.multiline?"m":"")+(o.unicode?"u":"")+(K?"g":"y"),d=new c(K?"^(?:"+o.source+")":o,p),h=u===void 0?4294967295:u>>>0;if(h===0)return[];if(a.length===0)return gn(d,a)===null?[a]:[];for(var D=0,v=0,g=[];v<a.length;){d.lastIndex=K?0:v;var k,x=gn(d,K?a.slice(v):a);if(x===null||(k=ma(ha(d.lastIndex+(K?v:0)),a.length))===D)v=fa(a,v,l);else{if(g.push(a.slice(D,v)),g.length===h)return g;for(var A=1;A<=x.length-1;A++)if(g.push(x[A]),g.length===h)return g;v=D=k}}return g.push(a.slice(D)),g}]},K);var va=I,Tt=`[	
\v\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]`,ya=RegExp("^"+Tt+Tt+"*"),ka=RegExp(Tt+Tt+"*$"),Qt=function(n){return function(e){var t=String(va(e));return 1&n&&(t=t.replace(ya,"")),2&n&&(t=t.replace(ka,"")),t}},Ae={start:Qt(1),end:Qt(2),trim:Qt(3)},Ea=C,Dn=`	
\v\f\r \xA0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF`,be=function(n){return Ea(function(){return!!Dn[n]()||"\u200B\x85\u180E"[n]()!="\u200B\x85\u180E"||Dn[n].name!==n})},xa=Ae.trim;F({target:"String",proto:!0,forced:be("trim")},{trim:function(){return xa(this)}});var Aa=dt,we=Array.isArray||function(n){return Aa(n)=="Array"},ba=O,mn=we,wa=T("species"),Ce=function(n,e){var t;return mn(n)&&(typeof(t=n.constructor)!="function"||t!==Array&&!mn(t.prototype)?ba(t)&&(t=t[wa])===null&&(t=void 0):t=void 0),new(t===void 0?Array:t)(e===0?0:e)},Ca=ce,Fa=M,Sa=se,Fe=function(n,e,t){var r=Ca(e);r in n?Fa.f(n,r,Sa(0,t)):n[r]=t},Ba=C,Ta=ye,_a=T("species"),Dt=function(n){return Ta>=51||!Ba(function(){var e=[];return(e.constructor={})[_a]=function(){return{foo:1}},e[n](Boolean).foo!==1})},za=F,Ra=De,La=ht,Ia=q,Oa=G,$a=Ce,Pa=Fe,Ma=Dt("splice"),ja=Math.max,Na=Math.min;za({target:"Array",proto:!0,forced:!Ma},{splice:function(n,e){var t,r,i,u,s,o,a=Oa(this),c=Ia(a.length),l=Ra(n,c),p=arguments.length;if(p===0?t=r=0:p===1?(t=0,r=c-l):(t=p-2,r=Na(ja(La(e),0),c-l)),c+t-r>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(i=$a(a,r),u=0;u<r;u++)(s=l+u)in a&&Pa(i,u,a[s]);if(i.length=r,t<r){for(u=l;u<c-r;u++)o=u+t,(s=u+r)in a?a[o]=a[s]:delete a[o];for(u=c;u>c-r+t;u--)delete a[u-1]}else if(t>r)for(u=c-r;u>l;u--)o=u+t-1,(s=u+r-1)in a?a[o]=a[s]:delete a[o];for(u=0;u<t;u++)a[u+l]=arguments[u+2];return a.length=c-r+t,i}});var Ua=C,Xn=function(n,e){var t=[][n];return!!t&&Ua(function(){t.call(null,e||function(){throw 1},1)})},qa=F,Za=ft,Ha=[].join,Wa=le!=Object,Ja=Xn("join",",");qa({target:"Array",proto:!0,forced:Wa||!Ja},{join:function(n){return Ha.call(Za(this),n===void 0?",":n)}});var Va=Yn,Ka=function(n,e,t){if(Va(n),e===void 0)return n;switch(t){case 0:return function(){return n.call(e)};case 1:return function(r){return n.call(e,r)};case 2:return function(r,i){return n.call(e,r,i)};case 3:return function(r,i,u){return n.call(e,r,i,u)}}return function(){return n.apply(e,arguments)}},Qa=le,Ga=G,Ya=q,Xa=Ce,vn=[].push,N=function(n){var e=n==1,t=n==2,r=n==3,i=n==4,u=n==6,s=n==7,o=n==5||u;return function(a,c,l,p){for(var d,h,D=Ga(a),v=Qa(D),g=Ka(c,l,3),k=Ya(v.length),x=0,A=p||Xa,S=e?A(a,k):t||s?A(a,0):void 0;k>x;x++)if((o||x in v)&&(h=g(d=v[x],x,D),n))if(e)S[x]=h;else if(h)switch(n){case 3:return!0;case 5:return d;case 6:return x;case 2:vn.call(S,d)}else switch(n){case 4:return!1;case 7:vn.call(S,d)}return u?-1:r||i?i:S}},Se={forEach:N(0),map:N(1),filter:N(2),some:N(3),every:N(4),find:N(5),findIndex:N(6),filterOut:N(7)},to=Se.map;F({target:"Array",proto:!0,forced:!Dt("map")},{map:function(n){return to(this,n,arguments.length>1?arguments[1]:void 0)}});var eo=F,no=O,yn=we,kn=De,ro=q,io=ft,uo=Fe,ao=T,oo=Dt("slice"),so=ao("species"),lo=[].slice,co=Math.max;eo({target:"Array",proto:!0,forced:!oo},{slice:function(n,e){var t,r,i,u=io(this),s=ro(u.length),o=kn(n,s),a=kn(e===void 0?s:e,s);if(yn(u)&&(typeof(t=u.constructor)!="function"||t!==Array&&!yn(t.prototype)?no(t)&&(t=t[so])===null&&(t=void 0):t=void 0,t===Array||t===void 0))return lo.call(u,o,a);for(r=new(t===void 0?Array:t)(co(a-o,0)),i=0;o<a;o++,i++)o in u&&uo(r,i,u[o]);return r.length=i,r}});var po=F,fo=Ae.start,tr=be("trimStart"),En=tr?function(){return fo(this)}:"".trimStart;po({target:"String",proto:!0,forced:tr},{trimStart:En,trimLeft:En});var ho=F,go=Ae.end,er=be("trimEnd"),xn=er?function(){return go(this)}:"".trimEnd;ho({target:"String",proto:!0,forced:er},{trimEnd:xn,trimRight:xn});var Do=Se.filter;F({target:"Array",proto:!0,forced:!Dt("filter")},{filter:function(n){return Do(this,n,arguments.length>1?arguments[1]:void 0)}});var mo=I,vo=/"/g,yo=C,ko=function(n,e,t,r){var i=String(mo(n)),u="<"+e;return t!==""&&(u+=" "+t+'="'+String(r).replace(vo,"&quot;")+'"'),u+">"+i+"</"+e+">"};F({target:"String",proto:!0,forced:function(n){return yo(function(){var e=""[n]('"');return e!==e.toLowerCase()||e.split('"').length>3})}("link")},{link:function(n){return ko(this,"a","href",n)}});var nr={};nr[T("toStringTag")]="z";var Be=String(nr)==="[object z]",Eo=Be,xt=dt,xo=T("toStringTag"),Ao=xt(function(){return arguments}())=="Arguments",bo=Eo?xt:function(n){var e,t,r;return n===void 0?"Undefined":n===null?"Null":typeof(t=function(i,u){try{return i[u]}catch{}}(e=Object(n),xo))=="string"?t:Ao?xt(e):(r=xt(e))=="Object"&&typeof e.callee=="function"?"Arguments":r},wo=Be?{}.toString:function(){return"[object "+bo(this)+"]"},Co=Be,Fo=tt.exports,So=wo;Co||Fo(Object.prototype,"toString",So,{unsafe:!0});var Bo=Se.forEach,To=B,_o={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0},Gt=Xn("forEach")?[].forEach:function(n){return Bo(this,n,arguments.length>1?arguments[1]:void 0)},zo=X;for(var Ro in _o){var An=To[Ro],kt=An&&An.prototype;if(kt&&kt.forEach!==Gt)try{zo(kt,"forEach",Gt)}catch{kt.forEach=Gt}}var Lo=qn,Io=me,rr=Object.keys||function(n){return Lo(n,Io)},Oo=G,bn=rr;F({target:"Object",stat:!0,forced:C(function(){bn(1)})},{keys:function(n){return bn(Oo(n))}});var Yt,$o=M,Po=_,Mo=rr,jo=U?Object.defineProperties:function(n,e){Po(n);for(var t,r=Mo(e),i=r.length,u=0;i>u;)$o.f(n,t=r[u++],e[t]);return n},No=Rt("document","documentElement"),Uo=_,qo=jo,wn=me,Zo=fe,Ho=No,Wo=$n,ir=Nn("IE_PROTO"),Xt=function(){},Cn=function(n){return"<script>"+n+"<\/script>"},At=function(){try{Yt=document.domain&&new ActiveXObject("htmlfile")}catch{}var n,e;At=Yt?function(r){r.write(Cn("")),r.close();var i=r.parentWindow.Object;return r=null,i}(Yt):((e=Wo("iframe")).style.display="none",Ho.appendChild(e),e.src=String("javascript:"),(n=e.contentWindow.document).open(),n.write(Cn("document.F=Object")),n.close(),n.F);for(var t=wn.length;t--;)delete At.prototype[wn[t]];return At()};Zo[ir]=!0;var Jo=Object.create||function(n,e){var t;return n!==null?(Xt.prototype=Uo(n),t=new Xt,Xt.prototype=null,t[ir]=n):t=At(),e===void 0?t:qo(t,e)},Vo=M,ne=T("unscopables"),re=Array.prototype;re[ne]==null&&Vo.f(re,ne,{configurable:!0,value:Jo(null)});var Ko=Un.includes,Qo=function(n){re[ne][n]=!0};F({target:"Array",proto:!0},{includes:function(n){return Ko(this,n,arguments.length>1?arguments[1]:void 0)}}),Qo("includes");var Go=xe,Yo=T("match"),Xo=function(n){if(Go(n))throw TypeError("The method doesn't accept regular expressions");return n},ts=I;F({target:"String",proto:!0,forced:!function(n){var e=/./;try{"/./"[n](e)}catch{try{return e[Yo]=!1,"/./"[n](e)}catch{}}return!1}("includes")},{includes:function(n){return!!~String(ts(this)).indexOf(Xo(n),arguments.length>1?arguments[1]:void 0)}});var es=F,ns=C,rs=we,is=O,us=G,as=q,Fn=Fe,os=Ce,ss=Dt,ls=ye,ur=T("isConcatSpreadable"),cs=ls>=51||!ns(function(){var n=[];return n[ur]=!1,n.concat()[0]!==n}),ps=ss("concat"),ds=function(n){if(!is(n))return!1;var e=n[ur];return e!==void 0?!!e:rs(n)};es({target:"Array",proto:!0,forced:!cs||!ps},{concat:function(n){var e,t,r,i,u,s=us(this),o=os(s,0),a=0;for(e=-1,r=arguments.length;e<r;e++)if(ds(u=e===-1?s:arguments[e])){if(a+(i=as(u.length))>9007199254740991)throw TypeError("Maximum allowed index exceeded");for(t=0;t<i;t++,a++)t in u&&Fn(o,a,u[t])}else{if(a>=9007199254740991)throw TypeError("Maximum allowed index exceeded");Fn(o,a++,u)}return o.length=a,o}});var fs=U,hs=M.f,ie=Function.prototype,gs=ie.toString,Ds=/^\s*function ([^ (]*)/;function ms(){return{baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}fs&&!("name"in ie)&&hs(ie,"name",{configurable:!0,get:function(){try{return gs.call(this).match(Ds)[1]}catch{return""}}});var Q={baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartLists:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1},vs=/[&<>"']/,ys=/[&<>"']/g,ks=/[<>"']|&(?!#?\w+;)/,Es=/[<>"']|&(?!#?\w+;)/g,xs={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Sn=function(n){return xs[n]};function w(n,e){if(e){if(vs.test(n))return n.replace(ys,Sn)}else if(ks.test(n))return n.replace(Es,Sn);return n}var As=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function ar(n){return n.replace(As,function(e,t){return(t=t.toLowerCase())==="colon"?":":t.charAt(0)==="#"?t.charAt(1)==="x"?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""})}var bs=/(^|[^\[])\^/g;function E(n,e){n=n.source||n,e=e||"";var t={replace:function(r,i){return i=(i=i.source||i).replace(bs,"$1"),n=n.replace(r,i),t},getRegex:function(){return new RegExp(n,e)}};return t}var ws=/[^\w:]/g,Cs=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function Bn(n,e,t){if(n){var r;try{r=decodeURIComponent(ar(t)).replace(ws,"").toLowerCase()}catch{return null}if(r.indexOf("javascript:")===0||r.indexOf("vbscript:")===0||r.indexOf("data:")===0)return null}e&&!Cs.test(t)&&(t=function(i,u){Et[" "+i]||(Fs.test(i)?Et[" "+i]=i+"/":Et[" "+i]=bt(i,"/",!0));var s=(i=Et[" "+i]).indexOf(":")===-1;return u.substring(0,2)==="//"?s?u:i.replace(Ss,"$1")+u:u.charAt(0)==="/"?s?u:i.replace(Bs,"$1")+u:i+u}(e,t));try{t=encodeURI(t).replace(/%25/g,"%")}catch{return null}return t}var Et={},Fs=/^[^:]+:\/*[^/]*$/,Ss=/^([^:]+:)[\s\S]*$/,Bs=/^([^:]+:\/*[^/]*)[\s\S]*$/,_t={exec:function(){}};function z(n){for(var e,t,r=1;r<arguments.length;r++)for(t in e=arguments[r])Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n}function Tn(n,e){var t=n.replace(/\|/g,function(i,u,s){for(var o=!1,a=u;--a>=0&&s[a]==="\\";)o=!o;return o?"|":" |"}).split(/ \|/),r=0;if(t[0].trim()||t.shift(),t.length>0&&!t[t.length-1].trim()&&t.pop(),t.length>e)t.splice(e);else for(;t.length<e;)t.push("");for(;r<t.length;r++)t[r]=t[r].trim().replace(/\\\|/g,"|");return t}function bt(n,e,t){var r=n.length;if(r===0)return"";for(var i=0;i<r;){var u=n.charAt(r-i-1);if(u!==e||t){if(u===e||!t)break;i++}else i++}return n.substr(0,r-i)}function or(n){n&&n.sanitize&&!n.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}function _n(n,e){if(e<1)return"";for(var t="";e>1;)1&e&&(t+=n),e>>=1,n+=n;return t+n}function zn(n,e,t,r){var i=e.href,u=e.title?w(e.title):null,s=n[1].replace(/\\([\[\]])/g,"$1");if(n[0].charAt(0)!=="!"){r.state.inLink=!0;var o={type:"link",raw:t,href:i,title:u,text:s,tokens:r.inlineTokens(s,[])};return r.state.inLink=!1,o}return{type:"image",raw:t,href:i,title:u,text:w(s)}}var ue=function(){function n(e){et(this,n),this.options=e||Q}return nt(n,[{key:"space",value:function(e){var t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}},{key:"code",value:function(e){var t=this.rules.block.code.exec(e);if(t){var r=t[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:bt(r,`
`)}}}},{key:"fences",value:function(e){var t=this.rules.block.fences.exec(e);if(t){var r=t[0],i=function(u,s){var o=u.match(/^(\s+)(?:```)/);if(o===null)return s;var a=o[1];return s.split(`
`).map(function(c){var l=c.match(/^\s+/);return l===null?c:hu(l,1)[0].length>=a.length?c.slice(a.length):c}).join(`
`)}(r,t[3]||"");return{type:"code",raw:r,lang:t[2]?t[2].trim():t[2],text:i}}}},{key:"heading",value:function(e){var t=this.rules.block.heading.exec(e);if(t){var r=t[2].trim();if(/#$/.test(r)){var i=bt(r,"#");this.options.pedantic?r=i.trim():i&&!/ $/.test(i)||(r=i.trim())}var u={type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:[]};return this.lexer.inline(u.text,u.tokens),u}}},{key:"hr",value:function(e){var t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:t[0]}}},{key:"blockquote",value:function(e){var t=this.rules.block.blockquote.exec(e);if(t){var r=t[0].replace(/^ *> ?/gm,"");return{type:"blockquote",raw:t[0],tokens:this.lexer.blockTokens(r,[]),text:r}}}},{key:"list",value:function(e){var t=this.rules.block.list.exec(e);if(t){var r,i,u,s,o,a,c,l,p,d,h,D,v=t[1].trim(),g=v.length>1,k={type:"list",raw:"",ordered:g,start:g?+v.slice(0,-1):"",loose:!1,items:[]};v=g?"\\d{1,9}\\".concat(v.slice(-1)):"\\".concat(v),this.options.pedantic&&(v=g?v:"[*+-]");for(var x=new RegExp("^( {0,3}".concat(v,")((?: [^\\n]*)?(?:\\n|$))"));e&&(D=!1,t=x.exec(e))&&!this.rules.block.hr.test(e);){if(r=t[0],e=e.substring(r.length),l=t[2].split(`
`,1)[0],p=e.split(`
`,1)[0],this.options.pedantic?(s=2,h=l.trimLeft()):(s=(s=t[2].search(/[^ ]/))>4?1:s,h=l.slice(s),s+=t[1].length),a=!1,!l&&/^ *$/.test(p)&&(r+=p+`
`,e=e.substring(p.length+1),D=!0),!D)for(var A=new RegExp("^ {0,".concat(Math.min(3,s-1),"}(?:[*+-]|\\d{1,9}[.)])"));e&&(l=d=e.split(`
`,1)[0],this.options.pedantic&&(l=l.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!A.test(l));){if(l.search(/[^ ]/)>=s||!l.trim())h+=`
`+l.slice(s);else{if(a)break;h+=`
`+l}a||l.trim()||(a=!0),r+=d+`
`,e=e.substring(d.length+1)}k.loose||(c?k.loose=!0:/\n *\n *$/.test(r)&&(c=!0)),this.options.gfm&&(i=/^\[[ xX]\] /.exec(h))&&(u=i[0]!=="[ ] ",h=h.replace(/^\[[ xX]\] +/,"")),k.items.push({type:"list_item",raw:r,task:!!i,checked:u,loose:!1,text:h}),k.raw+=r}k.items[k.items.length-1].raw=r.trimRight(),k.items[k.items.length-1].text=h.trimRight(),k.raw=k.raw.trimRight();var S=k.items.length;for(o=0;o<S;o++){this.lexer.state.top=!1,k.items[o].tokens=this.lexer.blockTokens(k.items[o].text,[]);var j=k.items[o].tokens.filter(function(R){return R.type==="space"}),b=j.every(function(R){var $,J=0,Z=it(R.raw.split(""));try{for(Z.s();!($=Z.n()).done;)if($.value===`
`&&(J+=1),J>1)return!0}catch(mt){Z.e(mt)}finally{Z.f()}return!1});!k.loose&&j.length&&b&&(k.loose=!0,k.items[o].loose=!0)}return k}}},{key:"html",value:function(e){var t=this.rules.block.html.exec(e);if(t){var r={type:"html",raw:t[0],pre:!this.options.sanitizer&&(t[1]==="pre"||t[1]==="script"||t[1]==="style"),text:t[0]};return this.options.sanitize&&(r.type="paragraph",r.text=this.options.sanitizer?this.options.sanitizer(t[0]):w(t[0]),r.tokens=[],this.lexer.inline(r.text,r.tokens)),r}}},{key:"def",value:function(e){var t=this.rules.block.def.exec(e);if(t)return t[3]&&(t[3]=t[3].substring(1,t[3].length-1)),{type:"def",tag:t[1].toLowerCase().replace(/\s+/g," "),raw:t[0],href:t[2],title:t[3]}}},{key:"table",value:function(e){var t=this.rules.block.table.exec(e);if(t){var r={type:"table",header:Tn(t[1]).map(function(c){return{text:c}}),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(r.header.length===r.align.length){r.raw=t[0];var i,u,s,o,a=r.align.length;for(i=0;i<a;i++)/^ *-+: *$/.test(r.align[i])?r.align[i]="right":/^ *:-+: *$/.test(r.align[i])?r.align[i]="center":/^ *:-+ *$/.test(r.align[i])?r.align[i]="left":r.align[i]=null;for(a=r.rows.length,i=0;i<a;i++)r.rows[i]=Tn(r.rows[i],r.header.length).map(function(c){return{text:c}});for(a=r.header.length,u=0;u<a;u++)r.header[u].tokens=[],this.lexer.inlineTokens(r.header[u].text,r.header[u].tokens);for(a=r.rows.length,u=0;u<a;u++)for(o=r.rows[u],s=0;s<o.length;s++)o[s].tokens=[],this.lexer.inlineTokens(o[s].text,o[s].tokens);return r}}}},{key:"lheading",value:function(e){var t=this.rules.block.lheading.exec(e);if(t){var r={type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:t[1],tokens:[]};return this.lexer.inline(r.text,r.tokens),r}}},{key:"paragraph",value:function(e){var t=this.rules.block.paragraph.exec(e);if(t){var r={type:"paragraph",raw:t[0],text:t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1],tokens:[]};return this.lexer.inline(r.text,r.tokens),r}}},{key:"text",value:function(e){var t=this.rules.block.text.exec(e);if(t){var r={type:"text",raw:t[0],text:t[0],tokens:[]};return this.lexer.inline(r.text,r.tokens),r}}},{key:"escape",value:function(e){var t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:w(t[1])}}},{key:"tag",value:function(e){var t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):w(t[0]):t[0]}}},{key:"link",value:function(e){var t=this.rules.inline.link.exec(e);if(t){var r=t[2].trim();if(!this.options.pedantic&&/^</.test(r)){if(!/>$/.test(r))return;var i=bt(r.slice(0,-1),"\\");if((r.length-i.length)%2==0)return}else{var u=function(l,p){if(l.indexOf(p[1])===-1)return-1;for(var d=l.length,h=0,D=0;D<d;D++)if(l[D]==="\\")D++;else if(l[D]===p[0])h++;else if(l[D]===p[1]&&--h<0)return D;return-1}(t[2],"()");if(u>-1){var s=(t[0].indexOf("!")===0?5:4)+t[1].length+u;t[2]=t[2].substring(0,u),t[0]=t[0].substring(0,s).trim(),t[3]=""}}var o=t[2],a="";if(this.options.pedantic){var c=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o);c&&(o=c[1],a=c[3])}else a=t[3]?t[3].slice(1,-1):"";return o=o.trim(),/^</.test(o)&&(o=this.options.pedantic&&!/>$/.test(r)?o.slice(1):o.slice(1,-1)),zn(t,{href:o&&o.replace(this.rules.inline._escapes,"$1"),title:a&&a.replace(this.rules.inline._escapes,"$1")},t[0],this.lexer)}}},{key:"reflink",value:function(e,t){var r;if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){var i=(r[2]||r[1]).replace(/\s+/g," ");if(!(i=t[i.toLowerCase()])||!i.href){var u=r[0].charAt(0);return{type:"text",raw:u,text:u}}return zn(r,i,r[0],this.lexer)}}},{key:"emStrong",value:function(e,t){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"",i=this.rules.inline.emStrong.lDelim.exec(e);if(i&&(!i[3]||!r.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/))){var u=i[1]||i[2]||"";if(!u||u&&(r===""||this.rules.inline.punctuation.exec(r))){var s,o,a=i[0].length-1,c=a,l=0,p=i[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(p.lastIndex=0,t=t.slice(-1*e.length+a);(i=p.exec(t))!=null;)if(s=i[1]||i[2]||i[3]||i[4]||i[5]||i[6])if(o=s.length,i[3]||i[4])c+=o;else if(!((i[5]||i[6])&&a%3)||(a+o)%3){if(!((c-=o)>0)){if(o=Math.min(o,o+c+l),Math.min(a,o)%2){var d=e.slice(1,a+i.index+o);return{type:"em",raw:e.slice(0,a+i.index+o+1),text:d,tokens:this.lexer.inlineTokens(d,[])}}var h=e.slice(2,a+i.index+o-1);return{type:"strong",raw:e.slice(0,a+i.index+o+1),text:h,tokens:this.lexer.inlineTokens(h,[])}}}else l+=o}}}},{key:"codespan",value:function(e){var t=this.rules.inline.code.exec(e);if(t){var r=t[2].replace(/\n/g," "),i=/[^ ]/.test(r),u=/^ /.test(r)&&/ $/.test(r);return i&&u&&(r=r.substring(1,r.length-1)),r=w(r,!0),{type:"codespan",raw:t[0],text:r}}}},{key:"br",value:function(e){var t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}},{key:"del",value:function(e){var t=this.rules.inline.del.exec(e);if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2],[])}}},{key:"autolink",value:function(e,t){var r,i,u=this.rules.inline.autolink.exec(e);if(u)return i=u[2]==="@"?"mailto:"+(r=w(this.options.mangle?t(u[1]):u[1])):r=w(u[1]),{type:"link",raw:u[0],text:r,href:i,tokens:[{type:"text",raw:r,text:r}]}}},{key:"url",value:function(e,t){var r;if(r=this.rules.inline.url.exec(e)){var i,u;if(r[2]==="@")u="mailto:"+(i=w(this.options.mangle?t(r[0]):r[0]));else{var s;do s=r[0],r[0]=this.rules.inline._backpedal.exec(r[0])[0];while(s!==r[0]);i=w(r[0]),u=r[1]==="www."?"http://"+i:i}return{type:"link",raw:r[0],text:i,href:u,tokens:[{type:"text",raw:i,text:i}]}}}},{key:"inlineText",value:function(e,t){var r,i=this.rules.inline.text.exec(e);if(i)return r=this.lexer.state.inRawBlock?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(i[0]):w(i[0]):i[0]:w(this.options.smartypants?t(i[0]):i[0]),{type:"text",raw:i[0],text:r}}}]),n}(),m={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)( [^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:_t,lheading:/^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\.|[^\[\]\\])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};m.def=E(m.def).replace("label",m._label).replace("title",m._title).getRegex(),m.bullet=/(?:[*+-]|\d{1,9}[.)])/,m.listItemStart=E(/^( *)(bull) */).replace("bull",m.bullet).getRegex(),m.list=E(m.list).replace(/bull/g,m.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+m.def.source+")").getRegex(),m._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",m._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,m.html=E(m.html,"i").replace("comment",m._comment).replace("tag",m._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),m.paragraph=E(m._paragraph).replace("hr",m.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",m._tag).getRegex(),m.blockquote=E(m.blockquote).replace("paragraph",m.paragraph).getRegex(),m.normal=z({},m),m.gfm=z({},m.normal,{table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"}),m.gfm.table=E(m.gfm.table).replace("hr",m.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",m._tag).getRegex(),m.gfm.paragraph=E(m._paragraph).replace("hr",m.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",m.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",m._tag).getRegex(),m.pedantic=z({},m.normal,{html:E(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",m._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:_t,paragraph:E(m.normal._paragraph).replace("hr",m.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",m.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()});var f={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:_t,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,rDelimUnd:/^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:_t,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};function Ts(n){return n.replace(/---/g,"\u2014").replace(/--/g,"\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1\u2018").replace(/'/g,"\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1\u201C").replace(/"/g,"\u201D").replace(/\.{3}/g,"\u2026")}function Rn(n){var e,t,r="",i=n.length;for(e=0;e<i;e++)t=n.charCodeAt(e),Math.random()>.5&&(t="x"+t.toString(16)),r+="&#"+t+";";return r}f._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~",f.punctuation=E(f.punctuation).replace(/punctuation/g,f._punctuation).getRegex(),f.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g,f.escapedEmSt=/\\\*|\\_/g,f._comment=E(m._comment).replace("(?:-->|$)","-->").getRegex(),f.emStrong.lDelim=E(f.emStrong.lDelim).replace(/punct/g,f._punctuation).getRegex(),f.emStrong.rDelimAst=E(f.emStrong.rDelimAst,"g").replace(/punct/g,f._punctuation).getRegex(),f.emStrong.rDelimUnd=E(f.emStrong.rDelimUnd,"g").replace(/punct/g,f._punctuation).getRegex(),f._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,f._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,f._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,f.autolink=E(f.autolink).replace("scheme",f._scheme).replace("email",f._email).getRegex(),f._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,f.tag=E(f.tag).replace("comment",f._comment).replace("attribute",f._attribute).getRegex(),f._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,f._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,f._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,f.link=E(f.link).replace("label",f._label).replace("href",f._href).replace("title",f._title).getRegex(),f.reflink=E(f.reflink).replace("label",f._label).replace("ref",m._label).getRegex(),f.nolink=E(f.nolink).replace("ref",m._label).getRegex(),f.reflinkSearch=E(f.reflinkSearch,"g").replace("reflink",f.reflink).replace("nolink",f.nolink).getRegex(),f.normal=z({},f),f.pedantic=z({},f.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:E(/^!?\[(label)\]\((.*?)\)/).replace("label",f._label).getRegex(),reflink:E(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",f._label).getRegex()}),f.gfm=z({},f.normal,{escape:E(f.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/}),f.gfm.url=E(f.gfm.url,"i").replace("email",f.gfm._extended_email).getRegex(),f.breaks=z({},f.gfm,{br:E(f.br).replace("{2,}","*").getRegex(),text:E(f.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()});var st=function(){function n(e){et(this,n),this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Q,this.options.tokenizer=this.options.tokenizer||new ue,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};var t={block:m.normal,inline:f.normal};this.options.pedantic?(t.block=m.pedantic,t.inline=f.pedantic):this.options.gfm&&(t.block=m.gfm,this.options.breaks?t.inline=f.breaks:t.inline=f.gfm),this.tokenizer.rules=t}return nt(n,[{key:"lex",value:function(e){var t;for(e=e.replace(/\r\n|\r/g,`
`).replace(/\t/g,"    "),this.blockTokens(e,this.tokens);t=this.inlineQueue.shift();)this.inlineTokens(t.src,t.tokens);return this.tokens}},{key:"blockTokens",value:function(e){var t,r,i,u,s=this,o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];for(this.options.pedantic&&(e=e.replace(/^ +$/gm,""));e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(function(c){return!!(t=c.call({lexer:s},e,o))&&(e=e.substring(t.raw.length),o.push(t),!0)}))){if(t=this.tokenizer.space(e))e=e.substring(t.raw.length),t.raw.length===1&&o.length>0?o[o.length-1].raw+=`
`:o.push(t);else if(t=this.tokenizer.code(e))e=e.substring(t.raw.length),!(r=o[o.length-1])||r.type!=="paragraph"&&r.type!=="text"?o.push(t):(r.raw+=`
`+t.raw,r.text+=`
`+t.text,this.inlineQueue[this.inlineQueue.length-1].src=r.text);else if(t=this.tokenizer.fences(e))e=e.substring(t.raw.length),o.push(t);else if(t=this.tokenizer.heading(e))e=e.substring(t.raw.length),o.push(t);else if(t=this.tokenizer.hr(e))e=e.substring(t.raw.length),o.push(t);else if(t=this.tokenizer.blockquote(e))e=e.substring(t.raw.length),o.push(t);else if(t=this.tokenizer.list(e))e=e.substring(t.raw.length),o.push(t);else if(t=this.tokenizer.html(e))e=e.substring(t.raw.length),o.push(t);else if(t=this.tokenizer.def(e))e=e.substring(t.raw.length),!(r=o[o.length-1])||r.type!=="paragraph"&&r.type!=="text"?this.tokens.links[t.tag]||(this.tokens.links[t.tag]={href:t.href,title:t.title}):(r.raw+=`
`+t.raw,r.text+=`
`+t.raw,this.inlineQueue[this.inlineQueue.length-1].src=r.text);else if(t=this.tokenizer.table(e))e=e.substring(t.raw.length),o.push(t);else if(t=this.tokenizer.lheading(e))e=e.substring(t.raw.length),o.push(t);else if(i=e,this.options.extensions&&this.options.extensions.startBlock&&function(){var c=1/0,l=e.slice(1),p=void 0;s.options.extensions.startBlock.forEach(function(d){typeof(p=d.call({lexer:this},l))=="number"&&p>=0&&(c=Math.min(c,p))}),c<1/0&&c>=0&&(i=e.substring(0,c+1))}(),this.state.top&&(t=this.tokenizer.paragraph(i)))r=o[o.length-1],u&&r.type==="paragraph"?(r.raw+=`
`+t.raw,r.text+=`
`+t.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):o.push(t),u=i.length!==e.length,e=e.substring(t.raw.length);else if(t=this.tokenizer.text(e))e=e.substring(t.raw.length),(r=o[o.length-1])&&r.type==="text"?(r.raw+=`
`+t.raw,r.text+=`
`+t.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=r.text):o.push(t);else if(e){var a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}throw new Error(a)}}return this.state.top=!0,o}},{key:"inline",value:function(e,t){this.inlineQueue.push({src:e,tokens:t})}},{key:"inlineTokens",value:function(e){var t,r,i,u,s,o,a=this,c=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],l=e;if(this.tokens.links){var p=Object.keys(this.tokens.links);if(p.length>0)for(;(u=this.tokenizer.rules.inline.reflinkSearch.exec(l))!=null;)p.includes(u[0].slice(u[0].lastIndexOf("[")+1,-1))&&(l=l.slice(0,u.index)+"["+_n("a",u[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(u=this.tokenizer.rules.inline.blockSkip.exec(l))!=null;)l=l.slice(0,u.index)+"["+_n("a",u[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(u=this.tokenizer.rules.inline.escapedEmSt.exec(l))!=null;)l=l.slice(0,u.index)+"++"+l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);for(;e;)if(s||(o=""),s=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(function(h){return!!(t=h.call({lexer:a},e,c))&&(e=e.substring(t.raw.length),c.push(t),!0)})))if(t=this.tokenizer.escape(e))e=e.substring(t.raw.length),c.push(t);else if(t=this.tokenizer.tag(e))e=e.substring(t.raw.length),(r=c[c.length-1])&&t.type==="text"&&r.type==="text"?(r.raw+=t.raw,r.text+=t.text):c.push(t);else if(t=this.tokenizer.link(e))e=e.substring(t.raw.length),c.push(t);else if(t=this.tokenizer.reflink(e,this.tokens.links))e=e.substring(t.raw.length),(r=c[c.length-1])&&t.type==="text"&&r.type==="text"?(r.raw+=t.raw,r.text+=t.text):c.push(t);else if(t=this.tokenizer.emStrong(e,l,o))e=e.substring(t.raw.length),c.push(t);else if(t=this.tokenizer.codespan(e))e=e.substring(t.raw.length),c.push(t);else if(t=this.tokenizer.br(e))e=e.substring(t.raw.length),c.push(t);else if(t=this.tokenizer.del(e))e=e.substring(t.raw.length),c.push(t);else if(t=this.tokenizer.autolink(e,Rn))e=e.substring(t.raw.length),c.push(t);else if(this.state.inLink||!(t=this.tokenizer.url(e,Rn))){if(i=e,this.options.extensions&&this.options.extensions.startInline&&function(){var h=1/0,D=e.slice(1),v=void 0;a.options.extensions.startInline.forEach(function(g){typeof(v=g.call({lexer:this},D))=="number"&&v>=0&&(h=Math.min(h,v))}),h<1/0&&h>=0&&(i=e.substring(0,h+1))}(),t=this.tokenizer.inlineText(i,Ts))e=e.substring(t.raw.length),t.raw.slice(-1)!=="_"&&(o=t.raw.slice(-1)),s=!0,(r=c[c.length-1])&&r.type==="text"?(r.raw+=t.raw,r.text+=t.text):c.push(t);else if(e){var d="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(d);break}throw new Error(d)}}else e=e.substring(t.raw.length),c.push(t);return c}}],[{key:"rules",get:function(){return{block:m,inline:f}}},{key:"lex",value:function(e,t){return new n(t).lex(e)}},{key:"lexInline",value:function(e,t){return new n(t).inlineTokens(e)}}]),n}(),ae=function(){function n(e){et(this,n),this.options=e||Q}return nt(n,[{key:"code",value:function(e,t,r){var i=(t||"").match(/\S*/)[0];if(this.options.highlight){var u=this.options.highlight(e,i);u!=null&&u!==e&&(r=!0,e=u)}return e=e.replace(/\n$/,"")+`
`,i?'<pre><code class="'+this.options.langPrefix+w(i,!0)+'">'+(r?e:w(e,!0))+`</code></pre>
`:"<pre><code>"+(r?e:w(e,!0))+`</code></pre>
`}},{key:"blockquote",value:function(e){return`<blockquote>
`+e+`</blockquote>
`}},{key:"html",value:function(e){return e}},{key:"heading",value:function(e,t,r,i){return this.options.headerIds?"<h"+t+' id="'+this.options.headerPrefix+i.slug(r)+'">'+e+"</h"+t+`>
`:"<h"+t+">"+e+"</h"+t+`>
`}},{key:"hr",value:function(){return this.options.xhtml?`<hr/>
`:`<hr>
`}},{key:"list",value:function(e,t,r){var i=t?"ol":"ul";return"<"+i+(t&&r!==1?' start="'+r+'"':"")+`>
`+e+"</"+i+`>
`}},{key:"listitem",value:function(e){return"<li>"+e+`</li>
`}},{key:"checkbox",value:function(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}},{key:"paragraph",value:function(e){return"<p>"+e+`</p>
`}},{key:"table",value:function(e,t){return t&&(t="<tbody>"+t+"</tbody>"),`<table>
<thead>
`+e+`</thead>
`+t+`</table>
`}},{key:"tablerow",value:function(e){return`<tr>
`+e+`</tr>
`}},{key:"tablecell",value:function(e,t){var r=t.header?"th":"td";return(t.align?"<"+r+' align="'+t.align+'">':"<"+r+">")+e+"</"+r+`>
`}},{key:"strong",value:function(e){return"<strong>"+e+"</strong>"}},{key:"em",value:function(e){return"<em>"+e+"</em>"}},{key:"codespan",value:function(e){return"<code>"+e+"</code>"}},{key:"br",value:function(){return this.options.xhtml?"<br/>":"<br>"}},{key:"del",value:function(e){return"<del>"+e+"</del>"}},{key:"link",value:function(e,t,r){if((e=Bn(this.options.sanitize,this.options.baseUrl,e))===null)return r;var i='<a href="'+w(e)+'"';return t&&(i+=' title="'+t+'"'),i+=">"+r+"</a>"}},{key:"image",value:function(e,t,r){if((e=Bn(this.options.sanitize,this.options.baseUrl,e))===null)return r;var i='<img src="'+e+'" alt="'+r+'"';return t&&(i+=' title="'+t+'"'),i+=this.options.xhtml?"/>":">"}},{key:"text",value:function(e){return e}}]),n}(),sr=function(){function n(){et(this,n)}return nt(n,[{key:"strong",value:function(e){return e}},{key:"em",value:function(e){return e}},{key:"codespan",value:function(e){return e}},{key:"del",value:function(e){return e}},{key:"html",value:function(e){return e}},{key:"text",value:function(e){return e}},{key:"link",value:function(e,t,r){return""+r}},{key:"image",value:function(e,t,r){return""+r}},{key:"br",value:function(){return""}}]),n}(),lr=function(){function n(){et(this,n),this.seen={}}return nt(n,[{key:"serialize",value:function(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}},{key:"getNextSafeSlug",value:function(e,t){var r=e,i=0;if(this.seen.hasOwnProperty(r)){i=this.seen[e];do r=e+"-"+ ++i;while(this.seen.hasOwnProperty(r))}return t||(this.seen[e]=i,this.seen[r]=0),r}},{key:"slug",value:function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=this.serialize(e);return this.getNextSafeSlug(r,t.dryrun)}}]),n}(),lt=function(){function n(e){et(this,n),this.options=e||Q,this.options.renderer=this.options.renderer||new ae,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new sr,this.slugger=new lr}return nt(n,[{key:"parse",value:function(e){var t,r,i,u,s,o,a,c,l,p,d,h,D,v,g,k,x,A,S,j=!(arguments.length>1&&arguments[1]!==void 0)||arguments[1],b="",R=e.length;for(t=0;t<R;t++)if(p=e[t],!(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[p.type])||(S=this.options.extensions.renderers[p.type].call({parser:this},p))===!1&&["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(p.type))switch(p.type){case"space":continue;case"hr":b+=this.renderer.hr();continue;case"heading":b+=this.renderer.heading(this.parseInline(p.tokens),p.depth,ar(this.parseInline(p.tokens,this.textRenderer)),this.slugger);continue;case"code":b+=this.renderer.code(p.text,p.lang,p.escaped);continue;case"table":for(c="",a="",u=p.header.length,r=0;r<u;r++)a+=this.renderer.tablecell(this.parseInline(p.header[r].tokens),{header:!0,align:p.align[r]});for(c+=this.renderer.tablerow(a),l="",u=p.rows.length,r=0;r<u;r++){for(a="",s=(o=p.rows[r]).length,i=0;i<s;i++)a+=this.renderer.tablecell(this.parseInline(o[i].tokens),{header:!1,align:p.align[i]});l+=this.renderer.tablerow(a)}b+=this.renderer.table(c,l);continue;case"blockquote":l=this.parse(p.tokens),b+=this.renderer.blockquote(l);continue;case"list":for(d=p.ordered,h=p.start,D=p.loose,u=p.items.length,l="",r=0;r<u;r++)k=(g=p.items[r]).checked,x=g.task,v="",g.task&&(A=this.renderer.checkbox(k),D?g.tokens.length>0&&g.tokens[0].type==="paragraph"?(g.tokens[0].text=A+" "+g.tokens[0].text,g.tokens[0].tokens&&g.tokens[0].tokens.length>0&&g.tokens[0].tokens[0].type==="text"&&(g.tokens[0].tokens[0].text=A+" "+g.tokens[0].tokens[0].text)):g.tokens.unshift({type:"text",text:A}):v+=A),v+=this.parse(g.tokens,D),l+=this.renderer.listitem(v,x,k);b+=this.renderer.list(l,d,h);continue;case"html":b+=this.renderer.html(p.text);continue;case"paragraph":b+=this.renderer.paragraph(this.parseInline(p.tokens));continue;case"text":for(l=p.tokens?this.parseInline(p.tokens):p.text;t+1<R&&e[t+1].type==="text";)l+=`
`+((p=e[++t]).tokens?this.parseInline(p.tokens):p.text);b+=j?this.renderer.paragraph(l):l;continue;default:var $='Token with "'+p.type+'" type was not found.';if(this.options.silent)return void console.error($);throw new Error($)}else b+=S||"";return b}},{key:"parseInline",value:function(e,t){t=t||this.renderer;var r,i,u,s="",o=e.length;for(r=0;r<o;r++)if(i=e[r],!(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type])||(u=this.options.extensions.renderers[i.type].call({parser:this},i))===!1&&["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type))switch(i.type){case"escape":s+=t.text(i.text);break;case"html":s+=t.html(i.text);break;case"link":s+=t.link(i.href,i.title,this.parseInline(i.tokens,t));break;case"image":s+=t.image(i.href,i.title,i.text);break;case"strong":s+=t.strong(this.parseInline(i.tokens,t));break;case"em":s+=t.em(this.parseInline(i.tokens,t));break;case"codespan":s+=t.codespan(i.text);break;case"br":s+=t.br();break;case"del":s+=t.del(this.parseInline(i.tokens,t));break;case"text":s+=t.text(i.text);break;default:var a='Token with "'+i.type+'" type was not found.';if(this.options.silent)return void console.error(a);throw new Error(a)}else s+=u||"";return s}}],[{key:"parse",value:function(e,t){return new n(t).parse(e)}},{key:"parseInline",value:function(e,t){return new n(t).parseInline(e)}}]),n}();function y(n,e,t){if(n==null)throw new Error("marked(): input parameter is undefined or null");if(typeof n!="string")throw new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected");if(typeof e=="function"&&(t=e,e=null),or(e=z({},y.defaults,e||{})),t){var r,i=e.highlight;try{r=st.lex(n,e)}catch(a){return t(a)}var u=function(a){var c;if(!a)try{e.walkTokens&&y.walkTokens(r,e.walkTokens),c=lt.parse(r,e)}catch(l){a=l}return e.highlight=i,a?t(a):t(null,c)};if(!i||i.length<3||(delete e.highlight,!r.length))return u();var s=0;return y.walkTokens(r,function(a){a.type==="code"&&(s++,setTimeout(function(){i(a.text,a.lang,function(c,l){if(c)return u(c);l!=null&&l!==a.text&&(a.text=l,a.escaped=!0),--s===0&&u()})},0))}),void(s===0&&u())}try{var o=st.lex(n,e);return e.walkTokens&&y.walkTokens(o,e.walkTokens),lt.parse(o,e)}catch(a){if(a.message+=`
Please report this to https://github.com/markedjs/marked.`,e.silent)return"<p>An error occurred:</p><pre>"+w(a.message+"",!0)+"</pre>";throw a}}y.options=y.setOptions=function(n){var e;return z(y.defaults,n),e=y.defaults,Q=e,y},y.getDefaults=ms,y.defaults=Q,y.use=function(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];var r,i=z.apply(void 0,[{}].concat(e)),u=y.defaults.extensions||{renderers:{},childTokens:{}};e.forEach(function(s){if(s.extensions&&(r=!0,s.extensions.forEach(function(a){if(!a.name)throw new Error("extension name required");if(a.renderer){var c=u.renderers?u.renderers[a.name]:null;u.renderers[a.name]=c?function(){for(var l=arguments.length,p=new Array(l),d=0;d<l;d++)p[d]=arguments[d];var h=a.renderer.apply(this,p);return h===!1&&(h=c.apply(this,p)),h}:a.renderer}if(a.tokenizer){if(!a.level||a.level!=="block"&&a.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");u[a.level]?u[a.level].unshift(a.tokenizer):u[a.level]=[a.tokenizer],a.start&&(a.level==="block"?u.startBlock?u.startBlock.push(a.start):u.startBlock=[a.start]:a.level==="inline"&&(u.startInline?u.startInline.push(a.start):u.startInline=[a.start]))}a.childTokens&&(u.childTokens[a.name]=a.childTokens)})),s.renderer&&function(){var a=y.defaults.renderer||new ae,c=function(p){var d=a[p];a[p]=function(){for(var h=arguments.length,D=new Array(h),v=0;v<h;v++)D[v]=arguments[v];var g=s.renderer[p].apply(a,D);return g===!1&&(g=d.apply(a,D)),g}};for(var l in s.renderer)c(l);i.renderer=a}(),s.tokenizer&&function(){var a=y.defaults.tokenizer||new ue,c=function(p){var d=a[p];a[p]=function(){for(var h=arguments.length,D=new Array(h),v=0;v<h;v++)D[v]=arguments[v];var g=s.tokenizer[p].apply(a,D);return g===!1&&(g=d.apply(a,D)),g}};for(var l in s.tokenizer)c(l);i.tokenizer=a}(),s.walkTokens){var o=y.defaults.walkTokens;i.walkTokens=function(a){s.walkTokens.call(this,a),o&&o.call(this,a)}}r&&(i.extensions=u),y.setOptions(i)})},y.walkTokens=function(n,e){var t,r=it(n);try{var i=function(){var u=t.value;switch(e.call(y,u),u.type){case"table":var s,o=it(u.header);try{for(o.s();!(s=o.n()).done;){var a=s.value;y.walkTokens(a.tokens,e)}}catch(D){o.e(D)}finally{o.f()}var c,l=it(u.rows);try{for(l.s();!(c=l.n()).done;){var p,d=it(c.value);try{for(d.s();!(p=d.n()).done;){var h=p.value;y.walkTokens(h.tokens,e)}}catch(D){d.e(D)}finally{d.f()}}}catch(D){l.e(D)}finally{l.f()}break;case"list":y.walkTokens(u.items,e);break;default:y.defaults.extensions&&y.defaults.extensions.childTokens&&y.defaults.extensions.childTokens[u.type]?y.defaults.extensions.childTokens[u.type].forEach(function(D){y.walkTokens(u[D],e)}):u.tokens&&y.walkTokens(u.tokens,e)}};for(r.s();!(t=r.n()).done;)i()}catch(u){r.e(u)}finally{r.f()}},y.parseInline=function(n,e){if(n==null)throw new Error("marked.parseInline(): input parameter is undefined or null");if(typeof n!="string")throw new Error("marked.parseInline(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected");or(e=z({},y.defaults,e||{}));try{var t=st.lexInline(n,e);return e.walkTokens&&y.walkTokens(t,e.walkTokens),lt.parseInline(t,e)}catch(r){if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,e.silent)return"<p>An error occurred:</p><pre>"+w(r.message+"",!0)+"</pre>";throw r}},y.Parser=lt,y.parser=lt.parse,y.Renderer=ae,y.TextRenderer=sr,y.Lexer=st,y.lexer=st.lex,y.Tokenizer=ue,y.Slugger=lr,y.parse=y;function _s(){var n,e,t=null;function r(){if(t&&!t.closed)t.focus();else{if((t=window.open("about:blank","reveal.js - Notes","width=1100,height=700")).marked=y,t.document.write(`<!--
	NOTE: You need to build the notes plugin after making changes to this file.
-->
<html lang="en">
	<head>
		<meta charset="utf-8">

		<title>reveal.js - Speaker View</title>

		<style>
			body {
				font-family: Helvetica;
				font-size: 18px;
			}

			#current-slide,
			#upcoming-slide,
			#speaker-controls {
				padding: 6px;
				box-sizing: border-box;
				-moz-box-sizing: border-box;
			}

			#current-slide iframe,
			#upcoming-slide iframe {
				width: 100%;
				height: 100%;
				border: 1px solid #ddd;
			}

			#current-slide .label,
			#upcoming-slide .label {
				position: absolute;
				top: 10px;
				left: 10px;
				z-index: 2;
			}

			#connection-status {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 20;
				padding: 30% 20% 20% 20%;
				font-size: 18px;
				color: #222;
				background: #fff;
				text-align: center;
				box-sizing: border-box;
				line-height: 1.4;
			}

			.overlay-element {
				height: 34px;
				line-height: 34px;
				padding: 0 10px;
				text-shadow: none;
				background: rgba( 220, 220, 220, 0.8 );
				color: #222;
				font-size: 14px;
			}

			.overlay-element.interactive:hover {
				background: rgba( 220, 220, 220, 1 );
			}

			#current-slide {
				position: absolute;
				width: 60%;
				height: 100%;
				top: 0;
				left: 0;
				padding-right: 0;
			}

			#upcoming-slide {
				position: absolute;
				width: 40%;
				height: 40%;
				right: 0;
				top: 0;
			}

			/* Speaker controls */
			#speaker-controls {
				position: absolute;
				top: 40%;
				right: 0;
				width: 40%;
				height: 60%;
				overflow: auto;
				font-size: 18px;
			}

				.speaker-controls-time.hidden,
				.speaker-controls-notes.hidden {
					display: none;
				}

				.speaker-controls-time .label,
				.speaker-controls-pace .label,
				.speaker-controls-notes .label {
					text-transform: uppercase;
					font-weight: normal;
					font-size: 0.66em;
					color: #666;
					margin: 0;
				}

				.speaker-controls-time, .speaker-controls-pace {
					border-bottom: 1px solid rgba( 200, 200, 200, 0.5 );
					margin-bottom: 10px;
					padding: 10px 16px;
					padding-bottom: 20px;
					cursor: pointer;
				}

				.speaker-controls-time .reset-button {
					opacity: 0;
					float: right;
					color: #666;
					text-decoration: none;
				}
				.speaker-controls-time:hover .reset-button {
					opacity: 1;
				}

				.speaker-controls-time .timer,
				.speaker-controls-time .clock {
					width: 50%;
				}

				.speaker-controls-time .timer,
				.speaker-controls-time .clock,
				.speaker-controls-time .pacing .hours-value,
				.speaker-controls-time .pacing .minutes-value,
				.speaker-controls-time .pacing .seconds-value {
					font-size: 1.9em;
				}

				.speaker-controls-time .timer {
					float: left;
				}

				.speaker-controls-time .clock {
					float: right;
					text-align: right;
				}

				.speaker-controls-time span.mute {
					opacity: 0.3;
				}

				.speaker-controls-time .pacing-title {
					margin-top: 5px;
				}

				.speaker-controls-time .pacing.ahead {
					color: blue;
				}

				.speaker-controls-time .pacing.on-track {
					color: green;
				}

				.speaker-controls-time .pacing.behind {
					color: red;
				}

				.speaker-controls-notes {
					padding: 10px 16px;
				}

				.speaker-controls-notes .value {
					margin-top: 5px;
					line-height: 1.4;
					font-size: 1.2em;
				}

			/* Layout selector\xA0*/
			#speaker-layout {
				position: absolute;
				top: 10px;
				right: 10px;
				color: #222;
				z-index: 10;
			}
				#speaker-layout select {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					border: 0;
					box-shadow: 0;
					cursor: pointer;
					opacity: 0;

					font-size: 1em;
					background-color: transparent;

					-moz-appearance: none;
					-webkit-appearance: none;
					-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
				}

				#speaker-layout select:focus {
					outline: none;
					box-shadow: none;
				}

			.clear {
				clear: both;
			}

			/* Speaker layout: Wide */
			body[data-speaker-layout="wide"] #current-slide,
			body[data-speaker-layout="wide"] #upcoming-slide {
				width: 50%;
				height: 45%;
				padding: 6px;
			}

			body[data-speaker-layout="wide"] #current-slide {
				top: 0;
				left: 0;
			}

			body[data-speaker-layout="wide"] #upcoming-slide {
				top: 0;
				left: 50%;
			}

			body[data-speaker-layout="wide"] #speaker-controls {
				top: 45%;
				left: 0;
				width: 100%;
				height: 50%;
				font-size: 1.25em;
			}

			/* Speaker layout: Tall */
			body[data-speaker-layout="tall"] #current-slide,
			body[data-speaker-layout="tall"] #upcoming-slide {
				width: 45%;
				height: 50%;
				padding: 6px;
			}

			body[data-speaker-layout="tall"] #current-slide {
				top: 0;
				left: 0;
			}

			body[data-speaker-layout="tall"] #upcoming-slide {
				top: 50%;
				left: 0;
			}

			body[data-speaker-layout="tall"] #speaker-controls {
				padding-top: 40px;
				top: 0;
				left: 45%;
				width: 55%;
				height: 100%;
				font-size: 1.25em;
			}

			/* Speaker layout: Notes only */
			body[data-speaker-layout="notes-only"] #current-slide,
			body[data-speaker-layout="notes-only"] #upcoming-slide {
				display: none;
			}

			body[data-speaker-layout="notes-only"] #speaker-controls {
				padding-top: 40px;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				font-size: 1.25em;
			}

			@media screen and (max-width: 1080px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 16px;
				}
			}

			@media screen and (max-width: 900px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 14px;
				}
			}

			@media screen and (max-width: 800px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 12px;
				}
			}

		</style>
	</head>

	<body>

		<div id="connection-status">Loading speaker view...</div>

		<div id="current-slide"></div>
		<div id="upcoming-slide"><span class="overlay-element label">Upcoming</span></div>
		<div id="speaker-controls">
			<div class="speaker-controls-time">
				<h4 class="label">Time <span class="reset-button">Click to Reset</span></h4>
				<div class="clock">
					<span class="clock-value">0:00 AM</span>
				</div>
				<div class="timer">
					<span class="hours-value">00</span><span class="minutes-value">:00</span><span class="seconds-value">:00</span>
				</div>
				<div class="clear"></div>

				<h4 class="label pacing-title" style="display: none">Pacing \u2013 Time to finish current slide</h4>
				<div class="pacing" style="display: none">
					<span class="hours-value">00</span><span class="minutes-value">:00</span><span class="seconds-value">:00</span>
				</div>
			</div>

			<div class="speaker-controls-notes hidden">
				<h4 class="label">Notes</h4>
				<div class="value"></div>
			</div>
		</div>
		<div id="speaker-layout" class="overlay-element interactive">
			<span class="speaker-layout-label"></span>
			<select class="speaker-layout-dropdown"></select>
		</div>

		<script>

			(function() {

				var notes,
					notesValue,
					currentState,
					currentSlide,
					upcomingSlide,
					layoutLabel,
					layoutDropdown,
					pendingCalls = {},
					lastRevealApiCallId = 0,
					connected = false,
					whitelistedWindows = [window.opener];

				var SPEAKER_LAYOUTS = {
					'default': 'Default',
					'wide': 'Wide',
					'tall': 'Tall',
					'notes-only': 'Notes only'
				};

				setupLayout();

				var connectionStatus = document.querySelector( '#connection-status' );
				var connectionTimeout = setTimeout( function() {
					connectionStatus.innerHTML = 'Error connecting to main window.<br>Please try closing and reopening the speaker view.';
				}, 5000 );
;
				window.addEventListener( 'message', function( event ) {

					// Validate the origin of this message to prevent XSS
					if( window.location.origin !== event.origin && whitelistedWindows.indexOf( event.source ) === -1 ) {
						return;
					}

					clearTimeout( connectionTimeout );
					connectionStatus.style.display = 'none';

					var data = JSON.parse( event.data );

					// The overview mode is only useful to the reveal.js instance
					// where navigation occurs so we don't sync it
					if( data.state ) delete data.state.overview;

					// Messages sent by the notes plugin inside of the main window
					if( data && data.namespace === 'reveal-notes' ) {
						if( data.type === 'connect' ) {
							handleConnectMessage( data );
						}
						else if( data.type === 'state' ) {
							handleStateMessage( data );
						}
						else if( data.type === 'return' ) {
							pendingCalls[data.callId](data.result);
							delete pendingCalls[data.callId];
						}
					}
					// Messages sent by the reveal.js inside of the current slide preview
					else if( data && data.namespace === 'reveal' ) {
						if( /ready/.test( data.eventName ) ) {
							// Send a message back to notify that the handshake is complete
							window.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'connected'} ), '*' );
						}
						else if( /slidechanged|fragmentshown|fragmenthidden|paused|resumed/.test( data.eventName ) && currentState !== JSON.stringify( data.state ) ) {

							dispatchStateToMainWindow( data.state );

						}
					}

				} );

				/**
				 * Updates the presentation in the main window to match the state
				 * of the presentation in the notes window.
				 */
				const dispatchStateToMainWindow = debounce(( state ) => {
					window.opener.postMessage( JSON.stringify({ method: 'setState', args: [ state ]} ), '*' );
				}, 500);

				/**
				 * Asynchronously calls the Reveal.js API of the main frame.
				 */
				function callRevealApi( methodName, methodArguments, callback ) {

					var callId = ++lastRevealApiCallId;
					pendingCalls[callId] = callback;
					window.opener.postMessage( JSON.stringify( {
						namespace: 'reveal-notes',
						type: 'call',
						callId: callId,
						methodName: methodName,
						arguments: methodArguments
					} ), '*' );

				}

				/**
				 * Called when the main window is trying to establish a
				 * connection.
				 */
				function handleConnectMessage( data ) {

					if( connected === false ) {
						connected = true;

						setupIframes( data );
						setupKeyboard();
						setupNotes();
						setupTimer();
						setupHeartbeat();
					}

				}

				/**
				 * Called when the main window sends an updated state.
				 */
				function handleStateMessage( data ) {

					// Store the most recently set state to avoid circular loops
					// applying the same state
					currentState = JSON.stringify( data.state );

					// No need for updating the notes in case of fragment changes
					if ( data.notes ) {
						notes.classList.remove( 'hidden' );
						notesValue.style.whiteSpace = data.whitespace;
						if( data.markdown ) {
							notesValue.innerHTML = marked( data.notes );
						}
						else {
							notesValue.innerHTML = data.notes;
						}
					}
					else {
						notes.classList.add( 'hidden' );
					}

					// Update the note slides
					currentSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ data.state ] }), '*' );
					upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ data.state ] }), '*' );
					upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'next' }), '*' );

				}

				// Limit to max one state update per X ms
				handleStateMessage = debounce( handleStateMessage, 200 );

				/**
				 * Forward keyboard events to the current slide window.
				 * This enables keyboard events to work even if focus
				 * isn't set on the current slide iframe.
				 *
				 * Block F5 default handling, it reloads and disconnects
				 * the speaker notes window.
				 */
				function setupKeyboard() {

					document.addEventListener( 'keydown', function( event ) {
						if( event.keyCode === 116 || ( event.metaKey && event.keyCode === 82 ) ) {
							event.preventDefault();
							return false;
						}
						currentSlide.contentWindow.postMessage( JSON.stringify({ method: 'triggerKey', args: [ event.keyCode ] }), '*' );
					} );

				}

				/**
				 * Creates the preview iframes.
				 */
				function setupIframes( data ) {

					var params = [
						'receiver',
						'progress=false',
						'history=false',
						'transition=none',
						'autoSlide=0',
						'backgroundTransition=none'
					].join( '&' );

					var urlSeparator = /\\?/.test(data.url) ? '&' : '?';
					var hash = '#/' + data.state.indexh + '/' + data.state.indexv;
					var currentURL = data.url + urlSeparator + params + '&postMessageEvents=true' + hash;
					var upcomingURL = data.url + urlSeparator + params + '&controls=false' + hash;

					currentSlide = document.createElement( 'iframe' );
					currentSlide.setAttribute( 'width', 1280 );
					currentSlide.setAttribute( 'height', 1024 );
					currentSlide.setAttribute( 'src', currentURL );
					document.querySelector( '#current-slide' ).appendChild( currentSlide );

					upcomingSlide = document.createElement( 'iframe' );
					upcomingSlide.setAttribute( 'width', 640 );
					upcomingSlide.setAttribute( 'height', 512 );
					upcomingSlide.setAttribute( 'src', upcomingURL );
					document.querySelector( '#upcoming-slide' ).appendChild( upcomingSlide );

					whitelistedWindows.push( currentSlide.contentWindow, upcomingSlide.contentWindow );

				}

				/**
				 * Setup the notes UI.
				 */
				function setupNotes() {

					notes = document.querySelector( '.speaker-controls-notes' );
					notesValue = document.querySelector( '.speaker-controls-notes .value' );

				}

				/**
				 * We send out a heartbeat at all times to ensure we can
				 * reconnect with the main presentation window after reloads.
				 */
				function setupHeartbeat() {

					setInterval( () => {
						window.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'heartbeat'} ), '*' );
					}, 1000 );

				}

				function getTimings( callback ) {

					callRevealApi( 'getSlidesAttributes', [], function ( slideAttributes ) {
						callRevealApi( 'getConfig', [], function ( config ) {
							var totalTime = config.totalTime;
							var minTimePerSlide = config.minimumTimePerSlide || 0;
							var defaultTiming = config.defaultTiming;
							if ((defaultTiming == null) && (totalTime == null)) {
								callback(null);
								return;
							}
							// Setting totalTime overrides defaultTiming
							if (totalTime) {
								defaultTiming = 0;
							}
							var timings = [];
							for ( var i in slideAttributes ) {
								var slide = slideAttributes[ i ];
								var timing = defaultTiming;
								if( slide.hasOwnProperty( 'data-timing' )) {
									var t = slide[ 'data-timing' ];
									timing = parseInt(t);
									if( isNaN(timing) ) {
										console.warn("Could not parse timing '" + t + "' of slide " + i + "; using default of " + defaultTiming);
										timing = defaultTiming;
									}
								}
								timings.push(timing);
							}
							if ( totalTime ) {
								// After we've allocated time to individual slides, we summarize it and
								// subtract it from the total time
								var remainingTime = totalTime - timings.reduce( function(a, b) { return a + b; }, 0 );
								// The remaining time is divided by the number of slides that have 0 seconds
								// allocated at the moment, giving the average time-per-slide on the remaining slides
								var remainingSlides = (timings.filter( function(x) { return x == 0 }) ).length
								var timePerSlide = Math.round( remainingTime / remainingSlides, 0 )
								// And now we replace every zero-value timing with that average
								timings = timings.map( function(x) { return (x==0 ? timePerSlide : x) } );
							}
							var slidesUnderMinimum = timings.filter( function(x) { return (x < minTimePerSlide) } ).length
							if ( slidesUnderMinimum ) {
								message = "The pacing time for " + slidesUnderMinimum + " slide(s) is under the configured minimum of " + minTimePerSlide + " seconds. Check the data-timing attribute on individual slides, or consider increasing the totalTime or minimumTimePerSlide configuration options (or removing some slides).";
								alert(message);
							}
							callback( timings );
						} );
					} );

				}

				/**
				 * Return the number of seconds allocated for presenting
				 * all slides up to and including this one.
				 */
				function getTimeAllocated( timings, callback ) {

					callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
						var allocated = 0;
						for (var i in timings.slice(0, currentSlide + 1)) {
							allocated += timings[i];
						}
						callback( allocated );
					} );

				}

				/**
				 * Create the timer and clock and start updating them
				 * at an interval.
				 */
				function setupTimer() {

					var start = new Date(),
					timeEl = document.querySelector( '.speaker-controls-time' ),
					clockEl = timeEl.querySelector( '.clock-value' ),
					hoursEl = timeEl.querySelector( '.hours-value' ),
					minutesEl = timeEl.querySelector( '.minutes-value' ),
					secondsEl = timeEl.querySelector( '.seconds-value' ),
					pacingTitleEl = timeEl.querySelector( '.pacing-title' ),
					pacingEl = timeEl.querySelector( '.pacing' ),
					pacingHoursEl = pacingEl.querySelector( '.hours-value' ),
					pacingMinutesEl = pacingEl.querySelector( '.minutes-value' ),
					pacingSecondsEl = pacingEl.querySelector( '.seconds-value' );

					var timings = null;
					getTimings( function ( _timings ) {

						timings = _timings;
						if (_timings !== null) {
							pacingTitleEl.style.removeProperty('display');
							pacingEl.style.removeProperty('display');
						}

						// Update once directly
						_updateTimer();

						// Then update every second
						setInterval( _updateTimer, 1000 );

					} );


					function _resetTimer() {

						if (timings == null) {
							start = new Date();
							_updateTimer();
						}
						else {
							// Reset timer to beginning of current slide
							getTimeAllocated( timings, function ( slideEndTimingSeconds ) {
								var slideEndTiming = slideEndTimingSeconds * 1000;
								callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
									var currentSlideTiming = timings[currentSlide] * 1000;
									var previousSlidesTiming = slideEndTiming - currentSlideTiming;
									var now = new Date();
									start = new Date(now.getTime() - previousSlidesTiming);
									_updateTimer();
								} );
							} );
						}

					}

					timeEl.addEventListener( 'click', function() {
						_resetTimer();
						return false;
					} );

					function _displayTime( hrEl, minEl, secEl, time) {

						var sign = Math.sign(time) == -1 ? "-" : "";
						time = Math.abs(Math.round(time / 1000));
						var seconds = time % 60;
						var minutes = Math.floor( time / 60 ) % 60 ;
						var hours = Math.floor( time / ( 60 * 60 )) ;
						hrEl.innerHTML = sign + zeroPadInteger( hours );
						if (hours == 0) {
							hrEl.classList.add( 'mute' );
						}
						else {
							hrEl.classList.remove( 'mute' );
						}
						minEl.innerHTML = ':' + zeroPadInteger( minutes );
						if (hours == 0 && minutes == 0) {
							minEl.classList.add( 'mute' );
						}
						else {
							minEl.classList.remove( 'mute' );
						}
						secEl.innerHTML = ':' + zeroPadInteger( seconds );
					}

					function _updateTimer() {

						var diff, hours, minutes, seconds,
						now = new Date();

						diff = now.getTime() - start.getTime();

						clockEl.innerHTML = now.toLocaleTimeString( 'en-US', { hour12: true, hour: '2-digit', minute:'2-digit' } );
						_displayTime( hoursEl, minutesEl, secondsEl, diff );
						if (timings !== null) {
							_updatePacing(diff);
						}

					}

					function _updatePacing(diff) {

						getTimeAllocated( timings, function ( slideEndTimingSeconds ) {
							var slideEndTiming = slideEndTimingSeconds * 1000;

							callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
								var currentSlideTiming = timings[currentSlide] * 1000;
								var timeLeftCurrentSlide = slideEndTiming - diff;
								if (timeLeftCurrentSlide < 0) {
									pacingEl.className = 'pacing behind';
								}
								else if (timeLeftCurrentSlide < currentSlideTiming) {
									pacingEl.className = 'pacing on-track';
								}
								else {
									pacingEl.className = 'pacing ahead';
								}
								_displayTime( pacingHoursEl, pacingMinutesEl, pacingSecondsEl, timeLeftCurrentSlide );
							} );
						} );
					}

				}

				/**
				 * Sets up the speaker view layout and layout selector.
				 */
				function setupLayout() {

					layoutDropdown = document.querySelector( '.speaker-layout-dropdown' );
					layoutLabel = document.querySelector( '.speaker-layout-label' );

					// Render the list of available layouts
					for( var id in SPEAKER_LAYOUTS ) {
						var option = document.createElement( 'option' );
						option.setAttribute( 'value', id );
						option.textContent = SPEAKER_LAYOUTS[ id ];
						layoutDropdown.appendChild( option );
					}

					// Monitor the dropdown for changes
					layoutDropdown.addEventListener( 'change', function( event ) {

						setLayout( layoutDropdown.value );

					}, false );

					// Restore any currently persisted layout
					setLayout( getLayout() );

				}

				/**
				 * Sets a new speaker view layout. The layout is persisted
				 * in local storage.
				 */
				function setLayout( value ) {

					var title = SPEAKER_LAYOUTS[ value ];

					layoutLabel.innerHTML = 'Layout' + ( title ? ( ': ' + title ) : '' );
					layoutDropdown.value = value;

					document.body.setAttribute( 'data-speaker-layout', value );

					// Persist locally
					if( supportsLocalStorage() ) {
						window.localStorage.setItem( 'reveal-speaker-layout', value );
					}

				}

				/**
				 * Returns the ID of the most recently set speaker layout
				 * or our default layout if none has been set.
				 */
				function getLayout() {

					if( supportsLocalStorage() ) {
						var layout = window.localStorage.getItem( 'reveal-speaker-layout' );
						if( layout ) {
							return layout;
						}
					}

					// Default to the first record in the layouts hash
					for( var id in SPEAKER_LAYOUTS ) {
						return id;
					}

				}

				function supportsLocalStorage() {

					try {
						localStorage.setItem('test', 'test');
						localStorage.removeItem('test');
						return true;
					}
					catch( e ) {
						return false;
					}

				}

				function zeroPadInteger( num ) {

					var str = '00' + parseInt( num );
					return str.substring( str.length - 2 );

				}

				/**
				 * Limits the frequency at which a function can be called.
				 */
				function debounce( fn, ms ) {

					var lastTime = 0,
						timeout;

					return function() {

						var args = arguments;
						var context = this;

						clearTimeout( timeout );

						var timeSinceLastCall = Date.now() - lastTime;
						if( timeSinceLastCall > ms ) {
							fn.apply( context, args );
							lastTime = Date.now();
						}
						else {
							timeout = setTimeout( function() {
								fn.apply( context, args );
								lastTime = Date.now();
							}, ms - timeSinceLastCall );
						}

					}

				}

			})();

		<\/script>
	</body>
</html>`),!t)return void alert("Speaker view popup failed to open. Please make sure popups are allowed and reopen the speaker view.");o=e.getConfig().url,a=typeof o=="string"?o:window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,n=setInterval(function(){t.postMessage(JSON.stringify({namespace:"reveal-notes",type:"connect",state:e.getState(),url:a}),"*")},500),window.addEventListener("message",u)}var o,a}function i(o){var a=e.getCurrentSlide(),c=a.querySelector("aside.notes"),l=a.querySelector(".current-fragment"),p={namespace:"reveal-notes",type:"state",notes:"",markdown:!1,whitespace:"normal",state:e.getState()};if(a.hasAttribute("data-notes")&&(p.notes=a.getAttribute("data-notes"),p.whitespace="pre-wrap"),l){var d=l.querySelector("aside.notes");d?c=d:l.hasAttribute("data-notes")&&(p.notes=l.getAttribute("data-notes"),p.whitespace="pre-wrap",c=null)}c&&(p.notes=c.innerHTML,p.markdown=typeof c.getAttribute("data-markdown")=="string"),t.postMessage(JSON.stringify(p),"*")}function u(o){var a,c,l,p,d=JSON.parse(o.data);d&&d.namespace==="reveal-notes"&&d.type==="connected"?(clearInterval(n),s()):d&&d.namespace==="reveal-notes"&&d.type==="call"&&(a=d.methodName,c=d.arguments,l=d.callId,p=e[a].apply(e,c),t.postMessage(JSON.stringify({namespace:"reveal-notes",type:"return",result:p,callId:l}),"*"))}function s(){e.on("slidechanged",i),e.on("fragmentshown",i),e.on("fragmenthidden",i),e.on("overviewhidden",i),e.on("overviewshown",i),e.on("paused",i),e.on("resumed",i),i()}return{id:"notes",init:function(o){e=o,/receiver/i.test(window.location.search)||(window.location.search.match(/(\?|\&)notes/gi)!==null?r():window.addEventListener("message",function(a){if(!t&&typeof a.data=="string"){var c;try{c=JSON.parse(a.data)}catch{}c&&c.namespace==="reveal-notes"&&c.type==="heartbeat"&&(l=a.source,t&&!t.closed?t.focus():(t=l,window.addEventListener("message",u),s()))}var l}),e.addKeyBinding({keyCode:83,key:"S",description:"Speaker notes view"},function(){r()}))},open:r}}export{_s as default};
