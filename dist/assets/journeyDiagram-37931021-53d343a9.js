import{c as V,v as gt,x as mt,s as xt,g as _t,b as kt,a as vt,m as bt,z as wt,h as Z,i as Tt}from"./mermaid.core-328cf33f.js";import{a as st}from"./arc-5057d66f.js";import"./app-a91e8ef1.js";import"./framework-bb7be5cb.js";import"./path-53f90ab3.js";var K=function(){var t=function(_,n,a,h){for(a=a||{},h=_.length;h--;a[_[h]]=n);return a},e=[1,2],i=[1,5],r=[6,9,11,17,18,20,22,23,24,26],s=[1,15],o=[1,16],l=[1,17],y=[1,18],u=[1,19],x=[1,20],f=[1,24],g=[4,6,9,11,17,18,20,22,23,24,26],p={trace:function(){},yy:{},symbols_:{error:2,start:3,journey:4,document:5,EOF:6,directive:7,line:8,SPACE:9,statement:10,NEWLINE:11,openDirective:12,typeDirective:13,closeDirective:14,":":15,argDirective:16,title:17,acc_title:18,acc_title_value:19,acc_descr:20,acc_descr_value:21,acc_descr_multiline_value:22,section:23,taskName:24,taskData:25,open_directive:26,type_directive:27,arg_directive:28,close_directive:29,$accept:0,$end:1},terminals_:{2:"error",4:"journey",6:"EOF",9:"SPACE",11:"NEWLINE",15:":",17:"title",18:"acc_title",19:"acc_title_value",20:"acc_descr",21:"acc_descr_value",22:"acc_descr_multiline_value",23:"section",24:"taskName",25:"taskData",26:"open_directive",27:"type_directive",28:"arg_directive",29:"close_directive"},productions_:[0,[3,3],[3,2],[5,0],[5,2],[8,2],[8,1],[8,1],[8,1],[7,4],[7,6],[10,1],[10,2],[10,2],[10,1],[10,1],[10,2],[10,1],[12,1],[13,1],[16,1],[14,1]],performAction:function(n,a,h,d,m,c,R){var k=c.length-1;switch(m){case 1:return c[k-1];case 3:this.$=[];break;case 4:c[k-1].push(c[k]),this.$=c[k-1];break;case 5:case 6:this.$=c[k];break;case 7:case 8:this.$=[];break;case 11:d.setDiagramTitle(c[k].substr(6)),this.$=c[k].substr(6);break;case 12:this.$=c[k].trim(),d.setAccTitle(this.$);break;case 13:case 14:this.$=c[k].trim(),d.setAccDescription(this.$);break;case 15:d.addSection(c[k].substr(8)),this.$=c[k].substr(8);break;case 16:d.addTask(c[k-1],c[k]),this.$="task";break;case 18:d.parseDirective("%%{","open_directive");break;case 19:d.parseDirective(c[k],"type_directive");break;case 20:c[k]=c[k].trim().replace(/'/g,'"'),d.parseDirective(c[k],"arg_directive");break;case 21:d.parseDirective("}%%","close_directive","journey");break}},table:[{3:1,4:e,7:3,12:4,26:i},{1:[3]},t(r,[2,3],{5:6}),{3:7,4:e,7:3,12:4,26:i},{13:8,27:[1,9]},{27:[2,18]},{6:[1,10],7:21,8:11,9:[1,12],10:13,11:[1,14],12:4,17:s,18:o,20:l,22:y,23:u,24:x,26:i},{1:[2,2]},{14:22,15:[1,23],29:f},t([15,29],[2,19]),t(r,[2,8],{1:[2,1]}),t(r,[2,4]),{7:21,10:25,12:4,17:s,18:o,20:l,22:y,23:u,24:x,26:i},t(r,[2,6]),t(r,[2,7]),t(r,[2,11]),{19:[1,26]},{21:[1,27]},t(r,[2,14]),t(r,[2,15]),{25:[1,28]},t(r,[2,17]),{11:[1,29]},{16:30,28:[1,31]},{11:[2,21]},t(r,[2,5]),t(r,[2,12]),t(r,[2,13]),t(r,[2,16]),t(g,[2,9]),{14:32,29:f},{29:[2,20]},{11:[1,33]},t(g,[2,10])],defaultActions:{5:[2,18],7:[2,2],24:[2,21],31:[2,20]},parseError:function(n,a){if(a.recoverable)this.trace(n);else{var h=new Error(n);throw h.hash=a,h}},parse:function(n){var a=this,h=[0],d=[],m=[null],c=[],R=this.table,k="",z=0,tt=0,yt=2,et=1,pt=c.slice.call(arguments,1),v=Object.create(this.lexer),A={yy:{}};for(var G in this.yy)Object.prototype.hasOwnProperty.call(this.yy,G)&&(A.yy[G]=this.yy[G]);v.setInput(n,A.yy),A.yy.lexer=v,A.yy.parser=this,typeof v.yylloc>"u"&&(v.yylloc={});var H=v.yylloc;c.push(H);var dt=v.options&&v.options.ranges;typeof A.yy.parseError=="function"?this.parseError=A.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function ft(){var E;return E=d.pop()||v.lex()||et,typeof E!="number"&&(E instanceof Array&&(d=E,E=d.pop()),E=a.symbols_[E]||E),E}for(var w,I,M,X,F={},Y,$,it,q;;){if(I=h[h.length-1],this.defaultActions[I]?M=this.defaultActions[I]:((w===null||typeof w>"u")&&(w=ft()),M=R[I]&&R[I][w]),typeof M>"u"||!M.length||!M[0]){var U="";q=[];for(Y in R[I])this.terminals_[Y]&&Y>yt&&q.push("'"+this.terminals_[Y]+"'");v.showPosition?U="Parse error on line "+(z+1)+`:
`+v.showPosition()+`
Expecting `+q.join(", ")+", got '"+(this.terminals_[w]||w)+"'":U="Parse error on line "+(z+1)+": Unexpected "+(w==et?"end of input":"'"+(this.terminals_[w]||w)+"'"),this.parseError(U,{text:v.match,token:this.terminals_[w]||w,line:v.yylineno,loc:H,expected:q})}if(M[0]instanceof Array&&M.length>1)throw new Error("Parse Error: multiple actions possible at state: "+I+", token: "+w);switch(M[0]){case 1:h.push(w),m.push(v.yytext),c.push(v.yylloc),h.push(M[1]),w=null,tt=v.yyleng,k=v.yytext,z=v.yylineno,H=v.yylloc;break;case 2:if($=this.productions_[M[1]][1],F.$=m[m.length-$],F._$={first_line:c[c.length-($||1)].first_line,last_line:c[c.length-1].last_line,first_column:c[c.length-($||1)].first_column,last_column:c[c.length-1].last_column},dt&&(F._$.range=[c[c.length-($||1)].range[0],c[c.length-1].range[1]]),X=this.performAction.apply(F,[k,tt,z,A.yy,M[1],m,c].concat(pt)),typeof X<"u")return X;$&&(h=h.slice(0,-1*$*2),m=m.slice(0,-1*$),c=c.slice(0,-1*$)),h.push(this.productions_[M[1]][0]),m.push(F.$),c.push(F._$),it=R[h[h.length-2]][h[h.length-1]],h.push(it);break;case 3:return!0}}return!0}},T=function(){var _={EOF:1,parseError:function(a,h){if(this.yy.parser)this.yy.parser.parseError(a,h);else throw new Error(a)},setInput:function(n,a){return this.yy=a||this.yy||{},this._input=n,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var n=this._input[0];this.yytext+=n,this.yyleng++,this.offset++,this.match+=n,this.matched+=n;var a=n.match(/(?:\r\n?|\n).*/g);return a?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),n},unput:function(n){var a=n.length,h=n.split(/(?:\r\n?|\n)/g);this._input=n+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-a),this.offset-=a;var d=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),h.length-1&&(this.yylineno-=h.length-1);var m=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:h?(h.length===d.length?this.yylloc.first_column:0)+d[d.length-h.length].length-h[0].length:this.yylloc.first_column-a},this.options.ranges&&(this.yylloc.range=[m[0],m[0]+this.yyleng-a]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},less:function(n){this.unput(this.match.slice(n))},pastInput:function(){var n=this.matched.substr(0,this.matched.length-this.match.length);return(n.length>20?"...":"")+n.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var n=this.match;return n.length<20&&(n+=this._input.substr(0,20-n.length)),(n.substr(0,20)+(n.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var n=this.pastInput(),a=new Array(n.length+1).join("-");return n+this.upcomingInput()+`
`+a+"^"},test_match:function(n,a){var h,d,m;if(this.options.backtrack_lexer&&(m={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(m.yylloc.range=this.yylloc.range.slice(0))),d=n[0].match(/(?:\r\n?|\n).*/g),d&&(this.yylineno+=d.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:d?d[d.length-1].length-d[d.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+n[0].length},this.yytext+=n[0],this.match+=n[0],this.matches=n,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(n[0].length),this.matched+=n[0],h=this.performAction.call(this,this.yy,this,a,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),h)return h;if(this._backtrack){for(var c in m)this[c]=m[c];return!1}return!1},next:function(){if(this.done)return this.EOF;this._input||(this.done=!0);var n,a,h,d;this._more||(this.yytext="",this.match="");for(var m=this._currentRules(),c=0;c<m.length;c++)if(h=this._input.match(this.rules[m[c]]),h&&(!a||h[0].length>a[0].length)){if(a=h,d=c,this.options.backtrack_lexer){if(n=this.test_match(h,m[c]),n!==!1)return n;if(this._backtrack){a=!1;continue}else return!1}else if(!this.options.flex)break}return a?(n=this.test_match(a,m[d]),n!==!1?n:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var a=this.next();return a||this.lex()},begin:function(a){this.conditionStack.push(a)},popState:function(){var a=this.conditionStack.length-1;return a>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(a){return a=this.conditionStack.length-1-Math.abs(a||0),a>=0?this.conditionStack[a]:"INITIAL"},pushState:function(a){this.begin(a)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(a,h,d,m){switch(d){case 0:return this.begin("open_directive"),26;case 1:return this.begin("type_directive"),27;case 2:return this.popState(),this.begin("arg_directive"),15;case 3:return this.popState(),this.popState(),29;case 4:return 28;case 5:break;case 6:break;case 7:return 11;case 8:break;case 9:break;case 10:return 4;case 11:return 17;case 12:return this.begin("acc_title"),18;case 13:return this.popState(),"acc_title_value";case 14:return this.begin("acc_descr"),20;case 15:return this.popState(),"acc_descr_value";case 16:this.begin("acc_descr_multiline");break;case 17:this.popState();break;case 18:return"acc_descr_multiline_value";case 19:return 23;case 20:return 24;case 21:return 25;case 22:return 15;case 23:return 6;case 24:return"INVALID"}},rules:[/^(?:%%\{)/i,/^(?:((?:(?!\}%%)[^:.])*))/i,/^(?::)/i,/^(?:\}%%)/i,/^(?:((?:(?!\}%%).|\n)*))/i,/^(?:%(?!\{)[^\n]*)/i,/^(?:[^\}]%%[^\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:journey\b)/i,/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:section\s[^#:\n;]+)/i,/^(?:[^#:\n;]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{open_directive:{rules:[1],inclusive:!1},type_directive:{rules:[2,3],inclusive:!1},arg_directive:{rules:[3,4],inclusive:!1},acc_descr_multiline:{rules:[17,18],inclusive:!1},acc_descr:{rules:[15],inclusive:!1},acc_title:{rules:[13],inclusive:!1},INITIAL:{rules:[0,5,6,7,8,9,10,11,12,14,16,19,20,21,22,23,24],inclusive:!0}}};return _}();p.lexer=T;function b(){this.yy={}}return b.prototype=p,p.Parser=b,new b}();K.parser=K;const Mt=K;let L="";const Q=[],N=[],B=[],St=function(t,e,i){bt.parseDirective(this,t,e,i)},$t=function(){Q.length=0,N.length=0,L="",B.length=0,wt()},Et=function(t){L=t,Q.push(t)},Pt=function(){return Q},At=function(){let t=rt();const e=100;let i=0;for(;!t&&i<e;)t=rt(),i++;return N.push(...B),N},It=function(){const t=[];return N.forEach(i=>{i.people&&t.push(...i.people)}),[...new Set(t)].sort()},Ct=function(t,e){const i=e.substr(1).split(":");let r=0,s=[];i.length===1?(r=Number(i[0]),s=[]):(r=Number(i[0]),s=i[1].split(","));const o=s.map(y=>y.trim()),l={section:L,type:L,people:o,task:t,score:r};B.push(l)},Vt=function(t){const e={section:L,type:L,description:t,task:t,classes:[]};N.push(e)},rt=function(){const t=function(i){return B[i].processed};let e=!0;for(const[i,r]of B.entries())t(i),e=e&&r.processed;return e},Ft=function(){return It()},nt={parseDirective:St,getConfig:()=>V().journey,clear:$t,setDiagramTitle:gt,getDiagramTitle:mt,setAccTitle:xt,getAccTitle:_t,setAccDescription:kt,getAccDescription:vt,addSection:Et,getSections:Pt,getTasks:At,addTask:Ct,addTaskOrg:Vt,getActors:Ft},Lt=t=>`.label {
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    color: ${t.textColor};
  }
  .mouth {
    stroke: #666;
  }

  line {
    stroke: ${t.textColor}
  }

  .legend {
    fill: ${t.textColor};
  }

  .label text {
    fill: #333;
  }
  .label {
    color: ${t.textColor}
  }

  .face {
    ${t.faceColor?`fill: ${t.faceColor}`:"fill: #FFF8DC"};
    stroke: #999;
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
    stroke-width: 1.5px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
    }
    text-align: center;
  }

  .cluster rect {
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: 'trebuchet ms', verdana, arial, sans-serif;
    font-family: var(--mermaid-font-family);
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .task-type-0, .section-type-0  {
    ${t.fillType0?`fill: ${t.fillType0}`:""};
  }
  .task-type-1, .section-type-1  {
    ${t.fillType0?`fill: ${t.fillType1}`:""};
  }
  .task-type-2, .section-type-2  {
    ${t.fillType0?`fill: ${t.fillType2}`:""};
  }
  .task-type-3, .section-type-3  {
    ${t.fillType0?`fill: ${t.fillType3}`:""};
  }
  .task-type-4, .section-type-4  {
    ${t.fillType0?`fill: ${t.fillType4}`:""};
  }
  .task-type-5, .section-type-5  {
    ${t.fillType0?`fill: ${t.fillType5}`:""};
  }
  .task-type-6, .section-type-6  {
    ${t.fillType0?`fill: ${t.fillType6}`:""};
  }
  .task-type-7, .section-type-7  {
    ${t.fillType0?`fill: ${t.fillType7}`:""};
  }

  .actor-0 {
    ${t.actor0?`fill: ${t.actor0}`:""};
  }
  .actor-1 {
    ${t.actor1?`fill: ${t.actor1}`:""};
  }
  .actor-2 {
    ${t.actor2?`fill: ${t.actor2}`:""};
  }
  .actor-3 {
    ${t.actor3?`fill: ${t.actor3}`:""};
  }
  .actor-4 {
    ${t.actor4?`fill: ${t.actor4}`:""};
  }
  .actor-5 {
    ${t.actor5?`fill: ${t.actor5}`:""};
  }
`,Rt=Lt,O=function(t,e){const i=t.append("rect");return i.attr("x",e.x),i.attr("y",e.y),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("width",e.width),i.attr("height",e.height),i.attr("rx",e.rx),i.attr("ry",e.ry),e.class!==void 0&&i.attr("class",e.class),i},Nt=function(t,e){const r=t.append("circle").attr("cx",e.cx).attr("cy",e.cy).attr("class","face").attr("r",15).attr("stroke-width",2).attr("overflow","visible"),s=t.append("g");s.append("circle").attr("cx",e.cx-15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666"),s.append("circle").attr("cx",e.cx+15/3).attr("cy",e.cy-15/3).attr("r",1.5).attr("stroke-width",2).attr("fill","#666").attr("stroke","#666");function o(u){const x=st().startAngle(Math.PI/2).endAngle(3*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);u.append("path").attr("class","mouth").attr("d",x).attr("transform","translate("+e.cx+","+(e.cy+2)+")")}function l(u){const x=st().startAngle(3*Math.PI/2).endAngle(5*(Math.PI/2)).innerRadius(7.5).outerRadius(6.8181818181818175);u.append("path").attr("class","mouth").attr("d",x).attr("transform","translate("+e.cx+","+(e.cy+7)+")")}function y(u){u.append("line").attr("class","mouth").attr("stroke",2).attr("x1",e.cx-5).attr("y1",e.cy+7).attr("x2",e.cx+5).attr("y2",e.cy+7).attr("class","mouth").attr("stroke-width","1px").attr("stroke","#666")}return e.score>3?o(s):e.score<3?l(s):y(s),r},ot=function(t,e){const i=t.append("circle");return i.attr("cx",e.cx),i.attr("cy",e.cy),i.attr("class","actor-"+e.pos),i.attr("fill",e.fill),i.attr("stroke",e.stroke),i.attr("r",e.r),i.class!==void 0&&i.attr("class",i.class),e.title!==void 0&&i.append("title").text(e.title),i},ht=function(t,e){const i=e.text.replace(/<br\s*\/?>/gi," "),r=t.append("text");r.attr("x",e.x),r.attr("y",e.y),r.attr("class","legend"),r.style("text-anchor",e.anchor),e.class!==void 0&&r.attr("class",e.class);const s=r.append("tspan");return s.attr("x",e.x+e.textMargin*2),s.text(i),r},Bt=function(t,e){function i(s,o,l,y,u){return s+","+o+" "+(s+l)+","+o+" "+(s+l)+","+(o+y-u)+" "+(s+l-u*1.2)+","+(o+y)+" "+s+","+(o+y)}const r=t.append("polygon");r.attr("points",i(e.x,e.y,50,20,7)),r.attr("class","labelBox"),e.y=e.y+e.labelMargin,e.x=e.x+.5*e.labelMargin,ht(t,e)},jt=function(t,e,i){const r=t.append("g"),s=D();s.x=e.x,s.y=e.y,s.fill=e.fill,s.width=i.width,s.height=i.height,s.class="journey-section section-type-"+e.num,s.rx=3,s.ry=3,O(r,s),ut(i)(e.text,r,s.x,s.y,s.width,s.height,{class:"journey-section section-type-"+e.num},i,e.colour)};let at=-1;const zt=function(t,e,i){const r=e.x+i.width/2,s=t.append("g");at++;const o=300+5*30;s.append("line").attr("id","task"+at).attr("x1",r).attr("y1",e.y).attr("x2",r).attr("y2",o).attr("class","task-line").attr("stroke-width","1px").attr("stroke-dasharray","4 2").attr("stroke","#666"),Nt(s,{cx:r,cy:300+(5-e.score)*30,score:e.score});const l=D();l.x=e.x,l.y=e.y,l.fill=e.fill,l.width=i.width,l.height=i.height,l.class="task task-type-"+e.num,l.rx=3,l.ry=3,O(s,l);let y=e.x+14;e.people.forEach(u=>{const x=e.actors[u].color,f={cx:y,cy:e.y,r:7,fill:x,stroke:"#000",title:u,pos:e.actors[u].position};ot(s,f),y+=10}),ut(i)(e.task,s,l.x,l.y,l.width,l.height,{class:"task"},i,e.colour)},Yt=function(t,e){O(t,{x:e.startx,y:e.starty,width:e.stopx-e.startx,height:e.stopy-e.starty,fill:e.fill,class:"rect"}).lower()},qt=function(){return{x:0,y:0,fill:void 0,"text-anchor":"start",width:100,height:100,textMargin:0,rx:0,ry:0}},D=function(){return{x:0,y:0,width:100,anchor:"start",height:100,rx:0,ry:0}},ut=function(){function t(s,o,l,y,u,x,f,g){const p=o.append("text").attr("x",l+u/2).attr("y",y+x/2+5).style("font-color",g).style("text-anchor","middle").text(s);r(p,f)}function e(s,o,l,y,u,x,f,g,p){const{taskFontSize:T,taskFontFamily:b}=g,_=s.split(/<br\s*\/?>/gi);for(let n=0;n<_.length;n++){const a=n*T-T*(_.length-1)/2,h=o.append("text").attr("x",l+u/2).attr("y",y).attr("fill",p).style("text-anchor","middle").style("font-size",T).style("font-family",b);h.append("tspan").attr("x",l+u/2).attr("dy",a).text(_[n]),h.attr("y",y+x/2).attr("dominant-baseline","central").attr("alignment-baseline","central"),r(h,f)}}function i(s,o,l,y,u,x,f,g){const p=o.append("switch"),b=p.append("foreignObject").attr("x",l).attr("y",y).attr("width",u).attr("height",x).attr("position","fixed").append("xhtml:div").style("display","table").style("height","100%").style("width","100%");b.append("div").attr("class","label").style("display","table-cell").style("text-align","center").style("vertical-align","middle").text(s),e(s,p,l,y,u,x,f,g),r(b,f)}function r(s,o){for(const l in o)l in o&&s.attr(l,o[l])}return function(s){return s.textPlacement==="fo"?i:s.textPlacement==="old"?t:e}}(),Ot=function(t){t.append("defs").append("marker").attr("id","arrowhead").attr("refX",5).attr("refY",2).attr("markerWidth",6).attr("markerHeight",4).attr("orient","auto").append("path").attr("d","M 0,0 V 4 L6,2 Z")},j={drawRect:O,drawCircle:ot,drawSection:jt,drawText:ht,drawLabel:Bt,drawTask:zt,drawBackgroundRect:Yt,getTextObj:qt,getNoteRect:D,initGraphics:Ot},Wt=function(t){Object.keys(t).forEach(function(i){W[i]=t[i]})},P={};function Gt(t){const e=V().journey;let i=60;Object.keys(P).forEach(r=>{const s=P[r].color,o={cx:20,cy:i,r:7,fill:s,stroke:"#000",pos:P[r].position};j.drawCircle(t,o);const l={x:40,y:i+7,fill:"#666",text:r,textMargin:e.boxTextMargin|5};j.drawText(t,l),i+=20})}const W=V().journey,C=W.leftMargin,Ht=function(t,e,i,r){const s=V().journey;r.db.clear(),r.parser.parse(t+`
`);const o=V().securityLevel;let l;o==="sandbox"&&(l=Z("#i"+e));const y=o==="sandbox"?Z(l.nodes()[0].contentDocument.body):Z("body");S.init();const u=y.select("#"+e);j.initGraphics(u);const x=r.db.getTasks(),f=r.db.getDiagramTitle(),g=r.db.getActors();for(const a in P)delete P[a];let p=0;g.forEach(a=>{P[a]={color:s.actorColours[p%s.actorColours.length],position:p},p++}),Gt(u),S.insert(0,0,C,Object.keys(P).length*50),Xt(u,x,0);const T=S.getBounds();f&&u.append("text").text(f).attr("x",C).attr("font-size","4ex").attr("font-weight","bold").attr("y",25);const b=T.stopy-T.starty+2*s.diagramMarginY,_=C+T.stopx+2*s.diagramMarginX;Tt(u,b,_,s.useMaxWidth),u.append("line").attr("x1",C).attr("y1",s.height*4).attr("x2",_-C-4).attr("y2",s.height*4).attr("stroke-width",4).attr("stroke","black").attr("marker-end","url(#arrowhead)");const n=f?70:0;u.attr("viewBox",`${T.startx} -25 ${_} ${b+n}`),u.attr("preserveAspectRatio","xMinYMin meet"),u.attr("height",b+n+25)},S={data:{startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},verticalPos:0,sequenceItems:[],init:function(){this.sequenceItems=[],this.data={startx:void 0,stopx:void 0,starty:void 0,stopy:void 0},this.verticalPos=0},updateVal:function(t,e,i,r){t[e]===void 0?t[e]=i:t[e]=r(i,t[e])},updateBounds:function(t,e,i,r){const s=V().journey,o=this;let l=0;function y(u){return function(f){l++;const g=o.sequenceItems.length-l+1;o.updateVal(f,"starty",e-g*s.boxMargin,Math.min),o.updateVal(f,"stopy",r+g*s.boxMargin,Math.max),o.updateVal(S.data,"startx",t-g*s.boxMargin,Math.min),o.updateVal(S.data,"stopx",i+g*s.boxMargin,Math.max),u!=="activation"&&(o.updateVal(f,"startx",t-g*s.boxMargin,Math.min),o.updateVal(f,"stopx",i+g*s.boxMargin,Math.max),o.updateVal(S.data,"starty",e-g*s.boxMargin,Math.min),o.updateVal(S.data,"stopy",r+g*s.boxMargin,Math.max))}}this.sequenceItems.forEach(y())},insert:function(t,e,i,r){const s=Math.min(t,i),o=Math.max(t,i),l=Math.min(e,r),y=Math.max(e,r);this.updateVal(S.data,"startx",s,Math.min),this.updateVal(S.data,"starty",l,Math.min),this.updateVal(S.data,"stopx",o,Math.max),this.updateVal(S.data,"stopy",y,Math.max),this.updateBounds(s,l,o,y)},bumpVerticalPos:function(t){this.verticalPos=this.verticalPos+t,this.data.stopy=this.verticalPos},getVerticalPos:function(){return this.verticalPos},getBounds:function(){return this.data}},J=W.sectionFills,lt=W.sectionColours,Xt=function(t,e,i){const r=V().journey;let s="";const o=r.height*2+r.diagramMarginY,l=i+o;let y=0,u="#CCC",x="black",f=0;for(const[g,p]of e.entries()){if(s!==p.section){u=J[y%J.length],f=y%J.length,x=lt[y%lt.length];const b={x:g*r.taskMargin+g*r.width+C,y:50,text:p.section,fill:u,num:f,colour:x};j.drawSection(t,b,r),s=p.section,y++}const T=p.people.reduce((b,_)=>(P[_]&&(b[_]=P[_]),b),{});p.x=g*r.taskMargin+g*r.width+C,p.y=l,p.width=r.diagramMarginX,p.height=r.diagramMarginY,p.colour=x,p.fill=u,p.num=f,p.actors=T,j.drawTask(t,p,r),S.insert(p.x,p.y,p.x+p.width+r.taskMargin,300+5*30)}},ct={setConf:Wt,draw:Ht},Dt={parser:Mt,db:nt,renderer:ct,styles:Rt,init:t=>{ct.setConf(t.journey),nt.clear()}};export{Dt as diagram};
