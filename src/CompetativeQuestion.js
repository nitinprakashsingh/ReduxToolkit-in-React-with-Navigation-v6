function reverseString(str) {
  let reversed = '';
  for(let i = str.length -1; i>0;i--){
    reversed += str[i];
  }
  console.log(reversed);
}
reverseString("Hello nitin")

const findDuplicate=(array)=>{
   var count = {}
   var duplicateArray = []
   for(let number of array){
    count[number] = (count[number] || 0) + 1
    if(count[number] > 1){
      duplicateArray.push(number)
   }
}
console.log(duplicateArray);
console.log(count);
}
var array = [1,2,3,4,5,1,2,3];
findDuplicate(array)

function checkpalindrome(str){
  let reversed = '';
  for(let i = str.length -1; i>=0;i--){
    reversed += str[i];
  }
  if(str === reversed){
    console.log("It is a palindrome");
  }else{
    console.log("It is not a palindrome");
  }
}
checkpalindrome("nitin")

function findLargestNumber(temp){
  var result = []
  for(var num of temp){
    if(Array.isArray(num)){
      result = result.concat(findLargestNumber(num))
    }else{
      result.push(num)
    }
  }
  return result
}
var temp = [1,2,[3,4],[5,6],7]
console.log(findLargestNumber(temp))
var objTemp = {
  name: "nitin",
  age: 30,
  address: {
    city: "Delhi",
    country: "India",
    state : {
      a: "Delhi",
      code: "110044",
      lanugage : {
        b : "hindi",
        c : "english",
        d : "Bhojpuri",
        e : "panjabi",
        origin: {
          f: "Bihar",
          g: "uttar Pradesh"
        }
      }
    }
  }
}
const flattenObject = (obj)=>{
  const result = {};
  for(let key in obj){
    if(typeof obj[key] === 'object' && obj[key] !== null){
      const flatObject = flattenObject(obj[key]);
      for(let subKey in flatObject){
        result[`${key}.${subKey}`] = flatObject[subKey];
      }
    }else{
      result[key] = obj[key];
    }
  }
  return result;
}
console.log(flattenObject(objTemp))
function fibonacciSeries(){
  var a = 0;
  var b = 1;
  var c = 0;
  for(let i = 0; i < 10; i++){
   // console.log("fibonacci series data",a);
    c = a + b;
    a = b;
    b = c;
  }
}


fibonacciSeries()

var demoString = "aaabbbbbccaaa";

function countContinuousCharacters1(str) {
  if (!str) return;

  let maxChar = str[0];
  let maxCount = 1;

  let currentChar = str[0];
  let currentCount = 1;

  for (let i = 1; i < str.length; i++) {
    if (str[i] === currentChar) {
      currentCount++;
    } else {
      currentChar = str[i];
      currentCount = 1;
    }

    if (currentCount > maxCount) {
      maxCount = currentCount;
      maxChar = currentChar;
    }
  }

  console.log(`${maxChar} : ${maxCount}`);
}
countContinuousCharacters1(demoString)
