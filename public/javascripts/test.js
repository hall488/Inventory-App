let count = 0;

$(".countBtn").on("click", function () {
  count++;
  $(".count").text(count);
});
