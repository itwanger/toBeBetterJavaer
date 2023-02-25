import{G as V}from"./index-7cd54932.js";import{p as N,q,c as C,k as D,l as h,r as $,o as E,h as T,y as P,t as F}from"./mermaid.core-557aeeb1.js";import{b as M,f as R}from"./add-html-label-4086481f.js";import{r as U}from"./index-64e46a5f-9c7cb4e9.js";import{s as H}from"./selectAll-0b69bce7.js";const G={},W=function(t){const s=Object.keys(t);for(const m of s)G[m]=t[m]},I=function(t,s,m,n,d,f){const b=n.select(`[id="${m}"]`);Object.keys(t).forEach(function(i){const r=t[i];let y="default";r.classes.length>0&&(y=r.classes.join(" "));const w=N(r.styles);let e=r.text!==void 0?r.text:r.id,a;if(q(C().flowchart.htmlLabels)){const x={label:e.replace(/fa[blrs]?:fa-[\w-]+/g,k=>`<i class='${k.replace(":"," ")}'></i>`)};a=M(b,x).node(),a.parentNode.removeChild(a)}else{const x=d.createElementNS("http://www.w3.org/2000/svg","text");x.setAttribute("style",w.labelStyle.replace("color:","fill:"));const k=e.split(D.lineBreakRegex);for(const _ of k){const v=d.createElementNS("http://www.w3.org/2000/svg","tspan");v.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),v.setAttribute("dy","1em"),v.setAttribute("x","1"),v.textContent=_,x.appendChild(v)}a=x}let c=0,l="";switch(r.type){case"round":c=5,l="rect";break;case"square":l="rect";break;case"diamond":l="question";break;case"hexagon":l="hexagon";break;case"odd":l="rect_left_inv_arrow";break;case"lean_right":l="lean_right";break;case"lean_left":l="lean_left";break;case"trapezoid":l="trapezoid";break;case"inv_trapezoid":l="inv_trapezoid";break;case"odd_right":l="rect_left_inv_arrow";break;case"circle":l="circle";break;case"ellipse":l="ellipse";break;case"stadium":l="stadium";break;case"subroutine":l="subroutine";break;case"cylinder":l="cylinder";break;case"group":l="rect";break;case"doublecircle":l="doublecircle";break;default:l="rect"}s.setNode(r.id,{labelStyle:w.labelStyle,shape:l,labelText:e,rx:c,ry:c,class:y,style:w.style,id:r.id,link:r.link,linkTarget:r.linkTarget,tooltip:f.db.getTooltip(r.id)||"",domId:f.db.lookUpDomId(r.id),haveCallback:r.haveCallback,width:r.type==="group"?500:void 0,dir:r.dir,type:r.type,props:r.props,padding:C().flowchart.padding}),h.info("setNode",{labelStyle:w.labelStyle,shape:l,labelText:e,rx:c,ry:c,class:y,style:w.style,id:r.id,domId:f.db.lookUpDomId(r.id),width:r.type==="group"?500:void 0,type:r.type,dir:r.dir,props:r.props,padding:C().flowchart.padding})})},z=function(t,s,m){h.info("abc78 edges = ",t);let n=0,d={},f,b;if(t.defaultStyle!==void 0){const o=N(t.defaultStyle);f=o.style,b=o.labelStyle}t.forEach(function(o){n++;var i="L-"+o.start+"-"+o.end;d[i]===void 0?(d[i]=0,h.info("abc78 new entry",i,d[i])):(d[i]++,h.info("abc78 new entry",i,d[i]));let r=i+"-"+d[i];h.info("abc78 new link id to be used is",i,r,d[i]);var y="LS-"+o.start,w="LE-"+o.end;const e={style:"",labelStyle:""};switch(e.minlen=o.length||1,o.type==="arrow_open"?e.arrowhead="none":e.arrowhead="normal",e.arrowTypeStart="arrow_open",e.arrowTypeEnd="arrow_open",o.type){case"double_arrow_cross":e.arrowTypeStart="arrow_cross";case"arrow_cross":e.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":e.arrowTypeStart="arrow_point";case"arrow_point":e.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":e.arrowTypeStart="arrow_circle";case"arrow_circle":e.arrowTypeEnd="arrow_circle";break}let a="",c="";switch(o.stroke){case"normal":a="fill:none;",f!==void 0&&(a=f),b!==void 0&&(c=b),e.thickness="normal",e.pattern="solid";break;case"dotted":e.thickness="normal",e.pattern="dotted",e.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":e.thickness="thick",e.pattern="solid",e.style="stroke-width: 3.5px;fill:none;";break;case"invisible":e.thickness="invisible",e.pattern="solid",e.style="stroke-width: 0;fill:none;";break}if(o.style!==void 0){const l=N(o.style);a=l.style,c=l.labelStyle}e.style=e.style+=a,e.labelStyle=e.labelStyle+=c,o.interpolate!==void 0?e.curve=$(o.interpolate,E):t.defaultInterpolate!==void 0?e.curve=$(t.defaultInterpolate,E):e.curve=$(G.curve,E),o.text===void 0?o.style!==void 0&&(e.arrowheadStyle="fill: #333"):(e.arrowheadStyle="fill: #333",e.labelpos="c"),e.labelType="text",e.label=o.text.replace(D.lineBreakRegex,`
`),o.style===void 0&&(e.style=e.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),e.labelStyle=e.labelStyle.replace("color:","fill:"),e.id=r,e.classes="flowchart-link "+y+" "+w,s.setEdge(o.start,o.end,e,n)})},X=function(t,s){h.info("Extracting classes"),s.db.clear();try{return s.parse(t),s.db.getClasses()}catch{return}},J=function(t,s,m,n){h.info("Drawing flowchart"),n.db.clear(),R.setGen("gen-2"),n.parser.parse(t);let d=n.db.getDirection();d===void 0&&(d="TD");const{securityLevel:f,flowchart:b}=C(),o=b.nodeSpacing||50,i=b.rankSpacing||50;let r;f==="sandbox"&&(r=T("#i"+s));const y=f==="sandbox"?T(r.nodes()[0].contentDocument.body):T("body"),w=f==="sandbox"?r.nodes()[0].contentDocument:document,e=new V({multigraph:!0,compound:!0}).setGraph({rankdir:d,nodesep:o,ranksep:i,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}});let a;const c=n.db.getSubGraphs();h.info("Subgraphs - ",c);for(let p=c.length-1;p>=0;p--)a=c[p],h.info("Subgraph - ",a),n.db.addVertex(a.id,a.title,"group",void 0,a.classes,a.dir);const l=n.db.getVertices(),x=n.db.getEdges();h.info("Edges",x);let k=0;for(k=c.length-1;k>=0;k--){a=c[k],H("cluster").append("text");for(let p=0;p<a.nodes.length;p++)h.info("Setting up subgraphs",a.nodes[p],a.id),e.setParent(a.nodes[p],a.id)}I(l,e,s,y,w,n),z(x,e);const _=y.select(`[id="${s}"]`),v=y.select("#"+s+" g");if(U(v,e,["point","circle","cross"],"flowchart",s),P.insertTitle(_,"flowchartTitleText",b.titleTopMargin,n.db.getDiagramTitle()),F(e,_,b.diagramPadding,b.useMaxWidth),n.db.indexNodes("subGraph"+k),!b.htmlLabels){const p=w.querySelectorAll('[id="'+s+'"] .edgeLabel .label');for(const g of p){const S=g.getBBox(),u=w.createElementNS("http://www.w3.org/2000/svg","rect");u.setAttribute("rx",0),u.setAttribute("ry",0),u.setAttribute("width",S.width),u.setAttribute("height",S.height),g.insertBefore(u,g.firstChild)}}Object.keys(l).forEach(function(p){const g=l[p];if(g.link){const S=T("#"+s+' [id="'+p+'"]');if(S){const u=w.createElementNS("http://www.w3.org/2000/svg","a");u.setAttributeNS("http://www.w3.org/2000/svg","class",g.classes.join(" ")),u.setAttributeNS("http://www.w3.org/2000/svg","href",g.link),u.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),f==="sandbox"?u.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):g.linkTarget&&u.setAttributeNS("http://www.w3.org/2000/svg","target",g.linkTarget);const L=S.insert(function(){return u},":first-child"),A=S.select(".label-container");A&&L.append(function(){return A.node()});const B=S.select(".label");B&&L.append(function(){return B.node()})}}})},te={setConf:W,addVertices:I,addEdges:z,getClasses:X,draw:J},K=t=>`.label {
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
`,re=K;export{re as a,te as f};
