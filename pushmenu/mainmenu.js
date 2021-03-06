function menubtn_hit() {
    document.getElementById("menubutton").click();
}

function close_account_overlay() {

    show_main_elements();
    $("#map_glogo").show();

    $("#account_overlay").fadeOut("slow", function () {});
}

function close_wallet_overlay() {
    
    show_main_elements();
    $("#map_glogo").show();
    
    $("#wallet_overlay").fadeOut("slow", function () {});
}

function close_help_overlay() {

    overlay_open = "closed";

    $("#pages").fadeOut("slow", function () {});

}

$(document).ready(function () {

    load_mainmenu();

});

function close_mainmenu() {
    $('.jPushMenuBtn,body,.cbp-spmenu').removeClass('disabled active cbp-spmenu-open cbp-spmenu-push-toleft cbp-spmenu-push-toright');
}

function load_mainmenu() {
    $("#mainmenu_account").click(function () {

        var hotelcorporate = localStorage.getItem("hotelcorporate");

        if (hotelcorporate == "Yes") {
            document.getElementById("account_simple_table").style.display = "none";
            document.getElementById("account_button").style.display = "none";
            document.getElementById("account_details_info").style.display = "none";
        }

        hide_main_elements();
        $("#map_glogo").hide();

        $("#account_overlay").fadeIn("slow", function () {

            close_mainmenu();

            var userid = localStorage.getItem("userid");

            $.get("https://250taxi.com/db/account/get_details_v2.php?task=phone&userid=" + userid + "", function (data) {
                document.getElementById("account_phone").innerHTML = data;

                overlay_open = "mainmenu_account";

            });

            $("#pages").hide();

            $.get("https://250taxi.com/db/account/get_details_v2.php?task=name&userid=" + userid + "", function (data) {
                document.getElementById("account_name").innerHTML = data;
            });

            $.get("https://250taxi.com/db/account/get_details_v2.php?task=email&userid=" + userid + "", function (data) {
                document.getElementById("account_email").innerHTML = data;
            });
            
            $.get("https://250taxi.com/db/account/get_details_v2.php?task=country&userid=" + userid + "", function (data) {
                document.getElementById("account_country").innerHTML = data;
            });

        });
    });

    $("#mainmenu_services").click(function () {

        close_mainmenu();

        if ("overlay_open" in window) {
            if (overlay_open == "mainmenu_services") {
                return;
            }
        }

        close_mainmenu();

        $("#pagestarget").load("https://250taxi.com/appcontent/services.php", function () {
            $("#pages").fadeIn("slow", function () {
                overlay_open = "mainmenu_services";
            });
        });


    });

    $("#mainmenu_wallet").click(function () {

        close_mainmenu();

        $("#pages").hide();
        $("#map_glogo").hide();

        $("#wallet_overlay").fadeIn("slow", function () {

            var balance_clientid = localStorage.getItem("userid");
            $("#wallet_balance_amount").load("https://250taxi.com/db/balance/get_balance.php?task=get_balance&userid=" + balance_clientid + "", function () {
                $("#wallet_balance_currency").load("https://250taxi.com/db/balance/get_balance.php?task=get_currency&userid=" + balance_clientid + "", function () {
                    $("#wallet_appcontent").load("https://250taxi.com/appcontent/wallet/wallet.php?&userid=" + balance_clientid + "", function () {});
                });
            });

        });
    });

    $("#mainmenu_help").click(function () {

        close_mainmenu();

        $("#pagestarget").load("https://250taxi.com/appcontent/help.php", function () {
            $("#pages").fadeIn("slow", function () {
                overlay_open = "mainmenu_help";
            });
        });
    });

    $("#mainmenu_bookings").click(function () {

        close_mainmenu();

        var userid = localStorage.getItem("userid");

        $("#pagestarget").load("https://250taxi.com/appcontent/bookings.php?userid=" + userid + "", function () {
            $("#pages").fadeIn("slow", function () {
                overlay_open = "mainmenu_bookings";
            });
        });
    });

    $("#mainmenu_messages").click(function () {

        $("#pages").hide();

        close_mainmenu();

        var userid = localStorage.getItem("userid");

        $("#pagestarget").load("https://250taxi.com/appcontent/messages.php?userid=" + userid + "", function () {
            $("#pages").fadeIn("slow", function () {
                overlay_open = "mainmenu_messages";
            });
        });
    });

    $("#mainmenu_becomedriver").click(function () {

        close_mainmenu();

        $("#pagestarget").load("https://250taxi.com/appcontent/becomedriver.php", function () {
            $("#pages").fadeIn("slow", function () {
                overlay_open = "mainmenu_becomedriver";
            });
        });
    });

    $("#mainmenu_tour").click(function () {
        location.href = "tour/swipe.html";
    });

    $("#mainmenu_corporate").click(function () {

        close_mainmenu();

        $("#pagestarget").load("https://250taxi.com/appcontent/corporate.php", function () {
            $("#pages").fadeIn("slow", function () {
                overlay_open = "mainmenu_corporate";
            });
        });
    });

    $("#mainmenu_history").click(function () {

        $("#pages").hide();

        close_mainmenu();

        var userid = localStorage.getItem("userid");

        $("#pagestarget").load("https://250taxi.com/appcontent/history_v2.php?userid=" + userid + "", function () {
            $("#pages").fadeIn("slow", function () {
                overlay_open = "mainmenu_history";
            });
        });
    });

    $("#mainmenu_about").click(function () {
        window.open('https://www.facebook.com/250taxi', '_system');
    });
}

function hide_main_elements() {
    $("#map").hide();
    $("#calltaxiui").hide();
    $("#user_pin").hide();
    $("#locationbutton").hide();
    $("#locationfieldholder").hide();
    $("#menubutton").hide();

    $("body").css('background-color', '#AF2426');
}

function show_main_elements() {
    $("#map").show();
    $("#calltaxiui").show();
    $("#user_pin").show();
    $("#locationbutton").show();
    $("#locationfieldholder").show();
    $("#menubutton").show();

    $("body").css('background-color', 'white');
}