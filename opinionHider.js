
var bShouldHideOpinions = true;
var storageVarName = 'NOpinionEnabled';
/* ---------- !!!!!! ---------- */
/* this script is kicked off at document_end so the DOM is received already
look for those darn opinion articles and cut them out */
/* ---------- !!!!!! ---------- */

//Go through each c-entry-box--compact, check it's contents for "Opinion" and if we get a hit, hide the damn Div


function DoHide()
{
  //early out, do nooothing!
  if (!bShouldHideOpinions)
  {
    return;
  }

  var elements = document.getElementsByClassName("c-entry-box");
  //forgive me, I'm a C++ programmer and I hate web dev
  for (var i = elements.length-1; i >= 0; --i)
  {
      console.log("Checking element #" + i + " of " + elements.length + " for Opinon labels");
      //go the label
      var labels = elements[i].getElementsByClassName("compact__label-primary");
      
      for (var j = 0; j < labels.length; ++j)
      {
          console.log("Checking Label #" + j + " of " + labels.length);
          if (labels[j].innerHTML.includes("/opinion"))
          {
            //Get the FUCK OUT
            console.log("Removing Opinion Div");
            elements[i].parentNode.removeChild(elements[i]);
          }
      }
  }
}

chrome.storage.sync.get(storageVarName,
  function (items)
  {
    bShouldHideOpinions = items[storageVarName];
    console.log("Should Hide: " + bShouldHideOpinions)
    if (bShouldHideOpinions == true)
    {
      DoHide();
    }
  }
);

chrome.storage.onChanged.addListener(
  function(changes, namespace) 
  {
      for (key in changes)
      {
        console.log("Recieved changes to: " + key);
        if (key == storageVarName)
        {
          //reload with our changes
          bShouldHideOpinions = changes[key].newValue;
          chrome.tabs.reload(function() {});
        }
      }
  });

