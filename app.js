const textareaA = document.getElementById('blockA');
const textareaB = document.getElementById('blockB');
const btn = document.getElementById('btnResult');
const resultAdd = document.getElementById('resultAdd');
const resultRemove = document.getElementById('resultRemove');
const tx = document.getElementsByTagName("textarea");
for (let i = 0; i < tx.length; i++) {
  tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
  tx[i].addEventListener("input", OnInput, false);
}

btn.addEventListener('click', function handleClick() {
  const blocksA = splitByNewLine(textareaA.value);
  const blocksB = splitByNewLine(textareaB.value);

  const firstBlock = cleanWhiteSpaces(blocksA);
  const secondBlock = cleanWhiteSpaces(blocksB);

  const firstBlockCleaned = cleanComments(firstBlock);
  const secondBlockCleaned = cleanComments(secondBlock);

  const needToAdd = checkIfValueExists(firstBlockCleaned, secondBlockCleaned);
  const needToRemove = checkIfValueExists(secondBlockCleaned, firstBlockCleaned);


  if(needToAdd.length == 0 && needToRemove.length == 0)
  {
    resultAdd.innerHTML = "";
    resultRemove.innerHTML = "";
    resultAdd.style.display = 'none';
    resultRemove.style.display = 'none';
    alert("**** Blocks Are Equal ****");
  }
  else
  {
    if(needToAdd.length > 0)
    {
      resultAdd.innerHTML = "";

      needToAdd.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        resultAdd.appendChild(li);
      });
      resultAdd.style.display = 'block';
    }

    if(needToRemove.length > 0)
    {

      resultRemove.innerHTML = "";

      needToRemove.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        resultRemove.appendChild(li);
      });
      resultRemove.style.display = 'block';
    }
  }

});


// Helper Functions

function OnInput() {
  this.style.height = "auto";
  this.style.height = (this.scrollHeight) + "px";
}

function splitByNewLine(str)
{
    const result = str.split(/\r?\n/);
    return result;
}

function cleanWhiteSpaces(array)
{
    const arr = [];
    array.forEach(element => {
        arr.push(element.replace(/\s/g,''));
    });

    return arr;
}

function cleanComments(array)
{
    const arr = [];
    array.forEach(element => {

        if(element.includes('//'))
        {
            const cleanElement = element.split('//');
            arr.push(String(cleanElement[0]).toLowerCase());
        }
        else
        {
            arr.push(String(element).toLowerCase());
        }
        
    });

    return arr;
}

function checkIfValueExists(arrValid, arr)
{
    let result = [];

    arrValid.forEach(element => {
        if(!arr.includes(element))
        {
            result.push(element);
        }
    });

    return result;

}

function clearList(listPage)
{
  for (var i = 0; (li = listPage[i]); i++) {
    li.parentNode.removeChild(li);
  }
}