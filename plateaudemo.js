// bornes pour empecher la carte StamenWatercolor de "dériver" trop loin...
var northWest = L.latLng(90, -180);
var southEast = L.latLng(-90, 180);
var bornes = L.latLngBounds(northWest, southEast);
			
// Récupère les données du questionnaire selectionnées au hasard 
var myGeoJson;

var popup = L.popup();
var circle ;

//Liste des fichier json dans lesquelles sont mis les questionnaires
var Questionnaires  = ["http://localhost/web/Amerique.json","http://localhost/web/Afrique.json","http://localhost/web/Oceanie.json","http://localhost/web/Europe.json","http://localhost/web/Asie.json"];

//Liste des urls des fichier json dans lesquelles on à mis les coordonnées de chaque continents
var Continents = ["http://localhost/web/AmeriqueC.json","http://localhost/web/AfriqueC.json","http://localhost/web/OceanieC.json","http://localhost/web/EuropeC.json","http://localhost/web/AsieC.json"];		

var Reponse = [];
			
//recupère le continent en fonction du questionnaire selectionné
var Continent ;
//recupère le Questionnaire selectionné
var Questionnaire;	
var Ind_Ran  = parseInt((Math.random() * (4 - 0 + 1)), 10) + 0; 
			
var score=0;
var latrep=new Object();
var longrep=new Object();
var latans=new Object();
var longans=new Object();
var nom = new Object();
var desc = new Object();
var link =new Object();
var Question;
var draplist;	
var chances = 3;
var Answ;
var hidden = false; // Statut du bouton langue au chat


// Initialisation de la carte et association avec la div
var map = new L.Map('maMap', {
 	center:[39.74739, -105],
	minZoom: 2,
	maxZoom: 3,
	zoom: 2,
	maxBounds: bornes
});

// Initialisation de la couche StamenWatercolor
var Stamen_TonerBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
});

function SelectQuestionnaire () {
	var Ind_Ran  = parseInt((Math.random() * (4 - 0 + 1)), 10) + 0;
	Questionnaire = Questionnaires[Ind_Ran];
	Continent = Continents [Ind_Ran];
}

initMap();
			
$(document).ready(function() {
    $('#Langueaucchat').prop('disabled', true);
	SelectQuestionnaire ();
	initMap();
	$.getJSON(Continent, function(data) { addDataToMap(data, map); });
	$.getJSON(Questionnaire, function(data){
		myGeoJson = L.geoJson(data, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);
	});
	$.getJSON(Questionnaire, function(data){
		draplist = $('#draplist');
		$.each(data.features, function (key, val) {
			properties = val.properties;
			$('<img/>', {
				src:  properties.urldrapeau,
				id :  properties.code,
				click:   function( e ){
				    Question = jQuery(this).attr("id");
				    trouverCoor(); //Récupère les données du fichier json latitude, longitude, nom, description,le lien  
					$(this).off('click');
						// empêche au joueur de selectionné la même question
						//$("#draplist *").attr("disabled", "disabled").off('click'); 	
				}
			}).appendTo(draplist);
		});
	});
});


map.on('click', function(e) {
			
	zoomToFeature(e);
	alert(Question);
	alert(Answ);
	alert(chances);
			
	if(jQuery.isEmptyObject(Question)){ 
		alert('Veuillez sélectionner un drapeau et cliquer sur l endroit ou ce trouve se pays sur la carte'); 
	}
	else {
		if (Answ == Question ) {
			if (chances == 3 ) {
		 		score = score+10;
		 		alert('Félication vous avez gagné 10 points');
			}
			else if (chances == 2 ) {
			 	score = score+6;
			 	alert('Vous avez gagné 6 points');
			}
			else if (chances == 1) {
			 	score = score+3;
			 	alert('Vous avez gagné 6 points');
			}
			afficherReponse (1);
			chances = 3; // Remise des chances pour la question suivante
			alert('Bien joué, choisser une nouvelle question en cliquant sur le drapeau que vous souhaiter');
			if (Reponse.includes(Answ) == false) {
			 	Reponse.push(Question);
			 	Question = new Object();
			 	Answ =new Object();
			 	console.log(Reponse);	
			 			//$("#draplist *").attr("disabled", "disabled").on('click');  // Redonne la permission au joueur de cliquer sur les images (question)
			 	}
			 	if (Reponse.length == 5) {	
			 		$('#Langueaucchat').prop('disabled', true);				
					alert("vous avez terminer le questionnaire");
					alert(score);
				}
		}
		else{ // Si la question ne correspond pas à la réponse
		 	if (chances == 0) {
		 		alert ("vous avez échoué, passer à la question suivante");
		 		afficherReponse (1);
		 		if (Reponse.includes(Answ) == false) {
				 	Reponse.push(Question);
				 	Question = new Object();
			 		Answ =new Object();
			 		$('#Langueaucchat').prop('disabled', true);
			 		console.log(Reponse);
			 		chances = 3;
		 					//$("#draplist *").attr("disabled", "disabled").on('click'); 
		 		}
		 		if (Reponse.length == 5) {
					alert ("vous avez terminer le questionnaire");
					alert(score);
				}
		 	}else{
		 		alert("try again");
		 		alert("Vous êtes à " +calculDistanceEnKm(latrep,longrep,latans,longans)+" km du pays concerné");
		 		if (chances == 1){
				 			//affichage du boutton langue au chats
				 	alert('Vous pouvez cliquer sur le bouton je donne  ma langue au chat pour avoir un indice ')
				 	$('#Langueaucchat').prop('disabled', false);
				 	afficherReponse (0);	 			
				}
		 	}
		 	chances = chances-1;
		}
	}
});
		
