document.addEventListener("DOMContentLoaded", function() {

    var currentPage = window.location.pathname.split("/").pop();

    if (!currentPage) currentPage = "index.html";
    

    var navLinks = document.querySelectorAll("ul a");
    navLinks.forEach(function(link) {
        var linkHref = link.getAttribute("href");

    
        if (linkHref === currentPage) {
            // Add active class
            link.classList.add("active");
            console.log("Active link added to: " + linkHref);
        }
    });
}); 