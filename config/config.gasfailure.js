clientConfig.PLUGINS_CONFIG["failure"] = {
	pluginLayers: ['g_in_esercizio.etichette_tratte'],
	pluginDOMElements: [
		{
			type:'div',
            		id: 'map-toolbar-pipeselect-commander',
			parent: 'map-toolbars',
			class: ['olToolbarsControl']
        	}
	],
	pluginComponents: ['gisclient-maps_failure:failureControl:3:mtools'],
	pluginClientConfig: {
		DOMAIN_FAILURE : 'Gas',
		RETELABEL_FAILURE : ["condotta"],
		TERMINALELABEL_FAILURE : ["utenza","riduttore utenza"]
	}
}

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
				type: OpenLayers.Filter.Comparison.LIKE,
				property: "simbolo",
				value: "u."
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
						type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "simbolo",
						value: "v"
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
	          				type: OpenLayers.Filter.Comparison.EQUAL_TO,
						property: "simbolo",
						value: "v"
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
		//---
		//---
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
						value: "ce"
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
						value: "ce"
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
	return jsonInput;
}
