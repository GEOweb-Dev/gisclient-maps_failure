OpenLayers.Renderer.symbol.lightning = [0, 0, 4, 2, 6, 0, 10, 5, 6, 3, 4, 5, 0, 0];

var valvoleStyle = valvoleStyle();
valvoleStyle.addRules([
	new OpenLayers.Rule({
		filter: new OpenLayers.Filter.Comparison({
			type: OpenLayers.Filter.Comparison.EQUAL_TO,
			property: "simbolo",
			value: "barr"
		}),
		symbolizer: {
			strokeColor: "#000000",//verdino
			strokeOpacity: 1,
			strokeWidth: 4,
			strokeLinecap: "round",
			strokeDashstyle: "solid", 
			pointRadius: 10,
			pointerEvents: "visiblePainted",
			cursor: "inherit",
			graphicName: "lightning"
		}//aggiungere i simboli degli elementi che mancano
	})
]);
var styleMap = new OpenLayers.StyleMap({
	'default' : valvoleStyle,
	'defaultvv': {
		fill: false,
		fillColor: "#00ff00",
		hoverFillColor: "white",
		hoverFillOpacity: 0.8,
		strokeColor: "#00FF00",
		strokeOpacity: 1,
		strokeWidth: 4,
		strokeLinecap: "round",
		strokeDashstyle: "solid",
		hoverStrokeColor: "red",
		hoverStrokeOpacity: 1,
		hoverStrokeWidth: 0.2,
		pointRadius: 6,
		hoverPointRadius: 1,
		hoverPointUnit: "%",
		pointerEvents: "visiblePainted",
		cursor: "inherit"
	},
	'select': {
		fill: true,
		fillColor: "yellow",
		fillOpacity: 0.4,
		hoverFillColor: "white",
		hoverFillOpacity: 0.8,
		strokeColor: "yellow",
		strokeOpacity: 1,
		strokeWidth: 4,
		strokeLinecap: "round",
		strokeDashstyle: "solid",
		hoverStrokeColor: "red",
		hoverStrokeOpacity: 1,
		hoverStrokeWidth: 0.2,
		pointRadius: 6,
		hoverPointRadius: 1,
		hoverPointUnit: "%",
		pointerEvents: "visiblePainted",
		cursor: "pointer"
	},
	'temporary': {
		fill: true,
		fillColor: "00ffff",
		fillOpacity: 0.2,
		hoverFillColor: "white",
		hoverFillOpacity: 0.8,
		strokeColor: "#00ffff",
		strokeOpacity: 1,
		strokeLinecap: "round",
		strokeWidth: 4,
		strokeDashstyle: "solid",
		hoverStrokeColor: "red",
		hoverStrokeOpacity: 1,
		hoverStrokeWidth: 0.2,
		pointRadius: 6,
		hoverPointRadius: 1,
		hoverPointUnit: "%",
		pointerEvents: "visiblePainted",
		cursor: "pointer"
	}
});

OpenLayers.GisClient.ClickFailure = OpenLayers.Class(OpenLayers.Control, {
	defaultHandlerOptions: {
		'single': true,
		'double': false,
		'pixelTolerance': 0,
		'stopSingle': false,
		'stopDouble': false
	},
	flag: false,
	initialize: function(options) {
		OpenLayers.Control.prototype.initialize.apply(this, [options]);
		this.handlerOptions = OpenLayers.Util.extend({}, this.defaultHandlerOptions);//this.handlerOptions || {};
		this.handler = new OpenLayers.Handler.Click(this, {'click': this.trigger}, this.handlerOptions);
	},
	setFlag: function(val) {
		this.flag = val;
	},
	trigger: function(e) {
		if(this.flag)
			clickete.barriera(e)
		else
			clickete.select(e);
	}
});

var clickFailure = new OpenLayers.GisClient.ClickFailure();

