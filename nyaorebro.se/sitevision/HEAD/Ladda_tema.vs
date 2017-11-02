#set ($sitevisionUtils= $request.getAttribute('sitevision.utils'))
#set ($portletContextUtil = $sitevisionUtils.portletContextUtil)
#set ($propertyUtil = $sitevisionUtils.propertyUtil)
#set($currentPage = $portletContextUtil.getCurrentPage())
#set($theme = $propertyUtil.getString($currentPage,"colorschema","default"))
## Mappa färgschema till valt alternativ (lägg till efter behov)
#if ($theme eq "Blue")
  #set ($cssPath = "18.639484fa14f307c14ae591e/Blue.css")   
#elseif ($theme eq "Red")   
  #set ($cssPath = "18.3ea82f1c1507495b49b5581/red.css")      
#elseif ($theme eq "Pink")
  #set ($cssPath = "18.639484fa14f307c14ae5656/pink.css")      
#elseif ($theme eq "Green") 
    #set ($cssPath = "18.639484fa14f307c14ae5680/green.css")        
#elseif ($theme eq "Orange")  
    #set ($cssPath = "18.639484fa14f307c14ae567f/orange.css")   
#elseif ($theme eq "Black")  
    #set ($cssPath = "18.639484fa14f307c14ae5174/black.css")   
#elseif ($theme eq "Yellow")  
    #set ($cssPath = "18.639484fa14f307c14ae5172/yellow.css")   
#elseif ($theme eq "Grey")  
    #set ($cssPath = "18.639484fa14f307c14ae5178/grey.css")           
#else
  #set ($cssPath = "18.639484fa14f307c14ae5680/green.css")   
#end
<link rel="stylesheet" type="text/css" media="screen,projection" href="/download/$cssPath" />