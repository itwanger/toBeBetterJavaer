import{_ as F}from"./app-6019c831.js";import{g as O,p as q,b as J}from"./add-html-label-4086481f.js";import{l as w,h as I,c as G,t as K,p as H,q as Q,k as U,r as R,o as D}from"./mermaid.core-557aeeb1.js";import{i as Z,a as X,b as Y}from"./edges-02da71a2-b3c4a57b.js";import{l as j}from"./isPlainObject-ab30fefb.js";import"./framework-bb7be5cb.js";import"./svgDraw-87c143cd-c1d6ca2d.js";import"./array-9f3ba611.js";import"./path-53f90ab3.js";const tt=(t,r,e)=>{const{parentById:o}=e,s=new Set;let n=t;for(;n;){if(s.add(n),n===r)return n;n=o[n]}for(n=r;n;){if(s.has(n))return n;n=o[n]}return"root"};let P;const m={},et={};let g={};const rt=function(t,r,e,o,s,n,u){const l=e.select(`[id="${r}"]`),y=l.insert("g").attr("class","nodes");return Object.keys(t).forEach(function(b){const i=t[b];let E="default";i.classes.length>0&&(E=i.classes.join(" "));const k=H(i.styles);let a=i.text!==void 0?i.text:i.id,p;const h={width:0,height:0};if(Q(G().flowchart.htmlLabels)){const f={label:a.replace(/fa[blrs]?:fa-[\w-]+/g,N=>`<i class='${N.replace(":"," ")}'></i>`)};p=J(l,f).node();const T=p.getBBox();h.width=T.width,h.height=T.height,h.labelNode=p,p.parentNode.removeChild(p)}else{const f=o.createElementNS("http://www.w3.org/2000/svg","text");f.setAttribute("style",k.labelStyle.replace("color:","fill:"));const T=a.split(U.lineBreakRegex);for(const W of T){const L=o.createElementNS("http://www.w3.org/2000/svg","tspan");L.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),L.setAttribute("dy","1em"),L.setAttribute("x","1"),L.textContent=W,f.appendChild(L)}p=f;const N=p.getBBox();h.width=N.width,h.height=N.height,h.labelNode=p}const _=[{id:i.id+"-west",layoutOptions:{"port.side":"WEST"}},{id:i.id+"-east",layoutOptions:{"port.side":"EAST"}},{id:i.id+"-south",layoutOptions:{"port.side":"SOUTH"}},{id:i.id+"-north",layoutOptions:{"port.side":"NORTH"}}];let S=0,d="",v={};switch(i.type){case"round":S=5,d="rect";break;case"square":d="rect";break;case"diamond":d="question",v={portConstraints:"FIXED_SIDE"};break;case"hexagon":d="hexagon";break;case"odd":d="rect_left_inv_arrow";break;case"lean_right":d="lean_right";break;case"lean_left":d="lean_left";break;case"trapezoid":d="trapezoid";break;case"inv_trapezoid":d="inv_trapezoid";break;case"odd_right":d="rect_left_inv_arrow";break;case"circle":d="circle";break;case"ellipse":d="ellipse";break;case"stadium":d="stadium";break;case"subroutine":d="subroutine";break;case"cylinder":d="cylinder";break;case"group":d="rect";break;case"doublecircle":d="doublecircle";break;default:d="rect"}const C={labelStyle:k.labelStyle,shape:d,labelText:a,rx:S,ry:S,class:E,style:k.style,id:i.id,link:i.link,linkTarget:i.linkTarget,tooltip:s.db.getTooltip(i.id)||"",domId:s.db.lookUpDomId(i.id),haveCallback:i.haveCallback,width:i.type==="group"?500:void 0,dir:i.dir,type:i.type,props:i.props,padding:G().flowchart.padding};let B,$;C.type!=="group"&&($=X(y,C,i.dir),B=$.node().getBBox());const x={id:i.id,ports:i.type==="diamond"?_:[],layoutOptions:v,labelText:a,labelData:h,domId:s.db.lookUpDomId(i.id),width:B==null?void 0:B.width,height:B==null?void 0:B.height,type:i.type,el:$,parent:n.parentById[i.id]};g[C.id]=x}),u},A=(t,r,e)=>{const o={TB:{in:{north:"north"},out:{south:"west",west:"east",east:"south"}},LR:{in:{west:"west"},out:{east:"south",south:"north",north:"east"}},RL:{in:{east:"east"},out:{west:"north",north:"south",south:"west"}},BT:{in:{south:"south"},out:{north:"east",east:"west",west:"north"}}};return o.TD=o.TB,w.info("abc88",e,r,t),o[e][r][t]},z=(t,r,e)=>{if(w.info("getNextPort abc88",{node:t,edgeDirection:r,graphDirection:e}),!m[t])switch(e){case"TB":case"TD":m[t]={inPosition:"north",outPosition:"south"};break;case"BT":m[t]={inPosition:"south",outPosition:"north"};break;case"RL":m[t]={inPosition:"east",outPosition:"west"};break;case"LR":m[t]={inPosition:"west",outPosition:"east"};break}const o=r==="in"?m[t].inPosition:m[t].outPosition;return r==="in"?m[t].inPosition=A(m[t].inPosition,r,e):m[t].outPosition=A(m[t].outPosition,r,e),o},ot=(t,r)=>{let e=t.start,o=t.end;const s=g[e],n=g[o];return!s||!n?{source:e,target:o}:(s.type==="diamond"&&(e=`${e}-${z(e,"out",r)}`),n.type==="diamond"&&(o=`${o}-${z(o,"in",r)}`),{source:e,target:o})},at=function(t,r,e,o){w.info("abc78 edges = ",t);const s=o.insert("g").attr("class","edgeLabels");let n={},u=r.db.getDirection(),l,y;if(t.defaultStyle!==void 0){const c=H(t.defaultStyle);l=c.style,y=c.labelStyle}return t.forEach(function(c){var b="L-"+c.start+"-"+c.end;n[b]===void 0?(n[b]=0,w.info("abc78 new entry",b,n[b])):(n[b]++,w.info("abc78 new entry",b,n[b]));let i=b+"-"+n[b];w.info("abc78 new link id to be used is",b,i,n[b]);var E="LS-"+c.start,k="LE-"+c.end;const a={style:"",labelStyle:""};switch(a.minlen=c.length||1,c.type==="arrow_open"?a.arrowhead="none":a.arrowhead="normal",a.arrowTypeStart="arrow_open",a.arrowTypeEnd="arrow_open",c.type){case"double_arrow_cross":a.arrowTypeStart="arrow_cross";case"arrow_cross":a.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":a.arrowTypeStart="arrow_point";case"arrow_point":a.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":a.arrowTypeStart="arrow_circle";case"arrow_circle":a.arrowTypeEnd="arrow_circle";break}let p="",h="";switch(c.stroke){case"normal":p="fill:none;",l!==void 0&&(p=l),y!==void 0&&(h=y),a.thickness="normal",a.pattern="solid";break;case"dotted":a.thickness="normal",a.pattern="dotted",a.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":a.thickness="thick",a.pattern="solid",a.style="stroke-width: 3.5px;fill:none;";break}if(c.style!==void 0){const v=H(c.style);p=v.style,h=v.labelStyle}a.style=a.style+=p,a.labelStyle=a.labelStyle+=h,c.interpolate!==void 0?a.curve=R(c.interpolate,D):t.defaultInterpolate!==void 0?a.curve=R(t.defaultInterpolate,D):a.curve=R(et.curve,D),c.text===void 0?c.style!==void 0&&(a.arrowheadStyle="fill: #333"):(a.arrowheadStyle="fill: #333",a.labelpos="c"),a.labelType="text",a.label=c.text.replace(U.lineBreakRegex,`
`),c.style===void 0&&(a.style=a.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),a.labelStyle=a.labelStyle.replace("color:","fill:"),a.id=i,a.classes="flowchart-link "+E+" "+k;const _=Y(s,a),{source:S,target:d}=ot(c,u);w.debug("abc78 source and target",S,d),e.edges.push({id:"e"+c.start+c.end,sources:[S],targets:[d],labelEl:_,labels:[{width:a.width,height:a.height,orgWidth:a.width,orgHeight:a.height,text:a.label,layoutOptions:{"edgeLabels.inline":"true","edgeLabels.placement":"CENTER"}}],edgeData:a})}),e},st=function(t,r,e,o){let s="";switch(o&&(s=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,s=s.replace(/\(/g,"\\("),s=s.replace(/\)/g,"\\)")),r.arrowTypeStart){case"arrow_cross":t.attr("marker-start","url("+s+"#"+e+"-crossStart)");break;case"arrow_point":t.attr("marker-start","url("+s+"#"+e+"-pointStart)");break;case"arrow_barb":t.attr("marker-start","url("+s+"#"+e+"-barbStart)");break;case"arrow_circle":t.attr("marker-start","url("+s+"#"+e+"-circleStart)");break;case"aggregation":t.attr("marker-start","url("+s+"#"+e+"-aggregationStart)");break;case"extension":t.attr("marker-start","url("+s+"#"+e+"-extensionStart)");break;case"composition":t.attr("marker-start","url("+s+"#"+e+"-compositionStart)");break;case"dependency":t.attr("marker-start","url("+s+"#"+e+"-dependencyStart)");break;case"lollipop":t.attr("marker-start","url("+s+"#"+e+"-lollipopStart)");break}switch(r.arrowTypeEnd){case"arrow_cross":t.attr("marker-end","url("+s+"#"+e+"-crossEnd)");break;case"arrow_point":t.attr("marker-end","url("+s+"#"+e+"-pointEnd)");break;case"arrow_barb":t.attr("marker-end","url("+s+"#"+e+"-barbEnd)");break;case"arrow_circle":t.attr("marker-end","url("+s+"#"+e+"-circleEnd)");break;case"aggregation":t.attr("marker-end","url("+s+"#"+e+"-aggregationEnd)");break;case"extension":t.attr("marker-end","url("+s+"#"+e+"-extensionEnd)");break;case"composition":t.attr("marker-end","url("+s+"#"+e+"-compositionEnd)");break;case"dependency":t.attr("marker-end","url("+s+"#"+e+"-dependencyEnd)");break;case"lollipop":t.attr("marker-end","url("+s+"#"+e+"-lollipopEnd)");break}},lt=function(t,r){w.info("Extracting classes"),r.db.clear("ver-2");try{return r.parse(t),r.db.getClasses()}catch{return{}}},nt=function(t){const r={parentById:{},childrenById:{}},e=t.getSubGraphs();return w.info("Subgraphs - ",e),e.forEach(function(o){o.nodes.forEach(function(s){r.parentById[s]=o.id,r.childrenById[o.id]===void 0&&(r.childrenById[o.id]=[]),r.childrenById[o.id].push(s)})}),e.forEach(function(o){o.id,r.parentById[o.id]!==void 0&&r.parentById[o.id]}),r},it=function(t,r,e){const o=tt(t,r,e);if(o===void 0||o==="root")return{x:0,y:0};const s=g[o].offset;return{x:s.posX,y:s.posY}},ct=function(t,r,e,o,s){const n=it(r.sources[0],r.targets[0],s),u=r.sections[0].startPoint,l=r.sections[0].endPoint,c=(r.sections[0].bendPoints?r.sections[0].bendPoints:[]).map(h=>[h.x+n.x,h.y+n.y]),b=[[u.x+n.x,u.y+n.y],...c,[l.x+n.x,l.y+n.y]],i=j().curve(D),E=t.insert("path").attr("d",i(b)).attr("class","path").attr("fill","none"),k=t.insert("g").attr("class","edgeLabel"),a=I(k.node().appendChild(r.labelEl)),p=a.node().firstChild.getBoundingClientRect();a.attr("width",p.width),a.attr("height",p.height),k.attr("transform",`translate(${r.labels[0].x+n.x}, ${r.labels[0].y+n.y})`),st(E,e,o.type,o.arrowMarkerAbsolute)},M=(t,r)=>{t.forEach(e=>{e.children||(e.children=[]);const o=r.childrenById[e.id];o&&o.forEach(s=>{e.children.push(g[s])}),M(e.children,r)})},dt=async function(t,r,e,o){var s;if(!P){const x=(await F(()=>import("./elk.bundled-00eec5ca.js").then(f=>f.e),["assets/elk.bundled-00eec5ca.js","assets/mermaid.core-557aeeb1.js","assets/app-6019c831.js","assets/framework-bb7be5cb.js"])).default;P=new x}o.db.clear(),g={},o.db.setGen("gen-2"),o.parser.parse(t);const n=I("body").append("div").attr("style","height:400px").attr("id","cy");let u={id:"root",layoutOptions:{"elk.hierarchyHandling":"INCLUDE_CHILDREN","org.eclipse.elk.padding":"[top=100, left=100, bottom=110, right=110]","elk.layered.spacing.edgeNodeBetweenLayers":"30","elk.direction":"DOWN"},children:[],edges:[]};switch(w.info("Drawing flowchart using v3 renderer",P),o.db.getDirection()){case"BT":u.layoutOptions["elk.direction"]="UP";break;case"TB":u.layoutOptions["elk.direction"]="DOWN";break;case"LR":u.layoutOptions["elk.direction"]="RIGHT";break;case"RL":u.layoutOptions["elk.direction"]="LEFT";break}const{securityLevel:y,flowchart:c}=G();let b;y==="sandbox"&&(b=I("#i"+r));const i=y==="sandbox"?I(b.nodes()[0].contentDocument.body):I("body"),E=y==="sandbox"?b.nodes()[0].contentDocument:document,k=i.select(`[id="${r}"]`);Z(k,["point","circle","cross"],o.type,o.arrowMarkerAbsolute);const p=o.db.getVertices();let h;const _=o.db.getSubGraphs();w.info("Subgraphs - ",_);for(let x=_.length-1;x>=0;x--)h=_[x],o.db.addVertex(h.id,h.title,"group",void 0,h.classes,h.dir);const S=k.insert("g").attr("class","subgraphs"),d=nt(o.db);u=rt(p,r,i,E,o,d,u);const v=k.insert("g").attr("class","edges edgePath"),C=o.db.getEdges();u=at(C,o,u,k),Object.keys(g).forEach(x=>{const f=g[x];f.parent||u.children.push(f),d.childrenById[x]!==void 0&&(f.labels=[{text:f.labelText,layoutOptions:{"nodeLabels.placement":"[H_CENTER, V_TOP, INSIDE]"},width:f.labelData.width,height:f.labelData.height}],delete f.x,delete f.y,delete f.width,delete f.height)}),M(u.children,d),w.info("after layout",JSON.stringify(u,null,2));const $=await P.layout(u);V(0,0,$.children,k,S,o,0),w.info("after layout",$),(s=$.edges)==null||s.map(x=>{ct(v,x,x.edgeData,o,d)}),K({},k,c.diagramPadding,c.useMaxWidth),n.remove()},V=(t,r,e,o,s,n,u)=>{e.forEach(function(l){if(l)if(g[l.id].offset={posX:l.x+t,posY:l.y+r,x:t,y:r,depth:u,width:l.width,height:l.height},l.type==="group"){const y=s.insert("g").attr("class","subgraph");y.insert("rect").attr("class","subgraph subgraph-lvl-"+u%5+" node").attr("x",l.x+t).attr("y",l.y+r).attr("width",l.width).attr("height",l.height);const c=y.insert("g").attr("class","label");c.attr("transform",`translate(${l.labels[0].x+t+l.x}, ${l.labels[0].y+r+l.y})`),c.node().appendChild(l.labelData.labelNode),w.info("Id (UGH)= ",l.type,l.labels)}else w.info("Id (UGH)= ",l.id),l.el.attr("transform",`translate(${l.x+t+l.width/2}, ${l.y+r+l.height/2})`)}),e.forEach(function(l){l&&l.type==="group"&&V(t+l.x,r+l.y,l.children,o,s,n,u+1)})},ut={getClasses:lt,draw:dt},ht=t=>{let r="";for(let e=0;e<5;e++)r+=`
      .subgraph-lvl-${e} {
        fill: ${t[`surface${e}`]};
        stroke: ${t[`surfacePeer${e}`]};
      }
    `;return r},bt=t=>`.label {
    font-family: ${t.fontFamily};
    color: ${t.nodeTextColor||t.textColor};
  }
  .cluster-label text {
    fill: ${t.titleColor};
  }
  .cluster-label span {
    color: ${t.titleColor};
  }

  .label text,span {
    fill: ${t.nodeTextColor||t.textColor};
    color: ${t.nodeTextColor||t.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${t.edgeLabelBackground};
      fill: ${t.edgeLabelBackground};
    }
    text-align: center;
  }

  .cluster rect {
    fill: ${t.clusterBkg};
    stroke: ${t.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  .cluster span {
    color: ${t.titleColor};
  }
  /* .cluster div {
    color: ${t.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor};
  }
  .subgraph {
    stroke-width:2;
    rx:3;
  }
  // .subgraph-lvl-1 {
  //   fill:#ccc;
  //   // stroke:black;
  // }
  ${ht(t)}
`,pt=bt,_t={db:O,renderer:ut,parser:q,styles:pt};export{_t as diagram};
