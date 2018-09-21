//Pagnation test which is still a work in progress so not yet incoperated in the application

async function result(){
    var response = await fetch('http://127.0.0.1:5000/api/v2/questions');
    var res2 = response.clone();
    var rt;
    try {
        
        rt = (await res2.json());
            console.log(rt.length);
        var current_page = 1;
        var records_per_page = 4;
        document.getElementById('btn_prev').addEventListener('click', prevPage);
        document.getElementById('btn_next').addEventListener('click', nextPage);

        var objJson = rt
        function prevPage() {
            if (current_page > 1) {
                current_page--;
                changePage(current_page);
            }
        }

        function nextPage() {
            if (current_page < numPages()) {
                current_page++;
                changePage(current_page);
            }
        }

        function changePage(page) {
            var btn_next = document.getElementById("btn_next");
            var btn_prev = document.getElementById("btn_prev");
            var listing_table = document.getElementById("listingTable");
            var page_span = document.getElementById("page");

            // Validate page
            if (page < 1) page = 1;
            if (page > numPages()) page = numPages();

            listing_table.innerHTML = "";

            for (var i = (page - 1) * records_per_page; i < (page * records_per_page); i++) {
                listing_table.innerHTML += objJson[i].question_title + "<br>";
            }
            page_span.innerHTML = page;

            if (page == 1) {
                btn_prev.style.visibility = "hidden";
            } else {
                btn_prev.style.visibility = "visible";
            }

            if (page == numPages()) {
                btn_next.style.visibility = "hidden";
            } else {
                btn_next.style.visibility = "visible";
            }
        }

        function numPages() {
            return Math.ceil(objJson.length / records_per_page);
        }

        window.onload = function () {
            changePage(1);
        };
        
    }
    catch (e) {
        console.log(e);
    }
}
result();

