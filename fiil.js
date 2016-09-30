Array.prototype.contains = function (obj) {
  return this.indexOf(obj) > -1;
};

String.prototype.contains = function (it) {
  return this.indexOf(it) != -1;
};

var gorGecZam = ["dı", "di", "du", "dü", "tı", "ti", "tu", "tü"];
var ogrGecZam = ["mış", "miş", "muş", "müş"];
var simZam = ["ıyor", "iyor", "uyor", "üyor"];
var gelZam = ["ecek", "acak"];
var genZam = ["ır", "ir", "ur", "ür", "ar", "er"];

var gerKip = ["malı", "meli"];
var dilKip = ["sa", "se"];
var istKip = ["e", "a"];
var emrKip = [];

var haber = { gorGecZam, ogrGecZam, simZam, gelZam, genZam };
var dilek = { gerKip, dilKip, istKip, emrKip };

var ek = { haber, dilek };

var sesliHarf = ["a", "e", "ı", "i", "o", "ö", "u", "ü"];

function lastSesliHarf(fiil) {
  var i = 1;
  while (!sesliHarf.contains(fiil[fiil.length - i])) {
    i++;
  }
  return fiil[fiil.length - i];
}

function lastHarf(fiil) {
  if (sesliHarf.contains(fiil[fiil.length - 1])) {
    return fiil[fiil.length - 1];
  } else {
    return false;
  }
}

function lastHarfPlain(fiil) {
  return fiil[fiil.length - 1];
}

function multipleCheck(inst, arr) {
  return arr.contains(inst);
}


