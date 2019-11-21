$(document).ready(function() {
  $(".js--section-feature").waypoint(
    function(direction) {
      if (direction === "down") {
        $("nav").addClass("sticky");
      } else {
        $("nav").removeClass("sticky");
      }
    },
    { offset: "60px" }
  );

  $(".productsection").waypoint(
    function(direction) {
      if (direction === "down") {
        $("nav").addClass("animated fadeIn");
        $("nav").addClass("sticky");
      } else {
        $("nav").removeClass("sticky");
      }
    },
    { offset: "0px" }
  );
  $(".section-plans").waypoint(
    function(direction) {
      if (direction === "down") {
        $("nav").addClass("animated fadeIn");
        $("nav").addClass("sticky");
      } else {
        $("nav").removeClass("sticky");
      }
    },
    { offset: "0px" }
  );

  $(".js--wp-1").waypoint(
    function(direction) {
      $(".js--wp-1").addClass("animated fadeIn");
    },
    { offset: "50%" }
  );
  $(".js--wp-2").waypoint(
    function(direction) {
      $(".js--wp-2").addClass("animated fadeInUp");
    },
    { offset: "50%" }
  );
  $(".js--wp-3").waypoint(
    function(direction) {
      $(".js--wp-3").addClass("animated fadeIn");
    },
    { offset: "50%" }
  );
  $(".js--wp-4").waypoint(
    function(direction) {
      $(".js--wp-4").addClass("animated pulse");
    },
    { offset: "50%" }
  );

  $(".js--nav-icon").click(function() {
    const nav = $(".js--main-nav");
    const icon = $(".js--nav-icon i");

    nav.slideToggle(200);

    if (icon.hasClass("ion-navicon-round")) {
      icon.addClass("ion-close-round");
      icon.removeClass("ion-navicon-round");
    } else {
      icon.addClass("ion-navicon-round");
      icon.removeClass("ion-close-round");
    }
  });

  $(".options-user").addClass("noshow");
  $(".options-info").removeClass("noshow");

  $(".option").click(function(event) {
    const option = $(event.target);
    $(".options-user").addClass("noshow");

    if (option.hasClass("info")) {
      $(".options-info").removeClass("noshow");
    } else if (option.hasClass("orders")) {
      $(".options-orders").removeClass("noshow");
    } else if (option.hasClass("address")) {
      $(".options-address").removeClass("noshow");
    } else if (option.hasClass("updatepassword")) {
      $(".options-updatepassword").removeClass("noshow");
    } else if (option.hasClass("addplan")) {
      $(".options-addplan").removeClass("noshow");
    }
  });
});
