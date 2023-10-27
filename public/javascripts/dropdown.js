const dropDowns = () => {
  const divs = [...document.querySelectorAll(".drop-down")];

  const styleSheet = document.createElement("style");
  document.head.appendChild(styleSheet);

  divs.forEach((d) => {
    let showMenu = true;
    const menu = d.querySelector("ul");
    const icon = document.createElement("i");

    icon.classList.add("fa-solid", "fa-circle-chevron-down", "fa-rotate-180");

    d.appendChild(icon);

    let leftOffset = -(menu.clientWidth + 16) / 2;

    if (d.classList.contains("left")) {
      leftOffset -= -(menu.clientWidth + 16) / 2;
    } else if (d.classList.contains("right")) {
      leftOffset += -(menu.clientWidth + 32) / 2;
    }
    menu.style.left = `${leftOffset}px`;

    const dropListener = () => {
      showMenu = !showMenu;

      menu.style.display = showMenu ? "grid" : "none";
      d.children[1].style.transform = showMenu
        ? "rotate(0deg)"
        : "rotate(180deg)";
    };

    d.addEventListener("click", dropListener);
    dropListener();
  });

  return {};
};

dropDowns();