OpenLayers.Control.FailureSelect = OpenLayers.Class(OpenLayers.Control, {
	EVENT_TYPES: ["beforeSelect","afterSelect","selected"],
	type: OpenLayers.Control.TYPE_BUTTON,
	clearOnDeactivate: false,
	distance:5,
	serviceURL:null,
	exportURL:null,
	include:[],
	exclude:[],
	selectControl:null,
	highlightCtrl:null,
	selectedObjectId: null,
	selectedBranch: null,
	selectedOtherId: null,
	selectionSymbolizer: {
		'Polygon': {strokeColor: '#FF0000'},
		'Line': {strokeColor: '#FF0000', strokeWidth: 2},
		'Point': {fill:false, graphicName: 'circle', strokeColor: '#FF0000', pointRadius: 5}
	},
	handlerOptions: null,
	defaultHandlerOptions: {
		'single': true,
		'double': false,
		'pixelTolerance': 0,
		'stopSingle': false,
		'stopDouble': false
	},
	loadingControl: null,
	message: "",
	toolbar: null,
	resultFeatures: null,
	//----------
	getMessage: function() {
		return this.message;
	},
	setMessage: function(val) {
		this.message = val;
		this.toolbar.redraw();
	},
	initialize: function(options) {
		OpenLayers.Control.prototype.initialize.apply(this, [options]);
		this.loadingControl = this.map.getControlsByClass('OpenLayers.Control.LoadingPanel');
		this.loadingControl = this.loadingControl[0];
	},
	destroy: function() {
		OpenLayers.Control.prototype.destroy.apply(this, arguments);
	},
	barriera: function(geometry) {
		var v = null;
		var call = true;
		if (!(geometry instanceof OpenLayers.Geometry)) {
			var resultLayer = this.getResultLayer();
			if (resultLayer) {
				if (resultLayer.features.length > 0) {
					if(this.selectedBranch==null && this.selectedOtherId==null) {
						window.alert("E' necessario che un elemento sia selezionato per poter procedere all'inserimento della barriera.");
						return;
					} else {
						var point = this.map.getLonLatFromPixel(geometry.xy);
						geometry = new OpenLayers.Geometry.Point(point.lon, point.lat);
						if(this.selectedBranch!=null) {
							var arr = this.selectedBranch.geometry.components;
							v = (geometry.distanceTo(arr[0])<geometry.distanceTo(arr[arr.length-1])) ? arr[0] : arr[arr.length-1];
						} else { 
							vv = this.selectedOtherId;
							var s = this.include.indexOf(vv);
							if(!confirm('Si intende '+(s<0 ? "inserire" : "rimuovere")+' la barriera '+(s<0 ? "dal" : "nel")+' grafo?'))
								return;
							this.include.splice(s, 1);
						}
					}
				} else {
					window.alert("Per inserire una barriera è necessario prima produrre un grafico")
					return;
				}
			} else {
				window.alert("Per inserire una barriera è necessario prima produrre un grafico");
				return;
			}
		} else {
			console.log("Ho selezionato una geometria");
			return;
		}
		clickFailure.deactivate();
		this.loadingControl.maximizeControl();
		//CHIAMATA AL SERVER PER AVERE DATO IL PUNTO LA TRATTA DEL GRAFO E L'ELENCO DEGLI OGGETTI INTERESSATI
		var carmelo = this.selectedBranch;
		var options = {
			url: this.serviceURL,
			params: {
				distance:this.distance,//presente
				srs:this.map.projection,//presente
				x:geometry.x,//presente
				y:geometry.y,//presente
				exclude:this.exclude,//presente
				include:this.include,
				domain: clientConfig.PLUGINS_CONFIG["domain_Failure"],
				barN: (v==null ? null : [v.x, v.y])
			},
			success: function(request) {
				clickFailure.activate();
				this.loadingControl.minimizeControl();
				this.loadResult(request, carmelo);
			},
			failure:function(){
				clickFailure.activate();
				this.loadingControl.minimizeControl();
				window.alert('Si è verificato un errore durante la generazione del grafo.');
			},
			scope: this
		};
		OpenLayers.Request.GET(options);
	},
	//seleziona una geometria... e non lo fai se c'è una popup aperta
	select: function(geometry) {
		var v = null;
		var call = true;
		if (!(geometry instanceof OpenLayers.Geometry)) {
			var resultLayer = this.getResultLayer();
			if (resultLayer) {
				if (resultLayer.features.length > 0) {
					if(this.selectedObjectId==null) {
						if (!confirm('Effettuare una nuova ricerca?'))
							return;
						else {
							resultLayer.removeAllFeatures();
							this.exclude = [];
							this.include = [];
							this.resultFeatures = [];
						}
					} else {
						v = this.selectedObjectId.split('.');
						var s = this.exclude.indexOf(v[1]);
						if(!confirm('Si intende '+(s<0 ? "escludere" : "includere")+' il nodo '+(s<0 ? "dal" : "nel")+' grafo?'))
							return;
						if(s<0)
							this.exclude.push(v[1]);
						else
							this.exclude.splice(s, 1);
						call = (s<0);
					}
				}
			}
			var point = this.map.getLonLatFromPixel(geometry.xy);// : this.map.get;
			geometry = new OpenLayers.Geometry.Point(point.lon, point.lat);
		} else {
			console.log("Ho selezionato una geometria");
			return;
		}
		clickFailure.deactivate();
		this.loadingControl.maximizeControl();
		if(call) {
			//CHIAMATA AL SERVER PER AVERE DATO IL PUNTO LA TRATTA DEL GRAFO E L'ELENCO DEGLI OGGETTI INTERESSATI
			var carmelo = this.selectedObjectId;
			var options = {
				url: this.serviceURL,
				params: {
					distance:this.distance,//presente
					srs:this.map.projection,//presente
					x:geometry.x,//presente
					y:geometry.y,//presente
					exclude:this.exclude,//presente
					include:this.include,
					domain: clientConfig.PLUGINS_CONFIG["domain_Failure"]
				},
				success: function(request) {
					clickFailure.activate();
					this.loadingControl.minimizeControl();
					this.loadResult(request, carmelo);
				},
				failure:function(){
					clickFailure.activate();
					this.loadingControl.minimizeControl();
					window.alert('Si è verificato un errore durante la generazione del grafo.');
				},
				scope: this
			};
			OpenLayers.Request.GET(options);
		} else {
			var resultLayer = this.getResultLayer();
			var arr = this.ricalcolaRimuovendo(this.selectedObjectId, resultLayer.features, false);
			resultLayer.removeFeatures(arr);
			clickFailure.activate();
			this.loadingControl.minimizeControl();
		}
	},
	ricalcolaRimuovendo: function(selObj, features, remove) {
		var arr = [];
		var index = 0;
		for(index in features) {
			if(features[index].attributes['parentObject']==selObj && selObj!==null) {
				//discrimina sul tipo
				var v = features[index].fid.split(".");
				if((v[0]!=clientConfig.PLUGINS_CONFIG["reteLabel_Failure"]) && (v[0]!=clientConfig.PLUGINS_CONFIG["terminaleLabel_Failure"])) //roba manovrabile
					arr = arr.concat(this.ricalcolaRimuovendo(features[index].fid, features, true));
				arr.push(features[index]);
			} else if(features[index].fid==selObj) {
				features[index].attributes["escluso"] = 0;
				if(remove) {
					arr.push(features[index]);
					sal = features[index].fid.split('.');
					for(keyFeature in this.resultFeatures) {
						ff = false;
						if (sal[0]==keyFeature){
							for(obj in this.resultFeatures[keyFeature].features.features)
								if(this.resultFeatures[keyFeature].features.features[obj].id == features[index].fid) {
									this.resultFeatures[keyFeature].features.features.splice(this.resultFeatures[keyFeature].features.features[obj], 1);
									ff = true;
									break;
								}
						}
						if(ff)
							break;
					}
					var s = this.exclude.indexOf(sal[1]);
					if(s>=0)
						this.exclude.splice(s, 1);
				}
			}
		}
		return arr;
	},
	//renderizza il risultato della mia richiesta a findFailure
	loadResult: function(request, selObj){
		var formatJson = new OpenLayers.Format.JSON();
		var formatGeoJson = new OpenLayers.Format.GeoJSON();
		doc = request.responseText;
		if(!doc){
			window.alert("Nessun oggetto trovato.");
			return;
		} else 
			this.setMessage("");
		var result = formatJson.read(doc);
		var extent = result.features_extent;
		this.resultFeatures = result;
		var resultLayer = this.getResultLayer();
		var aux = [];
		this.include = [];
		for (key in result) {
			if(result[key].features) {
				var arr = formatGeoJson.read(result[key].features);
				for(currArr in arr) {
					if(key!='altro') {
						if(resultLayer.getFeatureByFid(arr[currArr].fid)) {
							//OGGETTO C'E' GIA' -> devo recuperare da lui le informazioni di parentObject e level
							var objPresent = resultLayer.getFeatureByFid(arr[currArr].fid);
							arr[currArr].attributes['parentObject'] = objPresent.attributes['parentObject'];
							arr[currArr].attributes['level'] = objPresent.attributes['level'];
						} else {
							//OGGETTO NON C'E'
							arr[currArr].attributes['parentObject'] = selObj;
							arr[currArr].attributes['level'] = (selObj==null ? 1 : (resultLayer.getFeatureByFid(selObj).attributes['level'] + 1));
						}
					} else {
						var t = arr[currArr].fid.split(".");
						this.include.push(t[1]);
					}
					aux.push(arr[currArr]);
				}
			}
		}
		resultLayer.removeAllFeatures();
		resultLayer.addFeatures(aux);
		this.map.zoomToExtent(new OpenLayers.Bounds.fromArray(extent));
	},
	//restituisce il layer su cui dobbiamo andare a disegnare il nostro grafo...
	getResultLayer:function() {
		var resultLayer = this.map.getLayer('gc_pipe_vector_layer');
		//questo è il layer che viene utilizzato... devo cambiarlo?
		if(!resultLayer) {
			resultLayer = new OpenLayers.Layer.Vector('Ricerca' ,{
				styleMap: styleMap
			});
			resultLayer.id = 'gc_pipe_vector_layer';//questo è il layer che viene utilizzato...
			this.map.addLayer(resultLayer);
			var self = this;
			this.highlightCtrl = new OpenLayers.Control.SelectFeature(resultLayer, {
				hover: true,
				highlightOnly: false,
				renderIntent: "temporary",
				eventListeners: {
					featurehighlighted: function(e) { self.fillDiv(e); },
					featureunhighlighted: function(e) { self.emptyDiv(e);}//,//this.removePopup
				},	
				//clickFeature: function(e) { self.select(e.geometry); },
				scope: self
			});
			this.map.addControl(this.highlightCtrl);
			this.events.register('activate', this, function(e) {
				//console.log("Attivato");
				this.highlightCtrl.activate();
			});
			this.events.register('deactivate', this, function(e){
				console.log("Disattivato");
				this.highlightCtrl.deactivate();
				this.emptyDiv();
			});
			this.highlightCtrl.activate();
		}
		return resultLayer;
	},
	distruggi: function(e) {
		if(this.clearOnDeactivate) {
			var resultLayer = this.map.getLayer('gc_pipe_vector_layer'); //questo è il layer che viene utilizzato
			if (resultLayer) {
				resultLayer.removeAllFeatures();
				this.include = [];
				this.exclude = [];
				this.resultFeatures = [];
			}
		}
	},
	emptyDiv: function(e) {
		this.selectedObjectId = null;
		this.selectedBranch = null;
		this.setMessage("");  
		this.toolbar.redraw();
	},
	fillDiv: function(e) {
		var attributes = e.feature.attributes;
		var feature = e.feature;
		var v = e.feature.fid.split('.');
		var featureType = this.resultFeatures[v[0]]["featureType"];
		var popupInfo = "<div><h3><u>"+ featureType.title+ "</u></h3></div><br>";
		var property;
		for (key in featureType.properties) {
			property = featureType.properties[key];
			propName = property.name.indexOf(".",0) == -1 ? 
				(property.name.indexOf("as cont", 0) == -1 ? property.name : property.name.substring(property.name.indexOf("as cont",0) + 3)) : 
				property.name.substring(property.name.indexOf(".",0)+1);
			var apn = (attributes[propName]!='') ? attributes[propName] : "-";
			popupInfo += "<div style='margin-left: 10px; margin-right: 10px; text-align: left;'><b>" + property.fieldHeader + ":</b>&nbsp;" + apn + "</div>";
		}
		this.setMessage(popupInfo);
		//20210222 MZ -> rimuovo la centrale IREN e la stazione di pompaggio per escluderle dai conti
		if((v[0]!=clientConfig.PLUGINS_CONFIG["reteLabel_Failure"]) && (v[0]!=clientConfig.PLUGINS_CONFIG["terminaleLabel_Failure"]) && (v[0]!='altro')) {
			this.selectedObjectId = e.feature.fid;
			this.selectedBranch = null;
			this.selectedOtherId = null;
			this.toolbar.redraw();
		} else {
			if(v[0]==clientConfig.PLUGINS_CONFIG["reteLabel_Failure"]) {
				this.selectedBranch = e.feature;
				this.selectedOtherId = null
			} else if(v[0]=='altro') {
				this.selectedBranch = null;
				this.selectedOtherId = v[1];
			}
			this.selectedObjectId = null;
			this.toolbar.redraw();
		}
	},
	export: function(index, text) {
		clickFailure.deactivate();
		this.loadingControl.maximizeControl();
		if(index==0) {
			window.alert("E' necessario specificare un corretto tipo di report per procedere.");
			clickFailure.activate();
			this.loadingControl.minimizeControl();
		} else {
			var jsonIn = jsonInput(this.resultFeatures, index);
			var self = this;
			$.ajax({
				type: "POST",
				url: self.exportURL,
				data: {"var": JSON.stringify(jsonIn), "operation" : index},
			}).done(function (res) {
				const a = document.createElement('a');
				a.style = 'display: none';
				document.body.appendChild(a);
				const blob = new Blob([res], {type: 'octet/stream'});
				const url = URL.createObjectURL(blob);
				a.href = url;
				a.download = 'output_'+text+'_'+(new Date().getTime())+'.csv';
				a.click();
				URL.revokeObjectURL(url);
				clickFailure.activate();
				self.loadingControl.minimizeControl();
			}).fail(function (err) {
				alert("ERRORE: " + err);
				clickFailure.activate();
				self.loadingControl.minimizeControl();
			});
		}
	},
	CLASS_NAME: "OpenLayers.Control.FailureSelect"
});



