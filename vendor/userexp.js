
console.log('hello');

var register = '<form action="./register" method="post" class= "reg"><h2>Register</h2>Username: <input type="text" class="inside" name="username"><br>Password: <input type="text" class="inside" name="password"><br>Summoner Name: <input type="text" name="summonername class="inside" "><br><input type="submit"> <a href = "#" class="back" > back </a>';
var signin = '<form action="" method="post" class= "vert inside" id = "removelog"> <h2>Login</h2>   Username: <input type="text" name="username" class="space" ><br>Password: &nbsp <input type="text" name="password"><br>Need an Account <a href = "#" class="regs">Register Here</a><br><input type="submit" class="space"></div></form>';
$( document ).ready(function() {
    $('.vert a').click(function(){
        $('.login').empty();
        $(register).appendTo(".login")
    })
    $('.login').on('click','.back', function(){
      $('.login').empty();
     $(signin).appendTo(".login")

    })
    $('.login').on('click', '.regs', function(){
             $('.login').empty();
        $(register).appendTo(".login")
    })
	
$('.show-item').mouseenter(function(){
console.log(this.class);
    $(this).find(' .item-mouseover').toggle();
    
})

$('.show-item').mouseleave(function(){
console.log(this);    
$(this).find('.item-mouseover').toggle();
})

$(".scroll-div").click(function() {
    $('html,body').animate({
        scrollTop: $(".scroll-point").offset().top},
        'slow');
});

});

