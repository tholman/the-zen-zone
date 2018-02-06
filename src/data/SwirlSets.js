
let SwirlSets = [
  {
    name: "spiral",
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
