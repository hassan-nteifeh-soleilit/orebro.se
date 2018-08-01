var link, link1, main, navContent, socialSection, menu;

if ($(".or-breadcrumbs-area")[0]){
	link = document.getElementsByClassName("or-breadcrumbs-area");
	link[0].setAttribute('aria-label', 'Sektion för länkstig');
}
if ($(".or-breadcrumbs")[0]){
	link1 = document.getElementsByClassName("or-breadcrumbs");
	link1[0].setAttribute('aria-label', 'Länkstig');
}
if ($(".or-article-main")[0]){
	main = document.getElementsByClassName("or-article-main");
	main[0].setAttribute('aria-label', 'Huvudsektion');
}
if ($(".or-nav-content-section")[0]){
	navContent = document.getElementsByClassName("or-nav-content-section");
	navContent[index].setAttribute('aria-label', 'Sekundärnavigering');
}
if ($(".or-social-section")[0]){
	socialSection = document.getElementsByClassName("or-social-section");
	socialSection[0].setAttribute('aria-label', 'Extralänkar');
}
if ($(".or-tree")[0]){
	menu = document.getElementsByClassName("or-tree");
	menu[0].setAttribute('aria-label', 'Huvudnavigation');
}