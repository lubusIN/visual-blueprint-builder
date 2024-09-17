/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/dataviews/build-module/components/dataform/index.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/components/dataform/index.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataForm)
/* harmony export */ });
/* harmony import */ var _dataforms_layouts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../dataforms-layouts */ "./node_modules/@wordpress/dataviews/build-module/dataforms-layouts/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Internal dependencies
 */



function DataForm({
  form,
  ...props
}) {
  var _form$type;
  const layout = (0,_dataforms_layouts__WEBPACK_IMPORTED_MODULE_1__.getFormLayout)((_form$type = form.type) !== null && _form$type !== void 0 ? _form$type : 'regular');
  if (!layout) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(layout.component, {
    form: form,
    ...props
  });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/datetime.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataform-controls/datetime.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DateTime)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */


function DateTime({
  data,
  field,
  onChange,
  hideLabelFromVision
}) {
  const {
    id,
    label
  } = field;
  const value = field.getValue({
    item: data
  });
  const onChangeControl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newValue => onChange({
    [id]: newValue
  }), [id, onChange]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("fieldset", {
    className: "dataviews-controls__datetime",
    children: [!hideLabelFromVision && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.BaseControl.VisualLabel, {
      as: "legend",
      children: label
    }), hideLabelFromVision && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.VisuallyHidden, {
      as: "legend",
      children: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TimePicker, {
      currentTime: value,
      onChange: onChangeControl,
      hideLabelFromVision: true
    })]
  });
}
//# sourceMappingURL=datetime.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataform-controls/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getControl: () => (/* binding */ getControl),
/* harmony export */   getControlByType: () => (/* binding */ getControlByType)
/* harmony export */ });
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datetime */ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/datetime.js");
/* harmony import */ var _integer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./integer */ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/integer.js");
/* harmony import */ var _radio__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./radio */ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/radio.js");
/* harmony import */ var _select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./select */ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/select.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./text */ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/text.js");
/**
 * External dependencies
 */

/**
 * Internal dependencies
 */






const FORM_CONTROLS = {
  datetime: _datetime__WEBPACK_IMPORTED_MODULE_0__["default"],
  integer: _integer__WEBPACK_IMPORTED_MODULE_1__["default"],
  radio: _radio__WEBPACK_IMPORTED_MODULE_2__["default"],
  select: _select__WEBPACK_IMPORTED_MODULE_3__["default"],
  text: _text__WEBPACK_IMPORTED_MODULE_4__["default"]
};
function getControl(field, fieldTypeDefinition) {
  if (typeof field.Edit === 'function') {
    return field.Edit;
  }
  if (typeof field.Edit === 'string') {
    return getControlByType(field.Edit);
  }
  if (field.elements) {
    return getControlByType('select');
  }
  if (typeof fieldTypeDefinition.Edit === 'string') {
    return getControlByType(fieldTypeDefinition.Edit);
  }
  return fieldTypeDefinition.Edit;
}
function getControlByType(type) {
  if (Object.keys(FORM_CONTROLS).includes(type)) {
    return FORM_CONTROLS[type];
  }
  throw 'Control ' + type + ' not found';
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/integer.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataform-controls/integer.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Integer)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

function Integer({
  data,
  field,
  onChange,
  hideLabelFromVision
}) {
  var _field$getValue;
  const {
    id,
    label,
    description
  } = field;
  const value = (_field$getValue = field.getValue({
    item: data
  })) !== null && _field$getValue !== void 0 ? _field$getValue : '';
  const onChangeControl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newValue => onChange({
    [id]: Number(newValue)
  }), [id, onChange]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalNumberControl, {
    label: label,
    help: description,
    value: value,
    onChange: onChangeControl,
    __next40pxDefaultSize: true,
    hideLabelFromVision: hideLabelFromVision
  });
}
//# sourceMappingURL=integer.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/radio.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataform-controls/radio.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Radio)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

function Radio({
  data,
  field,
  onChange,
  hideLabelFromVision
}) {
  const {
    id,
    label
  } = field;
  const value = field.getValue({
    item: data
  });
  const onChangeControl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newValue => onChange({
    [id]: newValue
  }), [id, onChange]);
  if (field.elements) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.RadioControl, {
      label: label,
      onChange: onChangeControl,
      options: field.elements,
      selected: value,
      hideLabelFromVision: hideLabelFromVision
    });
  }
  return null;
}
//# sourceMappingURL=radio.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/select.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataform-controls/select.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Select)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */

