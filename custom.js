document.addEventListener("DOMContentLoaded", function() {
    // Get the current page filename
    var currentPage = window.location.pathname.split("/").pop();
    
    // If empty, set to index.html (home page)
    if (!currentPage) currentPage = "index.html";
    
    // For each link in the navigation
    var navLinks = document.querySelectorAll("ul a");
    navLinks.forEach(function(link) {
        var linkHref = link.getAttribute("href");
        
        // If the href attribute matches the current page filename
        if (linkHref === currentPage) {
            // Add active class
            link.classList.add("active");
            console.log("Active link added to: " + linkHref);
        }
    });
}); 