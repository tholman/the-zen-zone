
let SwirlSets = [
  {
    name: "spiral",
    colors: ["#ff8b94", "#ffaaa5", "#ffd3b6", "#dcedc1", "#a8e6cf", "#82e4c0"],
    system: (iterator, width, height) => {
      let center = {x: width / 2, y: height / 2}
      let spiralExpanse = 18;
      let angle = 0.05 * -iterator; // spirals out
      let x = center.x + (spiralExpanse * angle) * Math.cos(angle);
      let y = center.y + (spiralExpanse * angle) * Math.sin(angle);
      return {x: x, y: y};
    }
  },
  {
    name: "spiral2",
    colors: ["#ff8b94", "#ffaaa5", "#ffd3b6", "#dcedc1", "#a8e6cf", "#82e4c0"],
    system: (iterator, width, height) => {
      let center = {x: width / 2, y: height / 2}
      let spiralExpanse = 18;
      let angle = 0.05 * iterator; // spirals in
      let x = center.x + (spiralExpanse * angle) * Math.cos(angle);
      let y = center.y + (spiralExpanse * angle) * Math.sin(angle);
      return {x: x, y: y};
    }
  },
  {
    name: "spiral3",
    colors: ["#ff8b94", "#ffaaa5", "#ffd3b6", "#dcedc1", "#a8e6cf", "#82e4c0"],
    system: (iterator, width, height) => {
      let center = {x: width / 2, y: height / 2}
      let spiralExpanse = 18;
      let angle = 0.05 * -iterator; // spirals out
      let x = center.x + (spiralExpanse * angle) * Math.cos(angle);
      let y = center.y + (spiralExpanse * angle) * Math.sin(angle);
      return {x: x, y: y};
    }
  },
  {
    name: "spiral4",
    colors: ["#ff8b94", "#ffaaa5", "#ffd3b6", "#dcedc1", "#a8e6cf", "#82e4c0"],
    system: (iterator, width, height) => {
      let center = {x: width / 2, y: height / 2}
      let spiralExpanse = 18;
      let angle = 0.05 * -iterator; // spirals out
      let x = center.x + (spiralExpanse * angle) * Math.cos(angle);
      let y = center.y + (spiralExpanse * angle) * Math.sin(angle);
      return {x: x, y: y};
    }
  },
  {
    name: "spiral5",
    colors: ["#ff8b94", "#ffaaa5", "#ffd3b6", "#dcedc1", "#a8e6cf", "#82e4c0"],
    system: (iterator, width, height) => {
      let center = {x: width / 2, y: height / 2}
      let spiralExpanse = 18;
      let angle = 0.05 * -iterator; // spirals out
      let x = center.x + (spiralExpanse * angle) * Math.cos(angle);
      let y = center.y + (spiralExpanse * angle) * Math.sin(angle);
      return {x: x, y: y};
    }
  }
]

export default SwirlSets;
