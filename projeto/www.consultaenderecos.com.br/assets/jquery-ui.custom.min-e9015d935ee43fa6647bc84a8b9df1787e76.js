/*!
* jQuery UI 1.8.1
*
* Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
* Dual licensed under the MIT (MIT-LICENSE.txt)
* and GPL (GPL-LICENSE.txt) licenses.
*
* http://docs.jquery.com/UI
*/

jQuery.ui || function (c) {
    c.ui = {
        version: "1.8.1", plugin: { add: function (a, b, d) { a = c.ui[a].prototype; for (var e in d) { a.plugins[e] = a.plugins[e] || []; a.plugins[e].push([b, d[e]]) } }, call: function (a, b, d) { if ((b = a.plugins[b]) && a.element[0].parentNode) for (var e = 0; e < b.length; e++) a.options[b[e][0]] && b[e][1].apply(a.element, d) } }, contains: function (a, b) { return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b) }, hasScroll: function (a, b) {
            if (c(a).css("overflow") == "hidden") return false;
            b = b && b == "left" ? "scrollLeft" : "scrollTop"; var d = false; if (a[b] > 0) return true; a[b] = 1; d = a[b] > 0; a[b] = 0; return d
        }, isOverAxis: function (a, b, d) { return a > b && a < b + d }, isOver: function (a, b, d, e, f, g) { return c.ui.isOverAxis(a, d, f) && c.ui.isOverAxis(b, e, g) }, keyCode: {
            ALT: 18, BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33,
            PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38
        }
    }; c.fn.extend({
        _focus: c.fn.focus, focus: function (a, b) { return typeof a === "number" ? this.each(function () { var d = this; setTimeout(function () { c(d).focus(); b && b.call(d) }, a) }) : this._focus.apply(this, arguments) }, enableSelection: function () { return this.attr("unselectable", "off").css("MozUserSelect", "") }, disableSelection: function () { return this.attr("unselectable", "on").css("MozUserSelect", "none") }, scrollParent: function () {
            var a; a = c.browser.msie && /(static|relative)/.test(this.css("position")) ||
    /absolute/.test(this.css("position")) ? this.parents().filter(function () { return /(relative|absolute|fixed)/.test(c.curCSS(this, "position", 1)) && /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1)) }).eq(0) : this.parents().filter(function () { return /(auto|scroll)/.test(c.curCSS(this, "overflow", 1) + c.curCSS(this, "overflow-y", 1) + c.curCSS(this, "overflow-x", 1)) }).eq(0); return /fixed/.test(this.css("position")) || !a.length ? c(document) : a
        }, zIndex: function (a) {
            if (a !==
    undefined) return this.css("zIndex", a); if (this.length) { a = c(this[0]); for (var b; a.length && a[0] !== document;) { b = a.css("position"); if (b == "absolute" || b == "relative" || b == "fixed") { b = parseInt(a.css("zIndex")); if (!isNaN(b) && b != 0) return b } a = a.parent() } } return 0
        }
    }); c.extend(c.expr[":"], {
        data: function (a, b, d) { return !!c.data(a, d[3]) }, focusable: function (a) {
            var b = a.nodeName.toLowerCase(), d = c.attr(a, "tabindex"); return (/input|select|textarea|button|object/.test(b) ? !a.disabled : "a" == b || "area" == b ? a.href || !isNaN(d) : !isNaN(d)) &&
    !c(a)["area" == b ? "parents" : "closest"](":hidden").length
        }, tabbable: function (a) { var b = c.attr(a, "tabindex"); return (isNaN(b) || b >= 0) && c(a).is(":focusable") }
    })
}(jQuery);
; /*!
 * jQuery UI Widget 1.8.1
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Widget
 */