var clickete = null;
var omCtrl = null;
var reportCtrl = null;
var expandCtrl = null;
var flagCtrl = null;
OpenLayers.GisClient.FailureToolbar = OpenLayers.Class(OpenLayers.Control.Panel,{
	div: null,
	divbtns: null,
	map: null,
	initialize: function(options) {
		OpenLayers.Control.Panel.prototype.initialize.apply(this, [options]);
		dd = this.map;
		self = this;
		clickete = new OpenLayers.Control.FailureSelect({
			clearOnDeactivate:true,
			serviceURL:'/gisclient3/services/iren/findFailure.php',
			exportURL:'/gisclient3/services/iren/export'+clientConfig.PLUGINS_CONFIG["domain_Failure"]+'Failure.php',
			distance:50,
			highLight: true,
			map : dd,
			toolbar: self
		});
		flagCtrl = new OpenLayers.Control.Button({
			type: OpenLayers.Control.TYPE_TOGGLE,
			active: false,
			iconclass:"glyphicon-white glyphicon-flag",
			title:"Inserisci barriera",
			trigger: function() {
				if(this.active)
					this.deactivate();
				else
					this.activate();
			},
			activate: function() {
				OpenLayers.Control.Button.prototype.activate.call(this);
				GisClientMap.map.events.register("mousemove", GisClientMap.map, displayFlagCursor);
				GisClientMap.map.events.register("mouseout", GisClientMap.map, hideSearchCursor);
				if(GisClientMap.map.currentControl!=undefined)
					GisClientMap.map.currentControl.deactivate();
				GisClientMap.map.currentControl = flagCtrl;
				clickete.activate();
				this.map.addControl(clickFailure);
				clickFailure.setFlag(true);
				clickFailure.activate();
				this.active = true;
			},
			deactivate: function() {
				OpenLayers.Control.Button.prototype.deactivate.call(this);
				hideSearchCursor();
				GisClientMap.map.events.unregister("mousemove", GisClientMap.map, displayFlagCursor);
				GisClientMap.map.events.unregister("mouseout", GisClientMap.map, hideSearchCursor);
				//per fare quanto segue deve esserci un controller di default e soprattutto un currentControl già assegnato
				if(GisClientMap.map.defaultControl !== undefined && GisClientMap.map.currentControl !== undefined && 
					GisClientMap.map.currentControl != GisClientMap.map.defaultControl) {
					GisClientMap.map.currentControl = GisClientMap.map.defaultControl;
					GisClientMap.map.currentControl.activate();
					GisClientMap.map.currentControl.active = true;
					clickete.deactivate();
					clickFailure.deactivate();
					this.map.removeControl(clickFailure);
				}
				this.active = false;
			}
		});
		omCtrl = new OpenLayers.Control.Button({
			type: OpenLayers.Control.TYPE_TOGGLE,
			active: false,
			iconclass:"glyphicon-white glyphicon-search",
			title:"Seleziona tratte",
			trigger: function() {
				if(this.active)
					this.deactivate();
				else
					this.activate();
			},
			activate: function() {
				OpenLayers.Control.Button.prototype.activate.call(this);
				GisClientMap.map.events.register("mousemove", GisClientMap.map, displaySearchCursor);
				GisClientMap.map.events.register("mouseout", GisClientMap.map, hideSearchCursor);
				if(GisClientMap.map.currentControl!=undefined)
					GisClientMap.map.currentControl.deactivate();
				GisClientMap.map.currentControl = omCtrl;
				clickete.activate();
				this.map.addControl(clickFailure);
				clickFailure.setFlag(false);
				clickFailure.activate();
				this.active = true;
			},
			deactivate: function() {
				OpenLayers.Control.Button.prototype.deactivate.call(this);
				hideSearchCursor();
				GisClientMap.map.events.unregister("mousemove", GisClientMap.map, displaySearchCursor);
				GisClientMap.map.events.unregister("mouseout", GisClientMap.map, hideSearchCursor);
				//per fare quanto segue deve esserci un controller di default e soprattutto un currentControl già assegnato
				if(GisClientMap.map.defaultControl !== undefined && GisClientMap.map.currentControl !== undefined && 
					GisClientMap.map.currentControl != GisClientMap.map.defaultControl) {
					GisClientMap.map.currentControl = GisClientMap.map.defaultControl;
					GisClientMap.map.currentControl.activate();
					GisClientMap.map.currentControl.active = true;
					clickete.deactivate();
					clickFailure.deactivate();
					this.map.removeControl(clickFailure);
				}
				this.active = false;
			}
		});
		reportCtrl = new OpenLayers.Control.Button({
			type: OpenLayers.Control.TYPE_TOGGLE,
			active: true,
			iconclass:"glyphicon-white glyphicon-export",
			displayClass:"exportButton",
			title:"Produci report",
			activate: function() {
				OpenLayers.Control.Button.prototype.activate.call(this);
				clickete.export($('#reportList').val(), $('#reportList option:selected').text().toLowerCase());
				this.deactivate();
			},
			deactivate: function() {
				OpenLayers.Control.Button.prototype.deactivate.call(this);
			}
		});
		expandCtrl = new OpenLayers.Control.Button({
			type: OpenLayers.Control.TYPE_TOGGLE,
			active: false,
			iconclass:"glyphicon-white glyphicon-eject",
			displayClass:"expandButton",
			title: "Apri/Chiudi pannello",
			activate: function() {
				OpenLayers.Control.Button.prototype.activate.call(this);
				self.redraw();
			},
			deactivate: function() {
				OpenLayers.Control.Button.prototype.deactivate.call(this);
				self.redraw();
			}
		});
		this.addControls([omCtrl, flagCtrl, expandCtrl, reportCtrl]);
	},
	getInfoDiv: function() {
		var log = clickete.getMessage();
		if(log!="") {
			var span = document.createElement("div");
			span.style.textAlign = "center";
			span.innerHTML = "<font color=\"white\">"+log+"</font>";
			return span;
		}
		return undefined;
	},
	draw: function() {
		OpenLayers.Control.Panel.prototype.draw.apply(this);
		return this.div;
	},
	redraw: function() {
		OpenLayers.Control.Panel.prototype.redraw.apply(this);
		if(this.active) {
			this.div.style.display="block";
			this.div.appendChild(customReportDiv());
			var infoDiv = this.getInfoDiv();
			if(infoDiv!=undefined && expandCtrl.active)
				this.div.appendChild(infoDiv);
			this.div.style.height= ((infoDiv!=undefined && expandCtrl.active) ? "250px" : "30px");
			this.div.style.width = "325px";
			console.log("redraw");
		} else
			this.div.style.display="none";
	},
	activate: function() {
		activated = OpenLayers.Control.prototype.activate.call(this);
		omCtrl.activate();
		this.redraw();
		return true;
	},
	deactivate: function() {
		OpenLayers.Control.prototype.deactivate.call(this);
		omCtrl.deactivate();
		flagCtrl.deactivate();
		this.redraw();
		return true;
	}
});

