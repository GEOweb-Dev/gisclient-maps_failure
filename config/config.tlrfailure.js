clientConfig.CLIENT_COMPONENTS.push("gisclient-maps_failure:failureControl:3:mtools");
clientConfig.PLUGINS_CONFIG["domain_Failure"] = "TLR";
clientConfig.PLUGINS_CONFIG["reteLabel_Failure"] = "condotta";
clientConfig.PLUGINS_CONFIG["terminaleLabel_Failure"] = "sottostazione utenza";

function valvoleStyle() {
	valvoleStyle = new OpenLayers.Style();
	valvoleStyle.addRules([
		new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.EQUAL_TO,
				property: "escluso",
				value: 0
			}),
			symbolizer: {
				strokeColor: "#00FF00",//verdino
				strokeOpacity: 1,
				strokeWidth: 4,
				strokeLinecap: "round",
				strokeDashstyle: "solid", 
				pointRadius: 10,
				pointerEvents: "visiblePainted",
				cursor: "inherit",
			}}), 
		new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Comparison({
				type: OpenLayers.Filter.Comparison.EQUAL_TO,
				property: "simbolo",
				value: "su"
			}),
			symbolizer: {
				fillColor: "grey",
				strokeColor: "black",
				strokeOpacity: 1,
				strokeWidth: 4,
				strokeLinecap: "round",
				strokeDashstyle: "solid",
				pointRadius: 10,
				cursor: "inherit"
			}}),
		new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Logical({
				filters: [
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "escluso",
						value: 0
					}),
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.LIKE,
						property: "simbolo",
						value: "v."
					})],
				type: OpenLayers.Filter.Logical.AND}),
			symbolizer: {
				strokeColor: "blue",//verdino
				strokeOpacity: 1,
				strokeWidth: 4,
				strokeLinecap: "round",
				strokeDashstyle: "solid", 
				pointRadius: 10,
				pointerEvents: "visiblePainted",
				cursor: "inherit",
	      			graphicName: "x"
	    		}}),
		new OpenLayers.Rule({
	    		filter: new OpenLayers.Filter.Logical({
				filters: [
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "escluso",
						value: 1
					}),
					new OpenLayers.Filter.Comparison({
	          				type: OpenLayers.Filter.Comparison.LIKE,
						property: "simbolo",
						value: "v."
					})],
				type: OpenLayers.Filter.Logical.AND}),
			symbolizer: {
				strokeColor: "red",
				strokeOpacity: 1,
				strokeWidth: 4,
				strokeLinecap: "round",
				strokeDashstyle: "solid", 
				pointRadius: 10,
				pointerEvents: "visiblePainted",
				cursor: "inherit",
				graphicName: "x"
			}}),
		new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Logical({
				filters: [
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "escluso",
						value: 0
					}),
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.LIKE,
						property: "simbolo",
						value: "p."
					})],
				type: OpenLayers.Filter.Logical.AND}),
			symbolizer: {
				strokeColor: "blue",//verdino
				strokeOpacity: 1,
				strokeWidth: 4,
				strokeLinecap: "round",
				strokeDashstyle: "solid", 
				pointRadius: 10,
				pointerEvents: "visiblePainted",
				cursor: "inherit",
				graphicName: "square"
			}}),
		new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Logical({
				filters: [
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "escluso",
						value: 1
					}),
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.LIKE,
						property: "simbolo",
						value: "p."
					})],
				type: OpenLayers.Filter.Logical.AND}),
			symbolizer: {
				strokeColor: "red",//verdino
				strokeOpacity: 1,
				strokeWidth: 4,
				strokeLinecap: "round",
				strokeDashstyle: "solid", 
				pointRadius: 10,
				pointerEvents: "visiblePainted",
				cursor: "inherit",
				graphicName: "square"
			}
		}),
		new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Logical({
				filters: [
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "escluso",
						value: 0
					}),
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.LIKE,
						property: "simbolo",
						value: "c."
					})],
				type: OpenLayers.Filter.Logical.AND}),
			symbolizer: {
				strokeColor: "blue",//verdino
				strokeOpacity: 1,
				strokeWidth: 4,
				strokeLinecap: "round",
				strokeDashstyle: "solid", 
				pointRadius: 10,
				pointerEvents: "visiblePainted",
				cursor: "inherit",
				graphicName: "triangle"
			}
		}),
		new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Logical({
				filters: [
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "escluso",
						value: 1
					}),
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.LIKE,
						property: "simbolo",
						value: "c."
					})],
				type: OpenLayers.Filter.Logical.AND}),
			symbolizer: {
				strokeColor: "red",//verdino
				strokeOpacity: 1,
				strokeWidth: 4,
				strokeLinecap: "round",
				strokeDashstyle: "solid", 
				pointRadius: 10,
				pointerEvents: "visiblePainted",
				cursor: "inherit",
				graphicName: "triangle"
			}//aggiungere i simboli degli elementi che mancano
		}),
		new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Logical({
				filters: [
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "escluso",
						value: 0
					}),
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "simbolo",
						value: "sp"
					})],
				type: OpenLayers.Filter.Logical.AND}),
			symbolizer: {
				strokeColor: "#ff00ff",//verdino
				strokeOpacity: 1,
				strokeWidth: 4,
				strokeLinecap: "round",
				strokeDashstyle: "solid", 
				pointRadius: 10,
				pointerEvents: "visiblePainted",
				cursor: "inherit",
				graphicName: "star"
			}//aggiungere i simboli degli elementi che mancano  
		}),
		new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Logical({
				filters: [
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "escluso",
						value: 1
					}),
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "simbolo",
						value: "sp"
					})],
				type: OpenLayers.Filter.Logical.AND}),
			symbolizer: {
				strokeColor: "red",//verdino
				strokeOpacity: 1,
				strokeWidth: 4,
				strokeLinecap: "round",
				strokeDashstyle: "solid",
				pointRadius: 10,
				pointerEvents: "visiblePainted",
				cursor: "inherit",
				graphicName: "star"
			}//aggiungere i simboli degli elementi che mancano  
		}),
		new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Logical({
				filters: [
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "escluso",
						value: 0
					}),
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "simbolo",
						value: "iren"
					})],
				type: OpenLayers.Filter.Logical.AND}),
			symbolizer: {
				strokeColor: "#ff00ff",//verdino
				strokeOpacity: 1,
				strokeWidth: 4,
				strokeLinecap: "round",
				strokeDashstyle: "solid", 
				pointRadius: 10,
				pointerEvents: "visiblePainted",
				cursor: "inherit",
				graphicName: "cross"
			}//aggiungere i simboli degli elementi che mancano
		}),
		new OpenLayers.Rule({
			filter: new OpenLayers.Filter.Logical({
				filters: [
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "escluso",
						value: 1
					}),
					new OpenLayers.Filter.Comparison({
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "simbolo",
						value: "iren"
					})],
				type: OpenLayers.Filter.Logical.AND}),
			symbolizer: {
				strokeColor: "red",//verdino
				strokeOpacity: 1,
				strokeWidth: 4,
				strokeLinecap: "round",
				strokeDashstyle: "solid", 
				pointRadius: 10,
				pointerEvents: "visiblePainted",
				cursor: "inherit",
				graphicName: "cross"
			}//aggiungere i simboli degli elementi che mancano
		})
	]);
	return valvoleStyle;
}