function initMap(){
	map.eachLayer(function (layer) {
    	map.removeLayer(layer);
	});
	// Affichage de la carte
	map.addLayer(Stamen_TonerBackground);
}
		
		// function highlightLayer(layerID) {
		//     map._layers['name'+LayerID].setStyle(highlight);
		// }

function addDataToMap(data, map) {
	var dataLayer = L.geoJson(data);
	dataLayer.addTo(map);
}
		
// Juste pour changer la forme du curseur par défaut de la souris
document.getElementById('maMap').style.cursor = 'pointer'

function style(feature) {
	return {
		fillColor: "#FCB81E",
		weight: 2,
		opacity: 1,
		color: "#CCCCCC",
		fillOpacity: 0.7
	};
}

function onEachFeature(feature, layer) {
	layer.on({
		click: zoomToFeature,
	});
	layer.on('click', function(){
		Answ = feature.properties.code ;
		longans =  feature.properties.longp;
		latans =  feature.properties.latp;
		if (feature.properties.code == Question) {
			layer.setStyle({
		        weight: 2,
		        color: '#01094b',
		        fillColor: "#0b95e9",
		        dashArray: '',
		        fillOpacity: 0.7
		    });
		}			
	});
}

function afficherReponse (n){
			
	if (n == 1) {
		popup.setLatLng([latrep,longrep])
		.setContent("Pays:"+ nom + "Description :" + desc + "En savoir plus" + link)
		.openOn(map);
	}
	else{
		circle = L.circleMarker([latrep,longrep], {
			"radius": 80,
			"fillColor": "#012999",
			"color": "#012999",
			"weight": 1,
			"opacity": 1
		}).addTo(map);
		sleep(10000).then(() => { map.removeLayer(circle); }); // efface le cercle au bout de 10 seconde 	
	}
}

function trouverCoor () {
	$.getJSON(Questionnaire, function(data){
		$.each(data.features, function (key, val) { 
		    properties = val.properties;
		    if (properties.code == Question) {
		       	properties = val.properties;
				longrep = properties.longp;
				latrep= properties.latp;
				nom = properties.nom;
				desc = properties.description;
				link = properties.lienWiki ;
		    }		 
		});
	});
}
	
		// function clickOnMapItem(itemId) {
		//     var id = parseInt(itemId);
		//     //get target layer by it's id
		//     var layer = myGeoJson.getLayer(id);
		//     //fire event 'click' on target layer 
		//     layer.fireEvent('click');  
		// }
		
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

		/*function resetHighlight(e) {
                myGeoJson.resetStyle(e.target);
                info.update();
        }

        function highlightFeature(Layer) {	
            layer.setStyle({
                weight: 5,
                color: 'red',
                dashArray: '',
                fillOpacity: 0.7
       		 });
        }*/

function deg2rad(x){
  return Math.PI*x/180;
}
 
function calculDistanceEnKm(lat1, lng1, lat2, lng2) {
  var earth_radius = 6378137;   // Terre = sphère de 6378km de rayon
  var rlo1 = deg2rad(lng1);    // CONVERSION
  var rla1 = deg2rad(lat1);
  var rlo2 = deg2rad(lng2);
  var rla2 = deg2rad(lat2);
  var dlo = (rlo2 - rlo1) / 2;
  var dla = (rla2 - rla1) / 2;
  var a = (Math.sin(dla) * Math.sin(dla)) + Math.cos(rla1) * Math.cos(rla2) * (Math.sin(dlo) * Math.sin(dlo));
  var d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var km = Math.round((earth_radius * d)/1000 ,0);
  return km;
}