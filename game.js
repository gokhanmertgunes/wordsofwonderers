$(function () {
  let selectedLetters = "";
  var leftpos = 215;
  var bulbflag = false;
  var selectedbackground = "rgb(65, 105, 225)";
  var errorbackground = "rgb(0, 200, 0)";
  var fontcolor = "rgb(255, 228, 196)";
  var errorfontcolor = "rgb(200, 255, 0)";

  $("#shuffle").click(function () {
    var flag = true;
    let letterList = ['P', 'U', 'B', 'L', 'I', 'C'];
    $(".letter").each(function () {
      if ($(this).hasClass("selected")) flag = false;
    });
    //If any letter selected, button will not work
    if (flag === true) {
      $(".letter").each(function () {
        let randomIndex = Math.floor(Math.random() * letterList.length);
        console.log(letterList[randomIndex]);
        $(this).text(letterList[randomIndex]);
        letterList.splice(randomIndex, 1);
      });
    }
    //Shaking to show not possible to shuffle
    else {
      $(".shuffle").animate({ left: "-=4px" }, 100)
        .animate({ left: "+=8px" }, 100)
        .animate({ left: "-=4px" }, 100);
    }
  });

  $(".letter").each(function () {
    $(this).click(function () {
      //Select a letter and add to the display div
      if (!($(this).hasClass("selected"))) {
        $(this).addClass("selected");
        selectedLetters += $(this).text();
        leftpos -= 5;
        $("#output").text(selectedLetters)
          .css("display", "block")
          .css('left', leftpos);
      }
      //Second selection in the same letter
      else {
        $(this).animate({ left: "-=4px" }, 100)
          .animate({ left: "+=8px" }, 100)
          .animate({ left: "-=4px" }, 100);
      }
    })
  })


  $("#main").contextmenu(function (e) {
    e.preventDefault();
    var wordnotselected = false;
    var wordexist = false;
    $(`td#${selectedLetters}, span#${selectedLetters}`).each(function () {
      //Check if the word is selected before
      if (!$(this).hasClass("selectedword"))
        wordnotselected = true;
      //Check if the word exist in the whole table
      if($(this).hasClass("word") || $(this).hasClass("selectedword"))
        wordexist = true;
    });

    if (wordnotselected) {
      //Creating animation if the span is selected
      $(`span#${selectedLetters}`).each(function () {
        $(this).parent().fadeOut(150, function () {
          $(this).css("background", selectedbackground)
                .children().css("background", selectedbackground)
                 .css("color", fontcolor)
                 .css("border", `1px solid ${selectedbackground}`)
        })
          .fadeIn(150)
          .fadeOut(150)
          .fadeIn(150)
          .fadeOut(150)
          .fadeIn(150);
        $(this).removeClass("word").addClass("selectedword");
      });

      //Creating animation if the td is selected
      $(`td#${selectedLetters}`).each(function () {
        $(this).fadeOut(150, function () {
          $(this).css("color", fontcolor)
          .css("background", selectedbackground)
        })
          .fadeIn(150)
          .fadeOut(150)
          .fadeIn(150)
          .fadeOut(150)
          .fadeIn(150);
        $(this).removeClass("word").addClass("selectedword");
      });

      
      //Clearing string
      $(".letter").each(function () {
        if (($(this).hasClass("selected")))
          $(this).removeClass("selected");
      })
      selectedLetters = "";
      $("#output").text(selectedLetters)
        .css("display", "none");
      leftpos = 215;
    }
    else {
      //Creating animation if the span is selected
      $(`span#${selectedLetters}`).each(function () {
        $(this).parent().fadeOut(150, function () {
          $(this).css("background", errorbackground)
                 .children().css("background", errorbackground)
                 .css("border", `1px solid ${errorbackground}`)
                 .css("color", errorfontcolor)
        })
          .fadeIn(150)
          .fadeOut(150)
          .fadeIn(150)
          .fadeOut(150, function () {
            $(this).css("background", selectedbackground)
                    .children().css("background", selectedbackground)
                   .css("color", fontcolor)
                  .css("border", `1px solid ${selectedbackground}`)
          })
          .fadeIn(150);
        $(this).removeClass("word").addClass("selectedword");
      });
      //Creating animation if the td is selected
      $(`td#${selectedLetters}`).each(function () {
        $(this).fadeOut(150, function () {
          $(this).css("color", errorfontcolor)
          .css("background", errorbackground)
          .children().css("background", errorbackground)
                     .css("border", `1px solid ${errorbackground}`)
                     .css("color", errorfontcolor)

        })
          .fadeIn(150)
          .fadeOut(150)
          .fadeIn(150)
          .fadeOut(150, function () {
            $(this).css("color", fontcolor)
            .css("background", selectedbackground)
            .children().css("background", selectedbackground)
                       .css("border", `1px solid ${selectedbackground}`)
                       .css("color", fontcolor);
          })
          .fadeIn(150);
        $(this).removeClass("word").addClass("selectedword");
      });

      


      //Word does not exists.
      if(!wordexist) {
      $("#output").animate({ top: "-=4px" }, 100, function() {
        $(this).css("background-color", "rgb(139, 0, 0)");
      })
        .animate({ top: "+=8px" }, 100)
        .animate({ top: "-=8px" }, 100)
        .animate({ top: "+=8px" }, 100)
        .animate({ top: "-=4px" }, 100, function () {
          $(this).css("background-color", "rgb(16, 104, 155)");
          $(".letter").each(function () {
            if (($(this).hasClass("selected")))
              $(this).removeClass("selected");
          })
          //I put this part inside of if and else instead of bottom of them because otherwise, animation would not work.
          selectedLetters = "";
          $("#output").text(selectedLetters)
            .css("display", "none");
          leftpos = 215;
        });
      }
      //Word exists
      else {
        $(".letter").each(function () {
          if (($(this).hasClass("selected")))
            $(this).removeClass("selected");
        })
        selectedLetters = "";
          $("#output").text(selectedLetters)
            .css("display", "none");
          leftpos = 215;
      }
    }
  })

  $("#bulb").click(function () {
    bulbflag = !bulbflag;
    //Shows words
    if (bulbflag === true) {
      $(".word").each(function () {
        if ($(this).css("background") !== fontcolor) {
          $(this).css("color", selectedbackground);
        }
      })
    }
    //Hides words
    else {
      $(".word").each(function () {
        console.log($(this).css("color"));
        if ($(this).css("color") === selectedbackground) {
          $(this).css("color", fontcolor);
        }
      })
    }
  })


//Hover animation in bulb
  $("#bulb").mouseenter(function () {
    $("#bulb i").animate({left: "+=0px"}, 10, function() {
      $("#bulb i").css("color", "yellow");
    })
    .animate({left: "+=5px"}, 150)
    .animate({left: "-=10px"}, 150)
    .animate({left: "+=5px"}, 150)
  });

  //Stopping animation
  $("#bulb").mouseleave(function () {
    $("#bulb i").css("color", "black");
  });
})