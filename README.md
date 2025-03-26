# 🚀 Gen AI enabled Integrated Platform Environment - Prajña

**Prajña** (Sanskrit: **प्रज्ञा**) is the highest and purest form of wisdom, intelligence and understanding. 
Prajñā is the state of wisdom which is higher than the knowledge obtained by reasoning and inference.
(Wikipedia)
_____________________________________________________


## 📌 Table of Contents
- [Introduction](#introduction)
- [Demo](#demo)
- [Inspiration](#inspiration)
- [What It Does](#what-it-does)
- [How We Built It](#how-we-built-it)
- [Challenges We Faced](#challenges-we-faced)
- [How to Run](#how-to-run)
- [Tech Stack](#tech-stack)
- [Team](#team)

---

## 🎯 Introduction
**Prajña**, the **Integrated Platform Environment** is a one-stop solution that integrates insights from services, applications, tools, infrastructure,
knowledge banks, etc. It enables Service Desk Engineers with everything they need to be effectively triage, resolve incidents and escalate incidents.
The Wisdom or Prajña (प्रज्ञा) comes from **integrating GenAI** into the platform thereby vastly increasing the amount of information and past 
knowledge available in the system to resolve incidents in the most efficient way thereby reducing the **MTTR**. <br/>
_____________________________________________________ 

## 🎯 Vision
The use of LLMs and agentic capabilities, will help in resolving incidents up to 80% faster thereby reducing OpEx on human resources.
This will result in a large number of Service Desk Engineers getting opportunities to upskill and contribute towards engineering work.


## 🎥 Demo
🔗 [Live Demo](#) (if applicable)  
📹 [Video Demo](#) (if applicable)  
🖼️ Screenshots:

![Screenshot 1](link-to-image)

## 💡 Inspiration
The Bank spends a significant amount of money and time to triage and resolve production incidents that can directly impact customers.
One of the main challenges in resolving incidents is getting a consolidated, and ready to use, information pertaining to the incident.

## ⚙️ What It Does
**Prajña**, the **Integrated Platform Environment** is a one-stop solution that integrates insights from services, applications, tools, infrastructure,
knowledge banks, etc. It enables Service Desk Engineers with everything they need to be effectively triage, resolve incidents and escalate incidents.

## 🛠️ How We Built It
The UserInterface was first modelled using `Figma`. <br/>
Once we locked down the UI, `React` was selected to be the front-end application.
The microservices were built using `FastAPI`. <br/>
The LLM used is OpenAI's `gpt-4o-mini-2024-07-18` model.<br/>
The team's SME generated payloads to mock metrics, telemetry, incidents, alerts, dependencies, and knowledge articles. <br/>

## 🚧 Challenges We Faced
Optimizing the responses of the GenAI models to make them useful was the biggest challenge.

## 🏃 How to Run
1. Clone the repository  
   ```
   git clone https://github.com/ewfx/gaipl-ai-pragnya.git
   ```
2. Pre-requisites
   - **NodeJS** latest version
   - **Python** v3.12.9
   - **Poetry** >2.0.0
   - **LLM** gpt-4o-mini-2024-07-18
   ```sh
   cd web
   npm install
   
   cd ..
   cd services-connect/
   poetry install
   
   cd ..
   cd ai-connect/
   poetry install
   ```
4. Run the project
   >**Note**: This project a .env file to be created in the `ai-connect` directory. <br/>
   >This file will contain the API private key to access the LLM services. Please contact Sachin Kulkarni to obtain the key.
   ```sh
   cd services-connect/
   poetry run python -m uvicorn services_connect.main:api

   cd ..
   cd ai-connect/
   poetry run python -m uvicorn ai_connect.main:app --port 9000

   cd ..
   cd web/
   npm start  # or python app.py
   ```

## 🏗️ Tech Stack
- 🔹 Frontend: React / Vue / Angular
- 🔹 Backend: Node.js / FastAPI / Django
- 🔹 Database: PostgreSQL / Firebase
- 🔹 Other: OpenAI API / Twilio / Stripe

## 👥 Team
- **Your Name** - [GitHub](#) | [LinkedIn](#)
- **Teammate 2** - [GitHub](#) | [LinkedIn](#)
