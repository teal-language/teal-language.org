// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="introduction.html"><strong aria-hidden="true">1.</strong> Introduction</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="about.html"><strong aria-hidden="true">1.1.</strong> This project&#39;s goals</a></li><li class="chapter-item expanded "><a href="why_types.html"><strong aria-hidden="true">1.2.</strong> Why Types</a></li></ol></li><li class="chapter-item expanded "><a href="tutorial.html"><strong aria-hidden="true">2.</strong> Programming with types in Teal</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="installing_tl.html"><strong aria-hidden="true">2.1.</strong> Installing tl</a></li><li class="chapter-item expanded "><a href="your_first_teal_program.html"><strong aria-hidden="true">2.2.</strong> Your first Teal program</a></li><li class="chapter-item expanded "><a href="types_in_teal.html"><strong aria-hidden="true">2.3.</strong> Types in Teal</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="arrays.html"><strong aria-hidden="true">2.3.1.</strong> Arrays</a></li><li class="chapter-item expanded "><a href="tuples.html"><strong aria-hidden="true">2.3.2.</strong> Tuples</a></li><li class="chapter-item expanded "><a href="maps.html"><strong aria-hidden="true">2.3.3.</strong> Maps</a></li><li class="chapter-item expanded "><a href="records.html"><strong aria-hidden="true">2.3.4.</strong> Records</a></li><li class="chapter-item expanded "><a href="interfaces.html"><strong aria-hidden="true">2.3.5.</strong> Interfaces</a></li><li class="chapter-item expanded "><a href="generics.html"><strong aria-hidden="true">2.3.6.</strong> Generics</a></li><li class="chapter-item expanded "><a href="enums.html"><strong aria-hidden="true">2.3.7.</strong> Enums</a></li><li class="chapter-item expanded "><a href="functions.html"><strong aria-hidden="true">2.3.8.</strong> Functions</a></li><li class="chapter-item expanded "><a href="union_types.html"><strong aria-hidden="true">2.3.9.</strong> Union types</a></li><li class="chapter-item expanded "><a href="the_type_any.html"><strong aria-hidden="true">2.3.10.</strong> The type &quot;any&quot;</a></li></ol></li><li class="chapter-item expanded "><a href="local_variables.html"><strong aria-hidden="true">2.4.</strong> Local variables</a></li><li class="chapter-item expanded "><a href="global_variables.html"><strong aria-hidden="true">2.5.</strong> Global variables</a></li><li class="chapter-item expanded "><a href="variable_attributes.html"><strong aria-hidden="true">2.6.</strong> Variable attributes</a></li><li class="chapter-item expanded "><a href="metamethods.html"><strong aria-hidden="true">2.7.</strong> Metamethods</a></li><li class="chapter-item expanded "><a href="macroexp.html"><strong aria-hidden="true">2.8.</strong> Macro expressions</a></li></ol></li><li class="chapter-item expanded "><a href="behavior.html"><strong aria-hidden="true">3.</strong> Behavior rules</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="aliasing.html"><strong aria-hidden="true">3.1.</strong> Type aliasing rules</a></li><li class="chapter-item expanded "><a href="type_variables.html"><strong aria-hidden="true">3.2.</strong> Type variable matching</a></li><li class="chapter-item expanded "><a href="pragmas.html"><strong aria-hidden="true">3.3.</strong> Pragmas</a></li><li class="chapter-item expanded "><a href="current_limitations_on_union_types.html"><strong aria-hidden="true">3.4.</strong> Current limitations on union types</a></li></ol></li><li class="chapter-item expanded "><a href="using_tl_with_lua.html"><strong aria-hidden="true">4.</strong> Using tl with Lua</a></li><li class="chapter-item expanded "><a href="declaration_files.html"><strong aria-hidden="true">5.</strong> Type definitions for third party libraries</a></li><li class="chapter-item expanded "><a href="teal_standard_library_and_lua_compatibility.html"><strong aria-hidden="true">6.</strong> The Teal Standard Library and Lua compatibility</a></li><li class="chapter-item expanded "><a href="compiler_options.html"><strong aria-hidden="true">7.</strong> Compiler options</a></li><li class="chapter-item expanded "><a href="developing.html"><strong aria-hidden="true">8.</strong> Hacking on tl itself</a></li><li class="chapter-item expanded "><a href="grammar.html"><strong aria-hidden="true">9.</strong> The Grammar of Teal</a></li><li class="chapter-item expanded "><a href="other_projects.html"><strong aria-hidden="true">10.</strong> Other related projects</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