function Select({
  data,
  field,
  onChange,
  hideLabelFromVision
}) {
  var _field$getValue, _field$elements;
  const {
    id,
    label
  } = field;
  const value = (_field$getValue = field.getValue({
    item: data
  })) !== null && _field$getValue !== void 0 ? _field$getValue : '';
  const onChangeControl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newValue => onChange({
    [id]: newValue
  }), [id, onChange]);
  const elements = [
  /*
   * Value can be undefined when:
   *
   * - the field is not required
   * - in bulk editing
   *
   */
  {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Select item'),
    value: ''
  }, ...((_field$elements = field?.elements) !== null && _field$elements !== void 0 ? _field$elements : [])];
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
    label: label,
    value: value,
    options: elements,
    onChange: onChangeControl,
    __next40pxDefaultSize: true,
    __nextHasNoMarginBottom: true,
    hideLabelFromVision: hideLabelFromVision
  });
}
//# sourceMappingURL=select.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/text.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataform-controls/text.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Text)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

function Text({
  data,
  field,
  onChange,
  hideLabelFromVision
}) {
  const {
    id,
    label,
    placeholder
  } = field;
  const value = field.getValue({
    item: data
  });
  const onChangeControl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(newValue => onChange({
    [id]: newValue
  }), [id, onChange]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
    label: label,
    placeholder: placeholder,
    value: value !== null && value !== void 0 ? value : '',
    onChange: onChangeControl,
    __next40pxDefaultSize: true,
    __nextHasNoMarginBottom: true,
    hideLabelFromVision: hideLabelFromVision
  });
}
//# sourceMappingURL=text.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataforms-layouts/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataforms-layouts/index.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFormLayout: () => (/* binding */ getFormLayout)
/* harmony export */ });
/* harmony import */ var _regular__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regular */ "./node_modules/@wordpress/dataviews/build-module/dataforms-layouts/regular/index.js");
/* harmony import */ var _panel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panel */ "./node_modules/@wordpress/dataviews/build-module/dataforms-layouts/panel/index.js");
/**
 * Internal dependencies
 */


const FORM_LAYOUTS = [{
  type: 'regular',
  component: _regular__WEBPACK_IMPORTED_MODULE_0__["default"]
}, {
  type: 'panel',
  component: _panel__WEBPACK_IMPORTED_MODULE_1__["default"]
}];
function getFormLayout(type) {
  return FORM_LAYOUTS.find(layout => layout.type === type);
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataforms-layouts/panel/index.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataforms-layouts/panel/index.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormPanel)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close-small.js");
/* harmony import */ var _normalize_fields__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../normalize-fields */ "./node_modules/@wordpress/dataviews/build-module/normalize-fields.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */




function DropdownHeader({
  title,
  onClose
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalVStack, {
    className: "dataforms-layouts-panel__dropdown-header",
    spacing: 4,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHStack, {
      alignment: "center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHeading, {
        level: 2,
        size: 13,
        children: title
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalSpacer, {}), onClose && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        className: "dataforms-layouts-panel__dropdown-header-action",
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Close'),
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
        onClick: onClose
      })]
    })
  });
}
function FormField({
  data,
  field,
  onChange
}) {
  // Use internal state instead of a ref to make sure that the component
  // re-renders when the popover's anchor updates.
  const [popoverAnchor, setPopoverAnchor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
  // Memoize popoverProps to avoid returning a new object every time.
  const popoverProps = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    // Anchor the popover to the middle of the entire row so that it doesn't
    // move around when the label changes.
    anchor: popoverAnchor,
    placement: 'left-start',
    offset: 36,
    shift: true
  }), [popoverAnchor]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalHStack, {
    ref: setPopoverAnchor,
    className: "dataforms-layouts-panel__field",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "dataforms-layouts-panel__field-label",
      children: field.label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Dropdown, {
        contentClassName: "dataforms-layouts-panel__field-dropdown",
        popoverProps: popoverProps,
        focusOnMount: true,
        toggleProps: {
          size: 'compact',
          variant: 'tertiary',
          tooltipPosition: 'middle left'
        },
        renderToggle: ({
          isOpen,
          onToggle
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
          className: "dataforms-layouts-panel__field-control",
          size: "compact",
          variant: "tertiary",
          "aria-expanded": isOpen,
          "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(
          // translators: %s: Field name.
          (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Edit %s'), field.label),
          onClick: onToggle,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(field.render, {
            item: data
          })
        }),
        renderContent: ({
          onClose
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(DropdownHeader, {
            title: field.label,
            onClose: onClose
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(field.Edit, {
            data: data,
            field: field,
            onChange: onChange,
            hideLabelFromVision: true
          }, field.id)]
        })
      })
    })]
  });
}
function FormPanel({
  data,
  fields,
  form,
  onChange
}) {
  const visibleFields = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    var _form$fields;
    return (0,_normalize_fields__WEBPACK_IMPORTED_MODULE_5__.normalizeFields)(((_form$fields = form.fields) !== null && _form$fields !== void 0 ? _form$fields : []).map(fieldId => fields.find(({
      id
    }) => id === fieldId)).filter(field => !!field));
  }, [fields, form.fields]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalVStack, {
    spacing: 2,
    children: visibleFields.map(field => {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(FormField, {
        data: data,
        field: field,
        onChange: onChange
      }, field.id);
    })
  });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/dataforms-layouts/regular/index.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/dataforms-layouts/regular/index.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormRegular)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _normalize_fields__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../normalize-fields */ "./node_modules/@wordpress/dataviews/build-module/normalize-fields.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */


