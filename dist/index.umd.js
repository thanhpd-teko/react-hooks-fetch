!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react"),require("react-suspense-fetch")):"function"==typeof define&&define.amd?define(["exports","react","react-suspense-fetch"],t):t((e=e||self).reactHooksFetch={},e.react,e.reactSuspenseFetch)}(this,(function(e,t,r){e.ErrorBoundary=function(e){var t,r;function n(){var t;return(t=e.apply(this,arguments)||this).state={error:null},t.retry=function(){t.setState({error:null})},t}return r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,n.getDerivedStateFromError=function(e){return{error:e}},n.prototype.render=function(){var e=this.state.error,t=this.props,r=t.children,n=t.fallback;return e?"function"==typeof n?n(e,this.retry):n:r},n}(t.Component),e.createUseFetch=function(e,n){var o=r.prefetch(e,n);return function(){var n=t.useState(o),c=n[1];return{result:n[0],refetch:t.useCallback((function(t){c(r.prefetch(e,t))}),[])}}},e.createUseFetchWithoutPrefetch=function(e){return function(){var n=t.useState(null),o=n[1];return{result:n[0],refetch:t.useCallback((function(t){o(r.prefetch(e,t))}),[])}}}}));
//# sourceMappingURL=index.umd.js.map