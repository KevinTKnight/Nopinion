
var bShouldHideOpinions = true;
var storageVarName = 'NOpinionEnabled';
var entryBoxName = "c-entry-box--compact";
var labelsName = "c-entry-box--compact__label-primary";

/* ---------- !!!!!! ---------- */
/* 
this script is kicked off on page load. Kinda slow but should be manageable.
Scrubs through the DOM for any opinion labels and removes them if found. Doesn't work
(currently) for non-headlined articles because there's nothing that I'm aware of that 
denotes them as "opinion" articles. Possibly can scrub data from the links but that 
seems like a lot of work
*/
/* ---------- !!!!!! ---------- */

//Go through each c-entry-box--compact, check it's contents for "Opinion" and if we get a hit, hide the damn Div


function DoHide()
{
  var elements = document.getElementsByClassName(entryBoxName);

  //forgive me, I'm a C++ programmer and I hate web dev
  for (var i = elements.length-1; i >= 0; --i)
  {
      //go the label
      var labels = elements[i].getElementsByClassName(labelsName);
      
      for (var j = 0; j < labels.length; ++j)
      {
          if (labels[j].innerHTML.includes("/opinion"))
          {
            //GTFO
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
        }
      }
  });

