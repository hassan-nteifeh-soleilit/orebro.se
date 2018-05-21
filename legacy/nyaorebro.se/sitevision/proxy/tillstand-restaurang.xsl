<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:proxy="java:senselogic.sitevision.portlet.proxy.web.ProxyFunctions"
                extension-element-prefixes="proxy">

   <xsl:import href="template.xsl"></xsl:import>
   <xsl:template match="/">
  		<div class="or-tillstand-restaurang">
  			<xsl:apply-templates/>
  		</div>
      	<script type="text/javascript">
//			$(".joblist").addClass( "sv-text-portlet" );
//        	$(".jobsTableClass").addClass("sv-standard sv-responsiveTable sv-responsiveTable--stacked sv-responsiveTable--stackColumns");
//			$( ".or-lediga-jobb style:nth-child(2)" ).remove();
		</script>
	</xsl:template> 
</xsl:stylesheet>