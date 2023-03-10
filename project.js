// One trick to organizing code is to put related functions inside of an object,
// so they are under the same "namespace". This helps maek readable code that is
// easier to maintain in the long term.
// TODO: replace use of `document.getElementByXXX` with `d3.select` so it is more readable

/* globals scrollama */

const Project = {};

Project.scrolling = {

  // these hold references to helpers and rendered page elements (filled in by `initialize`)
  scroller: undefined, // an instance of scrollama
  steps: undefined, // an array of all the step elements

  // a list of the backdrop images, ordered so they match the `step` elements on the page
  backdrops: [
    { 'src': 'https://cdn.glitch.global/5e18e5e6-1ed2-44b7-bfcb-810f3585a734/IMG%20001.JPG?v=1675145301844',
      'credit': '(C) Xiangpei Lyu 2023',
      'type': 'image', //001
    },
    { 'src': 'https://cdn.glitch.global/5e18e5e6-1ed2-44b7-bfcb-810f3585a734/IMG%20002.JPG?v=1675145331782',
      'credit': '(C) Xiangpei Lyu 2023',
      'type': 'image', //002
    },
    { 'src': 'https://cdn.glitch.global/5e18e5e6-1ed2-44b7-bfcb-810f3585a734/IMG%20003.JPG?v=1675145356400',
      'credit': '(C) Xiangpei Lyu 2023',
      'type': 'image', //003
    },
    { 'src': 'https://cdn.glitch.global/5e18e5e6-1ed2-44b7-bfcb-810f3585a734/IMG%20004.JPG?v=1675145406167',
      'credit': '(C) Xiangpei Lyu 2023',
      'type': 'image', //004
    },
    { 'src': 'https://cdn.glitch.global/5e18e5e6-1ed2-44b7-bfcb-810f3585a734/IMG%20005.JPG?v=1675145413480',
      'credit': '(C) Xiangpei Lyu 2023',
      'type': 'image', //005
    },
    { 'src': 'https://cdn.glitch.global/5e18e5e6-1ed2-44b7-bfcb-810f3585a734/IMG%20006.JPG?v=1675145424949',
      'credit': '(C) Xiangpei Lyu 2023',
      'type': 'image', //006
    },
    { 'src': 'https://cdn.glitch.global/5e18e5e6-1ed2-44b7-bfcb-810f3585a734/IMG%20007.JPG?v=1675145431236',
      'credit': '(C) Xiangpei Lyu 2023',
      'type': 'image', //007
    },
    { 'src': 'https://cdn.glitch.global/5e18e5e6-1ed2-44b7-bfcb-810f3585a734/IMG%20008.JPG?v=1675145439160',
      'credit': '(C) Xiangpei Lyu 2023',
      'type': 'image', //008
    },
    { 'src': 'https://cdn.glitch.global/5e18e5e6-1ed2-44b7-bfcb-810f3585a734/IMG%20009.JPG?v=1675145461266',
      'credit': '(C) Xiangpei Lyu 2023',
      'type': 'image', //009
    },
    { 'src': 'https://cdn.glitch.global/5e18e5e6-1ed2-44b7-bfcb-810f3585a734/IMG%20010.JPG?v=1675145474593',
      'credit': '(C) Xiangpei Lyu 2023',
      'type': 'image', //010
    },
    { 'src': 'https://cdn.glitch.global/5e18e5e6-1ed2-44b7-bfcb-810f3585a734/IMG%20011.JPG?v=1675145491813',
      'credit': '(C) Xiangpei Lyu 2023',
      'type': 'image', //011
    },
  ],

  // set up the webpage to scroll
  initialize: () => {
    // grab the elements on the page that are related to the scrolling
    const scrollWrapper = document.getElementById("scrolly");
    Project.scrolling.figure = scrollWrapper.getElementsByTagName("figure")[0];
    const article = scrollWrapper.getElementsByTagName('article')[0];
    Project.scrolling.steps = Array.from(article.getElementsByClassName("step")); // convert from HTMLCollection to Array for ease of use later
    // intialize the scrollama helper
    Project.scrolling.scroller = scrollama();
    Project.scrolling.scroller
      .setup({
        step: "#scrolly article .step",
        offset: 0.9,
        debug: false
      })
      .onStepEnter(Project.scrolling.handleStepEnter)
      .onStepExit(Project.scrolling.handleStepExit);
    // setup the default view to be the right size and include first step
    Project.scrolling.handleResize();
    Project.scrolling.setBackdropImage(0); // remember: 0 means the first item in an array
  },

  // call this to switch the background image
  setBackdropImage: (index) => {
    // grab the info for thi step
    // if this step's type is image
    //.  then swap the image
    // if this step's type if video
    //.  hide the image
    //.  set the video src
    //.  show the video
    //.  play the video
    const image = Project.scrolling.figure.getElementsByTagName("img")[0];
    image.src = Project.scrolling.backdrops[index].src;
    //image.classList.add = 'fade-in';
    // TODO: make this caption text a link
    document.getElementsByTagName("figcaption")[0].innerHTML = Project.scrolling.backdrops[index].credit;
  },

  // called by scrollama when the step is being entered
  handleStepEnter: (stepInfo) => { // stepInfo = { element, directihandle, index }
    // console.log(`Switched to step ${stepInfo.index}`);
    // TODO: add an `is-active` class on the step that we switched to (and remove from all others)
    // and switch the background image to match the step content
    Project.scrolling.setBackdropImage(stepInfo.index);
  },

  // called by scrollama when moving out of a step
  handleStepExit: (stepInfo) => {
    // we don't make any transitions when a step scrolls out of view
  },

  // called to get content to be the right size to fit the device
  handleResize: () => {
    const stepH = Math.floor(window.innerHeight * 1); // update step heights
    Project.scrolling.steps.forEach(step => step.style.height = stepH + "px")
    const figureHeight = window.innerHeight;
    const figureMarginTop = 0;
    Project.scrolling.figure.style.height = figureHeight + "px";
    Project.scrolling.figure.style.top = figureMarginTop + "px";
    Project.scrolling.figure.getElementsByClassName("wrapper")[0].style.height = figureHeight + "px";
    Project.scrolling.scroller.resize(); // tell scrollama to update new element dimensions
  },

};
