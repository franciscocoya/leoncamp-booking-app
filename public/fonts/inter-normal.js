﻿import { jsPDF } from "jspdf"
var callAddFont = function () {
this.addFileToVFS('inter-normal.ttf', font);
this.addFont('inter-normal.ttf', 'inter', 'normal');
};
jsPDF.API.events.push(['addFonts', callAddFont])