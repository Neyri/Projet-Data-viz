# Projet de visualisation de données 

WhereWasI? - Comment me suis-je déplacé ?

Projet réalisé par Théo PONTON, Julien GRENIER et Martin CHAUVIN dans le cadre du MOS 5.5 de l'Ecole Centrale Lyon

*La question à laquelle nous voulons répondre* 
Nous voulons savoir quels déplacements ont été effectués par une personne :
Dans quelles villes / pays (localisation sur une carte) cette personne a été
Comment se sont répartis ses déplacements (entre 0 et 24 heures) pour chaque jour de la semaine
La distance moyenne parcourue et avec quels moyens de transport pour chaque jour de la semaine
Nous voulons également pouvoir sélectionner la période temporelle sur laquelle visualiser ces données.

*De quel données avons nous besoin ?*
Nous avons besoin de positions GPS d’une personne avec une fréquence de plusieurs fois par jour. Soit au minimum un triplet de type : latitude, longitude, temps du relevé de position.
Pour chacune de ces positions, nous avons également besoin d’une estimation du mode de déplacement : statique, marche, course, vélo, voiture, ...

*Comment nous allons collecter les données*
Nous allons utiliser les données liées aux comptes Google. Google permet de télécharger ses données personnelles dont les données de localisation. L’historique de position à disposition est très complet et fournit notamment les informations de positions et d’activité avec un interval de 2 minutes.

*Quels sont les principaux risques de collection et visualisation de ces données ?*
Pour la collection, il est possible que la personne ait désactivé l’historique des localisations. Dans ce cas, les données google ne sont pas disponibles et il faut se rabattre sur d’autres moyens comme les données de localisation Facebook ou Waze. Le problèmes c’est que les données de ces dernières application sont moins complètes que celles de google.
Pour la visualisation, si les données sont interrompus (points de localisation manquant) cela peut poser problème. On peut mal interpréter un trajet qui comporte des segments manquants. Il y a aussi un risque que l’estimation de l’activité de déplacement faite par google soit fausse.

*Quels sont les possibles problèmes éthiques/données privées ?*
Un problème pourrait se poser si la personne dont laquelle les données sont traitées ne donne pas son consentement ou le retire. Afin de contourner ce problème, nous allons prendre les données d’une personne du groupe. Nous garantissons ainsi le consentement.
Dans un but d’exposition du travail au un public plus large (comme Linkedin voir même pour le cours) nous allons anonymiser ces données. 

Test

