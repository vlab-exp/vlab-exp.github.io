(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{58:function(e,t,n){e.exports=n(77)},68:function(e,t,n){},69:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){},74:function(e,t,n){},77:function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"ENQUEUE_SNACKBAR",(function(){return p})),n.d(a,"CLOSE_SNACKBAR",(function(){return g})),n.d(a,"REMOVE_SNACKBAR",(function(){return b})),n.d(a,"enqueueSnackbar",(function(){return y})),n.d(a,"closeSnackbar",(function(){return E})),n.d(a,"removeSnackbar",(function(){return N}));n(59),n(60);var r=n(104),o=n(38),i=n(0),c=n.n(i),s=n(6),l=n(8),d=(n(68),n(98)),u=n(100),h=n(101),m=n(102),f=n(103),v=n(105),p=(n(69),"ENQUEUE_SNACKBAR"),g="CLOSE_SNACKBAR",b="REMOVE_SNACKBAR",y=function(e){var t=e.options&&e.options.key;return{type:p,notification:Object.assign({},e,{key:t||(new Date).getTime()+Math.random()})}},E=function(e){return{type:g,dismissAll:!e,key:e}},N=function(e){return{type:b,key:e}},I={items:[]},O=[],j=function(){var e=Object(l.b)(),t=Object(l.c)((function(e){return e.notifications.items||[]})),n=Object(o.b)(),r=n.enqueueSnackbar,i=n.closeSnackbar,s=function(e){O=[].concat(O.filter((function(t){return e!==t})))};return c.a.useEffect((function(){t.forEach((function(t){var n=t.key,o=t.message,c=t.options,l=void 0===c?{}:c,d=t.dismissed;void 0!==d&&d?i(n):O.includes(n)||(r(o,Object.assign({key:n},l,{onClose:function(t,r,o){"clickaway"===r&&(e(a.closeSnackbar(n)),s(n)),l.onClose&&l.onClose(t,r,o)},onExited:function(t,n){e(a.removeSnackbar(n)),s(n)}})),O=[].concat(O,[n]))}))}),[t,i,r,e]),null},S=n(106),k=n(26),w=n(15),A=n(43),P=n.n(A);function C(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return G(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return G(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0;return function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function G(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var H=function(e){var t=e.position.split(","),n=t[0],a=t[1];return Object.assign({},e,{type:"customNode",position:{x:n,y:a}})},x=function(e){return Object.assign({},e,{type:"customEdge",arrowHeadType:"arrowclosed"})},T=function(e){return e.id.includes("-")},D=function(e,t){return t.nodes.find((function(t){return t.id===e}))},M=function(e){for(var t,n=C(e);!(t=n()).done;){var a=t.value;if(null===P.a.get(a.data,"shortestPath",null))return!1}return!0},Y=function(e){for(var t,n=e.nodes,a=e.edges,r=C(n);!(t=r()).done;){var o=t.value;if(null===P.a.get(o.data,"shortestPath",null)){var i=_(o.id,{nodes:n,edges:a});if(M(i))return o}}return null},_=function(e,t){return t.edges.filter((function(t){return t.target===e})).map((function(e){return t.nodes.find((function(t){return t.id===e.source}))}))},U=function(e,t){for(var n,a=1/0,r=-1,o=_(e,t),i=function(){var t=n.value;if(t.target===e){var i=Number(t.label)+o.find((function(e){return e.id===t.source})).data.shortestPath;i<a&&(a=i,r=t.source)}},c=C(t.edges);!(n=c()).done;)i();return[a,r]},z=function(e){for(var t,n=C(e.nodes);!(t=n()).done;){if(void 0===t.value.data.shortestPath)return!1}return!0},R={nodes:[{id:"1",position:"100,0",data:{shortestPath:0,predecessorId:"0"}},{id:"2",position:"0,150",data:{}},{id:"3",position:"200,150",data:{}},{id:"4",position:"0,300",data:{}},{id:"5",position:"200,300",data:{}}],edges:[{id:"e1-2",source:"1",target:"2",sourceHandle:"handle-left",targetHandle:"handle-top",label:"1",data:{}},{id:"e1-3",source:"1",target:"3",sourceHandle:"handle-right",targetHandle:"handle-top",label:"2",data:{}},{id:"e2-4",source:"2",target:"4",sourceHandle:"handle-bottom",targetHandle:"handle-top",label:"100",data:{}},{id:"e3-5",source:"3",target:"5",sourceHandle:"handle-bottom",targetHandle:"handle-top",label:"1",data:{}},{id:"e4-5",source:"4",target:"5",sourceHandle:"handle-right",targetHandle:"handle-left",label:"200",data:{}}]};function q(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return L(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return L(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0;return function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function L(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var B=Object.assign({},R,{sourceNodeId:"1"}),K=function(){return Object.assign({},B,{activeNodeId:null,destinationNodeId:null})},V=Object(w.b)({name:"v1Graph",initialState:K(),reducers:{reset:function(e,t){return K()},setActiveNode:function(e,t){var n=t.payload.nodeId;e.activeNodeId=n},clearActiveNode:function(e,t){e.activeNodeId=null},visit:function(e,t){var n=t.payload.nodeId,a=D(n,e),r=U(n,e),o=r[0],i=r[1];a.data={shortestPath:o,predecessorId:i}},highlightPath:function(e,t){var n=t.payload.nodeId;e.destinationNodeId=n;for(var a=D(n,e).data.predecessorId;"0"!==a;){var r=e.edges.findIndex((function(e){return e.source===a&&e.target===n}));e.edges[r].data.isHighlighted=!0;var o=D(a,e);n=a,a=o.data.predecessorId}},clearHighlightedPath:function(e,t){for(var n,a=q(e.edges.entries());!(n=a()).done;){var r=n.value,o=r[0];r[1];e.edges[o].data.isHighlighted=!1}e.destinationNodeId=null}}}),X=function(){return function(e){return e(V.actions.reset())}},$=function(e){var t=e.pathLength;return function(e,n){if(null===t)return e(V.actions.clearActiveNode());var r=n().v1Graph,o=U(r.activeNodeId,r),i=o[0];o[1];return i!==Number(t)?e(a.enqueueSnackbar({message:"Incorrect shortest path length",options:{variant:"error"}})):e(V.actions.visit({nodeId:r.activeNodeId})),e(V.actions.clearActiveNode())}},J=function(e){var t=e.nodeId;return function(e,n){var r=n().v1Graph;e(V.actions.clearHighlightedPath());var o=D(t,r);if(void 0!==o.data.shortestPath)return e(V.actions.highlightPath({nodeId:t}));for(var i,c=q(_(t,r));!(i=c()).done;){if(void 0===i.value.data.shortestPath)return e(a.enqueueSnackbar({message:'Node "'+o.id+'" has unvisited predecessors',options:{variant:"warning"}}))}e(V.actions.setActiveNode({nodeId:t}))}},F=V.reducer,Q=c.a.createElement("p",{className:"title"},"Color Codes"),W=c.a.createElement("p",null,c.a.createElement("div",{className:"color-block-container"},c.a.createElement("span",{className:"color-block green source"})," Source Node"),c.a.createElement("div",{className:"color-block-container"},c.a.createElement("span",{className:"color-block blue"})," Unvisited Node"),c.a.createElement("div",{className:"color-block-container"},c.a.createElement("span",{className:"color-block green"})," Visited Node"),c.a.createElement("div",{className:"color-block-container"},c.a.createElement("span",{className:"color-block green destination"})," Destination Node"),c.a.createElement("div",{className:"color-block-container"},c.a.createElement("span",{className:"color-block yellow"})," Shortest Path Edge")),Z=function(){return c.a.createElement(c.a.Fragment,null,Q,W)},ee=n(3),te=n(16),ne=(n(72),function(e){var t=e.sourceX,n=e.sourceY,a=e.sourcePosition,r=e.targetX,o=e.targetY,i=e.targetPosition,s=Object(te.d)({sourceX:t,sourceY:n,sourcePosition:a,targetX:r,targetY:o,targetPosition:i}),l=Object(te.c)(e.arrowHeadType,e.markerEndId);return c.a.createElement(te.b,null,c.a.createElement("path",{id:e.id,style:e.style,className:Object(ee.a)("react-flow__edge-path","edge",e.data.isHighlighted&&"highlighted"),d:s,markerEnd:l}),c.a.createElement("text",{dy:-8},c.a.createElement("textPath",{href:"#"+e.id,startOffset:"50%",textAnchor:"middle",className:"edge-label"},e.label)))}),ae=(n(73),c.a.createElement(te.a,{position:"top",id:"handle-top"})),re=c.a.createElement(te.a,{position:"left",id:"handle-left"}),oe=c.a.createElement(te.a,{position:"bottom",id:"handle-bottom"}),ie=c.a.createElement(te.a,{position:"right",id:"handle-right"}),ce=function(e){var t=Object(l.c)((function(e){var t=e.ui.activeGraphId;return 1===t?e.v1Graph:2===t?e.v2Graph:e.v3Graph})),n=t.sourceNodeId===e.id,a=t.destinationNodeId===e.id,r=void 0!==e.data.shortestPath;return c.a.createElement(te.b,null,c.a.createElement("div",{className:Object(ee.a)("node",a&&"destination",n&&"source",r&&"visited")},c.a.createElement("div",{className:"label"},e.id),void 0!==e.data.shortestPath&&c.a.createElement("div",{className:"shortest-path"},e.data.shortestPath),ae,re,oe,ie))},se=c.a.createElement(d.a,{md:4},c.a.createElement("div",{className:"content-container"},c.a.createElement("p",{className:"title"},"Objective"),c.a.createElement("p",null,"Given a directed graph with non-negative weights, find the shortest path from the source node to every node in the graph."),c.a.createElement("p",{className:"title"},"Setup"),c.a.createElement("p",null,"You can click on any node to visit it and attempt to enter the length of its shortest path, provided that all its predecessors have been visited."),c.a.createElement("p",null,"The length of the shortest path to a given ",c.a.createElement("code",null,"node")," is the minimum value of the following sum across all its predecessors:"),c.a.createElement("p",null,c.a.createElement("code",null,"shortest_path[predecessor] + edge_weight[predecessor, node]")),c.a.createElement("p",null,"The selected node will be annotated with the length of shortest path entered by you."),c.a.createElement("p",null,"You can click on any visited node to set it as the destination node and see the shortest path from the source node."),c.a.createElement("p",null,"If you select a node with unvisited predecessors, or if you enter an incorrect shortest path length, you will see the corresponding error, and you must try again."),c.a.createElement(Z,null))),le=c.a.createElement(S.a,{severity:"success",className:"message"},"All nodes have been visited"),de=function(){var e=Object(l.b)(),t=Object(l.c)((function(e){return e.v1Graph.activeNodeId})),n=Object(l.c)((function(e){var t=e.v1Graph,n=t.nodes,a=t.edges;return n.map(H).concat(a.map(x))})),a=Object(l.c)((function(e){return z(e.v1Graph)}));if(null!==t){var r=prompt('Enter the length of the shortest path to node "'+t+'":');e($({pathLength:r}))}return c.a.createElement(d.a,{className:"grid-container",container:!0},se,c.a.createElement(d.a,{md:8,className:"graph-container"},a&&le,c.a.createElement(k.a,{zoomOnDoubleClick:!1,zoomOnScroll:!1,paneMoveable:!1,onLoad:function(e){return e.fitView()},onElementClick:function(t,n){T(n)||e(J({nodeId:n.id}))},elements:n,nodesDraggable:!1,nodesConnectable:!1,nodeTypes:{customNode:ce},edgeTypes:{customEdge:ne}})))};function ue(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return he(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return he(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0;return function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function he(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var me=Object.assign({},R,{sourceNodeId:"1"}),fe=function(){return Object.assign({},me,{destinationNodeId:null})},ve=Object(w.b)({name:"v2Graph",initialState:fe(),reducers:{reset:function(e,t){return fe()},visit:function(e,t){var n=t.payload.nodeId,a=D(n,e),r=U(n,e),o=r[0],i=r[1];a.data={shortestPath:o,predecessorId:i}},highlightPath:function(e,t){var n=t.payload.nodeId;e.destinationNodeId=n;for(var a=D(n,e).data.predecessorId;"0"!==a;){var r=e.edges.findIndex((function(e){return e.source===a&&e.target===n}));e.edges[r].data.isHighlighted=!0;var o=D(a,e);n=a,a=o.data.predecessorId}},clearHighlightedPath:function(e,t){for(var n,a=ue(e.edges.entries());!(n=a()).done;){var r=n.value,o=r[0];r[1];e.edges[o].data.isHighlighted=!1,e.destinationNodeId=null}}}}),pe=function(){return function(e){return e(ve.actions.reset())}},ge=function(e){var t=e.nodeId;return function(e,n){var r=n().v2Graph;e(ve.actions.clearHighlightedPath());var o=D(t,r);if(void 0!==o.data.shortestPath)return e(ve.actions.highlightPath({nodeId:t}));for(var i,c=ue(_(t,r));!(i=c()).done;){if(void 0===i.value.data.shortestPath)return e(a.enqueueSnackbar({message:'Node "'+o.id+'" has unvisited predecessors',options:{variant:"warning"}}))}e(ve.actions.visit({nodeId:t}))}},be=ve.reducer,ye=c.a.createElement(d.a,{md:4},c.a.createElement("div",{className:"content-container"},c.a.createElement("p",{className:"title"},"Objective"),c.a.createElement("p",null,"Given a directed graph with non-negative weights, find the shortest path from the source node to every node in the graph."),c.a.createElement("p",{className:"title"},"Setup"),c.a.createElement("p",null,"You can click on any node to visit it, provided that all its predecessors have been visited."),c.a.createElement("p",null,"The system will annotate the selected node with the length of the shortest path."),c.a.createElement("p",null,"You can click on any visited node to set it as the destination node and see the shortest path from the source node."),c.a.createElement("p",null,"If you select a node with unvisited predecessors, you will see the corresponding error, and you must try again."),c.a.createElement(Z,null))),Ee=c.a.createElement(S.a,{severity:"success",className:"message"},"All nodes have been visited"),Ne=function(){var e=Object(l.b)(),t=Object(l.c)((function(e){var t=e.v2Graph,n=t.nodes,a=t.edges;return n.map(H).concat(a.map(x))})),n=Object(l.c)((function(e){return z(e.v2Graph)}));return c.a.createElement(d.a,{className:"grid-container",container:!0},ye,c.a.createElement(d.a,{md:8,className:"graph-container"},n&&Ee,c.a.createElement(k.a,{zoomOnDoubleClick:!1,zoomOnScroll:!1,paneMoveable:!1,onLoad:function(e){return e.fitView()},onElementClick:function(t,n){T(n)||e(ge({nodeId:n.id}))},elements:t,nodesDraggable:!1,nodesConnectable:!1,nodeTypes:{customNode:ce},edgeTypes:{customEdge:ne}})))},Ie=n(99);function Oe(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(n)return(n=n.call(e)).next.bind(n);if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return je(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return je(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0;return function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function je(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var Se=Object.assign({},R,{sourceNodeId:"1"}),ke=function(){return Object.assign({},Se,{destinationNodeId:null})},we=Object(w.b)({name:"v3Graph",initialState:ke(),reducers:{reset:function(e,t){return ke()},next:function(e,t){var n=Y(e),a=U(n.id,e),r=a[0],o=a[1];n.data={shortestPath:r,predecessorId:o}},highlightPath:function(e,t){var n=t.payload.nodeId;e.destinationNodeId=n;for(var a=D(n,e).data.predecessorId;"0"!==a;){var r=e.edges.findIndex((function(e){return e.source===a&&e.target===n}));e.edges[r].data.isHighlighted=!0;var o=D(a,e);n=a,a=o.data.predecessorId}},clearHighlightedPath:function(e,t){for(var n,a=Oe(e.edges.entries());!(n=a()).done;){var r=n.value,o=r[0];r[1];e.edges[o].data.isHighlighted=!1,e.destinationNodeId=null}}}}),Ae={next:we.actions.next,reset:function(){return function(e){return e(we.actions.reset())}},select:function(e){var t=e.nodeId;return function(e,n){var r=n().v3Graph;console.dir(JSON.stringify(r)),e(we.actions.clearHighlightedPath());var o=D(t,r);return void 0!==o.data.shortestPath?e(we.actions.highlightPath({nodeId:t})):e(a.enqueueSnackbar({message:'Node "'+o.id+'" has not been visited yet',options:{variant:"warning"}}))}}},Pe=we.reducer,Ce=(n(74),c.a.createElement(d.a,{md:4},c.a.createElement("div",{className:"content-container"},c.a.createElement("p",{className:"title"},"Objective"),c.a.createElement("p",null,"Given a directed graph with non-negative weights, find the shortest path from the source node to every node in the graph."),c.a.createElement("p",{className:"title"},"Setup"),c.a.createElement("p",null,"You can click on the",c.a.createElement("span",{className:"next-button-indicator"},"NEXT")," button."),c.a.createElement("p",null,"On each click of this button, the system will visit a valid node, and annotate it with the length of the shortest path."),c.a.createElement("p",null,"You can click on any visited node to set it as the destination node and see the shortest path from the source node."),c.a.createElement(Z,null)))),Ge=c.a.createElement(S.a,{severity:"success",className:"message"},"All nodes have been visited"),He=function(){var e=Object(l.b)(),t=Object(l.c)((function(e){return e.v3Graph})),n=t.nodes.map(H).concat(t.edges.map(x)),a=z(t),r=null===Y(t);return c.a.createElement(d.a,{className:"grid-container",container:!0},Ce,c.a.createElement(d.a,{md:8,className:"graph-container"},a&&Ge,c.a.createElement(Ie.a,{disabled:r,className:"next-button",onClick:function(){e(Ae.next())},size:"large",color:"primary",variant:"contained"},r?"DONE":"NEXT"),c.a.createElement(k.a,{zoomOnDoubleClick:!1,zoomOnScroll:!1,paneMoveable:!1,onLoad:function(e){return e.fitView()},onElementClick:function(t,n){T(n)||e(Ae.select({nodeId:n.id}))},elements:n,nodesDraggable:!1,nodesConnectable:!1,nodeTypes:{customNode:ce},edgeTypes:{customEdge:ne}})))},xe=Object(w.b)({name:"ui",initialState:{activeGraphId:1},reducers:{setActiveGraph:function(e,t){var n=t.payload.graphId;e.activeGraphId=n}}}),Te=xe.actions,De=xe.reducer,Me=c.a.createElement(j,null),Ye=c.a.createElement(d.a,{item:!0},c.a.createElement(u.a,{variant:"h6"},"Shortest Path using Dynamic Programming")),_e=c.a.createElement(h.a,{label:"v1",value:1}),Ue=c.a.createElement(h.a,{label:"v2",value:2}),ze=c.a.createElement(h.a,{label:"v3",value:3}),Re=c.a.createElement(de,null),qe=c.a.createElement(Ne,null),Le=c.a.createElement(He,null),Be=function(){var e=Object(l.c)((function(e){return e.ui.activeGraphId})),t=Object(l.b)();return Object(i.useEffect)((function(){t(X()),t(pe()),t(Ae.reset())}),[e]),c.a.createElement("div",{className:"root"},Me,c.a.createElement(m.a,{className:"appbar",position:"relative"},c.a.createElement(f.a,null,c.a.createElement(d.a,{container:!0,justify:"space-between",alignItems:"center"},Ye,c.a.createElement(d.a,{item:!0},c.a.createElement(v.a,{value:e,onChange:function(e,n){t(Te.setActiveGraph({graphId:n}))}},_e,Ue,ze))))),1===e&&Re,2===e&&qe,3===e&&Le)},Ke=n(18),Ve=Object(w.a)({reducer:Object(Ke.b)({notifications:function(e,t){switch(void 0===e&&(e=I),t.type){case p:return Object.assign({},e,{items:[].concat(e.items,[Object.assign({key:t.key},t.notification)])});case g:return Object.assign({},e,{items:e.items.map((function(e){return t.dismissAll||e.key===t.key?Object.assign({},e,{dismissed:!0}):Object.assign({},e)}))});case b:return Object.assign({},e,{items:e.items.filter((function(e){return e.key!==t.key}))});default:return e}},v1Graph:F,v2Graph:be,v3Graph:Pe,ui:De})});Object(s.render)(c.a.createElement(r.b,{injectFirst:!0},c.a.createElement(l.a,{store:Ve},c.a.createElement(o.a,{anchorOrigin:{vertical:"top",horizontal:"right"}},c.a.createElement(Be,null)))),document.querySelector("#app"))}},[[58,1,2]]]);
//# sourceMappingURL=app.5f97d48d.js.map