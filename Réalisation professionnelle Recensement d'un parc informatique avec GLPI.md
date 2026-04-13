
## Compétences mises en œuvre

- Recenser et identifier les ressources numériques
- Mettre en place un service informatique
- Documenter une procédure technique
- Déployer un service en environnement Linux

## Contexte

Dans le cadre de notre formation en BTS SIO, nous avons réalisé la mise en place d’un outil de gestion de parc informatique à l’aide de GLPI afin de centraliser l’inventaire matériel et logiciel d’un parc informatique.

Cette solution permet d’automatiser la collecte d’informations des postes clients grâce à l’agent GLPI et d’améliorer la gestion globale du système d’information.


## Démarche suivie

Pour réaliser cette installation, plusieurs étapes ont été nécessaires :

1. Préparation de la machine virtuelle Debian servant de serveur.
2. Installation de la pile logicielle Apache / MariaDB / PHP.
3. Déploiement de GLPI sur le serveur web.
4. Configuration de la base de données dédiée.
5. Mise en place du plugin GLPI Inventory.
6. Déploiement de l’agent GLPI sur une machine cliente.
7. Test de remontée d’inventaire vers la plateforme.


### Installation et configuration de GLPI + Agent (Debian 13)

#### 1. Préparation de la VM serveur (Debian 13)
Mise à jour du système et installation des paquets de base :

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y apache2 mariadb-server unzip wget curl
```
⚠️ Attention : curl ou wget peuvent manquer sur debian → pensez à les installer.

Installation de PHP et des extensions requises :

```bash
sudo apt install -y php php-cli php-common php-mysql php-mbstring php-curl php-xml php-gd php-intl php-zip php-bz2
```
attention au version
Vérifier les modules chargés :

```bash
php -m | grep -E 'xml|dom|simplexml'
```
⚠️ Sans php-xml → l’installateur GLPI bloquera.

#### 2. Configuration de MariaDB
Connexion en root :

```bash
sudo mysql -u root -p
```
Création de l’utilisateur et de la base pour GLPI :

```sql
CREATE DATABASE glpi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'glpi'@'localhost' IDENTIFIED BY 'MotDePasseFort!';
GRANT ALL PRIVILEGES ON glpi.* TO 'glpi'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```
⚠️ Ne pas utiliser root dans l’installateur GLPI → créer un utilisateur dédié est plus propre.

#### 3. Installation de GLPI
glpi
<Mot_de_passe_administrateur> : pour acceder a glpi

Télécharger l’archive depuis GitHub :
```bash
cd /tmp
wget https://github.com/glpi-project/glpi/releases/download/10.0.20/glpi-10.0.20.tgz
```

faire attention a decoloresser dans le bon repertoire 
Décompresser et déplacer :
```bash
tar -xvzf glpi-10.0.20.tgz
sudo mv glpi /var/www/
```

Droits d’accès :
```bash
sudo chown -R www-data:www-data /var/www/glpi
sudo chmod -R 755 /var/www/glpi
```

⚠️ Obligatoire : les dossiers config, files, marketplace doivent appartenir à www-data, sinon GLPI bloque à l’installation.

#### 4. Configuration Apache (VirtualHost)

Créer le fichier de configuration :

```bash
sudo nano /etc/apache2/sites-available/glpi.conf
```


Contenu :

``` apache
<VirtualHost *:80>
    ServerName glpi.localhost
    ServerAlias 192.168.X.X
    DocumentRoot /var/www/glpi/public
    <Directory /var/www/glpi/public>
        Require all granted
        RewriteEngine On
        RewriteCond %{HTTP:Authorization} ^(.+)$
        RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteRule ^(.*)$ index.php [QSA,L]
    </Directory>
</VirtualHost>
```

attention a bien verifier que les lignes commenté sont bien commentée et que ca pointe bien vers lz bonne ip.
Activer le site et le module rewrite :

```bash
sudo a2enmod rewrite
sudo a2ensite glpi.conf
sudo systemctl reload apache2
```

⚠️ Vérifier la config :

```bash
sudo apache2ctl -S
```
#### 5. Installation GLPI via l’interface Web
Aller sur : http://192.168.X.X/

Suivre l’installateur (choisir la base glpi, user glpi).

Finir la configuration et se connecter avec :
user : glpi
pass : glpi

#### 6. Activation de la Marketplace & Plugin Inventory
Créer un compte sur GLPI Network.

Renseigner la clé dans Configuration → Générale → Marketplace.

Installer et activer le plugin GLPI Inventory.

⚠️ Ne pas oublier de cliquer sur Activer l’inventaire dans le plugin → sinon les agents seront refusés.

#### 7. Installation de l’agent GLPI (sur une autre VM Debian)

Télécharger l’agent :
pareil ici toujours verifier que le lien vers le telechargement marche : une simple recherche suffit. 
```bash
wget https://github.com/glpi-project/glpi-agent/releases/download/1.15/glpi-agent-1.15-linux-installer.pl -O glpi-agent.pl
sudo perl glpi-agent.pl
```

il demande :
Provide an url to configure GLPI server:
> http://192.168.1.18

Provide a path to configure local inventory run or leave it empty: leave empty

Provide a tag to configure or leave it empty: leave empty

Vérifier le service :

```bash
systemctl status glpi-agent
```

⚠️ Si le service ne démarre pas → vérifier perl et les dépendances.
#### 8. Lancer un inventaire
Depuis la machine cliente :

```bash
sudo glpi-agent --server http://192.168.X.X/marketplace/glpiinventory/ --force --debug
```
⚠️ Si erreur 403 Forbidden →

Vérifier que le plugin GLPI Inventory est activé côté serveur.

Vérifier que l’URL est bien http://IP/marketplace/glpiinventory/ (et pas /glpi/...).

#### 9. Vérification dans GLPI
Aller dans Parc → Ordinateurs.

La machine cliente doit apparaître automatiquement.

Export possible en CSV / PDF pour le rapport.

✅ Résumé des points d’attention
⚠️ Installer tous les modules PHP (php-xml, php-mbstring, php-mysql...) sinon blocage.

⚠️ Toujours donner les droits à www-data sur /var/www/glpi.

⚠️ Ne pas oublier d’activer le plugin Inventory dans GLPI.

⚠️ L’URL pour l’agent est bien /marketplace/glpiinventory/.

⚠️ En cas de problème → vérifier les logs :

/var/log/apache2/error.log

/var/log/apache2/access.log

/var/log/glpi-agent/

---


### Lancer le .msi en administrateur via PowerShell
Ouvrir **PowerShell en administrateur** (*clic droit → Exécuter en tant qu’administrateur*) puis exécuter :

```powershell
msiexec /i "C:\Users\bobby\Downloads\glpi-agent-1.15-x64.msi"
```

> ⚠️ **Attention :**
> - Si l’option _Exécuter en tant qu’administrateur_ n’apparaît pas dans l’explorateur Windows, il faut passer par PowerShell.
> - Adapter le chemin du `.msi` si nécessaire.


---

## 2. Navigation dans le dossier d’installation

```powershell
cd "C:\Program Files\GLPI-Agent"
```

---

## 3. Forcer un inventaire manuel

```powershell
 .\glpi-agent.bat --server http://192.168.1.14/marketplace/glpiinventory/
