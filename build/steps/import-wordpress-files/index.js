(()=>{"use strict";const e=window.wp.i18n,n=window.wp.blocks,l=window.wp.primitives,i=window.ReactJSXRuntime,t=(0,i.jsx)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"-2 -2 24 24",children:(0,i.jsx)(l.Path,{d:"M20 10c0-5.51-4.49-10-10-10C4.48 0 0 4.49 0 10c0 5.52 4.48 10 10 10 5.51 0 10-4.48 10-10zM7.78 15.37L4.37 6.22c.55-.02 1.17-.08 1.17-.08.5-.06.44-1.13-.06-1.11 0 0-1.45.11-2.37.11-.18 0-.37 0-.58-.01C4.12 2.69 6.87 1.11 10 1.11c2.33 0 4.45.87 6.05 2.34-.68-.11-1.65.39-1.65 1.58 0 .74.45 1.36.9 2.1.35.61.55 1.36.55 2.46 0 1.49-1.4 5-1.4 5l-3.03-8.37c.54-.02.82-.17.82-.17.5-.05.44-1.25-.06-1.22 0 0-1.44.12-2.38.12-.87 0-2.33-.12-2.33-.12-.5-.03-.56 1.2-.06 1.22l.92.08 1.26 3.41zM17.41 10c.24-.64.74-1.87.43-4.25.7 1.29 1.05 2.71 1.05 4.25 0 3.29-1.73 6.24-4.4 7.78.97-2.59 1.94-5.2 2.92-7.78zM6.1 18.09C3.12 16.65 1.11 13.53 1.11 10c0-1.3.23-2.48.72-3.59C3.25 10.3 4.67 14.2 6.1 18.09zm4.03-6.63l2.58 6.98c-.86.29-1.76.45-2.71.45-.79 0-1.57-.11-2.29-.33.81-2.38 1.62-4.74 2.42-7.1z"})}),a=window.wp.blockEditor,o=window.wp.components,r=window.wp.element,s=(0,r.createContext)({fields:[]});function d({fields:e,children:n}){return(0,i.jsx)(s.Provider,{value:{fields:e},children:n})}const c=s,u={sort:function(e,n,l){return"asc"===l?e-n:n-e},isValid:function(e,n){if(""===e)return!1;if(!Number.isInteger(Number(e)))return!1;if(n?.elements){const l=n?.elements.map((e=>e.value));if(!l.includes(Number(e)))return!1}return!0},Edit:"integer"},f={sort:function(e,n,l){return"asc"===l?e.localeCompare(n):n.localeCompare(e)},isValid:function(e,n){if(n?.elements){const l=n?.elements?.map((e=>e.value));if(!l.includes(e))return!1}return!0},Edit:"text"},m={sort:function(e,n,l){const i=new Date(e).getTime(),t=new Date(n).getTime();return"asc"===l?i-t:t-i},isValid:function(e,n){if(n?.elements){const l=n?.elements.map((e=>e.value));if(!l.includes(e))return!1}return!0},Edit:"datetime"},p={datetime:function({data:e,field:n,onChange:l,hideLabelFromVision:t}){const{id:a,label:s}=n,d=n.getValue({item:e}),c=(0,r.useCallback)((e=>l({[a]:e})),[a,l]);return(0,i.jsxs)("fieldset",{className:"dataviews-controls__datetime",children:[!t&&(0,i.jsx)(o.BaseControl.VisualLabel,{as:"legend",children:s}),t&&(0,i.jsx)(o.VisuallyHidden,{as:"legend",children:s}),(0,i.jsx)(o.TimePicker,{currentTime:d,onChange:c,hideLabelFromVision:!0})]})},integer:function({data:e,field:n,onChange:l,hideLabelFromVision:t}){var a;const{id:s,label:d,description:c}=n,u=null!==(a=n.getValue({item:e}))&&void 0!==a?a:"",f=(0,r.useCallback)((e=>l({[s]:Number(e)})),[s,l]);return(0,i.jsx)(o.__experimentalNumberControl,{label:d,help:c,value:u,onChange:f,__next40pxDefaultSize:!0,hideLabelFromVision:t})},radio:function({data:e,field:n,onChange:l,hideLabelFromVision:t}){const{id:a,label:s}=n,d=n.getValue({item:e}),c=(0,r.useCallback)((e=>l({[a]:e})),[a,l]);return n.elements?(0,i.jsx)(o.RadioControl,{label:s,onChange:c,options:n.elements,selected:d,hideLabelFromVision:t}):null},select:function({data:n,field:l,onChange:t,hideLabelFromVision:a}){var s,d;const{id:c,label:u}=l,f=null!==(s=l.getValue({item:n}))&&void 0!==s?s:"",m=(0,r.useCallback)((e=>t({[c]:e})),[c,t]),p=[{label:(0,e.__)("Select item"),value:""},...null!==(d=l?.elements)&&void 0!==d?d:[]];return(0,i.jsx)(o.SelectControl,{label:u,value:f,options:p,onChange:m,__next40pxDefaultSize:!0,__nextHasNoMarginBottom:!0,hideLabelFromVision:a})},text:function({data:e,field:n,onChange:l,hideLabelFromVision:t}){const{id:a,label:s,placeholder:d}=n,c=n.getValue({item:e}),u=(0,r.useCallback)((e=>l({[a]:e})),[a,l]);return(0,i.jsx)(o.TextControl,{label:s,placeholder:d,value:null!=c?c:"",onChange:u,__next40pxDefaultSize:!0,__nextHasNoMarginBottom:!0,hideLabelFromVision:t})}};function h(e){if(Object.keys(p).includes(e))return p[e];throw"Control "+e+" not found"}const x=e=>({item:n})=>{const l=e.split(".");let i=n;for(const e of l)i=i.hasOwnProperty(e)?i[e]:void 0;return i};function g(e){return void 0!==e.children}function _({title:e}){return(0,i.jsx)(o.__experimentalVStack,{className:"dataforms-layouts-regular__header",spacing:4,children:(0,i.jsxs)(o.__experimentalHStack,{alignment:"center",children:[(0,i.jsx)(o.__experimentalHeading,{level:2,size:13,children:e}),(0,i.jsx)(o.__experimentalSpacer,{})]})})}const b=(0,i.jsx)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,i.jsx)(l.Path,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"})});function v({title:n,onClose:l}){return(0,i.jsx)(o.__experimentalVStack,{className:"dataforms-layouts-panel__dropdown-header",spacing:4,children:(0,i.jsxs)(o.__experimentalHStack,{alignment:"center",children:[n&&(0,i.jsx)(o.__experimentalHeading,{level:2,size:13,children:n}),(0,i.jsx)(o.__experimentalSpacer,{}),l&&(0,i.jsx)(o.Button,{label:(0,e.__)("Close"),icon:b,onClick:l,size:"small"})]})})}function j({fieldDefinition:n,popoverAnchor:l,labelPosition:t="side",data:a,onChange:s,field:d}){const c=g(d)?d.label:n?.label,u=(0,r.useMemo)((()=>g(d)?{type:"regular",fields:d.children.map((e=>"string"==typeof e?{id:e}:e))}:{type:"regular",fields:[{id:d.id}]}),[d]),f=(0,r.useMemo)((()=>({anchor:l,placement:"left-start",offset:36,shift:!0})),[l]);return(0,i.jsx)(o.Dropdown,{contentClassName:"dataforms-layouts-panel__field-dropdown",popoverProps:f,focusOnMount:!0,toggleProps:{size:"compact",variant:"tertiary",tooltipPosition:"middle left"},renderToggle:({isOpen:l,onToggle:r})=>(0,i.jsx)(o.Button,{className:"dataforms-layouts-panel__field-control",size:"compact",variant:["none","top"].includes(t)?"link":"tertiary","aria-expanded":l,"aria-label":(0,e.sprintf)(
// translators: %s: Field name.
// translators: %s: Field name.
(0,e._x)("Edit %s","field"),c),onClick:r,children:(0,i.jsx)(n.render,{item:a})}),renderContent:({onClose:e})=>(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(v,{title:c,onClose:e}),(0,i.jsx)(y,{data:a,form:u,onChange:s,children:(e,n)=>{var l;return(0,i.jsx)(e,{data:a,field:n,onChange:s,hideLabelFromVision:(null!==(l=u?.fields)&&void 0!==l?l:[]).length<2},n.id)}})]})})}const C=[{type:"regular",component:function({data:e,field:n,onChange:l,hideLabelFromVision:t}){var a;const{fields:s}=(0,r.useContext)(c),d=(0,r.useMemo)((()=>g(n)?{fields:n.children.map((e=>"string"==typeof e?{id:e}:e)),type:"regular"}:{type:"regular",fields:[]}),[n]);if(g(n))return(0,i.jsxs)(i.Fragment,{children:[!t&&n.label&&(0,i.jsx)(_,{title:n.label}),(0,i.jsx)(y,{data:e,form:d,onChange:l})]});const u=null!==(a=n.labelPosition)&&void 0!==a?a:"top",f=s.find((e=>e.id===n.id));return f?"side"===u?(0,i.jsxs)(o.__experimentalHStack,{className:"dataforms-layouts-regular__field",children:[(0,i.jsx)("div",{className:"dataforms-layouts-regular__field-label",children:f.label}),(0,i.jsx)("div",{className:"dataforms-layouts-regular__field-control",children:(0,i.jsx)(f.Edit,{data:e,field:f,onChange:l,hideLabelFromVision:!0},f.id)})]}):(0,i.jsx)("div",{className:"dataforms-layouts-regular__field",children:(0,i.jsx)(f.Edit,{data:e,field:f,onChange:l,hideLabelFromVision:"none"===u||t})}):null}},{type:"panel",component:function({data:e,field:n,onChange:l}){var t;const{fields:a}=(0,r.useContext)(c),s=a.find((e=>{if(g(n)){const l=n.children.filter((e=>"string"==typeof e||!g(e))),i="string"==typeof l[0]?l[0]:l[0].id;return e.id===i}return e.id===n.id})),d=null!==(t=n.labelPosition)&&void 0!==t?t:"side",[u,f]=(0,r.useState)(null);if(!s)return null;const m=g(n)?n.label:s?.label;return"top"===d?(0,i.jsxs)(o.__experimentalVStack,{className:"dataforms-layouts-panel__field",spacing:0,children:[(0,i.jsx)("div",{className:"dataforms-layouts-panel__field-label",style:{paddingBottom:0},children:m}),(0,i.jsx)("div",{className:"dataforms-layouts-panel__field-control",children:(0,i.jsx)(j,{field:n,popoverAnchor:u,fieldDefinition:s,data:e,onChange:l,labelPosition:d})})]}):"none"===d?(0,i.jsx)("div",{className:"dataforms-layouts-panel__field",children:(0,i.jsx)(j,{field:n,popoverAnchor:u,fieldDefinition:s,data:e,onChange:l,labelPosition:d})}):(0,i.jsxs)(o.__experimentalHStack,{ref:f,className:"dataforms-layouts-panel__field",children:[(0,i.jsx)("div",{className:"dataforms-layouts-panel__field-label",children:m}),(0,i.jsx)("div",{className:"dataforms-layouts-panel__field-control",children:(0,i.jsx)(j,{field:n,popoverAnchor:u,fieldDefinition:s,data:e,onChange:l,labelPosition:d})})]})}}];function y({data:e,form:n,onChange:l,children:t}){const{fields:a}=(0,r.useContext)(c),s=(0,r.useMemo)((()=>function(e){var n,l,i;let t="regular";["regular","panel"].includes(null!==(n=e.type)&&void 0!==n?n:"")&&(t=e.type);const a=null!==(l=e.labelPosition)&&void 0!==l?l:"regular"===t?"top":"side";return(null!==(i=e.fields)&&void 0!==i?i:[]).map((e=>{var n,l;if("string"==typeof e)return{id:e,layout:t,labelPosition:a};const i=null!==(n=e.layout)&&void 0!==n?n:t,o=null!==(l=e.labelPosition)&&void 0!==l?l:"regular"===i?"top":"side";return{...e,layout:i,labelPosition:o}}))}(n)),[n]);return(0,i.jsx)(o.__experimentalVStack,{spacing:2,children:s.map((n=>{const o=(r=n.layout,C.find((e=>e.type===r)))?.component;var r;if(!o)return null;const s=g(n)?void 0:function(e){const n="string"==typeof e?e:e.id;return a.find((e=>e.id===n))}(n);return s&&s.isVisible&&!s.isVisible(e)?null:t?t(o,n):(0,i.jsx)(o,{data:e,field:n,onChange:l},n.id)}))})}function w({data:e,form:n,fields:l,onChange:t}){const a=(0,r.useMemo)((()=>function(e){return e.map((e=>{var n,l,i,t;const a="integer"===(o=e.type)?u:"text"===o?f:"datetime"===o?m:{sort:(e,n,l)=>"number"==typeof e&&"number"==typeof n?"asc"===l?e-n:n-e:"asc"===l?e.localeCompare(n):n.localeCompare(e),isValid:(e,n)=>{if(n?.elements){const l=n?.elements?.map((e=>e.value));if(!l.includes(e))return!1}return!0},Edit:()=>null};var o;const r=e.getValue||x(e.id),s=null!==(n=e.sort)&&void 0!==n?n:function(e,n,l){return a.sort(r({item:e}),r({item:n}),l)},d=null!==(l=e.isValid)&&void 0!==l?l:function(e,n){return a.isValid(r({item:e}),n)},c=function(e,n){return"function"==typeof e.Edit?e.Edit:"string"==typeof e.Edit?h(e.Edit):e.elements?h("select"):"string"==typeof n.Edit?h(n.Edit):n.Edit}(e,a),p=e.render||(e.elements?({item:n})=>{const l=r({item:n});return e?.elements?.find((e=>e.value===l))?.label||r({item:n})}:r);return{...e,label:e.label||e.id,header:e.header||e.label||e.id,getValue:r,render:p,sort:s,isValid:d,Edit:c,enableHiding:null===(i=e.enableHiding)||void 0===i||i,enableSorting:null===(t=e.enableSorting)||void 0===t||t}}))}(l)),[l]);return n.fields?(0,i.jsx)(d,{fields:a,children:(0,i.jsx)(y,{data:e,form:n,onChange:t})}):null}const V=JSON.parse('{"UU":"playground-step/import-wordpress-files","DD":"Import WordPress files"}');(0,n.registerBlockType)(V.UU,{icon:t,edit:function({attributes:n,setAttributes:l,isSelected:r}){const{wordPressFilesZip:s}=n,{url:d}=s;return(0,i.jsx)("div",{...(0,a.useBlockProps)(),children:(0,i.jsx)(o.Placeholder,{preview:(0,i.jsxs)(o.__experimentalVStack,{style:{width:"100%"},children:[(0,i.jsxs)(o.__experimentalHStack,{justify:"left",align:"center",spacing:3,children:[(0,i.jsx)(o.Icon,{icon:t,size:28,className:"step-icon"}),(0,i.jsxs)(o.__experimentalVStack,{spacing:1,children:[(0,i.jsx)(o.__experimentalText,{upperCase:!0,size:12,weight:500,color:"#949494",children:V.DD}),!r&&(0,i.jsx)(o.__experimentalText,{weight:600,children:(0,e.__)(`from ${d||"{zip url}"}`,"wp-playground-blueprint-editor")})]})]}),r&&(0,i.jsx)(w,{data:{url:d},fields:[{id:"url",label:(0,e.__)("Url","wp-playground-blueprint-editor"),type:"text",placeholder:(0,e.__)("Enter the URL of the zip file","wp-playground-blueprint-editor")}],form:{fields:["url"]},onChange:e=>{l({wordPressFilesZip:{...s,...e}})}})]})})})}})})();