function FormRegular({
  data,
  fields,
  form,
  onChange
}) {
  const visibleFields = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    var _form$fields;
    return (0,_normalize_fields__WEBPACK_IMPORTED_MODULE_3__.normalizeFields)(((_form$fields = form.fields) !== null && _form$fields !== void 0 ? _form$fields : []).map(fieldId => fields.find(({
      id
    }) => id === fieldId)).filter(field => !!field));
  }, [fields, form.fields]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.__experimentalVStack, {
    spacing: 4,
    children: visibleFields.map(field => {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(field.Edit, {
        data: data,
        field: field,
        onChange: onChange
      }, field.id);
    })
  });
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/field-types/datetime.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/field-types/datetime.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Internal dependencies
 */

function sort(a, b, direction) {
  const timeA = new Date(a).getTime();
  const timeB = new Date(b).getTime();
  return direction === 'asc' ? timeA - timeB : timeB - timeA;
}
function isValid(value, context) {
  if (context?.elements) {
    const validValues = context?.elements.map(f => f.value);
    if (!validValues.includes(value)) {
      return false;
    }
  }
  return true;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  sort,
  isValid,
  Edit: 'datetime'
});
//# sourceMappingURL=datetime.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/field-types/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/field-types/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getFieldTypeDefinition)
/* harmony export */ });
/* harmony import */ var _integer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./integer */ "./node_modules/@wordpress/dataviews/build-module/field-types/integer.js");
/* harmony import */ var _text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./text */ "./node_modules/@wordpress/dataviews/build-module/field-types/text.js");
/* harmony import */ var _datetime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datetime */ "./node_modules/@wordpress/dataviews/build-module/field-types/datetime.js");
/**
 * Internal dependencies
 */





/**
 *
 * @param {FieldType} type The field type definition to get.
 *
 * @return A field type definition.
 */
function getFieldTypeDefinition(type) {
  if ('integer' === type) {
    return _integer__WEBPACK_IMPORTED_MODULE_0__["default"];
  }
  if ('text' === type) {
    return _text__WEBPACK_IMPORTED_MODULE_1__["default"];
  }
  if ('datetime' === type) {
    return _datetime__WEBPACK_IMPORTED_MODULE_2__["default"];
  }
  return {
    sort: (a, b, direction) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return direction === 'asc' ? a - b : b - a;
      }
      return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
    },
    isValid: (value, context) => {
      if (context?.elements) {
        const validValues = context?.elements?.map(f => f.value);
        if (!validValues.includes(value)) {
          return false;
        }
      }
      return true;
    },
    Edit: () => null
  };
}
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/field-types/integer.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/field-types/integer.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Internal dependencies
 */

