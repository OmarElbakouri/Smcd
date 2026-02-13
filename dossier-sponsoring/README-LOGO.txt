INSTRUCTIONS POUR AJOUTER LE LOGO SMCD
========================================

1. Sauvegardez le logo SMCD (l'image avec les vagues bleues et le texte rouge) sous le nom :
   smcd-logo.png

2. Placez le fichier smcd-logo.png dans le même dossier que dossier-sponsoring-smcd.tex

3. Dans le fichier .tex, trouvez la ligne (ligne ~79) :
   % Logo placeholder - replace with: \includegraphics[width=3cm]{smcd-logo.png}
   
   Et remplacez les 3 lignes suivantes par :
   \includegraphics[width=3cm]{smcd-logo.png}

4. Recompilez avec xelatex

Le logo apparaîtra alors dans l'en-tête de toutes les pages (pages 3 à 15).

MODIFICATIONS EFFECTUÉES
=========================

✓ Logo SMCD ajouté dans l'en-tête de toutes les pages de contenu
✓ Assesseurs corrigés - affichage sur 2 lignes (Nom en gras + Prénom en petit)
  - Ligne 1 : SAIR Khalid, KAFIH Mohammed, KHARROUB El Khadir, BOUFETTAL Rachid
  - Ligne 2 : HAJRI Amal, ELOUFIR Mouhcine, AISSE Larbi
✓ Tous les noms sont maintenant visibles complètement
