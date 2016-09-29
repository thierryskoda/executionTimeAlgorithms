#Getting started

1. Go install nodejs at https://nodejs.org/en/download/ and take the **LTS (Recommended For Most Users)**. It's suppose to be v4.6.0
```
2. npm install
```
```
3. npm start
```

#Options
You can pass arguments to the command to specify some options

```
npm start AGLO_TYPE SEUIL TAILLE
```
##Defaults
``
ALGO_TYPE = 'merge';
SEUIL = 0;
TAILLE = [1000, 5000, 10000, 50000, 100000];
```
##Examples
Run merge algo with SEUIL 0 and all TAILLE
```
npm start merge
```
Run merge algo with SEUIL 100 and all TAILLE
```
npm start merge 100
```
Run merge algo with SEUIL 100 and only TAILLE 1000
```
npm start merge 100 1000
```

#Have fun! :)


