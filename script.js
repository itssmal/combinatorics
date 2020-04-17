let n;
let k;
const calcBtn = document.getElementById("calcBtn");
const array = [1,2,3,4,5,6];
const result = [];
const genPermF = document.getElementById("genPerm");
const genCombF = document.getElementById("genComb");
const clearBtn = document.getElementById("clearAll");

function factorial(n) {
  if (n === 0 || n === 1){
    return 1;
  } else {
   return (n * factorial(n - 1));
  }
}

function perm(n,k) {
  return (factorial(n)/factorial(n - k));
}

function permWRep(n,k) {
  return (Math.pow(n,k));
}

function comb(n,k) {
  return (factorial(n)/(factorial(k)*factorial(n - k)));
}

function combWRep(n,k) {
  return (factorial(n + k - 1)/(factorial(k)*factorial(n - 1)));  // (2,1)= 2 /(1 * 1) = 2
}

function genPerm(arr) {
  let ret = [];

  for (let i = 0; i < arr.length; i ++) {
    let rest = genPerm(arr.slice(0, i).concat(arr.slice(i + 1)));
    if(!rest.length) {
      ret.push([arr[i]])
    } else {
      for(let j = 0; j < rest.length; j++) {
        ret.push([arr[i]].concat(rest[j]))
      }
    }
  }
  return ret;
}

function genComb(input, len, start) {
  
  if(len === 0) {
    console.log(result.join(" "));
    document.getElementById("generations").innerHTML += result.join(" ") + "<br/>"; //process here the result
    return;
  }
  for (let i = start; i <= input.length - len; i++) {
    result[result.length - len] = input[i];
    genComb(input, len-1, i+1 );
  }
}

calcBtn.addEventListener("click", event => {
  if (document.getElementById("entA").value === "" && document.getElementById("entB").value === "") {
      document.getElementById("entA").classList += ("empty");
      document.getElementById("entB").classList += ("empty");
      alert("Введіть значення a і b");
  } 
  else if (document.getElementById("entB").value === "") {
      document.getElementById("entB").classList += ("empty");
      alert("Введіть значення b у поле 'Введіть b:'");
  } 
  else if (document.getElementById("entA").value === ""){
      document.getElementById("entA").classList += ("empty");
      alert("Введіть значення а у поле 'Введіть a:'");
  } 
  else {
      document.getElementById("entA").classList.remove("empty");
      document.getElementById("entB").classList.remove("empty");
      document.getElementById("factAns").innerText = " ";
      document.getElementById("permAns").innerText = " ";
      document.getElementById("permWRepAns").innerText = " ";
      document.getElementById("combAns").innerText = " ";
      document.getElementById("combWRepAns").innerText = " ";

      n = parseInt(document.getElementById("entA").value, 10);
      k = parseInt(document.getElementById("entB").value, 10);
      
      let factAns = factorial(n);
      document.getElementById("factAns").innerText += " " + n + "! = " + factAns;

      let permAns = perm(n,k);
      document.getElementById("permAns").innerText += " " + permAns;

      let permWRepAns = permWRep(n,k);
      document.getElementById("permWRepAns").innerText += " " + permWRepAns;

      let combAns = comb(n,k);
      document.getElementById("combAns").innerText += " " + combAns;

      let combWRepAns = combWRep(n,k);
      document.getElementById("combWRepAns").innerText += " " + combWRepAns;
  }  
})

genPermF.addEventListener("click", event => {
  if (document.getElementById("entA").value === ""){
    document.getElementById("entA").classList += ("empty");
    alert("Введіть кількість елементів масиву у поле 'Введіть a:'");
  } 
  else {
    document.getElementById("entA").classList.remove("empty");
    clearBtn.style.display = "block";
    
    let arrlen = parseInt(document.getElementById("entA").value, 10);
    const newArray = [];
    for (let i = 1; i <= arrlen; i++){
      newArray.push(i);
    }  
    document.getElementById("values").innerHTML = "";
    document.getElementById("values").innerHTML += "Вхідний масив: [ " + newArray + " ]";
     
    document.getElementById("generations").innerHTML = " ";
    document.getElementById("generations").innerHTML += "Згенеровані " + factorial(arrlen) + " перестановок: " + "<br/>";
    document.getElementById("generations").innerHTML += "<br/>" + genPerm(newArray).join("\n");
  }
})


genCombF.addEventListener("click", event => {
  if (document.getElementById("entA").value === "" && document.getElementById("entB").value === "") {
    document.getElementById("entA").classList += ("empty");
    document.getElementById("entB").classList += ("empty");
    alert("Введіть значення a і b");
    } 
    else if (document.getElementById("entB").value === "") {
        document.getElementById("entB").classList += ("empty");
        alert("Введіть значення b у поле 'Введіть b:'");
    } 
    else if (document.getElementById("entA").value === ""){
        document.getElementById("entA").classList += ("empty");
        alert("Введіть значення а у поле 'Введіть a:'");
    } 
    else {
      clearBtn.style.display = "block";
      
      let arrlen = parseInt(document.getElementById("entA").value, 10);
      result.length = parseInt(document.getElementById("entB").value, 10);
      const newArray = [];
      for (let i = 1; i <= arrlen; i++){
        newArray.push(i);
      }  
      document.getElementById("values").innerHTML = "";
      document.getElementById("values").innerHTML += "Вхідний масив: [ " + newArray + " ]";
      document.getElementById("entA").classList.remove("empty");
      document.getElementById("generations").innerHTML = " ";
      document.getElementById("generations").innerHTML += "Згенеровані сполучення з " + arrlen + " елементів по " + result.length + "<br/>";
      genComb(newArray, result.length, 0);
    }
  })


clearBtn.addEventListener("click", event => {
  document.getElementById("values").innerHTML = "";
  document.getElementById("generations").innerHTML = " ";
  document.getElementById("clearAll").style.display = "none";
})
