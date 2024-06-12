var picker = new Pikaday({
  field: document.getElementById("datepicker"),
  firstDay: 1,
  minDate: new Date("1920-01-01"),
  maxDate: new Date("2015-12-31"),
  yearRange: [1920, 2015],
  format: "D/M/YYYY",
  toString(date, format) {
    // you should do formatting based on the passed format,
    // but we will just return 'D/M/YYYY' for simplicity
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  },
  parse(dateString, format) {
    // dateString is the result of `toString` method
    const parts = dateString.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  },
  onSelect: function (date) {
    var btn = document.getElementById("datepicker");
    /* window.alert("date=" + picker.toString(date, (format = "YYYY-MM-DD")));*/

    btn.innerText = picker.toString(date, (format = "YYYY-MM-DD"));
    btn.style.color = "#ffffff";
  },
});
$(document).ready(function () {
  $("#sex-btn").css("text-align", "center");
  //   $("#nxt-btn").addClass("start");
  $("#sex-btn").on("change", function () {
    $("#nxt-btn").addClass("start");
    $("#sex-btn").css({ color: "white" });
  });
  $("#name-txt").click(function () {
    $("#nxt-btn").removeClass("start");
  });
  $("#nxt-btn").click(function () {
    $(".container").animate(
      { borderSpacing: -360 },
      {
        step: function (now, fx) {
          $(this).css("-webkit-transform", "rotate(" + now + "deg)");
          $(this).css("-moz-transform", "rotate(" + now + "deg)");
          $(this).css("transform", "rotate(" + now + "deg)");
        },
        duration: "slow",
      },
      "linear"
    );

    if ($(".sign-box").css("display") == "none") {
      if ($("#nxt-btn").text() == "下一頁") {
        $("#nxt-btn").text("上一頁");
      }
    }

    if ($(".sign-box").css("display") == "flex") {
      if ($("#nxt-btn").text() == "上一頁") {
        $("#nxt-btn").text("下一頁");
      }
    }

    if ($("#nxt-btn").text() == "上一頁") {
      if ($(".sign-box").css("display") == "none") {
        // $(".login-box").css("display", "none");
        // $(".sign-box").css("display", "flex");
        $(".login-box").fadeOut(50, function () {
          $(".login-box").css("display", "none");
          $(".sign-box").fadeIn();
          $(".sign-box").css("display", "flex");
        });
      }
    }
    if ($("#nxt-btn").text() == "下一頁") {
      if ($(".sign-box").css("display") == "flex") {
        $(".sign-box").fadeOut(50, function () {
          $(".sign-box").css("display", "none");
          // Move the element as you wish
          $(".login-box").fadeIn();
          $(".login-box").css("display", "flex");
        });
      }
    }
    $("#nxt-btn").fadeOut(50, function () {
      $("#nxt-btn").fadeIn();
    });
  });
  $("#clickable").on("change", function () {
    // alert("BBBBBBBBBB");
    $("#clickable").on("change", function () {
      //  alert("BBBBBBBBBB");
      $("#uploadBtn").addClass("start");
    });
  });
  //以下開始寫
});
function lawcheckOnChangeHandler(checkBoxLaw) {
  if (checkBoxLaw.checked) {
    $("#uploadBtn").addClass("start");
  } else {
    $("#uploadBtn").removeClass("start");
  }
}
liff.init(
  { liffId: "2005380189-ngy0lroK" },
  () => {
    if (liff.isLoggedIn()) {
      // getBodyGoData();
      //liff.logout();
    } else {
      liff.login();
    }
  },
  (err) => console.error(err.code, error.message)
);
var uid = null;
function uploadLineBot() {
  // window.alert("彈跳視窗想要顯示的文字");

  if (liff != null) {
    var btn = document.getElementById("datepicker");

    var inpH = document.getElementById("inputHeight");
    var inpW = document.getElementById("inputWeight");
    var inpName = document.getElementById("name-txt");
    document.getElementById("displayName").innerHTML = document
      .getElementById("name-txt")
      .value.toString();
    liff
      .getProfile()
      .then((profile) => {
        document.getElementById("userId").innerHTML = profile.userId;

        uid = profile.userId;
      })
      .then(() => {
        liff
          .sendMessages([
            {
              type: "text",
              text:
                "個人資訊:" +
                uid +
                "," +
                inpName.value.toString() +
                "," +
                btn.innerText.toString() +
                "," +
                inpH.value.toString() +
                "," +
                inpW.value.toString(),
            },
          ])
          .then(() => {
            liff.closeWindow();
            if (liff != null) {
              liff.logout();
              liff = null;
            }
          })
          .catch((err) => {
            alert("messageSend err:" + err);
          });
      })
      .catch((err) => console.error(err));
  } else {
    alert("Line LIFF 串接異常");
  }
}
document.onvisibilitychange = function () {
  switch (document.visibilityState) {
    case "hidden":
      // 使用者不在頁面上時要做的事……
      if (liff != null) {
        liff.logout();
        liff = null;
      }

      alert("Line LIFF 關閉");
      break;
    case "visible":
      // 使用者在頁面上時要做的事……
      break;
  }
};