function fiilCek(fiil, cekimEki) {
  if (ek.haber[cekimEki] != undefined) {
    let lsh = lastSesliHarf(fiil);
    switch (cekimEki) {
    case "gorGecZam":
      /*
      indicate the ogrGecZam addition
      by the last vwl letter in word being
      a-ı => dı-tı
      e-i => di-ti
      o-u => du-tu
      ö-ü => dü-tü
      --
      use -t(x) mode instead -d(x) when
      the last letter of the verb is
      hard unvwl (p,ç,t,k)
      */
      let isHard;
      if (!sesliHarf.contains(lastHarfPlain(fiil))) {
        if (multipleCheck(lastHarfPlain(fiil), ["p", "ç", "t", "k", "ş"])) {
          isHard = true;
        } else {
          isHard = false;
        }
      }
      if (multipleCheck(lsh, ["a", "ı"])) {
        return fiil + ek.haber[cekimEki][!isHard ? 0 : 4];
      } else if (multipleCheck(lsh, ["e", "i"])) {
        return fiil + ek.haber[cekimEki][!isHard ? 1 : 5];
      } else if (multipleCheck(lsh, ["o", "u"])) {
        return fiil + ek.haber[cekimEki][!isHard ? 2 : 6];
      } else if (multipleCheck(lsh, ["ö", "ü"])) {
        return fiil + ek.haber[cekimEki][!isHard ? 3 : 7];
      }

    case "ogrGecZam":
      /*
      indicate the ogrGecZam addition
      by the last vwl letter in word being
      a-ı => mış
      e-i => miş
      o-u => muş
      ö-ü => müş
      */
      if (multipleCheck(lsh, ["a", "ı"])) {
        return fiil + ek.haber[cekimEki][0];
      } else if (multipleCheck(lsh, ["e", "i"])) {
        return fiil + ek.haber[cekimEki][1];
      } else if (multipleCheck(lsh, ["o", "u"])) {
        return fiil + ek.haber[cekimEki][2];
      } else if (multipleCheck(lsh, ["ö", "ü"])) {
        return fiil + ek.haber[cekimEki][3];
      }
    case "simZam":
      /*
      indicate the simZam addition
      by the last vwl letter in word being
      a-ı => ıyor
      e-i => iyor
      o-u => uyor
      ö-ü => üyor
      -- var simZam = ["ıyor", "iyor", "uyor", "üyor"];
      - special: -t, ye
      */
      if (sesliHarf.contains(lastHarf(fiil))) {
        fiil = fiil.substring(0, fiil.length - 1);
      }

      if (lastHarfPlain(fiil) == "t" && sesliHarf.contains(fiil[fiil.length - 2])) {
        fiil = fiil.substring(0, fiil.length - 1) + "d";
      }
      if (fiil == "y") {
        return "yiyor";
      } else {
        lsh = lastSesliHarf(fiil);
        if (multipleCheck(lsh, ["a", "ı"])) {
          return fiil + ek.haber[cekimEki][0];
        } else if (multipleCheck(lsh, ["e", "i"])) {
          return fiil + ek.haber[cekimEki][1];
        } else if (multipleCheck(lsh, ["o", "u"])) {
          return fiil + ek.haber[cekimEki][2];
        } else if (multipleCheck(lsh, ["ö", "ü"])) {
          return fiil + ek.haber[cekimEki][3];
        }
      }

    case "gelZam":
      /*
      indicate the gelZam addition
      by the last vwl letter in word being
      a-ı-o-u => acak
      e-i-ö-ü => ecek
      --
      - special: -t, ye
      */
      if (lastHarfPlain(fiil) == "t" && sesliHarf.contains(fiil[fiil.length - 2])) {
        fiil = fiil.substring(0, fiil.length - 1) + "d";
      }
      if (fiil == "ye") { fiil = "yi"; }
      if (sesliHarf.contains(lastHarf(fiil))) {
        fiil = fiil + "y";
      }
      if (multipleCheck(lsh, ["e", "i", "ö", "ü"])) {
        return fiil + ek.haber[cekimEki][0];
      } else {
        return fiil + ek.haber[cekimEki][1];
      }

    case "genZam":
      /*
      **BUGGY**
      indicate the gelZam addition
      by the last vwl letter in word being
      a - ar
      --
      - special: -t, kullan
      - also: add "y" to the verbs ends with a vwl letter
      before adding addition.
      */
      if (fiil == "kullan") { return "kullanır"; }
      if (lastHarf(fiil) == lastSesliHarf(fiil)) {
        return fiil + "r";
      }
      if (lastHarfPlain(fiil) == "t" && sesliHarf.contains(fiil[fiil.length - 2])) {
        fiil = fiil.substring(0, fiil.length - 1) + "d";
      }
      if (lsh == "a" || lsh == "ı") {
        return fiil + ek.haber[cekimEki][4] + "(*)";
      } else if (lsh == "e" || lsh == "i") {
        return fiil + ek.haber[cekimEki][5] + "(*)";
      } else if (lsh == "ö" || lsh == "ü") {
        return fiil + ek.haber[cekimEki][3] + "(*)";
      } else if (lsh == "o" || lsh == "u") {
        return fiil + ek.haber[cekimEki][2] + "(*)";
      }

    } //Switch
    // Haber
  } else if (ek.dilek[cekimEki] != undefined) {
    let lsh = lastSesliHarf(fiil);
    switch (cekimEki) {
    case "gerKip":
      /*
      indicate the gerKip addition
      by the last vwl letter in word being
      a, ı, o, u - malı
      e, i, ö, ü - meli
      --
      */
      if (multipleCheck(lsh, ["e", "i", "ö", "ü"])) {
        return fiil + ek.dilek[cekimEki][1];
      } else {
        return fiil + ek.dilek[cekimEki][0];
      }

    case "dilKip":
      /*
      indicate the gerKip addition
      by the last vwl letter in word being
      a, ı, o, u - sa
      e, i, ö, ü - se
      --
      */
      if (multipleCheck(lsh, ["e", "i", "ö", "ü"])) {
        return fiil + ek.dilek[cekimEki][1];
      } else {
        return fiil + ek.dilek[cekimEki][0];
      }

    case "istKip":
      /*
       indicate the gerKip addition
       by the last vwl letter in word being
       a, ı, o, u - a
       e, i, ö, ü - e
       --
       - speacial: -t, ye-
       - also: add "y" letter at the end of words
       which ends with a vwl letter.
       */
      if (sesliHarf.contains(lastHarf(fiil))) {
        fiil = fiil + "y";
      }
      if (lastHarfPlain(fiil) == "t" && sesliHarf.contains(fiil[fiil.length - 2])) {
        fiil = fiil.substring(0, fiil.length - 1) + "d";
      }
      if (fiil == "yey") { fiil = "yiy"; }
      if (multipleCheck(lsh, ["e", "i", "ö", "ü"])) {
        return fiil + ek.dilek[cekimEki][0];
      } else {
        return fiil + ek.dilek[cekimEki][1];
      }
    case "emrKip":
      // LooooL
      return fiil;
    } //Switch

    //Dilek
  } else {
    console.log("Bu çekim eki kodu tanınamadı.");
  }
}


var fiilArr = [
"aç",
"açıl",
"ağla",
"ak",
"al",
"anla",
"anlat",
"ara",
"art",
"aş",
"atıl",
"ayır"
];


fiilArr.forEach((f) => {
  console.log("+++++++++++++++");
  console.log(f);
  let haberEk = ["gorGecZam", "ogrGecZam", "simZam", "gelZam", "genZam"];
  let dilekEk = ["gerKip", "dilKip", "istKip", "emrKip"];
  haberEk.forEach((h) => {
    console.log(fiilCek(f, h));
  });
  console.log("----------");
  dilekEk.forEach((h) => {
    console.log(fiilCek(f, h));
  });
  console.log("----------");
});
