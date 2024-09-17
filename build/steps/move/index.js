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

/***/ "./node_modules/@wordpress/icons/build-module/library/move-to.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/move-to.js ***!
  \***********************************************************************/
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


const moveTo = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, {
    d: "M19.75 9c0-1.257-.565-2.197-1.39-2.858-.797-.64-1.827-1.017-2.815-1.247-1.802-.42-3.703-.403-4.383-.396L11 4.5V6l.177-.001c.696-.006 2.416-.02 4.028.356.887.207 1.67.518 2.216.957.52.416.829.945.829 1.688 0 .592-.167.966-.407 1.23-.255.281-.656.508-1.236.674-1.19.34-2.82.346-4.607.346h-.077c-1.692 0-3.527 0-4.942.404-.732.209-1.424.545-1.935 1.108-.526.579-.796 1.33-.796 2.238 0 1.257.565 2.197 1.39 2.858.797.64 1.827 1.017 2.815 1.247 1.802.42 3.703.403 4.383.396L13 19.5h.714V22L18 18.5 13.714 15v3H13l-.177.001c-.696.006-2.416.02-4.028-.356-.887-.207-1.67-.518-2.216-.957-.52-.416-.829-.945-.829-1.688 0-.592.167-.966.407-1.23.255-.281.656-.508 1.237-.674 1.189-.34 2.819-.346 4.606-.346h.077c1.692 0 3.527 0 4.941-.404.732-.209 1.425-.545 1.936-1.108.526-.579.796-1.33.796-2.238z"
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (moveTo);
//# sourceMappingURL=move-to.js.map

/***/ }),

/***/ "./src/steps/move/edit.js":
/*!********************************!*\
  !*** ./src/steps/move/edit.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/move-to.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_dataviews__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/dataviews */ "./node_modules/@wordpress/dataviews/build-module/components/dataform/index.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./editor.scss */ "./src/steps/move/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Wordpress dependencies.
 */






/**
 * Internal dependencies.
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @return {Element} Element to render.
 */

function Edit({
  attributes,
  setAttributes,
  isSelected
}) {
  const {
    fromPath,
    toPath
  } = attributes;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)(),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Placeholder, {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
      label: "Move File or Directory",
      instructions: !isSelected && `from ${fromPath || '{from path}'} to ${toPath || '{to path}'}`,
      children: isSelected && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalVStack, {
        style: {
          width: '100%'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_dataviews__WEBPACK_IMPORTED_MODULE_6__["default"], {
          data: attributes,
          fields: [{
            id: 'fromPath',
            label: 'From Path',
            type: 'text',
            placeholder: 'Enter the current path of the file or directory'
          }, {
            id: 'toPath',
            label: 'To Path',
            type: 'text',
            placeholder: 'Enter the new path where the file or directory should be moved'
          }],
          form: {
            fields: ['fromPath', 'toPath']
          },
          onChange: setAttributes
        })
      })
    })
  });
}

/***/ }),

/***/ "./src/steps/move/editor.scss":
/*!************************************!*\
  !*** ./src/steps/move/editor.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

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

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "./src/steps/move/block.json":
/*!***********************************!*\
  !*** ./src/steps/move/block.json ***!
  \***********************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"lubus/move","version":"0.1.0","title":"Move File/Dir","category":"file-system","description":"Moves a file or directory from one path to another.","example":{},"supports":{"html":false,"customClassName":false},"attributes":{"step":{"type":"string","default":"mv"},"fromPath":{"type":"string","default":""},"toPath":{"type":"string","default":""}},"textdomain":"move","editorScript":"file:./index.js","editorStyle":"file:./index.css"}');

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
/*!*********************************!*\
  !*** ./src/steps/move/index.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/move-to.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/steps/move/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/steps/move/edit.js");
/**
 * Wordpress dependencies.
 */



/**
 * Internal dependencies.
 */



/**
 * Every block starts by registering a new block type definition.
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__.name, {
  icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"],
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]
});
/******/ })()
;
//# sourceMappingURL=index.js.map