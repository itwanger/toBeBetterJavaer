import{i as V,G as q}from"./layout-9fecb4cb.js";import{_ as M,$ as R,X as F,p as N,l as u,q as U,c as $,j as I,r as C,o as E,h as _,y as X,t as H,a0 as W}from"./mermaid.core-7621067c.js";import{f as J}from"./flowDb-9e6c6aac-dd791b10.js";import{r as K}from"./index-1e7f2254-a292de67.js";import{s as Q}from"./selectAll-ad3acc83.js";const Y=(e,l)=>M.lang.round(R.parse(e)[l]),Z=Y;function be(e,l){return!!e.children(l).length}function fe(e){return L(e.v)+":"+L(e.w)+":"+L(e.name)}var j=/:/g;function L(e){return e?String(e).replace(j,"\\:"):""}function O(e,l){l&&e.attr("style",l)}function ue(e,l,c){l&&e.attr("class",l).attr("class",c+" "+e.attr("class"))}function we(e,l){var c=l.graph();if(V(c)){var a=c.transition;if(F(a))return a(e)}return e}function ee(e,l){var c=e.append("foreignObject").attr("width","100000"),a=c.append("xhtml:div");a.attr("xmlns","http://www.w3.org/1999/xhtml");var i=l.label;switch(typeof i){case"function":a.insert(i);break;case"object":a.insert(function(){return i});break;default:a.html(i)}O(a,l.labelStyle),a.style("display","inline-block"),a.style("white-space","nowrap");var d=a.node().getBoundingClientRect();return c.attr("width",d.width).attr("height",d.height),c}const G={},te=function(e){const l=Object.keys(e);for(const c of l)G[c]=e[c]},z=function(e,l,c,a,i,d){const w=a.select(`[id="${c}"]`);Object.keys(e).forEach(function(p){const r=e[p];let g="default";r.classes.length>0&&(g=r.classes.join(" ")),g=g+" flowchart-label";const h=N(r.styles);let t=r.text!==void 0?r.text:r.id,s;if(u.info("vertex",r,r.labelType),r.labelType==="markdown")u.info("vertex",r,r.labelType);else if(U($().flowchart.htmlLabels)){const m={label:t.replace(/fa[blrs]?:fa-[\w-]+/g,k=>`<i class='${k.replace(":"," ")}'></i>`)};s=ee(w,m).node(),s.parentNode.removeChild(s)}else{const m=i.createElementNS("http://www.w3.org/2000/svg","text");m.setAttribute("style",h.labelStyle.replace("color:","fill:"));const k=t.split(I.lineBreakRegex);for(const T of k){const v=i.createElementNS("http://www.w3.org/2000/svg","tspan");v.setAttributeNS("http://www.w3.org/XML/1998/namespace","xml:space","preserve"),v.setAttribute("dy","1em"),v.setAttribute("x","1"),v.textContent=T,m.appendChild(v)}s=m}let b=0,o="";switch(r.type){case"round":b=5,o="rect";break;case"square":o="rect";break;case"diamond":o="question";break;case"hexagon":o="hexagon";break;case"odd":o="rect_left_inv_arrow";break;case"lean_right":o="lean_right";break;case"lean_left":o="lean_left";break;case"trapezoid":o="trapezoid";break;case"inv_trapezoid":o="inv_trapezoid";break;case"odd_right":o="rect_left_inv_arrow";break;case"circle":o="circle";break;case"ellipse":o="ellipse";break;case"stadium":o="stadium";break;case"subroutine":o="subroutine";break;case"cylinder":o="cylinder";break;case"group":o="rect";break;case"doublecircle":o="doublecircle";break;default:o="rect"}l.setNode(r.id,{labelStyle:h.labelStyle,shape:o,labelText:t,labelType:r.labelType,rx:b,ry:b,class:g,style:h.style,id:r.id,link:r.link,linkTarget:r.linkTarget,tooltip:d.db.getTooltip(r.id)||"",domId:d.db.lookUpDomId(r.id),haveCallback:r.haveCallback,width:r.type==="group"?500:void 0,dir:r.dir,type:r.type,props:r.props,padding:$().flowchart.padding}),u.info("setNode",{labelStyle:h.labelStyle,labelType:r.labelType,shape:o,labelText:t,rx:b,ry:b,class:g,style:h.style,id:r.id,domId:d.db.lookUpDomId(r.id),width:r.type==="group"?500:void 0,type:r.type,dir:r.dir,props:r.props,padding:$().flowchart.padding})})},P=function(e,l,c){u.info("abc78 edges = ",e);let a=0,i={},d,w;if(e.defaultStyle!==void 0){const n=N(e.defaultStyle);d=n.style,w=n.labelStyle}e.forEach(function(n){a++;const p="L-"+n.start+"-"+n.end;i[p]===void 0?(i[p]=0,u.info("abc78 new entry",p,i[p])):(i[p]++,u.info("abc78 new entry",p,i[p]));let r=p+"-"+i[p];u.info("abc78 new link id to be used is",p,r,i[p]);const g="LS-"+n.start,h="LE-"+n.end,t={style:"",labelStyle:""};switch(t.minlen=n.length||1,n.type==="arrow_open"?t.arrowhead="none":t.arrowhead="normal",t.arrowTypeStart="arrow_open",t.arrowTypeEnd="arrow_open",n.type){case"double_arrow_cross":t.arrowTypeStart="arrow_cross";case"arrow_cross":t.arrowTypeEnd="arrow_cross";break;case"double_arrow_point":t.arrowTypeStart="arrow_point";case"arrow_point":t.arrowTypeEnd="arrow_point";break;case"double_arrow_circle":t.arrowTypeStart="arrow_circle";case"arrow_circle":t.arrowTypeEnd="arrow_circle";break}let s="",b="";switch(n.stroke){case"normal":s="fill:none;",d!==void 0&&(s=d),w!==void 0&&(b=w),t.thickness="normal",t.pattern="solid";break;case"dotted":t.thickness="normal",t.pattern="dotted",t.style="fill:none;stroke-width:2px;stroke-dasharray:3;";break;case"thick":t.thickness="thick",t.pattern="solid",t.style="stroke-width: 3.5px;fill:none;";break;case"invisible":t.thickness="invisible",t.pattern="solid",t.style="stroke-width: 0;fill:none;";break}if(n.style!==void 0){const o=N(n.style);s=o.style,b=o.labelStyle}t.style=t.style+=s,t.labelStyle=t.labelStyle+=b,n.interpolate!==void 0?t.curve=C(n.interpolate,E):e.defaultInterpolate!==void 0?t.curve=C(e.defaultInterpolate,E):t.curve=C(G.curve,E),n.text===void 0?n.style!==void 0&&(t.arrowheadStyle="fill: #333"):(t.arrowheadStyle="fill: #333",t.labelpos="c"),t.labelType=n.labelType,t.label=n.text.replace(I.lineBreakRegex,`
`),n.style===void 0&&(t.style=t.style||"stroke: #333; stroke-width: 1.5px;fill:none;"),t.labelStyle=t.labelStyle.replace("color:","fill:"),t.id=r,t.classes="flowchart-link "+g+" "+h,l.setEdge(n.start,n.end,t,a)})},re=function(e,l){u.info("Extracting classes"),l.db.clear();try{return l.parse(e),l.db.getClasses()}catch{return}},le=async function(e,l,c,a){u.info("Drawing flowchart"),a.db.clear(),J.setGen("gen-2"),a.parser.parse(e);let i=a.db.getDirection();i===void 0&&(i="TD");const{securityLevel:d,flowchart:w}=$(),n=w.nodeSpacing||50,p=w.rankSpacing||50;let r;d==="sandbox"&&(r=_("#i"+l));const g=d==="sandbox"?_(r.nodes()[0].contentDocument.body):_("body"),h=d==="sandbox"?r.nodes()[0].contentDocument:document,t=new q({multigraph:!0,compound:!0}).setGraph({rankdir:i,nodesep:n,ranksep:p,marginx:0,marginy:0}).setDefaultEdgeLabel(function(){return{}});let s;const b=a.db.getSubGraphs();u.info("Subgraphs - ",b);for(let f=b.length-1;f>=0;f--)s=b[f],u.info("Subgraph - ",s),a.db.addVertex(s.id,{text:s.title,type:s.labelType},"group",void 0,s.classes,s.dir);const o=a.db.getVertices(),m=a.db.getEdges();u.info("Edges",m);let k=0;for(k=b.length-1;k>=0;k--){s=b[k],Q("cluster").append("text");for(let f=0;f<s.nodes.length;f++)u.info("Setting up subgraphs",s.nodes[f],s.id),t.setParent(s.nodes[f],s.id)}z(o,t,l,g,h,a),P(m,t);const T=g.select(`[id="${l}"]`),v=g.select("#"+l+" g");if(await K(v,t,["point","circle","cross"],"flowchart",l),X.insertTitle(T,"flowchartTitleText",w.titleTopMargin,a.db.getDiagramTitle()),H(t,T,w.diagramPadding,w.useMaxWidth),a.db.indexNodes("subGraph"+k),!w.htmlLabels){const f=h.querySelectorAll('[id="'+l+'"] .edgeLabel .label');for(const x of f){const S=x.getBBox(),y=h.createElementNS("http://www.w3.org/2000/svg","rect");y.setAttribute("rx",0),y.setAttribute("ry",0),y.setAttribute("width",S.width),y.setAttribute("height",S.height),x.insertBefore(y,x.firstChild)}}Object.keys(o).forEach(function(f){const x=o[f];if(x.link){const S=_("#"+l+' [id="'+f+'"]');if(S){const y=h.createElementNS("http://www.w3.org/2000/svg","a");y.setAttributeNS("http://www.w3.org/2000/svg","class",x.classes.join(" ")),y.setAttributeNS("http://www.w3.org/2000/svg","href",x.link),y.setAttributeNS("http://www.w3.org/2000/svg","rel","noopener"),d==="sandbox"?y.setAttributeNS("http://www.w3.org/2000/svg","target","_top"):x.linkTarget&&y.setAttributeNS("http://www.w3.org/2000/svg","target",x.linkTarget);const A=S.insert(function(){return y},":first-child"),B=S.select(".label-container");B&&A.append(function(){return B.node()});const D=S.select(".label");D&&A.append(function(){return D.node()})}}})},he={setConf:te,addVertices:z,addEdges:P,getClasses:re,draw:le},ae=(e,l)=>{const c=Z,a=c(e,"r"),i=c(e,"g"),d=c(e,"b");return W(a,i,d,l)},oe=e=>`.label {
    font-family: ${e.fontFamily};
    color: ${e.nodeTextColor||e.textColor};
  }
  .cluster-label text {
    fill: ${e.titleColor};
  }
  .cluster-label span,p {
    color: ${e.titleColor};
  }

  .label text,span,p {
    fill: ${e.nodeTextColor||e.textColor};
    color: ${e.nodeTextColor||e.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${e.mainBkg};
    stroke: ${e.nodeBorder};
    stroke-width: 1px;
  }
  .flowchart-label text {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${e.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${e.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${e.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${e.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${e.edgeLabelBackground};
      fill: ${e.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${ae(e.edgeLabelBackground,.5)};
    // background-color: 
  }

  .cluster rect {
    fill: ${e.clusterBkg};
    stroke: ${e.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${e.titleColor};
  }

  .cluster span,p {
    color: ${e.titleColor};
  }
  /* .cluster div {
    color: ${e.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${e.fontFamily};
    font-size: 12px;
    background: ${e.tertiaryColor};
    border: 1px solid ${e.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${e.textColor};
  }
`,ye=oe;export{O as a,ee as b,we as c,ue as d,fe as e,he as f,ye as g,be as i};
