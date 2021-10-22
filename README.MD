## Installation
```bash
npm i
```

## Récupérer la BDD
Fichier : red_wire.sql

## Routes

1. Récupère toutes les séries : <br>
http://localhost:8000/ 

2. Récupère une série avec un id particulier : <br>
http://localhost:8000/1 

3. Récupère toutes les séries contenant dans le nom la lettre "e" :  <br>http://localhost:8000/?name=e

4. Récupère toutes les séries contenant la lettre e réalisées avant 2018 :  <br>
http://localhost:8000/?name=e&before=2018

5. Récupère toutes les séries contenant la lettre e réalisées avant 2018 et par ordre décroissant du nom de la série  <br>
http://localhost:8000/?name=e&before=2018&order=desc


6. Récupère toutes les séries avec la notion de limit et offset  <br>
http://localhost:8000/pagination?limit=6&offset=0

7. Patch un element (ex id : 1) : méthode Patch  <br>
http://localhost:8000/1

avec un corps body du type :
<br>
```
 {
    "name": "xxxx",
    "date_creation": "yyyy-jj-mm",
    "seen": false,
    "episode_number": 10
 }
```

8. Delete un element méthode Delete <br>
http://localhost:8000/1