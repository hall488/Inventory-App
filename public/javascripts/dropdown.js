const dropDowns = () => {
  const divs = [...document.querySelectorAll(".drop-down")];

  const styleSheet = document.createElement("style");
  document.head.appendChild(styleSheet);

  styleSheet.sheet.insertRule(`.menu {
      display: grid; position: absolute;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto;
      gap: 20px;
      padding: 20px;
      justify-content: center;
      top: 48px;    
      margin: 10px;
      background-color: whitesmoke;
      box-shadow: 0px 0px 10px black;
      border-radius: 20px;
      border: 10px solid rgb(56, 56, 56);
    }`);

  styleSheet.sheet.insertRule(`.menu > li {
    list-style-type: none;
          
    }`);

  styleSheet.sheet.insertRule(`.menu > li > a {
    text-decoration: none;
    aspect-ratio: 1;
          font-size: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction:column-reverse;
          gap: 8px;
          padding: 8px;
          
    color: rgb(56, 56, 56);
  }`);

  styleSheet.sheet.insertRule(`.menu > li > a > div {
      font-size: 12px;
      text-align: center;
    }`);

  styleSheet.sheet.insertRule(`.drop-down > i{
      display: flex;
      align-items: center;
      transition: transform .5s ease-in-out;
    }`);

  styleSheet.sheet.insertRule(`.drop-down {
      position: relative;
    }`);

  styleSheet.sheet.insertRule(`.menu>li:hover {
      background-color: lightgrey;
      border-radius: 10px;
    }`);

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
      leftOffset += -(menu.clientWidth + 16) / 2;
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
