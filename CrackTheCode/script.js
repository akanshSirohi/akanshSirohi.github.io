// Some important functions needed!
const random = () => {
  return Math.floor(Math.random() * 100);
};

const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const random_ex = (excluded) => {
  let x = Math.floor(Math.random() * 100);
  if (excluded.includes(x)) {
    return random_ex(excluded);
  } else {
    return x;
  }
};

const random_ex2 = (min, max, excluded) => {
  let x = rand(min, max);
  if (excluded.includes(x)) {
    return random_ex2(min, max, excluded);
  } else {
    return x;
  }
};

// Initializing some variables
let n1 = random();
let n2 = random_ex([n1]);
let n3 = random_ex([n1, n2]);
let arr = [n1, n2, n3]; // solution array
let placed = [];
let n = rand(0, 2);
let hArr = [];

$(document).ready(() => {
  // Hint 1 algo
  // One Number is correct and well placed
  for (let i = 0; i < 3; i++) {
    if (i == n) {
      hArr[i] = arr[n];
      placed.push(n);
    } else {
      hArr[i] = random_ex(arr);
    }
  }

  $("#h1_0").html(hArr[0]);
  $("#h1_1").html(hArr[1]);
  $("#h1_2").html(hArr[2]);

  // Hint 2 algo
  // One Number is correct but wrong placed
  n = random_ex2(0, 2, [n]);
  hArr = [-1, -1, -1];
  hArr[random_ex2(0, 2, [n])] = arr[n];
  placed.push(n);

  for (let i = 0; i < 3; i++) {
    if (hArr[i] == -1) {
      hArr[i] = random_ex(arr);
    }
  }

  $("#h2_0").html(hArr[0]);
  $("#h2_1").html(hArr[1]);
  $("#h2_2").html(hArr[2]);

  // Hint 3 algo
  // Two numbers are correct but wrong placed
  let c = random_ex2(0, 2, placed);
  hArr = [-1, -1, -1];
  let p = random_ex2(0, 2, [c, n]);

  hArr[p] = arr[n];

  let temp = [0, 1, 2];
  temp = temp.filter((e) => e !== p);
  temp = temp.filter((e) => e !== c);

  hArr[temp[0]] = arr[c];

  for (let i = 0; i < 3; i++) {
    if (hArr[i] == -1) {
      hArr[i] = random_ex(arr);
    }
  }

  $("#h3_0").html(hArr[0]);
  $("#h3_1").html(hArr[1]);
  $("#h3_2").html(hArr[2]);

  // Hint 4 algo
  // Nothing is Correct
  hArr[0] = random_ex(arr);
  hArr[1] = random_ex(arr.concat([hArr[0]]));
  hArr[2] = random_ex(arr.concat([hArr[0], hArr[1]]));

  $("#h4_0").html(hArr[0]);
  $("#h4_1").html(hArr[1]);
  $("#h4_2").html(hArr[2]);

  // Hint 5 algo
  // One Number is correct but wrong placed
  let b = rand(0, 2);
  hArr = [-1, -1, -1];
  hArr[random_ex2(0, 2, [b])] = arr[b];

  for (let i = 0; i < 3; i++) {
    if (hArr[i] == -1) {
      hArr[i] = random_ex(arr);
    }
  }

  $("#h5_0").html(hArr[0]);
  $("#h5_1").html(hArr[1]);
  $("#h5_2").html(hArr[2]);

  $("#checkBtn").click(() => {
    let c1 = $("#c1").val();
    let c2 = $("#c2").val();
    let c3 = $("#c3").val();
    if (c1 == arr[0] && c2 == arr[1] && c3 == arr[2]) {
      closeFail();
      showSuccess();
    } else {
      closeSuccess();
      showFail();
    }
  });
  console.log(arr);
});
