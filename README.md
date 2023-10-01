# Project Explore Zion

### Description
The goal of this project is to provide user with a  multitude of vegetation data on a map, a glossary to look up vegetation species across the national park, along with common birds and animals they are likely to encounter when visiting. This is made for biology lovers and bird watchers, and for people who just love reading about nature and studying the flora and fauna!

- [Link to the App](https://explorezion.netlify.app/)
- [Link to Trello board](https://trello.com/invite/b/z17UedVN/ATTIcca2cbe6ac1a752e52e7d8ddf7f3b80c19D7153C/explorezion)

### Screenshots
![Landing](frontend/public/plainPage.png)
![Plants/Birds Displaying](frontend/public/BirdsandPlantsDisplay.png)
![Plants/Animals Displaying](frontend/public/Animalsandplantsdisplay.png)
![Dark Mode Enabled](frontend/public/DarkMode.png)
### Sources
- Bird info paraphrased and provided by the [Cornell Lab of Ornithology](https://www.birds.cornell.edu/home/?__hstc=75100365.96434fab7ea16e00ed4c05cce72bbe8b.1695500482820.1695500482820.1695558402102.2&__hssc=75100365.23.1695558402102&__hsfp=1474838261&_gl=1%2At2ahqx%2A_ga%2AMTQwMjEzMjQzMy4xNjk1NTAwNDgy%2A_ga_QR4NVXZ8BM%2AMTY5NTU1ODM5OS4yLjEuMTY5NTU2MTE3OS42MC4wLjA.&_ga=2.218559897.105039109.1695500482-1402132433.1695500482) and the [National Park Service](https://www.nps.gov/zion/learn/nature/birds.htm)

### What I plan to integrate
- A MERN stack application
- Main map display will contain huge datasets for vegetation species (currently I have 76 different colors for each plant species), possibly adding more data plots to include important features
- A NPS API that displays news, updates, alerts for the Zion Park area as well as events happening and upcoming
- IQair Air quality and weather API to display 
- Static media, audio recordings of bird calls and high quality images  initially pulled from xeno-canto API to display the most common birds you will likely encounter
-an About page that goes into detail of how to navigate the map and when the best time of year to go to the park and planning in advance
- info (and potentionally audio calls) of other critters and animals you will likely encounter in the park
- info about the plants you will encounter including information about the plant species, family, genus, edibility and toxicity, etc

### Stack
- MERN stack (potentially using amazon AWS to store large files and having mongoDB reference the said Amazon database)

### Learning Goals
- Get more familiar with MERN and front end (most of the data will be static)
- get more familiar with geoJSON data and geospatial data using react-leaflet, QGIS program to view and understand the data

### Getting Started

Wait a bit for the map to load. After it has finished, you can zoom in with the plus and minus icons in the upper left of the map, and view the scale in the lower left. Click on a layer in the map to view its properties. After closing the modal you can then see if there is any relevant plant data for the selected color on the left side of the map. The plant data will show the description of the habitable zones in the US, Family, Scientific Name, etc. Please note not all plant data has all the info filled. Click on the tabs beneath Alerts, Events, Things To Do, etc to see more detailed information about closings, upcoming events, and pricing info. 

### Technologies Used

- MongoDB
- ExpressJS
- React
- NodeJS
- Ract-leaftlet
- Material-UI
- geojson formatting
- AWS
- Javascript
- CSS
- HTML 

---

 #### Future Features

- improved styling for and mobile friendly
- spatial indexing via mongoDB for significantly faster loading times
- better shading and color mapping
- more information about plants, birds, other animals