function sort(a, b, direction) {
  return direction === 'asc' ? a - b : b - a;
}
function isValid(value, context) {
  // TODO: this implicitely means the value is required.
  if (value === '') {
    return false;
  }
  if (!Number.isInteger(Number(value))) {
    return false;
  }
  if (context?.elements) {
    const validValues = context?.elements.map(f => f.value);
    if (!validValues.includes(Number(value))) {
      return false;
    }
  }
  return true;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  sort,
  isValid,
  Edit: 'integer'
});
//# sourceMappingURL=integer.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/field-types/text.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/field-types/text.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Internal dependencies
 */

function sort(valueA, valueB, direction) {
  return direction === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
}
function isValid(value, context) {
  if (context?.elements) {
    const validValues = context?.elements?.map(f => f.value);
    if (!validValues.includes(value)) {
      return false;
    }
  }
  return true;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  sort,
  isValid,
  Edit: 'text'
});
//# sourceMappingURL=text.js.map

/***/ }),

/***/ "./node_modules/@wordpress/dataviews/build-module/normalize-fields.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@wordpress/dataviews/build-module/normalize-fields.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeFields: () => (/* binding */ normalizeFields)
/* harmony export */ });
/* harmony import */ var _field_types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./field-types */ "./node_modules/@wordpress/dataviews/build-module/field-types/index.js");
/* harmony import */ var _dataform_controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataform-controls */ "./node_modules/@wordpress/dataviews/build-module/dataform-controls/index.js");
/**
 * Internal dependencies
 */



/**
 * Apply default values and normalize the fields config.
 *
 * @param fields Fields config.
 * @return Normalized fields config.
 */
function normalizeFields(fields) {
  return fields.map(field => {
    var _field$sort, _field$isValid, _field$enableHiding, _field$enableSorting;
    const fieldTypeDefinition = (0,_field_types__WEBPACK_IMPORTED_MODULE_0__["default"])(field.type);
    const getValue = field.getValue || (({
      item
    }) => item[field.id]);
    const sort = (_field$sort = field.sort) !== null && _field$sort !== void 0 ? _field$sort : function sort(a, b, direction) {
      return fieldTypeDefinition.sort(getValue({
        item: a
      }), getValue({
        item: b
      }), direction);
    };
    const isValid = (_field$isValid = field.isValid) !== null && _field$isValid !== void 0 ? _field$isValid : function isValid(item, context) {
      return fieldTypeDefinition.isValid(getValue({
        item
      }), context);
    };
    const Edit = (0,_dataform_controls__WEBPACK_IMPORTED_MODULE_1__.getControl)(field, fieldTypeDefinition);
    const renderFromElements = ({
      item
    }) => {
      const value = getValue({
        item
      });
      return field?.elements?.find(element => element.value === value)?.label || getValue({
        item
      });
    };
    const render = field.render || (field.elements ? renderFromElements : getValue);
    return {
      ...field,
      label: field.label || field.id,
      header: field.header || field.label || field.id,
      getValue,
      render,
      sort,
      isValid,
      Edit,
      enableHiding: (_field$enableHiding = field.enableHiding) !== null && _field$enableHiding !== void 0 ? _field$enableHiding : true,
      enableSorting: (_field$enableSorting = field.enableSorting) !== null && _field$enableSorting !== void 0 ? _field$enableSorting : true
    };
  });
}
//# sourceMappingURL=normalize-fields.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/close-small.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/close-small.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const closeSmall = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (closeSmall);
//# sourceMappingURL=close-small.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/code.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/code.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const code = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M20.8 10.7l-4.3-4.3-1.1 1.1 4.3 4.3c.1.1.1.3 0 .4l-4.3 4.3 1.1 1.1 4.3-4.3c.7-.8.7-1.9 0-2.6zM4.2 11.8l4.3-4.3-1-1-4.3 4.3c-.7.7-.7 1.8 0 2.5l4.3 4.3 1.1-1.1-4.3-4.3c-.2-.1-.2-.3-.1-.4z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);
//# sourceMappingURL=code.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/copy.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/copy.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const copy = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 4.5h11a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5ZM3 5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm17 3v10.75c0 .69-.56 1.25-1.25 1.25H6v1.5h12.75a2.75 2.75 0 0 0 2.75-2.75V8H20Z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (copy);
//# sourceMappingURL=copy.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/download.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/download.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const download = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M18 11.3l-1-1.1-4 4V3h-1.5v11.3L7 10.2l-1 1.1 6.2 5.8 5.8-5.8zm.5 3.7v3.5h-13V15H4v5h16v-5h-1.5z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (download);
//# sourceMappingURL=download.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/globe.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/globe.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


