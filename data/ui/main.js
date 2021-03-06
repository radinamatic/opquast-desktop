/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Opquast Desktop.
 *
 * The Initial Developer of the Original Code is
 * Temesis SAS.
 * Portions created by the Initial Developer are Copyright (C) 2012
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Fabrice Bonny <fabrice.bonny@temesis.com>
 *   Olivier Meunier <olivier.meunier@temesis.com>
 *   Mickael Hoareau <mickael.hoareau@temesis.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */
/*jshint globalstrict:true, jquery:true */
/*globals doT, self */
"use strict";

self.port.emit("ready");

(function($) {
//----

// Translation function
window._ = function(k) {
    return k in self.options.locales ? self.options.locales[k] : null;
};

// jQuery util for doT
$.doT = function(templateName, data) {
    data = $.extend(data, {
        'locales': self.options.locales
    });
    return doT.compile(self.options.templates[templateName])(data);
};
$.fn.doT = function(templateName, data) {
    return this.each(function() {
        $(this).empty().append($.doT(templateName, data));
    });
};


//
// Display a message on empty page
//
self.port.on("showMessage", function(aMessage, aClass, aButton) {
    aClass = aClass || "loader";
    $('body').doT('tplMessage', {
        'message': aMessage,
        'class': aClass,
        'button': aButton
    });

    $('button').click(function() {
        self.port.emit("messageButton");
    });
});

//
// Open external links in tabs
//
$('body').on('click', 'a.external', function(evt) {
    evt.preventDefault();
    self.port.emit('openLink', evt.target.href);
});

//----
})(jQuery);
