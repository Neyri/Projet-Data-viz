# Présentation

## Context, dataset, data collection

Savoir où on a été, quelles sont les activités et à quel point Google est précis sur les données collectées

Données de position Google avec indication sur l'activité

Sur notre compte google



##  Key design decisions

Pour répondre à nos questions

* carte : voir où on a été et ce qu'on a fait
* Activité la plus probable en fonction du temps
* Vision globale de la journée

Intéraction sur la sélection du jour et  possibilité de zoomer sur une période de temps



## Trucs intéressant

Oui !!

### 30 juillet

Trajet du quotidien en voiture aller et retour + un peu de déplacements au travail



### 20 aout - 21 aout

Retour de vacances en avion

On voit les 3 escales

Problème dans notre visualisation, il me considère comme `still` ou `walking` alors que je suis en avion et toute la distance est parcourue en 1h alors que bien plus en réalité. Sur l'avion Ok, on est en mode avion donc peut-être pas de données.

Trajet de retour le 21 aout en bus, erreur de google, il me considère comme `still` alors que je suis en `road vehicule`



## Technical challenges

La carte n'est pas faite en d3 mais en `Open layers` qui a été assez complexe à prendre en main avec peu de documentation.

Lag du double range

La carte est finalement très lourde.



## What you would have done with more time

Visuelle global des données à diposition

Possibilité d'uploader ses propres données

Plus de personnes 

Stacked bar chart

Plus de filtres 