const globe = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M12 3.3c-4.8 0-8.8 3.9-8.8 8.8 0 4.8 3.9 8.8 8.8 8.8 4.8 0 8.8-3.9 8.8-8.8s-4-8.8-8.8-8.8zm6.5 5.5h-2.6C15.4 7.3 14.8 6 14 5c2 .6 3.6 2 4.5 3.8zm.7 3.2c0 .6-.1 1.2-.2 1.8h-2.9c.1-.6.1-1.2.1-1.8s-.1-1.2-.1-1.8H19c.2.6.2 1.2.2 1.8zM12 18.7c-1-.7-1.8-1.9-2.3-3.5h4.6c-.5 1.6-1.3 2.9-2.3 3.5zm-2.6-4.9c-.1-.6-.1-1.1-.1-1.8 0-.6.1-1.2.1-1.8h5.2c.1.6.1 1.1.1 1.8s-.1 1.2-.1 1.8H9.4zM4.8 12c0-.6.1-1.2.2-1.8h2.9c-.1.6-.1 1.2-.1 1.8 0 .6.1 1.2.1 1.8H5c-.2-.6-.2-1.2-.2-1.8zM12 5.3c1 .7 1.8 1.9 2.3 3.5H9.7c.5-1.6 1.3-2.9 2.3-3.5zM10 5c-.8 1-1.4 2.3-1.8 3.8H5.5C6.4 7 8 5.6 10 5zM5.5 15.3h2.6c.4 1.5 1 2.8 1.8 3.7-1.8-.6-3.5-2-4.4-3.7zM14 19c.8-1 1.4-2.2 1.8-3.7h2.6C17.6 17 16 18.4 14 19z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (globe);
//# sourceMappingURL=globe.js.map

/***/ }),

/***/ "./src/editor/block-appender.js":
/*!**************************************!*\
  !*** ./src/editor/block-appender.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const {
  ButtonBlockAppender
} = wp.blockEditor;
const {
  useSelect
} = wp.data;
wp.hooks.addFilter('editor.BlockEdit', 'block-editor-for-playground-blueprint/default-block-appender', BlockEdit => props => {
  const lastBlockClientId = useSelect(select => {
    const blockOrder = select('core/block-editor').getBlockOrder();
    return blockOrder[blockOrder.length - 1]; // Get the last block's clientId
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(BlockEdit, {
      ...props
    }), props.clientId === lastBlockClientId && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: 'block-list-appender wp-block',
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(ButtonBlockAppender, {
        rootClientId: null // Since we don't have nested blocks
      })
    })]
  });
});

/***/ }),

/***/ "./src/editor/sidebar.js":
/*!*******************************!*\
  !*** ./src/editor/sidebar.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/globe.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/download.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/copy.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/code.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_blob__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/blob */ "@wordpress/blob");
/* harmony import */ var _wordpress_blob__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blob__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_dataviews__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/dataviews */ "./node_modules/@wordpress/dataviews/build-module/components/dataform/index.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
/**
 * WordPress dependencies.
 */











/**
 * PHP and WordPress version options for dropdowns.
 */

const PHP_VERSIONS = [{
  label: 'Latest',
  value: 'latest'
}, {
  label: '8.3',
  value: '8.3'
}, {
  label: '8.2',
  value: '8.2'
}, {
  label: '8.1',
  value: '8.1'
}, {
  label: '8.0',
  value: '8.0'
}, {
  label: '7.4',
  value: '7.4'
}, {
  label: '7.3',
  value: '7.3'
}, {
  label: '7.2',
  value: '7.2'
}, {
  label: '7.1',
  value: '7.1'
}, {
  label: '7.0',
  value: '7.0'
}];
const WP_VERSIONS = [{
  label: 'Wordpress nightly',
  value: 'nightly'
}, {
  label: '6.6',
  value: '6.1'
}, {
  label: '6.5',
  value: '6.1'
}, {
  label: '6.4',
  value: '6.2'
}, {
  label: '6.3',
  value: '6.1'
}];

/**
 * Main component for displaying blueprint sidebar setting.
 */
