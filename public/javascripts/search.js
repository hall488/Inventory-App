const newCardLink = (card, hasNormal = true) => {
  let link = $("<a>", {
    href: `/createCard/${card.id}`,
  });

  let image = $("<img>", {
    src: `${hasNormal ? card.image_uris.normal : card.image_uris[0]}`,
  });

  link.append(image);

  return link;
};

const handleSearch = async (value) => {
  $(".searched-cards").empty();
  $(".searched-cards").html = "Loading...";

  const response = await fetch(
    `https://api.scryfall.com/cards/search?q=${value}`,
    {
      mode: "cors",
    }
  );
  const json = await response.json();

  let cards = [];

  for (i = 0; cards.length != 8; i++) {
    let card = json.data[i];

    console.log(card);

    if (card == null || card == undefined) {
      break;
    }

    if (!("image_uris" in card)) {
      continue;
    }

    if (!("normal" in card.image_uris)) {
      continue;
    }

    cards.push(card);
  }

  $(".searched-cards").empty();
  cards.forEach((card) => {
    $(".searched-cards").append(newCardLink(card));
  });

  console.log($(".searched-cards"));
};

$("#search").on("keypress", (e) => {
  if (e.key == "Enter") {
    handleSearch(e.currentTarget.value);
  }
});

$(".fa-magnifying-glass").on("click", (e) => {
  handleSearch($("#search")[0].value);
});