function displaySearchCursor(e) {
	OpenLayers.Util.getElement("tooltip").innerHTML = "<img src=\"../../plugins/gisclient-maps_failure/resources/img/lente.png\" alt=\"Seleziona guasto\" width=\"25px\" height=\"25px\">";
	$("#tooltip").css({position:"absolute", left:e.x+10,top:e.y});
}

function displayFlagCursor(e) {
	OpenLayers.Util.getElement("tooltip").innerHTML = "<img src=\"../../plugins/gisclient-maps_failure/resources/img/flag.png\" alt=\"Gestione barriera\" width=\"25px\" height=\"35px\">";
	$("#tooltip").css({position:"absolute", left:e.x+10,top:e.y});
}

function hideSearchCursor(e) {
	OpenLayers.Util.getElement("tooltip").innerHTML = ""; 
	$("#tooltip").css({});
}

var cssId = 'myCss';
if (!document.getElementById(cssId)) {
	var head  = document.getElementsByTagName('head')[0];
	var link  = document.createElement('link');
	link.id   = cssId;
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.href = '"../../../../plugins/gisclient-maps_failure/resources/css/style.css';
	link.media = 'all';
	head.appendChild(link);
}

window.GCComponents["Controls"].addControl('control-pipeselect-commander', function(map) {
	return new OpenLayers.GisClient.FailureToolbar({
		gc_id: 'control-pipeselect-commander',
		map: map,
		createControlMarkup: customCreateControlMarkup,
		div: document.getElementById("map-toolbar-pipeselect-commander"),
		autoActivate: false
	});
});

// **** Toolbar button
window.GCComponents["SideToolbar.Buttons"].addButton (
	'button-FailureSelect',
  	'Ricerca guasti '+clientConfig.PLUGINS_CONFIG["domain_Failure"],
	'glyphicon-white glyphicon-tint',
	function() {
		if (sidebarPanel.handleEvent || typeof(sidebarPanel.handleEvent) === 'undefined') {
			var commander = this.map.getControlsBy('gc_id', 'control-pipeselect-commander')[0];
			if (commander.active) {
				if(commander.deactivate()) {
					clickete.distruggi();
					this.deactivate();
				}
			} else {
				if(commander.activate())
					this.activate();
			}
			if (typeof(sidebarPanel.handleEvent) !== 'undefined')
				sidebarPanel.handleEvent = false;
		}
	},{button_group: 'mtools'}
);

