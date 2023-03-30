const commonToAll = " -inurl:(jsp|pl|php|html|aspx|htm|cf|shtml) " +
"-inurl:(index_of|listen77|mp3raid|mp3toss|mp3drug|sirens|rocks|wall" +
"ywashis) intitle:\"index.of./\" ";
const allExtensions = [
  " (avi|mkv|mov|mp4|mpg|wmv|avchd|webm)",
  " (ac3|flac|m4a|mp3|ogg|wav|wma|webm)",
  " (CBZ|CBR|CHM|DOC|DOCX|EPUB|MOBI|ODT|PDF|RTF|txt)",
  " (bmp|gif|jpg|png|psd|tif|tiff)",
  " (apk|exe|iso|rar|tar|zip|swf)",
  " (7z|bz2|gz|iso|rar|zip)"
];

$(document).ready(() => {
  let search_catg = 0;
  $(".dropdown-item").click((e) => {
    $(".dropdown-toggle").html($(e.target).data("value"));
    search_catg = $(e.target).data("code");
  });
  $("#search-btn").click(() => {
    const query = $("#query").val();    
    const extensions = allExtensions[search_catg % 6];
    query.split(',').forEach(input => {
      if (input) {
        const last = input.replace(/[^\w\s]/gi, '').replace(/ /g, ".");
        const goodInput = `intext:"${last}"`;
        const finalQuery = `${goodInput}${extensions}${commonToAll}`;
        const url = `https://www.google.com/search?q=${encodeURIComponent(finalQuery)}`;
        window.open(url);
      }
    });
  });
});