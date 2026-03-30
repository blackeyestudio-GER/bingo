/** 24 Schnell-Ideen (Sidebar) */
export const QUICK_HABIT_IDEAS: readonly string[] = [
  'ich sage: autsch!',
  'ich fluche',
  'ich werde getroffen',
  'boss no hit gelegt',
  'Zombie hat mich gegriffen',
  'ich wurde vergiftet',
  'ich sterbe',
  'Chat spamt Emotes',
  'Technik zickt (Lag / Ton weg)',
  'ich lache laut',
  'Sub / Gift im Chat',
  'Speichern vergessen',
  'Speedrun-Fail',
  'RNG mies',
  'positiver Ausraster',
  'negativer Ausraster',
  'Mod wird erwähnt',
  'Schluck aus dem Becher',
  'kurze Pause / Stretch',
  'ich singe / summe mit',
  'Jumpscare',
  'ich verlaufe mich',
  'Quest nicht abgegeben',
  'schlechter Aim / Wurf',
] as const

const MODAL_RAW = `
ich rufe „nein nein nein“
ich sage „easy“ und sterbe gleich danach
ich lese Chat laut vor
ich wiederhole denselben Witz
ich sage „noch ein Run“
ich sage „letzter Versuch“ (Lüge)
ich blame das Spiel
ich blame die Tastatur
ich blame den Controller
ich habe Hechtsprung falsch getimed
ich falle von der Kante
ich treffe einen NPC statt dem Gegner
ich öffne das falsche Menü
ich verkaufe aus Versehen Items
ich crafte das Falsche
ich level die falsche Skill
ich respektiere keine Mine / Falle
ich speichere zu spät
ich lade einen alten Stand
ich vergesse Buffs / Tränke
ich vergesse zu looten
ich loot zu langsam
ich sortiere Inventar statt zu spielen
ich vergleiche Stats zu lange
ich lese Item-Texte komplett
ich mache einen Foto-Mode-Detour
ich gehe in Einstellungen „nur kurz“
ich ändere Keybinds mid-run
ich teste Grafikoptionen
ich rede mit jedem NPC
ich nehme die langsame Route
ich sammle alles Sammelbare
ich ignoriere die Hauptquest
ich mache Sidequests statt Story
ich kämpfe gegen zu hohes Level
ich unterschätze den Trash-Mob
ich unterschätze den Boss
ich überschätze mein Skill
ich panische rolle in die Attacke
ich dodge zu früh
ich dodge zu spät
ich habe keine Ausdauer mehr
ich bin out of mana
ich bin out of ammo
ich habe falsche Munition
ich wechsle zur falschen Waffe
ich habe keine Heilung mehr
ich habe zu viele Heilungen gehordet
ich benutze Ult zu früh
ich benutze Ult zu spät
ich vergesse Ult komplett
ich combo unterbreche mich selbst
ich canceln den falschen Move
ich stehe im eigenen AoE
ich stehe im Feuer
ich stehe im Gift
ich stehe im Strom
ich stehe im Boss-Telegraph
ich schaue weg beim wichtigen Moment
ich gucke auf den zweiten Monitor
ich checke Handy / Discord
ich antworte im Chat statt zu spielen
ich verliere Fokus bei Alert
ich werde von hinten erwischt
ich werde von oben erwischt
ich werde von der Seite flankiert
ich trigger einen Alarm
ich ziehe zu viele Gegner
ich splitte die Gruppe (coop)
ich lasse Mate sterben
ich nehme Mate den Kill weg
ich klaute das Loot
ich roll Need auf alles
ich verstehe Mechanik erst beim 3. Try
ich sterbe an der Tutorial-Stelle
ich sterbe am ersten Gegner
ich sterbe am letzten Hit vor Sieg
ich sterbe an der Umgebung
ich sterbe an fall damage
ich sterbe an suffocation / drowning
ich sterbe an Lava
ich sterbe an einer Kiste
ich sterbe an einer Tür
ich sterbe während Cutscene-Übergang
ich skippe Tutorial-Text und bereue es
ich lese Tutorial nicht und sterbe
ich überspringe Hinweis-Schild
ich aktiviere Hardmode aus Versehen
ich starte NG+ ohne Vorbereitung
ich vergesse Ausrüstung zu wechseln
ich trage falsches Set gegen Boss
ich habe Resistenzen falsch
ich habe Build komplett falsch
ich respec zu spät
ich kaufe im Shop das Falsche
ich verkaufe etwas Wichtiges
ich crafte Ressourcen weg
ich upgrade die falsche Waffe
ich zerlege die falsche Waffe
ich verliere Progress durch Crash
ich verliere Progress durch Stromausfall-Witz
ich mache einen Clip-Worthy Fail
ich mache einen Clip-Worthy Win direkt danach
ich sage „das war Skill“
ich sage „das war Luck“
ich sage „das war scripted“
ich sage „das ist unfair“
ich sage „das ist balanced“ ironisch
Chat sagt „skill issue“
Chat sagt „git gud“
Chat timingt LUL perfekt
Chat spamt ? in die Runde
Chat backseatet zu stark
ich folge Chat-Tipps und sterbe
ich ignoriere Chat-Tipps und sterbe auch
ich mache einen Wetteinsatz und verliere
ich mache eine Challenge und bereue sie
ich setze Schwierigkeit hoch „für Content“
ich setze Schwierigkeit runter heimlich
ich checke Guide off-stream (Witz)
ich spoilere mich aus Versehen
ich spoilere Chat aus Versehen
ich mute jemanden zu spät
ich timeout Witz geht nach hinten los
Sound-Alert zu laut
Sound-Alert unpassend
TTS liest etwas Peinliches
TTS liest Spendenname falsch
Raid kommt rein während Boss
ich rede über Essen zu lange
ich rede über Schlaf zu lange
ich rede über Wetter
ich starte Storytime statt Gameplay
ich ende Storytime mit Cliffhanger
ich vergesse Stream-Titel zu ändern
ich vergesse Kategorie zu ändern
ich rede mit Viewern statt zu zielen
ich verliere Track der Mission
ich verliere Track der Zeit
„noch 5 Minuten“ wird 45 Minuten
ich hype den Stream und choke
ich unterschätze Patch Notes
ich überschätze Patch Notes
ich teste neuen Patch live und crashe
ich lache über eigenen Fail
ich facepalme sichtbar
ich lehne mich zurück „locker“ und sterbe
ich sitze zu nah / zu weit
ich justiere Stuhl mid-fight
ich justiere Mic mid-fight
ich huste ins Mikro
ich trinke und verschlucke falsch
ich choke beim letzten Wort
ich verwechsle Spielnamen
ich verwechsle Charakternamen
ich nenne den Boss falsch
ich nenne die Attacke falsch
ich erkläre Mechanik falsch
ich lerne Mechanik live vor Chat
ich mache einen Deal mit Chat und breche ihn
ich wette mit Chat und verliere
ich verspreche Giveaway und vergesse Details
ich starte Just Chatting „kurz“
ich ende Stream nicht
ich sage „Gute Nacht“ und rede noch 20 Minuten
ich rede über Musik / Playlist
ich shuffle Song und es passt perfekt
ich shuffle Song und es passt gar nicht
ich tanze im Stuhl
ich mache Voice für NPC
ich mache schlechten Akzent
ich lache über Mod-Joke
ich werde von Sound jumpscare
ich werde von Spiel jumpscare
ich schreie kurz
ich flüstere „still“ und es knallt danach
ich sage „ich bin safe hier“
ich teste Grenze der Map
ich finde Secret aus Versehen
ich verpasse Secret offensichtlich
ich sammle Achievement fast und fail
ich checke Achievement-Liste statt zu spielen
ich optimiere Route und werde langsamer
ich speedrun und vergesse Heal
ich packe alles in eine Tasche (Witz)
ich sortiere Loot wie OCD
ich rename Items witzlos zu lange
ich mache Foto von Bug
ich reporte Bug und crashe danach
ich sage „das ist Feature“
ich sage „working as intended“
ich blame Windows Update
ich blame Antivirus
ich blame RGB
ich sage „einmal noch“ zehnmal
ich clutch den Fight
ich choke den Fight
ich clutch und choke im selben Stream
Chat sagt „aufnehmen“
ich vergesse Aufnahme
ich clippe zu früh
ich clippe zu spät

Katze kommt ins Zimmer
Katze springt auf den Schreibtisch
Katze liegt auf Tastatur / Controller
Katze streift die Webcam
ich höre Katze miauen (offscreen)
Katze miaut wegen Futter / Tür
Katze klopft an die Zimmertür
zwei Katzen toben im Hintergrund
Katze will auf den Schoß genau jetzt
Hund bellt kurz im Hintergrund
Hund will Gassi / an die Tür
Hund schnüffelt am Mic-Arm
Hund wedelt gegen Stuhl / Tisch
Vogel zwitschert im Raum / nebenan
Hamsterrad quietscht
Aquarium-Pumpe / Blubbern hörbar
Terrarium / Insekten summen leise
Haustier-Futterbeutel raschelt
Tiernamen werden im Stream gerufen

Handy vibriert am Tisch
WhatsApp-Nachrichten-Ton
WhatsApp-Gruppe explodiert
ich checke WhatsApp „nur kurz“
Instagram-DM / Story-Reply
Telegram-Pip / Gruppe aktiv
Snapchat / Signal / Threema Ping
SMS-Ton / Kurznachricht
Anruf (abgewiesen oder stumm)
Sprachnachricht abgespielt (Hintergrund)
Kalender-Reminder piept
E-Mail-Push „wichtig“
Bank-App / 2FA-Request
Discord-Mobile-Benachrichtigung
Twitch-App / YouTube-App Ping
Akku-Warnung Handy unter 20 %
Ladekabel fällt raus / Stecker zieht

Türklingel / Wohnungstür
Paket / Post vor der Tür
Lieferdienst klingelt / „Essen da“
Mitbewohner / Partner klopft an
jemand ruft laut meinen Namen
„Kannst du mal kurz…“ von der Tür
Essen ist fertig (Ruf aus Küche)
Kinderstimme im Hintergrund
Baby weint kurz
Eltern telefonieren laut nebenan
Flat-WG-Tür knallt zu
Nachbar musiziert / TV laut
Bohren / Renovierung nebenan
Treppenhaus-Stimmen / Lachen
Fenster auf: Straße / Auto / Sirene
Hupen draußen genau im Moment
Gewitter / Regen plötzlich lauter

Mikrowelle piept fertig
Wasserkocher klickt / kocht
Kühlschranktür quietscht
Eiswürfel im Glas
Geschirr / Teller klappert
Staubsauger startet (jemand saugt)
Waschmaschine / Trockner Ende-Signal
Staubsauger-Roboter fährt vorbei
Rauchmelder piept (Batterie)
Alexa / Siri / Sprachassistent mischt ein
Smart-Home-Licht geht flackrig

ich stehe kurz auf (Wasser / WC)
Tür zu / Windzug im Mic
Fenster zuknallen
Handtuch / Türklinke laut
Schlüsselbund fällt
Stuhl quietscht beim Hinsetzen
Niesen / Husten IRL
jemand lacht laut im Nebenraum
FaceTime / Videoanruf klingelt
Zoom / Teams Ping (2. Gerät)
Arbeits-Chat auf dem Handy nervt
„Bist du noch im Stream?“ Text
Gruppenchat eskaliert ohne mich
Meme wird mir nebenan gezeigt
jemand zeigt mir ein Reel / TikTok
ich muss Tür öffnen (Besuch / Lieferung)
Pizza / Essensgeruch erwähnt
Kaffee tropft / Sieb knallt
Chipstüte wird aufgerissen
Kühlschrank wird durchsucht (laut)

Freundin / Freund wirft einen Spruch rein
Chat vs. Person im Raum: beide gleichzeitig
ich erkläre jemandem nebenan das Spiel
Co-Streamer / Voice im Hintergrund
Discord-Call mit Freunden parallel erwähnt
„Wer ist da?“ im Stream gefragt
Haustier wird im Chat gefeiert
Katze wird gegoogelt ob sie OK ist
Handy-Nummer fast geleakt (Witz)
Privater Termin fällt ein
Arzt / Behörde ruft an (Stress)
Schule / Uni-Reminder auf dem Handy
Bewerbung / Job-Mail auf dem Lockscreen
Eltern schreiben „Ruf mal an“
Gruppe lädt zu spontan ein
„Wir gehen gleich los“ Nachricht
Party / Geburtstag heute Abend erwähnt
Urlaubs-Countdown unterbricht Fokus
Zeitzone-Verwirrung mit Freunden im Chat
Smalltalk über Wetter mit jemandem IRL
Nachbar grüßt durchs Fenster
Balkon-Gespräch hörbar
Garten / Rasenmäher draußen
Hund im Park bellt (offenem Fenster)
Katze jagt Fliege / Laserpointer
Haustier schläft süß — Chat: „clip das“
Emotionale Support-Nachricht auf dem Handy
Streak bei Snap / Duolingo erwähnt
Social-Media-Drama kurz erzählt
Fotos vom Wochenende zeigen (ohne Cam)
Voice Message zu lang zum Ignorieren
Gruppenanruf startet (abgelehnt)
„Kannst du streamen wenn…“ Familienfrage
Mitbewohner streamt auch / Bandwidth
Router / WLAN zickt (sozialer Kontext)
Hotspot vom Handy wegen Gast-WLAN
Bluetooth koppl sich mit falschem Gerät
Kopfhörer zeigen „verbunden“ mit fremdem Handy
AirDrop-Witz im selben Raum
Screen-Mirroring fast auf TV
Chromecast unterbricht jemand
Kinder wollen „nur einen Song“
Mitbewohner bittet leiser zu sein
„Wir haben Besuch“ — leise Modus
Tür zugehalten: „streamt noch“
Flurlicht geht an / Bewegungsmelder
Katze öffnet (fast) die Tür
Hund kratzt an der Tür
Futterautomat piept
Vogel fliegt ans Fenster
Terrarium-Lampe summt
Pflanzen gießen fällt ein
Blumentopf umgekippt (Geräusch)
Wäscheständer fällt um
Trockner klopft unausgewogen
Geschirrspüler Endsignal
Wasserkraft in der Leitung (Druckstoß)
Klingel an anderer Wohnung (Echo)
Falscher Klingelton (Nachbar gleicher Sound)
Handy auf stumm vergessen — vibriert trotzdem
„Nur eine Nachricht“ wird zwanzig
Emoji-Flut in Familiengruppe
Sticker-Krieg im WhatsApp
Sprachnachricht von Eltern zu lang
„Bitte bestätigen“ Kettenmail-Witz
Kalender: Geburtstag vergessen erwähnt
Reminder „Trink Wasser“ vom Handy
Schrittzähler / Fitness-App belohnt
Lieferung „10 Min“ wird eine Stunde
Essens-App: Rider ist da
Trinkgeld-Frage an der Tür
Nachbar holt Paket für mich mit
Postbote wirft Brief ein (laut)
Zeitung auf den Boden geklatscht
Katze spielt mit Paketband
Hund hat das Paket „geprüft“
Haustier reagiert auf Stream-Alert
Alert-Sound — Katze panisch
TTS sagt etwas — jemand IRL lacht
Donation-Name — Mitbewohner liest mit
Raid — jemand im Raum: „was ist los?“
Viewer-Zahl Sprung — sozial kommentiert
ich erzähle IRL was Chat gerade sagt
Partner versteht Stream-Slang nicht
„Was ist ein Sub?“ von Besuch
Non-Gamer-Freund fragt was passiert
Geschwister heckt nebenan
Eltern: „Spielst du wieder?“
Oma ruft an während Boss
Onkel schickt WhatsApp-Video
Cousin added in Gruppe random
Schulfreund schreibt nach Jahren
Ex schreibt (Timing mies / Witz)
Dating-App Match während Stream
„Wer schreibt dir?“ IRL gefragt
Handy-Gesichtserkennung fail vor Cam
Mitbewohner bringt Snacks rein
Kaffee für zwei — zweiter Becher
jemand setzt sich zum Zuschauen
Zuschauer im selben Raum (Couch)
LAN-Party-Echo im Hintergrund
Headset ab — Raumgeräusche laut
Mikro fängt Küche / Bad ein
Tür offen — Flurgespräch klar
Fenster offen — Grillparty draußen
Sommer: Eiswagen Melodie weit weg
Winter: Heizung knackt
Staubtuch / Putzen nebenan erwähnt
Mülltonnen werden geleert (laut draußen)
Glockenspiel / Kirche in der Ferne
Feuerwehr / Krankenwagen vorbei
Hund im Treppenhaus bellt
Katze auf dem Balkon miaut rein
Vogel fliegt ins offene Fenster (Chaos)
Spinnentier — jemand schreit IRL
Mücke summt ins Mic
Fliege auf dem Monitor
Katze schläft auf warmem PC
GPU-Lüfter + Katzenfell Witz
„Bitte nicht auf die Tastatur“
Haustier-Name wird zum Meme im Chat
Stream schickt Katzen-Emotes
WhatsApp-Bild von Haustier geschickt
Familiengruppe schickt Meme
Voice: „Bist du live?“ Panikmoment
„Mach mal leiser“ Nachricht von unten
Nachbar tippt an die Wand (Klassiker)
Musik von unten — Bass dröhnt
Karaoke-Nachbar (Ferienwohnung-Vibes)
Türspion — jemand steht da
Zweiter Monitor zeigt private Notif
Stream-Deck löst Handy-Alarm aus
Smartwatch vibriert am Handgelenk
„Du hast eine Erinnerung“ Watch
Schrittziel erreicht — Buzz
Trink-Erinnerung am Handgelenk
Handy liegt auf Desk — Screen Face-up leuchtet
Benachrichtigung auf großem Monitor gespiegelt
Screenshare fast private Tabs
Discord Overlay vs. Familie im Raum
„Wer ist [Username]?“ IRL
Chat inside joke — Erklärung an Partner
Partner wirft Dono-Witz rein
Spendennachricht laut vorgelesen IRL
TTS peinlich während Date im Raum
jemand im Haushalt lernt Englisch vom Stream
Kind wiederholt Stream-Phrase
Haustier auf Stream-Title neugierig
Thumbnail mit Katze — Meta-Witz
Outro-Musik — Mitbewohner summt mit
Pause — soziales Gespräch hörbar zurück
AFK — „musste kurz zur Tür“
AFK — „Katze… wieder“
AFK — „Handy, sorry“
Technik ok — IRL-Chaos trotzdem
„Real Life Raid“ (Türklingel + Boss)
Multitask: spielen + Nachricht beantworten
Headset eine Seite — Umgebung hörbar
ANC aus — Haushalt live mit
Mikro zu empfindlich — Atmen + Haustier
Gate / Noise Suppression kämpft mit Vogel
Stream endet weil Besuch kommt (Witz)
„Letzte Runde“ wegen Verabredung
Countdown bis Freunde kommen
Spiel pausiert für Familienfoto
Screenshot fürs Familien-Chat
Discord-Status auf „streamt“ vergessen
Freunde joinen Voice „nur hallo“
Clan-Mate schreibt „bist du live?“
Guild-Leader ping während Cutscene
Mod-Mail auf dem Handy gesehen
Creator-Dashboard Push
Copyright-Claim Mail (Stress-Witz)
Umsatzsteuer / Kleinunternehmer Witz
Steuerberater schreibt (realer Schreck)
Termin mit Handwerker morgen erwähnt
Mieterbund / Vermieter Mail
Paket soll abgeholt werden (Frist)
DHL-App Notification
Amazon „Zustellung heute“
Nachbar nimmt Paket an — Danke-Text
Essensplan-Abstimmung im Gruppenchat
Lieferando / Uber Eats Tracker
„Fahrer ist 2 Minuten entfernt“
Essen kalt — weil eine Runde noch
Mitbewohner isst meine Pommes (Drama)
Geteilter Kühlschrank — letzte Cola
WG-Küche: Geschirr-Streit leise
Putzplan-Erinnerung im Gruppenchat
Strom / Internet WG-Rechnung Thema
Mitbewohner streamt Musik im Bad
Dusche hörbar — jemand singt
Haartrockner im Hintergrund
Rasierer / Elektrozahnbürste Buzz
Waschmaschine: „wer hat…?“ im Chat
Socken / Wäscheberge erwähnt
Umzugskisten im Hintergrund sichtbar
Pflanzen sterben — Schuldgefühle
Haustier zum Tierarzt-Termin erinnert
Impfpass / Chip für Hund suchen
Katze hat Nachtaktivität erwähnt
Hund hat Schuh gefressen (Story)
Vogel hat aus Versehen frei (Chaos)
Aquarium-Alarm Wasserstand (Nische)
Terrarium ausgebrannt — Witz extrem
Haustier-Kamera sendet Motion Alert
Ring / Nest Doorbell auf Handy
Überwachungskamera „Person erkannt“
Nachbar-Ring-Klingel hörbar von draußen
Smart Lock piept
Garagentor öffnet sich (laut)
Auto lockt mit Horn (Fehlklick)
Schlüssel im Zündung Piepton draußen
Fahrradklingel auf der Straße
Roller / E-Scooter vorbeifahren
Skater im Park schreien
Kinder spielen Fußball gegen Hauswand
Ball gegen Fenster (Knall)
Eis am Stiel Verkäufer Glocke
Marktschreier weit weg (Sommer)
Demo / Kundgebung Distanz-Gedudel
Feuerwerk weit weg (nicht Seasonal fix)
Silvester-Witz im falschen Monat
Weihnachtsmarkt-Musik Nachbar (Nische)
Geburtstagsständchen von nebenan
Konfetti-Kanon im Voicechat anderer Leute
Party-Bass durch die Decke
Polizei spricht draußen über Megafon
Müllauto morgens (Klassiker)
Straßenkehrer / Laubbläser
Bagger / Baustelle wieder da
Kran früh morgens
Hupkonzert Stau erwähnt
Zug hornet in der Ferne
Flugzeug sehr tief / laut
Helikopter kreist (Stadt)
Drone draußen summt
Nachbarskatze auf dem Zaun
Fremde Katze guckt ins Fenster
Hund bellt die Katze an durchs Fenster
Tier-Documentary Ton aus anderem Zimmer
YouTube Kids im Hintergrund (Familie)
Cartoon-Stimmen von Kindern TV
Netflix „weiter schauen“ auf TV laut
Mitbewohner spoilers versehentlich
Film-Szene synchron zitiert IRL
Song im Radio gleich wie im Spiel
Shuffle trifft Stimmung + Türklingel Beat
`

export const MODAL_HABIT_IDEAS: readonly string[] = MODAL_RAW.split('\n')
  .map((s) => s.trim())
  .filter((s) => s.length > 0)
