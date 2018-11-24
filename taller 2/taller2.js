// JavaScript Document
function addNew(autor,contenido,link,fecha){
	"use strict";
	console.log(link);
	var author = $("<h5/>", {
	"class": "card-title",
	html: autor+" dijo: "
	});

	var cont = $("<p/>", {
	"class": "card-text",
	html: contenido
	});

	var url=$("<a/>",{
		"href":link,
		html: "https://twitter.com/"+link.split("/").pop(),
		"class": "card-text"
	});
	
	
	var date=$("<p/>",{
		"class":"text-right",
		html:fecha	
	});
	
	var divtext = $("<div/>", {
		"class": "col-10 col-md-11"
	});
	
	var divimg=$("<div/>",{
		"class": "col-2 col-md-1",
		html:$("<img/>",{
			"class":"img-fluid",
			"src":"http://icons-for-free.com/free-icons/png/512/174528.png"
		})
	});
	
	var div=$("<div/>",{
		"class":"card-body shadow row"
	});
	
	author.appendTo(divtext);
	cont.appendTo(divtext);
	url.appendTo(divtext);
	date.appendTo(divtext);
	divimg.appendTo(div);
	divtext.appendTo(div);
	div.appendTo("#tweets");
}

function cargarXML(buscado){
	
	$.ajax({
		type: "GET",
		url: "https://twitrss.me/twitter_search_to_rss/?term="+buscado,
		dataType:"xml",
		success:function(xml){
			$(xml).find('item').each(function(){
				var autor = $(this).find('dc\\:creator').text().slice(2,-1);
				var descripcion=$(this).find('description').text();
				var url=$(this).find('link').text();
				var fecha=$(this).find('pubDate').text().slice(0,-6);
				addNew(autor,descripcion,url,fecha);
			});
		},
		error:function(){
			alert("Ha ocurrido un error al cargar el contenido");	
		}
	});
}

function showTweets(){
	var elm = document.getElementById("tweets");
	while (elm.hasChildNodes()) {
  		elm.removeChild(elm.lastChild);
	}
	var buscado=$("#buscador").val();
	if(buscado.length>0){
		$("#textobuscado").text("Resultados de la Busqueda para: "+buscado);
		cargarXML(buscado);
	}
	else{
		$("#textobuscado").text("Resultados de la Busqueda");
	}
}

$(document).ready(function(){
	$(".btn").click(function(e){
		e.preventDefault();
		showTweets();
	});
});