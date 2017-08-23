
var storageVarName = 'NOpinionEnabled';

function DisableExtension()
{
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'NOpinionEnabled': false}, 
          function() 
          {
          // Notify that we saved.
          console.log('Disabled settings saved');
          });
}

function EnableExtension()
{
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({'NOpinionEnabled': true}, 
          function() 
          {
            // Notify that we saved.
            console.log("Enabled settings saved");
          });
}

function UpdateStatus(bStatusValue)
{
  var status = document.getElementById("status");
  status.innerText = bStatusValue;
}

function SetExtensionEnabled(bIsEnabled)
{
    document.getElementById("enabledButton").hidden = bIsEnabled;
    document.getElementById("disabledButton").hidden = !bIsEnabled;
}

SetExtensionEnabled(true);


chrome.storage.sync.get(storageVarName,
  function (items)
  {
    UpdateStatus(items[storageVarName]);
    if (items[storageVarName] == true)
    {
      SetExtensionEnabled(true);
    }
    else if (items[storageVarName] == false)
    {
      SetExtensionEnabled(false);
    }
  }
);

chrome.storage.onChanged.addListener(
  function(changes, namespace) 
  {
    for (key in changes) 
    {
      console.log("Found " + namespace + " updates to " + key +": " + changes[key].newValue)
      if (key == storageVarName)
      {
        UpdateStatus(changes[key].newValue);
        SetExtensionEnabled(changes[key].newValue);
      }
    }
  });

document.getElementById('enabledButton').addEventListener('click', EnableExtension);
document.getElementById('disabledButton').addEventListener('click', DisableExtension);
