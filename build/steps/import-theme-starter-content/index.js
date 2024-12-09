(()=>{"use strict";const e=window.wp.blocks,n=window.wp.primitives,t=window.ReactJSXRuntime,l=(0,t.jsx)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,t.jsx)(n.Path,{fillRule:"evenodd",d:"M16.83 6.342l.602.3.625-.25.443-.176v12.569l-.443-.178-.625-.25-.603.301-1.444.723-2.41-.804-.475-.158-.474.158-2.41.803-1.445-.722-.603-.3-.625.25-.443.177V6.215l.443.178.625.25.603-.301 1.444-.722 2.41.803.475.158.474-.158 2.41-.803 1.445.722zM20 4l-1.5.6-1 .4-2-1-3 1-3-1-2 1-1-.4L5 4v17l1.5-.6 1-.4 2 1 3-1 3 1 2-1 1 .4 1.5.6V4zm-3.5 6.25v-1.5h-8v1.5h8zm0 3v-1.5h-8v1.5h8zm-8 3v-1.5h8v1.5h-8z",clipRule:"evenodd"})}),i=JSON.parse('{"UU":"playground-step/import-theme-starter-content","DD":"Import theme starter content"}'),a=window.wp.i18n,o=window.wp.blockEditor,r=window.wp.components,s=window.wp.element,d=(0,s.createContext)({fields:[]});function c({fields:e,children:n}){return(0,t.jsx)(d.Provider,{value:{fields:e},children:n})}const u=d,m={sort:function(e,n,t){return"asc"===t?e-n:n-e},isValid:function(e,n){if(""===e)return!1;if(!Number.isInteger(Number(e)))return!1;if(n?.elements){const t=n?.elements.map((e=>e.value));if(!t.includes(Number(e)))return!1}return!0},Edit:"integer"},f={sort:function(e,n,t){return"asc"===t?e.localeCompare(n):n.localeCompare(e)},isValid:function(e,n){if(n?.elements){const t=n?.elements?.map((e=>e.value));if(!t.includes(e))return!1}return!0},Edit:"text"},p={sort:function(e,n,t){const l=new Date(e).getTime(),i=new Date(n).getTime();return"asc"===t?l-i:i-l},isValid:function(e,n){if(n?.elements){const t=n?.elements.map((e=>e.value));if(!t.includes(e))return!1}return!0},Edit:"datetime"},h={datetime:function({data:e,field:n,onChange:l,hideLabelFromVision:i}){const{id:a,label:o}=n,d=n.getValue({item:e}),c=(0,s.useCallback)((e=>l({[a]:e})),[a,l]);return(0,t.jsxs)("fieldset",{className:"dataviews-controls__datetime",children:[!i&&(0,t.jsx)(r.BaseControl.VisualLabel,{as:"legend",children:o}),i&&(0,t.jsx)(r.VisuallyHidden,{as:"legend",children:o}),(0,t.jsx)(r.TimePicker,{currentTime:d,onChange:c,hideLabelFromVision:!0})]})},integer:function({data:e,field:n,onChange:l,hideLabelFromVision:i}){var a;const{id:o,label:d,description:c}=n,u=null!==(a=n.getValue({item:e}))&&void 0!==a?a:"",m=(0,s.useCallback)((e=>l({[o]:Number(e)})),[o,l]);return(0,t.jsx)(r.__experimentalNumberControl,{label:d,help:c,value:u,onChange:m,__next40pxDefaultSize:!0,hideLabelFromVision:i})},radio:function({data:e,field:n,onChange:l,hideLabelFromVision:i}){const{id:a,label:o}=n,d=n.getValue({item:e}),c=(0,s.useCallback)((e=>l({[a]:e})),[a,l]);return n.elements?(0,t.jsx)(r.RadioControl,{label:o,onChange:c,options:n.elements,selected:d,hideLabelFromVision:i}):null},select:function({data:e,field:n,onChange:l,hideLabelFromVision:i}){var o,d;const{id:c,label:u}=n,m=null!==(o=n.getValue({item:e}))&&void 0!==o?o:"",f=(0,s.useCallback)((e=>l({[c]:e})),[c,l]),p=[{label:(0,a.__)("Select item"),value:""},...null!==(d=n?.elements)&&void 0!==d?d:[]];return(0,t.jsx)(r.SelectControl,{label:u,value:m,options:p,onChange:f,__next40pxDefaultSize:!0,__nextHasNoMarginBottom:!0,hideLabelFromVision:i})},text:function({data:e,field:n,onChange:l,hideLabelFromVision:i}){const{id:a,label:o,placeholder:d}=n,c=n.getValue({item:e}),u=(0,s.useCallback)((e=>l({[a]:e})),[a,l]);return(0,t.jsx)(r.TextControl,{label:o,placeholder:d,value:null!=c?c:"",onChange:u,__next40pxDefaultSize:!0,__nextHasNoMarginBottom:!0,hideLabelFromVision:i})}};function x(e){if(Object.keys(h).includes(e))return h[e];throw"Control "+e+" not found"}const g=e=>({item:n})=>{const t=e.split(".");let l=n;for(const e of t)l=l.hasOwnProperty(e)?l[e]:void 0;return l};function _(e){return void 0!==e.children}function b({title:e}){return(0,t.jsx)(r.__experimentalVStack,{className:"dataforms-layouts-regular__header",spacing:4,children:(0,t.jsxs)(r.__experimentalHStack,{alignment:"center",children:[(0,t.jsx)(r.__experimentalHeading,{level:2,size:13,children:e}),(0,t.jsx)(r.__experimentalSpacer,{})]})})}const v=(0,t.jsx)(n.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,t.jsx)(n.Path,{d:"M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"})});function j({title:e,onClose:n}){return(0,t.jsx)(r.__experimentalVStack,{className:"dataforms-layouts-panel__dropdown-header",spacing:4,children:(0,t.jsxs)(r.__experimentalHStack,{alignment:"center",children:[e&&(0,t.jsx)(r.__experimentalHeading,{level:2,size:13,children:e}),(0,t.jsx)(r.__experimentalSpacer,{}),n&&(0,t.jsx)(r.Button,{label:(0,a.__)("Close"),icon:v,onClick:n,size:"small"})]})})}function C({fieldDefinition:e,popoverAnchor:n,labelPosition:l="side",data:i,onChange:o,field:d}){const c=_(d)?d.label:e?.label,u=(0,s.useMemo)((()=>_(d)?{type:"regular",fields:d.children.map((e=>"string"==typeof e?{id:e}:e))}:{type:"regular",fields:[{id:d.id}]}),[d]),m=(0,s.useMemo)((()=>({anchor:n,placement:"left-start",offset:36,shift:!0})),[n]);return(0,t.jsx)(r.Dropdown,{contentClassName:"dataforms-layouts-panel__field-dropdown",popoverProps:m,focusOnMount:!0,toggleProps:{size:"compact",variant:"tertiary",tooltipPosition:"middle left"},renderToggle:({isOpen:n,onToggle:o})=>(0,t.jsx)(r.Button,{className:"dataforms-layouts-panel__field-control",size:"compact",variant:["none","top"].includes(l)?"link":"tertiary","aria-expanded":n,"aria-label":(0,a.sprintf)(
// translators: %s: Field name.
// translators: %s: Field name.
(0,a._x)("Edit %s","field"),c),onClick:o,children:(0,t.jsx)(e.render,{item:i})}),renderContent:({onClose:e})=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(j,{title:c,onClose:e}),(0,t.jsx)(w,{data:i,form:u,onChange:o,children:(e,n)=>{var l;return(0,t.jsx)(e,{data:i,field:n,onChange:o,hideLabelFromVision:(null!==(l=u?.fields)&&void 0!==l?l:[]).length<2},n.id)}})]})})}const y=[{type:"regular",component:function({data:e,field:n,onChange:l,hideLabelFromVision:i}){var a;const{fields:o}=(0,s.useContext)(u),d=(0,s.useMemo)((()=>_(n)?{fields:n.children.map((e=>"string"==typeof e?{id:e}:e)),type:"regular"}:{type:"regular",fields:[]}),[n]);if(_(n))return(0,t.jsxs)(t.Fragment,{children:[!i&&n.label&&(0,t.jsx)(b,{title:n.label}),(0,t.jsx)(w,{data:e,form:d,onChange:l})]});const c=null!==(a=n.labelPosition)&&void 0!==a?a:"top",m=o.find((e=>e.id===n.id));return m?"side"===c?(0,t.jsxs)(r.__experimentalHStack,{className:"dataforms-layouts-regular__field",children:[(0,t.jsx)("div",{className:"dataforms-layouts-regular__field-label",children:m.label}),(0,t.jsx)("div",{className:"dataforms-layouts-regular__field-control",children:(0,t.jsx)(m.Edit,{data:e,field:m,onChange:l,hideLabelFromVision:!0},m.id)})]}):(0,t.jsx)("div",{className:"dataforms-layouts-regular__field",children:(0,t.jsx)(m.Edit,{data:e,field:m,onChange:l,hideLabelFromVision:"none"===c||i})}):null}},{type:"panel",component:function({data:e,field:n,onChange:l}){var i;const{fields:a}=(0,s.useContext)(u),o=a.find((e=>{if(_(n)){const t=n.children.filter((e=>"string"==typeof e||!_(e))),l="string"==typeof t[0]?t[0]:t[0].id;return e.id===l}return e.id===n.id})),d=null!==(i=n.labelPosition)&&void 0!==i?i:"side",[c,m]=(0,s.useState)(null);if(!o)return null;const f=_(n)?n.label:o?.label;return"top"===d?(0,t.jsxs)(r.__experimentalVStack,{className:"dataforms-layouts-panel__field",spacing:0,children:[(0,t.jsx)("div",{className:"dataforms-layouts-panel__field-label",style:{paddingBottom:0},children:f}),(0,t.jsx)("div",{className:"dataforms-layouts-panel__field-control",children:(0,t.jsx)(C,{field:n,popoverAnchor:c,fieldDefinition:o,data:e,onChange:l,labelPosition:d})})]}):"none"===d?(0,t.jsx)("div",{className:"dataforms-layouts-panel__field",children:(0,t.jsx)(C,{field:n,popoverAnchor:c,fieldDefinition:o,data:e,onChange:l,labelPosition:d})}):(0,t.jsxs)(r.__experimentalHStack,{ref:m,className:"dataforms-layouts-panel__field",children:[(0,t.jsx)("div",{className:"dataforms-layouts-panel__field-label",children:f}),(0,t.jsx)("div",{className:"dataforms-layouts-panel__field-control",children:(0,t.jsx)(C,{field:n,popoverAnchor:c,fieldDefinition:o,data:e,onChange:l,labelPosition:d})})]})}}];function w({data:e,form:n,onChange:l,children:i}){const{fields:a}=(0,s.useContext)(u),o=(0,s.useMemo)((()=>function(e){var n,t,l;let i="regular";["regular","panel"].includes(null!==(n=e.type)&&void 0!==n?n:"")&&(i=e.type);const a=null!==(t=e.labelPosition)&&void 0!==t?t:"regular"===i?"top":"side";return(null!==(l=e.fields)&&void 0!==l?l:[]).map((e=>{var n,t;if("string"==typeof e)return{id:e,layout:i,labelPosition:a};const l=null!==(n=e.layout)&&void 0!==n?n:i,o=null!==(t=e.labelPosition)&&void 0!==t?t:"regular"===l?"top":"side";return{...e,layout:l,labelPosition:o}}))}(n)),[n]);return(0,t.jsx)(r.__experimentalVStack,{spacing:2,children:o.map((n=>{const o=(r=n.layout,y.find((e=>e.type===r)))?.component;var r;if(!o)return null;const s=_(n)?void 0:function(e){const n="string"==typeof e?e:e.id;return a.find((e=>e.id===n))}(n);return s&&s.isVisible&&!s.isVisible(e)?null:i?i(o,n):(0,t.jsx)(o,{data:e,field:n,onChange:l},n.id)}))})}function V({data:e,form:n,fields:l,onChange:i}){const a=(0,s.useMemo)((()=>function(e){return e.map((e=>{var n,t,l,i;const a="integer"===(o=e.type)?m:"text"===o?f:"datetime"===o?p:{sort:(e,n,t)=>"number"==typeof e&&"number"==typeof n?"asc"===t?e-n:n-e:"asc"===t?e.localeCompare(n):n.localeCompare(e),isValid:(e,n)=>{if(n?.elements){const t=n?.elements?.map((e=>e.value));if(!t.includes(e))return!1}return!0},Edit:()=>null};var o;const r=e.getValue||g(e.id),s=null!==(n=e.sort)&&void 0!==n?n:function(e,n,t){return a.sort(r({item:e}),r({item:n}),t)},d=null!==(t=e.isValid)&&void 0!==t?t:function(e,n){return a.isValid(r({item:e}),n)},c=function(e,n){return"function"==typeof e.Edit?e.Edit:"string"==typeof e.Edit?x(e.Edit):e.elements?x("select"):"string"==typeof n.Edit?x(n.Edit):n.Edit}(e,a),u=e.render||(e.elements?({item:n})=>{const t=r({item:n});return e?.elements?.find((e=>e.value===t))?.label||r({item:n})}:r);return{...e,label:e.label||e.id,header:e.header||e.label||e.id,getValue:r,render:u,sort:s,isValid:d,Edit:c,enableHiding:null===(l=e.enableHiding)||void 0===l||l,enableSorting:null===(i=e.enableSorting)||void 0===i||i}}))}(l)),[l]);return n.fields?(0,t.jsx)(c,{fields:a,children:(0,t.jsx)(w,{data:e,form:n,onChange:i})}):null}(0,e.registerBlockType)(i.UU,{icon:l,edit:function({attributes:e,setAttributes:n,isSelected:a}){const{themeSlug:s}=e;return(0,t.jsx)("p",{...(0,o.useBlockProps)(),children:(0,t.jsx)(r.Placeholder,{preview:(0,t.jsxs)(r.__experimentalVStack,{style:{width:"100%"},children:[(0,t.jsxs)(r.__experimentalHStack,{justify:"left",align:"center",spacing:3,children:[(0,t.jsx)(r.Icon,{icon:l,size:28,className:"step-icon"}),(0,t.jsxs)(r.__experimentalVStack,{spacing:1,children:[(0,t.jsx)(r.__experimentalText,{upperCase:!0,size:12,weight:500,color:"#949494",children:i.DD}),!a&&(0,t.jsx)(r.__experimentalText,{weight:600,children:`for ${s||"{THEME SLUG}"}`})]})]}),a&&(0,t.jsx)(V,{data:e,fields:[{id:"themeSlug",label:"Theme Slug",type:"text",placeholder:"e.g., twentytwentyfour"}],form:{fields:["themeSlug"]},onChange:n})]})})})}})})();