(function (b) {
    var j = b.fn.remove; b.fn.remove = function (a, c) { return this.each(function () { if (!c) if (!a || b.filter(a, [this]).length) b("*", this).add(this).each(function () { b(this).triggerHandler("remove") }); return j.call(b(this), a, c) }) }; b.widget = function (a, c, d) {
        var e = a.split(".")[0], f; a = a.split(".")[1]; f = e + "-" + a; if (!d) { d = c; c = b.Widget } b.expr[":"][f] = function (h) { return !!b.data(h, a) }; b[e] = b[e] || {}; b[e][a] = function (h, g) { arguments.length && this._createWidget(h, g) }; c = new c; c.options = b.extend({}, c.options); b[e][a].prototype =
b.extend(true, c, { namespace: e, widgetName: a, widgetEventPrefix: b[e][a].prototype.widgetEventPrefix || a, widgetBaseClass: f }, d); b.widget.bridge(a, b[e][a])
    }; b.widget.bridge = function (a, c) {
        b.fn[a] = function (d) {
            var e = typeof d === "string", f = Array.prototype.slice.call(arguments, 1), h = this; d = !e && f.length ? b.extend.apply(null, [true, d].concat(f)) : d; if (e && d.substring(0, 1) === "_") return h; e ? this.each(function () { var g = b.data(this, a), i = g && b.isFunction(g[d]) ? g[d].apply(g, f) : g; if (i !== g && i !== undefined) { h = i; return false } }) : this.each(function () {
                var g =
b.data(this, a); if (g) { d && g.option(d); g._init() } else b.data(this, a, new c(d, this))
            }); return h
        }
    }; b.Widget = function (a, c) { arguments.length && this._createWidget(a, c) }; b.Widget.prototype = {
        widgetName: "widget", widgetEventPrefix: "", options: { disabled: false }, _createWidget: function (a, c) {
            this.element = b(c).data(this.widgetName, this); this.options = b.extend(true, {}, this.options, b.metadata && b.metadata.get(c)[this.widgetName], a); var d = this; this.element.bind("remove." + this.widgetName, function () { d.destroy() }); this._create();
            this._init()
        }, _create: function () { }, _init: function () { }, destroy: function () { this.element.unbind("." + this.widgetName).removeData(this.widgetName); this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled") }, widget: function () { return this.element }, option: function (a, c) {
            var d = a, e = this; if (arguments.length === 0) return b.extend({}, e.options); if (typeof a === "string") { if (c === undefined) return this.options[a]; d = {}; d[a] = c } b.each(d, function (f,
    h) { e._setOption(f, h) }); return e
        }, _setOption: function (a, c) { this.options[a] = c; if (a === "disabled") this.widget()[c ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", c); return this }, enable: function () { return this._setOption("disabled", false) }, disable: function () { return this._setOption("disabled", true) }, _trigger: function (a, c, d) {
            var e = this.options[a]; c = b.Event(c); c.type = (a === this.widgetEventPrefix ? a : this.widgetEventPrefix + a).toLowerCase(); d = d || {}; if (c.originalEvent) {
                a =
    b.event.props.length; for (var f; a;) { f = b.event.props[--a]; c[f] = c.originalEvent[f] }
            } this.element.trigger(c, d); return !(b.isFunction(e) && e.call(this.element[0], c, d) === false || c.isDefaultPrevented())
        }
    }
})(jQuery);
; /*
 * jQuery UI Position 1.8.1
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Position
 */
(function (c) {
    c.ui = c.ui || {}; var m = /left|center|right/, n = /top|center|bottom/, p = c.fn.position, q = c.fn.offset; c.fn.position = function (a) {
        if (!a || !a.of) return p.apply(this, arguments); a = c.extend({}, a); var b = c(a.of), d = (a.collision || "flip").split(" "), e = a.offset ? a.offset.split(" ") : [0, 0], g, h, i; if (a.of.nodeType === 9) { g = b.width(); h = b.height(); i = { top: 0, left: 0 } } else if (a.of.scrollTo && a.of.document) { g = b.width(); h = b.height(); i = { top: b.scrollTop(), left: b.scrollLeft() } } else if (a.of.preventDefault) {
            a.at = "left top"; g = h =
0; i = { top: a.of.pageY, left: a.of.pageX }
        } else { g = b.outerWidth(); h = b.outerHeight(); i = b.offset() } c.each(["my", "at"], function () { var f = (a[this] || "").split(" "); if (f.length === 1) f = m.test(f[0]) ? f.concat(["center"]) : n.test(f[0]) ? ["center"].concat(f) : ["center", "center"]; f[0] = m.test(f[0]) ? f[0] : "center"; f[1] = n.test(f[1]) ? f[1] : "center"; a[this] = f }); if (d.length === 1) d[1] = d[0]; e[0] = parseInt(e[0], 10) || 0; if (e.length === 1) e[1] = e[0]; e[1] = parseInt(e[1], 10) || 0; if (a.at[0] === "right") i.left += g; else if (a.at[0] === "center") i.left +=
g / 2; if (a.at[1] === "bottom") i.top += h; else if (a.at[1] === "center") i.top += h / 2; i.left += e[0]; i.top += e[1]; return this.each(function () {
    var f = c(this), k = f.outerWidth(), l = f.outerHeight(), j = c.extend({}, i); if (a.my[0] === "right") j.left -= k; else if (a.my[0] === "center") j.left -= k / 2; if (a.my[1] === "bottom") j.top -= l; else if (a.my[1] === "center") j.top -= l / 2; j.left = parseInt(j.left); j.top = parseInt(j.top); c.each(["left", "top"], function (o, r) {
        c.ui.position[d[o]] && c.ui.position[d[o]][r](j, {
            targetWidth: g, targetHeight: h, elemWidth: k,
            elemHeight: l, offset: e, my: a.my, at: a.at
        })
    }); c.fn.bgiframe && f.bgiframe(); f.offset(c.extend(j, { using: a.using }))
})
    }; c.ui.position = {
        fit: { left: function (a, b) { var d = c(window); b = a.left + b.elemWidth - d.width() - d.scrollLeft(); a.left = b > 0 ? a.left - b : Math.max(0, a.left) }, top: function (a, b) { var d = c(window); b = a.top + b.elemHeight - d.height() - d.scrollTop(); a.top = b > 0 ? a.top - b : Math.max(0, a.top) } }, flip: {
            left: function (a, b) {
                if (b.at[0] !== "center") {
                    var d = c(window); d = a.left + b.elemWidth - d.width() - d.scrollLeft(); var e = b.my[0] === "left" ?
        -b.elemWidth : b.my[0] === "right" ? b.elemWidth : 0, g = -2 * b.offset[0]; a.left += a.left < 0 ? e + b.targetWidth + g : d > 0 ? e - b.targetWidth + g : 0
                }
            }, top: function (a, b) { if (b.at[1] !== "center") { var d = c(window); d = a.top + b.elemHeight - d.height() - d.scrollTop(); var e = b.my[1] === "top" ? -b.elemHeight : b.my[1] === "bottom" ? b.elemHeight : 0, g = b.at[1] === "top" ? b.targetHeight : -b.targetHeight, h = -2 * b.offset[1]; a.top += a.top < 0 ? e + b.targetHeight + h : d > 0 ? e + g + h : 0 } }
        }
    }; if (!c.offset.setOffset) {
        c.offset.setOffset = function (a, b) {
            if (/static/.test(c.curCSS(a, "position"))) a.style.position =
"relative"; var d = c(a), e = d.offset(), g = parseInt(c.curCSS(a, "top", true), 10) || 0, h = parseInt(c.curCSS(a, "left", true), 10) || 0; e = { top: b.top - e.top + g, left: b.left - e.left + h }; "using" in b ? b.using.call(a, e) : d.css(e)
        }; c.fn.offset = function (a) { var b = this[0]; if (!b || !b.ownerDocument) return null; if (a) return this.each(function () { c.offset.setOffset(this, a) }); return q.call(this) }
    }
})(jQuery);
; /*
 * jQuery UI Autocomplete 1.8.1
 *
 * Copyright (c) 2010 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Autocomplete
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 */
(function (e) {
    e.widget("ui.autocomplete", {
        options: { minLength: 1, delay: 300 }, _create: function () {
            var a = this, b = this.element[0].ownerDocument; this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({ role: "textbox", "aria-autocomplete": "list", "aria-haspopup": "true" }).bind("keydown.autocomplete", function (c) {
                var d = e.ui.keyCode; switch (c.keyCode) {
                    case d.PAGE_UP: a._move("previousPage", c); break; case d.PAGE_DOWN: a._move("nextPage", c); break; case d.UP: a._move("previous", c); c.preventDefault();
                        break; case d.DOWN: a._move("next", c); c.preventDefault(); break; case d.ENTER: a.menu.active && c.preventDefault(); case d.TAB: if (!a.menu.active) return; a.menu.select(c); break; case d.ESCAPE: a.element.val(a.term); a.close(c); break; case d.LEFT: case d.RIGHT: case d.SHIFT: case d.CONTROL: case d.ALT: break; default: clearTimeout(a.searching); a.searching = setTimeout(function () { a.search(null, c) }, a.options.delay); break
                }
            }).bind("focus.autocomplete", function () { a.selectedItem = null; a.previous = a.element.val() }).bind("blur.autocomplete",
    function (c) { clearTimeout(a.searching); a.closing = setTimeout(function () { a.close(c); a._change(c) }, 150) }); this._initSource(); this.response = function () { return a._response.apply(a, arguments) }; this.menu = e("<ul></ul>").addClass("ui-autocomplete").appendTo("body", b).menu({
        focus: function (c, d) { d = d.item.data("item.autocomplete"); false !== a._trigger("focus", null, { item: d }) && /^key/.test(c.originalEvent.type) && a.element.val(d.value) }, selected: function (c, d) {
            d = d.item.data("item.autocomplete"); false !== a._trigger("select",
        c, { item: d }) && a.element.val(d.value); a.close(c); c = a.previous; if (a.element[0] !== b.activeElement) { a.element.focus(); a.previous = c } a.selectedItem = d
        }, blur: function () { a.menu.element.is(":visible") && a.element.val(a.term) }
    }).zIndex(this.element.zIndex() + 1).css({ top: 0, left: 0 }).hide().data("menu"); e.fn.bgiframe && this.menu.element.bgiframe()
        }, destroy: function () {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
            this.menu.element.remove(); e.Widget.prototype.destroy.call(this)
        }, _setOption: function (a) { e.Widget.prototype._setOption.apply(this, arguments); a === "source" && this._initSource() }, _initSource: function () { var a, b; if (e.isArray(this.options.source)) { a = this.options.source; this.source = function (c, d) { d(e.ui.autocomplete.filter(a, c.term)) } } else if (typeof this.options.source === "string") { b = this.options.source; this.source = function (c, d) { e.getJSON(b, c, d) } } else this.source = this.options.source }, search: function (a, b) {
            a =
    a != null ? a : this.element.val(); if (a.length < this.options.minLength) return this.close(b); clearTimeout(this.closing); if (this._trigger("search") !== false) return this._search(a)
        }, _search: function (a) { this.term = this.element.addClass("ui-autocomplete-loading").val(); this.source({ term: a }, this.response) }, _response: function (a) { if (a.length) { a = this._normalize(a); this._suggest(a); this._trigger("open") } else this.close(); this.element.removeClass("ui-autocomplete-loading") }, close: function (a) {
            clearTimeout(this.closing);
            if (this.menu.element.is(":visible")) { this._trigger("close", a); this.menu.element.hide(); this.menu.deactivate() }
        }, _change: function (a) { this.previous !== this.element.val() && this._trigger("change", a, { item: this.selectedItem }) }, _normalize: function (a) { if (a.length && a[0].label && a[0].value) return a; return e.map(a, function (b) { if (typeof b === "string") return { label: b, value: b }; return e.extend({ label: b.label || b.value, value: b.value || b.label }, b) }) }, _suggest: function (a) {
            var b = this.menu.element.empty().zIndex(this.element.zIndex() +
    1), c; this._renderMenu(b, a); this.menu.deactivate(); this.menu.refresh(); this.menu.element.show().position({ my: "left top", at: "left bottom", of: this.element, collision: "none" }); a = b.width("").width(); c = this.element.width(); b.width(Math.max(a, c))
        }, _renderMenu: function (a, b) { var c = this; e.each(b, function (d, f) { c._renderItem(a, f) }) }, _renderItem: function (a, b) { return e("<li></li>").data("item.autocomplete", b).append("<a>" + b.label + "</a>").appendTo(a) }, _move: function (a, b) {
            if (this.menu.element.is(":visible")) if (this.menu.first() &&
    /^previous/.test(a) || this.menu.last() && /^next/.test(a)) { this.element.val(this.term); this.menu.deactivate() } else this.menu[a](b); else this.search(null, b)
        }, widget: function () { return this.menu.element }
    }); e.extend(e.ui.autocomplete, { escapeRegex: function (a) { return a.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") }, filter: function (a, b) { var c = new RegExp(e.ui.autocomplete.escapeRegex(b), "i"); return e.grep(a, function (d) { return c.test(d.label || d.value || d) }) } })
})(jQuery);
(function (e) {
    e.widget("ui.menu", {
        _create: function () { var a = this; this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({ role: "listbox", "aria-activedescendant": "ui-active-menuitem" }).click(function (b) { if (e(b.target).closest(".ui-menu-item a").length) { b.preventDefault(); a.select(b) } }); this.refresh() }, refresh: function () {
            var a = this; this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem").children("a").addClass("ui-corner-all").attr("tabindex",
    -1).mouseenter(function (b) { a.activate(b, e(this).parent()) }).mouseleave(function () { a.deactivate() })
        }, activate: function (a, b) { this.deactivate(); if (this.hasScroll()) { var c = b.offset().top - this.element.offset().top, d = this.element.attr("scrollTop"), f = this.element.height(); if (c < 0) this.element.attr("scrollTop", d + c); else c > f && this.element.attr("scrollTop", d + c - f + b.height()) } this.active = b.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end(); this._trigger("focus", a, { item: b }) }, deactivate: function () {
            if (this.active) {
                this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
                this._trigger("blur"); this.active = null
            }
        }, next: function (a) { this.move("next", ".ui-menu-item:first", a) }, previous: function (a) { this.move("prev", ".ui-menu-item:last", a) }, first: function () { return this.active && !this.active.prev().length }, last: function () { return this.active && !this.active.next().length }, move: function (a, b, c) { if (this.active) { a = this.active[a + "All"](".ui-menu-item").eq(0); a.length ? this.activate(c, a) : this.activate(c, this.element.children(b)) } else this.activate(c, this.element.children(b)) }, nextPage: function (a) {
            if (this.hasScroll()) if (!this.active ||
    this.last()) this.activate(a, this.element.children(":first")); else { var b = this.active.offset().top, c = this.element.height(), d = this.element.children("li").filter(function () { var f = e(this).offset().top - b - c + e(this).height(); return f < 10 && f > -10 }); d.length || (d = this.element.children(":last")); this.activate(a, d) } else this.activate(a, this.element.children(!this.active || this.last() ? ":first" : ":last"))
        }, previousPage: function (a) {
            if (this.hasScroll()) if (!this.active || this.first()) this.activate(a, this.element.children(":last"));
            else { var b = this.active.offset().top, c = this.element.height(); result = this.element.children("li").filter(function () { var d = e(this).offset().top - b + c - e(this).height(); return d < 10 && d > -10 }); result.length || (result = this.element.children(":first")); this.activate(a, result) } else this.activate(a, this.element.children(!this.active || this.first() ? ":last" : ":first"))
        }, hasScroll: function () { return this.element.height() < this.element.attr("scrollHeight") }, select: function (a) { this._trigger("selected", a, { item: this.active }) }
    })
})(jQuery);
;