```

### Explications des options

- `--server` → URL de ton serveur GLPI (**adapter l’IP si elle change**)
    
- `--debug` → active les logs détaillés dans la console
    
- `--force` → force l’envoi de l’inventaire immédiatement

---

## 4. Redémarrer le service Windows

`Restart-Service glpi-agent`

### Vérifier que le service tourne bien

`Get-Service glpi-agent`

Résultat attendu :

```powershell 
Status   Name               DisplayName ------   ----               ----------- Running  glpi-agent         GLPI Agent`
```
---

## ✅ Workflow résumé


1. j'au apres lancé les commandes classiques et ca a marché 
    commande pour lancé le msi en mode admin sur powershelll (en etant deja en admin)
    `C:\Users\bobby\Downloads\glpi-agent-1.15-x64.msi`
    
2. Aller dans le dossier (toujours necessaire)
    
    `cd "C:\Program Files\GLPI-Agent"`
    
3. Forcer un inventaire
    
    .\glpi-agent.bat --server http://192.168.1.14/marketplace/glpiiventory


important : mettre le bon url si par exemple tu as configuré sur l'installer un autre url met celui que tu as mis 

astuce : mettre plusieurs url lorsque tu fais l'installation avec le .msi, par exemple mettre http://192.168.1.18/glpi, http://192.168.1.18, http://192.168.1.18/marketplace/glpiinventory

    
6. Redémarrer le service
    
    `Restart-Service glpi-agent`
    

---
bien penser a activer l'inventaire dans administration > inventaire et c'est la premiere ligne 


commande pour installer Tailscale sur Debian : 

```bash
curl -fsSL [https://tailscale.com/install.sh](https://tailscale.com/install.sh "https://tailscale.com/install.sh") | sh sudo tailscale up
```

- sur Windows allez sur Tailscale et télécharger le programme .exe
- après connection a Tailscale sur le compte de baptiste on lance le msi en mode admin pour les modifications d'adresse IP et pointer sur le serveur GLPI de Baptiste. 

### Sur Windows 

se mettre des les Downloads et charger le msi

```powershell
cd "C:\Program Files\GLPI-Agent"
```


```powershell
C:\Users\bobby\Downloads\glpi-agent-1.15-x64.msi
```

- retourner dans le bon chemin de l'agent GLPI et tapez :

```powershell
cd "C:\Program Files\GLPI-Agent"
Restart-Service glpi-agent
``` 

- Puis :
```powershell
 .\glpi-agent.bat --server http://192.168.X.XX/marketplace/glpiinventory/ --force --debug 
```

Mettre le bon chemin, donc  `http://192.168.X.XX` ou `http://192.168.X.XX/marketplace/glpiinventory/`   $\Rightarrow$ chemin qu'on a mis sur l'installer lors de l'installation du msi. 

- Vérifier que le service tourne bien

`Get-Service glpi-agent`

Résultat attendu :

```powershell 
Status   Name               DisplayName ------   ----               ----------- Running  glpi-agent         GLPI Agent
``` 


### Sur **Debian** :


```bash
sudo perl glpi-agent.pl
```
normalement l'agent est déjà installé on a juste a changé l'IP et mettre celle du serveur de baptiste. 

```bash
sudo glpi-agent --server http://192.168.X.XX/marketplace/glpiinventory/ --force --debug
```

ou mettre les chemin que Baptiste a mis lors de son installation du serveur GLPI
(ici on a pas eu forcément besoin de mettre marketplace/glpiinventory)


## Conclusion 

Cette réalisation nous a permis de découvrir le fonctionnement de GLPI et de comprendre la mise en place d’un outil de gestion de parc informatique.

Nous avons pu apprendre à configurer un serveur web sous Linux, déployer une application web complexe, gérer une base de données MariaDB et automatiser l’inventaire d’un parc grâce à l’agent GLPI.

Cette expérience nous a également permis de renforcer nos compétences en documentation technique et en déploiement de services.