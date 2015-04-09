console.log('hello');

var register = '<form action="./register" method="post" class= "reg"><h2>Register</h2>Username: <input type="text" class="inside" name="username"><br>Password: <input type="text" class="inside" name="password"><br>Summoner Name: <input type="text" name="summonername" class="inside" "><br><input type="submit"> <a href = "#" class="back" > back </a>';
var signin = '<form action="" method="post" class= "vert inside" id = "removelog"> <h2>Login</h2>   Username: <input type="text" name="username" class="space" ><br>Password: &nbsp <input type="text" name="password"><br>Need an Account <a href = "#" class="regs">Register Here</a><br><input type="submit" class="space"></div></form>';
$(document).ready(function() {
  $('.vert a').click(function() {
    $('.login').empty();
    $(register).appendTo(".login")
  })
  $('.login').on('click', '.back', function() {
    $('.login').empty();
    $(signin).appendTo(".login")

  })
  $('.login').on('click', '.regs', function() {
    $('.login').empty();
    $(register).appendTo(".login")
  })

  $('.show-item').mouseenter(function() {
    console.log(this.class);
    $(this).find(' .item-mouseover').toggle();

  })

  $('.show-item').mouseleave(function() {
    console.log(this);
    $(this).find('.item-mouseover').toggle();
  })

  $(".scroll-div").click(function() {
    $('html,body').animate({
        scrollTop: $(".scroll-point").offset().top
      },
      'slow');
  });

  var hashlocation = window.location.hash;
  var failure = '<div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h3 class="modal-title">Failure</h3> </div> <div class="modal-body"> <p>Your username already exists!</p> <p class="text-warning"><small>Please try again.</small></p> </div> <div class="modal-footer"> <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button> </div> </div> </div>';

  var success = ' <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h4 class="modal-title">Confirmation</h4> </div> <div class="modal-body"> <p>You have now registered feel free to login!</p> <p class="text-warning"><small>Please remember your username and password.</small></p> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div>';

  var login = ' <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h4 class="modal-title">Confirmation</h4> </div> <div class="modal-body"> <form action="/" method="post" class= "vertmodal insidemodal" id = "removelogmodal"> <h2>Login</h2>   Username: <input type="text" name="username" class="space" ><br>Password: &nbsp <input type="text" name="password"><br>Need an Account <a href = "#" id="regsmodal">Register Here</a><br><input type="submit" class="space"></div></form><p class="text-warning"><small>Please remember your username and password.</small></p> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div>';

  var registermodal = ' <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h4 class="modal-title">Confirmation</h4> </div> <div class="modal-body"> <form action="/register" method="post" class= "regmodal"><h2>Register</h2>Username: <input type="text" class="inside" name="username"><br>Password: <input type="text" class="inside" name="password"><br>Summoner Name: <input type="text" name="summonername" class="insidemodal" "><br><input type="submit"> <a href = "#" id="backmodal" > back </a><p class="text-warning"><small>Please remember your username and password.</small></p> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div>';

  var loginfailure = ' <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> <h4 class="modal-title">Wrong Credentials</h4> </div> <div class="modal-body"> <form action="/" method="post" class= "vertmodal insidemodal" id = "removelogmodal"> <h2>Login</h2> <br>Need an Account <a href = "#" id="regsmodal">Wrong Password</a><br>p class="text-warning"><small>Type your password correct .</small></p> </div> <div class="modal-footer"> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div>';
  switch (hashlocation) {
    case "#loginsuccess":
      $('#modalmessage').empty();
      $(success).appendTo("#modalmessage");
      $("#modalmessage").modal("show");
      break;
    case "#logfail":
      $('#modalmessage').empty();
      $(failure).appendTo("#modalmessage");
      $("#modalmessage").modal("show");
      break;
    case "#promptlogin":
      $('#modalmessage').empty();
      $(login).appendTo("#modalmessage");
      $("#modalmessage").modal("show");
      $('#modalmessage').on('click', '#regsmodal', function() {
        $('#modalmessage').empty();
        $(registermodal).appendTo("#modalmessage");
      })
      $("#modalmessage").on('click', '#backmodal', function() {
        $('#modalmessage').empty();
        $(login).appendTo("#modalmessage");
      });
      break;
    case '#loginfail':
      $('#modalmessage').empty();
      $(loginfailure).appendTo('#modalmessage');
      break;
  }
});
