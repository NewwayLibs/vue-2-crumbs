(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vue2Crumbs"] = factory();
	else
		root["Vue2Crumbs"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = {
  name: 'app-breadcrumbs',
  template: '\n    <ul\n      class="breadcrumbs-container"\n      v-if="$router"\n    >\n      <template v-if="parentRoutes.length">\n        <li\n  itemscope   itemtype="http://data-vocabulary.org/Breadcrumb"     class="parent-breadcrumb"\n          v-for="route in parentRoutes"\n          :key="route.id || route.label || route.name"\n        >\n          <router-link\n    itemprop="url"        :to="route.path"\n            exact\n          >\n         <span itemprop="title">{{ $t(route.label) || $t($_vue2Crumbs_getRouteLabel(route))}}</span>   \n          </router-link>\n        </li>\n      </template>\n\n      <li class="current-breadcrumb">\n        <a itemprop="title">\n          {{$t($_vue2Crumbs_getRouteLabel(currentRoute))}}\n        </a>\n      </li>\n    </ul>\n  ',
  data: function data() {
    return {
      parentsDynamicRoutes: [],
      parentHelper: ''
    };
  },

  computed: {
    currentRoute: function currentRoute() {
      // This check is just to make sure that '$forceUpdate' would work
      if (this.parentHelper || !this.parentHelper) {
        return this.$route;
      }
    },
    parentRoutes: function parentRoutes() {
      return this.parentsDynamicRoutes.length ? this.parentsDynamicRoutes : this.$_vue2Crumbs_addParentRoute(this.currentRoute);
    }
  },
  // TODO: Write docs for methods
  methods: {
    $_vue2Crumbs_getMatchedComponentBreadcrumb: function $_vue2Crumbs_getMatchedComponentBreadcrumb(route) {
      var matchedRouteRecord = route.matched[route.matched.length - 1];
      var matchedComponent = matchedRouteRecord.components.default;
      return matchedComponent.breadcrumb;
    },
    $_vue2Crumbs_getBreadcrumbLabel: function $_vue2Crumbs_getBreadcrumbLabel(breadcrumb) {
      if ((typeof breadcrumb === 'undefined' ? 'undefined' : _typeof(breadcrumb)) === 'object') {
        return breadcrumb.label;
      }
      if (typeof breadcrumb === 'string') {
        return breadcrumb;
      }
    },
    $_vue2Crumbs_getComponentLabel: function $_vue2Crumbs_getComponentLabel(route) {
      var componentBreadcrumb = this.$_vue2Crumbs_getMatchedComponentBreadcrumb(route);

      if (componentBreadcrumb) {
        if (typeof componentBreadcrumb !== 'function') {
          return this.$_vue2Crumbs_getBreadcrumbLabel(componentBreadcrumb);
        }

        return this.$_vue2Crumbs_getBreadcrumbLabel(route.meta.breadcrumb);
      }
    },

    // Function resolves a label of the provided route
    $_vue2Crumbs_getRouteLabel: function $_vue2Crumbs_getRouteLabel(route) {
      // Check is breadcrumb object exist in component
      var componentLabel = this.$_vue2Crumbs_getComponentLabel(route);
      if (componentLabel) {
        return componentLabel;
      }

      // Check is breadcrumb object exist in route meta
      if (route.meta.breadcrumb) {
        var metaLabel = this.$_vue2Crumbs_getBreadcrumbLabel(route.meta.breadcrumb);
        if (metaLabel) {
          return metaLabel;
        }
      }

      // By Default Return Route Name
      return route.name;
    },
    $_vue2Crumbs_isSameAsParent: function $_vue2Crumbs_isSameAsParent(route) {
      var parentRouteRecord = route.matched[route.matched.length - 2];
      var parentRoutePath = parentRouteRecord.path || '/';
      var parentRoute = this.$router.resolve({ path: parentRoutePath }).route;

      return route.path === parentRoute.path;
    },
    $_vue2Crumbs_getDefaultRouteParent: function $_vue2Crumbs_getDefaultRouteParent(route) {
      // TODO: add handler 'parent' property on route object
      var parentRouteRecord = void 0;
      var parentRoutePath = void 0;

      // If second matched route is not the same with current route, return it as next parent route
      if (!this.$_vue2Crumbs_isSameAsParent(route)) {
        parentRouteRecord = route.matched[route.matched.length - 2];
        if (parentRouteRecord) {
          var _parentRoutePath = parentRouteRecord.path || '/';
          return this.$router.resolve({ path: _parentRoutePath }).route;
        }

        // If second matched route is the same with current route, return route after next as parent
      } else {
        parentRouteRecord = route.matched[route.matched.length - 3];
        if (parentRouteRecord) {
          parentRoutePath = parentRouteRecord.path || '/';
          return this.$router.resolve({ path: parentRoutePath }).route;
        }
      }
    },
    $_vue2Crumbs_getComponentParents: function $_vue2Crumbs_getComponentParents(route) {
      var componentBreadcrumb = this.$_vue2Crumbs_getMatchedComponentBreadcrumb(route);

      if (componentBreadcrumb) {
        // If breadcrumb property isn't a function, return 'parents' property from it
        if (typeof componentBreadcrumb !== 'function') {
          if (componentBreadcrumb.parent) {
            return this.$router.resolve({ name: componentBreadcrumb.parent }).route;
          }
          return componentBreadcrumb.parentsList;
        }

        // If breadcrumb property is function, get parents from route meta (there plugin stores it)
        if (route.meta.breadcrumb) {
          var metaBreadcrumb = route.meta.breadcrumb;
          if (metaBreadcrumb.parent) {
            return this.$router.resolve({ name: metaBreadcrumb.parent }).route;
          }

          return metaBreadcrumb.parentsList;
        }
      }
    },

    // Function resolve a parent route if such exist
    $_vue2Crumbs_getParentRoute: function $_vue2Crumbs_getParentRoute(route) {
      // Check is component has breadcrumb object
      var parentsRoutes = this.$_vue2Crumbs_getComponentParents(route);
      if (parentsRoutes) {
        return parentsRoutes;
      }

      // If route meta have breadcrumb object and 'parent' propery inside it, get parent route from it
      if (route.meta.breadcrumb && route.meta.breadcrumb.parent) {
        return this.$router.resolve({ name: route.meta.breadcrumb.parent }).route;
      }

      // Return Default Route Parent (if sub-routing uses)
      if (route.matched && route.matched.length > 1) {
        return this.$_vue2Crumbs_getDefaultRouteParent(route);
      }
    },
    $_vue2Crumbs_addParentRoute: function $_vue2Crumbs_addParentRoute(route) {
      var parentRoute = this.$_vue2Crumbs_getParentRoute(route);

      // If parentRoute is Array, than it comes from 'parents' property in component's breadcrumb and needs to be handled properly
      if (Array.isArray(parentRoute)) {
        return parentRoute;

        // If parentRoute exist and isn't array, add it to parents routes array
      } else if (parentRoute) {
        return [].concat(this.$_vue2Crumbs_addParentRoute(parentRoute), parentRoute);
      }
      return [];
    }
  },
  watch: {
    '$route': function $route() {
      // Set back component 'parentsDynamicRoutes' property on each route change
      this.parentsDynamicRoutes = [];
    }
  },
  created: function created() {
    var _this = this;

    // Listen to the change of route breadcrumb object
    this.$_vue2Crumbs_eventBUS.$on('breadcrumbChanged', function () {
      var metaBreadcrumb = _this.$route.meta.breadcrumb;

      if (metaBreadcrumb.parentsList) {
        _this.parentsDynamicRoutes = metaBreadcrumb.parentsList.reverse();
      }
      if (metaBreadcrumb.parent) {
        _this.parentHelper = metaBreadcrumb.parent;
      }
      _this.$forceUpdate();
    });
  }
};

/***/ })
/******/ ]);
});