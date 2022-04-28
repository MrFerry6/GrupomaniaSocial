-SETUP PROJECT FILES:  
-At the folder that the project will install, click Git Bash Here at the contextual menu.  
-At the console type:  
-  git init.  

- git clone https://github.com/MrFerry6/GrupomaniaSocial  

- Open project with visual studio or your favourite code editor.  
-Open the terminal and at the main root of the project type ‘npm install’ .  
-At backend folder, create two folders named ‘images’ ’videos’ .  

-MySQL INSTALATION :  

-Download and install MySQL software:  

-https://dev.mysql.com/downloads/installer/  
-At configuration, select development computer.  
-Tick at ‘Show Advanced and Logging Options’.  
-Set a password for Root Account.  
-Finish all configurations through the Installation tool.  
-Open MySQL Workbench tool.  
-At MySQL Connections select the database that was created previously.  
-Click at the Shemas tab, if some DB examples exists, delete them.  
-Al File menu, click on Open SQL Script and select  the doom file located at the project backend/DB folder.  
-Click at lightning bolt icon to execute the script (is at the top of the script).  
-Restart the Db.  

-TO EXECUTE THE BACKEND:  
-In a terminal at the main root of the project type ‘cd backend’.  
-type ‘nodemon server’.  
-TO EXECUTE THE FRONTEND:  
-In a terminal at the main root of the project type ‘npm run start’.  
-If this error appears at the terminal:  
 "error:0308010C:digital envelope routines::unsupported"  
-Change the parameter ‘start’ at the script sections at the package.json file to this:  
	- "start": "react-scripts --openssl-legacy-provider start"  

-USING THE SITE:  
-At the navigator, go to this address ‘localhost:3000’ .  
-Create an user or login if one exist, swapping the options at the top nav var.  
-An a correct email and password must be implemented to activate the button.  
-Once the user is logged,  can made a post and se the post list if they exist.  
-to create a new post, title and text or video or image, must be implemented to activate the send button.  
-To see a content post, click on the title to open the content, an alert icon appears at the post that are unread.  



