"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFetch = void 0;

require("regenerator-runtime/runtime");

var _react = require("react");

var _devUtils = require("./dev-utils");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var createFetchError = function createFetchError(response) {
  var err = new Error("".concat(response.status, " ").concat(response.statusText));
  err.name = 'FetchError';
  return err;
};

var createPromiseResolver = function createPromiseResolver() {
  var resolve;
  var promise = new Promise(function (r) {
    resolve = r;
  });
  return {
    resolve: resolve,
    promise: promise
  };
};

var initialState = {};
var defaultOpts = {};

var defaultReadBody = function defaultReadBody(body) {
  return body.json();
};

var useFetch = function useFetch(input) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOpts;

  var _useState = (0, _react.useState)(initialState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var promiseResolver = (0, _react.useMemo)(createPromiseResolver, [input, opts]); // Using layout effect may not be ideal, but unless we run the effect
  // synchronously, Suspense fallback isn't rendered in Concurrent Mode.

  (0, _react.useLayoutEffect)(function () {
    if (process.env.NODE_ENV !== 'production') (0, _devUtils.checkInfiniteLoop)(input);

    var setStateSafe = function setStateSafe(s) {
      return setState(s);
    };

    var abortController = new AbortController();

    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _opts$readBody, readBody, init, response, body;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (input) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              // start fetching
              setStateSafe({
                loading: true
              });
              _context.prev = 3;
              _opts$readBody = opts.readBody, readBody = _opts$readBody === void 0 ? defaultReadBody : _opts$readBody, init = _objectWithoutProperties(opts, ["readBody"]);
              _context.next = 7;
              return fetch(input, _objectSpread({}, init, {
                signal: abortController.signal
              }));

            case 7:
              response = _context.sent;

              if (!response.ok) {
                _context.next = 15;
                break;
              }

              _context.next = 11;
              return readBody(response);

            case 11:
              body = _context.sent;
              setStateSafe({
                data: body
              });
              _context.next = 16;
              break;

            case 15:
              setStateSafe({
                error: createFetchError(response)
              });

            case 16:
              _context.next = 21;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](3);
              setStateSafe({
                error: _context.t0
              });

            case 21:
              // finish fetching
              promiseResolver.resolve();

            case 22:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 18]]);
    }))();

    var cleanup = function cleanup() {
      setStateSafe = function setStateSafe() {
        return null;
      }; // we should not setState after cleanup.


      abortController.abort();
      setState(initialState);
    };

    return cleanup;
  }, [input, opts, promiseResolver]);
  if (state.loading) throw promiseResolver.promise;
  return state;
};

exports.useFetch = useFetch;