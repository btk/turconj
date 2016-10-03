# TVC - Turkish Verb Conjunction Tool

A tool to conjunct Turkish verbs with given tence and possessive in nodejs.

###Usage
Install via npm or clone from git;
~~~~
npm install turconj -g
~~~~

Then start using with;
~~~~
node turconj <TurkishVerb> <TenceSubstring> <Possessor>
~~~~

- **TurkishVerb**; is the verb hub that you will be conjuncting.
- **TenceSubstring**; is the substring of the Turkish time and motion tences that can be find in help command or following of the readme file.
- **Possessor**; is the possessor subject that the verb will be conjuncted with.

**Tence substrings:**
- gorGecZam: Görülen Geçmiş Zaman
- ogrGecZam: Öğrenilen Geçmiş Zaman
- simZam: Şimdiki Zaman
- gelZam: Gelecek Zaman
- genZam: Geniş Zaman
- gerKip: Gereklilik Kipi
- dilKip: Dilek Kipi
- istKip: İstek Kipi
- emrKip: Emir Kipi

**Possessors:** ben, sen, o, biz, siz, onlar
