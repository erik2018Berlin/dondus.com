<h1>Dondus.com</h1>
<h2>Online Service Booking Platform</h2>

<h3>Gliederung:</h3>
<ol>
    <li><a href="/Documentation/KONZEPT.md">Konzept</a></li>
    <li><a href="/Documentation/DESIGN.md">Design</a></li>
    <li><a href="/Documentation/TECHNICAL.md">technische Umsetzung</a>
</ol>
<hr>

<h3>Branchbeschreibung</h3>
<h4>main</h4>
<p>Stand: gemerged mit apiV2</p>

<h4>apiV2</h4>
<p>Generierung der RESTful API</p>
<ul>
<li>siehe dazu: <a href="https://github.com/diegohaz/rest">https://github.com/diegohaz/rest</a></li>
</ul>
<p>Generierung der Demodaten</p>
<ul>
<li>dazu in der app.js bei server.listen die funktion "demoData.start();" einkommentieren</li>
</ul>

<h4>genAPI - veraltet</h4>
**kann gelöscht werden**
<p>Hier sollen die ersten Test zu einer generierten Restful API unternommen werden.
  Mögliche Frameworks sind:</p>
   <ul>
   <li><a href="https://github.com/diegohaz/rest">https://github.com/diegohaz/rest</a></li>
   </ul> 
   
<h4>calendar_BE</h4>
<p>Frontend soweit vorbereitet für den Einsatz vom Fullcalendar Modul</p>

<h4>socket_BE</h4>
<p>socket server wird beim Start vom Backend instanziert</p>
<ul>
<li>test client ist nach dem Serverstart über 0.0.0.0:9000 abrufbar</li>
<li>nach dem Öffnen des Clients, steht in der server console eine Benachrichtigung, die Socket Verbindung funktioniert demnach</li>
<li>TODO: socket events in die api/service/controller.js Methoden auslagern und aufrufen</li>
</ul>



