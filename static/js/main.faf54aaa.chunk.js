(this["webpackJsonptools-bar"]=this["webpackJsonptools-bar"]||[]).push([[1],{130:function(t,e,n){},131:function(t,e,n){},30:function(t,e,n){"use strict";n.d(e,"a",(function(){return s}));var a,r,c=n(112),i=n.n(c).a.create({baseURL:"https://dragan.lisa15.ru/"}),s={getAllUsers:function(){return i.get("users")},getGroups:function(){return i.get("api/getGroups").then((function(t){return t.data}))},auth:function(){return i.get("auth")},addGroup:function(t,e){return i.post("api/createGroup",{id:t,name:e})},updateUser:function(t,e){return i.put("userUpdate/".concat(t),{payload:e})},userRemove:function(t){return i.delete("userRemove/".concat(t))},createUser:function(t,e,n){return i.post("createUser",{email:t,password:e,displayName:n})},groupRemove:function(t){return i.delete("groupRemove/".concat(t))}};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(a||(a={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(r||(r={}))},47:function(t,e,n){"use strict";n.d(e,"k",(function(){return d})),n.d(e,"b",(function(){return j})),n.d(e,"g",(function(){return b})),n.d(e,"f",(function(){return O})),n.d(e,"e",(function(){return p})),n.d(e,"i",(function(){return h})),n.d(e,"j",(function(){return f})),n.d(e,"c",(function(){return g})),n.d(e,"h",(function(){return x})),n.d(e,"d",(function(){return S})),n.d(e,"a",(function(){return m}));var a=n(50),r=n(7),c=n(30),i=n(120),s=n(71),o=n(72),u={groups:[],users:[],status:!1,userRecord:"",adminUid:"WuVt9TwRQ0grRFpgAKQlB1nJGAm1",message:"",email:"",userid:""},d=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"USERS/LOGIN_USER":return Object(r.a)(Object(r.a)({},t),{},{email:e.email,userid:e.userid});case"USERS/AUTH":return Object(r.a)(Object(r.a)({},t),{},{status:e.payload});case"USERS/SET-USER-RECORD":return Object(r.a)(Object(r.a)({},t),{},{userRecord:e.payload,status:!0});case"USERS/SET-GROUPS":return Object(r.a)(Object(r.a)({},t),{},{groups:e.payload});case"USERS/SET-USER-ON-GROUP":return console.log("groups: ",t.groups),Object(r.a)({},t);case"USERS/SET-USERS":return Object(r.a)(Object(r.a)({},t),{},{users:e.payload});case"USERS/ADD-GROUP":return Object(r.a)(Object(r.a)({},t),{},{groups:[].concat(Object(a.a)(t.groups),[e.payload])});case"USERS/DELETE-GROUP":return Object(r.a)(Object(r.a)({},t),{},{groups:[t.groups.filter((function(t){return t.id!==e.payload}))]});default:return Object(r.a)({},t)}},l=function(t){return{type:"USERS/AUTH",payload:t}},j=function(){return function(t){o.app.auth().onAuthStateChanged((function(e){var n,a;console.log("onAuthStateChanged :",e),e?(t(l(!0)),t((n=e.email,a=e.uid,{type:"USERS/LOGIN_USER",email:n,userid:a}))):t(l(!1))}))}},b=function(t){return function(e){c.a.userRemove(t).then((function(t){e(x()),console.log(t)}))}},O=function(t){return function(e){c.a.groupRemove(t).then((function(t){e(S()),console.log(t)}))}},p=function(t,e){return function(n){o.app.auth().signInWithEmailAndPassword(t,e).then((function(t){n(l(!0)),n(x())})).catch((function(t){console.log(t)}))}},h=function(){return function(t){s.a.auth().signOut().then((function(t){console.log(t)})).catch((function(t){console.log(t)}))}},f=function(t,e){return function(n){c.a.updateUser(t,e).then((function(t){n(x()),console.log(t)}))}},g=function(t,e,n){return function(a){c.a.createUser(t,e,n).then((function(t){a({type:"USERS/SET-USER-RECORD",payload:t.data}),t.data.message&&alert(t.data.message)}))}},x=function(){return function(t){c.a.getAllUsers().then((function(e){t({type:"USERS/SET-USERS",payload:e.data})})).catch((function(t){return alert(t)}))}},S=function(){return function(t){c.a.getGroups().then((function(e){console.log(e),t({type:"USERS/SET-GROUPS",payload:e})}))}},m=function(t){return function(e){var n=i.a();i.a();c.a.addGroup(n,t).then((function(t){e(S()),console.log(t)}))}}},72:function(t,e,n){"use strict";n.r(e),n.d(e,"app",(function(){return L}));var a=n(1),r=n.n(a),c=n(15),i=n.n(c),s=(n(130),n(131),n(77)),o=n(18),u=n(45),d=n(47),l=n(4),j=r.a.lazy((function(){return Promise.all([n.e(0),n.e(7)]).then(n.bind(null,688))})),b=r.a.lazy((function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,689))}));var O=function(){var t=Object(u.b)();return Object(a.useEffect)((function(){t(Object(d.b)())}),[t]),Object(u.c)((function(t){return t.users.status})),Object(l.jsx)("div",{className:"App",children:Object(l.jsx)(r.a.Suspense,{fallback:"...loading",children:Object(l.jsxs)(o.d,{children:[Object(l.jsx)(o.b,{exact:!0,path:"/login",render:function(){return Object(l.jsx)(j,{})}}),Object(l.jsx)(o.b,{exact:!0,path:"/register",render:function(){return Object(l.jsx)(b,{})}}),Object(l.jsx)(o.b,{exact:!0,path:"/dashboard",render:Object(l.jsx)(s.a,{})}),Object(l.jsx)(s.a,{})]})})})},p=function(t){t&&t instanceof Function&&n.e(10).then(n.bind(null,701)).then((function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,c=e.getLCP,i=e.getTTFB;n(t),a(t),r(t),c(t),i(t)}))},h=n(46),f=n(117),g=n(7),x=n(118),S={token:""},m=n(50),y=n(36),v=(n(30),{}),E=[],T={status:"idle",error:null,isInitialized:!1},R={isLoggedIn:!1},I=Object(h.c)({users:d.k,nav:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:S,e=arguments.length>1?arguments[1]:void 0,n=e.type,a=Object(x.a)(e,["type"]);switch(n){case"set":return Object(g.a)(Object(g.a)({},t),a);default:return t}},tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(g.a)(Object(g.a)({},t),{},Object(y.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!=e.taskId}))));case"ADD-TASK":return Object(g.a)(Object(g.a)({},t),{},Object(y.a)({},e.task.todoListId,[e.task].concat(Object(m.a)(t[e.task.todoListId]))));case"UPDATE-TASK":return Object(g.a)(Object(g.a)({},t),{},Object(y.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(g.a)(Object(g.a)({},t),e.model):t}))));case"ADD-TODOLIST":return Object(g.a)(Object(g.a)({},t),{},Object(y.a)({},e.todolist.id,[]));case"REMOVE-TODOLIST":var n=Object(g.a)({},t);return delete n[e.id],n;case"SET-TODOLISTS":var a=Object(g.a)({},t);return e.todolists.forEach((function(t){a[t.id]=[]})),a;case"SET-TASKS":return Object(g.a)(Object(g.a)({},t),{},Object(y.a)({},e.todolistId,e.tasks));default:return t}},todoList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!=e.id}));case"ADD-TODOLIST":return[Object(g.a)(Object(g.a)({},e.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(m.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(g.a)(Object(g.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(g.a)(Object(g.a)({},t),{},{filter:e.filter}):t}));case"CHANGE-TODOLIST-ENTITY-STATUS":return t.map((function(t){return t.id===e.id?Object(g.a)(Object(g.a)({},t),{},{entityStatus:e.status}):t}));case"SET-TODOLISTS":return e.todolists.map((function(t){return Object(g.a)(Object(g.a)({},t),{},{filter:"all",entityStatus:"idle"})}));default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"APP/SET-STATUS":return Object(g.a)(Object(g.a)({},t),{},{status:e.status});case"APP/SET-ERROR":return Object(g.a)(Object(g.a)({},t),{},{error:e.error});case"IS-INIT":return Object(g.a)(Object(g.a)({},t),{},{isInitialized:e.isInitialized});default:return Object(g.a)({},t)}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"login/SET-IS-LOGGED-IN":return Object(g.a)(Object(g.a)({},t),{},{isLoggedIn:e.value});default:return t}}}),U=Object(h.d)(I,Object(h.a)(f.a)),w=n(39),D=n(71),L=(n(156),D.a.initializeApp({apiKey:"AIzaSyDGqV4nDHMokspRbNj9OufL531PwdNB2sc",authDomain:"fir-silky.firebaseapp.com",databaseURL:"https://fir-silky-default-rtdb.europe-west1.firebasedatabase.app",projectId:"fir-silky",storageBucket:"fir-silky.appspot.com",messagingSenderId:"459950163847",appId:"1:459950163847:web:bcbb780902e981920cb522"}));i.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(u.a,{store:U,children:Object(l.jsx)(w.a,{children:Object(l.jsx)(O,{})})})}),document.getElementById("root")),p()},77:function(t,e,n){"use strict";n.d(e,"a",(function(){return rt}));var a=n(82),r=n(36),c=n(7),i=n(1),s=n.n(i),o=n(8),u=n(201),d=n(202),l=n(213),j=n(211),b=n(203),O=n(204),p=n(209),h=n(58),f=n(208),g=n(205),x=n(206),S=n(210),m=n(200),y=n(113),v=n.n(y),E=n(116),T=n.n(E),R=n(114),I=n.n(R),U=n(194),w=n(197),D=n(198),L=n(199),A=n(106),k=n.n(A),N=n(108),P=n.n(N),G=n(107),C=n.n(G),B=n(109),z=n.n(B),H=n(110),F=n.n(H),M=n(74),K=n.n(M),V=n(39),W=n(4),Y=Object(W.jsxs)("div",{children:[Object(W.jsx)(U.a,{button:!0,children:Object(W.jsxs)(V.c,{to:"/starting",style:{display:"flex"},children:[Object(W.jsx)(w.a,{children:Object(W.jsx)(k.a,{})}),Object(W.jsx)(D.a,{primary:"Dashboard"})]})}),Object(W.jsx)(U.a,{button:!0,children:Object(W.jsxs)(V.c,{to:"/groupsUsers",style:{display:"flex"},children:[Object(W.jsx)(w.a,{children:Object(W.jsx)(C.a,{})}),Object(W.jsx)(D.a,{primary:"GroupsUsers"})]})}),Object(W.jsxs)(U.a,{button:!0,children:[Object(W.jsx)(w.a,{children:Object(W.jsx)(P.a,{})}),Object(W.jsx)(D.a,{primary:"Orders"})]}),Object(W.jsxs)(U.a,{button:!0,children:[Object(W.jsx)(w.a,{children:Object(W.jsx)(z.a,{})}),Object(W.jsx)(D.a,{primary:"Reports"})]}),Object(W.jsxs)(U.a,{button:!0,children:[Object(W.jsx)(w.a,{children:Object(W.jsx)(F.a,{})}),Object(W.jsx)(D.a,{primary:"Integrations"})]})]}),J=Object(W.jsxs)("div",{children:[Object(W.jsx)(L.a,{inset:!0,children:"Saved reports"}),Object(W.jsxs)(U.a,{button:!0,children:[Object(W.jsx)(w.a,{children:Object(W.jsx)(K.a,{})}),Object(W.jsx)(D.a,{primary:"Current month"})]}),Object(W.jsxs)(U.a,{button:!0,children:[Object(W.jsx)(w.a,{children:Object(W.jsx)(K.a,{})}),Object(W.jsx)(D.a,{primary:"Last quarter"})]}),Object(W.jsxs)(U.a,{button:!0,children:[Object(W.jsx)(w.a,{children:Object(W.jsx)(K.a,{})}),Object(W.jsx)(D.a,{primary:"Year-end sale"})]})]}),q=n(18),Q=n(207),_=n(45),X=n(47),Z=n(115),$=n.n(Z);function tt(){return Object(W.jsxs)(h.a,{variant:"body2",color:"textSecondary",align:"center",children:["Copyright \xa9 ",Object(W.jsx)(m.a,{color:"inherit",href:"https://material-ui.com/",children:"Your Website"})," ",(new Date).getFullYear(),"."]})}var et=Object(u.a)((function(t){return{root:{display:"flex"},toolbar:{paddingRight:24},toolbarIcon:Object(c.a)({display:"flex",alignItems:"center",justifyContent:"flex-end",padding:"0 8px"},t.mixins.toolbar),appBar:{zIndex:t.zIndex.drawer+1,transition:t.transitions.create(["width","margin"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen})},appBarShift:{marginLeft:240,width:"calc(100% - ".concat(240,"px)"),transition:t.transitions.create(["width","margin"],{easing:t.transitions.easing.sharp,duration:t.transitions.duration.enteringScreen})},menuButton:{marginRight:36},menuButtonHidden:{display:"none"},title:{flexGrow:1},drawerPaper:{position:"relative",whiteSpace:"nowrap",width:240,transition:t.transitions.create("width",{easing:t.transitions.easing.sharp,duration:t.transitions.duration.enteringScreen})},drawerPaperClose:Object(r.a)({overflowX:"hidden",transition:t.transitions.create("width",{easing:t.transitions.easing.sharp,duration:t.transitions.duration.leavingScreen}),width:t.spacing(7)},t.breakpoints.up("sm"),{width:t.spacing(9)}),appBarSpacer:t.mixins.toolbar,content:{flexGrow:1,height:"100vh",overflow:"auto"},container:{paddingTop:t.spacing(4),paddingBottom:t.spacing(4)},paper:{padding:t.spacing(2),display:"flex",overflow:"auto",flexDirection:"column"},fixedHeight:{height:240}}})),nt=s.a.lazy((function(){return Promise.all([n.e(3),n.e(9)]).then(n.bind(null,704))})),at=s.a.lazy((function(){return Promise.all([n.e(6),n.e(5)]).then(n.bind(null,705))}));function rt(){var t=Object(_.b)(),e=et(),n=s.a.useState(!0),r=Object(a.a)(n,2),i=r[0],u=r[1];return Object(W.jsxs)("div",{className:e.root,children:[Object(W.jsx)(d.a,{}),Object(W.jsx)(b.a,{position:"absolute",className:Object(o.a)(e.appBar,i&&e.appBarShift),children:Object(W.jsxs)(O.a,{className:e.toolbar,children:[Object(W.jsx)(g.a,{edge:"start",color:"inherit","aria-label":"open drawer",onClick:function(){u(!0)},className:Object(o.a)(e.menuButton,i&&e.menuButtonHidden),children:Object(W.jsx)(v.a,{})}),Object(W.jsx)(h.a,{component:"h1",variant:"h6",color:"inherit",noWrap:!0,className:e.title,children:"Dashboard"}),Object(W.jsx)(g.a,{color:"inherit",children:Object(W.jsx)(x.a,{badgeContent:4,color:"secondary",children:Object(W.jsx)(I.a,{})})}),Object(W.jsx)(Q.a,{onClick:function(){t(Object(X.i)())},children:"signin"}),Object(W.jsxs)(V.c,{to:"https://lisapatrikeevna.github.io/dragan-2/",title:"to site",children:[" ",Object(W.jsx)($.a,{})]})]})}),Object(W.jsxs)(l.a,{variant:"permanent",open:i,classes:{paper:Object(o.a)(e.drawerPaper,!i&&e.drawerPaperClose)},children:[Object(W.jsx)("div",{className:e.toolbarIcon,children:Object(W.jsx)(g.a,{onClick:function(){u(!1)},children:Object(W.jsx)(T.a,{})})}),Object(W.jsx)(f.a,{}),Object(W.jsx)(p.a,{children:Y}),Object(W.jsx)(f.a,{}),Object(W.jsx)(p.a,{children:J})]}),Object(W.jsxs)("main",{className:e.content,children:[Object(W.jsx)("div",{className:e.appBarSpacer}),Object(W.jsxs)(S.a,{maxWidth:"lg",className:e.container,children:[Object(W.jsx)(s.a.Suspense,{fallback:"...loading",children:Object(W.jsxs)(q.d,{children:[Object(W.jsx)(q.b,{path:"/starting",render:function(t){return Object(W.jsx)(nt,Object(c.a)({},t))}}),Object(W.jsx)(q.b,{path:"/groupsUsers",render:function(t){return Object(W.jsx)(at,Object(c.a)({},t))}})]})}),Object(W.jsx)(j.a,{pt:4,children:Object(W.jsx)(tt,{})})]})]})]})}}},[[72,2,4]]]);
//# sourceMappingURL=main.faf54aaa.chunk.js.map