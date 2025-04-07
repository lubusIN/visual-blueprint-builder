(()=>{"use strict";const e=window.wp.i18n,t=window.wp.blocks,n=window.wp.primitives,l=window.ReactJSXRuntime,i=(0,l.jsx)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,l.jsx)(n.Path,{d:"M19.75 9c0-1.257-.565-2.197-1.39-2.858-.797-.64-1.827-1.017-2.815-1.247-1.802-.42-3.703-.403-4.383-.396L11 4.5V6l.177-.001c.696-.006 2.416-.02 4.028.356.887.207 1.67.518 2.216.957.52.416.829.945.829 1.688 0 .592-.167.966-.407 1.23-.255.281-.656.508-1.236.674-1.19.34-2.82.346-4.607.346h-.077c-1.692 0-3.527 0-4.942.404-.732.209-1.424.545-1.935 1.108-.526.579-.796 1.33-.796 2.238 0 1.257.565 2.197 1.39 2.858.797.64 1.827 1.017 2.815 1.247 1.802.42 3.703.403 4.383.396L13 19.5h.714V22L18 18.5 13.714 15v3H13l-.177.001c-.696.006-2.416.02-4.028-.356-.887-.207-1.67-.518-2.216-.957-.52-.416-.829-.945-.829-1.688 0-.592.167-.966.407-1.23.255-.281.656-.508 1.237-.674 1.189-.34 2.819-.346 4.606-.346h.077c1.692 0 3.527 0 4.941-.404.732-.209 1.425-.545 1.936-1.108.526-.579.796-1.33.796-2.238z"})}),a=window.wp.blockEditor,o=window.wp.components,r=window.wp.element,s=(0,r.createContext)({fields:[]});function d({fields:e,children:t}){return(0,l.jsx)(s.Provider,{value:{fields:e},children:t})}const c=s,u={sort:function(e,t,n){return"asc"===n?e-t:t-e},isValid:function(e,t){if(""===e)return!1;if(!Number.isInteger(Number(e)))return!1;if(t?.elements){const n=t?.elements.map((e=>e.value));if(!n.includes(Number(e)))return!1}return!0},Edit:"integer"},f={sort:function(e,t,n){return"asc"===n?e.localeCompare(t):t.localeCompare(e)},isValid:function(e,t){if(t?.elements){const n=t?.elements?.map((e=>e.value));if(!n.includes(e))return!1}return!0},Edit:"text"},m={sort:function(e,t,n){const l=new Date(e).getTime(),i=new Date(t).getTime();return"asc"===n?l-i:i-l},isValid:function(e,t){if(t?.elements){const n=t?.elements.map((e=>e.value));if(!n.includes(e))return!1}return!0},Edit:"datetime"},p={datetime:function({data:e,field:t,onChange:n,hideLabelFromVision:i}){const{id:a,label:s}=t,d=t.getValue({item:e}),c=(0,r.useCallback)((e=>n({[a]:e})),[a,n]);return(0,l.jsxs)("fieldset",{className:"dataviews-controls__datetime",children:[!i&&(0,l.jsx)(o.BaseControl.VisualLabel,{as:"legend",children:s}),i&&(0,l.jsx)(o.VisuallyHidden,{as:"legend",children:s}),(0,l.jsx)(o.TimePicker,{currentTime:d,onChange:c,hideLabelFromVision:!0})]})},integer:function({data:e,field:t,onChange:n,hideLabelFromVision:i}){var a;const{id:s,label:d,description:c}=t,u=null!==(a=t.getValue({item:e}))&&void 0!==a?a:"",f=(0,r.useCallback)((e=>n({[s]:Number(e)})),[s,n]);return(0,l.jsx)(o.__experimentalNumberControl,{label:d,help:c,value:u,onChange:f,__next40pxDefaultSize:!0,hideLabelFromVision:i})},radio:function({data:e,field:t,onChange:n,hideLabelFromVision:i}){const{id:a,label:s}=t,d=t.getValue({item:e}),c=(0,r.useCallback)((e=>n({[a]:e})),[a,n]);return t.elements?(0,l.jsx)(o.RadioControl,{label:s,onChange:c,options:t.elements,selected:d,hideLabelFromVision:i}):null},select:function({data:t,field:n,onChange:i,hideLabelFromVision:a}){var s,d;const{id:c,label:u}=n,f=null!==(s=n.getValue({item:t}))&&void 0!==s?s:"",m=(0,r.useCallback)((e=>i({[c]:e})),[c,i]),p=[{label:(0,e.__)("Select item"),value:""},...null!==(d=n?.elements)&&void 0!==d?d:[]];return(0,l.jsx)(o.SelectControl,{label:u,value:f,options:p,onChange:m,__next40pxDefaultSize:!0,__nextHasNoMarginBottom:!0,hideLabelFromVision:a})},text:function({data:e,field:t,onChange:n,hideLabelFromVision:i}){const{id:a,label:s,placeholder:d}=t,c=t.getValue({item:e}),u=(0,r.useCallback)((e=>n({[a]:e})),[a,n]);return(0,l.jsx)(o.TextControl,{label:s,placeholder:d,value:null!=c?c:"",onChange:u,__next40pxDefaultSize:!0,__nextHasNoMarginBottom:!0,hideLabelFromVision:i})}};function h(e){if(Object.keys(p).includes(e))return p[e];throw"Control "+e+" not found"}const x=e=>({item:t})=>{const n=e.split(".");let l=t;for(const e of n)l=l.hasOwnProperty(e)?l[e]:void 0;return l};function g(e){return void 0!==e.children}function _({title:e}){return(0,l.jsx)(o.__experimentalVStack,{className:"dataforms-layouts-regular__header",spacing:4,children:(0,l.jsxs)(o.__experimentalHStack,{alignment:"center",children:[(0,l.jsx)(o.__experimentalHeading,{level:2,size:13,children:e}),(0,l.jsx)(o.__experimentalSpacer,{})]})})}const b=(0,l.jsx)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,l.jsx)(n.Path,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"})});function v({title:t,onClose:n}){return(0,l.jsx)(o.__experimentalVStack,{className:"dataforms-layouts-panel__dropdown-header",spacing:4,children:(0,l.jsxs)(o.__experimentalHStack,{alignment:"center",children:[t&&(0,l.jsx)(o.__experimentalHeading,{level:2,size:13,children:t}),(0,l.jsx)(o.__experimentalSpacer,{}),n&&(0,l.jsx)(o.Button,{label:(0,e.__)("Close"),icon:b,onClick:n,size:"small"})]})})}function j({fieldDefinition:t,popoverAnchor:n,labelPosition:i="side",data:a,onChange:s,field:d}){const c=g(d)?d.label:t?.label,u=(0,r.useMemo)((()=>g(d)?{type:"regular",fields:d.children.map((e=>"string"==typeof e?{id:e}:e))}:{type:"regular",fields:[{id:d.id}]}),[d]),f=(0,r.useMemo)((()=>({anchor:n,placement:"left-start",offset:36,shift:!0})),[n]);return(0,l.jsx)(o.Dropdown,{contentClassName:"dataforms-layouts-panel__field-dropdown",popoverProps:f,focusOnMount:!0,toggleProps:{size:"compact",variant:"tertiary",tooltipPosition:"middle left"},renderToggle:({isOpen:n,onToggle:r})=>(0,l.jsx)(o.Button,{className:"dataforms-layouts-panel__field-control",size:"compact",variant:["none","top"].includes(i)?"link":"tertiary","aria-expanded":n,"aria-label":(0,e.sprintf)(
// translators: %s: Field name.
// translators: %s: Field name.
(0,e._x)("Edit %s","field"),c),onClick:r,children:(0,l.jsx)(t.render,{item:a})}),renderContent:({onClose:e})=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(v,{title:c,onClose:e}),(0,l.jsx)(C,{data:a,form:u,onChange:s,children:(e,t)=>{var n;return(0,l.jsx)(e,{data:a,field:t,onChange:s,hideLabelFromVision:(null!==(n=u?.fields)&&void 0!==n?n:[]).length<2},t.id)}})]})})}const y=[{type:"regular",component:function({data:e,field:t,onChange:n,hideLabelFromVision:i}){var a;const{fields:s}=(0,r.useContext)(c),d=(0,r.useMemo)((()=>g(t)?{fields:t.children.map((e=>"string"==typeof e?{id:e}:e)),type:"regular"}:{type:"regular",fields:[]}),[t]);if(g(t))return(0,l.jsxs)(l.Fragment,{children:[!i&&t.label&&(0,l.jsx)(_,{title:t.label}),(0,l.jsx)(C,{data:e,form:d,onChange:n})]});const u=null!==(a=t.labelPosition)&&void 0!==a?a:"top",f=s.find((e=>e.id===t.id));return f?"side"===u?(0,l.jsxs)(o.__experimentalHStack,{className:"dataforms-layouts-regular__field",children:[(0,l.jsx)("div",{className:"dataforms-layouts-regular__field-label",children:f.label}),(0,l.jsx)("div",{className:"dataforms-layouts-regular__field-control",children:(0,l.jsx)(f.Edit,{data:e,field:f,onChange:n,hideLabelFromVision:!0},f.id)})]}):(0,l.jsx)("div",{className:"dataforms-layouts-regular__field",children:(0,l.jsx)(f.Edit,{data:e,field:f,onChange:n,hideLabelFromVision:"none"===u||i})}):null}},{type:"panel",component:function({data:e,field:t,onChange:n}){var i;const{fields:a}=(0,r.useContext)(c),s=a.find((e=>{if(g(t)){const n=t.children.filter((e=>"string"==typeof e||!g(e))),l="string"==typeof n[0]?n[0]:n[0].id;return e.id===l}return e.id===t.id})),d=null!==(i=t.labelPosition)&&void 0!==i?i:"side",[u,f]=(0,r.useState)(null);if(!s)return null;const m=g(t)?t.label:s?.label;return"top"===d?(0,l.jsxs)(o.__experimentalVStack,{className:"dataforms-layouts-panel__field",spacing:0,children:[(0,l.jsx)("div",{className:"dataforms-layouts-panel__field-label",style:{paddingBottom:0},children:m}),(0,l.jsx)("div",{className:"dataforms-layouts-panel__field-control",children:(0,l.jsx)(j,{field:t,popoverAnchor:u,fieldDefinition:s,data:e,onChange:n,labelPosition:d})})]}):"none"===d?(0,l.jsx)("div",{className:"dataforms-layouts-panel__field",children:(0,l.jsx)(j,{field:t,popoverAnchor:u,fieldDefinition:s,data:e,onChange:n,labelPosition:d})}):(0,l.jsxs)(o.__experimentalHStack,{ref:f,className:"dataforms-layouts-panel__field",children:[(0,l.jsx)("div",{className:"dataforms-layouts-panel__field-label",children:m}),(0,l.jsx)("div",{className:"dataforms-layouts-panel__field-control",children:(0,l.jsx)(j,{field:t,popoverAnchor:u,fieldDefinition:s,data:e,onChange:n,labelPosition:d})})]})}}];function C({data:e,form:t,onChange:n,children:i}){const{fields:a}=(0,r.useContext)(c),s=(0,r.useMemo)((()=>function(e){var t,n,l;let i="regular";["regular","panel"].includes(null!==(t=e.type)&&void 0!==t?t:"")&&(i=e.type);const a=null!==(n=e.labelPosition)&&void 0!==n?n:"regular"===i?"top":"side";return(null!==(l=e.fields)&&void 0!==l?l:[]).map((e=>{var t,n;if("string"==typeof e)return{id:e,layout:i,labelPosition:a};const l=null!==(t=e.layout)&&void 0!==t?t:i,o=null!==(n=e.labelPosition)&&void 0!==n?n:"regular"===l?"top":"side";return{...e,layout:l,labelPosition:o}}))}(t)),[t]);return(0,l.jsx)(o.__experimentalVStack,{spacing:2,children:s.map((t=>{const o=(r=t.layout,y.find((e=>e.type===r)))?.component;var r;if(!o)return null;const s=g(t)?void 0:function(e){const t="string"==typeof e?e:e.id;return a.find((e=>e.id===t))}(t);return s&&s.isVisible&&!s.isVisible(e)?null:i?i(o,t):(0,l.jsx)(o,{data:e,field:t,onChange:n},t.id)}))})}function w({data:e,form:t,fields:n,onChange:i}){const a=(0,r.useMemo)((()=>function(e){return e.map((e=>{var t,n,l,i;const a="integer"===(o=e.type)?u:"text"===o?f:"datetime"===o?m:{sort:(e,t,n)=>"number"==typeof e&&"number"==typeof t?"asc"===n?e-t:t-e:"asc"===n?e.localeCompare(t):t.localeCompare(e),isValid:(e,t)=>{if(t?.elements){const n=t?.elements?.map((e=>e.value));if(!n.includes(e))return!1}return!0},Edit:()=>null};var o;const r=e.getValue||x(e.id),s=null!==(t=e.sort)&&void 0!==t?t:function(e,t,n){return a.sort(r({item:e}),r({item:t}),n)},d=null!==(n=e.isValid)&&void 0!==n?n:function(e,t){return a.isValid(r({item:e}),t)},c=function(e,t){return"function"==typeof e.Edit?e.Edit:"string"==typeof e.Edit?h(e.Edit):e.elements?h("select"):"string"==typeof t.Edit?h(t.Edit):t.Edit}(e,a),p=e.render||(e.elements?({item:t})=>{const n=r({item:t});return e?.elements?.find((e=>e.value===n))?.label||r({item:t})}:r);return{...e,label:e.label||e.id,header:e.header||e.label||e.id,getValue:r,render:p,sort:s,isValid:d,Edit:c,enableHiding:null===(l=e.enableHiding)||void 0===l||l,enableSorting:null===(i=e.enableSorting)||void 0===i||i}}))}(n)),[n]);return t.fields?(0,l.jsx)(d,{fields:a,children:(0,l.jsx)(C,{data:e,form:t,onChange:i})}):null}const V=JSON.parse('{"UU":"playground-step/mv","DD":"Move File/Dir"}');(0,t.registerBlockType)(V.UU,{icon:i,edit:function({attributes:t,setAttributes:n,isSelected:r}){const{fromPath:s,toPath:d}=t;return(0,l.jsx)("p",{...(0,a.useBlockProps)(),children:(0,l.jsx)(o.Placeholder,{preview:(0,l.jsxs)(o.__experimentalVStack,{style:{width:"100%"},children:[(0,l.jsxs)(o.__experimentalHStack,{justify:"left",align:"center",spacing:3,children:[(0,l.jsx)(o.Icon,{icon:i,size:28,className:"step-icon"}),(0,l.jsxs)(o.__experimentalVStack,{spacing:1,children:[(0,l.jsx)(o.__experimentalText,{upperCase:!0,size:12,weight:500,color:"#949494",children:V.DD}),!r&&(0,l.jsxs)(o.__experimentalText,{weight:600,children:[(0,e.__)("from","wp-playground-blueprint-editor")," ",` ${s||"{from path}"}`," ",(0,e.__)("to","wp-playground-blueprint-editor")," ",` ${d||"{to path}"}`]})]})]}),r&&(0,l.jsx)(w,{data:t,fields:[{id:"fromPath",label:(0,e.__)("From Path","wp-playground-blueprint-editor"),type:"text",placeholder:(0,e.__)("Enter the current path of the file or directory","wp-playground-blueprint-editor")},{id:"toPath",label:(0,e.__)("To Path","wp-playground-blueprint-editor"),type:"text",placeholder:(0,e.__)("Enter the new path where the file or directory should be moved","wp-playground-blueprint-editor")}],form:{fields:["fromPath","toPath"]},onChange:n})]})})})}})})();