function BlueprintSidebarSettings() {
  const {
    createNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_4__.store);
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('core/editor');
  const blocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => select('core/block-editor').getBlocks(), []);
  const blueprint_config = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return select('core/editor').getEditedPostAttribute('meta')['_blueprint_config'] || {};
  });
  const playgroundBase = "https://playground.wordpress.net/#";
  const playgroundBuilderBase = "https://playground.wordpress.net/builder/builder.html#";
  const schema = {
    $schema: "https://playground.wordpress.net/blueprint-schema.json",
    landingPage: blueprint_config.landing_page,
    preferredVersions: {
      php: blueprint_config.php_version,
      wp: blueprint_config.wp_version
    },
    phpExtensionBundles: [blueprint_config.php_extension_bundles],
    features: {
      networking: blueprint_config.networking
    },
    steps: []
  };

  // Function to prepare the schema
  const prepareSchema = () => {
    const blockAttributes = blocks.map(block => {
      delete block.attributes.metadata;
      return block.attributes;
    });
    schema.steps = [...blockAttributes];
    return JSON.stringify(schema, null, 2);
  };
  const handleDownload = () => {
    const preparedSchema = prepareSchema();
    if (preparedSchema) {
      (0,_wordpress_blob__WEBPACK_IMPORTED_MODULE_6__.downloadBlob)('playground-blueprint.json', preparedSchema, 'application/json');
      createNotice('success', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Blueprint downloaded generated!'), {
        type: 'snackbar'
      });
    }
  };
  const handleCopy = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.useCopyToClipboard)(prepareSchema, () => {
    createNotice('success', (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Blueprint Schema Copied!'), {
      type: 'snackbar'
    });
  });
  const handleBlueprintConfig = value => {
    editPost({
      meta: {
        _blueprint_config: {
          ...blueprint_config,
          ...value
        }
      }
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_2__.PluginPostStatusInfo, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.Toolbar, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ToolbarButton, {
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"],
          label: "Open in playground",
          href: playgroundBase + prepareSchema(),
          target: "_blank"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ToolbarButton, {
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"],
          label: "Download JSON",
          onClick: handleDownload
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ToolbarButton, {
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"],
          label: "Copy JSON",
          ref: handleCopy
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_7__.ToolbarButton, {
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__["default"],
          label: "Open in Builder",
          href: playgroundBuilderBase + prepareSchema(),
          target: "_blank"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_2__.PluginDocumentSettingPanel, {
      name: "playground-settings",
      title: "Playground Settings",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_13__["default"], {
        data: {
          php_version: blueprint_config.php_version,
          wp_version: blueprint_config.wp_version,
          landing_page: blueprint_config.landing_page,
          php_extension_bundles: blueprint_config.php_extension_bundles,
          networking: blueprint_config.networking
        },
        fields: [{
          elements: PHP_VERSIONS,
          id: 'php_version',
          label: 'PHP Version',
          type: 'text'
        }, {
          elements: WP_VERSIONS,
          id: 'wp_version',
          label: 'WP Version',
          type: 'text'
        }, {
          id: 'landing_page',
          label: 'Landing Page',
          type: 'text'
        }, {
          id: 'php_extension_bundles',
          label: 'PHP Extension Bundles',
          type: 'text',
          elements: [{
            label: 'Kitchen Sink',
            value: 'kitchen-sink'
          }, {
            label: 'Light',
            value: 'light'
          }]
        }, {
          id: 'networking',
          label: 'Networking',
          type: 'text',
          elements: [{
            label: 'Enabled',
            value: true
          }, {
            label: 'Disabled',
            value: false
          }]
        }],
        form: {
          fields: ['php_version', 'wp_version', 'landing_page', 'php_extension_bundles', 'networking']
        },
        onChange: handleBlueprintConfig
      })
    })]
  });
}
;

/**
 * Registers the 'blueprint-version-control' plugin.
 */
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__.registerPlugin)('blueprint-version-control', {
  render: BlueprintSidebarSettings
});

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/blob":
/*!******************************!*\
  !*** external ["wp","blob"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["blob"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/editor":
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["editor"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/notices":
/*!*********************************!*\
  !*** external ["wp","notices"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["notices"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*****************************!*\
  !*** ./src/editor/index.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block_appender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block-appender */ "./src/editor/block-appender.js");
/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidebar */ "./src/editor/sidebar.js");


/******/ })()
;
//# sourceMappingURL=editor.js.map