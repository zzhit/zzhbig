$(function () {
    $('.login').on('click', function () {
        $('.loginBox').hide();
        $('.regBox').show();
    })
    $('.reg').on('click', function () {
        $('.loginBox').show();
        $('.regBox').hide();
    })
})