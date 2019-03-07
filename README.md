# WhereWasI? - Comment me suis-je déplacé ?

**Projet réalisé par Théo PONTON, Julien GRENIER et Martin CHAUVIN dans le cadre du MOS 5.5 de l'Ecole Centrale Lyon**

*La question à laquelle nous voulons répondre*
Nous voulons savoir quels déplacements ont été effectués par une personne :
Dans quelles villes / pays (localisation sur une carte) cette personne a été
Comment se sont répartis ses déplacements (entre 0 et 24 heures) pour chaque jour de la semaine
La distance moyenne parcourue et avec quels moyens de transport pour chaque jour de la semaine
Nous voulons également pouvoir sélectionner la période temporelle sur laquelle visualiser ces données.

*De quel données avons nous besoin ?*
Nous avons besoin de positions GPS d'une personne avec une fréquence de plusieurs fois par jour. Soit au minimum un triplet de type : latitude, longitude, temps du relevé de position.
Pour chacune de ces positions, nous avons également besoin d'une estimation du mode de déplacement : statique, marche, course, vélo, voiture, ...

*Comment nous allons collecter les données*
Nous allons utiliser les données liées aux comptes Google. Google permet de télécharger ses données personnelles dont les données de localisation. L'historique de position à disposition est très complet et fournit notamment les informations de positions et d'activité avec un interval de 2 minutes.

*Quels sont les principaux risques de collection et visualisation de ces données ?*
Pour la collection, il est possible que la personne ait désactivé l'historique des localisations. Dans ce cas, les données google ne sont pas disponibles et il faut se rabattre sur d'autres moyens comme les données de localisation Facebook ou Waze. Le problèmes c'est que les données de ces dernières application sont moins complètes que celles de google.
Pour la visualisation, si les données sont interrompus (points de localisation manquant) cela peut poser problème. On peut mal interpréter un trajet qui comporte des segments manquants. Il y a aussi un risque que l'estimation de l'activité de déplacement faite par google soit fausse.

*Quels sont les possibles problèmes éthiques/données privées ?*
Un problème pourrait se poser si la personne dont laquelle les données sont traitées ne donne pas son consentement ou le retire. Afin de contourner ce problème, nous allons prendre les données d'une personne du groupe. Nous garantissons ainsi le consentement.
Dans un but d'exposition du travail au un public plus large (comme Linkedin voir même pour le cours) nous allons anonymiser ces données.



## Principales fonctionnalités

Le site comporte une page d'accueil qui est la suivante :

![page_accueil](.\img\page_accueil.PNG)

<p style = "text-align : justify">Cette page comporte les liens vers les comptes LinkedIn et GitHub de chacun des membres du projet. On voit également que cette page comporte plusieurs liens :</p>

- Le premier lien renvoie vers le projet de visualisation
- Tous les autres liens renvoient vers les design sheet manuscrits réalisés en début de projet

<p style = "text-align : justify">Le dernier lien renvoie vers le design sheet qui décrit le site tel que nous l'avions imaginé au début du projet (visualisation disponible dans la partie "Conception")</p>

En ce rendant sur le projet de visualisation on arrive sur la page suivante :

![projet_visu](img/projet_visu.PNG)

Sur cette page, les données sont déjà chargées. On peut distinguer 5 parties :

#### Cadre des paramètres de visualisation

<p style = "text-align : justify">La partie supérieure permet de choisir la date pour laquelle on souhaite visualiser les données, mais aussi la tranche horaire que l'on souhaite. On indique aussi la légende concernant les modes de transport estimés par google. Il y a aussi un choix à coché qui permet d'interagir avec la visualisation en haut à gauche. Son rôle sera expliqué ensuite.
Voici une meilleure visualisation de ce cadre :</p>

![Cadre_parametres](img/Cadre_parametres.PNG)



#### Line-chart des probabilités de mode de déplacement

<p style = "text-align : justify"> La première visualisation en haut à gauche est un line-chart qui représente la probabilité associée à chaque mode de transport (à pied, immobile, en voiture...). On rappelle que ces probabilités sont estimés par Google.
Cette visualisation est double. Elle permet d'une part de voir sur une certaine échelle de temps la probabilité associée à chaque déplacement en cochant la case "Probabilistic activity" dans le cadre des paramètres (voir ci-dessous).</p>

![line_chart_1](img/line_chart_1.PNG)

<p style = "text-align : justify">D'autre part, il est également possible de visualisé sous forme de bar-chart le mode de déplacement le plus probable pour plus de clarté en cochant la case "Most likely activity" (voir ci-dessous)</p>

![line_chart_2](img/line_chart_2.PNG)



#### Carte des déplacements

Cette visualisation disponible en haut à droite de l'écran permet de voir sur une carte les différentes positions pour l'échelle de temps sélectionnée (inférieure une journée).

![map_1](img/map_1.PNG)

Le zoom de la carte s'ajuste automatiquement pour visualiser l'ensemble des positions et déplacements réalisés sur la période de temps sélectionnée. Les trajets sont également colorés avec la couleur correspondant au mode de transport le plus probable.



#### Bar-chart de la distance réalisée pour chaque mode de transport

Ce bar-chart permet de visualiser pour la journée sélectionnée la distance réalisée pour chaque mode de transport. Pour le calcul, chaque distance est attribuée au mode de transport le plus probable et la somme est faite sur la journée. Attention, cette visualisation n'est pas modifiée par la restriction temporelle que l'on  peut choisir via le cadre des paramètres.

![bar_chart_activity_1](img/bar_chart_activity_1.PNG)



#### Bar-chart de la distance réalisée par heure de la journée

Ce bar-chart permet de visualiser pour la journée sélectionnée la distance réalisée, quelque soit le mode de transport.

![bar_chart_distance_1](img/bar_chart_distance_1.PNG)

