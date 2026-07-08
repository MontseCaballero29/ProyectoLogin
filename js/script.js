var userMenuDiv = document.getElementById("userMenu");
    var userMenu = document.getElementById("userButton");

    document.onclick = check;

    function check(e) {
        var target = (e && e.target) || (event && event.srcElement);

        if (!checkParent(target, userMenuDiv)) {

            if (checkParent(target, userMenu)) {

                if (userMenuDiv.classList.contains("invisible")) {
                    userMenuDiv.classList.remove("invisible");
                } else {
                    userMenuDiv.classList.add("invisible");
                }

            } else {
                userMenuDiv.classList.add("invisible");
            }
        }
    }

    function checkParent(t, elm) {
        while (t && t.parentNode) {

            if (t == elm) {
                return true;
            }

            t = t.parentNode;
        }

        return false;
    }

var menuButton = document.getElementById("menuButton");
    var sidebar = document.getElementById("sidebar");

    menuButton.addEventListener("click", function () {
        sidebar.classList.toggle("menu-abierto");
    });
