# Gymlink #
### Efficient gym managing app ###
## Index ##
1. [Introduction](#introduction)
    * [What is Gymlink](#what-is-gymlink)
    * [How it started](#how-it-started)
2. [Members](#members)
    * [Facundo Sanchez](#facundo-sanchez)
    * [Facundo Villagra](#facundo-villagra)
    * [Franco Musso](#franco-musso)
    * [Gabriel Rossy](#gabriel-rossy)
    * [Gaston Perego](#gaston-perego)
3. [Tecnologies and tools](#tecnologies-and-tools)
4. [Features](#features)
    * [SuperUser section](#superuser-section)
    * [Admin section](#admin-section)
    * [Trainer section](#trainer-section)
    * [See routine section](#see-routine-section)
5. [Authors](#authors)
***
## Introduction ##
### What is Gymlink ###
Gymlink is a managing software made specifically for gym owners, allowing their  
employees to efficiently manage the clients and the inventory of the gym, as well as  
the creation of routines for the clients by the trainers.
### How it started ###
The project idea came up because of the need of the users of an efficient way to  
create gym routines without the need to use paid softwares or having it written down  
on paper.
***
## Members ##
### Facundo Sanchez ###
Facundo is the project manager on Gymlink, he was in charge of organization, tasks, deadlines   and communication with the team.  
He also developed the front end role, in charge of making designs and programming all  
the visual portion of the app.  
[![LinkedinLogo](/gymlink_backend/README_imgs/linkedin.png)](https://www.linkedin.com/in/facundosánchez/)
[![GithubLogo](/gymlink_backend/README_imgs/github.png)](https://github.com/Facusan2016)
### Facundo Villagra ###
Having the QA role Facundo was in charge of making the tests to make sure every  
aspect of the program worked correctly.
Being a backend he was part of the creation of the API used to get all the  
data for the front end part.  
[![LinkedinLogo](/gymlink_backend/README_imgs/linkedin.png)](https://www.linkedin.com/in/facundo-villagra-/)
[![GithubLogo](/gymlink_backend/README_imgs/github.png)](https://github.com/FacundoV21)
### Franco Musso ###
As a DevOps, Franco had to construct and design the working enviroment for  
the rest of the team to work on, also managing the worflow of the project.  
Franco is also part of the backend team, working on the API and the communication  
with the front end.  
[![LinkedinLogo](/gymlink_backend/README_imgs/linkedin.png)](https://www.linkedin.com/in/franco-musso/)
[![GithubLogo](/gymlink_backend/README_imgs/github.png)](https://github.com/FrancoMuVa)
### Gabriel Rossy ###
Gabriel is has the UX & UI role, as well as the frontend developer role, he was  
part of the design of the visual aspect of the app, but with enphasis on the  
user experience and interface, trying to make it easy to use for all kinds  
of people.  
[![LinkedinLogo](/gymlink_backend/README_imgs/linkedin.png)](https://www.linkedin.com/in/gabriel-rossy-baptista-y-vedia/)
[![GithubLogo](/gymlink_backend/README_imgs/github.png)](https://github.com/gaboxdeveloper)
### Gaston Perego ###
As a DevOps Gaston worked with franco in the creation of the working enviroment and  
the project workflow.  
Gaston also worked as a full stack developer, helping on both the backend and  
frontend teams.  
[![LinkedinLogo](/gymlink_backend/README_imgs/linkedin.png)](https://www.linkedin.com/in/gaston-perego-7487a6294/)
[![GithubLogo](/gymlink_backend/README_imgs/github.png)](https://github.com/gastonperego)
***
## Tecnologies and tools ##
`NodeJS` 
`Express`
`Zod`
`Sequelize`
`PostgreSQL`
`DBeaver`
`Postman`
***
## Features ##
### SuperUser section ###
The most important section on the app, the superuser is the only role able to create  
an admin.
### Admin Section ###
In charge of managing the gym, the admin user has several sub sections, like  
inventory or users.
#### User managing ####
In this section the admin is able to see, create, update and delete  
all kinds of user except from other admins, and super users.
#### Inventory managing ####
Made for the inventory managing, in this section the admin can see, add,  
modify and delete items from the gym inventory.
### Trainer section ###
#### Client managing ####
In this section the trainer is able to see and modify clients data, and  
seeing if they have a routine asigned.
#### Routine section ####
This view allows the trainer to create a custom routine and asign  
it to a client.
### See routine section ###
By using a link (may change in future versions) a client of  
the gym is able to see the routine a trainer asigned to them.
