#set ($sitevisionUtils = $request.getAttribute("sitevision.utils"))
#set ($currentPageNode = $sitevisionUtils.getPortletContextUtil().getCurrentPage())  
#set ($header = $sitevisionUtils.propertyUtil.getString($currentPageNode,"rubrik"))  
#set ($pageTitle = $sitevisionUtils.propertyUtil.getString($currentPageNode,"title"))
#set ($articleTitle = $sitevisionUtils.propertyUtil.getString($currentPageNode,"articleName"))
#set ($siteName = $sitevisionUtils.propertyUtil.getString($currentPageNode,"sitenamn")) 
#set ($url = $sitevisionUtils.propertyUtil.getString($currentPageNode,"URI")) 
#set ($url = "http://www.orebro.se$url") 
#set ($imageNode = $sitevisionUtils.propertyUtil.getNode($currentPageNode, "header-icon"))
#if ($imageNode &&  $sitevisionUtils.getNodeTypeUtil().isImage($imageNode))
    #set ($image = $sitevisionUtils.propertyUtil.getString($imageNode, "URI"))
    #set ($image = "http://www.orebro.se$image")    
#end
##
## Titel
#if ($header && $header != '')  	
   #set ($title = "$header - $siteName")
#elseif ($articleTitle)  	
   #set ($title = $articleTitle) 
#elseif ($pageTitle && $pageTitle != '')  	
	#set ($title = $pageTitle)
#else 	
  #set ($title = $sitevisionUtils.propertyUtil.getString($currentPageNode,"displayName"))  
#end   
##
## Description hämtas från metadatat description eller ingress
#set ($ingress = $sitevisionUtils.propertyUtil.getString($currentPageNode,"ingress"))  
#set ($description = $sitevisionUtils.propertyUtil.getString($currentPageNode,"description"))  
#if ($description && $description != '')  	
   #set ($metaDescription = $description)
#elseif ($ingress && $ingress != '')  	
   #set ($metaDescription = $ingress)
#end
##   
#if ($metaDescription)
      <meta name="description" content="$metaDescription">
#end
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta property="og:title" content="$title">
      <meta property="og:type" content="website">
      <meta property="og:url" content="$url">
      <meta property="og:image" content="$image">     
      <meta property="og:description" content="$metaDescription">
