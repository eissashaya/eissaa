
           let btnMenu = document.getElementById("btnMenu");
           let Navlinks = document.querySelector(".links");
           
         btnMenu.onclick =function(){
            btnMenu.classList.toggle("fa-times")
            Navlinks.classList.toggle("active")
           }
       
        // Toggle night mode
        let nightModeBtn = document.getElementById("nightModeBtn");
        let body = document.body;

        nightModeBtn.addEventListener("click", function() {
            body.classList.toggle("night-mode");
            // Change icon
            if(body.classList.contains("night-mode")) {
                nightModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                nightModeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });

        // Search Functionality
        let searchBar = document.getElementById("searchBar");
        let cards = document.querySelectorAll(".card");

        searchBar.addEventListener("input", function() {
            let searchText = searchBar.value.toLowerCase();
            cards.forEach(function(card) {
                let title = card.querySelector("h3").textContent.toLowerCase();
                let description = card.querySelector("p").textContent.toLowerCase();
                if (title.includes(searchText) || description.includes(searchText)) {
                    card.style.display = "block";  // Show card
                } else {
                    card.style.display = "none";  // Hide card
                }
            });
        });


        // الحصول على الزر
let mybutton = document.getElementById("scrollToTopBtn");

// عند التمرير لأسفل 20px من أعلى الصفحة، يظهر الزر
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
};

// وظيفة العودة للأعلى
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"

    });
}

function copyCode(elementId) {
    const codeElement = document.getElementById(elementId);
    const text = codeElement.innerText;

    // نسخ النص إلى الحافظة
    navigator.clipboard.writeText(text).then(() => {
        alert("تم نسخ الكود بنجاح!");
    }).catch(err => {
        alert("حدث خطأ أثناء النسخ: " + err);
    });
}


    