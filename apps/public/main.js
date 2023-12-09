(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // ../router.js
  var require_router = __commonJS({
    "../router.js"(exports, module) {
      function router() {
        let len = arguments.length - 1;
        let callback = arguments[len];
        let routes = arguments[0];
        let e404 = `404 - PAGE NOT FOUND`;
        if (len === 2)
          e404 = arguments[1];
        let curr;
        addEventListener("popstate", route2);
        addEventListener("pushstate", route2);
        document.body.addEventListener("click", (ev) => {
          let href = ev.target.getAttribute("href");
          if (!href)
            return;
          ev.preventDefault();
          route2(href);
        });
        route2();
        function route2(x, replace) {
          if (curr === x)
            return;
          if (typeof x !== "string")
            x = location.pathname;
          history.pushState(x, null, x);
          let params = {};
          let query = x.includes("?");
          if (query) {
            query = x.replace(/.*\?/, "").replace(/\=\=/g, "=").replace(/\&\&/g, "&").split("&");
            query.map((q) => {
              params[q.split("=")[0]] = q.split("=")[1];
            });
          }
          console.log("token:", query);
          let match = routes.filter((route3) => {
            let path = route3.path;
            let keys = path.match(/\/:\w+/g);
            let re = new RegExp(path.replace(keys?.join(""), "(.*)"));
            let matched = location.pathname.match(re);
            let isMatch = matched && matched[0] === matched.input;
            if (isMatch) {
              let values = matched[1]?.split("/").slice(1);
              if (values && keys) {
                keys = keys?.join("").split("/:").slice(1);
                for (let i = 0; i < values.length; i++) {
                  if (i < keys.length)
                    params[keys[i]] = values[i];
                  else
                    params[i] = values[i];
                }
              }
            }
            return isMatch;
          });
          match = match[match.length - 1];
          if (match) {
            callback({ page: match.page, params });
          } else {
            if (typeof e404 === "string")
              console.log(e404);
            else
              callback({ page: e404, params });
          }
          curr = location.pathname;
        }
        return {
          route: route2,
          listen() {
            route2(location.pathname + location.search);
          },
          unlisten() {
            removeEventListener("popstate", route2);
            removeEventListener("pushstate", route2);
            routes = [];
          }
        };
      }
      module.exports = router;
    }
  });

  // ../node_modules/svelte/src/runtime/internal/utils.js
  function noop() {
  }
  var identity = (x) => x;
  function assign(tar, src) {
    for (const k in src)
      tar[k] = src[k];
    return (
      /** @type {T & S} */
      tar
    );
  }
  function run(fn) {
    return fn();
  }
  function blank_object() {
    return /* @__PURE__ */ Object.create(null);
  }
  function run_all(fns) {
    fns.forEach(run);
  }
  function is_function(thing) {
    return typeof thing === "function";
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
  }
  function is_empty(obj) {
    return Object.keys(obj).length === 0;
  }
  function subscribe(store, ...callbacks) {
    if (store == null) {
      for (const callback of callbacks) {
        callback(void 0);
      }
      return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
  }
  function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
  }
  function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
      const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
      return definition[0](slot_ctx);
    }
  }
  function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
  }
  function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
      const lets = definition[2](fn(dirty));
      if ($$scope.dirty === void 0) {
        return lets;
      }
      if (typeof lets === "object") {
        const merged = [];
        const len = Math.max($$scope.dirty.length, lets.length);
        for (let i = 0; i < len; i += 1) {
          merged[i] = $$scope.dirty[i] | lets[i];
        }
        return merged;
      }
      return $$scope.dirty | lets;
    }
    return $$scope.dirty;
  }
  function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
    if (slot_changes) {
      const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
      slot.p(slot_context, slot_changes);
    }
  }
  function get_all_dirty_from_scope($$scope) {
    if ($$scope.ctx.length > 32) {
      const dirty = [];
      const length = $$scope.ctx.length / 32;
      for (let i = 0; i < length; i++) {
        dirty[i] = -1;
      }
      return dirty;
    }
    return -1;
  }
  function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
      if (k[0] !== "$")
        result[k] = props[k];
    return result;
  }
  function set_store_value(store, ret, value) {
    store.set(value);
    return ret;
  }
  function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
  }

  // ../node_modules/svelte/src/runtime/internal/environment.js
  var is_client = typeof window !== "undefined";
  var now = is_client ? () => window.performance.now() : () => Date.now();
  var raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;

  // ../node_modules/svelte/src/runtime/internal/loop.js
  var tasks = /* @__PURE__ */ new Set();
  function run_tasks(now2) {
    tasks.forEach((task) => {
      if (!task.c(now2)) {
        tasks.delete(task);
        task.f();
      }
    });
    if (tasks.size !== 0)
      raf(run_tasks);
  }
  function loop(callback) {
    let task;
    if (tasks.size === 0)
      raf(run_tasks);
    return {
      promise: new Promise((fulfill) => {
        tasks.add(task = { c: callback, f: fulfill });
      }),
      abort() {
        tasks.delete(task);
      }
    };
  }

  // ../node_modules/svelte/src/runtime/internal/globals.js
  var globals = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : (
    // @ts-ignore Node typings have this
    global
  );

  // ../node_modules/svelte/src/runtime/internal/ResizeObserverSingleton.js
  var ResizeObserverSingleton = class _ResizeObserverSingleton {
    /**
     * @private
     * @readonly
     * @type {WeakMap<Element, import('./private.js').Listener>}
     */
    _listeners = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;
    /**
     * @private
     * @type {ResizeObserver}
     */
    _observer = void 0;
    /** @type {ResizeObserverOptions} */
    options;
    /** @param {ResizeObserverOptions} options */
    constructor(options) {
      this.options = options;
    }
    /**
     * @param {Element} element
     * @param {import('./private.js').Listener} listener
     * @returns {() => void}
     */
    observe(element2, listener) {
      this._listeners.set(element2, listener);
      this._getObserver().observe(element2, this.options);
      return () => {
        this._listeners.delete(element2);
        this._observer.unobserve(element2);
      };
    }
    /**
     * @private
     */
    _getObserver() {
      return this._observer ?? (this._observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          _ResizeObserverSingleton.entries.set(entry.target, entry);
          this._listeners.get(entry.target)?.(entry);
        }
      }));
    }
  };
  ResizeObserverSingleton.entries = "WeakMap" in globals ? /* @__PURE__ */ new WeakMap() : void 0;

  // ../node_modules/svelte/src/runtime/internal/dom.js
  var is_hydrating = false;
  function start_hydrating() {
    is_hydrating = true;
  }
  function end_hydrating() {
    is_hydrating = false;
  }
  function append(target, node) {
    target.appendChild(node);
  }
  function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
      const style = element("style");
      style.id = style_sheet_id;
      style.textContent = styles;
      append_stylesheet(append_styles_to, style);
    }
  }
  function get_root_for_style(node) {
    if (!node)
      return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && /** @type {ShadowRoot} */
    root.host) {
      return (
        /** @type {ShadowRoot} */
        root
      );
    }
    return node.ownerDocument;
  }
  function append_empty_stylesheet(node) {
    const style_element = element("style");
    style_element.textContent = "/* empty */";
    append_stylesheet(get_root_for_style(node), style_element);
    return style_element.sheet;
  }
  function append_stylesheet(node, style) {
    append(
      /** @type {Document} */
      node.head || node,
      style
    );
    return style.sheet;
  }
  function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
  }
  function detach(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  }
  function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
      if (iterations[i])
        iterations[i].d(detaching);
    }
  }
  function element(name) {
    return document.createElement(name);
  }
  function svg_element(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
  }
  function text(data2) {
    return document.createTextNode(data2);
  }
  function space() {
    return text(" ");
  }
  function empty() {
    return text("");
  }
  function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
  }
  function attr(node, attribute, value) {
    if (value == null)
      node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
      node.setAttribute(attribute, value);
  }
  function children(element2) {
    return Array.from(element2.childNodes);
  }
  function set_data(text2, data2) {
    data2 = "" + data2;
    if (text2.data === data2)
      return;
    text2.data = /** @type {string} */
    data2;
  }
  function set_input_value(input, value) {
    input.value = value == null ? "" : value;
  }
  function toggle_class(element2, name, toggle) {
    element2.classList.toggle(name, !!toggle);
  }
  function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    return new CustomEvent(type, { detail, bubbles, cancelable });
  }
  function get_custom_elements_slots(element2) {
    const result = {};
    element2.childNodes.forEach(
      /** @param {Element} node */
      (node) => {
        result[node.slot || "default"] = true;
      }
    );
    return result;
  }
  function construct_svelte_component(component, props) {
    return new component(props);
  }

  // ../node_modules/svelte/src/runtime/internal/style_manager.js
  var managed_styles = /* @__PURE__ */ new Map();
  var active = 0;
  function hash(str) {
    let hash2 = 5381;
    let i = str.length;
    while (i--)
      hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
    return hash2 >>> 0;
  }
  function create_style_information(doc, node) {
    const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
    managed_styles.set(doc, info);
    return info;
  }
  function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = "{\n";
    for (let p = 0; p <= 1; p += step) {
      const t = a + (b - a) * ease(p);
      keyframes += p * 100 + `%{${fn(t, 1 - t)}}
`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}
}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = get_root_for_style(node);
    const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
    if (!rules[name]) {
      rules[name] = true;
      stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || "";
    node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
  }
  function delete_rule(node, name) {
    const previous = (node.style.animation || "").split(", ");
    const next = previous.filter(
      name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1
      // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
      node.style.animation = next.join(", ");
      active -= deleted;
      if (!active)
        clear_rules();
    }
  }
  function clear_rules() {
    raf(() => {
      if (active)
        return;
      managed_styles.forEach((info) => {
        const { ownerNode } = info.stylesheet;
        if (ownerNode)
          detach(ownerNode);
      });
      managed_styles.clear();
    });
  }

  // ../node_modules/svelte/src/runtime/internal/lifecycle.js
  var current_component;
  function set_current_component(component) {
    current_component = component;
  }
  function get_current_component() {
    if (!current_component)
      throw new Error("Function called outside component initialization");
    return current_component;
  }
  function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
  }
  function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
  }

  // ../node_modules/svelte/src/runtime/internal/scheduler.js
  var dirty_components = [];
  var binding_callbacks = [];
  var render_callbacks = [];
  var flush_callbacks = [];
  var resolved_promise = /* @__PURE__ */ Promise.resolve();
  var update_scheduled = false;
  function schedule_update() {
    if (!update_scheduled) {
      update_scheduled = true;
      resolved_promise.then(flush);
    }
  }
  function add_render_callback(fn) {
    render_callbacks.push(fn);
  }
  function add_flush_callback(fn) {
    flush_callbacks.push(fn);
  }
  var seen_callbacks = /* @__PURE__ */ new Set();
  var flushidx = 0;
  function flush() {
    if (flushidx !== 0) {
      return;
    }
    const saved_component = current_component;
    do {
      try {
        while (flushidx < dirty_components.length) {
          const component = dirty_components[flushidx];
          flushidx++;
          set_current_component(component);
          update(component.$$);
        }
      } catch (e) {
        dirty_components.length = 0;
        flushidx = 0;
        throw e;
      }
      set_current_component(null);
      dirty_components.length = 0;
      flushidx = 0;
      while (binding_callbacks.length)
        binding_callbacks.pop()();
      for (let i = 0; i < render_callbacks.length; i += 1) {
        const callback = render_callbacks[i];
        if (!seen_callbacks.has(callback)) {
          seen_callbacks.add(callback);
          callback();
        }
      }
      render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
      flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
  }
  function update($$) {
    if ($$.fragment !== null) {
      $$.update();
      run_all($$.before_update);
      const dirty = $$.dirty;
      $$.dirty = [-1];
      $$.fragment && $$.fragment.p($$.ctx, dirty);
      $$.after_update.forEach(add_render_callback);
    }
  }
  function flush_render_callbacks(fns) {
    const filtered = [];
    const targets = [];
    render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
    targets.forEach((c) => c());
    render_callbacks = filtered;
  }

  // ../node_modules/svelte/src/runtime/internal/transitions.js
  var promise;
  function wait() {
    if (!promise) {
      promise = Promise.resolve();
      promise.then(() => {
        promise = null;
      });
    }
    return promise;
  }
  function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
  }
  var outroing = /* @__PURE__ */ new Set();
  var outros;
  function group_outros() {
    outros = {
      r: 0,
      c: [],
      p: outros
      // parent group
    };
  }
  function check_outros() {
    if (!outros.r) {
      run_all(outros.c);
    }
    outros = outros.p;
  }
  function transition_in(block, local) {
    if (block && block.i) {
      outroing.delete(block);
      block.i(local);
    }
  }
  function transition_out(block, local, detach2, callback) {
    if (block && block.o) {
      if (outroing.has(block))
        return;
      outroing.add(block);
      outros.c.push(() => {
        outroing.delete(block);
        if (callback) {
          if (detach2)
            block.d(1);
          callback();
        }
      });
      block.o(local);
    } else if (callback) {
      callback();
    }
  }
  var null_transition = { duration: 0 };
  function create_in_transition(node, fn, params) {
    const options = { direction: "in" };
    let config = fn(node, params, options);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
      if (animation_name)
        delete_rule(node, animation_name);
    }
    function go() {
      const {
        delay = 0,
        duration = 300,
        easing = identity,
        tick: tick2 = noop,
        css
      } = config || null_transition;
      if (css)
        animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
      tick2(0, 1);
      const start_time = now() + delay;
      const end_time = start_time + duration;
      if (task)
        task.abort();
      running = true;
      add_render_callback(() => dispatch(node, true, "start"));
      task = loop((now2) => {
        if (running) {
          if (now2 >= end_time) {
            tick2(1, 0);
            dispatch(node, true, "end");
            cleanup();
            return running = false;
          }
          if (now2 >= start_time) {
            const t = easing((now2 - start_time) / duration);
            tick2(t, 1 - t);
          }
        }
        return running;
      });
    }
    let started = false;
    return {
      start() {
        if (started)
          return;
        started = true;
        delete_rule(node);
        if (is_function(config)) {
          config = config(options);
          wait().then(go);
        } else {
          go();
        }
      },
      invalidate() {
        started = false;
      },
      end() {
        if (running) {
          cleanup();
          running = false;
        }
      }
    };
  }

  // ../node_modules/svelte/src/runtime/internal/each.js
  function ensure_array_like(array_like_or_iterator) {
    return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  }

  // ../node_modules/svelte/src/shared/boolean_attributes.js
  var _boolean_attributes = (
    /** @type {const} */
    [
      "allowfullscreen",
      "allowpaymentrequest",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "defer",
      "disabled",
      "formnovalidate",
      "hidden",
      "inert",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "selected"
    ]
  );
  var boolean_attributes = /* @__PURE__ */ new Set([..._boolean_attributes]);

  // ../node_modules/svelte/src/runtime/internal/Component.js
  function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== void 0) {
      component.$$.bound[index] = callback;
      callback(component.$$.ctx[index]);
    }
  }
  function create_component(block) {
    block && block.c();
  }
  function mount_component(component, target, anchor) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    add_render_callback(() => {
      const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
      if (component.$$.on_destroy) {
        component.$$.on_destroy.push(...new_on_destroy);
      } else {
        run_all(new_on_destroy);
      }
      component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
  }
  function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
      flush_render_callbacks($$.after_update);
      run_all($$.on_destroy);
      $$.fragment && $$.fragment.d(detaching);
      $$.on_destroy = $$.fragment = null;
      $$.ctx = [];
    }
  }
  function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
      dirty_components.push(component);
      schedule_update();
      component.$$.dirty.fill(0);
    }
    component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
  }
  function init(component, options, instance30, create_fragment39, not_equal, props, append_styles2, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
      fragment: null,
      ctx: [],
      // state
      props,
      update: noop,
      not_equal,
      bound: blank_object(),
      // lifecycle
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
      // everything else
      callbacks: blank_object(),
      dirty,
      skip_bound: false,
      root: options.target || parent_component.$$.root
    };
    append_styles2 && append_styles2($$.root);
    let ready = false;
    $$.ctx = instance30 ? instance30(component, options.props || {}, (i, ret, ...rest) => {
      const value = rest.length ? rest[0] : ret;
      if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
        if (!$$.skip_bound && $$.bound[i])
          $$.bound[i](value);
        if (ready)
          make_dirty(component, i);
      }
      return ret;
    }) : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    $$.fragment = create_fragment39 ? create_fragment39($$.ctx) : false;
    if (options.target) {
      if (options.hydrate) {
        start_hydrating();
        const nodes = children(options.target);
        $$.fragment && $$.fragment.l(nodes);
        nodes.forEach(detach);
      } else {
        $$.fragment && $$.fragment.c();
      }
      if (options.intro)
        transition_in(component.$$.fragment);
      mount_component(component, options.target, options.anchor);
      end_hydrating();
      flush();
    }
    set_current_component(parent_component);
  }
  var SvelteElement;
  if (typeof HTMLElement === "function") {
    SvelteElement = class extends HTMLElement {
      /** The Svelte component constructor */
      $$ctor;
      /** Slots */
      $$s;
      /** The Svelte component instance */
      $$c;
      /** Whether or not the custom element is connected */
      $$cn = false;
      /** Component props data */
      $$d = {};
      /** `true` if currently in the process of reflecting component props back to attributes */
      $$r = false;
      /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
      $$p_d = {};
      /** @type {Record<string, Function[]>} Event listeners */
      $$l = {};
      /** @type {Map<Function, Function>} Event listener unsubscribe functions */
      $$l_u = /* @__PURE__ */ new Map();
      constructor($$componentCtor, $$slots, use_shadow_dom) {
        super();
        this.$$ctor = $$componentCtor;
        this.$$s = $$slots;
        if (use_shadow_dom) {
          this.attachShadow({ mode: "open" });
        }
      }
      addEventListener(type, listener, options) {
        this.$$l[type] = this.$$l[type] || [];
        this.$$l[type].push(listener);
        if (this.$$c) {
          const unsub = this.$$c.$on(type, listener);
          this.$$l_u.set(listener, unsub);
        }
        super.addEventListener(type, listener, options);
      }
      removeEventListener(type, listener, options) {
        super.removeEventListener(type, listener, options);
        if (this.$$c) {
          const unsub = this.$$l_u.get(listener);
          if (unsub) {
            unsub();
            this.$$l_u.delete(listener);
          }
        }
      }
      async connectedCallback() {
        this.$$cn = true;
        if (!this.$$c) {
          let create_slot2 = function(name) {
            return () => {
              let node;
              const obj = {
                c: function create() {
                  node = element("slot");
                  if (name !== "default") {
                    attr(node, "name", name);
                  }
                },
                /**
                 * @param {HTMLElement} target
                 * @param {HTMLElement} [anchor]
                 */
                m: function mount(target, anchor) {
                  insert(target, node, anchor);
                },
                d: function destroy(detaching) {
                  if (detaching) {
                    detach(node);
                  }
                }
              };
              return obj;
            };
          };
          await Promise.resolve();
          if (!this.$$cn) {
            return;
          }
          const $$slots = {};
          const existing_slots = get_custom_elements_slots(this);
          for (const name of this.$$s) {
            if (name in existing_slots) {
              $$slots[name] = [create_slot2(name)];
            }
          }
          for (const attribute of this.attributes) {
            const name = this.$$g_p(attribute.name);
            if (!(name in this.$$d)) {
              this.$$d[name] = get_custom_element_value(name, attribute.value, this.$$p_d, "toProp");
            }
          }
          this.$$c = new this.$$ctor({
            target: this.shadowRoot || this,
            props: {
              ...this.$$d,
              $$slots,
              $$scope: {
                ctx: []
              }
            }
          });
          const reflect_attributes = () => {
            this.$$r = true;
            for (const key in this.$$p_d) {
              this.$$d[key] = this.$$c.$$.ctx[this.$$c.$$.props[key]];
              if (this.$$p_d[key].reflect) {
                const attribute_value = get_custom_element_value(
                  key,
                  this.$$d[key],
                  this.$$p_d,
                  "toAttribute"
                );
                if (attribute_value == null) {
                  this.removeAttribute(key);
                } else {
                  this.setAttribute(this.$$p_d[key].attribute || key, attribute_value);
                }
              }
            }
            this.$$r = false;
          };
          this.$$c.$$.after_update.push(reflect_attributes);
          reflect_attributes();
          for (const type in this.$$l) {
            for (const listener of this.$$l[type]) {
              const unsub = this.$$c.$on(type, listener);
              this.$$l_u.set(listener, unsub);
            }
          }
          this.$$l = {};
        }
      }
      // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
      // and setting attributes through setAttribute etc, this is helpful
      attributeChangedCallback(attr2, _oldValue, newValue) {
        if (this.$$r)
          return;
        attr2 = this.$$g_p(attr2);
        this.$$d[attr2] = get_custom_element_value(attr2, newValue, this.$$p_d, "toProp");
        this.$$c?.$set({ [attr2]: this.$$d[attr2] });
      }
      disconnectedCallback() {
        this.$$cn = false;
        Promise.resolve().then(() => {
          if (!this.$$cn) {
            this.$$c.$destroy();
            this.$$c = void 0;
          }
        });
      }
      $$g_p(attribute_name) {
        return Object.keys(this.$$p_d).find(
          (key) => this.$$p_d[key].attribute === attribute_name || !this.$$p_d[key].attribute && key.toLowerCase() === attribute_name
        ) || attribute_name;
      }
    };
  }
  function get_custom_element_value(prop, value, props_definition, transform) {
    const type = props_definition[prop]?.type;
    value = type === "Boolean" && typeof value !== "boolean" ? value != null : value;
    if (!transform || !props_definition[prop]) {
      return value;
    } else if (transform === "toAttribute") {
      switch (type) {
        case "Object":
        case "Array":
          return value == null ? null : JSON.stringify(value);
        case "Boolean":
          return value ? "" : null;
        case "Number":
          return value == null ? null : value;
        default:
          return value;
      }
    } else {
      switch (type) {
        case "Object":
        case "Array":
          return value && JSON.parse(value);
        case "Boolean":
          return value;
        case "Number":
          return value != null ? +value : value;
        default:
          return value;
      }
    }
  }
  var SvelteComponent = class {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $$ = void 0;
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    $$set = void 0;
    /** @returns {void} */
    $destroy() {
      destroy_component(this, 1);
      this.$destroy = noop;
    }
    /**
     * @template {Extract<keyof Events, string>} K
     * @param {K} type
     * @param {((e: Events[K]) => void) | null | undefined} callback
     * @returns {() => void}
     */
    $on(type, callback) {
      if (!is_function(callback)) {
        return noop;
      }
      const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index !== -1)
          callbacks.splice(index, 1);
      };
    }
    /**
     * @param {Partial<Props>} props
     * @returns {void}
     */
    $set(props) {
      if (this.$$set && !is_empty(props)) {
        this.$$.skip_bound = true;
        this.$$set(props);
        this.$$.skip_bound = false;
      }
    }
  };

  // ../node_modules/svelte/src/shared/version.js
  var PUBLIC_VERSION = "4";

  // ../node_modules/svelte/src/runtime/internal/disclose-version/index.js
  if (typeof window !== "undefined")
    (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);

  // src/App.svelte
  var import_router = __toESM(require_router());

  // src/pages/Abdimas.svelte
  function add_css(target) {
    append_styles(target, "svelte-1hdo9mq", ".container.svelte-1hdo9mq{margin-top:3.5rem}article.svelte-1hdo9mq{text-align:center}");
  }
  function create_fragment(ctx) {
    let article;
    return {
      c() {
        article = element("article");
        article.innerHTML = `<h1>Pengabdian Masyarakat</h1> <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos repellendus
      nulla soluta odio. Dolor sed viverra ipsum nunc aliquet bibendum. Suscipit
      adipiscing bibendum est ultricies integer. In mollis nunc sed id.
      Suspendisse faucibus interdum posuere lorem ipsum dolor sit amet
      consectetur.</p>`;
        attr(article, "class", "container svelte-1hdo9mq");
      },
      m(target, anchor) {
        insert(target, article, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
      }
    };
  }
  var Abdimas = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment, safe_not_equal, {}, add_css);
    }
  };
  var Abdimas_default = Abdimas;

  // src/pages/About.svelte
  function add_css2(target) {
    append_styles(target, "svelte-9f6d4p", "article.svelte-9f6d4p{margin-top:3.5rem;text-align:center}");
  }
  function create_fragment2(ctx) {
    let article;
    return {
      c() {
        article = element("article");
        article.innerHTML = `<h1>Profil</h1> <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos repellendus
      nulla soluta odio. Vitae elementum curabitur vitae nunc. Sem nulla
      pharetra diam sit amet nisl suscipit. Odio ut enim blandit volutpat
      maecenas volutpat. Nec ultrices dui sapien eget mi proin sed libero enim.
      Ultrices gravida dictum fusce ut placerat orci nulla. Eget duis at tellus
      at urna. Est velit egestas dui id ornare arcu. Suscipit adipiscing
      bibendum est ultricies.</p>`;
        attr(article, "class", "container svelte-9f6d4p");
      },
      m(target, anchor) {
        insert(target, article, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
      }
    };
  }
  var About = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment2, safe_not_equal, {}, add_css2);
    }
  };
  var About_default = About;

  // src/pages/AuthGoogle.svelte
  function create_fragment3(ctx) {
    let h2;
    return {
      c() {
        h2 = element("h2");
        h2.textContent = "Login With Google";
      },
      m(target, anchor) {
        insert(target, h2, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(h2);
        }
      }
    };
  }
  function instance($$self, $$props, $$invalidate) {
    let { params = {} } = $$props;
    console.log(params);
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(0, params = $$props2.params);
    };
    return [params];
  }
  var AuthGoogle = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance, create_fragment3, safe_not_equal, { params: 0 });
    }
  };
  var AuthGoogle_default = AuthGoogle;

  // ../node_modules/svelte/src/runtime/transition/index.js
  function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
    const o = +getComputedStyle(node).opacity;
    return {
      delay,
      duration,
      easing,
      css: (t) => `opacity: ${t * o}`
    };
  }

  // src/libs/Article.svelte
  function add_css3(target) {
    append_styles(target, "svelte-h8uanz", "article.svelte-h8uanz{margin-top:3.5rem}");
  }
  function create_fragment4(ctx) {
    let article;
    let article_intro;
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[1].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[0],
      null
    );
    return {
      c() {
        article = element("article");
        if (default_slot)
          default_slot.c();
        attr(article, "class", "svelte-h8uanz");
      },
      m(target, anchor) {
        insert(target, article, anchor);
        if (default_slot) {
          default_slot.m(article, null);
        }
        current = true;
      },
      p(ctx2, [dirty]) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          1)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[0],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[0]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[0],
                dirty,
                null
              ),
              null
            );
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        if (local) {
          if (!article_intro) {
            add_render_callback(() => {
              article_intro = create_in_transition(article, fade, {});
              article_intro.start();
            });
          }
        }
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(article);
        }
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function instance2($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    $$self.$$set = ($$props2) => {
      if ("$$scope" in $$props2)
        $$invalidate(0, $$scope = $$props2.$$scope);
    };
    return [$$scope, slots];
  }
  var Article = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance2, create_fragment4, safe_not_equal, {}, add_css3);
    }
  };
  var Article_default = Article;

  // src/libs/Field.svelte
  function add_css4(target) {
    append_styles(target, "svelte-mpro9n", 'input[type="month"].svelte-mpro9n.svelte-mpro9n{background-color:#5ca7f1;color:#ffffff;border:none;outline:none}.svelte-mpro9n.svelte-mpro9n::-webkit-calendar-picker-indicator{background-color:#ffffff;padding:6px;cursor:pointer;border-radius:20px}div.svelte-mpro9n.svelte-mpro9n{display:grid;grid-template-columns:12rem auto;gap:1rem}div.svelte-mpro9n+div{margin-top:0.5rem}.svelte-mpro9n:not(.view) b.svelte-mpro9n{display:block;line-height:38px}div.svelte-mpro9n>span{display:inline-flex;align-items:center;min-height:2.375rem;column-gap:0.35rem}div.svelte-mpro9n>span *{margin:0}[href].svelte-mpro9n.svelte-mpro9n{color:#35f}');
  }
  function get_each_context(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[21] = list[i];
    return child_ctx;
  }
  function create_else_block(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "type", "text");
        attr(input, "class", "svelte-mpro9n");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*value*/
          ctx[1]
        );
        if (!mounted) {
          dispose = [
            listen(
              input,
              "input",
              /*input_input_handler_1*/
              ctx[18]
            ),
            listen(input, "click", function() {
              if (is_function(
                /*onclick*/
                ctx[8]
              ))
                ctx[8].apply(this, arguments);
            })
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & /*value*/
        2 && input.value !== /*value*/
        ctx[1]) {
          set_input_value(
            input,
            /*value*/
            ctx[1]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_4(ctx) {
    let a;
    let t;
    return {
      c() {
        a = element("a");
        t = text(
          /*value*/
          ctx[1]
        );
        attr(
          a,
          "href",
          /*href*/
          ctx[7]
        );
        attr(a, "class", "svelte-mpro9n");
      },
      m(target, anchor) {
        insert(target, a, anchor);
        append(a, t);
      },
      p(ctx2, dirty) {
        if (dirty & /*value*/
        2)
          set_data(
            t,
            /*value*/
            ctx2[1]
          );
        if (dirty & /*href*/
        128) {
          attr(
            a,
            "href",
            /*href*/
            ctx2[7]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(a);
        }
      }
    };
  }
  function create_if_block_3(ctx) {
    let select_1;
    let mounted;
    let dispose;
    let each_value = ensure_array_like(
      /*value*/
      ctx[1]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    }
    return {
      c() {
        select_1 = element("select");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(select_1, "class", "svelte-mpro9n");
      },
      m(target, anchor) {
        insert(target, select_1, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(select_1, null);
          }
        }
        if (!mounted) {
          dispose = listen(
            select_1,
            "change",
            /*fillSelect*/
            ctx[10]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*value*/
        2) {
          each_value = ensure_array_like(
            /*value*/
            ctx2[1]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(select_1, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(select_1);
        }
        destroy_each(each_blocks, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_if_block_2(ctx) {
    let input;
    let mounted;
    let dispose;
    return {
      c() {
        input = element("input");
        attr(input, "type", "month");
        attr(input, "class", "svelte-mpro9n");
      },
      m(target, anchor) {
        insert(target, input, anchor);
        set_input_value(
          input,
          /*value*/
          ctx[1]
        );
        if (!mounted) {
          dispose = [
            listen(
              input,
              "input",
              /*input_input_handler*/
              ctx[17]
            ),
            listen(input, "click", function() {
              if (is_function(
                /*onclick*/
                ctx[8]
              ))
                ctx[8].apply(this, arguments);
            })
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & /*value*/
        2) {
          set_input_value(
            input,
            /*value*/
            ctx[1]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(input);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_1(ctx) {
    let textarea_1;
    let mounted;
    let dispose;
    return {
      c() {
        textarea_1 = element("textarea");
        attr(
          textarea_1,
          "id",
          /*id*/
          ctx[2]
        );
        attr(textarea_1, "class", "svelte-mpro9n");
      },
      m(target, anchor) {
        insert(target, textarea_1, anchor);
        set_input_value(
          textarea_1,
          /*value*/
          ctx[1]
        );
        if (!mounted) {
          dispose = [
            listen(
              textarea_1,
              "input",
              /*textarea_1_input_handler*/
              ctx[16]
            ),
            listen(textarea_1, "click", function() {
              if (is_function(
                /*onclick*/
                ctx[8]
              ))
                ctx[8].apply(this, arguments);
            })
          ];
          mounted = true;
        }
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        if (dirty & /*id*/
        4) {
          attr(
            textarea_1,
            "id",
            /*id*/
            ctx[2]
          );
        }
        if (dirty & /*value*/
        2) {
          set_input_value(
            textarea_1,
            /*value*/
            ctx[1]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(textarea_1);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block(ctx) {
    let a;
    let current;
    const default_slot_template = (
      /*#slots*/
      ctx[15].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[14],
      null
    );
    return {
      c() {
        a = element("a");
        if (default_slot)
          default_slot.c();
        attr(a, "class", "svelte-mpro9n");
      },
      m(target, anchor) {
        insert(target, a, anchor);
        if (default_slot) {
          default_slot.m(a, null);
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          16384)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[14],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[14]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[14],
                dirty,
                null
              ),
              null
            );
          }
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(a);
        }
        if (default_slot)
          default_slot.d(detaching);
      }
    };
  }
  function create_each_block(ctx) {
    let option;
    let t_value = (
      /*it*/
      ctx[21].username + ""
    );
    let t;
    let option_value_value;
    let goSelect_action;
    let mounted;
    let dispose;
    return {
      c() {
        option = element("option");
        t = text(t_value);
        option.__value = option_value_value = /*it*/
        ctx[21].id;
        set_input_value(option, option.__value);
        attr(option, "class", "svelte-mpro9n");
      },
      m(target, anchor) {
        insert(target, option, anchor);
        append(option, t);
        if (!mounted) {
          dispose = action_destroyer(goSelect_action = /*goSelect*/
          ctx[11].call(null, option));
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*value*/
        2 && t_value !== (t_value = /*it*/
        ctx2[21].username + ""))
          set_data(t, t_value);
        if (dirty & /*value*/
        2 && option_value_value !== (option_value_value = /*it*/
        ctx2[21].id)) {
          option.__value = option_value_value;
          set_input_value(option, option.__value);
        }
      },
      d(detaching) {
        if (detaching) {
          detach(option);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment5(ctx) {
    let div;
    let b;
    let t0;
    let t1;
    let current_block_type_index;
    let if_block;
    let current;
    const if_block_creators = [
      create_if_block,
      create_if_block_1,
      create_if_block_2,
      create_if_block_3,
      create_if_block_4,
      create_else_block
    ];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (
        /*hasSlot*/
        ctx2[9]
      )
        return 0;
      if (
        /*textarea*/
        ctx2[3] && !/*view*/
        ctx2[6]
      )
        return 1;
      if (
        /*datepicker*/
        ctx2[4] && !/*view*/
        ctx2[6]
      )
        return 2;
      if (
        /*select*/
        ctx2[5] && /*view*/
        ctx2[6]
      )
        return 3;
      if (
        /*view*/
        ctx2[6]
      )
        return 4;
      return 5;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        div = element("div");
        b = element("b");
        t0 = text(
          /*name*/
          ctx[0]
        );
        t1 = space();
        if_block.c();
        attr(b, "class", "svelte-mpro9n");
        attr(div, "class", "svelte-mpro9n");
        toggle_class(
          div,
          "view",
          /*view*/
          ctx[6]
        );
      },
      m(target, anchor) {
        insert(target, div, anchor);
        append(div, b);
        append(b, t0);
        append(div, t1);
        if_blocks[current_block_type_index].m(div, null);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (!current || dirty & /*name*/
        1)
          set_data(
            t0,
            /*name*/
            ctx2[0]
          );
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(div, null);
        }
        if (!current || dirty & /*view*/
        64) {
          toggle_class(
            div,
            "view",
            /*view*/
            ctx2[6]
          );
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(div);
        }
        if_blocks[current_block_type_index].d();
      }
    };
  }
  function instance3($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    let { id } = $$props;
    let { name = "" } = $$props;
    let { value = "" } = $$props;
    let { selected } = $$props;
    let { textarea = false } = $$props;
    let { datepicker = false } = $$props;
    let { select = false } = $$props;
    let { view } = $$props;
    let { href } = $$props;
    let { onclick } = $$props;
    let { userId } = $$props;
    const slot = $$props.$$slots || {};
    const hasSlot = slot.hasOwnProperty("default");
    if (name) {
      name = name[0].toUpperCase() + name.slice(1);
      name = name.replaceAll("__", "/").replaceAll("_", " ");
    }
    function fillSelect(event) {
      let select2 = event.target;
      $$invalidate(12, selected = Number(select2.value));
    }
    function goSelect(el) {
      let valueId = el.value;
      if (Number(valueId) === userId) {
        el.setAttribute("selected", "");
      }
    }
    function textarea_1_input_handler() {
      value = this.value;
      $$invalidate(1, value);
    }
    function input_input_handler() {
      value = this.value;
      $$invalidate(1, value);
    }
    function input_input_handler_1() {
      value = this.value;
      $$invalidate(1, value);
    }
    $$self.$$set = ($$new_props) => {
      $$invalidate(20, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
      if ("id" in $$new_props)
        $$invalidate(2, id = $$new_props.id);
      if ("name" in $$new_props)
        $$invalidate(0, name = $$new_props.name);
      if ("value" in $$new_props)
        $$invalidate(1, value = $$new_props.value);
      if ("selected" in $$new_props)
        $$invalidate(12, selected = $$new_props.selected);
      if ("textarea" in $$new_props)
        $$invalidate(3, textarea = $$new_props.textarea);
      if ("datepicker" in $$new_props)
        $$invalidate(4, datepicker = $$new_props.datepicker);
      if ("select" in $$new_props)
        $$invalidate(5, select = $$new_props.select);
      if ("view" in $$new_props)
        $$invalidate(6, view = $$new_props.view);
      if ("href" in $$new_props)
        $$invalidate(7, href = $$new_props.href);
      if ("onclick" in $$new_props)
        $$invalidate(8, onclick = $$new_props.onclick);
      if ("userId" in $$new_props)
        $$invalidate(13, userId = $$new_props.userId);
      if ("$$scope" in $$new_props)
        $$invalidate(14, $$scope = $$new_props.$$scope);
    };
    $$props = exclude_internal_props($$props);
    return [
      name,
      value,
      id,
      textarea,
      datepicker,
      select,
      view,
      href,
      onclick,
      hasSlot,
      fillSelect,
      goSelect,
      selected,
      userId,
      $$scope,
      slots,
      textarea_1_input_handler,
      input_input_handler,
      input_input_handler_1
    ];
  }
  var Field = class extends SvelteComponent {
    constructor(options) {
      super();
      init(
        this,
        options,
        instance3,
        create_fragment5,
        safe_not_equal,
        {
          id: 2,
          name: 0,
          value: 1,
          selected: 12,
          textarea: 3,
          datepicker: 4,
          select: 5,
          view: 6,
          href: 7,
          onclick: 8,
          userId: 13
        },
        add_css4
      );
    }
  };
  var Field_default = Field;

  // src/libs/Hero.svelte
  function add_css5(target) {
    append_styles(target, "svelte-1ryyw8d", '.title.svelte-1ryyw8d{color:black}.subtitle.svelte-1ryyw8d{color:black;text-align:justify}@media(min-width: 768px){}.hero-body.svelte-1ryyw8d{margin-left:1.5rem;margin-right:1.5rem;border-radius:20px;background-image:url("https://digitalsynopsis.com/wp-content/uploads/2020/07/free-vector-gradients-12-2048x1152.jpg");background-repeat:no-repeat;background-attachment:fixed;background-size:100% 100%}');
  }
  function create_fragment6(ctx) {
    let section;
    return {
      c() {
        section = element("section");
        section.innerHTML = `<div class="hero-body svelte-1ryyw8d"><p class="title svelte-1ryyw8d">LPPM Universitas Internasional Semen Indonesia</p> <p class="subtitle svelte-1ryyw8d">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
         veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
         commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
         velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
         occaecat cupidatat non proident, sunt in culpa qui officia deserunt
         mollit anim id est laborum.</p> <div class="buttons"><a class="button is-white is-focused is-rounded" href="/login">Login</a></div></div>`;
        attr(section, "class", "hero is-medium");
      },
      m(target, anchor) {
        insert(target, section, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(section);
        }
      }
    };
  }
  var Hero = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment6, safe_not_equal, {}, add_css5);
    }
  };
  var Hero_default = Hero;

  // src/libs/Icon.svelte
  function create_fragment7(ctx) {
    let svg;
    let path;
    return {
      c() {
        svg = svg_element("svg");
        path = svg_element("path");
        attr(path, "fill", "currentColor");
        attr(
          path,
          "d",
          /*src*/
          ctx[1]
        );
        attr(
          svg,
          "id",
          /*id*/
          ctx[0]
        );
        attr(svg, "xmlns", "http://www.w3.org/2000/svg");
        attr(
          svg,
          "width",
          /*width*/
          ctx[2]
        );
        attr(
          svg,
          "height",
          /*tinggi*/
          ctx[3]
        );
        attr(svg, "viewBox", "0 0 24 24");
      },
      m(target, anchor) {
        insert(target, svg, anchor);
        append(svg, path);
      },
      p(ctx2, [dirty]) {
        if (dirty & /*src*/
        2) {
          attr(
            path,
            "d",
            /*src*/
            ctx2[1]
          );
        }
        if (dirty & /*id*/
        1) {
          attr(
            svg,
            "id",
            /*id*/
            ctx2[0]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(svg);
        }
      }
    };
  }
  function instance4($$self, $$props, $$invalidate) {
    let { id } = $$props;
    let { src } = $$props;
    let { size = 1 } = $$props;
    let width = 24 * Number(size);
    let tinggi = 24 * Number(size);
    $$self.$$set = ($$props2) => {
      if ("id" in $$props2)
        $$invalidate(0, id = $$props2.id);
      if ("src" in $$props2)
        $$invalidate(1, src = $$props2.src);
      if ("size" in $$props2)
        $$invalidate(4, size = $$props2.size);
    };
    return [id, src, width, tinggi, size];
  }
  var Icon = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance4, create_fragment7, safe_not_equal, { id: 0, src: 1, size: 4 });
    }
  };
  var Icon_default = Icon;

  // src/libs/Modal.svelte
  function add_css6(target) {
    append_styles(target, "svelte-90s5um", "b.svelte-90s5um{display:block;font-weight:normal;z-index:17;position:fixed;display:flex;align-items:center;justify-content:center;inset:0;background-color:rgba(0, 0, 0, 0);visibility:hidden}b.show.svelte-90s5um{background-color:rgba(0, 0, 0, 0.7);visibility:visible}div.svelte-90s5um{padding:1em 1.5em;max-width:32em;background:white}");
  }
  var get_header_slot_changes = (dirty) => ({});
  var get_header_slot_context = (ctx) => ({});
  function create_fragment8(ctx) {
    let b;
    let div;
    let t0;
    let hr;
    let t1;
    let current;
    let mounted;
    let dispose;
    const header_slot_template = (
      /*#slots*/
      ctx[3].header
    );
    const header_slot = create_slot(
      header_slot_template,
      ctx,
      /*$$scope*/
      ctx[2],
      get_header_slot_context
    );
    const default_slot_template = (
      /*#slots*/
      ctx[3].default
    );
    const default_slot = create_slot(
      default_slot_template,
      ctx,
      /*$$scope*/
      ctx[2],
      null
    );
    return {
      c() {
        b = element("b");
        div = element("div");
        if (header_slot)
          header_slot.c();
        t0 = space();
        hr = element("hr");
        t1 = space();
        if (default_slot)
          default_slot.c();
        attr(div, "class", "svelte-90s5um");
        attr(b, "class", "svelte-90s5um");
        toggle_class(
          b,
          "show",
          /*show*/
          ctx[0]
        );
      },
      m(target, anchor) {
        insert(target, b, anchor);
        append(b, div);
        if (header_slot) {
          header_slot.m(div, null);
        }
        append(div, t0);
        append(div, hr);
        append(div, t1);
        if (default_slot) {
          default_slot.m(div, null);
        }
        current = true;
        if (!mounted) {
          dispose = listen(
            b,
            "click",
            /*handleClick*/
            ctx[1]
          );
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (header_slot) {
          if (header_slot.p && (!current || dirty & /*$$scope*/
          4)) {
            update_slot_base(
              header_slot,
              header_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[2],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[2]
              ) : get_slot_changes(
                header_slot_template,
                /*$$scope*/
                ctx2[2],
                dirty,
                get_header_slot_changes
              ),
              get_header_slot_context
            );
          }
        }
        if (default_slot) {
          if (default_slot.p && (!current || dirty & /*$$scope*/
          4)) {
            update_slot_base(
              default_slot,
              default_slot_template,
              ctx2,
              /*$$scope*/
              ctx2[2],
              !current ? get_all_dirty_from_scope(
                /*$$scope*/
                ctx2[2]
              ) : get_slot_changes(
                default_slot_template,
                /*$$scope*/
                ctx2[2],
                dirty,
                null
              ),
              null
            );
          }
        }
        if (!current || dirty & /*show*/
        1) {
          toggle_class(
            b,
            "show",
            /*show*/
            ctx2[0]
          );
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(header_slot, local);
        transition_in(default_slot, local);
        current = true;
      },
      o(local) {
        transition_out(header_slot, local);
        transition_out(default_slot, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(b);
        }
        if (header_slot)
          header_slot.d(detaching);
        if (default_slot)
          default_slot.d(detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function instance5($$self, $$props, $$invalidate) {
    let { $$slots: slots = {}, $$scope } = $$props;
    let { show = false } = $$props;
    function handleClick() {
      console.log(show);
      $$invalidate(0, show = false);
    }
    $$self.$$set = ($$props2) => {
      if ("show" in $$props2)
        $$invalidate(0, show = $$props2.show);
      if ("$$scope" in $$props2)
        $$invalidate(2, $$scope = $$props2.$$scope);
    };
    return [show, handleClick, $$scope, slots];
  }
  var Modal = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance5, create_fragment8, safe_not_equal, { show: 0 }, add_css6);
    }
  };
  var Modal_default = Modal;

  // src/modules/E404.svelte
  function add_css7(target) {
    append_styles(target, "svelte-12yf9li", "article.svelte-12yf9li{text-align:center}");
  }
  function create_fragment9(ctx) {
    let article;
    return {
      c() {
        article = element("article");
        article.innerHTML = `<h1>404</h1> <h6>PAGE NOT FOUND</h6>`;
        attr(article, "class", "svelte-12yf9li");
      },
      m(target, anchor) {
        insert(target, article, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
      }
    };
  }
  var E404 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment9, safe_not_equal, {}, add_css7);
    }
  };
  var E404_default = E404;

  // src/modules/Footer.svelte
  function add_css8(target) {
    append_styles(target, "svelte-1h60z37", "strong.svelte-1h60z37{color:white}.footer.svelte-1h60z37{padding:1rem;color:white;background-color:#363636}");
  }
  function create_fragment10(ctx) {
    let footer;
    return {
      c() {
        footer = element("footer");
        footer.innerHTML = `<div class="content has-text-centered"><p>Copyright \xA9 2023
         <strong class="svelte-1h60z37">LPPM UISI</strong>. All Rights Reserved</p></div>`;
        attr(footer, "class", "footer svelte-1h60z37");
      },
      m(target, anchor) {
        insert(target, footer, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(footer);
        }
      }
    };
  }
  var Footer = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment10, safe_not_equal, {}, add_css8);
    }
  };
  var Footer_default = Footer;

  // ../node_modules/svelte/src/runtime/store/index.js
  var subscriber_queue = [];
  function writable(value, start = noop) {
    let stop;
    const subscribers = /* @__PURE__ */ new Set();
    function set(new_value) {
      if (safe_not_equal(value, new_value)) {
        value = new_value;
        if (stop) {
          const run_queue = !subscriber_queue.length;
          for (const subscriber of subscribers) {
            subscriber[1]();
            subscriber_queue.push(subscriber, value);
          }
          if (run_queue) {
            for (let i = 0; i < subscriber_queue.length; i += 2) {
              subscriber_queue[i][0](subscriber_queue[i + 1]);
            }
            subscriber_queue.length = 0;
          }
        }
      }
    }
    function update2(fn) {
      set(fn(value));
    }
    function subscribe2(run2, invalidate = noop) {
      const subscriber = [run2, invalidate];
      subscribers.add(subscriber);
      if (subscribers.size === 1) {
        stop = start(set, update2) || noop;
      }
      run2(value);
      return () => {
        subscribers.delete(subscriber);
        if (subscribers.size === 0 && stop) {
          stop();
          stop = null;
        }
      };
    }
    return { set, update: update2, subscribe: subscribe2 };
  }

  // src/store/index.js
  var route = writable(0);
  var isLogin = writable(false);

  // src/store/icons.js
  var accountAdd = "M15 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 1.9a2.1 2.1 0 1 1 0 4.2A2.1 2.1 0 0 1 12.9 8A2.1 2.1 0 0 1 15 5.9M4 7v3H1v2h3v3h2v-3h3v-2H6V7H4m11 6c-2.67 0-8 1.33-8 4v3h16v-3c0-2.67-5.33-4-8-4m0 1.9c2.97 0 6.1 1.46 6.1 2.1v1.1H8.9V17c0-.64 3.1-2.1 6.1-2.1Z";

  // src/modules/Navbarmenu.svelte
  function add_css9(target) {
    append_styles(target, "svelte-gab4e", "header.svelte-gab4e{z-index:100;position:fixed;top:0;left:0;right:0;height:3.5rem}nav.svelte-gab4e{padding:0 2rem;height:inherit}");
  }
  function create_else_block2(ctx) {
    let a;
    return {
      c() {
        a = element("a");
        a.textContent = "Login";
        attr(a, "class", "button is-white is-outlined is-rounded");
        attr(a, "href", "/login");
      },
      m(target, anchor) {
        insert(target, a, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(a);
        }
      }
    };
  }
  function create_if_block2(ctx) {
    let a;
    return {
      c() {
        a = element("a");
        a.textContent = "Logout";
        attr(a, "class", "button is-white is-outlined is-rounded");
        attr(a, "href", "/logout");
      },
      m(target, anchor) {
        insert(target, a, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(a);
        }
      }
    };
  }
  function create_fragment11(ctx) {
    let header;
    let nav;
    let div0;
    let a0;
    let t0;
    let a1;
    let t3;
    let div8;
    let div7;
    let a2;
    let t5;
    let a3;
    let t7;
    let div2;
    let t15;
    let div4;
    let t23;
    let div6;
    let div5;
    let mounted;
    let dispose;
    function select_block_type(ctx2, dirty) {
      if (
        /*$isLogin*/
        ctx2[1]
      )
        return create_if_block2;
      return create_else_block2;
    }
    let current_block_type = select_block_type(ctx, -1);
    let if_block = current_block_type(ctx);
    return {
      c() {
        header = element("header");
        nav = element("nav");
        div0 = element("div");
        a0 = element("a");
        a0.innerHTML = `<img src="http://pmb.uisi.ac.id/img/logos/logo-uisi-negatif.png" width="112" height="28" alt="Logo UISI"/>`;
        t0 = space();
        a1 = element("a");
        a1.innerHTML = `<span></span> <span></span> <span></span>`;
        t3 = space();
        div8 = element("div");
        div7 = element("div");
        a2 = element("a");
        a2.textContent = "Beranda";
        t5 = space();
        a3 = element("a");
        a3.textContent = "About UISI";
        t7 = space();
        div2 = element("div");
        div2.innerHTML = `<a class="navbar-link">Penelitian</a> <div class="navbar-dropdown"><a class="navbar-item" href="/penelitian">Penelitian Internal</a> <a class="navbar-item" href="/penelitian">Penelitian Eksternal</a> <a class="navbar-item" href="/penelitian">Penelitian Mandiri</a></div>`;
        t15 = space();
        div4 = element("div");
        div4.innerHTML = `<a class="navbar-link">Pengabdian Masyarakat</a> <div class="navbar-dropdown"><a class="navbar-item" href="/abdimas">Pengabdian Masyarakat Internal</a> <a class="navbar-item" href="/abdimas">Pengabdian Masyarakat Eksternal</a> <a class="navbar-item" href="/abdimas">Pengabdian Masyarakat Mandiri</a></div>`;
        t23 = space();
        div6 = element("div");
        div5 = element("div");
        if_block.c();
        attr(a0, "class", "navbar-item");
        attr(a0, "href", "/");
        attr(a1, "class", "navbar-burger");
        attr(a1, "id", "burger");
        attr(div0, "class", "navbar-brand");
        attr(a2, "class", "navbar-item");
        attr(a2, "href", "/");
        attr(a3, "class", "navbar-item");
        attr(a3, "href", "/about");
        attr(div2, "class", "navbar-item has-dropdown is-hoverable");
        attr(div4, "class", "navbar-item has-dropdown is-hoverable");
        attr(div5, "class", "buttons");
        attr(div6, "class", "navbar-item");
        attr(div7, "class", "navbar-end");
        attr(div8, "class", "navbar-menu");
        attr(div8, "id", "nav-links");
        attr(nav, "class", "navbar is-dark svelte-gab4e");
        attr(header, "class", "svelte-gab4e");
      },
      m(target, anchor) {
        insert(target, header, anchor);
        append(header, nav);
        append(nav, div0);
        append(div0, a0);
        append(div0, t0);
        append(div0, a1);
        append(nav, t3);
        append(nav, div8);
        append(div8, div7);
        append(div7, a2);
        append(div7, t5);
        append(div7, a3);
        append(div7, t7);
        append(div7, div2);
        append(div7, t15);
        append(div7, div4);
        append(div7, t23);
        append(div7, div6);
        append(div6, div5);
        if_block.m(div5, null);
        ctx[3](div8);
        if (!mounted) {
          dispose = listen(
            a1,
            "click",
            /*test*/
            ctx[2]
          );
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (current_block_type !== (current_block_type = select_block_type(ctx2, dirty))) {
          if_block.d(1);
          if_block = current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(div5, null);
          }
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(header);
        }
        if_block.d();
        ctx[3](null);
        mounted = false;
        dispose();
      }
    };
  }
  function instance6($$self, $$props, $$invalidate) {
    let $isLogin;
    component_subscribe($$self, isLogin, ($$value) => $$invalidate(1, $isLogin = $$value));
    let navbarMenu;
    function test() {
      navbarMenu.classList.toggle("is-active");
    }
    function div8_binding($$value) {
      binding_callbacks[$$value ? "unshift" : "push"](() => {
        navbarMenu = $$value;
        $$invalidate(0, navbarMenu);
      });
    }
    return [navbarMenu, $isLogin, test, div8_binding];
  }
  var Navbarmenu = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance6, create_fragment11, safe_not_equal, {}, add_css9);
    }
  };
  var Navbarmenu_default = Navbarmenu;

  // src/modules/Pengumuman.svelte
  function add_css10(target) {
    append_styles(target, "svelte-1k7wu1i", ".content.svelte-1k7wu1i.svelte-1k7wu1i.svelte-1k7wu1i.svelte-1k7wu1i{text-align:center}section.svelte-1k7wu1i.svelte-1k7wu1i.svelte-1k7wu1i.svelte-1k7wu1i{padding:60px 0}#accordion.svelte-1k7wu1i.svelte-1k7wu1i.svelte-1k7wu1i.svelte-1k7wu1i{list-style-type:none;margin:0;padding:0}#accordion.svelte-1k7wu1i li.svelte-1k7wu1i.svelte-1k7wu1i.svelte-1k7wu1i{width:100%;margin-bottom:10px;background:#f7f7f7;padding:10px;border-radius:10px}#accordion.svelte-1k7wu1i li label.svelte-1k7wu1i.svelte-1k7wu1i.svelte-1k7wu1i{padding:10px;display:flex;align-items:center;justify-content:space-between;font-size:18px;font-weight:500;cursor:pointer;color:#2dabf9}#accordion.svelte-1k7wu1i label.svelte-1k7wu1i+[hidden].svelte-1k7wu1i.svelte-1k7wu1i{display:none}#accordion.svelte-1k7wu1i label.svelte-1k7wu1i+[hidden].svelte-1k7wu1i:checked+.content.svelte-1k7wu1i{max-height:400px}#accordion.svelte-1k7wu1i .content.svelte-1k7wu1i.svelte-1k7wu1i.svelte-1k7wu1i{padding:0 10px;line-height:26px;max-height:0;overflow:hidden;transition:max-height 0.6s}");
  }
  function get_each_context2(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[2] = list[i];
    return child_ctx;
  }
  function create_each_block2(ctx) {
    let li;
    let label;
    let t0_value = (
      /*p*/
      ctx[2].title + ""
    );
    let t0;
    let label_for_value;
    let t1;
    let input;
    let input_id_value;
    let t2;
    let div;
    let p_1;
    let t4;
    return {
      c() {
        li = element("li");
        label = element("label");
        t0 = text(t0_value);
        t1 = space();
        input = element("input");
        t2 = space();
        div = element("div");
        p_1 = element("p");
        p_1.textContent = `${/*p*/
        ctx[2].content}`;
        t4 = space();
        attr(label, "for", label_for_value = /*p*/
        ctx[2].label);
        attr(label, "class", "svelte-1k7wu1i");
        input.hidden = true;
        attr(input, "type", "checkbox");
        attr(
          input,
          "name",
          /*accordionName*/
          ctx[0]
        );
        attr(input, "id", input_id_value = /*p*/
        ctx[2].idPengumuman);
        attr(input, "class", "svelte-1k7wu1i");
        attr(div, "class", "content svelte-1k7wu1i");
        attr(li, "class", "svelte-1k7wu1i");
      },
      m(target, anchor) {
        insert(target, li, anchor);
        append(li, label);
        append(label, t0);
        append(li, t1);
        append(li, input);
        append(li, t2);
        append(li, div);
        append(div, p_1);
        append(li, t4);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(li);
        }
      }
    };
  }
  function create_fragment12(ctx) {
    let section;
    let article;
    let div0;
    let t3;
    let br;
    let t4;
    let div1;
    let ul;
    let each_value = ensure_array_like(
      /*pengumuman*/
      ctx[1]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block2(get_each_context2(ctx, each_value, i));
    }
    return {
      c() {
        section = element("section");
        article = element("article");
        div0 = element("div");
        div0.innerHTML = `<h2>PENGUMUMAN</h2> <p>Daftar Pengumuman terkait kegiatan Penelitian &amp; Pengabdian
            Masyarakat LPPM UISI</p>`;
        t3 = space();
        br = element("br");
        t4 = space();
        div1 = element("div");
        ul = element("ul");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(div0, "class", "content svelte-1k7wu1i");
        attr(ul, "id", "accordion");
        attr(ul, "class", "svelte-1k7wu1i");
        attr(div1, "class", "list pengumuman");
        attr(article, "class", "container");
        attr(section, "class", "svelte-1k7wu1i");
      },
      m(target, anchor) {
        insert(target, section, anchor);
        append(section, article);
        append(article, div0);
        append(article, t3);
        append(article, br);
        append(article, t4);
        append(article, div1);
        append(div1, ul);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(ul, null);
          }
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*pengumuman, accordionName*/
        3) {
          each_value = ensure_array_like(
            /*pengumuman*/
            ctx2[1]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context2(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block2(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(ul, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(section);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function instance7($$self) {
    let accordionName;
    let pengumuman = [
      {
        label: "1",
        idPengumuman: "1",
        title: "Perpanjangan Batas Akhir Upload Proposal",
        content: " Pengumuman 1 : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam delectus ex dolorem, consequatur tenetur at cupiditate ab corporis quos sed. Deserunt qui nostrum ullam praesentium sed unde placeat, dolorum aliquid? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore asperiores blanditiis repellendus velit id? Doloribus dolor neque aut expedita, nam nostrum."
      },
      {
        label: "2",
        idPengumuman: "2",
        title: "Daftar proposal lolos pendanaan",
        content: " Pengumuman 2 : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam delectus ex dolorem, consequatur tenetur at cupiditate ab corporis quos sed. Deserunt qui nostrum ullam praesentium sed unde placeat, dolorum aliquid? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore asperiores blanditiis repellendus velit id? Doloribus dolor neque aut expedita, nam nostrum."
      },
      {
        label: "3",
        idPengumuman: "3",
        title: "Pembukaan Pendaftaran Proposal Penelitian & Pengabdian",
        content: " Pengumuman 3 : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam delectus ex dolorem, consequatur tenetur at cupiditate ab corporis quos sed. Deserunt qui nostrum ullam praesentium sed unde placeat, dolorum aliquid? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore asperiores blanditiis repellendus velit id? Doloribus dolor neque aut expedita, nam nostrum."
      }
    ];
    return [accordionName, pengumuman];
  }
  var Pengumuman = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance7, create_fragment12, safe_not_equal, {}, add_css10);
    }
  };
  var Pengumuman_default = Pengumuman;

  // src/store/menu.js
  var admin = [
    {
      title: "Dashboard",
      href: "/admin"
    },
    {
      title: "User Management",
      href: "/admin/users"
    },
    {
      title: "PPM Management",
      href: "/admin/proposals"
    },
    {
      title: "Logout",
      href: "/logout"
    }
  ];
  var dosen = [
    {
      title: "PPM Management",
      href: "/dosen"
    },
    {
      title: "Approval Management",
      href: "/dosen/approval"
    },
    {
      title: "Profile",
      href: "/dosen/profile"
    },
    {
      title: "Logout",
      href: "/logout"
    }
  ];
  var menu_default = {
    admin,
    dosen
  };

  // src/modules/Sidebar.svelte
  function add_css11(target) {
    append_styles(target, "svelte-isr0cy", ".menu-label.svelte-isr0cy{color:white}aside.svelte-isr0cy{padding-top:5rem;padding-left:1rem;padding-right:1rem;color:var(--sb-color);background:var(--sb-background);width:var(--wide);display:flex;flex-direction:column;position:fixed;top:0;bottom:0}a.svelte-isr0cy{color:white}");
  }
  function get_each_context3(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[2] = list[i];
    return child_ctx;
  }
  function create_each_block3(ctx) {
    let ul;
    let li;
    let a;
    let t_value = (
      /*item*/
      ctx[2].title + ""
    );
    let t;
    let a_href_value;
    return {
      c() {
        ul = element("ul");
        li = element("li");
        a = element("a");
        t = text(t_value);
        attr(a, "href", a_href_value = /*item*/
        ctx[2].href);
        attr(a, "class", "svelte-isr0cy");
        attr(ul, "class", "menu-list");
      },
      m(target, anchor) {
        insert(target, ul, anchor);
        append(ul, li);
        append(li, a);
        append(a, t);
      },
      p(ctx2, dirty) {
        if (dirty & /*items*/
        1 && t_value !== (t_value = /*item*/
        ctx2[2].title + ""))
          set_data(t, t_value);
        if (dirty & /*items*/
        1 && a_href_value !== (a_href_value = /*item*/
        ctx2[2].href)) {
          attr(a, "href", a_href_value);
        }
      },
      d(detaching) {
        if (detaching) {
          detach(ul);
        }
      }
    };
  }
  function create_fragment13(ctx) {
    let aside;
    let p0;
    let t1;
    let t2;
    let p1;
    let t4;
    let ul;
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block3(get_each_context3(ctx, each_value, i));
    }
    return {
      c() {
        aside = element("aside");
        p0 = element("p");
        p0.textContent = "General";
        t1 = space();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t2 = space();
        p1 = element("p");
        p1.textContent = "Website Settings";
        t4 = space();
        ul = element("ul");
        ul.innerHTML = `<li><a class="svelte-isr0cy">Pengumuman</a></li> <li><a class="svelte-isr0cy">About UISI</a></li>`;
        attr(p0, "class", "menu-label svelte-isr0cy");
        attr(p1, "class", "menu-label svelte-isr0cy");
        attr(ul, "class", "menu-list");
        attr(aside, "class", "menu svelte-isr0cy");
      },
      m(target, anchor) {
        insert(target, aside, anchor);
        append(aside, p0);
        append(aside, t1);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(aside, null);
          }
        }
        append(aside, t2);
        append(aside, p1);
        append(aside, t4);
        append(aside, ul);
      },
      p(ctx2, [dirty]) {
        if (dirty & /*items*/
        1) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context3(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block3(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(aside, t2);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(aside);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function instance8($$self, $$props, $$invalidate) {
    const role = localStorage.getItem("role");
    let items;
    if (role === "admin")
      items = menu_default["admin"];
    else
      items = menu_default["dosen"];
    return [items];
  }
  var Sidebar = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance8, create_fragment13, safe_not_equal, {}, add_css11);
    }
  };
  var Sidebar_default = Sidebar;

  // src/modules/Status.svelte
  function create_if_block_13(ctx) {
    let t;
    return {
      c() {
        t = text("Penelitian Selesai");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_if_block_12(ctx) {
    let t;
    return {
      c() {
        t = text("Penelitian Dimulai");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_if_block_11(ctx) {
    let t;
    return {
      c() {
        t = text("Ditolak Ka. Pusat Kajian");
      },
      m(target, anchor) {
        insert(target, t, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
      }
    };
  }
  function create_if_block_10(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Review Ka. Pusat Kajian";
        attr(span, "class", "tag is-info is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_9(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Revisi Ka. Pusat Kajian";
        attr(span, "class", "tag is-danger is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_8(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Review Reviewer";
        attr(span, "class", "tag is-info is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_7(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Revisi Reviewer";
        attr(span, "class", "tag is-danger is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_6(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Review Ka. LPPM";
        attr(span, "class", "tag is-info is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_5(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Revisi Ka. LPPM";
        attr(span, "class", "tag is-danger is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_42(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Review Ka. Departemen";
        attr(span, "class", "tag is-info is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_32(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Revisi Ka.Departemen";
        attr(span, "class", "tag is-danger is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_22(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Review Administrasi";
        attr(span, "class", "tag is-info is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block_14(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Revisi Proposal";
        attr(span, "class", "tag is-danger is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_if_block3(ctx) {
    let span;
    return {
      c() {
        span = element("span");
        span.textContent = "Draft Proposal";
        attr(span, "class", "tag is-light is-rounded");
      },
      m(target, anchor) {
        insert(target, span, anchor);
      },
      d(detaching) {
        if (detaching) {
          detach(span);
        }
      }
    };
  }
  function create_fragment14(ctx) {
    let if_block_anchor;
    function select_block_type(ctx2, dirty) {
      if (
        /*code*/
        ctx2[0] === 0
      )
        return create_if_block3;
      if (
        /*code*/
        ctx2[0] === 1
      )
        return create_if_block_14;
      if (
        /*code*/
        ctx2[0] === 2
      )
        return create_if_block_22;
      if (
        /*code*/
        ctx2[0] === 3
      )
        return create_if_block_32;
      if (
        /*code*/
        ctx2[0] === 4
      )
        return create_if_block_42;
      if (
        /*code*/
        ctx2[0] === 5
      )
        return create_if_block_5;
      if (
        /*code*/
        ctx2[0] === 6
      )
        return create_if_block_6;
      if (
        /*code*/
        ctx2[0] === 7
      )
        return create_if_block_7;
      if (
        /*code*/
        ctx2[0] === 8
      )
        return create_if_block_8;
      if (
        /*code*/
        ctx2[0] === 9
      )
        return create_if_block_9;
      if (
        /*code*/
        ctx2[0] === 10
      )
        return create_if_block_10;
      if (
        /*code*/
        ctx2[0] === 11
      )
        return create_if_block_11;
      if (
        /*code*/
        ctx2[0] === 12
      )
        return create_if_block_12;
      if (
        /*code*/
        ctx2[0] === 13
      )
        return create_if_block_13;
    }
    let current_block_type = select_block_type(ctx, -1);
    let if_block = current_block_type && current_block_type(ctx);
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
      },
      p(ctx2, [dirty]) {
        if (current_block_type !== (current_block_type = select_block_type(ctx2, dirty))) {
          if (if_block)
            if_block.d(1);
          if_block = current_block_type && current_block_type(ctx2);
          if (if_block) {
            if_block.c();
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block) {
          if_block.d(detaching);
        }
      }
    };
  }
  function instance9($$self, $$props, $$invalidate) {
    let { code } = $$props;
    $$self.$$set = ($$props2) => {
      if ("code" in $$props2)
        $$invalidate(0, code = $$props2.code);
    };
    return [code];
  }
  var Status = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance9, create_fragment14, safe_not_equal, { code: 0 });
    }
  };
  var Status_default = Status;

  // src/pages/Index.svelte
  function create_fragment15(ctx) {
    let hero;
    let t0;
    let pengumuman;
    let t1;
    let div0;
    let t5;
    let div1;
    let t9;
    let div2;
    let t13;
    let footer;
    let current;
    hero = new Hero_default({});
    pengumuman = new Pengumuman_default({});
    footer = new Footer_default({});
    return {
      c() {
        create_component(hero.$$.fragment);
        t0 = space();
        create_component(pengumuman.$$.fragment);
        t1 = space();
        div0 = element("div");
        div0.innerHTML = `This text is within a <strong>block</strong>.`;
        t5 = space();
        div1 = element("div");
        div1.innerHTML = `This text is within a <strong>second block</strong>. Lorem ipsum dolor sit
   amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla
   egestas. Nullam condimentum luctus turpis.`;
        t9 = space();
        div2 = element("div");
        div2.innerHTML = `This text is within a <strong>third block</strong>. This block has no margin
   at the bottom.`;
        t13 = space();
        create_component(footer.$$.fragment);
        attr(div0, "class", "block");
        attr(div1, "class", "block");
        attr(div2, "class", "block");
      },
      m(target, anchor) {
        mount_component(hero, target, anchor);
        insert(target, t0, anchor);
        mount_component(pengumuman, target, anchor);
        insert(target, t1, anchor);
        insert(target, div0, anchor);
        insert(target, t5, anchor);
        insert(target, div1, anchor);
        insert(target, t9, anchor);
        insert(target, div2, anchor);
        insert(target, t13, anchor);
        mount_component(footer, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(hero.$$.fragment, local);
        transition_in(pengumuman.$$.fragment, local);
        transition_in(footer.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(hero.$$.fragment, local);
        transition_out(pengumuman.$$.fragment, local);
        transition_out(footer.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(div0);
          detach(t5);
          detach(div1);
          detach(t9);
          detach(div2);
          detach(t13);
        }
        destroy_component(hero, detaching);
        destroy_component(pengumuman, detaching);
        destroy_component(footer, detaching);
      }
    };
  }
  var Index = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment15, safe_not_equal, {});
    }
  };
  var Index_default = Index;

  // src/pages/Login.svelte
  function add_css12(target) {
    append_styles(target, "svelte-1ohw7ce", '.gsi-material-button.svelte-1ohw7ce.svelte-1ohw7ce{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-webkit-appearance:none;background-color:#f2f2f2;background-image:none;border:1px solid var(--border, #dadce0);-webkit-border-radius:20px;border-radius:20px;-webkit-box-sizing:border-box;box-sizing:border-box;color:#1f1f1f;cursor:pointer;font-family:"Roboto", arial, sans-serif;font-size:14px;height:40px;letter-spacing:0.25px;outline:none;overflow:hidden;padding:0 12px;position:relative;text-align:center;-webkit-transition:background-color 0.218s,\r\n         border-color 0.218s,\r\n         box-shadow 0.218s;transition:background-color 0.218s,\r\n         border-color 0.218s,\r\n         box-shadow 0.218s;vertical-align:middle;white-space:nowrap}.gsi-material-button.svelte-1ohw7ce .gsi-material-button-icon.svelte-1ohw7ce{height:20px;margin-right:12px;min-width:20px;width:20px}.gsi-material-button.svelte-1ohw7ce .gsi-material-button-content-wrapper.svelte-1ohw7ce{-webkit-align-items:center;align-items:center;display:flex;-webkit-flex-direction:row;flex-direction:row;-webkit-flex-wrap:nowrap;flex-wrap:nowrap;height:100%;justify-content:space-between;position:relative;width:100%}.gsi-material-button.svelte-1ohw7ce .gsi-material-button-contents.svelte-1ohw7ce{-webkit-flex-grow:1;flex-grow:1;font-family:"Roboto", arial, sans-serif;font-weight:500;overflow:hidden;text-overflow:ellipsis;vertical-align:top}.gsi-material-button.svelte-1ohw7ce .gsi-material-button-state.svelte-1ohw7ce{-webkit-transition:opacity 0.218s;transition:opacity 0.218s;bottom:0;left:0;opacity:0;position:absolute;right:0;top:0}.gsi-material-button.svelte-1ohw7ce.svelte-1ohw7ce:disabled{cursor:default;background-color:#ffffff61}.gsi-material-button.svelte-1ohw7ce:disabled .gsi-material-button-state.svelte-1ohw7ce{background-color:#1f1f1f1f}.gsi-material-button.svelte-1ohw7ce:disabled .gsi-material-button-contents.svelte-1ohw7ce{opacity:38%}.gsi-material-button.svelte-1ohw7ce:disabled .gsi-material-button-icon.svelte-1ohw7ce{opacity:38%}.gsi-material-button.svelte-1ohw7ce:not(:disabled):active .gsi-material-button-state.svelte-1ohw7ce,.gsi-material-button.svelte-1ohw7ce:not(:disabled):focus .gsi-material-button-state.svelte-1ohw7ce{background-color:#001d35;opacity:12%}.gsi-material-button.svelte-1ohw7ce.svelte-1ohw7ce:not(:disabled):hover{-webkit-box-shadow:0 1px 2px 0 rgba(60, 64, 67, 0.3),\r\n         0 1px 3px 1px rgba(60, 64, 67, 0.15);box-shadow:0 1px 2px 0 rgba(60, 64, 67, 0.3),\r\n         0 1px 3px 1px rgba(60, 64, 67, 0.15)}.gsi-material-button.svelte-1ohw7ce:not(:disabled):hover .gsi-material-button-state.svelte-1ohw7ce{background-color:#001d35;opacity:8%}article.container.svelte-1ohw7ce.svelte-1ohw7ce{padding-top:10rem;text-align:center}div.box.svelte-1ohw7ce.svelte-1ohw7ce{display:inline-flex;flex-direction:column;gap:0.5rem}div.box.svelte-1ohw7ce div.svelte-1ohw7ce{text-align:left}button.svelte-1ohw7ce.svelte-1ohw7ce{width:100%}');
  }
  function create_fragment16(ctx) {
    let article;
    let div9;
    let h2;
    let t1;
    let div1;
    let div0;
    let t3;
    let input0;
    let t4;
    let div3;
    let div2;
    let t6;
    let input1;
    let t7;
    let div4;
    let br;
    let t8;
    let button0;
    let t10;
    let div8;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        article = element("article");
        div9 = element("div");
        h2 = element("h2");
        h2.textContent = "LOGIN";
        t1 = space();
        div1 = element("div");
        div0 = element("div");
        div0.textContent = "Username";
        t3 = space();
        input0 = element("input");
        t4 = space();
        div3 = element("div");
        div2 = element("div");
        div2.textContent = "Password";
        t6 = space();
        input1 = element("input");
        t7 = space();
        div4 = element("div");
        br = element("br");
        t8 = space();
        button0 = element("button");
        button0.textContent = "Submit";
        t10 = space();
        div8 = element("div");
        button1 = element("button");
        button1.innerHTML = `<div class="gsi-material-button-state svelte-1ohw7ce"></div> <div class="gsi-material-button-content-wrapper svelte-1ohw7ce"><div class="gsi-material-button-icon svelte-1ohw7ce"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg></div> <span class="gsi-material-button-contents svelte-1ohw7ce">Sign in with Google</span> <span style="display: none;">Sign in with Google</span></div>`;
        attr(div0, "class", "svelte-1ohw7ce");
        attr(input0, "type", "text");
        attr(div1, "class", "svelte-1ohw7ce");
        attr(div2, "class", "svelte-1ohw7ce");
        attr(input1, "type", "password");
        attr(div3, "class", "svelte-1ohw7ce");
        attr(button0, "class", "svelte-1ohw7ce");
        attr(div4, "class", "svelte-1ohw7ce");
        attr(button1, "class", "gsi-material-button svelte-1ohw7ce");
        attr(div8, "class", "svelte-1ohw7ce");
        attr(div9, "class", "box svelte-1ohw7ce");
        attr(article, "class", "container svelte-1ohw7ce");
      },
      m(target, anchor) {
        insert(target, article, anchor);
        append(article, div9);
        append(div9, h2);
        append(div9, t1);
        append(div9, div1);
        append(div1, div0);
        append(div1, t3);
        append(div1, input0);
        set_input_value(
          input0,
          /*username*/
          ctx[0]
        );
        append(div9, t4);
        append(div9, div3);
        append(div3, div2);
        append(div3, t6);
        append(div3, input1);
        set_input_value(
          input1,
          /*password*/
          ctx[1]
        );
        append(div9, t7);
        append(div9, div4);
        append(div4, br);
        append(div4, t8);
        append(div4, button0);
        append(div9, t10);
        append(div9, div8);
        append(div8, button1);
        if (!mounted) {
          dispose = [
            listen(
              input0,
              "input",
              /*input0_input_handler*/
              ctx[3]
            ),
            listen(
              input1,
              "input",
              /*input1_input_handler*/
              ctx[4]
            ),
            listen(
              button0,
              "click",
              /*handleSubmit*/
              ctx[2]
            ),
            listen(button1, "click", signGoogle)
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*username*/
        1 && input0.value !== /*username*/
        ctx2[0]) {
          set_input_value(
            input0,
            /*username*/
            ctx2[0]
          );
        }
        if (dirty & /*password*/
        2 && input1.value !== /*password*/
        ctx2[1]) {
          set_input_value(
            input1,
            /*password*/
            ctx2[1]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  async function signGoogle() {
    console.log("Sign google");
    location.pathname = "/api/auth/google";
    return;
  }
  function instance10($$self, $$props, $$invalidate) {
    let $route;
    let $isLogin;
    component_subscribe($$self, route, ($$value) => $$invalidate(5, $route = $$value));
    component_subscribe($$self, isLogin, ($$value) => $$invalidate(6, $isLogin = $$value));
    let username = "admin";
    let password = "1234";
    async function handleSubmit(ev) {
      const payload = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      };
      const response = await fetch("/api/auth", payload);
      const result = await response.json();
      if (result.sukses) {
        set_store_value(isLogin, $isLogin = true, $isLogin);
        const { id, username: username2, role, token } = result;
        localStorage.setItem("id", id);
        localStorage.setItem("username", username2);
        localStorage.setItem("role", role);
        localStorage.setItem("token", token);
        if (role === "admin")
          $route("/admin");
        else
          $route("/dosen");
      }
    }
    function input0_input_handler() {
      username = this.value;
      $$invalidate(0, username);
    }
    function input1_input_handler() {
      password = this.value;
      $$invalidate(1, password);
    }
    return [username, password, handleSubmit, input0_input_handler, input1_input_handler];
  }
  var Login = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance10, create_fragment16, safe_not_equal, {}, add_css12);
    }
  };
  var Login_default = Login;

  // src/pages/Logout.svelte
  function add_css13(target) {
    append_styles(target, "svelte-ppcz1w", "article.svelte-ppcz1w{margin:0 auto;text-align:center}");
  }
  function create_fragment17(ctx) {
    let article;
    return {
      c() {
        article = element("article");
        article.innerHTML = `<h3>TERIMA KASIH</h3> <p>Karena anda sudah menggunakan aplikasi ini.</p>`;
        attr(article, "class", "svelte-ppcz1w");
      },
      m(target, anchor) {
        insert(target, article, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
      }
    };
  }
  function instance11($$self, $$props, $$invalidate) {
    let $isLogin;
    component_subscribe($$self, isLogin, ($$value) => $$invalidate(0, $isLogin = $$value));
    localStorage.clear();
    set_store_value(isLogin, $isLogin = false, $isLogin);
    setTimeout(
      () => {
        location.pathname = "/";
      },
      500
    );
    return [];
  }
  var Logout = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance11, create_fragment17, safe_not_equal, {}, add_css13);
    }
  };
  var Logout_default = Logout;

  // src/pages/Penelitian.svelte
  function add_css14(target) {
    append_styles(target, "svelte-1hdo9mq", ".container.svelte-1hdo9mq{margin-top:3.5rem}article.svelte-1hdo9mq{text-align:center}");
  }
  function create_fragment18(ctx) {
    let article;
    return {
      c() {
        article = element("article");
        article.innerHTML = `<h1>Penelitian</h1> <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos repellendus
      nulla soluta odio. Aspernatur deleniti cumque, fugit tempore molestias
      iste eligendi quaerat fugiat esse voluptas! Rerum, sed! Obcaecati, magnam
      eligendi.</p>`;
        attr(article, "class", "container svelte-1hdo9mq");
      },
      m(target, anchor) {
        insert(target, article, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
      }
    };
  }
  var Penelitian = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment18, safe_not_equal, {}, add_css14);
    }
  };
  var Penelitian_default = Penelitian;

  // src/pages/Register.svelte
  function add_css15(target) {
    append_styles(target, "svelte-f1u2iy", "article.container.svelte-f1u2iy.svelte-f1u2iy{text-align:center}div.box.svelte-f1u2iy.svelte-f1u2iy{display:inline-flex;flex-direction:column;gap:0.5rem}div.box.svelte-f1u2iy div.svelte-f1u2iy{text-align:left}button.svelte-f1u2iy.svelte-f1u2iy{width:100%}");
  }
  function create_fragment19(ctx) {
    let article;
    let div5;
    let h2;
    let t1;
    let div1;
    let div0;
    let t3;
    let input0;
    let t4;
    let div3;
    let div2;
    let t6;
    let input1;
    let t7;
    let div4;
    let br;
    let t8;
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        article = element("article");
        div5 = element("div");
        h2 = element("h2");
        h2.textContent = "REGISTER";
        t1 = space();
        div1 = element("div");
        div0 = element("div");
        div0.textContent = "Username";
        t3 = space();
        input0 = element("input");
        t4 = space();
        div3 = element("div");
        div2 = element("div");
        div2.textContent = "Email";
        t6 = space();
        input1 = element("input");
        t7 = space();
        div4 = element("div");
        br = element("br");
        t8 = space();
        button = element("button");
        button.textContent = "Register";
        attr(div0, "class", "svelte-f1u2iy");
        attr(input0, "type", "text");
        attr(div1, "class", "svelte-f1u2iy");
        attr(div2, "class", "svelte-f1u2iy");
        attr(input1, "type", "email");
        attr(div3, "class", "svelte-f1u2iy");
        attr(button, "class", "svelte-f1u2iy");
        attr(div4, "class", "svelte-f1u2iy");
        attr(div5, "class", "box svelte-f1u2iy");
        attr(article, "class", "container svelte-f1u2iy");
      },
      m(target, anchor) {
        insert(target, article, anchor);
        append(article, div5);
        append(div5, h2);
        append(div5, t1);
        append(div5, div1);
        append(div1, div0);
        append(div1, t3);
        append(div1, input0);
        set_input_value(
          input0,
          /*username*/
          ctx[0]
        );
        append(div5, t4);
        append(div5, div3);
        append(div3, div2);
        append(div3, t6);
        append(div3, input1);
        set_input_value(
          input1,
          /*email*/
          ctx[1]
        );
        append(div5, t7);
        append(div5, div4);
        append(div4, br);
        append(div4, t8);
        append(div4, button);
        if (!mounted) {
          dispose = [
            listen(
              input0,
              "input",
              /*input0_input_handler*/
              ctx[3]
            ),
            listen(
              input1,
              "input",
              /*input1_input_handler*/
              ctx[4]
            ),
            listen(
              button,
              "click",
              /*handleSubmit*/
              ctx[2]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*username*/
        1 && input0.value !== /*username*/
        ctx2[0]) {
          set_input_value(
            input0,
            /*username*/
            ctx2[0]
          );
        }
        if (dirty & /*email*/
        2 && input1.value !== /*email*/
        ctx2[1]) {
          set_input_value(
            input1,
            /*email*/
            ctx2[1]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance12($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(5, $route = $$value));
    let username = "dosen";
    let email = "";
    async function handleSubmit(ev) {
      const payload = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email })
      };
      const response = await fetch("/api/user", payload);
      const result = await response.json();
      if (response.ok) {
        console.log(result);
        localStorage.setItem("code", result.code);
        $route("/verify");
      } else {
        console.log(result);
      }
    }
    function input0_input_handler() {
      username = this.value;
      $$invalidate(0, username);
    }
    function input1_input_handler() {
      email = this.value;
      $$invalidate(1, email), $$invalidate(0, username);
    }
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*username*/
      1) {
        $:
          username, $$invalidate(1, email = username + "@pt.ac.id");
      }
    };
    return [username, email, handleSubmit, input0_input_handler, input1_input_handler];
  }
  var Register = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance12, create_fragment19, safe_not_equal, {}, add_css15);
    }
  };
  var Register_default = Register;

  // src/pages/Verify.svelte
  function add_css16(target) {
    append_styles(target, "svelte-f1u2iy", "article.container.svelte-f1u2iy.svelte-f1u2iy{text-align:center}div.box.svelte-f1u2iy.svelte-f1u2iy{display:inline-flex;flex-direction:column;gap:0.5rem}div.box.svelte-f1u2iy div.svelte-f1u2iy{text-align:left}button.svelte-f1u2iy.svelte-f1u2iy{width:100%}");
  }
  function create_fragment20(ctx) {
    let article;
    let div7;
    let h2;
    let t1;
    let p;
    let t2;
    let b;
    let t3;
    let t4;
    let div1;
    let div0;
    let t6;
    let input0;
    let t7;
    let div3;
    let div2;
    let t9;
    let input1;
    let t10;
    let div5;
    let div4;
    let t12;
    let input2;
    let t13;
    let div6;
    let br;
    let t14;
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        article = element("article");
        div7 = element("div");
        h2 = element("h2");
        h2.textContent = "VERIFY USER";
        t1 = space();
        p = element("p");
        t2 = text("Code: ");
        b = element("b");
        t3 = text(
          /*code*/
          ctx[1]
        );
        t4 = space();
        div1 = element("div");
        div0 = element("div");
        div0.textContent = "Username";
        t6 = space();
        input0 = element("input");
        t7 = space();
        div3 = element("div");
        div2 = element("div");
        div2.textContent = "Code";
        t9 = space();
        input1 = element("input");
        t10 = space();
        div5 = element("div");
        div4 = element("div");
        div4.textContent = "Password";
        t12 = space();
        input2 = element("input");
        t13 = space();
        div6 = element("div");
        br = element("br");
        t14 = space();
        button = element("button");
        button.textContent = "Verify";
        attr(div0, "class", "svelte-f1u2iy");
        attr(input0, "type", "text");
        attr(div1, "class", "svelte-f1u2iy");
        attr(div2, "class", "svelte-f1u2iy");
        attr(input1, "type", "text");
        attr(div3, "class", "svelte-f1u2iy");
        attr(div4, "class", "svelte-f1u2iy");
        attr(input2, "type", "password");
        attr(div5, "class", "svelte-f1u2iy");
        attr(button, "class", "svelte-f1u2iy");
        attr(div6, "class", "svelte-f1u2iy");
        attr(div7, "class", "box svelte-f1u2iy");
        attr(article, "class", "container svelte-f1u2iy");
      },
      m(target, anchor) {
        insert(target, article, anchor);
        append(article, div7);
        append(div7, h2);
        append(div7, t1);
        append(div7, p);
        append(p, t2);
        append(p, b);
        append(b, t3);
        append(div7, t4);
        append(div7, div1);
        append(div1, div0);
        append(div1, t6);
        append(div1, input0);
        set_input_value(
          input0,
          /*username*/
          ctx[0]
        );
        append(div7, t7);
        append(div7, div3);
        append(div3, div2);
        append(div3, t9);
        append(div3, input1);
        set_input_value(
          input1,
          /*code*/
          ctx[1]
        );
        append(div7, t10);
        append(div7, div5);
        append(div5, div4);
        append(div5, t12);
        append(div5, input2);
        set_input_value(
          input2,
          /*password*/
          ctx[2]
        );
        append(div7, t13);
        append(div7, div6);
        append(div6, br);
        append(div6, t14);
        append(div6, button);
        if (!mounted) {
          dispose = [
            listen(
              input0,
              "input",
              /*input0_input_handler*/
              ctx[4]
            ),
            listen(
              input1,
              "input",
              /*input1_input_handler*/
              ctx[5]
            ),
            listen(
              input2,
              "input",
              /*input2_input_handler*/
              ctx[6]
            ),
            listen(
              button,
              "click",
              /*handleSubmit*/
              ctx[3]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, [dirty]) {
        if (dirty & /*code*/
        2)
          set_data(
            t3,
            /*code*/
            ctx2[1]
          );
        if (dirty & /*username*/
        1 && input0.value !== /*username*/
        ctx2[0]) {
          set_input_value(
            input0,
            /*username*/
            ctx2[0]
          );
        }
        if (dirty & /*code*/
        2 && input1.value !== /*code*/
        ctx2[1]) {
          set_input_value(
            input1,
            /*code*/
            ctx2[1]
          );
        }
        if (dirty & /*password*/
        4 && input2.value !== /*password*/
        ctx2[2]) {
          set_input_value(
            input2,
            /*password*/
            ctx2[2]
          );
        }
      },
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function instance13($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(7, $route = $$value));
    let username = "dosen";
    let code = localStorage.getItem("code");
    let password = "1234";
    async function handleSubmit(ev) {
      const payload = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, code, password })
      };
      const response = await fetch("/api/verify", payload);
      if (response.status === 204) {
        console.log("Gagal");
      } else if (response.status === 200) {
        console.log("sukses");
        $route("/login");
      }
    }
    function input0_input_handler() {
      username = this.value;
      $$invalidate(0, username);
    }
    function input1_input_handler() {
      code = this.value;
      $$invalidate(1, code);
    }
    function input2_input_handler() {
      password = this.value;
      $$invalidate(2, password);
    }
    return [
      username,
      code,
      password,
      handleSubmit,
      input0_input_handler,
      input1_input_handler,
      input2_input_handler
    ];
  }
  var Verify = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance13, create_fragment20, safe_not_equal, {}, add_css16);
    }
  };
  var Verify_default = Verify;

  // src/pages/admin/pages.js
  var pages_exports = {};
  __export(pages_exports, {
    createuser: () => createuser_default,
    home: () => home_default,
    pengumuman: () => pengumuman_default,
    profile: () => profile_default,
    proposal: () => proposal_default,
    proposals: () => proposals_default,
    users: () => users_default
  });

  // src/pages/admin/+createuser.svelte
  function create_default_slot(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let div1;
    let t5;
    let div3;
    let t8;
    let div6;
    let label2;
    let t10;
    let div5;
    let div4;
    let select;
    let option0;
    let option1;
    let option2;
    let option3;
    let option4;
    let t16;
    let br;
    let t17;
    let div9;
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Create User";
        t1 = space();
        hr = element("hr");
        t2 = space();
        div1 = element("div");
        div1.innerHTML = `<label class="label">Username</label> <div class="control"><input class="input" type="text" placeholder="Username..."/></div>`;
        t5 = space();
        div3 = element("div");
        div3.innerHTML = `<label class="label">Password</label> <div class="control"><input class="input" type="text" placeholder="Password..."/></div>`;
        t8 = space();
        div6 = element("div");
        label2 = element("label");
        label2.textContent = "Role";
        t10 = space();
        div5 = element("div");
        div4 = element("div");
        select = element("select");
        option0 = element("option");
        option0.textContent = "Ka.Departemen";
        option1 = element("option");
        option1.textContent = "Ka.LPPM";
        option2 = element("option");
        option2.textContent = "Ka.PusatKajian";
        option3 = element("option");
        option3.textContent = "Reviewer";
        option4 = element("option");
        option4.textContent = "Dosen";
        t16 = space();
        br = element("br");
        t17 = space();
        div9 = element("div");
        div9.innerHTML = `<div class="control"><button class="button is-info is-light">Kembali</button></div> <div class="control"><button class="button is-info">Create</button></div>`;
        attr(h1, "class", "title is-1");
        attr(div1, "class", "field");
        attr(div3, "class", "field");
        attr(label2, "class", "label");
        option0.__value = "Ka.Departemen";
        set_input_value(option0, option0.__value);
        option1.__value = "Ka.LPPM";
        set_input_value(option1, option1.__value);
        option2.__value = "Ka.PusatKajian";
        set_input_value(option2, option2.__value);
        option3.__value = "Reviewer";
        set_input_value(option3, option3.__value);
        option4.__value = "Dosen";
        set_input_value(option4, option4.__value);
        attr(div4, "class", "select");
        attr(div5, "class", "control");
        attr(div6, "class", "field");
        attr(div9, "class", "field is-grouped");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, div1, anchor);
        insert(target, t5, anchor);
        insert(target, div3, anchor);
        insert(target, t8, anchor);
        insert(target, div6, anchor);
        append(div6, label2);
        append(div6, t10);
        append(div6, div5);
        append(div5, div4);
        append(div4, select);
        append(select, option0);
        append(select, option1);
        append(select, option2);
        append(select, option3);
        append(select, option4);
        insert(target, t16, anchor);
        insert(target, br, anchor);
        insert(target, t17, anchor);
        insert(target, div9, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(div1);
          detach(t5);
          detach(div3);
          detach(t8);
          detach(div6);
          detach(t16);
          detach(br);
          detach(t17);
          detach(div9);
        }
      }
    };
  }
  function create_fragment21(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const article_changes = {};
        if (dirty & /*$$scope*/
        4) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function instance14($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(0, $route = $$value));
    function addUser() {
      $route("/admin/users");
    }
    return [];
  }
  var Createuser = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance14, create_fragment21, safe_not_equal, {});
    }
  };
  var createuser_default = Createuser;

  // src/pages/admin/+home.svelte
  function add_css17(target) {
    append_styles(target, "svelte-18wwe8f", "#orang{color:#b8b8b8}");
  }
  function create_default_slot2(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let p;
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Dashboard";
        t1 = space();
        hr = element("hr");
        t2 = space();
        p = element("p");
        p.textContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga dolorum\r\n      inventore eius ratione. Animi, aperiam dolore. Aut iure earum reiciendis\r\n      iste rerum eveniet tempora nisi porro, animi molestiae obcaecati unde?";
        attr(h1, "class", "title is-1");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, p, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(p);
        }
      }
    };
  }
  function create_fragment22(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot2] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const article_changes = {};
        if (dirty & /*$$scope*/
        1) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  var Home = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment22, safe_not_equal, {}, add_css17);
    }
  };
  var home_default = Home;

  // src/pages/admin/+pengumuman.svelte
  function create_default_slot3(ctx) {
    let h1;
    let t1;
    let p;
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Pengumuman";
        t1 = space();
        p = element("p");
        p.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur cum\r\n      dicta voluptatibus sequi! Saepe eos quo et incidunt mollitia assumenda,\r\n      quis, dolore voluptates aut, consectetur ad eaque soluta explicabo sit.";
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, p, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(p);
        }
      }
    };
  }
  function create_fragment23(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot3] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const article_changes = {};
        if (dirty & /*$$scope*/
        1) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  var Pengumuman2 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, null, create_fragment23, safe_not_equal, {});
    }
  };
  var pengumuman_default = Pengumuman2;

  // src/pages/admin/+profile.svelte
  function get_each_context4(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[7] = list[i];
    child_ctx[8] = list;
    child_ctx[9] = i;
    return child_ctx;
  }
  function create_if_block4(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot4] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty & /*$$scope, msgNip, items*/
        1027) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function create_each_block4(ctx) {
    let field;
    let updating_value;
    let current;
    function field_value_binding(value) {
      ctx[4](
        value,
        /*item*/
        ctx[7]
      );
    }
    let field_props = { name: (
      /*item*/
      ctx[7].field
    ) };
    if (
      /*item*/
      ctx[7].value !== void 0
    ) {
      field_props.value = /*item*/
      ctx[7].value;
    }
    field = new Field_default({ props: field_props });
    binding_callbacks.push(() => bind(field, "value", field_value_binding));
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        const field_changes = {};
        if (dirty & /*items*/
        1)
          field_changes.name = /*item*/
          ctx[7].field;
        if (!updating_value && dirty & /*items*/
        1) {
          updating_value = true;
          field_changes.value = /*item*/
          ctx[7].value;
          add_flush_callback(() => updating_value = false);
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_if_block_15(ctx) {
    let p;
    let small;
    let t;
    return {
      c() {
        p = element("p");
        small = element("small");
        t = text(
          /*msgNip*/
          ctx[1]
        );
      },
      m(target, anchor) {
        insert(target, p, anchor);
        append(p, small);
        append(small, t);
      },
      p(ctx2, dirty) {
        if (dirty & /*msgNip*/
        2)
          set_data(
            t,
            /*msgNip*/
            ctx2[1]
          );
      },
      d(detaching) {
        if (detaching) {
          detach(p);
        }
      }
    };
  }
  function create_default_slot_1(ctx) {
    let button0;
    let t1;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        button0 = element("button");
        button0.textContent = "Kembali";
        t1 = space();
        button1 = element("button");
        button1.textContent = "Simpan";
        attr(button0, "class", "button is-info is-light");
        attr(button1, "class", "button is-info");
      },
      m(target, anchor) {
        insert(target, button0, anchor);
        insert(target, t1, anchor);
        insert(target, button1, anchor);
        if (!mounted) {
          dispose = listen(
            button1,
            "click",
            /*simpan*/
            ctx[2]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(button0);
          detach(t1);
          detach(button1);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot4(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let br0;
    let t3;
    let t4;
    let t5;
    let br1;
    let t6;
    let field;
    let current;
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block4(get_each_context4(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    let if_block = (
      /*msgNip*/
      ctx[1] && create_if_block_15(ctx)
    );
    field = new Field_default({
      props: {
        $$slots: { default: [create_default_slot_1] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Profile";
        t1 = space();
        hr = element("hr");
        t2 = space();
        br0 = element("br");
        t3 = space();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t4 = space();
        if (if_block)
          if_block.c();
        t5 = space();
        br1 = element("br");
        t6 = space();
        create_component(field.$$.fragment);
        attr(h1, "class", "title is-1");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, br0, anchor);
        insert(target, t3, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, t4, anchor);
        if (if_block)
          if_block.m(target, anchor);
        insert(target, t5, anchor);
        insert(target, br1, anchor);
        insert(target, t6, anchor);
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*items*/
        1) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context4(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block4(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(t4.parentNode, t4);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        if (
          /*msgNip*/
          ctx2[1]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
          } else {
            if_block = create_if_block_15(ctx2);
            if_block.c();
            if_block.m(t5.parentNode, t5);
          }
        } else if (if_block) {
          if_block.d(1);
          if_block = null;
        }
        const field_changes = {};
        if (dirty & /*$$scope*/
        1024) {
          field_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(br0);
          detach(t3);
          detach(t4);
          detach(t5);
          detach(br1);
          detach(t6);
        }
        destroy_each(each_blocks, detaching);
        if (if_block)
          if_block.d(detaching);
        destroy_component(field, detaching);
      }
    };
  }
  function create_fragment24(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*items*/
      ctx[0] && create_if_block4(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (
          /*items*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block4(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function instance15($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(5, $route = $$value));
    let { params } = $$props;
    let items;
    const id = params["1"];
    let msgNip2;
    onMount(async () => {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      const response = await fetch("/api/user/" + id, { method: "GET", headers });
      const result = await response.json();
      if (response.ok) {
        $$invalidate(0, items = []);
        for (const [field, value] of Object.entries(result[0])) {
          items.push({ field, value });
        }
      }
    });
    async function simpan() {
      let payload = {};
      $$invalidate(1, msgNip2 = "");
      items.map((item) => {
        if (item.field === "id") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.id = Number(item.value);
          }
        }
        if (item.field === "uid") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.uid = Number(item.value);
          }
        }
        if (item.field === "nama_lengkap") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.nama_lengkap = item.value;
          }
        }
        if (item.field === "nip") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
            $$invalidate(1, msgNip2 = "Entri berisikan huruf");
          } else {
            payload.nip = Number(item.value);
          }
        }
        if (item.field === "nidn") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.nidn = Number(item.value);
          }
        }
        if (item.field === "tempat_lahir") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.tempat_lahir = item.value;
          }
        }
        if (item.field === "tanggal_lahir") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.tanggal_lahir = Number(item.value);
          }
        }
        if (item.field === "alamat_rumah") {
          payload.alamat_rumah = item.value;
        }
        if (item.field === "alamat_kantor") {
          payload.alamat_kantor = item.value;
        }
        if (item.field === "nomor_handphone") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.nomor_handphone = Number(item.value);
          }
        }
        if (item.field === "nomor_whatsapp") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.nomor_whatsapp = Number(item.value);
          }
        }
        if (item.field === "perguruan_tinggi_asal") {
          payload.perguruan_tinggi_asal = item.value;
        }
        if (item.field === "program_studi") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.program_studi = item.value;
          }
        }
        if (item.field === "jabatan_fungsional") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.jabatan_fungsional = item.value;
          }
        }
        if (item.field === "pangkat_golongan") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.pangkat_golongan = item.value;
          }
        }
      });
      const response = await fetch("/api/userprofile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/admin/proposals");
      } else {
        console.log(response);
      }
    }
    function field_value_binding(value, item) {
      if ($$self.$$.not_equal(item.value, value)) {
        item.value = value;
        $$invalidate(0, items);
      }
    }
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(3, params = $$props2.params);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*params*/
      8) {
        $:
          params;
      }
    };
    return [items, msgNip2, simpan, params, field_value_binding];
  }
  var Profile = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance15, create_fragment24, safe_not_equal, { params: 3 });
    }
  };
  var profile_default = Profile;

  // src/pages/admin/+proposal.svelte
  function get_each_context5(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[33] = list[i];
    return child_ctx;
  }
  function create_if_block5(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot_12] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty[0] & /*kpkSelected, ka_pusat_kajian, reviewerSelected, reviewer, klppmSelected, ka_lppm, kdeptSelected, ka_departemen, comment, items*/
        1983 | dirty[1] & /*$$scope*/
        32) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function create_if_block_16(ctx) {
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [create_if_block_23, create_if_block_33, create_else_block3];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (
        /*item*/
        ctx2[33].field === "uid"
      )
        return 0;
      if (
        /*item*/
        ctx2[33].field === "status"
      )
        return 1;
      return 2;
    }
    current_block_type_index = select_block_type(ctx, [-1, -1]);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if_blocks[current_block_type_index].d(detaching);
      }
    };
  }
  function create_else_block3(ctx) {
    let field;
    let current;
    field = new Field_default({
      props: {
        view: true,
        name: (
          /*item*/
          ctx[33].field
        ),
        value: (
          /*item*/
          ctx[33].value
        )
      }
    });
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field_changes = {};
        if (dirty[0] & /*items*/
        1)
          field_changes.name = /*item*/
          ctx2[33].field;
        if (dirty[0] & /*items*/
        1)
          field_changes.value = /*item*/
          ctx2[33].value;
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_if_block_33(ctx) {
    let field;
    let current;
    field = new Field_default({
      props: {
        view: true,
        name: (
          /*item*/
          ctx[33].field
        ),
        $$slots: { default: [create_default_slot_3] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field_changes = {};
        if (dirty[0] & /*items*/
        1)
          field_changes.name = /*item*/
          ctx2[33].field;
        if (dirty[0] & /*items*/
        1 | dirty[1] & /*$$scope*/
        32) {
          field_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_if_block_23(ctx) {
    let field;
    let current;
    field = new Field_default({
      props: {
        view: true,
        name: (
          /*item*/
          ctx[33].field
        ),
        value: (
          /*item*/
          ctx[33].value
        ),
        href: "/admin/profile/" + /*item*/
        ctx[33].value
      }
    });
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field_changes = {};
        if (dirty[0] & /*items*/
        1)
          field_changes.name = /*item*/
          ctx2[33].field;
        if (dirty[0] & /*items*/
        1)
          field_changes.value = /*item*/
          ctx2[33].value;
        if (dirty[0] & /*items*/
        1)
          field_changes.href = "/admin/profile/" + /*item*/
          ctx2[33].value;
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_default_slot_3(ctx) {
    let status_1;
    let current;
    status_1 = new Status_default({ props: { code: (
      /*item*/
      ctx[33].value
    ) } });
    return {
      c() {
        create_component(status_1.$$.fragment);
      },
      m(target, anchor) {
        mount_component(status_1, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const status_1_changes = {};
        if (dirty[0] & /*items*/
        1)
          status_1_changes.code = /*item*/
          ctx2[33].value;
        status_1.$set(status_1_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(status_1.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(status_1.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(status_1, detaching);
      }
    };
  }
  function create_each_block5(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*item*/
      ctx[33].field !== "comment" && /*item*/
      ctx[33].field !== "uid_kdept" && /*item*/
      ctx[33].field !== "uid_klppm" && /*item*/
      ctx[33].field !== "uid_kpk" && /*item*/
      ctx[33].field !== "uid_reviewer" && /*item*/
      ctx[33].field !== "update" && create_if_block_16(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*item*/
          ctx2[33].field !== "comment" && /*item*/
          ctx2[33].field !== "uid_kdept" && /*item*/
          ctx2[33].field !== "uid_klppm" && /*item*/
          ctx2[33].field !== "uid_kpk" && /*item*/
          ctx2[33].field !== "uid_reviewer" && /*item*/
          ctx2[33].field !== "update"
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty[0] & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_16(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_default_slot_2(ctx) {
    let button0;
    let t1;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        button0 = element("button");
        button0.textContent = "Revisi";
        t1 = space();
        button1 = element("button");
        button1.textContent = "Proses";
        attr(button0, "class", "button is-warning");
        attr(button1, "class", "button is-info");
      },
      m(target, anchor) {
        insert(target, button0, anchor);
        insert(target, t1, anchor);
        insert(target, button1, anchor);
        if (!mounted) {
          dispose = [
            listen(
              button0,
              "click",
              /*handleRevisi*/
              ctx[11]
            ),
            listen(
              button1,
              "click",
              /*handlePass*/
              ctx[12]
            )
          ];
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(button0);
          detach(t1);
          detach(button1);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot_12(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let br0;
    let t3;
    let t4;
    let field0;
    let updating_value;
    let t5;
    let field1;
    let updating_value_1;
    let updating_selected;
    let t6;
    let field2;
    let updating_value_2;
    let updating_selected_1;
    let t7;
    let field3;
    let updating_value_3;
    let updating_selected_2;
    let t8;
    let field4;
    let updating_value_4;
    let updating_selected_3;
    let t9;
    let br1;
    let t10;
    let field5;
    let current;
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block5(get_each_context5(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    function field0_value_binding(value) {
      ctx[14](value);
    }
    let field0_props = { name: "Comment", textarea: true };
    if (
      /*comment*/
      ctx[1] !== void 0
    ) {
      field0_props.value = /*comment*/
      ctx[1];
    }
    field0 = new Field_default({ props: field0_props });
    binding_callbacks.push(() => bind(field0, "value", field0_value_binding));
    function field1_value_binding(value) {
      ctx[15](value);
    }
    function field1_selected_binding(value) {
      ctx[16](value);
    }
    let field1_props = {
      name: "Ka. Departemen",
      select: true,
      view: true,
      userId: (
        /*kdeptSelected*/
        ctx[7]
      )
    };
    if (
      /*ka_departemen*/
      ctx[2] !== void 0
    ) {
      field1_props.value = /*ka_departemen*/
      ctx[2];
    }
    if (
      /*kdeptSelected*/
      ctx[7] !== void 0
    ) {
      field1_props.selected = /*kdeptSelected*/
      ctx[7];
    }
    field1 = new Field_default({ props: field1_props });
    binding_callbacks.push(() => bind(field1, "value", field1_value_binding));
    binding_callbacks.push(() => bind(field1, "selected", field1_selected_binding));
    function field2_value_binding(value) {
      ctx[17](value);
    }
    function field2_selected_binding(value) {
      ctx[18](value);
    }
    let field2_props = {
      name: "Ka. LPPM",
      select: true,
      view: true,
      userId: (
        /*klppmSelected*/
        ctx[8]
      )
    };
    if (
      /*ka_lppm*/
      ctx[3] !== void 0
    ) {
      field2_props.value = /*ka_lppm*/
      ctx[3];
    }
    if (
      /*klppmSelected*/
      ctx[8] !== void 0
    ) {
      field2_props.selected = /*klppmSelected*/
      ctx[8];
    }
    field2 = new Field_default({ props: field2_props });
    binding_callbacks.push(() => bind(field2, "value", field2_value_binding));
    binding_callbacks.push(() => bind(field2, "selected", field2_selected_binding));
    function field3_value_binding(value) {
      ctx[19](value);
    }
    function field3_selected_binding(value) {
      ctx[20](value);
    }
    let field3_props = {
      name: "Reviewer",
      select: true,
      view: true,
      userId: (
        /*reviewerSelected*/
        ctx[10]
      )
    };
    if (
      /*reviewer*/
      ctx[4] !== void 0
    ) {
      field3_props.value = /*reviewer*/
      ctx[4];
    }
    if (
      /*reviewerSelected*/
      ctx[10] !== void 0
    ) {
      field3_props.selected = /*reviewerSelected*/
      ctx[10];
    }
    field3 = new Field_default({ props: field3_props });
    binding_callbacks.push(() => bind(field3, "value", field3_value_binding));
    binding_callbacks.push(() => bind(field3, "selected", field3_selected_binding));
    function field4_value_binding(value) {
      ctx[21](value);
    }
    function field4_selected_binding(value) {
      ctx[22](value);
    }
    let field4_props = {
      name: "Ka. Pusat Kajian",
      select: true,
      view: true,
      userId: (
        /*kpkSelected*/
        ctx[9]
      )
    };
    if (
      /*ka_pusat_kajian*/
      ctx[5] !== void 0
    ) {
      field4_props.value = /*ka_pusat_kajian*/
      ctx[5];
    }
    if (
      /*kpkSelected*/
      ctx[9] !== void 0
    ) {
      field4_props.selected = /*kpkSelected*/
      ctx[9];
    }
    field4 = new Field_default({ props: field4_props });
    binding_callbacks.push(() => bind(field4, "value", field4_value_binding));
    binding_callbacks.push(() => bind(field4, "selected", field4_selected_binding));
    field5 = new Field_default({
      props: {
        $$slots: { default: [create_default_slot_2] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Detail PPM";
        t1 = space();
        hr = element("hr");
        t2 = space();
        br0 = element("br");
        t3 = space();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t4 = space();
        create_component(field0.$$.fragment);
        t5 = space();
        create_component(field1.$$.fragment);
        t6 = space();
        create_component(field2.$$.fragment);
        t7 = space();
        create_component(field3.$$.fragment);
        t8 = space();
        create_component(field4.$$.fragment);
        t9 = space();
        br1 = element("br");
        t10 = space();
        create_component(field5.$$.fragment);
        attr(h1, "class", "title is-1");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, br0, anchor);
        insert(target, t3, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, t4, anchor);
        mount_component(field0, target, anchor);
        insert(target, t5, anchor);
        mount_component(field1, target, anchor);
        insert(target, t6, anchor);
        mount_component(field2, target, anchor);
        insert(target, t7, anchor);
        mount_component(field3, target, anchor);
        insert(target, t8, anchor);
        mount_component(field4, target, anchor);
        insert(target, t9, anchor);
        insert(target, br1, anchor);
        insert(target, t10, anchor);
        mount_component(field5, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty[0] & /*items*/
        1) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context5(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block5(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(t4.parentNode, t4);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        const field0_changes = {};
        if (!updating_value && dirty[0] & /*comment*/
        2) {
          updating_value = true;
          field0_changes.value = /*comment*/
          ctx2[1];
          add_flush_callback(() => updating_value = false);
        }
        field0.$set(field0_changes);
        const field1_changes = {};
        if (dirty[0] & /*kdeptSelected*/
        128)
          field1_changes.userId = /*kdeptSelected*/
          ctx2[7];
        if (!updating_value_1 && dirty[0] & /*ka_departemen*/
        4) {
          updating_value_1 = true;
          field1_changes.value = /*ka_departemen*/
          ctx2[2];
          add_flush_callback(() => updating_value_1 = false);
        }
        if (!updating_selected && dirty[0] & /*kdeptSelected*/
        128) {
          updating_selected = true;
          field1_changes.selected = /*kdeptSelected*/
          ctx2[7];
          add_flush_callback(() => updating_selected = false);
        }
        field1.$set(field1_changes);
        const field2_changes = {};
        if (dirty[0] & /*klppmSelected*/
        256)
          field2_changes.userId = /*klppmSelected*/
          ctx2[8];
        if (!updating_value_2 && dirty[0] & /*ka_lppm*/
        8) {
          updating_value_2 = true;
          field2_changes.value = /*ka_lppm*/
          ctx2[3];
          add_flush_callback(() => updating_value_2 = false);
        }
        if (!updating_selected_1 && dirty[0] & /*klppmSelected*/
        256) {
          updating_selected_1 = true;
          field2_changes.selected = /*klppmSelected*/
          ctx2[8];
          add_flush_callback(() => updating_selected_1 = false);
        }
        field2.$set(field2_changes);
        const field3_changes = {};
        if (dirty[0] & /*reviewerSelected*/
        1024)
          field3_changes.userId = /*reviewerSelected*/
          ctx2[10];
        if (!updating_value_3 && dirty[0] & /*reviewer*/
        16) {
          updating_value_3 = true;
          field3_changes.value = /*reviewer*/
          ctx2[4];
          add_flush_callback(() => updating_value_3 = false);
        }
        if (!updating_selected_2 && dirty[0] & /*reviewerSelected*/
        1024) {
          updating_selected_2 = true;
          field3_changes.selected = /*reviewerSelected*/
          ctx2[10];
          add_flush_callback(() => updating_selected_2 = false);
        }
        field3.$set(field3_changes);
        const field4_changes = {};
        if (dirty[0] & /*kpkSelected*/
        512)
          field4_changes.userId = /*kpkSelected*/
          ctx2[9];
        if (!updating_value_4 && dirty[0] & /*ka_pusat_kajian*/
        32) {
          updating_value_4 = true;
          field4_changes.value = /*ka_pusat_kajian*/
          ctx2[5];
          add_flush_callback(() => updating_value_4 = false);
        }
        if (!updating_selected_3 && dirty[0] & /*kpkSelected*/
        512) {
          updating_selected_3 = true;
          field4_changes.selected = /*kpkSelected*/
          ctx2[9];
          add_flush_callback(() => updating_selected_3 = false);
        }
        field4.$set(field4_changes);
        const field5_changes = {};
        if (dirty[1] & /*$$scope*/
        32) {
          field5_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field5.$set(field5_changes);
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        transition_in(field4.$$.fragment, local);
        transition_in(field5.$$.fragment, local);
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        transition_out(field4.$$.fragment, local);
        transition_out(field5.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(br0);
          detach(t3);
          detach(t4);
          detach(t5);
          detach(t6);
          detach(t7);
          detach(t8);
          detach(t9);
          detach(br1);
          detach(t10);
        }
        destroy_each(each_blocks, detaching);
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        destroy_component(field4, detaching);
        destroy_component(field5, detaching);
      }
    };
  }
  function create_default_slot5(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores fuga\r\n      odit accusamus, neque nulla vitae! Fugiat, accusamus amet? Cum est\r\n      delectus soluta iusto odio architecto impedit maxime non asperiores\r\n      eligendi?";
      },
      m(target, anchor) {
        insert(target, p, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(p);
        }
      }
    };
  }
  function create_header_slot(ctx) {
    let h2;
    return {
      c() {
        h2 = element("h2");
        h2.textContent = "Find Approval";
        attr(h2, "slot", "header");
      },
      m(target, anchor) {
        insert(target, h2, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h2);
        }
      }
    };
  }
  function create_fragment25(ctx) {
    let t;
    let modal;
    let updating_show;
    let current;
    let if_block = (
      /*items*/
      ctx[0] && create_if_block5(ctx)
    );
    function modal_show_binding(value) {
      ctx[23](value);
    }
    let modal_props = {
      $$slots: {
        header: [create_header_slot],
        default: [create_default_slot5]
      },
      $$scope: { ctx }
    };
    if (
      /*showModal*/
      ctx[6] !== void 0
    ) {
      modal_props.show = /*showModal*/
      ctx[6];
    }
    modal = new Modal_default({ props: modal_props });
    binding_callbacks.push(() => bind(modal, "show", modal_show_binding));
    return {
      c() {
        if (if_block)
          if_block.c();
        t = space();
        create_component(modal.$$.fragment);
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, t, anchor);
        mount_component(modal, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*items*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty[0] & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block5(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(t.parentNode, t);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
        const modal_changes = {};
        if (dirty[1] & /*$$scope*/
        32) {
          modal_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_show && dirty[0] & /*showModal*/
        64) {
          updating_show = true;
          modal_changes.show = /*showModal*/
          ctx2[6];
          add_flush_callback(() => updating_show = false);
        }
        modal.$set(modal_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        transition_in(modal.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        transition_out(modal.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
        if (if_block)
          if_block.d(detaching);
        destroy_component(modal, detaching);
      }
    };
  }
  function instance16($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(29, $route = $$value));
    let { params } = $$props;
    const id = params["1"];
    let items;
    let comment;
    let status;
    let ka_departemen;
    let ka_lppm;
    let reviewer;
    let ka_pusat_kajian;
    let showModal = false;
    let kdeptSelected2;
    let klppmSelected2;
    let kpkSelected2;
    let reviewerSelected2;
    let judul2, abstrak2, isi2;
    onMount(async () => {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      $$invalidate(2, ka_departemen = await findRole(11));
      $$invalidate(3, ka_lppm = await findRole(12));
      $$invalidate(5, ka_pusat_kajian = await findRole(13));
      $$invalidate(4, reviewer = await findRole(10));
      const response = await fetch("/api/ppm/" + id, { method: "GET", headers });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        $$invalidate(0, items = []);
        for (const [field, value] of Object.entries(result)) {
          let obj = { field, value };
          items.push(obj);
        }
        console.log(items);
        judul2 = items[2].value;
        abstrak2 = items[3].value;
        isi2 = items[4].value;
        $$invalidate(7, kdeptSelected2 = items[7].value);
        $$invalidate(8, klppmSelected2 = items[8].value);
        $$invalidate(9, kpkSelected2 = items[9].value);
        $$invalidate(10, reviewerSelected2 = items[10].value);
      }
    });
    async function handleRevisi() {
      status = items[5].value - 1;
      const payload = {
        id,
        judul: judul2,
        abstrak: abstrak2,
        isi: isi2,
        status,
        comment,
        kdeptSelected: kdeptSelected2,
        klppmSelected: klppmSelected2,
        kpkSelected: kpkSelected2,
        reviewerSelected: reviewerSelected2
      };
      const response = await fetch("/api/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/admin/proposals");
      } else {
        console.log(response);
      }
    }
    async function handlePass() {
      status = items[5].value + 2;
      const payload = {
        id,
        judul: judul2,
        abstrak: abstrak2,
        isi: isi2,
        status,
        comment: "",
        kdeptSelected: kdeptSelected2,
        klppmSelected: klppmSelected2,
        kpkSelected: kpkSelected2,
        reviewerSelected: reviewerSelected2
      };
      console.log("reviewerSelected", reviewerSelected2);
      const response = await fetch("/api/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/admin/proposals");
      } else {
        console.log(response);
      }
    }
    async function searchUser(ev) {
      const response = await fetch("/api/user");
      const result = await response.json();
      if (response.ok) {
        $$invalidate(6, showModal = true);
      }
    }
    let options;
    async function findRole(role) {
      const response = await fetch("/api/role/" + role);
      const result = await response.json();
      if (response.ok) {
        options = result;
        return options;
      } else {
        console.log(response);
      }
    }
    function field0_value_binding(value) {
      comment = value;
      $$invalidate(1, comment);
    }
    function field1_value_binding(value) {
      ka_departemen = value;
      $$invalidate(2, ka_departemen);
    }
    function field1_selected_binding(value) {
      kdeptSelected2 = value;
      $$invalidate(7, kdeptSelected2);
    }
    function field2_value_binding(value) {
      ka_lppm = value;
      $$invalidate(3, ka_lppm);
    }
    function field2_selected_binding(value) {
      klppmSelected2 = value;
      $$invalidate(8, klppmSelected2);
    }
    function field3_value_binding(value) {
      reviewer = value;
      $$invalidate(4, reviewer);
    }
    function field3_selected_binding(value) {
      reviewerSelected2 = value;
      $$invalidate(10, reviewerSelected2);
    }
    function field4_value_binding(value) {
      ka_pusat_kajian = value;
      $$invalidate(5, ka_pusat_kajian);
    }
    function field4_selected_binding(value) {
      kpkSelected2 = value;
      $$invalidate(9, kpkSelected2);
    }
    function modal_show_binding(value) {
      showModal = value;
      $$invalidate(6, showModal);
    }
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(13, params = $$props2.params);
    };
    return [
      items,
      comment,
      ka_departemen,
      ka_lppm,
      reviewer,
      ka_pusat_kajian,
      showModal,
      kdeptSelected2,
      klppmSelected2,
      kpkSelected2,
      reviewerSelected2,
      handleRevisi,
      handlePass,
      params,
      field0_value_binding,
      field1_value_binding,
      field1_selected_binding,
      field2_value_binding,
      field2_selected_binding,
      field3_value_binding,
      field3_selected_binding,
      field4_value_binding,
      field4_selected_binding,
      modal_show_binding
    ];
  }
  var Proposal = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance16, create_fragment25, safe_not_equal, { params: 13 }, null, [-1, -1]);
    }
  };
  var proposal_default = Proposal;

  // src/pages/admin/+proposals.svelte
  function add_css18(target) {
    append_styles(target, "svelte-1eb6cem", ".review.svelte-1eb6cem{cursor:pointer}.status.svelte-1eb6cem{text-align:center}");
  }
  function get_each_context6(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[3] = list[i];
    return child_ctx;
  }
  function create_if_block6(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot6] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty & /*$$scope, items*/
        65) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function create_each_block6(ctx) {
    let tr;
    let td0;
    let t0_value = (
      /*item*/
      ctx[3].judul + ""
    );
    let t0;
    let t1;
    let td1;
    let t2_value = (
      /*item*/
      ctx[3].abstrak + ""
    );
    let t2;
    let t3;
    let td2;
    let status;
    let t4;
    let td3;
    let button;
    let t5;
    let button_uid_value;
    let t6;
    let current;
    let mounted;
    let dispose;
    status = new Status_default({ props: { code: (
      /*item*/
      ctx[3].status
    ) } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        t0 = text(t0_value);
        t1 = space();
        td1 = element("td");
        t2 = text(t2_value);
        t3 = space();
        td2 = element("td");
        create_component(status.$$.fragment);
        t4 = space();
        td3 = element("td");
        button = element("button");
        t5 = text("Detail");
        t6 = space();
        attr(td2, "class", "status svelte-1eb6cem");
        attr(button, "class", "button is-info is-rounded is-small");
        attr(button, "uid", button_uid_value = /*item*/
        ctx[3].id);
        attr(td3, "class", "review svelte-1eb6cem");
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, t0);
        append(tr, t1);
        append(tr, td1);
        append(td1, t2);
        append(tr, t3);
        append(tr, td2);
        mount_component(status, td2, null);
        append(tr, t4);
        append(tr, td3);
        append(td3, button);
        append(button, t5);
        append(tr, t6);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*handleReview*/
            ctx[1]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if ((!current || dirty & /*items*/
        1) && t0_value !== (t0_value = /*item*/
        ctx2[3].judul + ""))
          set_data(t0, t0_value);
        if ((!current || dirty & /*items*/
        1) && t2_value !== (t2_value = /*item*/
        ctx2[3].abstrak + ""))
          set_data(t2, t2_value);
        const status_changes = {};
        if (dirty & /*items*/
        1)
          status_changes.code = /*item*/
          ctx2[3].status;
        status.$set(status_changes);
        if (!current || dirty & /*items*/
        1 && button_uid_value !== (button_uid_value = /*item*/
        ctx2[3].id)) {
          attr(button, "uid", button_uid_value);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(status.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(status.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(status);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot6(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let table;
    let thead;
    let t10;
    let tbody;
    let current;
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block6(get_each_context6(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "PPM Management";
        t1 = space();
        hr = element("hr");
        t2 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th>Judul</th> <th>Abstract</th> <th>Status</th> <th>Action</th></tr>`;
        t10 = space();
        tbody = element("tbody");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(h1, "class", "title is-1");
        attr(table, "class", "table is-fullwidth is-striped is-hoverable");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t10);
        append(table, tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tbody, null);
          }
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*items, handleReview*/
        3) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context6(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block6(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tbody, null);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(table);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_fragment26(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*items*/
      ctx[0] && create_if_block6(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (
          /*items*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block6(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function instance17($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(2, $route = $$value));
    let items;
    onMount(async () => {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      const response = await fetch("/api/ppm", { method: "GET", headers });
      const result = await response.json();
      if (response.ok) {
        $$invalidate(0, items = result.dbData);
      }
    });
    async function handleReview(ev) {
      const id = ev.target.getAttribute("uid");
      $route("/admin/proposal/" + id);
    }
    return [items, handleReview];
  }
  var Proposals = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance17, create_fragment26, safe_not_equal, {}, add_css18);
    }
  };
  var proposals_default = Proposals;

  // src/pages/admin/+users.svelte
  function add_css19(target) {
    append_styles(target, "svelte-1t9fqxv", "[fixed].svelte-1t9fqxv{text-align:center}.group.svelte-1t9fqxv{padding:0 0.5rem}.active.svelte-1t9fqxv{color:green;cursor:pointer}.active.red.svelte-1t9fqxv{color:orangered}select.svelte-1t9fqxv{border:none;box-shadow:none;background:inherit}");
  }
  function get_each_context7(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[9] = list[i];
    child_ctx[11] = i;
    return child_ctx;
  }
  function create_if_block7(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let button;
    let span0;
    let icon;
    let t3;
    let span1;
    let t5;
    let table;
    let thead;
    let t13;
    let tbody;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "orang", src: accountAdd } });
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block7(get_each_context7(ctx, each_value, i));
    }
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "User Management";
        t1 = space();
        hr = element("hr");
        t2 = space();
        button = element("button");
        span0 = element("span");
        create_component(icon.$$.fragment);
        t3 = space();
        span1 = element("span");
        span1.innerHTML = `<a>Create User</a>`;
        t5 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th>Username</th> <th>Email</th> <th>Role</th> <th>Active</th></tr>`;
        t13 = space();
        tbody = element("tbody");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(h1, "class", "title is-1");
        attr(span0, "class", "icon");
        attr(button, "class", "button is-info");
        attr(table, "class", "table is-fullwidth is-striped is-hoverable");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, button, anchor);
        append(button, span0);
        mount_component(icon, span0, null);
        append(button, t3);
        append(button, span1);
        insert(target, t5, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t13);
        append(table, tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tbody, null);
          }
        }
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*addUser*/
            ctx[3]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*items, handleActive, handleGroup*/
        7) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context7(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
            } else {
              each_blocks[i] = create_each_block7(child_ctx);
              each_blocks[i].c();
              each_blocks[i].m(tbody, null);
            }
          }
          for (; i < each_blocks.length; i += 1) {
            each_blocks[i].d(1);
          }
          each_blocks.length = each_value.length;
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(button);
          detach(t5);
          detach(table);
        }
        destroy_component(icon);
        destroy_each(each_blocks, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_each_block7(ctx) {
    let tr;
    let td0;
    let a;
    let t0_value = (
      /*item*/
      ctx[9].username + ""
    );
    let t0;
    let a_href_value;
    let t1;
    let td1;
    let t2_value = (
      /*item*/
      ctx[9].email + ""
    );
    let t2;
    let t3;
    let td2;
    let select;
    let option0;
    let t4;
    let option0_selected_value;
    let option1;
    let t5;
    let option1_selected_value;
    let option2;
    let t6;
    let option2_selected_value;
    let option3;
    let t7;
    let option3_selected_value;
    let option4;
    let t8;
    let option4_selected_value;
    let option5;
    let t9;
    let option5_selected_value;
    let select_uid_value;
    let t10;
    let td3;
    let t11_value = (
      /*item*/
      ctx[9].active ? "\u2714" : "\u2718"
    );
    let t11;
    let td3_uid_value;
    let td3_role_value;
    let t12;
    let mounted;
    let dispose;
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        a = element("a");
        t0 = text(t0_value);
        t1 = space();
        td1 = element("td");
        t2 = text(t2_value);
        t3 = space();
        td2 = element("td");
        select = element("select");
        option0 = element("option");
        t4 = text("Admin");
        option1 = element("option");
        t5 = text("Dosen");
        option2 = element("option");
        t6 = text("Reviewer");
        option3 = element("option");
        t7 = text("Ka. Departemen");
        option4 = element("option");
        t8 = text("Ka. LPPM");
        option5 = element("option");
        t9 = text("Ka. Pusat Kajian");
        t10 = space();
        td3 = element("td");
        t11 = text(t11_value);
        t12 = space();
        attr(a, "href", a_href_value = "/admin/profile/" + /*item*/
        ctx[9].id);
        option0.__value = "9";
        set_input_value(option0, option0.__value);
        option0.selected = option0_selected_value = /*item*/
        ctx[9].role === 9;
        option1.__value = "0";
        set_input_value(option1, option1.__value);
        option1.selected = option1_selected_value = /*item*/
        ctx[9].role === 0;
        option2.__value = "10";
        set_input_value(option2, option2.__value);
        option2.selected = option2_selected_value = /*item*/
        ctx[9].role === 10;
        option3.__value = "11";
        set_input_value(option3, option3.__value);
        option3.selected = option3_selected_value = /*item*/
        ctx[9].role === 11;
        option4.__value = "12";
        set_input_value(option4, option4.__value);
        option4.selected = option4_selected_value = /*item*/
        ctx[9].role === 12;
        option5.__value = "13";
        set_input_value(option5, option5.__value);
        option5.selected = option5_selected_value = /*item*/
        ctx[9].role === 13;
        attr(select, "uid", select_uid_value = /*idx*/
        ctx[11]);
        attr(select, "class", "svelte-1t9fqxv");
        attr(td2, "fixed", "");
        attr(td2, "class", "group svelte-1t9fqxv");
        attr(td3, "fixed", "");
        attr(td3, "uid", td3_uid_value = /*idx*/
        ctx[11]);
        attr(td3, "role", td3_role_value = /*item*/
        ctx[9].role);
        attr(td3, "class", "active svelte-1t9fqxv");
        toggle_class(td3, "red", !/*item*/
        ctx[9].active);
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, a);
        append(a, t0);
        append(tr, t1);
        append(tr, td1);
        append(td1, t2);
        append(tr, t3);
        append(tr, td2);
        append(td2, select);
        append(select, option0);
        append(option0, t4);
        append(select, option1);
        append(option1, t5);
        append(select, option2);
        append(option2, t6);
        append(select, option3);
        append(option3, t7);
        append(select, option4);
        append(option4, t8);
        append(select, option5);
        append(option5, t9);
        append(tr, t10);
        append(tr, td3);
        append(td3, t11);
        append(tr, t12);
        if (!mounted) {
          dispose = [
            listen(
              select,
              "change",
              /*handleGroup*/
              ctx[2]
            ),
            listen(
              td3,
              "click",
              /*handleActive*/
              ctx[1]
            )
          ];
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*items*/
        1 && t0_value !== (t0_value = /*item*/
        ctx2[9].username + ""))
          set_data(t0, t0_value);
        if (dirty & /*items*/
        1 && a_href_value !== (a_href_value = "/admin/profile/" + /*item*/
        ctx2[9].id)) {
          attr(a, "href", a_href_value);
        }
        if (dirty & /*items*/
        1 && t2_value !== (t2_value = /*item*/
        ctx2[9].email + ""))
          set_data(t2, t2_value);
        if (dirty & /*items*/
        1 && option0_selected_value !== (option0_selected_value = /*item*/
        ctx2[9].role === 9)) {
          option0.selected = option0_selected_value;
        }
        if (dirty & /*items*/
        1 && option1_selected_value !== (option1_selected_value = /*item*/
        ctx2[9].role === 0)) {
          option1.selected = option1_selected_value;
        }
        if (dirty & /*items*/
        1 && option2_selected_value !== (option2_selected_value = /*item*/
        ctx2[9].role === 10)) {
          option2.selected = option2_selected_value;
        }
        if (dirty & /*items*/
        1 && option3_selected_value !== (option3_selected_value = /*item*/
        ctx2[9].role === 11)) {
          option3.selected = option3_selected_value;
        }
        if (dirty & /*items*/
        1 && option4_selected_value !== (option4_selected_value = /*item*/
        ctx2[9].role === 12)) {
          option4.selected = option4_selected_value;
        }
        if (dirty & /*items*/
        1 && option5_selected_value !== (option5_selected_value = /*item*/
        ctx2[9].role === 13)) {
          option5.selected = option5_selected_value;
        }
        if (dirty & /*items*/
        1 && t11_value !== (t11_value = /*item*/
        ctx2[9].active ? "\u2714" : "\u2718"))
          set_data(t11, t11_value);
        if (dirty & /*items*/
        1 && td3_role_value !== (td3_role_value = /*item*/
        ctx2[9].role)) {
          attr(td3, "role", td3_role_value);
        }
        if (dirty & /*items*/
        1) {
          toggle_class(td3, "red", !/*item*/
          ctx2[9].active);
        }
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot7(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*items*/
      ctx[0] && create_if_block7(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*items*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block7(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_fragment27(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot7] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const article_changes = {};
        if (dirty & /*$$scope, items*/
        4097) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function instance18($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(6, $route = $$value));
    let { params } = $$props;
    let profile;
    let items;
    async function populateTable() {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      const response = await fetch("/api/user", { method: "GET", headers });
      const result = await response.json();
      console.log(result);
      if (response.status === 200) {
        $$invalidate(0, items = result.dbData);
      }
    }
    async function handleActive(ev) {
      const value = ev.target.getAttribute("role");
      const id = ev.target.getAttribute("uid");
      const payload = {
        id: items[id].id,
        active: !items[id].active,
        role: Number(value)
      };
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        populateTable();
      } else {
        console.log(response);
      }
    }
    async function handleGroup(ev) {
      const value = ev.target.value;
      const id = ev.target.getAttribute("uid");
      const payload = {
        id: items[id].id,
        role: Number(value),
        active: items[id].active
      };
      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        populateTable();
      } else {
        console.log(response);
      }
    }
    async function getPage() {
      if (params["1"] === "profile") {
        let id = params["2"];
        const response = await fetch("/api/user/" + id);
        const result = await response.json();
        if (response.ok) {
          if (!result.length)
            return;
          $$invalidate(5, profile = []);
          for (const [field, value] of Object.entries(result[0])) {
            profile.push({ field, value });
          }
        } else {
          data = null;
        }
      }
    }
    function addUser() {
      $route("/admin/createuser");
    }
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(4, params = $$props2.params);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*params*/
      16) {
        $:
          params, getPage();
      }
      if ($$self.$$.dirty & /*profile*/
      32) {
        $:
          profile, profile ? $$invalidate(0, items = null) : populateTable();
      }
    };
    return [items, handleActive, handleGroup, addUser, params, profile];
  }
  var Users = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance18, create_fragment27, safe_not_equal, { params: 4 }, add_css19);
    }
  };
  var users_default = Users;

  // src/pages/admin/Index.svelte
  function create_else_block4(ctx) {
    let e404;
    let current;
    e404 = new E404_default({});
    return {
      c() {
        create_component(e404.$$.fragment);
      },
      m(target, anchor) {
        mount_component(e404, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(e404.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(e404.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(e404, detaching);
      }
    };
  }
  function create_if_block8(ctx) {
    let switch_instance;
    let switch_instance_anchor;
    let current;
    var switch_value = (
      /*page*/
      ctx[1]
    );
    function switch_props(ctx2, dirty) {
      return { props: { params: (
        /*params*/
        ctx2[0]
      ) } };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      m(target, anchor) {
        if (switch_instance)
          mount_component(switch_instance, target, anchor);
        insert(target, switch_instance_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*page*/
        2 && switch_value !== (switch_value = /*page*/
        ctx2[1])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          const switch_instance_changes = {};
          if (dirty & /*params*/
          1)
            switch_instance_changes.params = /*params*/
            ctx2[0];
          switch_instance.$set(switch_instance_changes);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(switch_instance_anchor);
        }
        if (switch_instance)
          destroy_component(switch_instance, detaching);
      }
    };
  }
  function create_fragment28(ctx) {
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [create_if_block8, create_else_block4];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (
        /*page*/
        ctx2[1]
      )
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if_blocks[current_block_type_index].d(detaching);
      }
    };
  }
  function instance19($$self, $$props, $$invalidate) {
    let { params = {} } = $$props;
    let page;
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(0, params = $$props2.params);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*params*/
      1) {
        $:
          params, $$invalidate(1, page = !params.page ? home_default : pages_exports[params.page?.replace(/[^a-zA-Z0-9_]/g, "_")]);
      }
    };
    return [params, page];
  }
  var Index2 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance19, create_fragment28, safe_not_equal, { params: 0 });
    }
  };
  var Index_default2 = Index2;

  // src/pages/auth/pages.js
  var pages_exports2 = {};
  __export(pages_exports2, {
    home: () => home_default2
  });

  // src/pages/auth/+home.svelte
  function create_fragment29(ctx) {
    let article;
    return {
      c() {
        article = element("article");
        article.innerHTML = `<h1>Auth Google</h1>`;
      },
      m(target, anchor) {
        insert(target, article, anchor);
      },
      p: noop,
      i: noop,
      o: noop,
      d(detaching) {
        if (detaching) {
          detach(article);
        }
      }
    };
  }
  function instance20($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(1, $route = $$value));
    let { params } = $$props;
    const token = params.token || null;
    if (token) {
      localStorage.setItem("id", params.id);
      localStorage.setItem("username", params.username);
      localStorage.setItem("role", params.role);
      localStorage.setItem("token", params.token);
      let role = params.role;
      if (role === "admin")
        $route("/admin");
      else
        $route("/dosen");
    } else {
      $route("/login");
    }
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(0, params = $$props2.params);
    };
    return [params];
  }
  var Home2 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance20, create_fragment29, safe_not_equal, { params: 0 });
    }
  };
  var home_default2 = Home2;

  // src/pages/auth/Index.svelte
  function create_else_block5(ctx) {
    let e404;
    let current;
    e404 = new E404_default({});
    return {
      c() {
        create_component(e404.$$.fragment);
      },
      m(target, anchor) {
        mount_component(e404, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(e404.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(e404.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(e404, detaching);
      }
    };
  }
  function create_if_block9(ctx) {
    let switch_instance;
    let switch_instance_anchor;
    let current;
    var switch_value = (
      /*page*/
      ctx[1]
    );
    function switch_props(ctx2, dirty) {
      return { props: { params: (
        /*params*/
        ctx2[0]
      ) } };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      m(target, anchor) {
        if (switch_instance)
          mount_component(switch_instance, target, anchor);
        insert(target, switch_instance_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*page*/
        2 && switch_value !== (switch_value = /*page*/
        ctx2[1])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          const switch_instance_changes = {};
          if (dirty & /*params*/
          1)
            switch_instance_changes.params = /*params*/
            ctx2[0];
          switch_instance.$set(switch_instance_changes);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(switch_instance_anchor);
        }
        if (switch_instance)
          destroy_component(switch_instance, detaching);
      }
    };
  }
  function create_fragment30(ctx) {
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [create_if_block9, create_else_block5];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (
        /*page*/
        ctx2[1]
      )
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if_blocks[current_block_type_index].d(detaching);
      }
    };
  }
  function instance21($$self, $$props, $$invalidate) {
    let { params = {} } = $$props;
    let page;
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(0, params = $$props2.params);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*params*/
      1) {
        $:
          params, $$invalidate(1, page = !params.page ? home_default2 : pages_exports2[params.page?.replace(/[^a-zA-Z0-9_]/g, "_")]);
      }
    };
    return [params, page];
  }
  var Index3 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance21, create_fragment30, safe_not_equal, { params: 0 });
    }
  };
  var Index_default3 = Index3;

  // src/pages/dosen/pages.js
  var pages_exports3 = {};
  __export(pages_exports3, {
    approval: () => approval_default,
    detailproposal: () => detailproposal_default,
    home: () => home_default3,
    profile: () => profile_default2,
    proposal: () => proposal_default2,
    proposals: () => proposals_default2
  });

  // src/pages/dosen/+approval.svelte
  function add_css20(target) {
    append_styles(target, "svelte-123mmn1", ".view.svelte-123mmn1{cursor:pointer}.status.svelte-123mmn1{text-align:center}");
  }
  function get_each_context8(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[4] = list[i];
    return child_ctx;
  }
  function create_if_block10(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot8] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty & /*$$scope, items*/
        129) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function create_each_block8(ctx) {
    let tr;
    let td0;
    let t0_value = (
      /*item*/
      ctx[4].judul + ""
    );
    let t0;
    let t1;
    let td1;
    let t2_value = (
      /*item*/
      ctx[4].abstrak + ""
    );
    let t2;
    let t3;
    let td2;
    let status;
    let td2_pid_value;
    let t4;
    let td3;
    let button;
    let t5;
    let button_pid_value;
    let t6;
    let current;
    let mounted;
    let dispose;
    status = new Status_default({ props: { code: (
      /*item*/
      ctx[4].status
    ) } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        t0 = text(t0_value);
        t1 = space();
        td1 = element("td");
        t2 = text(t2_value);
        t3 = space();
        td2 = element("td");
        create_component(status.$$.fragment);
        t4 = space();
        td3 = element("td");
        button = element("button");
        t5 = text("Detail");
        t6 = space();
        attr(td2, "class", "status svelte-123mmn1");
        attr(td2, "pid", td2_pid_value = /*item*/
        ctx[4].id);
        attr(button, "class", "button is-info");
        attr(button, "pid", button_pid_value = /*item*/
        ctx[4].id);
        attr(td3, "class", "view svelte-123mmn1");
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, t0);
        append(tr, t1);
        append(tr, td1);
        append(td1, t2);
        append(tr, t3);
        append(tr, td2);
        mount_component(status, td2, null);
        append(tr, t4);
        append(tr, td3);
        append(td3, button);
        append(button, t5);
        append(tr, t6);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*detail*/
            ctx[1]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if ((!current || dirty & /*items*/
        1) && t0_value !== (t0_value = /*item*/
        ctx2[4].judul + ""))
          set_data(t0, t0_value);
        if ((!current || dirty & /*items*/
        1) && t2_value !== (t2_value = /*item*/
        ctx2[4].abstrak + ""))
          set_data(t2, t2_value);
        const status_changes = {};
        if (dirty & /*items*/
        1)
          status_changes.code = /*item*/
          ctx2[4].status;
        status.$set(status_changes);
        if (!current || dirty & /*items*/
        1 && td2_pid_value !== (td2_pid_value = /*item*/
        ctx2[4].id)) {
          attr(td2, "pid", td2_pid_value);
        }
        if (!current || dirty & /*items*/
        1 && button_pid_value !== (button_pid_value = /*item*/
        ctx2[4].id)) {
          attr(button, "pid", button_pid_value);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(status.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(status.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(status);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot8(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let div;
    let t6;
    let table;
    let thead;
    let t14;
    let tbody;
    let current;
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block8(get_each_context8(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Approval Management";
        t1 = space();
        hr = element("hr");
        t2 = space();
        div = element("div");
        div.innerHTML = `<p>Berikut adalah list <strong>Penelitian / Pengabdian Masyarakat</strong>
            yang diberikan kepada anda untuk mendapatkan persetujuan. Cek PPM dengan
            teliti sebelum memberikan persetujuan!</p>`;
        t6 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th>Judul</th> <th>Abstract</th> <th>Status</th> <th colspan="2">Action</th></tr>`;
        t14 = space();
        tbody = element("tbody");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(h1, "class", "title is-1");
        attr(div, "class", "notification is-info is-light");
        attr(table, "class", "table is-fullwidth is-striped is-hoverable");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, div, anchor);
        insert(target, t6, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t14);
        append(table, tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tbody, null);
          }
        }
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*items, detail*/
        3) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context8(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block8(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tbody, null);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(div);
          detach(t6);
          detach(table);
        }
        destroy_each(each_blocks, detaching);
      }
    };
  }
  function create_fragment31(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*items*/
      ctx[0] && create_if_block10(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (
          /*items*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block10(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function instance22($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(2, $route = $$value));
    const id = localStorage.id;
    let items;
    onMount(async () => {
      const response = await fetch("/api/approval/" + id);
      const result = await response.json();
      if (response.ok) {
        $$invalidate(0, items = result.dbData);
      } else {
        console.log(response);
      }
    });
    function detail(ev) {
      let propId = ev.target.getAttribute("pid");
      $route("/dosen/detailproposal/" + propId);
    }
    return [items, detail];
  }
  var Approval = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance22, create_fragment31, safe_not_equal, {}, add_css20);
    }
  };
  var approval_default = Approval;

  // src/pages/dosen/+detailproposal.svelte
  function get_each_context9(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[26] = list[i];
    return child_ctx;
  }
  function create_if_block11(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot_13] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty & /*$$scope, status, comment, items*/
        536870919) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function create_if_block_92(ctx) {
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [create_if_block_102, create_else_block6];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (
        /*item*/
        ctx2[26].field === "status"
      )
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if_blocks[current_block_type_index].d(detaching);
      }
    };
  }
  function create_else_block6(ctx) {
    let field;
    let current;
    field = new Field_default({
      props: {
        view: true,
        name: (
          /*item*/
          ctx[26].field
        ),
        value: (
          /*item*/
          ctx[26].value
        )
      }
    });
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field_changes = {};
        if (dirty & /*items*/
        1)
          field_changes.name = /*item*/
          ctx2[26].field;
        if (dirty & /*items*/
        1)
          field_changes.value = /*item*/
          ctx2[26].value;
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_if_block_102(ctx) {
    let field;
    let current;
    field = new Field_default({
      props: {
        view: true,
        name: (
          /*item*/
          ctx[26].field
        ),
        $$slots: { default: [create_default_slot_6] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field_changes = {};
        if (dirty & /*items*/
        1)
          field_changes.name = /*item*/
          ctx2[26].field;
        if (dirty & /*$$scope, items*/
        536870913) {
          field_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_default_slot_6(ctx) {
    let status_1;
    let current;
    status_1 = new Status_default({ props: { code: (
      /*item*/
      ctx[26].value
    ) } });
    return {
      c() {
        create_component(status_1.$$.fragment);
      },
      m(target, anchor) {
        mount_component(status_1, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const status_1_changes = {};
        if (dirty & /*items*/
        1)
          status_1_changes.code = /*item*/
          ctx2[26].value;
        status_1.$set(status_1_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(status_1.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(status_1.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(status_1, detaching);
      }
    };
  }
  function create_each_block9(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*item*/
      ctx[26].field !== "comment" && /*item*/
      ctx[26].field !== "uid_kdept" && /*item*/
      ctx[26].field !== "uid_klppm" && /*item*/
      ctx[26].field !== "uid_kpk" && /*item*/
      ctx[26].field !== "uid_reviewer" && /*item*/
      ctx[26].field !== "update" && create_if_block_92(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*item*/
          ctx2[26].field !== "comment" && /*item*/
          ctx2[26].field !== "uid_kdept" && /*item*/
          ctx2[26].field !== "uid_klppm" && /*item*/
          ctx2[26].field !== "uid_kpk" && /*item*/
          ctx2[26].field !== "uid_reviewer" && /*item*/
          ctx2[26].field !== "update"
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_92(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block_72(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*status*/
      ctx[2] === 4 && create_if_block_82(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*status*/
          ctx2[2] === 4
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*status*/
            4) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_82(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block_82(ctx) {
    let field;
    let current;
    field = new Field_default({
      props: {
        $$slots: { default: [create_default_slot_5] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field_changes = {};
        if (dirty & /*$$scope*/
        536870912) {
          field_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_default_slot_5(ctx) {
    let button0;
    let t1;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        button0 = element("button");
        button0.textContent = "Revisi";
        t1 = space();
        button1 = element("button");
        button1.textContent = "Proses";
        attr(button0, "class", "button is-warning");
        attr(button1, "class", "button is-info");
      },
      m(target, anchor) {
        insert(target, button0, anchor);
        insert(target, t1, anchor);
        insert(target, button1, anchor);
        if (!mounted) {
          dispose = [
            listen(
              button0,
              "click",
              /*handleRevisi*/
              ctx[5]
            ),
            listen(
              button1,
              "click",
              /*handlePass*/
              ctx[6]
            )
          ];
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(button0);
          detach(t1);
          detach(button1);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_52(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*status*/
      ctx[2] === 6 && create_if_block_62(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*status*/
          ctx2[2] === 6
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*status*/
            4) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_62(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block_62(ctx) {
    let field;
    let current;
    field = new Field_default({
      props: {
        $$slots: { default: [create_default_slot_4] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field_changes = {};
        if (dirty & /*$$scope*/
        536870912) {
          field_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_default_slot_4(ctx) {
    let button0;
    let t1;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        button0 = element("button");
        button0.textContent = "Revisi";
        t1 = space();
        button1 = element("button");
        button1.textContent = "Proses";
        attr(button0, "class", "button is-warning");
        attr(button1, "class", "button is-info");
      },
      m(target, anchor) {
        insert(target, button0, anchor);
        insert(target, t1, anchor);
        insert(target, button1, anchor);
        if (!mounted) {
          dispose = [
            listen(
              button0,
              "click",
              /*handleRevisi*/
              ctx[5]
            ),
            listen(
              button1,
              "click",
              /*handlePass*/
              ctx[6]
            )
          ];
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(button0);
          detach(t1);
          detach(button1);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_34(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*status*/
      ctx[2] === 8 && create_if_block_43(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*status*/
          ctx2[2] === 8
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*status*/
            4) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_43(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block_43(ctx) {
    let field;
    let current;
    field = new Field_default({
      props: {
        $$slots: { default: [create_default_slot_32] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field_changes = {};
        if (dirty & /*$$scope*/
        536870912) {
          field_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_default_slot_32(ctx) {
    let button0;
    let t1;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        button0 = element("button");
        button0.textContent = "Revisi";
        t1 = space();
        button1 = element("button");
        button1.textContent = "Proses";
        attr(button0, "class", "button is-warning");
        attr(button1, "class", "button is-info");
      },
      m(target, anchor) {
        insert(target, button0, anchor);
        insert(target, t1, anchor);
        insert(target, button1, anchor);
        if (!mounted) {
          dispose = [
            listen(
              button0,
              "click",
              /*handleRevisi*/
              ctx[5]
            ),
            listen(
              button1,
              "click",
              /*handlePass*/
              ctx[6]
            )
          ];
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(button0);
          detach(t1);
          detach(button1);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_if_block_17(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*status*/
      ctx[2] === 10 && create_if_block_24(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*status*/
          ctx2[2] === 10
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*status*/
            4) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_24(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block_24(ctx) {
    let field;
    let current;
    field = new Field_default({
      props: {
        $$slots: { default: [create_default_slot_22] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field_changes = {};
        if (dirty & /*$$scope*/
        536870912) {
          field_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_default_slot_22(ctx) {
    let button0;
    let t1;
    let button1;
    let t3;
    let button2;
    let mounted;
    let dispose;
    return {
      c() {
        button0 = element("button");
        button0.textContent = "Revisi";
        t1 = space();
        button1 = element("button");
        button1.textContent = "Ditolak";
        t3 = space();
        button2 = element("button");
        button2.textContent = "Proses";
        attr(button0, "class", "button is-warning");
        attr(button1, "class", "button is-danger");
        attr(button2, "class", "button is-info");
      },
      m(target, anchor) {
        insert(target, button0, anchor);
        insert(target, t1, anchor);
        insert(target, button1, anchor);
        insert(target, t3, anchor);
        insert(target, button2, anchor);
        if (!mounted) {
          dispose = [
            listen(
              button0,
              "click",
              /*handleRevisi*/
              ctx[5]
            ),
            listen(
              button2,
              "click",
              /*handlePass*/
              ctx[6]
            )
          ];
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(button0);
          detach(t1);
          detach(button1);
          detach(t3);
          detach(button2);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot_13(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let t3;
    let field;
    let updating_value;
    let t4;
    let br;
    let t5;
    let t6;
    let t7;
    let t8;
    let if_block3_anchor;
    let current;
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block9(get_each_context9(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    function field_value_binding(value) {
      ctx[8](value);
    }
    let field_props = { name: "Comment", textarea: true };
    if (
      /*comment*/
      ctx[1] !== void 0
    ) {
      field_props.value = /*comment*/
      ctx[1];
    }
    field = new Field_default({ props: field_props });
    binding_callbacks.push(() => bind(field, "value", field_value_binding));
    let if_block0 = (
      /*role*/
      ctx[4] === "Ka.Departemen" && create_if_block_72(ctx)
    );
    let if_block1 = (
      /*role*/
      ctx[4] === "Ka.LPPM" && create_if_block_52(ctx)
    );
    let if_block2 = (
      /*role*/
      ctx[4] === "reviewer" && create_if_block_34(ctx)
    );
    let if_block3 = (
      /*role*/
      ctx[4] === "Ka.PusatKajian" && create_if_block_17(ctx)
    );
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Detail Proposal";
        t1 = space();
        hr = element("hr");
        t2 = space();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t3 = space();
        create_component(field.$$.fragment);
        t4 = space();
        br = element("br");
        t5 = space();
        if (if_block0)
          if_block0.c();
        t6 = space();
        if (if_block1)
          if_block1.c();
        t7 = space();
        if (if_block2)
          if_block2.c();
        t8 = space();
        if (if_block3)
          if_block3.c();
        if_block3_anchor = empty();
        attr(h1, "class", "title is-1");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, t3, anchor);
        mount_component(field, target, anchor);
        insert(target, t4, anchor);
        insert(target, br, anchor);
        insert(target, t5, anchor);
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t6, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, t7, anchor);
        if (if_block2)
          if_block2.m(target, anchor);
        insert(target, t8, anchor);
        if (if_block3)
          if_block3.m(target, anchor);
        insert(target, if_block3_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*items*/
        1) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context9(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block9(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(t3.parentNode, t3);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        const field_changes = {};
        if (!updating_value && dirty & /*comment*/
        2) {
          updating_value = true;
          field_changes.value = /*comment*/
          ctx2[1];
          add_flush_callback(() => updating_value = false);
        }
        field.$set(field_changes);
        if (
          /*role*/
          ctx2[4] === "Ka.Departemen"
        )
          if_block0.p(ctx2, dirty);
        if (
          /*role*/
          ctx2[4] === "Ka.LPPM"
        )
          if_block1.p(ctx2, dirty);
        if (
          /*role*/
          ctx2[4] === "reviewer"
        )
          if_block2.p(ctx2, dirty);
        if (
          /*role*/
          ctx2[4] === "Ka.PusatKajian"
        )
          if_block3.p(ctx2, dirty);
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        transition_in(field.$$.fragment, local);
        transition_in(if_block0);
        transition_in(if_block1);
        transition_in(if_block2);
        transition_in(if_block3);
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        transition_out(field.$$.fragment, local);
        transition_out(if_block0);
        transition_out(if_block1);
        transition_out(if_block2);
        transition_out(if_block3);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(t3);
          detach(t4);
          detach(br);
          detach(t5);
          detach(t6);
          detach(t7);
          detach(t8);
          detach(if_block3_anchor);
        }
        destroy_each(each_blocks, detaching);
        destroy_component(field, detaching);
        if (if_block0)
          if_block0.d(detaching);
        if (if_block1)
          if_block1.d(detaching);
        if (if_block2)
          if_block2.d(detaching);
        if (if_block3)
          if_block3.d(detaching);
      }
    };
  }
  function create_default_slot9(ctx) {
    let p;
    return {
      c() {
        p = element("p");
        p.textContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores fuga\r\n      odit accusamus, neque nulla vitae! Fugiat, accusamus amet? Cum est\r\n      delectus soluta iusto odio architecto impedit maxime non asperiores\r\n      eligendi?";
      },
      m(target, anchor) {
        insert(target, p, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(p);
        }
      }
    };
  }
  function create_header_slot2(ctx) {
    let h2;
    return {
      c() {
        h2 = element("h2");
        h2.textContent = "Find Approval";
        attr(h2, "slot", "header");
      },
      m(target, anchor) {
        insert(target, h2, anchor);
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(h2);
        }
      }
    };
  }
  function create_fragment32(ctx) {
    let t;
    let modal;
    let updating_show;
    let current;
    let if_block = (
      /*items*/
      ctx[0] && create_if_block11(ctx)
    );
    function modal_show_binding(value) {
      ctx[9](value);
    }
    let modal_props = {
      $$slots: {
        header: [create_header_slot2],
        default: [create_default_slot9]
      },
      $$scope: { ctx }
    };
    if (
      /*showModal*/
      ctx[3] !== void 0
    ) {
      modal_props.show = /*showModal*/
      ctx[3];
    }
    modal = new Modal_default({ props: modal_props });
    binding_callbacks.push(() => bind(modal, "show", modal_show_binding));
    return {
      c() {
        if (if_block)
          if_block.c();
        t = space();
        create_component(modal.$$.fragment);
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, t, anchor);
        mount_component(modal, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (
          /*items*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block11(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(t.parentNode, t);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
        const modal_changes = {};
        if (dirty & /*$$scope*/
        536870912) {
          modal_changes.$$scope = { dirty, ctx: ctx2 };
        }
        if (!updating_show && dirty & /*showModal*/
        8) {
          updating_show = true;
          modal_changes.show = /*showModal*/
          ctx2[3];
          add_flush_callback(() => updating_show = false);
        }
        modal.$set(modal_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        transition_in(modal.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        transition_out(modal.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t);
        }
        if (if_block)
          if_block.d(detaching);
        destroy_component(modal, detaching);
      }
    };
  }
  function instance23($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(22, $route = $$value));
    let { params } = $$props;
    const id = params["1"];
    const role = localStorage.getItem("role");
    let items;
    let comment;
    let status;
    let ka_departemen;
    let ka_lppm;
    let reviewer;
    let ka_pusat_kajian;
    let showModal = false;
    let kdeptSelected2;
    let klppmSelected2;
    let kpkSelected2;
    let reviewerSelected2;
    let judul2, abstrak2, isi2;
    onMount(async () => {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      ka_departemen = await findRole(11);
      ka_lppm = await findRole(12);
      ka_pusat_kajian = await findRole(13);
      reviewer = await findRole(10);
      const response = await fetch("/api/ppm/" + id, { method: "GET", headers });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        $$invalidate(0, items = []);
        for (const [field, value] of Object.entries(result)) {
          let obj = { field, value };
          items.push(obj);
        }
        console.log(items);
        judul2 = items[2].value;
        abstrak2 = items[3].value;
        isi2 = items[4].value;
        $$invalidate(2, status = items[5].value);
        kdeptSelected2 = items[7].value;
        klppmSelected2 = items[8].value;
        kpkSelected2 = items[9].value;
        reviewerSelected2 = items[10].value;
      }
    });
    async function handleRevisi() {
      $$invalidate(2, status = items[5].value - 1);
      const payload = {
        id,
        judul: judul2,
        abstrak: abstrak2,
        isi: isi2,
        status,
        comment,
        kdeptSelected: kdeptSelected2,
        klppmSelected: klppmSelected2,
        kpkSelected: kpkSelected2,
        reviewerSelected: reviewerSelected2
      };
      const response = await fetch("/api/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen/approval");
      } else {
        console.log(response);
      }
    }
    async function handlePass() {
      $$invalidate(2, status = items[5].value + 2);
      const payload = {
        id,
        judul: judul2,
        abstrak: abstrak2,
        isi: isi2,
        status,
        comment: "",
        kdeptSelected: kdeptSelected2,
        klppmSelected: klppmSelected2,
        kpkSelected: kpkSelected2,
        reviewerSelected: reviewerSelected2
      };
      console.log("reviewerSelected", reviewerSelected2);
      const response = await fetch("/api/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen/approval");
      } else {
        console.log(response);
      }
    }
    async function searchUser(ev) {
      const response = await fetch("/api/user");
      const result = await response.json();
      if (response.ok) {
        $$invalidate(3, showModal = true);
      }
    }
    let options;
    async function findRole(role2) {
      const response = await fetch("/api/role/" + role2);
      const result = await response.json();
      if (response.ok) {
        options = result;
        return options;
      } else {
        console.log(response);
      }
    }
    function field_value_binding(value) {
      comment = value;
      $$invalidate(1, comment);
    }
    function modal_show_binding(value) {
      showModal = value;
      $$invalidate(3, showModal);
    }
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(7, params = $$props2.params);
    };
    return [
      items,
      comment,
      status,
      showModal,
      role,
      handleRevisi,
      handlePass,
      params,
      field_value_binding,
      modal_show_binding
    ];
  }
  var Detailproposal = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance23, create_fragment32, safe_not_equal, { params: 7 });
    }
  };
  var detailproposal_default = Detailproposal;

  // src/pages/dosen/+home.svelte
  function add_css21(target) {
    append_styles(target, "svelte-123mmn1", ".view.svelte-123mmn1{cursor:pointer}.status.svelte-123mmn1{text-align:center}");
  }
  function get_each_context10(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[4] = list[i];
    return child_ctx;
  }
  function create_if_block12(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot10] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty & /*$$scope, items*/
        129) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function create_each_block10(ctx) {
    let tr;
    let td0;
    let t0_value = (
      /*item*/
      ctx[4].judul + ""
    );
    let t0;
    let t1;
    let td1;
    let raw_value = (
      /*item*/
      ctx[4].abstrak + ""
    );
    let t2;
    let td2;
    let t4;
    let td3;
    let status;
    let td3_pid_value;
    let t5;
    let td4;
    let button;
    let t6;
    let button_pid_value;
    let t7;
    let current;
    let mounted;
    let dispose;
    status = new Status_default({ props: { code: (
      /*item*/
      ctx[4].status
    ) } });
    return {
      c() {
        tr = element("tr");
        td0 = element("td");
        t0 = text(t0_value);
        t1 = space();
        td1 = element("td");
        t2 = space();
        td2 = element("td");
        td2.innerHTML = `<progress class="progress is-success" value="60" max="100">60%</progress>`;
        t4 = space();
        td3 = element("td");
        create_component(status.$$.fragment);
        t5 = space();
        td4 = element("td");
        button = element("button");
        t6 = text("Detail");
        t7 = space();
        attr(td3, "class", "status svelte-123mmn1");
        attr(td3, "pid", td3_pid_value = /*item*/
        ctx[4].id);
        attr(button, "class", "button is-info");
        attr(button, "pid", button_pid_value = /*item*/
        ctx[4].id);
        attr(td4, "class", "view svelte-123mmn1");
      },
      m(target, anchor) {
        insert(target, tr, anchor);
        append(tr, td0);
        append(td0, t0);
        append(tr, t1);
        append(tr, td1);
        td1.innerHTML = raw_value;
        append(tr, t2);
        append(tr, td2);
        append(tr, t4);
        append(tr, td3);
        mount_component(status, td3, null);
        append(tr, t5);
        append(tr, td4);
        append(td4, button);
        append(button, t6);
        append(tr, t7);
        current = true;
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*detail*/
            ctx[1]
          );
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if ((!current || dirty & /*items*/
        1) && t0_value !== (t0_value = /*item*/
        ctx2[4].judul + ""))
          set_data(t0, t0_value);
        if ((!current || dirty & /*items*/
        1) && raw_value !== (raw_value = /*item*/
        ctx2[4].abstrak + ""))
          td1.innerHTML = raw_value;
        ;
        const status_changes = {};
        if (dirty & /*items*/
        1)
          status_changes.code = /*item*/
          ctx2[4].status;
        status.$set(status_changes);
        if (!current || dirty & /*items*/
        1 && td3_pid_value !== (td3_pid_value = /*item*/
        ctx2[4].id)) {
          attr(td3, "pid", td3_pid_value);
        }
        if (!current || dirty & /*items*/
        1 && button_pid_value !== (button_pid_value = /*item*/
        ctx2[4].id)) {
          attr(button, "pid", button_pid_value);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(status.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(status.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(tr);
        }
        destroy_component(status);
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot10(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let button;
    let span0;
    let icon;
    let t3;
    let span1;
    let t5;
    let table;
    let thead;
    let t15;
    let tbody;
    let current;
    let mounted;
    let dispose;
    icon = new Icon_default({ props: { id: "orang", src: accountAdd } });
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block10(get_each_context10(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "PPM Management";
        t1 = space();
        hr = element("hr");
        t2 = space();
        button = element("button");
        span0 = element("span");
        create_component(icon.$$.fragment);
        t3 = space();
        span1 = element("span");
        span1.innerHTML = `<a>Buat Proposal</a>`;
        t5 = space();
        table = element("table");
        thead = element("thead");
        thead.innerHTML = `<tr><th>Judul</th> <th>Abstract</th> <th>Progress</th> <th>Status</th> <th colspan="2">Action</th></tr>`;
        t15 = space();
        tbody = element("tbody");
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        attr(h1, "class", "title is-1");
        attr(span0, "class", "icon");
        attr(button, "class", "button is-info");
        attr(table, "class", "table is-fullwidth is-striped is-hoverable");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, button, anchor);
        append(button, span0);
        mount_component(icon, span0, null);
        append(button, t3);
        append(button, span1);
        insert(target, t5, anchor);
        insert(target, table, anchor);
        append(table, thead);
        append(table, t15);
        append(table, tbody);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(tbody, null);
          }
        }
        current = true;
        if (!mounted) {
          dispose = listen(button, "click", addProposal);
          mounted = true;
        }
      },
      p(ctx2, dirty) {
        if (dirty & /*items, detail*/
        3) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context10(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block10(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(tbody, null);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(icon.$$.fragment, local);
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        current = true;
      },
      o(local) {
        transition_out(icon.$$.fragment, local);
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(button);
          detach(t5);
          detach(table);
        }
        destroy_component(icon);
        destroy_each(each_blocks, detaching);
        mounted = false;
        dispose();
      }
    };
  }
  function create_fragment33(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*items*/
      ctx[0] && create_if_block12(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (
          /*items*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block12(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function addProposal() {
    location.href = "/dosen/proposal";
  }
  function instance24($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(2, $route = $$value));
    const id = localStorage.id;
    let items;
    onMount(async () => {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      const response = await fetch("/api/ppm/all/" + id, { method: "GET", headers });
      const result = await response.json();
      if (response.ok) {
        $$invalidate(0, items = result.dbData);
        console.log(result);
      } else {
        console.log(response);
      }
    });
    function detail(ev) {
      let propId = ev.target.getAttribute("pid");
      $route("/dosen/proposals/" + propId);
    }
    return [items, detail];
  }
  var Home3 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance24, create_fragment33, safe_not_equal, {}, add_css21);
    }
  };
  var home_default3 = Home3;

  // src/pages/dosen/+profile.svelte
  function get_each_context11(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[5] = list[i];
    child_ctx[6] = list;
    child_ctx[7] = i;
    return child_ctx;
  }
  function create_if_block13(ctx) {
    let t0;
    let br;
    let t1;
    let field;
    let current;
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block11(get_each_context11(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    field = new Field_default({
      props: {
        $$slots: { default: [create_default_slot_14] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t0 = space();
        br = element("br");
        t1 = space();
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, t0, anchor);
        insert(target, br, anchor);
        insert(target, t1, anchor);
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*items*/
        1) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context11(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block11(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(t0.parentNode, t0);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        const field_changes = {};
        if (dirty & /*$$scope*/
        256) {
          field_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(br);
          detach(t1);
        }
        destroy_each(each_blocks, detaching);
        destroy_component(field, detaching);
      }
    };
  }
  function create_each_block11(ctx) {
    let field;
    let updating_value;
    let current;
    function field_value_binding(value) {
      ctx[2](
        value,
        /*item*/
        ctx[5]
      );
    }
    let field_props = { name: (
      /*item*/
      ctx[5].field
    ) };
    if (
      /*item*/
      ctx[5].value !== void 0
    ) {
      field_props.value = /*item*/
      ctx[5].value;
    }
    field = new Field_default({ props: field_props });
    binding_callbacks.push(() => bind(field, "value", field_value_binding));
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        const field_changes = {};
        if (dirty & /*items*/
        1)
          field_changes.name = /*item*/
          ctx[5].field;
        if (!updating_value && dirty & /*items*/
        1) {
          updating_value = true;
          field_changes.value = /*item*/
          ctx[5].value;
          add_flush_callback(() => updating_value = false);
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_default_slot_14(ctx) {
    let button0;
    let t1;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        button0 = element("button");
        button0.textContent = "Kembali";
        t1 = space();
        button1 = element("button");
        button1.textContent = "Simpan";
        attr(button0, "class", "button is-info is-light");
        attr(button1, "class", "button is-info");
      },
      m(target, anchor) {
        insert(target, button0, anchor);
        insert(target, t1, anchor);
        insert(target, button1, anchor);
        if (!mounted) {
          dispose = listen(
            button1,
            "click",
            /*simpan*/
            ctx[1]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(button0);
          detach(t1);
          detach(button1);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot11(ctx) {
    let h1;
    let t1;
    let div;
    let t13;
    let if_block_anchor;
    let current;
    let if_block = (
      /*items*/
      ctx[0] && create_if_block13(ctx)
    );
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Profile";
        t1 = space();
        div = element("div");
        div.innerHTML = `<ul><li class="is-active"><a><span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span> <span>Identitas</span></a></li> <li><a><span class="icon is-small"><i class="fas fa-music" aria-hidden="true"></i></span> <span>Mata Kuliah</span></a></li> <li><a><span class="icon is-small"><i class="fas fa-film" aria-hidden="true"></i></span> <span>Riwayat Pendidikan</span></a></li> <li><a><span class="icon is-small"><i class="far fa-file-alt" aria-hidden="true"></i></span> <span>Pengalaman</span></a></li></ul>`;
        t13 = space();
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
        attr(h1, "class", "title is-1");
        attr(div, "class", "tabs is-boxed");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, div, anchor);
        insert(target, t13, anchor);
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*items*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block13(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(div);
          detach(t13);
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_fragment34(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot11] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const article_changes = {};
        if (dirty & /*$$scope, items*/
        257) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function instance25($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(3, $route = $$value));
    let items;
    const id = localStorage.getItem("id");
    onMount(async () => {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      const response = await fetch("/api/user/" + id, { method: "GET", headers });
      const result = await response.json();
      if (response.ok) {
        $$invalidate(0, items = []);
        for (const [field, value] of Object.entries(result[0])) {
          items.push({ field, value });
        }
      }
    });
    async function simpan() {
      let payload = {};
      msgNip = "";
      items.map((item) => {
        if (item.field === "id") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.id = Number(item.value);
          }
        }
        if (item.field === "uid") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.uid = Number(item.value);
          }
        }
        if (item.field === "nama_lengkap") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.nama_lengkap = item.value;
          }
        }
        if (item.field === "nip") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
            msgNip = "Entri berisikan huruf";
          } else {
            payload.nip = Number(item.value);
          }
        }
        if (item.field === "nidn") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.nidn = Number(item.value);
          }
        }
        if (item.field === "tempat_lahir") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.tempat_lahir = item.value;
          }
        }
        if (item.field === "tanggal_lahir") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.tanggal_lahir = Number(item.value);
          }
        }
        if (item.field === "alamat_rumah") {
          payload.alamat_rumah = item.value;
        }
        if (item.field === "alamat_kantor") {
          payload.alamat_kantor = item.value;
        }
        if (item.field === "nomor_handphone") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.nomor_handphone = Number(item.value);
          }
        }
        if (item.field === "nomor_whatsapp") {
          if (String(item.value).match(/[a-zA-Z]/)) {
            console.log("Entri berisikan huruf");
          } else {
            payload.nomor_whatsapp = Number(item.value);
          }
        }
        if (item.field === "perguruan_tinggi_asal") {
          payload.perguruan_tinggi_asal = item.value;
        }
        if (item.field === "program_studi") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.program_studi = item.value;
          }
        }
        if (item.field === "jabatan_fungsional") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.jabatan_fungsional = item.value;
          }
        }
        if (item.field === "pangkat_golongan") {
          if (item.value.match(/[0-9]/)) {
            console.log("Entri berisikan angka");
          } else {
            payload.pangkat_golongan = item.value;
          }
        }
      });
      const response = await fetch("/api/userprofile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        $route("/dosen");
      } else {
        console.log(response);
      }
    }
    function field_value_binding(value, item) {
      if ($$self.$$.not_equal(item.value, value)) {
        item.value = value;
        $$invalidate(0, items);
      }
    }
    return [items, simpan, field_value_binding];
  }
  var Profile2 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance25, create_fragment34, safe_not_equal, {});
    }
  };
  var profile_default2 = Profile2;

  // node_modules/@tinymce/tinymce-svelte/dist/index.mjs
  var uuid = (prefix) => {
    return prefix + "_" + Math.floor(Math.random() * 1e9) + String(Date.now());
  };
  var createScriptLoader = () => {
    let state = {
      listeners: [],
      scriptId: uuid("tiny-script"),
      scriptLoaded: false,
      injected: false
    };
    const injectScript = (scriptId, doc, url, cb) => {
      state.injected = true;
      const script = doc.createElement("script");
      script.referrerPolicy = "origin";
      script.type = "application/javascript";
      script.src = url;
      script.onload = () => {
        cb();
      };
      if (doc.head)
        doc.head.appendChild(script);
    };
    const load = (doc, url, callback) => {
      if (state.scriptLoaded) {
        callback();
      } else {
        state.listeners.push(callback);
        if (!state.injected) {
          injectScript(state.scriptId, doc, url, () => {
            state.listeners.forEach((fn) => fn());
            state.scriptLoaded = true;
          });
        }
      }
    };
    return { load };
  };
  var scriptLoader = createScriptLoader();

  // src/pages/dosen/+proposal.svelte
  function create_default_slot_15(ctx) {
    let button0;
    let t1;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        button0 = element("button");
        button0.textContent = "Simpan";
        t1 = space();
        button1 = element("button");
        button1.textContent = "Submit";
        attr(button0, "class", "button is-info is-light");
        attr(button1, "class", "button is-info");
      },
      m(target, anchor) {
        insert(target, button0, anchor);
        insert(target, t1, anchor);
        insert(target, button1, anchor);
        if (!mounted) {
          dispose = [
            listen(
              button0,
              "click",
              /*simpanProposal*/
              ctx[10]
            ),
            listen(
              button1,
              "click",
              /*submitProposal*/
              ctx[11]
            )
          ];
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(button0);
          detach(t1);
          detach(button1);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot12(ctx) {
    let h1;
    let t1;
    let hr;
    let t2;
    let br0;
    let t3;
    let div1;
    let t6;
    let field0;
    let updating_value;
    let t7;
    let field1;
    let t8;
    let field2;
    let t9;
    let field3;
    let updating_value_1;
    let t10;
    let field4;
    let updating_value_2;
    let t11;
    let field5;
    let updating_value_3;
    let t12;
    let field6;
    let updating_value_4;
    let t13;
    let field7;
    let updating_value_5;
    let t14;
    let field8;
    let updating_value_6;
    let t15;
    let field9;
    let updating_value_7;
    let t16;
    let field10;
    let updating_value_8;
    let t17;
    let field11;
    let updating_value_9;
    let t18;
    let br1;
    let t19;
    let field12;
    let current;
    function field0_value_binding(value) {
      ctx[12](value);
    }
    let field0_props = { name: "Judul" };
    if (
      /*judul*/
      ctx[4] !== void 0
    ) {
      field0_props.value = /*judul*/
      ctx[4];
    }
    field0 = new Field_default({ props: field0_props });
    binding_callbacks.push(() => bind(field0, "value", field0_value_binding));
    field1 = new Field_default({
      props: {
        id: "abstract",
        textarea: true,
        name: "Abstrak"
      }
    });
    field2 = new Field_default({
      props: {
        id: "isi",
        textarea: true,
        name: "Isi Proposal"
      }
    });
    function field3_value_binding(value) {
      ctx[13](value);
    }
    let field3_props = { select: true, name: "Jenis Kegiatan" };
    if (
      /*jenisKegiatan*/
      ctx[0] !== void 0
    ) {
      field3_props.value = /*jenisKegiatan*/
      ctx[0];
    }
    field3 = new Field_default({ props: field3_props });
    binding_callbacks.push(() => bind(field3, "value", field3_value_binding));
    function field4_value_binding(value) {
      ctx[14](value);
    }
    let field4_props = { select: true, name: "Jenis Skema" };
    if (
      /*jenisSkema*/
      ctx[2] !== void 0
    ) {
      field4_props.value = /*jenisSkema*/
      ctx[2];
    }
    field4 = new Field_default({ props: field4_props });
    binding_callbacks.push(() => bind(field4, "value", field4_value_binding));
    function field5_value_binding(value) {
      ctx[15](value);
    }
    let field5_props = { select: true, name: "Jenis Proposal" };
    if (
      /*jenisProposal*/
      ctx[1] !== void 0
    ) {
      field5_props.value = /*jenisProposal*/
      ctx[1];
    }
    field5 = new Field_default({ props: field5_props });
    binding_callbacks.push(() => bind(field5, "value", field5_value_binding));
    function field6_value_binding(value) {
      ctx[16](value);
    }
    let field6_props = { select: true, name: "Kelompok Keahlian" };
    if (
      /*kelompokKeahlian*/
      ctx[3] !== void 0
    ) {
      field6_props.value = /*kelompokKeahlian*/
      ctx[3];
    }
    field6 = new Field_default({ props: field6_props });
    binding_callbacks.push(() => bind(field6, "value", field6_value_binding));
    function field7_value_binding(value) {
      ctx[17](value);
    }
    let field7_props = {
      datepicker: true,
      name: "Tahun Pelaksanaan"
    };
    if (
      /*tahunPelaksanaan*/
      ctx[5] !== void 0
    ) {
      field7_props.value = /*tahunPelaksanaan*/
      ctx[5];
    }
    field7 = new Field_default({ props: field7_props });
    binding_callbacks.push(() => bind(field7, "value", field7_value_binding));
    function field8_value_binding(value) {
      ctx[18](value);
    }
    let field8_props = { select: true, name: "Topik" };
    if (
      /*Topik*/
      ctx[6] !== void 0
    ) {
      field8_props.value = /*Topik*/
      ctx[6];
    }
    field8 = new Field_default({ props: field8_props });
    binding_callbacks.push(() => bind(field8, "value", field8_value_binding));
    function field9_value_binding(value) {
      ctx[19](value);
    }
    let field9_props = { select: true, name: "Biaya Penelitian" };
    if (
      /*biayaPenelitian*/
      ctx[7] !== void 0
    ) {
      field9_props.value = /*biayaPenelitian*/
      ctx[7];
    }
    field9 = new Field_default({ props: field9_props });
    binding_callbacks.push(() => bind(field9, "value", field9_value_binding));
    function field10_value_binding(value) {
      ctx[20](value);
    }
    let field10_props = { select: true, name: "Anggota Tim" };
    if (
      /*anggotaTim*/
      ctx[8] !== void 0
    ) {
      field10_props.value = /*anggotaTim*/
      ctx[8];
    }
    field10 = new Field_default({ props: field10_props });
    binding_callbacks.push(() => bind(field10, "value", field10_value_binding));
    function field11_value_binding(value) {
      ctx[21](value);
    }
    let field11_props = {
      select: true,
      name: "Rincian Anggaran Biaya (RAB)"
    };
    if (
      /*rab*/
      ctx[9] !== void 0
    ) {
      field11_props.value = /*rab*/
      ctx[9];
    }
    field11 = new Field_default({ props: field11_props });
    binding_callbacks.push(() => bind(field11, "value", field11_value_binding));
    field12 = new Field_default({
      props: {
        $$slots: { default: [create_default_slot_15] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Buat Proposal";
        t1 = space();
        hr = element("hr");
        t2 = space();
        br0 = element("br");
        t3 = space();
        div1 = element("div");
        div1.innerHTML = `<label class="label">Name</label> <div class="control"><input class="input" type="text" placeholder="Text input"/></div>`;
        t6 = space();
        create_component(field0.$$.fragment);
        t7 = space();
        create_component(field1.$$.fragment);
        t8 = space();
        create_component(field2.$$.fragment);
        t9 = space();
        create_component(field3.$$.fragment);
        t10 = space();
        create_component(field4.$$.fragment);
        t11 = space();
        create_component(field5.$$.fragment);
        t12 = space();
        create_component(field6.$$.fragment);
        t13 = space();
        create_component(field7.$$.fragment);
        t14 = space();
        create_component(field8.$$.fragment);
        t15 = space();
        create_component(field9.$$.fragment);
        t16 = space();
        create_component(field10.$$.fragment);
        t17 = space();
        create_component(field11.$$.fragment);
        t18 = space();
        br1 = element("br");
        t19 = space();
        create_component(field12.$$.fragment);
        attr(h1, "class", "title is-1");
        attr(div1, "class", "field");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, hr, anchor);
        insert(target, t2, anchor);
        insert(target, br0, anchor);
        insert(target, t3, anchor);
        insert(target, div1, anchor);
        insert(target, t6, anchor);
        mount_component(field0, target, anchor);
        insert(target, t7, anchor);
        mount_component(field1, target, anchor);
        insert(target, t8, anchor);
        mount_component(field2, target, anchor);
        insert(target, t9, anchor);
        mount_component(field3, target, anchor);
        insert(target, t10, anchor);
        mount_component(field4, target, anchor);
        insert(target, t11, anchor);
        mount_component(field5, target, anchor);
        insert(target, t12, anchor);
        mount_component(field6, target, anchor);
        insert(target, t13, anchor);
        mount_component(field7, target, anchor);
        insert(target, t14, anchor);
        mount_component(field8, target, anchor);
        insert(target, t15, anchor);
        mount_component(field9, target, anchor);
        insert(target, t16, anchor);
        mount_component(field10, target, anchor);
        insert(target, t17, anchor);
        mount_component(field11, target, anchor);
        insert(target, t18, anchor);
        insert(target, br1, anchor);
        insert(target, t19, anchor);
        mount_component(field12, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field0_changes = {};
        if (!updating_value && dirty & /*judul*/
        16) {
          updating_value = true;
          field0_changes.value = /*judul*/
          ctx2[4];
          add_flush_callback(() => updating_value = false);
        }
        field0.$set(field0_changes);
        const field3_changes = {};
        if (!updating_value_1 && dirty & /*jenisKegiatan*/
        1) {
          updating_value_1 = true;
          field3_changes.value = /*jenisKegiatan*/
          ctx2[0];
          add_flush_callback(() => updating_value_1 = false);
        }
        field3.$set(field3_changes);
        const field4_changes = {};
        if (!updating_value_2 && dirty & /*jenisSkema*/
        4) {
          updating_value_2 = true;
          field4_changes.value = /*jenisSkema*/
          ctx2[2];
          add_flush_callback(() => updating_value_2 = false);
        }
        field4.$set(field4_changes);
        const field5_changes = {};
        if (!updating_value_3 && dirty & /*jenisProposal*/
        2) {
          updating_value_3 = true;
          field5_changes.value = /*jenisProposal*/
          ctx2[1];
          add_flush_callback(() => updating_value_3 = false);
        }
        field5.$set(field5_changes);
        const field6_changes = {};
        if (!updating_value_4 && dirty & /*kelompokKeahlian*/
        8) {
          updating_value_4 = true;
          field6_changes.value = /*kelompokKeahlian*/
          ctx2[3];
          add_flush_callback(() => updating_value_4 = false);
        }
        field6.$set(field6_changes);
        const field7_changes = {};
        if (!updating_value_5 && dirty & /*tahunPelaksanaan*/
        32) {
          updating_value_5 = true;
          field7_changes.value = /*tahunPelaksanaan*/
          ctx2[5];
          add_flush_callback(() => updating_value_5 = false);
        }
        field7.$set(field7_changes);
        const field8_changes = {};
        if (!updating_value_6 && dirty & /*Topik*/
        64) {
          updating_value_6 = true;
          field8_changes.value = /*Topik*/
          ctx2[6];
          add_flush_callback(() => updating_value_6 = false);
        }
        field8.$set(field8_changes);
        const field9_changes = {};
        if (!updating_value_7 && dirty & /*biayaPenelitian*/
        128) {
          updating_value_7 = true;
          field9_changes.value = /*biayaPenelitian*/
          ctx2[7];
          add_flush_callback(() => updating_value_7 = false);
        }
        field9.$set(field9_changes);
        const field10_changes = {};
        if (!updating_value_8 && dirty & /*anggotaTim*/
        256) {
          updating_value_8 = true;
          field10_changes.value = /*anggotaTim*/
          ctx2[8];
          add_flush_callback(() => updating_value_8 = false);
        }
        field10.$set(field10_changes);
        const field11_changes = {};
        if (!updating_value_9 && dirty & /*rab*/
        512) {
          updating_value_9 = true;
          field11_changes.value = /*rab*/
          ctx2[9];
          add_flush_callback(() => updating_value_9 = false);
        }
        field11.$set(field11_changes);
        const field12_changes = {};
        if (dirty & /*$$scope*/
        134217728) {
          field12_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field12.$set(field12_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field0.$$.fragment, local);
        transition_in(field1.$$.fragment, local);
        transition_in(field2.$$.fragment, local);
        transition_in(field3.$$.fragment, local);
        transition_in(field4.$$.fragment, local);
        transition_in(field5.$$.fragment, local);
        transition_in(field6.$$.fragment, local);
        transition_in(field7.$$.fragment, local);
        transition_in(field8.$$.fragment, local);
        transition_in(field9.$$.fragment, local);
        transition_in(field10.$$.fragment, local);
        transition_in(field11.$$.fragment, local);
        transition_in(field12.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field0.$$.fragment, local);
        transition_out(field1.$$.fragment, local);
        transition_out(field2.$$.fragment, local);
        transition_out(field3.$$.fragment, local);
        transition_out(field4.$$.fragment, local);
        transition_out(field5.$$.fragment, local);
        transition_out(field6.$$.fragment, local);
        transition_out(field7.$$.fragment, local);
        transition_out(field8.$$.fragment, local);
        transition_out(field9.$$.fragment, local);
        transition_out(field10.$$.fragment, local);
        transition_out(field11.$$.fragment, local);
        transition_out(field12.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(hr);
          detach(t2);
          detach(br0);
          detach(t3);
          detach(div1);
          detach(t6);
          detach(t7);
          detach(t8);
          detach(t9);
          detach(t10);
          detach(t11);
          detach(t12);
          detach(t13);
          detach(t14);
          detach(t15);
          detach(t16);
          detach(t17);
          detach(t18);
          detach(br1);
          detach(t19);
        }
        destroy_component(field0, detaching);
        destroy_component(field1, detaching);
        destroy_component(field2, detaching);
        destroy_component(field3, detaching);
        destroy_component(field4, detaching);
        destroy_component(field5, detaching);
        destroy_component(field6, detaching);
        destroy_component(field7, detaching);
        destroy_component(field8, detaching);
        destroy_component(field9, detaching);
        destroy_component(field10, detaching);
        destroy_component(field11, detaching);
        destroy_component(field12, detaching);
      }
    };
  }
  function create_fragment35(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot12] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        const article_changes = {};
        if (dirty & /*$$scope, rab, anggotaTim, biayaPenelitian, Topik, tahunPelaksanaan, kelompokKeahlian, jenisProposal, jenisSkema, jenisKegiatan, judul*/
        134218751) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function instance26($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(24, $route = $$value));
    let jenisKegiatan = "";
    let jenisProposal = "";
    let jenisSkema = "";
    let kelompokKeahlian = "";
    let judul2 = "";
    let tahunPelaksanaan = "";
    let Topik = "";
    let biayaPenelitian = "";
    let anggotaTim = "";
    let rab = "";
    let myAbstract;
    let myIsi;
    const id = Number(localStorage.getItem("id"));
    onMount(() => {
      tinymce.init({
        selector: "textarea",
        plugins: "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
        toolbar: "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
        tinycomments_mode: "embedded",
        tinycomments_author: "Author name",
        mergetags_list: [
          { value: "First.Name", title: "First Name" },
          { value: "Email", title: "Email" }
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant"))
      });
    });
    async function simpanProposal() {
      const accessToken = localStorage.getItem("token");
      myAbstract = tinymce.get("abstract").getContent();
      myIsi = tinymce.get("isi").getContent();
      let payload = {
        id,
        judul: judul2,
        myAbstract,
        myIsi,
        status: 0,
        tahunPelaksanaan
      };
      const response = await fetch("/api/ppm", {
        method: "POST",
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result);
        $route("/dosen");
      } else {
        console.log(result.msg);
      }
    }
    async function submitProposal() {
      const accessToken = localStorage.getItem("token");
      myAbstract = tinymce.get("abstract").getContent();
      myIsi = tinymce.get("isi").getContent();
      let payload = {
        id,
        judul: judul2,
        myAbstract,
        myIsi,
        status: 2,
        tahunPelaksanaan
      };
      const response = await fetch("/api/ppm", {
        method: "POST",
        headers: {
          Authorization: `${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen");
      } else {
        console.log(result.msg);
      }
    }
    let listKodeProgram = [
      {
        idKodeProgram: "1",
        namaProgram: "Skema Riset Kelompok Keahlian"
      },
      {
        idKodeProgram: "2",
        namaProgram: "Skema Riset Terapan"
      },
      {
        idKodeProgram: "3",
        namaProgram: "Skema Riset Kerjasama"
      },
      {
        idKodeProgram: "4",
        namaProgram: "Skema Riset Mandiri"
      },
      {
        idKodeProgram: "5",
        namaProgram: "Skema Riset Hibah Eksternal"
      }
    ];
    function field0_value_binding(value) {
      judul2 = value;
      $$invalidate(4, judul2);
    }
    function field3_value_binding(value) {
      jenisKegiatan = value;
      $$invalidate(0, jenisKegiatan);
    }
    function field4_value_binding(value) {
      jenisSkema = value;
      $$invalidate(2, jenisSkema);
    }
    function field5_value_binding(value) {
      jenisProposal = value;
      $$invalidate(1, jenisProposal);
    }
    function field6_value_binding(value) {
      kelompokKeahlian = value;
      $$invalidate(3, kelompokKeahlian);
    }
    function field7_value_binding(value) {
      tahunPelaksanaan = value;
      $$invalidate(5, tahunPelaksanaan);
    }
    function field8_value_binding(value) {
      Topik = value;
      $$invalidate(6, Topik);
    }
    function field9_value_binding(value) {
      biayaPenelitian = value;
      $$invalidate(7, biayaPenelitian);
    }
    function field10_value_binding(value) {
      anggotaTim = value;
      $$invalidate(8, anggotaTim);
    }
    function field11_value_binding(value) {
      rab = value;
      $$invalidate(9, rab);
    }
    return [
      jenisKegiatan,
      jenisProposal,
      jenisSkema,
      kelompokKeahlian,
      judul2,
      tahunPelaksanaan,
      Topik,
      biayaPenelitian,
      anggotaTim,
      rab,
      simpanProposal,
      submitProposal,
      field0_value_binding,
      field3_value_binding,
      field4_value_binding,
      field5_value_binding,
      field6_value_binding,
      field7_value_binding,
      field8_value_binding,
      field9_value_binding,
      field10_value_binding,
      field11_value_binding
    ];
  }
  var Proposal2 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance26, create_fragment35, safe_not_equal, {});
    }
  };
  var proposal_default2 = Proposal2;

  // src/pages/dosen/+proposals.svelte
  function get_each_context12(ctx, list, i) {
    const child_ctx = ctx.slice();
    child_ctx[11] = list[i];
    child_ctx[12] = list;
    child_ctx[13] = i;
    return child_ctx;
  }
  function create_if_block14(ctx) {
    let article;
    let current;
    article = new Article_default({
      props: {
        $$slots: { default: [create_default_slot13] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(article.$$.fragment);
      },
      m(target, anchor) {
        mount_component(article, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const article_changes = {};
        if (dirty & /*$$scope, statusProposal, view, items*/
        16391) {
          article_changes.$$scope = { dirty, ctx: ctx2 };
        }
        article.$set(article_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(article.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(article.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(article, detaching);
      }
    };
  }
  function create_if_block_35(ctx) {
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [create_if_block_44, create_else_block_1];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (
        /*item*/
        ctx2[11].key === "status"
      )
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if_blocks[current_block_type_index].d(detaching);
      }
    };
  }
  function create_else_block_1(ctx) {
    let field;
    let updating_value;
    let current;
    function field_value_binding(value) {
      ctx[7](
        value,
        /*item*/
        ctx[11]
      );
    }
    let field_props = {
      view: (
        /*view*/
        ctx[1] || /*item*/
        ctx[11].key === "comment"
      ),
      name: (
        /*item*/
        ctx[11].key
      ),
      textarea: (
        /*item*/
        ctx[11].key === "abstract" ? true : null
      )
    };
    if (
      /*item*/
      ctx[11].value !== void 0
    ) {
      field_props.value = /*item*/
      ctx[11].value;
    }
    field = new Field_default({ props: field_props });
    binding_callbacks.push(() => bind(field, "value", field_value_binding));
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(new_ctx, dirty) {
        ctx = new_ctx;
        const field_changes = {};
        if (dirty & /*view, items*/
        3)
          field_changes.view = /*view*/
          ctx[1] || /*item*/
          ctx[11].key === "comment";
        if (dirty & /*items*/
        1)
          field_changes.name = /*item*/
          ctx[11].key;
        if (dirty & /*items*/
        1)
          field_changes.textarea = /*item*/
          ctx[11].key === "abstract" ? true : null;
        if (!updating_value && dirty & /*items*/
        1) {
          updating_value = true;
          field_changes.value = /*item*/
          ctx[11].value;
          add_flush_callback(() => updating_value = false);
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_if_block_44(ctx) {
    let field;
    let current;
    field = new Field_default({
      props: {
        name: (
          /*item*/
          ctx[11].key
        ),
        $$slots: { default: [create_default_slot_33] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field_changes = {};
        if (dirty & /*items*/
        1)
          field_changes.name = /*item*/
          ctx2[11].key;
        if (dirty & /*$$scope, items*/
        16385) {
          field_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_default_slot_33(ctx) {
    let status;
    let current;
    status = new Status_default({ props: { code: (
      /*item*/
      ctx[11].value
    ) } });
    return {
      c() {
        create_component(status.$$.fragment);
      },
      m(target, anchor) {
        mount_component(status, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const status_changes = {};
        if (dirty & /*items*/
        1)
          status_changes.code = /*item*/
          ctx2[11].value;
        status.$set(status_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(status.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(status.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(status, detaching);
      }
    };
  }
  function create_each_block12(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*item*/
      ctx[11].key !== "uid" && /*item*/
      ctx[11].key !== "id" && /*item*/
      ctx[11].key !== "uid_kdept" && /*item*/
      ctx[11].key !== "uid_klppm" && /*item*/
      ctx[11].key !== "uid_kpk" && /*item*/
      ctx[11].key !== "uid_reviewer" && /*item*/
      ctx[11].key !== "jenis_kegiatan" && /*item*/
      ctx[11].key !== "kode_program" && /*item*/
      ctx[11].key !== "tipe_proposal" && /*item*/
      ctx[11].key !== "kelompok_keahlian" && /*item*/
      ctx[11].key !== "tahun_pelaksanaan" && /*item*/
      ctx[11].key !== "topik" && /*item*/
      ctx[11].key !== "biaya_penelitian" && /*item*/
      ctx[11].key !== "anggota_tim" && /*item*/
      ctx[11].key !== "update" && create_if_block_35(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (
          /*item*/
          ctx2[11].key !== "uid" && /*item*/
          ctx2[11].key !== "id" && /*item*/
          ctx2[11].key !== "uid_kdept" && /*item*/
          ctx2[11].key !== "uid_klppm" && /*item*/
          ctx2[11].key !== "uid_kpk" && /*item*/
          ctx2[11].key !== "uid_reviewer" && /*item*/
          ctx2[11].key !== "jenis_kegiatan" && /*item*/
          ctx2[11].key !== "kode_program" && /*item*/
          ctx2[11].key !== "tipe_proposal" && /*item*/
          ctx2[11].key !== "kelompok_keahlian" && /*item*/
          ctx2[11].key !== "tahun_pelaksanaan" && /*item*/
          ctx2[11].key !== "topik" && /*item*/
          ctx2[11].key !== "biaya_penelitian" && /*item*/
          ctx2[11].key !== "anggota_tim" && /*item*/
          ctx2[11].key !== "update"
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_35(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_if_block_18(ctx) {
    let br;
    let t;
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [create_if_block_25, create_else_block7];
    const if_blocks = [];
    function select_block_type_1(ctx2, dirty) {
      if (!/*statusProposal*/
      ctx2[2])
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type_1(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        br = element("br");
        t = space();
        if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        insert(target, br, anchor);
        insert(target, t, anchor);
        if_blocks[current_block_type_index].m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type_1(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(br);
          detach(t);
          detach(if_block_anchor);
        }
        if_blocks[current_block_type_index].d(detaching);
      }
    };
  }
  function create_else_block7(ctx) {
    let field;
    let current;
    field = new Field_default({
      props: {
        $$slots: { default: [create_default_slot_23] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field_changes = {};
        if (dirty & /*$$scope*/
        16384) {
          field_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_if_block_25(ctx) {
    let field;
    let current;
    field = new Field_default({
      props: {
        $$slots: { default: [create_default_slot_16] },
        $$scope: { ctx }
      }
    });
    return {
      c() {
        create_component(field.$$.fragment);
      },
      m(target, anchor) {
        mount_component(field, target, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        const field_changes = {};
        if (dirty & /*$$scope*/
        16384) {
          field_changes.$$scope = { dirty, ctx: ctx2 };
        }
        field.$set(field_changes);
      },
      i(local) {
        if (current)
          return;
        transition_in(field.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(field.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(field, detaching);
      }
    };
  }
  function create_default_slot_23(ctx) {
    let button;
    let mounted;
    let dispose;
    return {
      c() {
        button = element("button");
        button.textContent = "Remediasi";
      },
      m(target, anchor) {
        insert(target, button, anchor);
        if (!mounted) {
          dispose = listen(
            button,
            "click",
            /*remediasi*/
            ctx[3]
          );
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(button);
        }
        mounted = false;
        dispose();
      }
    };
  }
  function create_default_slot_16(ctx) {
    let button0;
    let t1;
    let button1;
    let mounted;
    let dispose;
    return {
      c() {
        button0 = element("button");
        button0.textContent = "Simpan";
        t1 = space();
        button1 = element("button");
        button1.textContent = "Submit";
      },
      m(target, anchor) {
        insert(target, button0, anchor);
        insert(target, t1, anchor);
        insert(target, button1, anchor);
        if (!mounted) {
          dispose = [
            listen(
              button0,
              "click",
              /*simpanProposal*/
              ctx[5]
            ),
            listen(
              button1,
              "click",
              /*submitProposal*/
              ctx[4]
            )
          ];
          mounted = true;
        }
      },
      p: noop,
      d(detaching) {
        if (detaching) {
          detach(button0);
          detach(t1);
          detach(button1);
        }
        mounted = false;
        run_all(dispose);
      }
    };
  }
  function create_default_slot13(ctx) {
    let h1;
    let t1;
    let div;
    let t13;
    let t14;
    let if_block_anchor;
    let current;
    let each_value = ensure_array_like(
      /*items*/
      ctx[0]
    );
    let each_blocks = [];
    for (let i = 0; i < each_value.length; i += 1) {
      each_blocks[i] = create_each_block12(get_each_context12(ctx, each_value, i));
    }
    const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
      each_blocks[i] = null;
    });
    let if_block = !/*view*/
    ctx[1] && create_if_block_18(ctx);
    return {
      c() {
        h1 = element("h1");
        h1.textContent = "Detail Proposal";
        t1 = space();
        div = element("div");
        div.innerHTML = `<ul><li class="is-active"><a><span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span> <span>Identitas PPM</span></a></li> <li><a><span class="icon is-small"><i class="fas fa-music" aria-hidden="true"></i></span> <span>Status</span></a></li> <li><a><span class="icon is-small"><i class="fas fa-film" aria-hidden="true"></i></span> <span>Logbook / Monev</span></a></li> <li><a><span class="icon is-small"><i class="far fa-file-alt" aria-hidden="true"></i></span> <span>Laporan</span></a></li></ul>`;
        t13 = space();
        for (let i = 0; i < each_blocks.length; i += 1) {
          each_blocks[i].c();
        }
        t14 = space();
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
        attr(h1, "class", "title is-1");
        attr(div, "class", "tabs is-boxed");
      },
      m(target, anchor) {
        insert(target, h1, anchor);
        insert(target, t1, anchor);
        insert(target, div, anchor);
        insert(target, t13, anchor);
        for (let i = 0; i < each_blocks.length; i += 1) {
          if (each_blocks[i]) {
            each_blocks[i].m(target, anchor);
          }
        }
        insert(target, t14, anchor);
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*items, view*/
        3) {
          each_value = ensure_array_like(
            /*items*/
            ctx2[0]
          );
          let i;
          for (i = 0; i < each_value.length; i += 1) {
            const child_ctx = get_each_context12(ctx2, each_value, i);
            if (each_blocks[i]) {
              each_blocks[i].p(child_ctx, dirty);
              transition_in(each_blocks[i], 1);
            } else {
              each_blocks[i] = create_each_block12(child_ctx);
              each_blocks[i].c();
              transition_in(each_blocks[i], 1);
              each_blocks[i].m(t14.parentNode, t14);
            }
          }
          group_outros();
          for (i = each_value.length; i < each_blocks.length; i += 1) {
            out(i);
          }
          check_outros();
        }
        if (!/*view*/
        ctx2[1]) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*view*/
            2) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block_18(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        for (let i = 0; i < each_value.length; i += 1) {
          transition_in(each_blocks[i]);
        }
        transition_in(if_block);
        current = true;
      },
      o(local) {
        each_blocks = each_blocks.filter(Boolean);
        for (let i = 0; i < each_blocks.length; i += 1) {
          transition_out(each_blocks[i]);
        }
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(h1);
          detach(t1);
          detach(div);
          detach(t13);
          detach(t14);
          detach(if_block_anchor);
        }
        destroy_each(each_blocks, detaching);
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function create_fragment36(ctx) {
    let if_block_anchor;
    let current;
    let if_block = (
      /*items*/
      ctx[0] && create_if_block14(ctx)
    );
    return {
      c() {
        if (if_block)
          if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if (if_block)
          if_block.m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (
          /*items*/
          ctx2[0]
        ) {
          if (if_block) {
            if_block.p(ctx2, dirty);
            if (dirty & /*items*/
            1) {
              transition_in(if_block, 1);
            }
          } else {
            if_block = create_if_block14(ctx2);
            if_block.c();
            transition_in(if_block, 1);
            if_block.m(if_block_anchor.parentNode, if_block_anchor);
          }
        } else if (if_block) {
          group_outros();
          transition_out(if_block, 1, 1, () => {
            if_block = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if (if_block)
          if_block.d(detaching);
      }
    };
  }
  function isEdit(code) {
    const edit = [0, 1, 3, 5, 9];
    return edit.some((x) => x === code);
  }
  function instance27($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(9, $route = $$value));
    let { params } = $$props;
    let items;
    let view;
    let data2;
    let statusProposal;
    const id = params["1"];
    onMount(async () => {
      const accessToken = localStorage.getItem("token");
      const headers = {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json"
      };
      const response = await fetch("/api/ppm/" + id, { method: "GET", headers });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        $$invalidate(0, items = []);
        data2 = result;
        for (const [key, value] of Object.entries(result)) {
          if (key === "status") {
            $$invalidate(1, view = !isEdit(value));
          }
          items.push({ key, value });
        }
        console.log(items);
        judul = items[2].value;
        abstrak = items[3].value;
        isi = items[4].value;
        $$invalidate(2, statusProposal = items[5].value);
        kdeptSelected = items[7].value;
        klppmSelected = items[8].value;
        kpkSelected = items[9].value;
        reviewerSelected = items[10].value;
      } else {
        console.log(response);
      }
    });
    async function remediasi() {
      const data3 = {};
      items.map((x) => data3[x.key] = x.value);
      const payload = {
        id: data3.id,
        judul: data3.judul,
        abstrak: data3.abstrak,
        isi: data3.isi,
        status: Number(data3.status) + 1,
        comment: "",
        kdeptSelected,
        klppmSelected,
        kpkSelected,
        reviewerSelected
      };
      const response = await fetch("/api/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen");
      } else {
        console.log(response);
      }
    }
    async function submitProposal() {
      const data3 = {};
      items.map((x) => data3[x.key] = x.value);
      const payload = {
        id: data3.id,
        judul: data3.judul,
        abstrak: data3.abstrak,
        isi: data3.isi,
        status: Number(data3.status) + 2
      };
      const response = await fetch("/api/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen");
      } else {
        console.log(response);
      }
    }
    async function simpanProposal() {
      const data3 = {};
      items.map((x) => data3[x.key] = x.value);
      const payload = {
        id: data3.id,
        judul: data3.judul,
        abstrak: data3.abstrak,
        status: Number(data3.status)
      };
      const response = await fetch("/api/ppm", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (response.ok) {
        $route("/dosen");
      } else {
        console.log(response);
      }
    }
    function field_value_binding(value, item) {
      if ($$self.$$.not_equal(item.value, value)) {
        item.value = value;
        $$invalidate(0, items);
      }
    }
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(6, params = $$props2.params);
    };
    return [
      items,
      view,
      statusProposal,
      remediasi,
      submitProposal,
      simpanProposal,
      params,
      field_value_binding
    ];
  }
  var Proposals2 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance27, create_fragment36, safe_not_equal, { params: 6 });
    }
  };
  var proposals_default2 = Proposals2;

  // src/pages/dosen/Index.svelte
  function create_else_block8(ctx) {
    let e404;
    let current;
    e404 = new E404_default({});
    return {
      c() {
        create_component(e404.$$.fragment);
      },
      m(target, anchor) {
        mount_component(e404, target, anchor);
        current = true;
      },
      p: noop,
      i(local) {
        if (current)
          return;
        transition_in(e404.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(e404.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(e404, detaching);
      }
    };
  }
  function create_if_block15(ctx) {
    let switch_instance;
    let switch_instance_anchor;
    let current;
    var switch_value = (
      /*page*/
      ctx[1]
    );
    function switch_props(ctx2, dirty) {
      return { props: { params: (
        /*params*/
        ctx2[0]
      ) } };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
        switch_instance_anchor = empty();
      },
      m(target, anchor) {
        if (switch_instance)
          mount_component(switch_instance, target, anchor);
        insert(target, switch_instance_anchor, anchor);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*page*/
        2 && switch_value !== (switch_value = /*page*/
        ctx2[1])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          const switch_instance_changes = {};
          if (dirty & /*params*/
          1)
            switch_instance_changes.params = /*params*/
            ctx2[0];
          switch_instance.$set(switch_instance_changes);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(switch_instance_anchor);
        }
        if (switch_instance)
          destroy_component(switch_instance, detaching);
      }
    };
  }
  function create_fragment37(ctx) {
    let current_block_type_index;
    let if_block;
    let if_block_anchor;
    let current;
    const if_block_creators = [create_if_block15, create_else_block8];
    const if_blocks = [];
    function select_block_type(ctx2, dirty) {
      if (
        /*page*/
        ctx2[1]
      )
        return 0;
      return 1;
    }
    current_block_type_index = select_block_type(ctx, -1);
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    return {
      c() {
        if_block.c();
        if_block_anchor = empty();
      },
      m(target, anchor) {
        if_blocks[current_block_type_index].m(target, anchor);
        insert(target, if_block_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        let previous_block_index = current_block_type_index;
        current_block_type_index = select_block_type(ctx2, dirty);
        if (current_block_type_index === previous_block_index) {
          if_blocks[current_block_type_index].p(ctx2, dirty);
        } else {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          } else {
            if_block.p(ctx2, dirty);
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(if_block);
        current = true;
      },
      o(local) {
        transition_out(if_block);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(if_block_anchor);
        }
        if_blocks[current_block_type_index].d(detaching);
      }
    };
  }
  function instance28($$self, $$props, $$invalidate) {
    let { params = {} } = $$props;
    let page;
    $$self.$$set = ($$props2) => {
      if ("params" in $$props2)
        $$invalidate(0, params = $$props2.params);
    };
    $$self.$$.update = () => {
      if ($$self.$$.dirty & /*params*/
      1) {
        $:
          params, $$invalidate(1, page = !params.page ? home_default3 : pages_exports3[params.page?.replace(/[^a-zA-Z0-9_]/g, "_")]);
      }
    };
    return [params, page];
  }
  var Index4 = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance28, create_fragment37, safe_not_equal, { params: 0 });
    }
  };
  var Index_default4 = Index4;

  // src/routes.js
  var routes_default = [
    { path: "/abdimas", page: Abdimas_default },
    { path: "/about", page: About_default },
    { path: "/authgoogle", page: AuthGoogle_default },
    { path: "/", page: Index_default },
    { path: "/login", page: Login_default },
    { path: "/logout", page: Logout_default },
    { path: "/penelitian", page: Penelitian_default },
    { path: "/register", page: Register_default },
    { path: "/verify", page: Verify_default },
    { path: "/admin/:page", page: Index_default2 },
    { path: "/auth/:page", page: Index_default3 },
    { path: "/dosen/:page", page: Index_default4 }
  ];

  // src/App.svelte
  function add_css22(target) {
    append_styles(target, "svelte-16l003y", "aside ~ main{margin-left:var(--wide)}");
  }
  function create_if_block_19(ctx) {
    let sidebar;
    let current;
    sidebar = new Sidebar_default({});
    return {
      c() {
        create_component(sidebar.$$.fragment);
      },
      m(target, anchor) {
        mount_component(sidebar, target, anchor);
        current = true;
      },
      i(local) {
        if (current)
          return;
        transition_in(sidebar.$$.fragment, local);
        current = true;
      },
      o(local) {
        transition_out(sidebar.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        destroy_component(sidebar, detaching);
      }
    };
  }
  function create_if_block16(ctx) {
    let main;
    let switch_instance;
    let current;
    var switch_value = (
      /*cmp*/
      ctx[0]
    );
    function switch_props(ctx2, dirty) {
      return { props: { params: (
        /*params*/
        ctx2[1]
      ) } };
    }
    if (switch_value) {
      switch_instance = construct_svelte_component(switch_value, switch_props(ctx));
    }
    return {
      c() {
        main = element("main");
        if (switch_instance)
          create_component(switch_instance.$$.fragment);
      },
      m(target, anchor) {
        insert(target, main, anchor);
        if (switch_instance)
          mount_component(switch_instance, main, null);
        current = true;
      },
      p(ctx2, dirty) {
        if (dirty & /*cmp*/
        1 && switch_value !== (switch_value = /*cmp*/
        ctx2[0])) {
          if (switch_instance) {
            group_outros();
            const old_component = switch_instance;
            transition_out(old_component.$$.fragment, 1, 0, () => {
              destroy_component(old_component, 1);
            });
            check_outros();
          }
          if (switch_value) {
            switch_instance = construct_svelte_component(switch_value, switch_props(ctx2, dirty));
            create_component(switch_instance.$$.fragment);
            transition_in(switch_instance.$$.fragment, 1);
            mount_component(switch_instance, main, null);
          } else {
            switch_instance = null;
          }
        } else if (switch_value) {
          const switch_instance_changes = {};
          if (dirty & /*params*/
          2)
            switch_instance_changes.params = /*params*/
            ctx2[1];
          switch_instance.$set(switch_instance_changes);
        }
      },
      i(local) {
        if (current)
          return;
        if (switch_instance)
          transition_in(switch_instance.$$.fragment, local);
        current = true;
      },
      o(local) {
        if (switch_instance)
          transition_out(switch_instance.$$.fragment, local);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(main);
        }
        if (switch_instance)
          destroy_component(switch_instance);
      }
    };
  }
  function create_fragment38(ctx) {
    let navbarmenu;
    let t0;
    let t1;
    let if_block1_anchor;
    let current;
    navbarmenu = new Navbarmenu_default({});
    let if_block0 = (
      /*token*/
      ctx[2] && create_if_block_19(ctx)
    );
    let if_block1 = (
      /*cmp*/
      ctx[0] && create_if_block16(ctx)
    );
    return {
      c() {
        create_component(navbarmenu.$$.fragment);
        t0 = space();
        if (if_block0)
          if_block0.c();
        t1 = space();
        if (if_block1)
          if_block1.c();
        if_block1_anchor = empty();
      },
      m(target, anchor) {
        mount_component(navbarmenu, target, anchor);
        insert(target, t0, anchor);
        if (if_block0)
          if_block0.m(target, anchor);
        insert(target, t1, anchor);
        if (if_block1)
          if_block1.m(target, anchor);
        insert(target, if_block1_anchor, anchor);
        current = true;
      },
      p(ctx2, [dirty]) {
        if (
          /*token*/
          ctx2[2]
        ) {
          if (if_block0) {
            if (dirty & /*token*/
            4) {
              transition_in(if_block0, 1);
            }
          } else {
            if_block0 = create_if_block_19(ctx2);
            if_block0.c();
            transition_in(if_block0, 1);
            if_block0.m(t1.parentNode, t1);
          }
        } else if (if_block0) {
          group_outros();
          transition_out(if_block0, 1, 1, () => {
            if_block0 = null;
          });
          check_outros();
        }
        if (
          /*cmp*/
          ctx2[0]
        ) {
          if (if_block1) {
            if_block1.p(ctx2, dirty);
            if (dirty & /*cmp*/
            1) {
              transition_in(if_block1, 1);
            }
          } else {
            if_block1 = create_if_block16(ctx2);
            if_block1.c();
            transition_in(if_block1, 1);
            if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
          }
        } else if (if_block1) {
          group_outros();
          transition_out(if_block1, 1, 1, () => {
            if_block1 = null;
          });
          check_outros();
        }
      },
      i(local) {
        if (current)
          return;
        transition_in(navbarmenu.$$.fragment, local);
        transition_in(if_block0);
        transition_in(if_block1);
        current = true;
      },
      o(local) {
        transition_out(navbarmenu.$$.fragment, local);
        transition_out(if_block0);
        transition_out(if_block1);
        current = false;
      },
      d(detaching) {
        if (detaching) {
          detach(t0);
          detach(t1);
          detach(if_block1_anchor);
        }
        destroy_component(navbarmenu, detaching);
        if (if_block0)
          if_block0.d(detaching);
        if (if_block1)
          if_block1.d(detaching);
      }
    };
  }
  function instance29($$self, $$props, $$invalidate) {
    let $route;
    component_subscribe($$self, route, ($$value) => $$invalidate(4, $route = $$value));
    let cmp, params;
    let token, role;
    const router = (0, import_router.default)(routes_default, E404_default, (route2) => {
      $$invalidate(0, cmp = route2.page);
      $$invalidate(1, params = route2.params);
      $$invalidate(2, token = localStorage.getItem("token"));
      role = localStorage.getItem("role");
    });
    set_store_value(route, $route = router.route, $route);
    $route(location.pathname + location.search);
    router.listen();
    onDestroy(router.unlisten);
    if (location.pathname === "/") {
      if (!token)
        $route("/");
      else {
        if (role === "admin")
          $route("/admin");
        else
          $route("/dosen");
      }
    }
    $:
      location.pathname, () => {
        if (location.pathname === "/") {
        }
      };
    return [cmp, params, token];
  }
  var App = class extends SvelteComponent {
    constructor(options) {
      super();
      init(this, options, instance29, create_fragment38, safe_not_equal, {}, add_css22);
    }
  };
  var App_default = App;

  // src/main.js
  var app = new App_default({
    target: document.body
  });
  var main_default = app;
})();
