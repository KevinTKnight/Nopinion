
var storageVarName = 'NOpinionEnabled';
var reloadQualifications = "polygon";

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
    if (chrome.runtime.lastError !== undefined)
    {
      //one time, set the initial value
      chrome.storage.sync.set({'NOpinionEnabled': true}, 
        function() 
        {
          // Notify that we saved.
          console.log("Enabled settings saved");
        });
    }
    
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
      if (key == storageVarName)
      {
        UpdateStatus(changes[key].newValue);
        SetExtensionEnabled(changes[key].newValue);


          //I feel like just chrome.tabs.reload should work fine but w/e
          chrome.tabs.query(
            {active: true, currentWindow: true}, 
            function(tabs) 
            {
              //should only be checking one tab
              if (tabs[0].url.includes(reloadQualifications))
              {
                chrome.tabs.reload(tabs[0].id);
              }
            });
      }
    }
  });

document.getElementById('enabledButton').addEventListener('click', EnableExtension);
document.getElementById('disabledButton').addEventListener('click', DisableExtension);