function customReportDiv() {
    var span = document.createElement("div");
    span.style.float = "right";
    span.style.marginTop = "5px";
    span.style.marginRight = "5px";
    var rpList = document.createElement("select");
    rpList.id = "reportList";
    rpList.add(getOption("SELEZIONA REPORT",0));
    rpList.add(getOption("Condotte", 1));
    rpList.add(getOption("Componenti", 2));
    rpList.add(getOption("Sottostazioni", 3));
    span.innerHTML = rpList.outerHTML;
    return span;
}

function getOption(text,value) {
	option = document.createElement("option");
	option.text=text;
	option.value=value;
	return option;
}

function jsonInput(resultFeatures, index) {
	var jsonInput = [];
	for(keyFeature in resultFeatures) {
		if((index=="1" && keyFeature=='condotta') || 
			(index=="2" && (keyFeature.startsWith("valvola") || keyFeature.startsWith("camera") || keyFeature.startsWith("pozzetto") || keyFeature.startsWith("stazione") || keyFeature.startsWith("centrale"))) ||
			(index=="3" && keyFeature.startsWith("sottostazione"))) {
			for(obj in resultFeatures[keyFeature].features.features) {
				var pirulino = new Object();
				var aux = resultFeatures[keyFeature].features.features[obj];
				pirulino.tipo = keyFeature;
				pirulino.id = aux.id;
				for(key in aux.properties) {
					if(key!='escluso' && key!='simbolo')
						pirulino[key] = aux.properties[key];
				}
				jsonInput.push(pirulino);
			}
		}
	}
	return jsonInput;
}
